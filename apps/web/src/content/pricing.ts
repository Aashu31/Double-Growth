import { faqs } from "./faqs";

export const packageInclusions = [
  "A professionally designed business website within the agreed page and feature scope",
  "Responsive implementation for mobile, tablet and desktop",
  "Core SEO setup: page titles, descriptions, sitemap and robots configuration",
  "Contact and enquiry form connected to a validated backend",
  "Deployment support for the agreed hosting target",
  "Maintenance within the published support scope",
  "Access to new platform features released for the package during the term",
];

export const packageExclusions = [
  "Domain registration and renewal charges",
  "Paid hosting, server upgrades and bandwidth overages",
  "Payment gateway fees and transaction charges",
  "Paid AI provider usage above any agreed allowance",
  "Premium stock assets, custom photography and copywriting",
  "Features outside the written scope, quoted separately",
  "Unlimited development, unlimited hosting or unlimited support",
];

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

export const pricingPolicies = [
  {
    title: "Hosting policy",
    body: "Deployment support is included within the agreed package scope. Hosting itself is a third-party cost. Where possible it is set up under an account you own, or billed at actual cost with the limit stated in your quotation. Paid upgrades and bandwidth overages are never described as unlimited.",
  },
  {
    title: "Support policy",
    body: "Maintenance covers dependency and security updates, bug fixes and small content changes within the published support scope. It is not unlimited development or unlimited support. Response expectations, included hours and out-of-scope rates are confirmed in your written agreement.",
  },
  {
    title: "Source code ownership",
    body: "Subject to full payment and any third-party licence terms, ownership of the delivered project code and content is defined in the Ownership and Source Code Policy. Frameworks, libraries and paid assets remain under their own licences. Domains and hosting accounts stay separate.",
  },
] as const;

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

