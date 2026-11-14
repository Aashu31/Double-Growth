import {
  PACKAGE_EXCLUSIONS,
  PACKAGE_INCLUSIONS,
  PRICING_POLICIES,
} from "@double-growth/shared";
import { faqs } from "./faqs";

export const packageInclusions = PACKAGE_INCLUSIONS;
export const packageExclusions = PACKAGE_EXCLUSIONS;

export const packageComparison = [
  {
    feature: "Business website",
    growth: "Included within scope",
    project: "Quotation-based",
    platform: "Quotation-based",
  },
  {
    feature: "E-commerce capability",
    growth: "Available, scoped separately",
    project: "Quotation-based",
    platform: "Quotation-based",
  },
  {
    feature: "Custom web application",
    growth: "Not included",
    project: "Quotation-based",
    platform: "Quotation-based",
  },
  {
    feature: "Maintenance",
    growth: "Included within support scope",
    project: "Optional add-on",
    platform: "Optional add-on",
  },
  {
    feature: "AI assistant",
    growth: "Available when configured",
    project: "Scoped separately",
    platform: "Scoped separately",
  },
  {
    feature: "Source code ownership",
    growth: "Per Ownership Policy",
    project: "Per Ownership Policy",
    platform: "Per Ownership Policy",
  },
];

export const paymentRequirements = [
  "A contracted payment provider and merchant account",
  "Server-side provider credentials stored as environment variables",
  "A verified webhook endpoint with signature validation",
  "Idempotent order handling to prevent duplicate payment events",
  "A settlement and reconciliation process owned by the founders",
];

export const pricingPolicies = PRICING_POLICIES;

const pricingQuestions = new Set([
  "How does the ₹3,999 annual package work?",
  "Can I migrate my existing website?",
  "Is hosting included?",
  "Can I own my website source code?",
  "Do you provide maintenance?",
  "How do payments work?",
]);

export const pricingFaqs = faqs.filter((item) =>
  pricingQuestions.has(item.question),
);

