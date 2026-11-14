import type { FastifyInstance } from "fastify";
import { newsletterSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
import { newsletterWelcomeEmail } from "../services/email-templates.js";
import { deliverNotification } from "../services/notifications.js";
import type { AppDependencies } from "../app.js";

export function registerNewsletterRoutes(
  app: FastifyInstance,
  deps: AppDependencies,
): void {
  app.post(
    "/api/v1/newsletter",
    {
      config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
      schema: {
        body: { type: "object", additionalProperties: true },
      },
    },
    async (request, reply) => {
      const input = parseBody(newsletterSchema, request.body);

      if (input.website && input.website.trim().length > 0) {
        request.log.warn({ event: "newsletter_honeypot_triggered" });
        throw new AppError(
          400,
          "SPAM_REJECTED",
          "The subscription could not be accepted.",
        );
      }

      if (!deps.repositories) {
        throw new AppError(
          503,
          "DATABASE_NOT_CONFIGURED",
          "Newsletter subscriptions are not configured on this environment yet. Your address was not stored.",
        );
      }

      const subscriber = await deps.repositories.newsletter.subscribe(
        input.email,
        input.source?.slice(0, 80) || "website",
      );

      if (!subscriber.duplicate) {
        const delivery = await deliverNotification(deps, {
          type: "NEWSLETTER_WELCOME",
          to: subscriber.email,
          content: newsletterWelcomeEmail(),
        });

        request.log.info({
          event: "newsletter_subscribed",
          subscriberId: subscriber.id,
          emailStatus: delivery.status,
        });
      } else {
        request.log.info({
          event: "newsletter_resubscribed",
          subscriberId: subscriber.id,
        });
      }

      return reply.status(201).send({
        data: {
          subscribed: true,
          receivedAt: subscriber.createdAt.toISOString(),
        },
      });
    },
  );
}
