import { describe, expect, it } from "vitest";
import {
  chatSchema,
  leadSchema,
  orderSchema,
  orderLookupSchema,
  paymentWebhookSchema,
} from "./index.js";

const lead = {
  name: "Riya Sharma",
  email: "RIYA@Example.com",
  phone: "+91 98765 43210",
  businessName: "Sharma Interiors",
  service: "business-website",
  budget: "25000-50000",
  description:
    "We need a clean website for an interior design studio with a portfolio and enquiry form.",
  preferredContact: "whatsapp",
  consent: true,
};

describe("leadSchema", () => {
  it("accepts a complete enquiry and normalises the email", () => {
    const parsed = leadSchema.parse(lead);
    expect(parsed.email).toBe("riya@example.com");
  });

  it("requires consent and a meaningful description", () => {
    const result = leadSchema.safeParse({
      ...lead,
      consent: false,
      description: "Too short",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    const fields = result.error.issues.map((issue) => issue.path[0]);
    expect(fields).toContain("consent");
    expect(fields).toContain("description");
  });

  it("rejects an invalid service and phone number", () => {
    const result = leadSchema.safeParse({
      ...lead,
      service: "not-a-service",
      phone: "abc",
    });

    expect(result.success).toBe(false);
  });

  it("accepts the hidden honeypot field so the API can reject spam itself", () => {
    const result = leadSchema.safeParse({ ...lead, website: "" });
    expect(result.success).toBe(true);
  });
});

describe("orderSchema", () => {
  it("accepts a valid package order", () => {
    const result = orderSchema.safeParse({
      customerName: "Riya Sharma",
      email: "riya@example.com",
      phone: "9876543210",
      packageId: "growth-annual",
      consent: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects an unknown package", () => {
    const result = orderSchema.safeParse({
      customerName: "Riya Sharma",
      email: "riya@example.com",
      phone: "9876543210",
      packageId: "free-forever",
      consent: true,
    });

    expect(result.success).toBe(false);
  });
});

describe("orderLookupSchema", () => {
  it("requires a valid email", () => {
    expect(orderLookupSchema.safeParse({ email: "nope" }).success).toBe(false);
    expect(
      orderLookupSchema.safeParse({ email: "buyer@example.com" }).success,
    ).toBe(true);
  });
});

describe("chatSchema", () => {
  it("caps history length and message size", () => {
    const history = Array.from({ length: 13 }, () => ({
      role: "user" as const,
      content: "hello",
    }));

    expect(chatSchema.safeParse({ message: "hi", history }).success).toBe(false);
    expect(
      chatSchema.safeParse({ message: "x".repeat(1001) }).success,
    ).toBe(false);
    expect(chatSchema.safeParse({ message: "hi" }).success).toBe(true);
  });
});

describe("paymentWebhookSchema", () => {
  it("only accepts known statuses and providers", () => {
    const base = {
      eventId: "evt_123",
      orderNumber: "DG-202611-000001",
      status: "paid",
      amountMinor: 399900,
      currency: "INR",
      provider: "UPI",
    };

    expect(paymentWebhookSchema.safeParse(base).success).toBe(true);
    expect(
      paymentWebhookSchema.safeParse({ ...base, status: "maybe" }).success,
    ).toBe(false);
    expect(
      paymentWebhookSchema.safeParse({ ...base, provider: "CARD" }).success,
    ).toBe(false);
  });
});
