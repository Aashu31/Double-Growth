import { z } from "zod";
import {
  BUDGET_RANGES,
  PACKAGES,
  PREFERRED_CONTACT_METHODS,
  SERVICE_IDS,
} from "@double-growth/shared";

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Enter a valid phone number.")
  .max(24, "Phone number is too long.")
  .regex(/^\+?[\d\s()-]+$/, "Use digits, spaces, +, - or parentheses only.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  }, "Enter a phone number with 8 to 15 digits.");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Enter a valid email address.")
  .max(254, "Email address is too long.")
  .email("Enter a valid email address.");

const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(120, "Name is too long.");

export const leadSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  businessName: z
    .string()
    .trim()
    .max(160, "Business name is too long.")
    .optional()
    .or(z.literal("")),
  service: z.enum(SERVICE_IDS, {
    error: "Select the service you need.",
  }),
  budget: z.enum(BUDGET_RANGES).optional(),
  description: z
    .string()
    .trim()
    .min(20, "Describe your project in at least 20 characters.")
    .max(2000, "Project description must be 2,000 characters or fewer."),
  preferredContact: z.enum(PREFERRED_CONTACT_METHODS).optional(),
  consent: z.literal(true, {
    error: "Consent is required so we can respond to your enquiry.",
  }),
  // Honeypot field. Real visitors never see or fill this.
  website: z.string().max(200).optional(),
  source: z.string().trim().max(80).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const orderSchema = z.object({
  customerName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  businessName: z
    .string()
    .trim()
    .max(160, "Business name is too long.")
    .optional()
    .or(z.literal("")),
  gstin: z
    .string()
    .trim()
    .max(20, "GSTIN is too long.")
    .optional()
    .or(z.literal("")),
  packageId: z.enum(
    PACKAGES.map((item) => item.id) as [string, ...string[]],
    { error: "Select a valid package." },
  ),
  consent: z.literal(true, {
    error: "Consent is required to place an order.",
  }),
  website: z.string().max(200).optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const newsletterSchema = z.object({
  email: emailSchema,
  source: z.string().trim().max(80).optional(),
  // Honeypot field. Real visitors never see or fill this.
  website: z.string().max(200).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const orderLookupSchema = z.object({
  email: emailSchema,
});

export const chatSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Enter a message.")
    .max(1000, "Message must be 1,000 characters or fewer."),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000),
      }),
    )
    .max(12, "Conversation history is too long.")
    .optional()
    .default([]),
});

export type ChatInput = z.infer<typeof chatSchema>;

export const paymentWebhookSchema = z.object({
  eventId: z.string().trim().min(1).max(200),
  orderNumber: z.string().trim().min(4).max(40),
  status: z.enum(["paid", "failed", "refunded"]),
  amountMinor: z.number().int().positive().optional(),
  currency: z.string().trim().length(3).optional(),
  provider: z.enum(["UPI", "PAYPAL"]),
});

export type PaymentWebhookInput = z.infer<typeof paymentWebhookSchema>;
