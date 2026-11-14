import type { FastifyInstance } from "fastify";
import { findService } from "@double-growth/shared";
import { leadSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
import {
  leadAcknowledgementEmail,
  leadInternalEmail,
} from "../services/email-templates.js";
import { deliverNotification } from "../services/notifications.js";
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
      const serviceName = findService(input.service)?.name ?? input.service;

      const notifications: Promise<unknown>[] = [
        deliverNotification(deps, {
          type: "LEAD_ACKNOWLEDGEMENT",
          to: input.email,
          leadId: lead.id,
          content: leadAcknowledgementEmail({
            name: input.name,
            reference: lead.id,
            serviceName,
          }),
        }),
      ];

      if (deps.config.email.internalRecipient) {
        notifications.push(
          deliverNotification(deps, {
            type: "LEAD_INTERNAL",
            to: deps.config.email.internalRecipient,
            leadId: lead.id,
            content: leadInternalEmail({
              name: input.name,
              email: input.email,
              phone: input.phone,
              businessName: input.businessName || undefined,
              serviceName,
              budget: input.budget,
              description: input.description,
              preferredContact: input.preferredContact,
              reference: lead.id,
            }),
          }),
        );
      }

      await Promise.allSettled(notifications);

      request.log.info({
        event: "lead_created",
        leadId: lead.id,
        notifications: notifications.length,
      });

      return reply.status(201).send({
        data: {
          id: lead.id,
          receivedAt: lead.createdAt.toISOString(),
        },
      });
    },
  );
}
