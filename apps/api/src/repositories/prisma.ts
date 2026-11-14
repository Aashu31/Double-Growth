import { randomBytes } from "node:crypto";
import type { Prisma } from "@prisma/client";
import {
  getPrismaClient,
  isPrismaConnectionError,
  isPrismaKnownError,
} from "@double-growth/database";
import type {
  LeadInput,
  OrderInput,
} from "@double-growth/validators";
import { AppError } from "../errors.js";
import type {
  LeadRecord,
  NotificationInput,
  OrderRecord,
  OrderRepository,
  PaymentEventInput,
  Repositories,
  WebhookResult,
} from "./types.js";

function generateOrderNumber(): string {
  const now = new Date();
  const period = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const suffix = randomBytes(5).toString("hex").toUpperCase();
  return `DG-${period}-${suffix}`;
}

function asDatabaseError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  if (isPrismaConnectionError(error)) {
    return new AppError(
      503,
      "DATABASE_UNAVAILABLE",
      "The database is unreachable right now. Nothing was saved. Please try again shortly.",
    );
  }
  return new AppError(
    500,
    "INTERNAL_ERROR",
    "The request could not be completed. Nothing was saved.",
  );
}

function toOrderRecord(order: {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  amountMinor: number;
  currency: string;
  status: string;
  createdAt: Date;
  paidAt: Date | null;
}): OrderRecord {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    email: order.email,
    amountMinor: order.amountMinor,
    currency: order.currency,
    status: order.status,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
  };
}

