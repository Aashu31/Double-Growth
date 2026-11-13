import type { ServiceCategory, ServiceId } from "@double-growth/shared";

export type IconName =
  | "globe"
  | "cart"
  | "layers"
  | "school"
  | "sparkles"
  | "cloud"
  | "wrench"
  | "chart";

export interface ServiceContent {
  id: ServiceId;
  name: string;
  category: Exclude<ServiceCategory, "All">;
  icon: IconName;
  summary: string;
  problem: string;
  features: string[];
  benefits: string[];
  technologies: string[];
}

export const servicesContent: readonly ServiceContent[] = [
  {
    id: "business-website",
    name: "Business Website Development",
    category: "Websites",
    icon: "globe",
    summary:
      "A fast, credible website that explains your business clearly and turns visitors into enquiries.",
    problem:
      "Many businesses either have no website or a dated one that does not explain the offer, does not load well on mobile, and gives visitors no obvious next step.",
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
  },
  {
    id: "ecommerce",
    name: "E-commerce Website Development",
    category: "Commerce",
    icon: "cart",
    summary:
      "Product catalogues and checkout experiences built around how your business actually sells.",
    problem:
      "Selling online requires more than a product grid. Catalogue structure, pricing, payment handling and order communication all have to work together.",
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
  },
  {
    id: "custom-applications",
    name: "Custom Web Applications",
    category: "Platforms",
    icon: "layers",
    summary:
      "Dashboards, portals and internal tools designed around the workflow you actually run.",
    problem:
      "Off-the-shelf software forces your team into someone else's process. Spreadsheets and disconnected tools create duplicated work and no reliable source of truth.",
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
  },
  {
    id: "school-management",
    name: "School Management Solutions (Sarthi)",
    category: "Platforms",
    icon: "school",
    summary:
      "Sarthi is the School ERP module of the Double Growth platform, covering academic and administrative operations.",
    problem:
      "Schools often manage admissions, attendance, examinations and fees across separate registers and spreadsheets, which makes reporting slow and error-prone.",
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
  },
  {
    id: "ai-automation",
    name: "AI Integration and Automation",
    category: "Growth",
    icon: "sparkles",
    summary:
      "Practical AI assistants and automation, with server-side keys, approved knowledge and honest limits.",
    problem:
      "AI demos are easy; dependable AI in a business workflow is not. Uncontrolled prompts, exposed keys and invented answers create more risk than value.",
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
  },
  {
    id: "cloud-devops",
    name: "Cloud and DevOps Solutions",
    category: "Infrastructure",
    icon: "cloud",
    summary:
      "Deployment, hosting, monitoring and delivery pipelines that keep a product reliable after launch.",
    problem:
      "A site that works on a laptop can fail in production without environment separation, backups, monitoring or a repeatable deployment process.",
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
  },
  {
    id: "maintenance-support",
    name: "Website Maintenance and Support",
    category: "Support",
    icon: "wrench",
    summary:
      "Ongoing updates, fixes and technical support so your website keeps working after launch.",
    problem:
      "Websites drift: dependencies age, content changes, forms break and small issues accumulate. Without an owner, maintenance becomes an emergency.",
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
  },
  {
    id: "digital-solutions",
    name: "Digital Business Solutions",
    category: "Growth",
    icon: "chart",
    summary:
      "Integrations, landing pages and process improvements that connect your digital presence to operations.",
    problem:
      "A website alone does not fix a broken enquiry process, disconnected payments or manual reporting. The gaps usually sit between systems.",
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
  },
] as const;
