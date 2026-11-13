import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value && value.length > 0 ? value : undefined));

const optionalUrl = optionalString.pipe(z.string().url().optional());

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  TRUST_PROXY: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  WEB_URL: optionalUrl,

  DATABASE_URL: optionalString,

  AI_PROVIDER: optionalString,
  AI_BASE_URL: optionalUrl,
  AI_MODEL: optionalString,
  AI_API_KEY: optionalString,

  PAYMENTS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  UPI_PAYMENT_LINK_TEMPLATE: optionalUrl,
  UPI_WEBHOOK_SECRET: optionalString,
  PAYPAL_CLIENT_ID: optionalString,
  PAYPAL_CLIENT_SECRET: optionalString,
  PAYPAL_WEBHOOK_ID: optionalString,
});

export type AppConfig = {
  nodeEnv: "development" | "test" | "production";
  host: string;
  port: number;
  logLevel: string;
  trustProxy: boolean;
  allowedOrigins: string[];
  databaseUrl: string | null;
  ai: {
    provider: "openai-compatible" | null;
    baseUrl: string | null;
    model: string | null;
    apiKey: string | null;
  };
  payments: {
    enabled: boolean;
    linkTemplate: string | null;
    webhookSecret: string | null;
    paypalConfigured: boolean;
  };
};

export function loadConfig(
  source: NodeJS.ProcessEnv = process.env,
): AppConfig {
  const parsed = envSchema.safeParse(source);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration — ${details}`);
  }

  const env = parsed.data;

  const allowedOrigins = new Set<string>(["http://localhost:3000"]);
  if (env.WEB_URL) allowedOrigins.add(env.WEB_URL.replace(/\/$/, ""));
  if (env.NODE_ENV === "production" && !env.WEB_URL) {
    throw new Error("WEB_URL must be set in production for CORS.");
  }

  const aiConfigured = Boolean(
    env.AI_PROVIDER === "openai-compatible" &&
      env.AI_BASE_URL &&
      env.AI_MODEL &&
      env.AI_API_KEY,
  );

  const paymentsEnabled = Boolean(
    env.PAYMENTS_ENABLED && env.UPI_PAYMENT_LINK_TEMPLATE,
  );

  return {
    nodeEnv: env.NODE_ENV,
    host: env.HOST,
    port: env.PORT,
    logLevel: env.LOG_LEVEL,
    trustProxy: env.TRUST_PROXY,
    allowedOrigins: [...allowedOrigins],
    databaseUrl: env.DATABASE_URL ?? null,
    ai: {
      provider: aiConfigured ? "openai-compatible" : null,
      baseUrl: env.AI_BASE_URL ?? null,
      model: env.AI_MODEL ?? null,
      apiKey: env.AI_API_KEY ?? null,
    },
    payments: {
      enabled: paymentsEnabled,
      linkTemplate: paymentsEnabled ? (env.UPI_PAYMENT_LINK_TEMPLATE ?? null) : null,
      webhookSecret: env.UPI_WEBHOOK_SECRET ?? null,
      paypalConfigured: Boolean(
        env.PAYPAL_CLIENT_ID && env.PAYPAL_CLIENT_SECRET,
      ),
    },
  };
}