export function createPrismaRepositories(): Repositories {
  const prisma = getPrismaClient();

  return {
    leads: {
      async create(input: LeadInput): Promise<LeadRecord> {
        try {
          const lead = await prisma.lead.create({
            data: {
              name: input.name,
              email: input.email,
              phone: input.phone,
              businessName: input.businessName || null,
              service: input.service,
              budget: input.budget ?? null,
              description: input.description,
              preferredContact: input.preferredContact ?? null,
              consent: input.consent,
              source: input.source?.slice(0, 80) || "website",
            },
            select: { id: true, createdAt: true },
          });

          return lead;
        } catch (error) {
          throw asDatabaseError(error);
        }
      },
    },

    orders: {
      async create(
        input: OrderInput,
        amountMinor: number,
        currency: string,
      ): Promise<OrderRecord> {
        for (let attempt = 0; attempt < 3; attempt += 1) {
          try {
            const order = await prisma.order.create({
              data: {
                orderNumber: generateOrderNumber(),
                customerName: input.customerName,
                email: input.email,
                phone: input.phone,
                businessName: input.businessName || null,
                gstin: input.gstin || null,
                packageId: input.packageId,
                amountMinor,
                currency,
                status: "PENDING_PAYMENT",
              },
            });

            return toOrderRecord(order);
          } catch (error) {
            // Retry once or twice on an order-number collision, then fail
            // honestly rather than silently reusing a reference.
            if (
              isPrismaKnownError(error) &&
              error.code === "P2002" &&
              attempt < 2
            ) {
              continue;
            }

            if (isPrismaKnownError(error) && error.code === "P2002") {
              throw new AppError(
                500,
                "ORDER_CREATE_FAILED",
                "The order reference could not be generated. No order was recorded. Please try again.",
              );
            }

            throw asDatabaseError(error);
          }
        }

        throw new AppError(
          500,
          "ORDER_CREATE_FAILED",
          "The order could not be created. No order was recorded.",
        );
      },

      async findByNumber(
        orderNumber: string,
        email: string,
      ): Promise<OrderRecord | null> {
        try {
          const order = await prisma.order.findFirst({
            where: {
              orderNumber,
              email: email.trim().toLowerCase(),
            },
          });

          return order ? toOrderRecord(order) : null;
        } catch (error) {
          throw asDatabaseError(error);
        }
      },

      async applyPaymentEvent(
        event: PaymentEventInput,
      ): Promise<WebhookResult> {
        try {
          return await prisma.$transaction(async (tx) => {
            const order = await tx.order.findUnique({
              where: { orderNumber: event.orderNumber },
            });

            if (!order) {
              throw new AppError(
                404,
                "ORDER_NOT_FOUND",
                "No order matches the supplied reference.",
              );
            }

            if (
              typeof event.amountMinor === "number" &&
              event.amountMinor !== order.amountMinor
            ) {
              throw new AppError(
                400,
                "AMOUNT_MISMATCH",
                "The verified amount does not match the recorded order amount.",
              );
            }

            if (
              event.currency &&
              event.currency.toUpperCase() !== order.currency.toUpperCase()
            ) {
              throw new AppError(
                400,
                "AMOUNT_MISMATCH",
                "The verified currency does not match the recorded order currency.",
              );
            }

            const existing = await tx.paymentEvent.findUnique({
              where: {
                provider_eventId: {
                  provider: event.provider,
                  eventId: event.eventId,
                },
              },
              select: { id: true },
            });

            if (existing) {
              return {
                orderNumber: order.orderNumber,
                status: order.status,
                duplicate: true,
                email: order.email,
                customerName: order.customerName,
                amountMinor: order.amountMinor,
                currency: order.currency,
              };
            }

            await tx.paymentEvent.create({
              data: {
                orderId: order.id,
                provider: event.provider,
                eventId: event.eventId,
                status: event.status,
                amountMinor: event.amountMinor ?? order.amountMinor,
                payload: event.payload as Prisma.InputJsonValue,
              },
            });

            const nextStatus =
              event.status === "paid"
                ? "PAID"
                : event.status === "refunded"
                  ? "REFUNDED"
                  : "FAILED";

            // Never move a refunded order back to paid, and never downgrade a
            // paid order because of a late failure event.
            const finalStatus =
              order.status === "REFUNDED" && nextStatus === "PAID"
                ? "REFUNDED"
                : order.status === "PAID" && nextStatus === "FAILED"
                  ? "PAID"
                  : nextStatus;

            const updated = await tx.order.update({
              where: { id: order.id },
              data: {
                status: finalStatus,
                provider: event.provider,
                paidAt:
                  finalStatus === "PAID" ? (order.paidAt ?? new Date()) : order.paidAt,
              },
            });

            return {
              orderNumber: updated.orderNumber,
              status: updated.status,
              duplicate: false,
              email: updated.email,
              customerName: updated.customerName,
              amountMinor: updated.amountMinor,
              currency: updated.currency,
            };
          });
        } catch (error) {
          if (isPrismaKnownError(error) && error.code === "P2002") {
            // A concurrent delivery inserted the same event first.
            const order = await prisma.order.findUnique({
              where: { orderNumber: event.orderNumber },
              select: {
                orderNumber: true,
                status: true,
                email: true,
                customerName: true,
                amountMinor: true,
                currency: true,
              },
            });

            if (order) {
              return { ...order, duplicate: true };
            }
          }

          throw asDatabaseError(error);
        }
      },
    },

    newsletter: {
      async subscribe(email: string, source: string) {
        try {
          const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email },
            select: { id: true, email: true, createdAt: true, status: true },
          });

          if (existing) {
            if (existing.status !== "ACTIVE") {
              await prisma.newsletterSubscriber.update({
                where: { email },
                data: { status: "ACTIVE", source },
              });
            }

            return {
              id: existing.id,
              email: existing.email,
              createdAt: existing.createdAt,
              duplicate: true,
            };
          }

          const created = await prisma.newsletterSubscriber.create({
            data: { email, source, status: "ACTIVE" },
            select: { id: true, email: true, createdAt: true },
          });

          return { ...created, duplicate: false };
        } catch (error) {
          if (isPrismaKnownError(error) && error.code === "P2002") {
            const existing = await prisma.newsletterSubscriber.findUnique({
              where: { email },
              select: { id: true, email: true, createdAt: true },
            });
            if (existing) return { ...existing, duplicate: true };
          }

          throw asDatabaseError(error);
        }
      },
    },

    notifications: {
      async create(input: NotificationInput) {
        try {
          await prisma.notification.create({
            data: {
              type: input.type,
              recipient: input.recipient,
              subject: input.subject,
              status:
                input.status === "sent"
                  ? "SENT"
                  : input.status === "failed"
                    ? "FAILED"
                    : "SKIPPED",
              provider: input.provider,
              error: input.error?.slice(0, 500) ?? null,
              leadId: input.leadId ?? null,
              orderId: input.orderId ?? null,
            },
          });
        } catch (error) {
          // Notification records are operational telemetry. A failure to write
          // one must never roll back the lead, order or subscription itself.
          if (isPrismaConnectionError(error)) return;
          throw asDatabaseError(error);
        }
      },
    },

    chat: {
      async saveExchange({ userMessage, assistantMessage }) {
        try {
          await prisma.chatConversation.create({
            data: {
              messages: {
                create: [
                  { role: "USER", content: userMessage.slice(0, 4000) },
                  {
                    role: "ASSISTANT",
                    content: assistantMessage.slice(0, 8000),
                  },
                ],
              },
            },
          });
        } catch (error) {
          // Conversation logging is best-effort and must not break the chat.
          if (isPrismaConnectionError(error)) return;
          throw asDatabaseError(error);
        }
      },
    },

    aiUsage: {
      async consume({ period, promptChars, requestLimit }) {
        try {
          const usage = await prisma.aiUsage.upsert({
            where: { period },
            create: {
              period,
              requestCount: 1,
              promptChars,
            },
            update: {
              requestCount: { increment: 1 },
              promptChars: { increment: promptChars },
            },
            select: { requestCount: true },
          });

          return {
            allowed: usage.requestCount <= requestLimit,
            count: usage.requestCount,
          };
        } catch (error) {
          throw asDatabaseError(error);
        }
      },
    },
  };
}
