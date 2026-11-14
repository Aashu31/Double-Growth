import type { FastifyInstance } from "fastify";
import { chatSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
import { consumeAiQuota } from "../services/usage.js";
import type { AppDependencies } from "../app.js";

export function registerChatRoutes(
  app: FastifyInstance,
  deps: AppDependencies,
): void {
  app.post(
    "/api/v1/chat",
    {
      config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
      schema: {
        body: { type: "object", additionalProperties: true },
      },
    },
    async (request) => {
      const input = parseBody(chatSchema, request.body);

      if (!deps.chat.configured) {
        throw new AppError(
          503,
          "AI_NOT_CONFIGURED",
          "The assistant is not available because no AI provider is configured on this environment. Please use the contact page to reach the team.",
        );
      }

      // The monthly request cap is a cost guardrail, not a billing meter. It is
      // backed by the AiUsage table when a database is configured and by a
      // per-process counter otherwise.
      const usage = await consumeAiQuota(
        deps.repositories,
        deps.config.ai.monthlyRequestLimit,
        input.message.length +
          input.history.reduce((total, item) => total + item.content.length, 0),
      );

      if (!usage.allowed) {
        request.log.warn({
          event: "ai_quota_exceeded",
          period: new Date().toISOString().slice(0, 7),
          count: usage.count,
          limit: deps.config.ai.monthlyRequestLimit,
        });

        throw new AppError(
          429,
          "AI_QUOTA_EXCEEDED",
          "The assistant has reached its monthly usage allowance. Please use the contact page so the team can respond directly.",
        );
      }

      const reply = await deps.chat.reply({
        message: input.message,
        history: input.history,
      });

      if (deps.repositories) {
        try {
          await deps.repositories.chat.saveExchange({
            userMessage: input.message,
            assistantMessage: reply,
          });
        } catch {
          // Conversation logging must never break a successful answer.
        }
      }

      request.log.info({
        event: "ai_reply",
        usageCount: usage.count,
        usagePersisted: usage.persisted,
      });

      return { data: { reply } };
    },
  );
}
