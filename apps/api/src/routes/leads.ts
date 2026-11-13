import type { FastifyInstance } from "fastify";
import { leadSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
import type { AppDependencies } from "../app.js";

export function registerLeadRoutes(
  app: FastifyInstance,
  deps: AppDependencies,
): void {
  app.post(
    "/api/v1/leads",
    {
      config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
      schema: {
        body: { type: "object", additionalProperties: true },
      },
    },
    async (request, reply) => {
      const input = parseBody(leadSchema, request.body);

      // Honeypot: real visitors never fill this hidden field.
      if (input.website && input.website.trim().length > 0) {
        request.log.warn({ event: "lead_honeypot_triggered" });
        throw new AppError(
          400,
          "SPAM_REJECTED",
          "The enquiry could not be accepted. Please contact the team directly.",
        );
      }

      if (!deps.repositories) {
        throw new AppError(
          503,
          "DATABASE_NOT_CONFIGURED",
          "The enquiry service is not configured on this environment yet, so your message was not sent and no data was stored.",
        );
      }

      const lead = await deps.repositories.leads.create(input);

      request.log.info({ event: "lead_created", leadId: lead.id });

      return reply.status(201).send({
        data: {
          id: lead.id,
          receivedAt: lead.createdAt.toISOString(),
        },
      });
    },
  );
}
