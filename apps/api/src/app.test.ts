import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { LeadInput, OrderInput } from "@double-growth/validators";
import { buildApp } from "./app.js";
import { loadConfig } from "./config.js";
import { AppError } from "./errors.js";
import type {
  LeadRecord,
  OrderRecord,
  PaymentEventInput,
  Repositories,
  WebhookResult,
} from "./repositories/types.js";

const validLead: LeadInput = {
  name: "Test Business Owner",
  email: "owner@example.com",
  phone: "+91 98765 43210",
  businessName: "Example Traders",
  service: "business-website",
  budget: "25000-50000",
  description:
    "We need a five page business website with an enquiry form and clear service pages.",
  preferredContact: "email",
  consent: true,
  website: "",
  source: "test",
};

const validOrder: OrderInput = {
  customerName: "Test Business Owner",
  email: "owner@example.com",
  phone: "+91 98765 43210",
  businessName: "Example Traders",
  gstin: "",
  packageId: "growth-annual",
  consent: true,
  website: "",
};

function createFakeRepositories(overrides: Partial<Repositories> = {}) {
  const leads: LeadRecord[] = [];
  const orders: OrderRecord[] = [];

  const repositories: Repositories = {
    leads: {
      async create(input: LeadInput) {
        const record = { id: `lead_${leads.length + 1}`, createdAt: new Date() };
        leads.push(record);
        void input;
        return record;
      },
    },
    orders: {
      async create(
        input: OrderInput,
        amountMinor: number,
        currency: string,
      ): Promise<OrderRecord> {
        const record: OrderRecord = {
          id: `order_${orders.length + 1}`,
          orderNumber: `DG-202611-${String(orders.length + 1).padStart(6, "0")}`,
          customerName: input.customerName,
          email: input.email,
          amountMinor,
          currency,
          status: "PENDING_PAYMENT",
          createdAt: new Date(),
          paidAt: null,
        };
        orders.push(record);
        return record;
      },
      async findByNumber(orderNumber: string, email: string) {
        return (
          orders.find(
            (order) =>
              order.orderNumber === orderNumber &&
              order.email === email.toLowerCase(),
          ) ?? null
        );
      },
      async applyPaymentEvent(
        event: PaymentEventInput,
      ): Promise<WebhookResult> {
        const order = orders.find(
          (item) => item.orderNumber === event.orderNumber,
        );
        if (!order) throw new Error("not found");

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

        order.status =
          event.status === "paid"
            ? "PAID"
            : event.status === "refunded"
              ? "REFUNDED"
              : "FAILED";

        return {
          orderNumber: order.orderNumber,
          status: order.status,
          duplicate: false,
          email: order.email,
          customerName: order.customerName,
          amountMinor: order.amountMinor,
          currency: order.currency,
        };
      },
    },
    newsletter: {
      async subscribe(email: string, source: string) {
        void source;
        return {
          id: `subscriber_${email}`,
          email,
          createdAt: new Date(),
          duplicate: false,
        };
      },
    },
    notifications: {
      async create() {
        // Notifications are telemetry; the fake records nothing.
      },
    },
    chat: {
      async saveExchange() {
        // Chat logging is best-effort; the fake records nothing.
      },
    },
    aiUsage: {
      async consume({ requestLimit }) {
        return { allowed: true, count: 1 > requestLimit ? 2 : 1 };
      },
    },
    ...overrides,
  };

  return { repositories, leads, orders };
}

function testConfig(extra: Record<string, string> = {}) {
  return loadConfig({
    NODE_ENV: "test",
    DATABASE_URL: "postgresql://user:pass@localhost:5432/test",
    ...extra,
  } as NodeJS.ProcessEnv);
}

