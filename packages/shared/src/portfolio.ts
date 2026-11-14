export type ProjectVisual = "interior" | "school" | "field";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string | null;
  liveUrl: string | null;
  caseStudyUrl: string | null;
  concept: boolean;
  visual: ProjectVisual;
  brief?: string;
  approach?: string;
  features?: readonly string[];
  note?: string;
}

/**
 * Published work is added here only after delivery and written client approval.
 *
 * Until then, the entries below are explicitly labelled design concepts. They
 * show how we approach a problem and are not presented as client projects,
 * paid engagements or delivered results. No client names, logos, screenshots or
 * performance figures are invented.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "interior-studio-storefront",
    title: "Interior Studio Storefront",
    category: "Commerce",
    description:
      "A design concept for an interiors studio: room galleries, a small curated catalogue and a quote request flow instead of an immediate checkout.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: null,
    liveUrl: null,
    caseStudyUrl: "/portfolio/interior-studio-storefront",
    concept: true,
    visual: "interior",
    brief:
      "A studio needs to show finished rooms and sell a small selection of products without operating a full marketplace. The concept explores how a visual portfolio and a short catalogue can share one browsing experience.",
    approach:
      "Lead with completed rooms, attach the products used in each room, and end with a quote request that captures the project context. Payment is deliberately left out until a provider and fulfilment process are agreed.",
    features: [
      "Room-by-room project galleries",
      "Curated catalogue with lead times",
      "Quote request with room and product context",
      "Enquiry inbox concept for the studio team",
    ],
    note:
      "This is a design concept. It contains no client identity, catalogue, transaction or performance result.",
  },
  {
    slug: "school-operations-dashboard",
    title: "School Operations Dashboard",
    category: "Platform",
    description:
      "A design concept for the Sarthi school module: attendance, fee status and parent communication in one operational view.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: null,
    liveUrl: null,
    caseStudyUrl: "/portfolio/school-operations-dashboard",
    concept: true,
    visual: "school",
    brief:
      "School administrators often work across registers, spreadsheets and messaging apps. The concept explores a single daily view for the tasks that need attention, while keeping sensitive student data behind role-based access.",
    approach:
      "Start with the day's exceptions rather than a wall of totals: unresolved attendance, overdue fee follow-ups and messages waiting for a reply. Each item links to a scoped action with an audit trail.",
    features: [
      "Daily exception view for administrators",
      "Class attendance and follow-up status",
      "Fee status without exposing payment credentials",
      "Parent communication with a visible history",
    ],
    note:
      "This is a design concept for the Sarthi module. It is not a working school deployment and contains no student or school data.",
  },
  {
    slug: "field-services-booking",
    title: "Field Services Booking",
    category: "Website",
    description:
      "A design concept for a local service business: service selection, coverage checks and a request flow that confirms what happens next.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: null,
    liveUrl: null,
    caseStudyUrl: "/portfolio/field-services-booking",
    concept: true,
    visual: "field",
    brief:
      "Local service businesses lose enquiries when a visitor cannot tell whether their area is covered or what happens after submitting a form. The concept makes those answers visible before the request is sent.",
    approach:
      "Ask for the service and location first, show the next available window in plain language, then collect contact details. Confirmation explains who will call and when, without promising a slot that has not been reserved.",
    features: [
      "Service and coverage check before contact details",
      "Preferred time window, subject to confirmation",
      "Clear confirmation with the next step",
      "Mobile-first layout for use on site",
    ],
    note:
      "This is a design concept. No booking, availability or customer data is live.",
  },
] as const;

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export interface Testimonial {
  name: string;
  designation: string;
  quote: string;
  rating: number | null;
}

/**
 * Intentionally empty until verified customer reviews exist and consent to
 * publish has been recorded.
 */
export const TESTIMONIALS: readonly Testimonial[] = [];
