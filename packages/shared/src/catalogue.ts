import type { ServiceCategory, ServiceId } from "./index";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: ServiceId;
  name: string;
  category: Exclude<ServiceCategory, "All">;
  summary: string;
  problem: string;
  solution: string;
  deliverables: readonly string[];
  features: readonly string[];
  benefits: readonly string[];
  technologies: readonly string[];
  faqs: readonly ServiceFaq[];
}

/**
 * Approved service content. The public website and the API both read from this
 * file so a service description can never drift between the two surfaces.
 */
export const SERVICE_DETAILS: readonly ServiceDetail[] = [
  {
    id: "business-website",
    name: "Business Website Development",
    category: "Websites",
    summary:
      "A fast, credible website that explains your business clearly and turns visitors into enquiries.",
    problem:
      "Many businesses either have no website or a dated one that does not explain the offer, does not load well on mobile, and gives visitors no obvious next step.",
    solution:
      "We structure the site around the questions a real customer asks, then build it as a fast, accessible Next.js application with a working enquiry pathway and the SEO foundations already in place.",
    deliverables: [
      "Page architecture and content structure",
      "Responsive design system built for your brand",
      "Implementation, QA and deployment support",
    ],
    features: [
      "Structured page architecture built around your services",
      "Responsive layouts for mobile, tablet and desktop",
      "Enquiry forms connected to a real backend",
      "SEO foundations: metadata, sitemap and semantic HTML",
      "Performance-conscious rendering and optimised assets",
    ],
    benefits: [
      "A professional first impression that matches the quality of your work",
      "Clear service messaging instead of a generic brochure",
      "A measurable route from visitor to enquiry",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    faqs: [
      {
        question: "How many pages are included?",
        answer:
          "The page count is agreed in the written scope before work starts. The Growth Annual package is intended for a focused business website, not an unlimited page build.",
      },
      {
        question: "Can you work with our existing brand?",
        answer:
          "Yes. We can use your existing logo, colours and content, or propose a restrained refresh inside the agreed scope. Premium photography and copywriting are quoted separately.",
      },
      {
        question: "Who owns the finished website?",
        answer:
          "Ownership of the delivered project code and content is defined in the Ownership and Source Code Policy. Third-party frameworks, libraries and paid assets remain under their own licences.",
      },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce Website Development",
    category: "Commerce",
    summary:
      "Product catalogues and checkout experiences built around how your business actually sells.",
    problem:
      "Selling online requires more than a product grid. Catalogue structure, pricing, payment handling and order communication all have to work together.",
    solution:
      "We model the catalogue and order lifecycle first, then build a storefront and admin flow that match your fulfilment process. Payments are confirmed server-side, not by a browser redirect.",
    deliverables: [
      "Catalogue and category model",
      "Storefront, cart and checkout flow",
      "Payment and order integration plan",
    ],
    features: [
      "Catalogue and category architecture",
      "Product detail pages with structured content",
      "Cart and checkout flow design",
      "Payment provider integration prepared at the backend",
      "Order notifications and status handling",
    ],
    benefits: [
      "A storefront that stays consistent as the catalogue grows",
      "Payment confirmation handled server-side, not by browser redirects",
      "A buying experience that works on a phone",
    ],
    technologies: ["Next.js", "Fastify", "PostgreSQL", "Payment APIs"],
    faqs: [
      {
        question: "Which payment providers can you integrate?",
        answer:
          "The architecture supports India-first providers and PayPal for international customers. A specific provider requires a merchant account and credentials; gateway fees are a third-party cost.",
      },
      {
        question: "Is e-commerce included in ₹3,999/year?",
        answer:
          "No. E-commerce is scoped and quoted separately because catalogue size, payment setup and fulfilment requirements vary substantially between stores.",
      },
      {
        question: "Do you migrate an existing catalogue?",
        answer:
          "A migration is possible when the source data is available in a structured export. The effort is estimated during discovery and included in the written quotation.",
      },
    ],
  },
  {
    id: "custom-applications",
    name: "Custom Web Applications",
    category: "Platforms",
    summary:
      "Dashboards, portals and internal tools designed around the workflow you actually run.",
    problem:
      "Off-the-shelf software forces your team into someone else's process. Spreadsheets and disconnected tools create duplicated work and no reliable source of truth.",
    solution:
      "We map roles, data and exceptions before writing code, then build a secure application with server-side validation, clear permissions and a reporting view your team can rely on.",
    deliverables: [
      "Workflow and role mapping",
      "Data model and API design",
      "Application build, QA and handover",
    ],
    features: [
      "Workflow and data modelling before build",
      "Role-based access and secure sessions",
      "Server-side validation and audit-friendly records",
      "Reporting views and operational dashboards",
      "Integration points for existing systems",
    ],
    benefits: [
      "Software shaped around your operation, not the reverse",
      "One authoritative place for business data",
      "Room to extend the application as the business grows",
    ],
    technologies: ["Next.js", "Fastify", "PostgreSQL", "Prisma"],
    faqs: [
      {
        question: "How is a custom application priced?",
        answer:
          "After discovery, we define the smallest useful release, estimate it, and quote in writing. Builds are staged so you can approve scope before the next phase begins.",
      },
      {
        question: "Can it integrate with our current tools?",
        answer:
          "Integration depends on whether the other system exposes a documented API or a supported import/export format. We confirm that during discovery rather than assuming it.",
      },
      {
        question: "Do you provide a client portal?",
        answer:
          "A client portal is not part of this website milestone. The platform boundaries are designed so later modules can be added without rebuilding the public site.",
      },
    ],
  },
  {
    id: "school-management",
    name: "School Management Solutions (Sarthi)",
    category: "Platforms",
    summary:
      "Sarthi is the School ERP module of the Double Growth platform, covering academic and administrative operations.",
    problem:
      "Schools often manage admissions, attendance, examinations and fees across separate registers and spreadsheets, which makes reporting slow and error-prone.",
    solution:
      "Sarthi brings the daily exceptions into one operational view with role-based access and school-level tenant isolation. It is developed inside the Double Growth platform, not as a separate product or repository.",
    deliverables: [
      "School onboarding and role model",
      "Academic session and attendance setup",
      "Fee and examination workflow configuration",
    ],
    features: [
      "Student, teacher and parent records",
      "Admissions and academic session structure",
      "Attendance and timetable workflows",
      "Examination, results and fee management",
      "School-specific modules under strict tenant isolation",
    ],
    benefits: [
      "A single operational view for school administration",
      "Role-based access for different school users",
      "Each school's data isolated from every other school",
    ],
    technologies: [
      "Next.js",
      "Fastify",
      "PostgreSQL",
      "Role-based access control",
    ],
    faqs: [
      {
        question: "Is Sarthi available as a complete product today?",
        answer:
          "Sarthi is an integrated Double Growth module under active development. This website presents the module; it does not claim a live school deployment or completed customer rollouts.",
      },
      {
        question: "How is student data protected?",
        answer:
          "Sarthi is designed around tenant isolation, role-based access and audited actions. A school deployment requires its own data-processing agreement and access review before go-live.",
      },
      {
        question: "Can we see a demonstration?",
        answer:
          "A demonstration is arranged only when there is a working interface relevant to your requirement. We do not present slide decks as a product demo.",
      },
    ],
  },
  {
    id: "ai-automation",
    name: "AI Integration and Automation",
    category: "Growth",
    summary:
      "Practical AI assistants and automation, with server-side keys, approved knowledge and honest limits.",
    problem:
      "AI demos are easy; dependable AI in a business workflow is not. Uncontrolled prompts, exposed keys and invented answers create more risk than value.",
    solution:
      "We constrain the assistant to an approved knowledge base, keep provider keys on the server, cap usage, and fall back to a human contact path when the provider is unavailable.",
    deliverables: [
      "Use-case and risk assessment",
      "Approved knowledge base",
      "Server-side integration and monitoring",
    ],
    features: [
      "Provider-independent integration layer",
      "Server-side API keys and rate limiting",
      "Approved knowledge base instead of open-ended guessing",
      "Clear fallback when the provider is unavailable",
      "Usage and cost guardrails designed per engagement",
    ],
    benefits: [
      "Automation that answers from approved information",
      "No AI credentials in the browser",
      "A predictable fallback path to a human",
    ],
    technologies: ["AI provider APIs", "Fastify", "Zod", "Next.js"],
    faqs: [
      {
        question: "Do you guarantee AI answers are always correct?",
        answer:
          "No. The assistant is limited to approved knowledge and instructed not to invent policies or prices, but AI output still requires review for sensitive use cases.",
      },
      {
        question: "How is AI usage cost controlled?",
        answer:
          "Usage is rate-limited and monitored against a planned monthly budget. Any provider allowance included in an engagement is stated in writing; usage above it is a third-party cost.",
      },
      {
        question: "Which AI providers do you support?",
        answer:
          "The adapter targets OpenAI-compatible chat completions, so compatible providers can be substituted. A specific provider is confirmed per engagement.",
      },
    ],
  },
  {
    id: "cloud-devops",
    name: "Cloud and DevOps Solutions",
    category: "Infrastructure",
    summary:
      "Deployment, hosting, monitoring and delivery pipelines that keep a product reliable after launch.",
    problem:
      "A site that works on a laptop can fail in production without environment separation, backups, monitoring or a repeatable deployment process.",
    solution:
      "We set up environment separation, automated checks and a documented release process, then verify health monitoring and recovery steps before the project is handed over.",
    deliverables: [
      "Environment and secret configuration",
      "CI checks and deployment pipeline",
      "Monitoring, backup and recovery notes",
    ],
    features: [
      "Environment and secret management",
      "Deployment pipelines and preview environments",
      "Database backup and restoration planning",
      "Uptime and error monitoring setup",
      "Security headers, HTTPS and access controls",
    ],
    benefits: [
      "Deployments that are repeatable rather than improvised",
      "Problems detected before customers report them",
      "A documented recovery path",
    ],
    technologies: ["Vercel", "Render", "Docker", "GitHub Actions"],
    faqs: [
      {
        question: "Is hosting included in the project?",
        answer:
          "Hosting is a third-party cost. Where possible it is set up under an account you own, or billed at actual cost with the limit stated in your quotation.",
      },
      {
        question: "Can you take over an existing deployment?",
        answer:
          "Usually, after an access and risk review. We confirm what is recoverable, what must be rebuilt and what the ongoing responsibility split will be.",
      },
      {
        question: "Do you offer a service-level agreement?",
        answer:
          "Support expectations are confirmed in the written agreement. We do not advertise a 24/7 enterprise SLA for a small-business package unless it has been specifically contracted.",
      },
    ],
  },
  {
    id: "maintenance-support",
    name: "Website Maintenance and Support",
    category: "Support",
    summary:
      "Ongoing updates, fixes and technical support so your website keeps working after launch.",
    problem:
      "Websites drift: dependencies age, content changes, forms break and small issues accumulate. Without an owner, maintenance becomes an emergency.",
    solution:
      "We monitor the site, apply dependency and security updates, handle small content changes within a published scope and keep a clear request process for anything larger.",
    deliverables: [
      "Maintenance scope and response expectations",
      "Update and fix cadence",
      "Named technical contact",
    ],
    features: [
      "Dependency and security updates",
      "Bug fixes and small content changes",
      "Form and integration monitoring",
      "Backup and recovery checks",
      "A clear request process and response expectations",
    ],
    benefits: [
      "A named technical contact after launch",
      "Fewer avoidable outages",
      "Changes handled without ad-hoc freelancer hunting",
    ],
    technologies: ["Next.js", "PostgreSQL", "Monitoring tools"],
    faqs: [
      {
        question: "Is maintenance unlimited?",
        answer:
          "No. Maintenance covers updates, fixes and small changes within the published scope. New features, redesigns and large content migrations are quoted separately.",
      },
      {
        question: "What response time should we expect?",
        answer:
          "Response expectations are written into your agreement. We do not publish a blanket response time that we cannot guarantee for every plan.",
      },
      {
        question: "Can you maintain a site you did not build?",
        answer:
          "After a technical review, yes — provided the codebase and access are in a maintainable state. The review findings are shared before any commitment.",
      },
    ],
  },
  {
    id: "digital-solutions",
    name: "Digital Business Solutions",
    category: "Growth",
    summary:
      "Integrations, landing pages and process improvements that connect your digital presence to operations.",
    problem:
      "A website alone does not fix a broken enquiry process, disconnected payments or manual reporting. The gaps usually sit between systems.",
    solution:
      "We trace the path from enquiry to delivery, remove manual handoffs where the tools allow it, and instrument the parts that matter so improvement is measured rather than assumed.",
    deliverables: [
      "Process and integration map",
      "Landing page or workflow implementation",
      "Tracking and handover documentation",
    ],
    features: [
      "Conversion-focused landing pages",
      "CRM and lead pipeline integration points",
      "Payment and invoicing workflow design",
      "Analytics and event tracking setup",
      "Process automation across existing tools",
    ],
    benefits: [
      "Enquiries reach the right place instead of an inbox",
      "Fewer manual steps between marketing and delivery",
      "A digital presence connected to how the business runs",
    ],
    technologies: ["Next.js", "Fastify", "Webhooks", "Analytics"],
    faqs: [
      {
        question: "Do you provide ongoing marketing services?",
        answer:
          "No. This milestone covers digital build and integration work. Marketing campaigns, advertising management and content programmes are outside the current service scope.",
      },
      {
        question: "Can you connect our CRM?",
        answer:
          "When the CRM exposes a documented API or webhook, integration is usually possible. Access, rate limits and subscription costs are confirmed during discovery.",
      },
      {
        question: "How do you measure improvement?",
        answer:
          "We agree the events that matter before launch — for example a qualified enquiry or completed checkout — and track those rather than vanity page views.",
      },
    ],
  },
] as const;

export function findServiceDetail(id: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.id === id);
}
