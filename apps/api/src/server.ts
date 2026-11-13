import { config as loadEnvFiles } from "dotenv";
import { disconnectPrisma } from "@double-growth/database";
import { buildApp } from "./app.js";
import { loadConfig } from "./config.js";

loadEnvFiles({
  path: [".env.local", ".env", "../../.env"],
  quiet: true,
});

async function start(): Promise<void> {
  const config = loadConfig();
  const app = await buildApp({ config });

  const shutdown = async (signal: string): Promise<void> => {
    app.log.info({ signal }, "Shutting down");
    try {
      await app.close();
      if (config.databaseUrl) await disconnectPrisma();
      process.exit(0);
    } catch (error) {
      app.log.error({ err: error }, "Shutdown failed");
      process.exit(1);
    }
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));

  try {
    await app.listen({ host: config.host, port: config.port });
    app.log.info(
      {
        database: config.databaseUrl ? "configured" : "not_configured",
        ai: config.ai.provider ?? "not_configured",
        payments: config.payments.enabled ? "enabled" : "not_configured",
      },
      "Double Growth API started",
    );
  } catch (error) {
    app.log.error({ err: error }, "Failed to start");
    process.exit(1);
  }
}

void start();