describe("API", () => {
  let app: FastifyInstance | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("reports liveness without touching the database", async () => {
    app = await buildApp({ config: testConfig(), repositories: null });

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      status: "ok",
      service: "double-growth-api",
    });
  });

  it("reports readiness as degraded when the database is not configured", async () => {
    app = await buildApp({
      config: loadConfig({ NODE_ENV: "test" } as NodeJS.ProcessEnv),
      repositories: null,
      checkDatabase: async () => false,
    });

    const response = await app.inject({ method: "GET", url: "/health/ready" });

    expect(response.statusCode).toBe(503);
    expect(response.json()).toMatchObject({
      checks: { database: "not_configured" },
    });
  });

  it("returns structured validation errors for an invalid lead", async () => {
    app = await buildApp({
      config: testConfig(),
      repositories: createFakeRepositories().repositories,
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/leads",
      payload: { ...validLead, email: "not-an-email", consent: false },
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.fields.email).toBeTruthy();
    expect(body.error.fields.consent).toBeTruthy();
  });

  it("stores a valid lead only when a repository is available", async () => {
    const { repositories, leads } = createFakeRepositories();
    app = await buildApp({ config: testConfig(), repositories });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/leads",
      payload: validLead,
    });

    expect(response.statusCode).toBe(201);
    expect(response.json().data.id).toBe("lead_1");
    expect(leads).toHaveLength(1);
  });

  it("refuses to pretend a lead was saved without a database", async () => {
    app = await buildApp({
      config: loadConfig({ NODE_ENV: "test" } as NodeJS.ProcessEnv),
      repositories: null,
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/leads",
      payload: validLead,
    });

    expect(response.statusCode).toBe(503);
    expect(response.json().error.code).toBe("DATABASE_NOT_CONFIGURED");
  });

  it("rejects honeypot submissions", async () => {
    const { repositories, leads } = createFakeRepositories();
    app = await buildApp({ config: testConfig(), repositories });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/leads",
      payload: { ...validLead, website: "https://spam.example" },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("SPAM_REJECTED");
    expect(leads).toHaveLength(0);
  });

  it("prices an order from the server catalogue and reports payment unavailable", async () => {
    const { repositories, orders } = createFakeRepositories();
    app = await buildApp({ config: testConfig(), repositories });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/orders",
      payload: { ...validOrder, amountMinor: 1 },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.data.amountMinor).toBe(399_900);
    expect(body.data.currency).toBe("INR");
    expect(body.data.payment.enabled).toBe(false);
    expect(body.data.payment.checkoutUrl).toBeNull();
    expect(body.data.payment.message).toContain("not enabled");
    expect(orders[0]?.amountMinor).toBe(399_900);
  });

  it("generates a checkout link only when a reconcilable template is configured", async () => {
    const { repositories } = createFakeRepositories();
    app = await buildApp({
      config: testConfig({
        PAYMENTS_ENABLED: "true",
        UPI_PAYMENT_LINK_TEMPLATE:
          "https://pay.example.com/checkout?ref={orderNumber}&amount={amountMinor}",
      }),
      repositories,
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/orders",
      payload: validOrder,
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.data.payment.enabled).toBe(true);
    expect(body.data.payment.checkoutUrl).toContain("DG-202611-000001");
  });

  it("does not expose order details without the matching email", async () => {
    const { repositories } = createFakeRepositories();
    app = await buildApp({ config: testConfig(), repositories });

    await app.inject({
      method: "POST",
      url: "/api/v1/orders",
      payload: validOrder,
    });

    const wrong = await app.inject({
      method: "GET",
      url: "/api/v1/orders/DG-202611-000001?email=someone@example.com",
    });

    expect(wrong.statusCode).toBe(404);
    expect(wrong.json().error.code).toBe("ORDER_NOT_FOUND");

    const right = await app.inject({
      method: "GET",
      url: "/api/v1/orders/DG-202611-000001?email=owner@example.com",
    });

    expect(right.statusCode).toBe(200);
    expect(right.json().data.status).toBe("PENDING_PAYMENT");
  });

  it("returns an honest unavailable state for chat when no provider is set", async () => {
    app = await buildApp({ config: testConfig(), repositories: null });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/chat",
      payload: { message: "What services do you offer?" },
    });

    expect(response.statusCode).toBe(503);
    expect(response.json().error.code).toBe("AI_NOT_CONFIGURED");
  });

  it("rejects webhooks when no signing secret is configured", async () => {
    app = await buildApp({
      config: testConfig(),
      repositories: createFakeRepositories().repositories,
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/payments/webhook",
      payload: {
        eventId: "evt_1",
        orderNumber: "DG-202611-000001",
        status: "paid",
        provider: "UPI",
        amountMinor: 399_900,
        currency: "INR",
      },
    });

    expect(response.statusCode).toBe(503);
    expect(response.json().error.code).toBe("PAYMENTS_NOT_CONFIGURED");
  });

  it("rejects webhooks with an invalid signature", async () => {
    app = await buildApp({
      config: testConfig({ UPI_WEBHOOK_SECRET: "test_secret" }),
      repositories: createFakeRepositories().repositories,
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/payments/webhook",
      headers: { "x-double-growth-signature": "deadbeef" },
      payload: {
        eventId: "evt_1",
        orderNumber: "DG-202611-000001",
        status: "paid",
        provider: "UPI",
        amountMinor: 399_900,
        currency: "INR",
      },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json().error.code).toBe("INVALID_SIGNATURE");
  });

  it("accepts a correctly signed webhook and applies the payment status", async () => {
    const { repositories, orders } = createFakeRepositories();
    app = await buildApp({
      config: testConfig({ UPI_WEBHOOK_SECRET: "test_secret" }),
      repositories,
    });

    await app.inject({
      method: "POST",
      url: "/api/v1/orders",
      payload: validOrder,
    });

    const payload = {
      eventId: "evt_paid_1",
      orderNumber: "DG-202611-000001",
      status: "paid",
      provider: "UPI",
      amountMinor: 399_900,
      currency: "INR",
    };

    const raw = JSON.stringify(payload);
    const signature = createHmac("sha256", "test_secret")
      .update(raw)
      .digest("hex");

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/payments/webhook",
      headers: {
        "content-type": "application/json",
        "x-double-growth-signature": `sha256=${signature}`,
      },
      payload: raw,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data.status).toBe("PAID");
    expect(orders[0]?.status).toBe("PAID");
  });

  it("does not accept a catalog price that differs from the verified amount", async () => {
    const { repositories } = createFakeRepositories();
    app = await buildApp({
      config: testConfig({ UPI_WEBHOOK_SECRET: "test_secret" }),
      repositories,
    });

    await app.inject({
      method: "POST",
      url: "/api/v1/orders",
      payload: validOrder,
    });

    const payload = {
      eventId: "evt_wrong_amount",
      orderNumber: "DG-202611-000001",
      status: "paid",
      provider: "UPI",
      amountMinor: 100,
      currency: "INR",
    };

    const raw = JSON.stringify(payload);
    const signature = createHmac("sha256", "test_secret")
      .update(raw)
      .digest("hex");

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/payments/webhook",
      headers: {
        "content-type": "application/json",
        "x-double-growth-signature": signature,
      },
      payload: raw,
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("AMOUNT_MISMATCH");
  });

  it("returns a JSON 404 for unknown routes", async () => {
    app = await buildApp({ config: testConfig(), repositories: null });

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/does-not-exist",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe("NOT_FOUND");
  });

  it("serves the shared catalogue without a database", async () => {
    app = await buildApp({ config: testConfig(), repositories: null });

    const services = await app.inject({
      method: "GET",
      url: "/api/v1/services",
    });
    expect(services.statusCode).toBe(200);
    expect(services.json().meta.count).toBe(8);

    const single = await app.inject({
      method: "GET",
      url: "/api/v1/services/business-website",
    });
    expect(single.statusCode).toBe(200);
    expect(single.json().data.category).toBe("Websites");

    const missing = await app.inject({
      method: "GET",
      url: "/api/v1/services/nope",
    });
    expect(missing.statusCode).toBe(404);
    expect(missing.json().error.code).toBe("SERVICE_NOT_FOUND");

    const solutions = await app.inject({
      method: "GET",
      url: "/api/v1/solutions",
    });
    expect(solutions.statusCode).toBe(200);
    expect(solutions.json().meta.count).toBe(5);

    const solution = await app.inject({
      method: "GET",
      url: "/api/v1/solutions/sell-online",
    });
    expect(solution.statusCode).toBe(200);
    expect(solution.json().data.serviceIds).toContain("ecommerce");

    const pricing = await app.inject({
      method: "GET",
      url: "/api/v1/pricing",
    });
    expect(pricing.statusCode).toBe(200);
    expect(pricing.json().data.packages[0].priceMinor).toBe(399_900);
  });

  it("reports integration states honestly on the health endpoint", async () => {
    app = await buildApp({ config: testConfig(), repositories: null });

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json().integrations).toEqual({
      database: "configured",
      ai: "not_configured",
      email: "not_configured",
      payments: "not_configured",
    });
  });

  it("refuses newsletter subscriptions without a database", async () => {
    app = await buildApp({ config: testConfig(), repositories: null });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/newsletter",
      payload: { email: "reader@example.com" },
    });

    expect(response.statusCode).toBe(503);
    expect(response.json().error.code).toBe("DATABASE_NOT_CONFIGURED");
  });

  it("accepts a newsletter subscription and rejects the honeypot", async () => {
    const { repositories } = createFakeRepositories();
    app = await buildApp({ config: testConfig(), repositories });

    const accepted = await app.inject({
      method: "POST",
      url: "/api/v1/newsletter",
      payload: { email: "Reader@Example.com", source: "footer" },
    });

    expect(accepted.statusCode).toBe(201);
    expect(accepted.json().data.subscribed).toBe(true);

    const spam = await app.inject({
      method: "POST",
      url: "/api/v1/newsletter",
      payload: { email: "bot@example.com", website: "https://spam.example" },
    });

    expect(spam.statusCode).toBe(400);
    expect(spam.json().error.code).toBe("SPAM_REJECTED");
  });

  it("creates a payment target only for a payable order", async () => {
    const { repositories, orders } = createFakeRepositories();
    app = await buildApp({ config: testConfig(), repositories });

    await app.inject({
      method: "POST",
      url: "/api/v1/orders",
      payload: validOrder,
    });

    const pending = await app.inject({
      method: "POST",
      url: "/api/v1/payments/create",
      payload: {
        orderNumber: "DG-202611-000001",
        email: "owner@example.com",
      },
    });

    expect(pending.statusCode).toBe(200);
    expect(pending.json().data.payment.enabled).toBe(false);
    expect(pending.json().data.payment.message).toContain("not enabled");

    const firstOrder = orders[0];
    if (!firstOrder) throw new Error("expected an order");

    firstOrder.status = "PAID";

    const paid = await app.inject({
      method: "POST",
      url: "/api/v1/payments/create",
      payload: {
        orderNumber: "DG-202611-000001",
        email: "owner@example.com",
      },
    });

    expect(paid.statusCode).toBe(409);
    expect(paid.json().error.code).toBe("ORDER_ALREADY_PAID");

    const unknown = await app.inject({
      method: "POST",
      url: "/api/v1/payments/create",
      payload: {
        orderNumber: "DG-202611-999999",
        email: "owner@example.com",
      },
    });

    expect(unknown.statusCode).toBe(404);
    expect(unknown.json().error.code).toBe("ORDER_NOT_FOUND");
  });

  it("stops chat when the monthly usage allowance is exhausted", async () => {
    const { repositories } = createFakeRepositories({
      aiUsage: {
        async consume() {
          return { allowed: false, count: 501 };
        },
      },
    });

    app = await buildApp({
      config: testConfig({ AI_MONTHLY_REQUEST_LIMIT: "500" }),
      repositories,
      chat: {
        configured: true,
        async reply() {
          return "This should not run.";
        },
      },
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/chat",
      payload: { message: "What services do you offer?" },
    });

    expect(response.statusCode).toBe(429);
    expect(response.json().error.code).toBe("AI_QUOTA_EXCEEDED");
  });
});
