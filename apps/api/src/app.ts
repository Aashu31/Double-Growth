import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { getPrismaClient } from "@double-growth/database";
import { type AppConfig, loadConfig } from "./config.js";
import { AppError } from "./errors.js";
import { createPrismaRepositories } from "./repositories/prisma.js";
import type { ChatProvider, Repositories } from "./repositories/types.js";
import { createChatProvider } from "./services/ai.js";
import { createEmailService, type EmailService } from "./services/email.js";
import { registerCatalogueRoutes } from "./routes/catalogue.js";
import { registerChatRoutes } from "./routes/chat.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerLeadRoutes } from "./routes/leads.js";
import { registerNewsletterRoutes } from "./routes/newsletter.js";
import { registerOrderRoutes } from "./routes/orders.js";
import { registerPaymentRoutes } from "./routes/payments.js";
import { registerWebhookRoutes } from "./routes/webhooks.js";

declare module "fastify" {
  interface FastifyRequest {
    rawBody?: string;
  }
}

export interface AppDependencies {
  config: AppConfig;
  repositories: Repositories | null;
  chat: ChatProvider;
  email: EmailService;
  checkDatabase: () => Promise<boolean>;
}

export interface BuildAppOptions {
  config?: AppConfig;
  repositories?: Repositories | null;
  chat?: ChatProvider;
  email?: EmailService;
  checkDatabase?: () => Promise<boolean>;
  logger?: FastifyServerOptions["logger"];
}

function readStatusCode(error: unknown): number | undefined {
  if (typeof error === "object" && error !== null && "statusCode" in error) {
    const value = (error as { statusCode?: unknown }).statusCode;
    return typeof value === "number" ? value : undefined;
  }
  return undefined;
}

function isValidationError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "validation" in error;
}

export async function buildApp(
  options: BuildAppOptions = {},
): Promise<FastifyInstance> {
  const config = options.config ?? loadConfig();

  const repositories =
    options.repositories === undefined
      ? config.databaseUrl
        ? createPrismaRepositories()
        : null
      : options.repositories;

  const chat = options.chat ?? createChatProvider(config);
  const email = options.email ?? createEmailService(config);

  const checkDatabase =
    options.checkDatabase ??
    (async () => {
      if (!config.databaseUrl) return false;
      try {
        await getPrismaClient().$queryRaw`SELECT 1`;
        return true;
      } catch {
        return false;
      }
    });

  const deps: AppDependencies = { config, repositories, chat, email, checkDatabase };

  const app = Fastify({
    logger:
      options.logger ??
      (config.nodeEnv === "test"
        ? false
        : {
            level: config.logLevel,
            redact: [
              "req.headers.authorization",
              "req.headers.cookie",
              "req.headers['x-double-growth-signature']",
            ],
          }),
    trustProxy: config.trustProxy,
    bodyLimit: 32 * 1024,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "same-site" },
  });

  const allowedOrigins = new Set(
    config.allowedOrigins.map((origin) => origin.replace(/\/$/, "")),
  );

  await app.register(cors, {
    origin: (origin, callback) => {
      // Non-browser clients send no Origin header.
      if (!origin) {
        callback(null, true);
        return;
      }

      callback(null, allowedOrigins.has(origin.replace(/\/$/, "")));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 600,
  });

  await app.register(rateLimit, {
    global: true,
    max: 120,
    timeWindow: "1 minute",
    allowList: [],
    errorResponseBuilder: (_request, context) => ({
      error: {
        code: "RATE_LIMITED",
        message: `Too many requests. Try again in ${context.after}.`,
      },
    }),
  });

  app.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    (request, body, done) => {
      const raw = typeof body === "string" ? body : body.toString("utf8");
      request.rawBody = raw;

      try {
        done(null, JSON.parse(raw) as unknown);
      } catch {
        const error = new AppError(
          400,
          "VALIDATION_ERROR",
          "The request body is not valid JSON.",
        );
        done(error, undefined);
      }
    },
  );

  app.addHook("onSend", async (request, reply, payload) => {
    if (request.url.startsWith("/api/") || request.url.startsWith("/health")) {
      reply.header("Cache-Control", "no-store");
    }
    return payload;
  });

  app.setErrorHandler((error: unknown, request, reply) => {
    if (error instanceof AppError) {
      reply.status(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
          ...(error.fields ? { fields: error.fields } : {}),
        },
      });
      return;
    }

    const statusCode = readStatusCode(error);

    if (statusCode === 429) {
      reply.status(429).send({
        error: {
          code: "RATE_LIMITED",
          message: "Too many requests. Please wait a moment and try again.",
        },
      });
      return;
    }

    if (statusCode === 400 || isValidationError(error)) {
      reply.status(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: "The request could not be accepted as sent.",
        },
      });
      return;
    }

    request.log.error({ err: error }, "Unhandled request error");
    reply.status(500).send({
      error: {
        code: "INTERNAL_ERROR",
        message: "The request could not be completed. Please try again.",
      },
    });
  });

  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      error: {
        code: "NOT_FOUND",
        message: `No route matches ${request.method} ${request.url}.`,
      },
    });
  });

  app.get("/", async () => ({
    service: "double-growth-api",
    version: "1.0.0",
    documentation: "See API.md in the repository root.",
  }));

  registerHealthRoutes(app, deps);
  registerCatalogueRoutes(app);
  registerLeadRoutes(app, deps);
  registerNewsletterRoutes(app, deps);
  registerOrderRoutes(app, deps);
  registerPaymentRoutes(app, deps);
  registerChatRoutes(app, deps);
  registerWebhookRoutes(app, deps);

  return app;
}
