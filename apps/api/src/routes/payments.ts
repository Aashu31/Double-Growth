import type { FastifyInstance } from "fastify";
import { orderLookupSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
import { buildCheckoutTarget } from "../services/payments.js";
import type { AppDependencies } from "../app.js";

/**
 * Creates a payment target for an existing order.
 *
 * Never marks an order paid. The returned URL is a hosted checkout entry point;
 * only a verified provider webhook can change the payment status.
 */
export function registerPaymentRoutes(
  app: FastifyInstance,
  deps: AppDependencies,
): void {
  app.post(
    "/api/v1/payments/create",
    {
      config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
      schema: {
        body: { type: "object", additionalProperties: true },
      },
    },
    async (request, reply) => {
      const body = request.body as { orderNumber?: unknown };
      const orderNumber =
        typeof body.orderNumber === "string" ? body.orderNumber.trim() : "";

      if (orderNumber.length < 4 || orderNumber.length > 40) {
        throw new AppError(400, "VALIDATION_ERROR", "Enter a valid order number.");
      }

      const query = parseBody(orderLookupSchema, body);

      if (!deps.repositories) {
        throw new AppError(
          503,
          "DATABASE_NOT_CONFIGURED",
          "Payments are not configured on this environment yet. No payment was requested.",
        );
      }

      const order = await deps.repositories.orders.findByNumber(
        orderNumber,
        query.email,
      );

      if (!order) {
        throw new AppError(
          404,
          "ORDER_NOT_FOUND",
          "No order matches that reference and email address.",
        );
      }

      if (order.status === "PAID") {
        throw new AppError(
          409,
          "ORDER_ALREADY_PAID",
          "This order is already marked as paid. No new payment was requested.",
        );
      }

      if (order.status === "REFUNDED" || order.status === "CANCELLED") {
        throw new AppError(
          409,
          "ORDER_NOT_PAYABLE",
          "This order cannot accept a payment in its current state.",
        );
      }

      const payment = buildCheckoutTarget(deps.config, {
        orderNumber: order.orderNumber,
        amountMinor: order.amountMinor,
        currency: order.currency,
      });

      return reply.status(200).send({
        data: {
          orderNumber: order.orderNumber,
          status: order.status,
          payment,
        },
      });
    },
  );
}
