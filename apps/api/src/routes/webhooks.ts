import type { FastifyInstance } from "fastify";
import { paymentWebhookSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
import { verifyWebhookSignature } from "../services/payments.js";
import { paymentStatusEmail } from "../services/email-templates.js";
import { deliverNotification } from "../services/notifications.js";
import type { AppDependencies } from "../app.js";

/**
 * Provider webhook endpoint.
 *
 * Trust rules:
 * - The raw request body must carry a valid HMAC signature. A browser redirect
 *   is never accepted as proof of payment.
 * - The amount and currency must match the recorded order.
 * - The provider event id is unique, so a re-delivered event cannot be
 *   processed twice.
 */
export function registerWebhookRoutes(
  app: FastifyInstance,
  deps: AppDependencies,
): void {
  app.post(
    "/api/v1/payments/webhook",
    {
      config: { rateLimit: { max: 60, timeWindow: "1 minute" } },
      schema: {
        body: { type: "object", additionalProperties: true },
      },
    },
    async (request) => {
      const { webhookSecret, paypalConfigured } = deps.config.payments;

      if (!webhookSecret) {
        throw new AppError(
          503,
          "PAYMENTS_NOT_CONFIGURED",
          "Payment webhooks are not configured on this environment. No payment state was changed.",
        );
      }

      const rawBody = request.rawBody;

      if (!rawBody) {
        throw new AppError(
          400,
          "PAYMENT_VERIFICATION_FAILED",
          "The webhook payload could not be verified. No payment state was changed.",
        );
      }

      const signature = request.headers["x-double-growth-signature"];
      const signatureValue = Array.isArray(signature) ? signature[0] : signature;

      if (!verifyWebhookSignature(rawBody, signatureValue, webhookSecret)) {
        request.log.warn({ event: "webhook_signature_rejected" });
        throw new AppError(
          401,
          "INVALID_SIGNATURE",
          "The webhook signature is invalid. No payment state was changed.",
        );
      }

      const payload = parseBody(paymentWebhookSchema, request.body);

      if (payload.provider === "PAYPAL" && !paypalConfigured) {
        throw new AppError(
          503,
          "PAYMENTS_NOT_CONFIGURED",
          "PayPal verification is not configured on this environment. No payment state was changed.",
        );
      }

      if (!deps.repositories) {
        throw new AppError(
          503,
          "DATABASE_NOT_CONFIGURED",
          "Payment events cannot be recorded because no database is configured. No payment state was changed.",
        );
      }

      const result = await deps.repositories.orders.applyPaymentEvent({
        orderNumber: payload.orderNumber,
        provider: payload.provider,
        eventId: payload.eventId,
        status: payload.status,
        amountMinor: payload.amountMinor,
        currency: payload.currency,
        payload: request.body as Record<string, unknown>,
      });

      request.log.info({
        event: "webhook_processed",
        orderNumber: result.orderNumber,
        status: result.status,
        duplicate: result.duplicate,
      });

      if (!result.duplicate) {
        const delivery = await deliverNotification(deps, {
          type:
            payload.status === "paid"
              ? "PAYMENT_CONFIRMATION"
              : "PAYMENT_FAILURE",
          to: result.email,
          orderId: result.orderNumber,
          content: paymentStatusEmail({
            name: result.customerName,
            orderNumber: result.orderNumber,
            status: payload.status,
            amount: `${result.currency} ${(result.amountMinor / 100).toFixed(2)}`,
          }),
        });

        request.log.info({
          event: "payment_notification",
          orderNumber: result.orderNumber,
          emailStatus: delivery.status,
        });
      }

      return {
        data: {
          orderNumber: result.orderNumber,
          status: result.status,
          duplicate: result.duplicate,
        },
      };
    },
  );
}
