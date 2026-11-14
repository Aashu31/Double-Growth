import type { ServiceId } from "./index";

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  outcome: string;
  bestFor: string;
  serviceIds: readonly ServiceId[];
  includes: readonly string[];
  nextStep: string;
}

/**
 * Solutions are outcome-led bundles of the services in the catalogue.
 *
 * They do not introduce a second price list. Every solution links back to a
 * service with a written scope, and any resulting engagement is still quoted
 * after discovery. Nothing here is a customer case study or a measured result.
 */
export const SOLUTIONS: readonly Solution[] = [
  {
    id: "establish-online",
    name: "Establish a credible presence",
    tagline: "Website, messaging and an enquiry path that works.",
    problem:
      "The business exists but the website does not explain it clearly, looks dated on a phone, or gives visitors no obvious next step.",
    outcome:
      "A focused website with structured service pages, a working enquiry form and the SEO foundations in place.",
    bestFor: "New businesses, local service companies and firms replacing a template site.",
    serviceIds: ["business-website", "digital-solutions", "maintenance-support"],
    includes: [
      "Page architecture agreed in writing",
      "Responsive design and implementation",
      "Enquiry form connected to a validated backend",
      "Metadata, sitemap and semantic structure",
    ],
    nextStep:
      "Share the services you offer and the action a visitor should take. We will propose the smallest useful site scope.",
  },
  {
    id: "sell-online",
    name: "Sell online with a real storefront",
    tagline: "Catalogue, checkout and order handling that match your operation.",
    problem:
      "Products are sold through messages or spreadsheets, stock is unclear, and there is no reliable record of what was paid.",
    outcome:
      "A storefront with a catalogue structure, a checkout path and server-verified payment handling.",
    bestFor: "Retailers, studios and brands moving from social-media orders to a storefront.",
    serviceIds: ["ecommerce", "business-website", "cloud-devops"],
    includes: [
      "Catalogue and category model",
      "Product pages and cart flow",
      "Payment integration prepared at the backend",
      "Order status and notification handling",
    ],
    nextStep:
      "Bring your catalogue size, fulfilment steps and preferred payment provider. The provider must be contracted before live payments.",
  },
  {
    id: "run-operations",
    name: "Run operations in one system",
    tagline: "Internal tools and school workflows without spreadsheet sprawl.",
    problem:
      "Daily work is split across registers, spreadsheets and messaging apps, so reporting is slow and exceptions are missed.",
    outcome:
      "A secure application with role-based access, one source of truth and a view of the work that needs attention.",
    bestFor: "Schools evaluating Sarthi, and teams outgrowing off-the-shelf tools.",
    serviceIds: ["custom-applications", "school-management", "cloud-devops"],
    includes: [
      "Workflow and role mapping",
      "Data model and API design",
      "Role-based access and server-side validation",
      "Deployment, backup and recovery planning",
    ],
    nextStep:
      "Describe the roles, the records and the exceptions. We will map the smallest useful first release before quoting.",
  },
  {
    id: "automate-work",
    name: "Automate repetitive work",
    tagline: "Practical AI and integrations with server-side controls.",
    problem:
      "The team repeats the same lookups, replies or data entry, and an unmanaged AI trial created more risk than it removed.",
    outcome:
      "A constrained assistant or integration that uses approved knowledge, keeps keys on the server and has a human fallback.",
    bestFor: "Businesses with a specific repetitive workflow and a clear source of approved information.",
    serviceIds: ["ai-automation", "digital-solutions", "custom-applications"],
    includes: [
      "Use-case and risk assessment",
      "Approved knowledge base",
      "Server-side keys and rate limiting",
      "Usage guardrails and a fallback path",
    ],
    nextStep:
      "Name the task you want removed and the documents or systems it depends on. If AI is the wrong tool, we will say so.",
  },
  {
    id: "keep-it-running",
    name: "Keep a live product healthy",
    tagline: "Maintenance, monitoring and a named technical contact.",
    problem:
      "A site launched and was then left alone. Dependencies age, forms break and small issues become emergencies.",
    outcome:
      "A maintained site with updates, fix handling, monitoring checks and a clear request process.",
    bestFor: "Businesses with a live website and no in-house technical owner.",
    serviceIds: ["maintenance-support", "cloud-devops", "digital-solutions"],
    includes: [
      "Dependency and security updates",
      "Bug fixes and small content changes",
      "Form and integration monitoring",
      "Backup and recovery checks",
    ],
    nextStep:
      "Share the current stack and access situation. We review maintainability before committing to take it on.",
  },
] as const;

export interface SolutionFaq {
  question: string;
  answer: string;
}

export const SOLUTION_FAQS: readonly SolutionFaq[] = [
  {
    question: "Is a solution a fixed-price package?",
    answer:
      "No. Growth Annual is the only published package at ₹3,999 per year. A solution describes an outcome that may combine several services; the actual scope and price are quoted in writing after discovery.",
  },
  {
    question: "Can a solution combine services from different categories?",
    answer:
      "Yes. That is the point. A storefront might need website work, payment integration and deployment support. Combining them in one scope keeps responsibility with one team instead of three suppliers.",
  },
  {
    question: "Do you guarantee a business result?",
    answer:
      "No. We can define the deliverable, test it and measure agreed events, but we do not guarantee revenue, rankings or lead volume. Those depend on factors outside the build.",
  },
  {
    question: "What happens if the solution is larger than our budget?",
    answer:
      "We reduce the scope to the smallest useful release rather than discounting work we cannot deliver well. The remaining phases can be quoted separately when they are needed.",
  },
] as const;

export function findSolution(id: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.id === id);
}
