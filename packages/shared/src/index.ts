export const COMPANY = {
  name: "Double Growth",
  legalName: "Double Growth",
  tagline: "Build Digital. Grow Business.",
  description:
    "A digital solutions agency building websites, e-commerce platforms, custom web applications and intelligent automation for businesses in India and worldwide.",
} as const;

export const SERVICE_IDS = [
  "business-website",
  "ecommerce",
  "custom-applications",
  "school-management",
  "ai-automation",
  "cloud-devops",
  "maintenance-support",
  "digital-solutions",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_CATEGORIES = [
  "All",
  "Websites",
  "Commerce",
  "Platforms",
  "Infrastructure",
  "Support",
  "Growth",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export interface ServiceSummary {
  id: ServiceId;
  name: string;
  category: Exclude<ServiceCategory, "All">;
  summary: string;
}

export const SERVICES: readonly ServiceSummary[] = [
  {
    id: "business-website",
    name: "Business Website Development",
    category: "Websites",
    summary:
      "Fast, credible business websites that explain what you do and turn visitors into enquiries.",
  },
  {
    id: "ecommerce",
    name: "E-commerce Website Development",
    category: "Commerce",
    summary:
      "Product catalogues, checkout flows and order management built for real retail operations.",
  },
  {
    id: "custom-applications",
    name: "Custom Web Applications",
    category: "Platforms",
    summary:
      "Purpose-built dashboards, portals and internal tools designed around your actual workflows.",
  },
  {
    id: "school-management",
    name: "School Management Solutions (Sarthi)",
    category: "Platforms",
    summary:
      "The School ERP module of the Double Growth platform, covering academics, attendance, fees and administration.",
  },
  {
    id: "ai-automation",
    name: "AI Integration and Automation",
    category: "Growth",
    summary:
      "Practical AI assistants and workflow automation with server-side controls and clear budgets.",
  },
  {
    id: "cloud-devops",
    name: "Cloud and DevOps Solutions",
    category: "Infrastructure",
    summary:
      "Deployment, hosting, monitoring and delivery pipelines that keep your product reliable.",
  },
  {
    id: "maintenance-support",
    name: "Website Maintenance and Support",
    category: "Support",
    summary:
      "Ongoing updates, fixes, monitoring and technical support after launch.",
  },
  {
    id: "digital-solutions",
    name: "Digital Business Solutions",
    category: "Growth",
    summary:
      "Integrations, landing pages and process improvements that connect your digital presence to operations.",
  },
] as const;

export const PACKAGES = [
  {
    id: "growth-annual",
    name: "Growth Annual",
    priceMinor: 399_900,
    currency: "INR",
    billingPeriod: "year",
    summary:
      "An annual website and digital presence package for businesses that want a dependable technical partner.",
  },
] as const;

export type PackageId = (typeof PACKAGES)[number]["id"];

export const BUDGET_RANGES = [
  "under-25000",
  "25000-50000",
  "50000-100000",
  "100000-300000",
  "300000-plus",
  "not-sure",
] as const;

export type BudgetRange = (typeof BUDGET_RANGES)[number];

export const PREFERRED_CONTACT_METHODS = [
  "email",
  "phone",
  "whatsapp",
] as const;

export type PreferredContactMethod =
  (typeof PREFERRED_CONTACT_METHODS)[number];

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "WON",
  "LOST",
] as const;

export const ORDER_STATUSES = [
  "PENDING_PAYMENT",
  "PAID",
  "FAILED",
  "CANCELLED",
  "REFUNDED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_PROVIDERS = ["UPI", "PAYPAL", "MANUAL"] as const;

export function findPackage(id: string) {
  return PACKAGES.find((item) => item.id === id);
}

export function findService(id: string) {
  return SERVICES.find((service) => service.id === id);
}
