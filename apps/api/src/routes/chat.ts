import type { FastifyInstance } from "fastify";
import { chatSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
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

      const reply = await deps.chat.reply({
        message: input.message,
        history: input.history,
      });

      return { data: { reply } };
    },
  );
}
