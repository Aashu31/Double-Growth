import type { FastifyInstance } from "fastify";
import type { AppDependencies } from "../app.js";

export function registerHealthRoutes(
  app: FastifyInstance,
  deps: AppDependencies,
): void {
  app.get("/health", async () => ({
    status: "ok",
    service: "double-growth-api",
    version: process.env.npm_package_version ?? "1.0.0",
    time: new Date().toISOString(),
    integrations: {
      database: deps.config.databaseUrl ? "configured" : "not_configured",
      ai: deps.chat.configured ? "configured" : "not_configured",
      email: deps.email.configured ? "configured" : "not_configured",
      payments: deps.config.payments.enabled ? "enabled" : "not_configured",
    },
  }));

  app.get("/health/ready", async (request, reply) => {
    if (!deps.config.databaseUrl) {
      return reply.status(503).send({
        status: "degraded",
        checks: { database: "not_configured" },
      });
    }

    const reachable = await deps.checkDatabase();

    if (!reachable) {
      return reply.status(503).send({
        status: "degraded",
        checks: { database: "unreachable" },
      });
    }

    return {
      status: "ok",
      checks: { database: "ok" },
    };
  });
}
