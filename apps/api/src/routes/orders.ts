import type { FastifyInstance } from "fastify";
import { findPackage } from "@double-growth/shared";
import { orderLookupSchema, orderSchema } from "@double-growth/validators";
import { AppError, parseBody } from "../errors.js";
import { buildCheckoutTarget } from "../services/payments.js";
import type { AppDependencies } from "../app.js";

export function registerOrderRoutes(
  app: FastifyInstance,
  deps: AppDependencies,
): void {
  app.post(
    "/api/v1/orders",
    {
      config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
      schema: {
        body: { type: "object", additionalProperties: true },
      },
    },
    async (request, reply) => {
      const input = parseBody(orderSchema, request.body);

      if (input.website && input.website.trim().length > 0) {
        throw new AppError(
          400,
          "SPAM_REJECTED",
          "The order could not be accepted. Please contact the team directly.",
        );
      }

      const selectedPackage = findPackage(input.packageId);

      if (!selectedPackage) {
        throw new AppError(
          400,
          "VALIDATION_ERROR",
          "Select a valid package.",
          { packageId: "Select a valid package." },
        );
      }

      if (!deps.repositories) {
        throw new AppError(
          503,
          "DATABASE_NOT_CONFIGURED",
          "Order creation is not configured on this environment yet. No order was recorded and no payment was taken.",
        );
      }

      // Price always comes from the server-side catalogue, never the request.
      const order = await deps.repositories.orders.create(
        input,
        selectedPackage.priceMinor,
        selectedPackage.currency,
      );

      const payment = buildCheckoutTarget(deps.config, order);

      request.log.info({
        event: "order_created",
        orderNumber: order.orderNumber,
        paymentEnabled: payment.enabled,
      });

      return reply.status(201).send({
        data: {
          orderNumber: order.orderNumber,
          amountMinor: order.amountMinor,
          currency: order.currency,
          status: order.status,
          payment,
        },
      });
    },
  );

  app.get<{ Params: { orderNumber: string } }>(
    "/api/v1/orders/:orderNumber",
    {
      config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
    },
    async (request) => {
      const query = parseBody(orderLookupSchema, request.query);
      const orderNumber = request.params.orderNumber.trim();

      if (orderNumber.length < 4 || orderNumber.length > 40) {
        throw new AppError(400, "VALIDATION_ERROR", "Enter a valid order number.");
      }

      if (!deps.repositories) {
        throw new AppError(
          503,
          "DATABASE_NOT_CONFIGURED",
          "Order lookup is not configured on this environment yet.",
        );
      }

      const order = await deps.repositories.orders.findByNumber(
        orderNumber,
        query.email,
      );

      // A single generic response avoids confirming whether an order number
      // exists to someone who does not know the matching email address.
      if (!order) {
        throw new AppError(
          404,
          "ORDER_NOT_FOUND",
          "No order matches that reference and email address.",
        );
      }

      return {
        data: {
          orderNumber: order.orderNumber,
          status: order.status,
        },
      };
    },
  );
}
