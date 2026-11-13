import { createHmac, timingSafeEqual } from "node:crypto";
import type { AppConfig } from "../config.js";

export const UNAVAILABLE_PAYMENT_MESSAGE =
  "Online payment is not enabled on this environment yet. Your order is recorded as pending and no money has been collected through this website. The team will confirm payment instructions through a verified channel.";

export interface CheckoutTarget {
  enabled: boolean;
  checkoutUrl: string | null;
  message: string;
}

/**
 * Builds a hosted-checkout URL from the configured template.
 *
 * The template must include {orderNumber} so that a payment can be reconciled
 * to a specific order. If it does not, payment is treated as unavailable
 * rather than generating an unreconcilable link.
 */
export function buildCheckoutTarget(
  config: AppConfig,
  order: { orderNumber: string; amountMinor: number; currency: string },
): CheckoutTarget {
  const template = config.payments.linkTemplate;

  if (!config.payments.enabled || !template) {
    return {
      enabled: false,
      checkoutUrl: null,
      message: UNAVAILABLE_PAYMENT_MESSAGE,
    };
  }

  if (!template.includes("{orderNumber}")) {
    return {
      enabled: false,
      checkoutUrl: null,
      message:
        "Online payment is not fully configured: the checkout template cannot be reconciled to an order reference. No money has been collected. The team will confirm payment instructions through a verified channel.",
    };
  }

  const url = template
    .replaceAll("{orderNumber}", encodeURIComponent(order.orderNumber))
    .replaceAll("{amountMinor}", String(order.amountMinor))
    .replaceAll("{currency}", encodeURIComponent(order.currency));

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return {
      enabled: false,
      checkoutUrl: null,
      message: UNAVAILABLE_PAYMENT_MESSAGE,
    };
  }

  const isLocal = ["localhost", "127.0.0.1"].includes(parsed.hostname);
  if (parsed.protocol !== "https:" && !isLocal) {
    return {
      enabled: false,
      checkoutUrl: null,
      message:
        "Online payment is not fully configured: the checkout link is not HTTPS. No money has been collected. The team will confirm payment instructions through a verified channel.",
    };
  }

  return {
    enabled: true,
    checkoutUrl: parsed.toString(),
    message:
      "Continue to the secure hosted payment page. Your order remains pending until the provider confirms payment on the server.",
  };
}

export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | undefined,
  secret: string,
): boolean {
  if (!signatureHeader) return false;

  const provided = signatureHeader.startsWith("sha256=")
    ? signatureHeader.slice("sha256=".length)
    : signatureHeader;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");

  const providedBuffer = Buffer.from(provided, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (providedBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(providedBuffer, expectedBuffer);
}
