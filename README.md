# Double Growth — Official Website

**Build Digital. Grow Business.**

The official business website and lead-generation platform for **Double Growth**, a digital solutions agency and future SaaS product company.

---

> **Documentation status — read this first**
>
> This README describes the **target** Version 1 system. During documentation the repository was inspected and found to contain **no application code** (see [Repository Status](#2-repository-status)). Every capability, package, environment variable, route and database model below is therefore marked **Planned** unless explicitly stated otherwise.
>
> Nothing in this document should be read as evidence that a feature is implemented, deployed, or live.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Repository Status](#2-repository-status)
3. [About Double Growth](#3-about-double-growth)
4. [Why This Website Exists](#4-why-this-website-exists)
5. [Target Audience](#5-target-audience)
6. [Version 1 Scope](#6-version-1-scope)
7. [Technology Stack](#7-technology-stack)
8. [System Architecture](#8-system-architecture)
9. [Planned Repository Structure](#9-planned-repository-structure)
10. [Getting Started (Windows 11)](#10-getting-started-windows-11)
11. [Environment Variables](#11-environment-variables)
12. [Development Commands](#12-development-commands)
13. [Database and Data Layer](#13-database-and-data-layer)
14. [Design and UX Requirements](#14-design-and-ux-requirements)
15. [Security Requirements](#15-security-requirements)
16. [Roadmap](#16-roadmap)
17. [Development Standards](#17-development-standards)
18. [Git and Contribution Workflow](#18-git-and-contribution-workflow)
19. [Testing Strategy](#19-testing-strategy)
20. [Deployment](#20-deployment)
21. [Troubleshooting](#21-troubleshooting)
22. [Operational and Legal Notes](#22-operational-and-legal-notes)
23. [Pending Verification](#23-pending-verification)
24. [Contact](#24-contact)
25. [License](#25-license)

---

## 1. Overview

Double Growth is a technology company that builds websites, e-commerce platforms and custom web applications for businesses in India and abroad. The company is operated by two co-founders and combines a digital agency business with its own software platform:

| Area | Description | Status |
|---|---|---|
| **Digital Agency** | Website development, e-commerce, custom web applications, redesign, deployment, maintenance, hosting management and technical support for client businesses. | Active business focus — the subject of this repository |
| **Sarthi (platform module)** | Sarthi is the School Management System (School ERP) module within the Double Growth platform. It is designed to manage schools, students, teachers, parents, academic activities, attendance, examinations, fees and school administration. | Platform module — **not** part of this website's Version 1 |

Sarthi is an integrated module of the main Double Growth dashboard/platform, not a separate standalone product.

This repository is intended to hold the Double Growth Official Business Website, **Version 1**: the public marketing site, the service catalogue, the portfolio, the pricing presentation, and the inquiry (lead capture) system that feeds the founders' sales pipeline.

**Intended primary domain:** `doublegrowth.in` — registration, DNS and hosting are **not verified** and the site is **not live**. Do not present this domain as an active website until it resolves and serves the production build.

---

## 2. Repository Status

### What was inspected

| Item | Finding |
|---|---|
| Inspection date | 14 November 2026 |
| Working directory | `C:\Users\Aashu\Desktop\Double Growth` |
| Files present | `desktop.ini` only (114 bytes, Windows folder configuration file) |
| Git repository | Not initialized |
| `package.json` / workspace files | Not present |
| Application source code | Not present |
| `docs/`, `infrastructure/`, `.github/` | Not present |
| Environment templates | Not present |
| Existing documentation | None found |

### What this means

- **No technology is installed in this project yet.** The stack in [Section 7](#7-technology-stack) is a decision record, not an inventory. Package names and versions must be recorded from the real `package.json` files once the repository is scaffolded.
- **No command in this README is runnable today.** Commands are defined as a *target command surface* for milestone **M0** and are labelled accordingly.
- **No API route, database model, migration, or integration exists.** Nothing of that kind is documented here as fact.
- **No design system exists to inspect.** The palette, typography and spacing scale are therefore marked **Pending Verification** in [Section 14](#14-design-and-ux-requirements).

Sections that depend on real code carry an explicit status label. When the foundation milestone is complete, replace each label with the verified value and delete the corresponding entry from [Pending Verification](#23-pending-verification).

### Status vocabulary used in this document

| Label | Meaning |
|---|---|
| **Implemented** | Present in the repository and verified to work |
| **Configured** | Present in configuration, not yet verified in a running environment |
| **Planned** | Agreed as intended scope, no code exists |
| **Pending Verification** | A value, name or decision is required but has not been confirmed |
| **Not in V1** | Explicitly excluded from this release |

At the time of writing, every capability in this repository is **Planned** or **Pending Verification**.

---

## 3. About Double Growth

### Mission

Help businesses establish a credible, effective digital presence — and grow through it — using well-engineered websites and applications rather than template assembly.

### Vision

Operate as a digital solutions agency that funds and builds its own software platform, with Sarthi — its School Management System (School ERP) module — as the first planned capability.

### Structure

Double Growth is founded and run by **two co-founders**. Both are expected to hold **separate administrative accounts** in every system the company operates. Shared credentials are prohibited. Founder names, roles and titles are **Pending Verification** for publication and are deliberately omitted from this public README.

### Business areas

**Digital Agency (current focus)**

- Business website development
- E-commerce website development
- Custom web applications
- Website redesign
- Landing page development
- Website deployment
- Website maintenance
- Hosting management
- Technical support
- Custom integrations

**Sarthi (platform module)**

Sarthi is the School Management System (School ERP) module within the Double Growth platform. It is designed to manage schools, students, teachers, parents, academic activities, attendance, examinations, fees and school administration.

Planned capabilities: student management, admission management, teacher management, attendance, timetable, examination and results, fee management, homework, parent portal, student portal, teacher portal, and mobile applications.

Sarthi is **not a separate standalone product** and has no independent repository. It is a module of the main Double Growth dashboard/platform, with its own role-based permissions, school-specific modules and strict multi-tenant data isolation so that each school's data remains separate. It is referenced here to explain company direction and the long-term roadmap, and is **not** part of the public website's Version 1. It must not appear on the public website as an available product, a launched platform, or a supported service.

---

## 4. Why This Website Exists

The website is a **sales and credibility asset**, not a portfolio experiment. It must read as an established technology business, not an unfinished startup landing page or a personal developer portfolio.

### Primary objective

Convert qualified visitors into paying customers by establishing trust and making it easy to start a conversation.

### Secondary objectives

1. Company identity and online presence.
2. Digital service catalogue with clear scope.
3. Portfolio and demonstration showcase.
4. Lead generation platform.
5. Structured customer inquiry system.
6. Sales conversion channel.
7. Information source for prospective customers.

### Success signals (to be defined with real targets)

- Inquiry submissions with complete project context.
- Service and pricing page engagement.
- Qualified leads reaching a founder follow-up.
- Reduced back-and-forth during initial scoping.

Quantified targets — traffic, conversion rate, lead volume — are **Pending Verification**. This document does not state performance figures.

### Content integrity rules

The public site must never contain fabricated credibility. Specifically:

- No invented client projects, client names or logos.
- No testimonials, ratings or reviews from customers who do not exist.
- No statistics, years of experience, project counts, or team sizes that cannot be substantiated.
- No "trusted by" strips unless the referenced organisations have consented.
- Any sample work published before real client delivery must be clearly labelled **Concept Demonstration**.
- Pricing must be presented as indicative until a formal quotation is issued.

---

## 5. Target Audience

| Segment | What they need | How the site serves them |
|---|---|---|
| Local businesses in India | A professional website and a dependable technical partner | Service pages in plain language, indicative pricing, direct contact options |
| Small and medium-sized businesses | Clear scope, fixed expectations, low risk | Process explanation, package comparison, maintenance and support options |
| Restaurants and retailers | Menus, catalogues, ordering, local discovery | E-commerce and landing page sections, portfolio demonstrations |
| Educational institutions | Credible digital presence and portals | Custom web application capability, institution-relevant examples (no false claims) |
| Startups | Fast, credible launch assets | Landing page and MVP web application services, transparent process |
| Professional service providers | Lead generation and appointment enquiries | Conversion-focused site structure, inquiry form fields tailored to services |
| E-commerce businesses | Storefront performance, payments, integrations | E-commerce service detail, integration capability, hosting and maintenance |
| International businesses | Reliable delivery, clear communication | English-language content, structured scope, timezone-aware contact |

### Customer journey the site must support

1. **Discover** — arrive on the homepage or a service page from search, referral, or direct outreach.
2. **Evaluate** — understand what Double Growth does, how it works, what it costs, and what proof exists.
3. **Verify** — review the process, maintenance commitments, ownership and legal terms.
4. **Contact** — submit a structured inquiry, or reach out by email/phone/WhatsApp once those channels are verified.
5. **Convert** — receive a scoped proposal from a founder.

Every page should offer a clear path to step 4.

---

## 6. Version 1 Scope

### 6.1 Public website

| Page | Required content | Status |
|---|---|---|
| **Homepage** | Hero section, company introduction, primary call to action, service overview, development process, portfolio preview, pricing summary, inquiry call to action, FAQ, contact information, footer | Planned |
| **Services** | Website development, e-commerce development, custom web applications, website redesign, maintenance and technical support, hosting and deployment | Planned |
| **Pricing** | Structured service packages, indicative pricing where approved, scope and feature differences, additional service notes, inquiry call to action | Planned |
| **Portfolio** | Project cards, descriptions, technologies used, screenshots or demonstrations, individual project detail views | Planned |
| **About** | Company introduction, mission, vision, business philosophy, two-founder structure, technology approach | Planned |
| **Contact** | Contact form, business email, phone/WhatsApp (once verified), inquiry options | Planned |
| **How It Works** | Engagement process from inquiry to launch and handover | Planned |
| **Maintenance** | Support plans, response expectations, what is covered and excluded | Planned |
| **FAQ** | Pricing, timelines, ownership, hosting, support, payment terms | Planned |
| **Privacy Policy** | Data collected, purpose, retention, third parties, user rights | Planned — legal review required |
| **Terms and Conditions** | Service terms, client obligations, liability, termination | Planned — legal review required |
| **Refund Policy** | Refund eligibility, timelines, exclusions | Planned — legal review required |
| **Ownership Policy** | Code, content and asset ownership on delivery and on cancellation | Planned — legal review required |

Legal pages are drafts until reviewed by a qualified professional. They must not be published as final without that review.

### 6.2 Lead generation

The inquiry system must capture, at minimum:

| Field | Notes |
|---|---|
| Name | Required |
| Business name | Optional for individuals, encouraged for companies |
| Email | Required, validated |
| Phone | Required, validated for Indian and international formats |
| Required service | Required, selected from the published service list |
| Budget range | Optional but strongly encouraged |
| Project description | Required, with a sensible length limit |
| Preferred contact method | Email, phone, or WhatsApp |

Backend requirements (all **Planned**):

- Server-side validation of every field — client-side validation is a convenience, never a control.
- Spam and abuse mitigation (rate limiting and bot mitigation).
- Durable persistence of each submission.
- Notification to the founders' verified business inbox.
- Consent capture consistent with the published Privacy Policy.
- Eventual integration with the internal Double Growth CRM.

No inquiry endpoint exists yet. Do not document or call one until it is implemented.

### 6.3 Admin, CRM and commercial operations (Planned)

Intended for the founders only:

- Founder login with individual accounts.
- Admin dashboard.
- Lead management (status, ownership, notes, follow-up dates).
- Demo management.
- Client management.
- Project management.
- Proposals and quotations.
- Invoices and payment records.
- Subscription and retainer tracking.
- Maintenance records.

### 6.4 AI chatbot (Planned)

- Website chatbot answering questions from an **approved knowledge base** only.
- Lead capture through conversation, writing into the same lead pipeline as the contact form.
- Usage tracking per conversation and per provider.
- Budget controls with a hard operational ceiling.
- Human escalation when confidence is low or the visitor requests a person.
- Provider-independent architecture with a configurable model provider and model identifier.

**Business budget limit:** the initial AI operating budget is **₹2,000 per month**. This is a commercial spending limit set by the founders. It is **not** a technical guarantee, quota, or enforced system constraint until budget controls are implemented and tested.

### 6.5 Production readiness (Planned)

- Automated tests (unit, integration, end-to-end where valuable).
- Security review before launch.
- Monitoring, alerting and error tracking.
- Database backup and tested restoration.
- Deployment and rollback documentation.

### 6.6 Explicitly out of scope for V1

- Sarthi, in any form, including teaser pages that imply availability.
- Multi-tenant client portals.
- Public user accounts for website visitors.
- Native mobile applications.
- Marketplace or job-board functionality.
- Automated proposal generation without founder review.

---

## 7. Technology Stack

**Status of this entire section: Planned.** No dependency is installed. No version is asserted. The repository contains no `package.json`, so per the accuracy rules of this document, **all versions are Pending Verification** and must be read from the package files immediately after scaffolding.

| Layer | Technology | Status | Notes |
|---|---|---|---|
| Frontend | Next.js | Planned | App Router assumed; confirm at M0 |
| UI library | React | Planned | Version determined by Next.js |
| Language | TypeScript | Planned | Strict mode required |
| Styling | Tailwind CSS | Planned | Design tokens to be defined in [Section 14](#14-design-and-ux-requirements) |
| UI components | shadcn/ui | Planned | Where implemented — not all primitives will be adopted |
| Backend runtime | Node.js | Planned | Supported LTS only |
| Backend framework | Fastify | Planned | Separate API application |
| Database | PostgreSQL | Planned | Not provisioned |
| ORM | Prisma | Planned | No schema exists |
| Validation | Zod | Planned | Shared request/response schemas |
| Authentication | Argon2id + secure sessions | Planned | Founder accounts only in V1 |
| File storage | Cloudflare R2 | Planned | Only when configured; no bucket exists |
| Deployment | Vercel (web) and Render (API) | Planned | No project or pipeline exists |
| Version control | Git and GitHub | Planned | Repository not yet initialized |
| CI/CD | GitHub Actions | Planned | No workflow files exist |
| Package manager | pnpm workspaces | Planned | Version to be pinned via `packageManager` |

### Version recording policy

Once the repository is scaffolded:

1. Record the exact version of every direct dependency from its `package.json`.
2. Pin the Node.js version in `engines` and in a version file, and document it here.
3. Pin the pnpm version in the root `packageManager` field.
4. Do not upgrade a major version without an entry in the roadmap or an architecture decision record.

Do not add a technology to this table because it is popular. Add it because it is in the repository.

---

## 8. System Architecture

### Request flow (target)

```text
Visitor
   |
   v
Next.js web application (Vercel)
   |  HTTPS, JSON over fetch
   v
Fastify API (Render)
   |  Prisma
   v
PostgreSQL
   |
   +--> External integrations
        - AI model provider (provider-independent)
        - Transactional email
        - Cloudflare R2 (file storage)
        - Payment providers: UPI and/or PayPal
        - Monitoring and error tracking
```

### Layer responsibilities

| Layer | Owns | Must not |
|---|---|---|
| **Next.js web** | Rendering, routing, SEO metadata, accessible forms, calling the API, session cookie transport | Connect to PostgreSQL directly; hold database credentials; contain business rules that must be enforced |
| **Fastify API** | Authentication, authorization, validation, business rules, persistence, integration calls, audit logging, rate limiting | Trust client-supplied identity, pricing, payment status, or role |
| **PostgreSQL** | Durable system of record | Be exposed to the public internet without network controls |
| **Integrations** | Email delivery, AI responses, payments, file storage, monitoring | Be called with secrets present in client-side code |

### Architectural rules

1. The frontend never connects to PostgreSQL. No `DATABASE_URL` is available to browser code.
2. Every sensitive operation is authorized server-side. Hiding a button is not access control.
3. Payment confirmation is accepted only from a **verified** provider webhook or an explicit server-to-provider status check. A browser redirect never marks an invoice paid.
4. The AI chatbot is provider-independent: provider and model are configuration, not code paths. Swapping providers must not require rewriting business logic.
5. The knowledge base is curated and approved. The chatbot must refuse rather than speculate on pricing, legal terms, or delivery commitments.
6. Chatbot output is untrusted content. It must never be used to construct SQL, authorize actions, or bypass validation.
7. Shared contracts (types and Zod schemas) live in a shared package so the web and API applications cannot drift.
8. All secrets live in environment configuration, never in source control.

### Sarthi module (planned)

Sarthi is the School Management System (School ERP) **module of the Double Growth platform**, not a separate application or product. It will run within the platform rather than as an independent stack:

- **Placement:** a module inside the main Double Growth dashboard/platform, in this repository rather than a separate repository.
- **Permissions:** its own role-based access control, scoped to each school and user role.
- **Modules:** school-specific modules covering admissions, students, teachers, parents, academic activities, attendance, examinations, fees and school administration.
- **Data isolation:** strict multi-tenant isolation — every query is scoped to the authenticated school, and cross-tenant access is denied by default.
- **API access:** through the same authorized backend endpoints as the rest of the platform, never directly from the client to the database.

These are requirements, not implemented capabilities. Sarthi is outside the Version 1 website scope.

### Integration status

| Integration | Provider decision | Status |
|---|---|---|
| AI model provider | Configurable | Planned |
| Transactional email | Pending Verification | Planned |
| UPI payments | Pending Verification | Planned |
| PayPal | Pending Verification | Planned |
| Cloudflare R2 | Cloudflare | Planned |
| Error monitoring | Pending Verification | Planned |

No integration is configured, credentialed, or tested.

---

## 9. Planned Repository Structure

No structure exists yet. The following is the intended layout for the pnpm monorepo, to be created in milestone **M0**. It is a target, not a description of current contents.

```text
double-growth-platform/
├── apps/
│   ├── web/                  # Next.js public website and admin UI
│   └── api/                  # Fastify backend API
├── packages/
│   ├── database/             # Prisma schema, client, migrations, seed
│   ├── shared/               # Shared constants, types, utilities
│   ├── validators/           # Zod schemas shared by web and api
│   └── config/               # Shared lint, TypeScript and env config
├── docs/
│   ├── architecture/         # System design and decision records
│   ├── api/                  # Endpoint contracts
│   ├── database/             # Schema and data dictionary
│   ├── security/             # Threat model, policies, review notes
│   └── operations/           # Runbooks, backup, incident response
├── infrastructure/           # Deployment and hosting configuration
├── .github/
│   └── workflows/            # CI workflows
├── .env.example              # Documented variables, no real values
├── .gitignore
├── package.json              # Workspace root
├── pnpm-workspace.yaml
└── README.md
```

If M0 produces a different layout, update this section to match the repository rather than reshaping the repository to match this diagram.

Current state on disk: this README and a Windows `desktop.ini`. Nothing else.

---

## 10. Getting Started (Windows 11)

> **Applies after milestone M0.** There is currently nothing to install or run. The steps below define the agreed environment and the command sequence that will exist once the foundation is committed. Each step states clearly whether it is available today.

### 10.1 Prerequisites

| Tool | Required version | Status | Verification command |
|---|---|---|---|
| Windows | Windows 11 | Environment assumed | `winver` |
| PowerShell | 7.x preferred, 5.1 acceptable | Install PowerShell 7 if needed | `$PSVersionTable.PSVersion` |
| Node.js | Supported Active LTS — **exact version Pending Verification at M0** | Not installed for this project | `node --version` |
| pnpm | Version pinned via `packageManager` — **Pending Verification** | Not installed for this project | `pnpm --version` |
| Git | Current stable | Required | `git --version` |
| VS Code | Current stable | Recommended editor | `code --version` |
| PostgreSQL | Version chosen at M0 — **Pending Verification** | Not provisioned | `psql --version` |

Notes:

- Do not install a Node.js version that has reached end-of-life.
- Do not use `npm install` in this pnpm workspace once it exists; it will generate a competing lockfile.

### 10.2 Clone the repository

```powershell
cd "$HOME\Desktop"
git clone <repository-url> double-growth-platform
cd double-growth-platform
```

The repository URL is **Pending Verification** — no remote is configured and this folder is not a Git repository.

### 10.3 Install dependencies

```powershell
pnpm install
```

Status: **not runnable today** — no `package.json` exists. The exact install command will be confirmed when the workspace root is created.

### 10.4 Configure the environment

```powershell
Copy-Item .env.example .env
```

Then fill in local values. Status: **not runnable today** — neither file exists. Never commit `.env`. See [Section 11](#11-environment-variables) for the intended variable set.

### 10.5 Configure the database

1. Provision a PostgreSQL instance reachable from the development machine, or use a local container.
2. Put the connection string in `DATABASE_URL`, and a direct (non-pooled) connection string in `DIRECT_DATABASE_URL` if a pooler is used for migrations.
3. Confirm connectivity before running migrations.

Status: **Planned** — no instance is provisioned and no schema exists.

### 10.6 Prisma migrations

```powershell
pnpm --filter @double-growth/database prisma generate
pnpm --filter @double-growth/database prisma migrate dev
```

Status: **not runnable today**. Package names, script names and filter targets are **Pending Verification** and must be confirmed from the workspace files at M0.

Rules:

- Never edit an applied migration file; create a new one.
- Never run `migrate reset` against anything other than a local development database.
- Production migrations are applied deliberately, with a backup taken first.

### 10.7 Start the applications

```powershell
pnpm --filter web dev
pnpm --filter api dev
```

Status: **not runnable today**. Ports, script names and proxy configuration are **Pending Verification**.

### 10.8 Build for production

```powershell
pnpm --filter web build
pnpm --filter api build
```

Status: **not runnable today**.

### 10.9 Recommended VS Code setup

- Install the ESLint, Prettier, Prisma and Tailwind CSS IntelliSense extensions once the configuration files exist.
- Use a workspace-level settings file so formatting is consistent for both founders.
- Do not commit personal editor settings that conflict with the shared configuration.

---

## 11. Environment Variables

**Status: the list below is an intended contract. No `.env.example` exists and no variable is read by any code.**

Rules that apply to every variable:

- Secrets never appear in source control, screenshots, issues, or chat.
- Only variables prefixed for public exposure (for example `NEXT_PUBLIC_*`) may reach browser code, and only non-sensitive values belong there.
- Every new variable must be added to `.env.example` with a description in the same pull request that introduces it.

| Variable | Purpose | Required | Used by | Environment | Status |
|---|---|---|---|---|---|
| `DATABASE_URL` | Pooled PostgreSQL connection string | Yes | API, database package | Development, Production | Planned |
| `DIRECT_DATABASE_URL` | Direct connection string for migrations | Conditional (if pooling is used) | Prisma migrations | Development, Production | Planned |
| `PORT` | API listen port | No (default) | API | Development, Production | Planned |
| `NODE_ENV` | Runtime mode: `development`, `test`, `production` | Yes | Web, API | All | Planned |
| `SESSION_SECRET` | Signing secret for session cookies | Yes | API | Development, Production | Planned |
| `WEB_URL` | Canonical public web origin, used for CORS and links | Yes | API, Web | Development, Production | Planned |
| `API_URL` | Base URL the web app uses to call the API | Yes | Web | Development, Production | Planned |
| `AI_PROVIDER` | Selected model provider for the chatbot | Yes (when chatbot enabled) | API | Development, Production | Planned |
| `AI_MODEL` | Model identifier for the selected provider | Yes (when chatbot enabled) | API | Development, Production | Planned |
| `AI_API_KEY` | Provider credential | Yes (when chatbot enabled) | API | Development, Production | Planned |
| `EMAIL_API_KEY` | Transactional email credential | Yes (once email is configured) | API | Development, Production | Planned |
| `PAYPAL_CLIENT_ID` | PayPal application identifier | Conditional (PayPal only) | API | Development, Production | Planned |
| `PAYPAL_CLIENT_SECRET` | PayPal application secret | Conditional (PayPal only) | API | Development, Production | Planned |
| `UPI_PROVIDER_KEY` | UPI payment provider key | Conditional (UPI only) | API | Development, Production | Planned |
| `UPI_PROVIDER_SECRET` | UPI payment provider secret | Conditional (UPI only) | API | Development, Production | Planned |
| `STORAGE_ACCESS_KEY` | Object storage access key | Conditional (storage only) | API | Development, Production | Planned |
| `STORAGE_SECRET_KEY` | Object storage secret key | Conditional (storage only) | API | Development, Production | Planned |
| `SENTRY_DSN` | Error monitoring endpoint | Optional initially | Web, API | Development, Production | Planned |

Additional variables will be introduced for payment webhook verification, storage bucket naming, and rate-limit configuration. Each must be documented here when added.

Separate credentials must be used for development and production. Production secrets are never copied into a developer machine's `.env`.

---

## 12. Development Commands

**Status: no scripts exist.** The table below is the planned command surface. It must be reconciled with the real `package.json` files at M0 and corrected where it differs.

| Intent | Planned command | Status |
|---|---|---|
| Install dependencies | `pnpm install` | Not available |
| Run web app in development | `pnpm --filter web dev` | Not available |
| Run API in development | `pnpm --filter api dev` | Not available |
| Build all applications | `pnpm build` | Not available |
| Lint | `pnpm lint` | Not available |
| Type check | `pnpm typecheck` | Not available |
| Unit tests | `pnpm test` | Not available — do not document as working |
| End-to-end tests | `pnpm test:e2e` | Not available |
| Prisma generate | `pnpm --filter @double-growth/database prisma generate` | Not available |
| Prisma migrate (dev) | `pnpm --filter @double-growth/database prisma migrate dev` | Not available |
| Prisma Studio | `pnpm --filter @double-growth/database prisma studio` | Not available |
| Format | `pnpm format` | Not available |

This section must never list a command that fails when a new contributor runs it.

---

## 13. Database and Data Layer

**Status: Planned. No schema, migration, or connection exists.**

### Intended domains

The V1 data model is expected to cover:

- Founder accounts and sessions.
- Leads and inquiry submissions.
- Clients.
- Projects and project milestones.
- Demo bookings.
- Proposals and proposal line items.
- Invoices, payments and payment events.
- Subscriptions and maintenance records.
- Chatbot conversations, usage records and escalation events.
- Audit log entries.

These are **intended domains, not models**. Table names, field names, relations, indexes and constraints will be defined in the Prisma schema at the appropriate milestone and documented in `docs/database/`.

### Rules

- Prisma is the only write path to PostgreSQL from application code.
- Migrations are versioned and reviewed.
- Monetary values are stored in integer minor units with an explicit currency, never as floating point.
- Timestamps are stored in UTC.
- Soft deletion is used for records referenced by financial or audit history.
- Personal data has a defined retention period consistent with the Privacy Policy.
- No production data is copied into development environments without anonymisation.

---

## 14. Design and UX Requirements

**Status: no design system exists to inspect. Palette, type scale and component library are Pending Verification.** This section records requirements, not implemented decisions.

### Visual direction

Modern, clean, professional, business-oriented. The site should look like a company that ships commercial work.

### Principles

- Minimalist professional layout.
- Consistent spacing scale and vertical rhythm.
- Clear typographic hierarchy with a restrained type system.
- Strong visual hierarchy on every page, with one obvious primary action.
- Responsive layouts designed for the content, not merely shrunk.
- Professional, predictable navigation.
- Reusable, consistent buttons, cards, form fields and section wrappers.
- Accessible colour contrast.
- Fast page loading and minimal client-side JavaScript.
- Clear, specific calls to action.

### Avoid

- Excessive gradients and decorative noise.
- Animation that does not communicate state or hierarchy.
- Overcrowded sections.
- Fake testimonials, logos and statistics.
- Generic AI-generated business claims ("revolutionary", "cutting-edge", "unparalleled") without substance.
- Excessive decorative elements that reduce readability.

### Responsive targets

| Device class | Behaviour |
|---|---|
| Desktop (≥1280 px) | Full multi-column layouts, expanded navigation |
| Laptop (1024–1279 px) | Adjusted grids, preserved hierarchy |
| Tablet (768–1023 px) | Collapsed navigation, stacked content where useful |
| Mobile (<768 px) | Single column, touch targets of adequate size, no horizontal scrolling |

### Accessibility baseline

- Keyboard-operable navigation and forms.
- Visible focus states.
- Labelled form controls and announced validation errors.
- Sufficient colour contrast for text and interactive elements.
- Sensible heading order and landmark structure.
- Respect for reduced-motion preferences.

### Documentation duty

After the design system is implemented, replace this section's pending notes with the actual tokens: colour values with usage rules, font families and sizes, spacing scale, radius scale, and the component inventory. Do not publish a palette that is not in the code.

---

## 15. Security Requirements

**Status: Planned.** No authentication, session handling, or authorization code exists.

### Identity and access

- Passwords hashed with **Argon2id** using reviewed parameters. No other hashing scheme for credentials.
- Both founders have **separate accounts**. Shared logins are prohibited, including "admin" accounts used by more than one person.
- Sessions delivered in `HttpOnly`, `Secure`, `SameSite` cookies with appropriate expiry and rotation.
- Role-based access control, with role definitions documented before implementation; default deny.
- Authentication events logged: sign-in, sign-out, failed attempts, password changes, permission changes.
- Administrative routes protected server-side on every request, not only in the UI.

### Transport and browser security

- HTTPS only, with HTTP redirected.
- CORS allowlist restricted to known web origins.
- Security headers configured at the framework and hosting layer.
- CSRF protection for state-changing requests where cookie-based sessions are used.

### Input and output

- Every request body, query parameter and route parameter validated with Zod at the API boundary.
- Validation errors return safe messages without internal details.
- Output encoded by the rendering framework; no unsanitised HTML injection.
- File uploads validated by type, size and content, stored outside the web root, and served through controlled access.

### Abuse and availability

- Rate limiting on authentication, inquiry submission, chatbot usage and payment endpoints.
- Bot mitigation on public forms.
- Request size limits.
- Chatbot usage ceilings tied to the ₹2,000 monthly business budget.

### Money and webhooks

- Payment webhooks verified cryptographically before any state change.
- Webhook handlers idempotent, keyed by provider event identifier.
- Server-side amount and currency validation against the stored invoice.
- No payment marked complete from a client-side redirect.
- Refunds and manual adjustments recorded with actor, reason and timestamp.

### Secrets and dependencies

- Secrets in environment configuration only, never committed.
- Separate credentials per environment.
- Dependency vulnerability checks in CI.
- Lockfile committed; installs reproducible.
- No unmaintained or unnecessary dependencies.

### Data protection

- Encrypted connections to the database.
- Encrypted backups with tested restoration.
- Least-privilege database roles.
- Audit log for administrative and financial actions.
- Personal data minimised, retained only as long as needed, and handled per the Privacy Policy.

### Known gaps at the time of writing

Every control above is unimplemented. A security review is required before any production launch, and again after the chatbot and payment integrations are added.

---

## 16. Roadmap

| Phase | Objective | Status |
|---|---|---|
| **M0** | Repository and engineering foundation: workspace, tooling, CI skeleton, environment templates, this README corrected against real files | Not started |
| **M1** | Public website: pages, responsive design, service catalogue, pricing, portfolio, contact and lead capture | Not started |
| **M2** | Authentication and security: founder accounts, sessions, RBAC, rate limiting, security headers | Not started |
| **M3** | CRM and lead management: dashboard, lead pipeline, demo and client records | Not started |
| **M4** | Project management: projects, milestones, delivery tracking | Not started |
| **M5** | Proposals, invoices and payments: quotations, invoices, verified payment events, subscriptions | Not started |
| **M6** | AI chatbot and integrations: knowledge base, provider abstraction, lead capture, budget controls, escalation | Not started |
| **M7** | Testing and security: coverage targets, integration tests, security review, accessibility audit | Not started |
| **M8** | Production launch: deployment, monitoring, backups, runbooks, legal page review | Not started |
| **Future** | Sarthi: School Management System (School ERP) development as an integrated module of the Double Growth platform, with role-based permissions, school-specific modules and strict multi-tenant data isolation | Not started |

### Milestone exit criteria

A milestone is complete only when:

1. The feature is merged to the stable branch.
2. Its acceptance criteria are demonstrably met.
3. Relevant tests pass in CI.
4. Documentation and this README are updated.
5. Security implications are reviewed.

---

## 17. Development Standards

### Language and structure

- TypeScript strict mode, no implicit `any`.
- Consistent naming: `PascalCase` for components and types, `camelCase` for functions and variables, `kebab-case` for file and route segments, `SCREAMING_SNAKE_CASE` for constants.
- Modular architecture with clear boundaries between web, API and shared packages.
- Reusable UI components; no duplicated form or layout logic.
- Zod schemas as the single source of truth for request and response shapes.

### Correctness

- All external input validated server-side.
- Explicit error handling with typed error responses; no swallowed exceptions.
- No hardcoded credentials, tokens, or environment-specific values.
- No direct database access from the frontend.
- No payment state changed without verification.
- No dependency added without a stated need.

### Quality

- Unit tests for business logic and validators.
- Integration tests for API endpoints and database access.
- End-to-end tests for critical journeys: inquiry submission, sign-in, lead management.
- Meaningful commit messages and focused pull requests.
- An architecture decision record for any significant, hard-to-reverse choice.

### Review expectations

With two founders, every change is reviewed by the other founder where practical. Self-merged changes must still pass CI and be described clearly. Irreversible or security-sensitive changes require explicit review.

---

## 18. Git and Contribution Workflow

**Status: repository not initialized.** The branch model below is the agreed convention for when it is.

### Branches

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready |
| `develop` | Integration branch, if adopted |
| `feat/*` | New functionality |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation updates |
| `chore/*` | Tooling and maintenance |
| `security/*` | Security fixes, handled with care |

### Commit convention

```text
feat: add inquiry submission endpoint
fix: reject duplicate lead within five minutes
docs: correct environment variable table
refactor: extract pricing comparison component
test: cover invalid budget range
chore: pin Node.js LTS version
security: verify payment webhook signature
```

Rules:

- Imperative mood, concise subject line, no trailing period.
- Body explains *why* when the change is not self-evident.
- One logical change per commit.
- Never commit secrets, build output, or `node_modules`.

### Pull requests

Every significant change states:

- **Owner** — which founder is accountable.
- **Objective** — the problem being solved.
- **Scope** — what changed and what deliberately did not.
- **Acceptance criteria** — how completion is judged.
- **Tests** — what was run and what passed.
- **Documentation** — which docs were updated.
- **Risk** — security, data, or operational impact.

### Definition of done

Code merged · tests passing · reviewed · documented · no secrets committed · deployed or deployment-ready · rollback understood.

---

## 19. Testing Strategy

**Status: Planned. No test framework is installed and no test exists.**

| Level | Scope | Intended tooling |
|---|---|---|
| Unit | Validators, pricing logic, formatting, authorization helpers | Pending Verification |
| Integration | API endpoints against a test database, Prisma queries | Pending Verification |
| End-to-end | Inquiry submission, founder sign-in, lead workflow | Pending Verification |
| Accessibility | Automated checks plus manual keyboard and screen-reader passes | Pending Verification |
| Security | Dependency audit, secret scanning, authorization tests | Pending Verification |

Until tests exist, no README or status note may claim the project is tested.

---

## 20. Deployment

**Status: Planned. Nothing is deployed, no hosting account is configured for this project, and no domain is live.**

### Intended topology

| Component | Platform | Status |
|---|---|---|
| Web application | Vercel | Planned |
| API | Render | Planned |
| Database | Managed PostgreSQL provider — Pending Verification | Planned |
| Object storage | Cloudflare R2 | Planned |
| DNS | Pending Verification | Planned |

### Intended pipeline

1. Pull request opened → CI runs lint, type check, tests and build.
2. Merge to `main` → preview or production deployment per platform configuration.
3. Database migrations applied as a deliberate, separate step with a pre-migration backup.
4. Post-deployment smoke test of the public site and one API health check.

Environment separation: development, preview and production use distinct databases and distinct credentials.

### Domain

`doublegrowth.in` is the **intended** primary domain. Registration, DNS ownership, TLS and hosting are **Pending Verification**. Do not print this domain on business cards, social profiles, or client communications as an active website until it resolves to the production deployment.

---

## 21. Troubleshooting

These entries address the toolchain, not application behaviour, because no application exists yet. They apply once M0 is complete.

| Symptom | Likely cause | Resolution |
|---|---|---|
| `node` or `pnpm` not recognised | Tool not installed or not on `PATH` | Install the pinned versions, reopen PowerShell, verify with `node --version` and `pnpm --version` |
| PowerShell blocks a script | Execution policy restriction | Prefer invoking `pnpm` directly; adjust policy only in the current process, never globally without understanding the impact |
| `ERR_PNPM_LOCKFILE_MISMATCH` or equivalent | Lockfile out of date or mixed package managers | Run `pnpm install`; ensure no `package-lock.json` exists |
| Prisma client missing types | Client not generated | Run the Prisma generate command for the database package |
| Database connection refused or timed out | Wrong host/port, instance asleep, or IP not allowed | Verify the connection string, instance state, and network allowlist |
| Migration drift | Local database diverged from migration history | Inspect with `prisma migrate status`; reset only a local development database |
| Port already in use | Another process bound to the dev port | Identify and stop the process, or configure a different port |
| CORS error from the web app | API origin allowlist does not include the web origin | Confirm `WEB_URL` and the API allowlist match the actual development origin |
| Session not persisting | Cookie flags incompatible with the local protocol | Use consistent local origins and review cookie settings for development |
| Environment variable appears `undefined` | `.env` missing, misnamed, or loaded in the wrong application | Confirm the variable exists in the correct app's environment and restart the process |
| Chatbot returns provider errors | Invalid or exhausted provider credential | Check `AI_PROVIDER`, `AI_MODEL`, `AI_API_KEY`, and the provider account balance |
| Production build fails on types but dev works | Dev server is lenient; build is not | Run the type check and fix the reported errors |

When adding a troubleshooting entry, record the actual error text. Do not add speculative fixes.

---

## 22. Operational and Legal Notes

### Legal pages

Privacy Policy, Terms and Conditions, Refund Policy and Ownership Policy are **drafts until reviewed by a qualified professional**. They must describe what the system actually does — data collected, processors used, retention, and payment terms. Publishing template legal text that contradicts implementation creates real risk.

### Business claims

The site may state what Double Growth does and how it works. It may not state outcomes that have not occurred. Concept work is labelled as such. Pricing is indicative until quoted.

### Ownership

The Ownership Policy must state clearly what a client receives on final payment — source code, content, domain, and third-party accounts — and what happens on cancellation. This must match the actual delivery practice.

### Data handling

Inquiry data is personal data. It must be stored securely, used only for responding to the inquiry and related sales follow-up, and retained only as long as necessary.

---

## 23. Pending Verification

The following must be resolved and this README updated. Each item is a fact that cannot be responsibly invented.

| # | Item | Owner | Blocking |
|---|---|---|---|
| 1 | Initialize the Git repository and create the M0 workspace | Founders | Yes |
| 2 | Confirm and record the Node.js LTS version, pnpm version and all dependency versions | Founders | Yes |
| 3 | Confirm repository layout matches [Section 9](#9-planned-repository-structure) | Founders | Yes |
| 4 | Create `.env.example` and reconcile [Section 11](#11-environment-variables) with actual variables | Founders | Yes |
| 5 | Reconcile [Section 12](#12-development-commands) with real scripts | Founders | Yes |
| 6 | Provision PostgreSQL and define the initial Prisma schema | Founders | No — M1/M2 |
| 7 | Choose the email provider and verify sender domain | Founders | No — M3 |
| 8 | Choose the AI provider and confirm the ₹2,000 monthly budget controls | Founders | No — M6 |
| 9 | Decide UPI versus PayPal versus both, and confirm merchant onboarding | Founders | No — M5 |
| 10 | Verify `doublegrowth.in` registration, DNS and availability | Founders | No — M8 |
| 11 | Publish verified business email, phone and WhatsApp contact details | Founders | No — M1 |
| 12 | Confirm founder names and titles for public display | Founders | No — M1 |
| 13 | Define quantified success targets for the website | Founders | No — M1 |
| 14 | Obtain legal review of all policy pages | Founders | Yes — before launch |
| 15 | Correct the copyright holder spelling in `LICENSE` ("Aashu SIngh") after confirming the intended legal name | Founders | No — before public release |
| 16 | Record the actual design tokens once the design system exists | Founders | No — M1 |
| 17 | Configure monitoring and confirm the provider | Founders | No — M7 |
| 18 | Document backup schedule and run a restoration test | Founders | No — M7 |

This table is the authoritative list of unknowns. If a claim cannot be tied to verified evidence, it belongs here rather than in the body of the document.

---

## 24. Contact

Business contact channels are **Pending Verification**. The website will publish them once they are configured and monitored:

- Business email — Pending Verification
- Phone — Pending Verification
- WhatsApp — Pending Verification
- Office address — Pending Verification

Do not publish placeholder addresses, unmonitored inboxes, or personal numbers as company contact points.

---

## 25. License

This repository is licensed under the **MIT License**. The full text and copyright notice are in the [`LICENSE`](./LICENSE) file at the repository root.

Third-party dependencies remain under their own licences. Before adding a dependency, confirm that its licence is compatible with commercial use of this project.

---

## Maintaining This Document

This README is a specification while the project is empty and must become a description once code exists. The transition is not optional.

**Rules for keeping it accurate:**

1. Change the README in the same pull request as the code it describes.
2. Delete status labels only when the claim is verified, not when the work is planned.
3. Never add a package, command, endpoint, model or URL that is not in the repository.
4. If a value is unknown, write **Pending Verification** and add it to [Section 23](#23-pending-verification).
5. When a milestone completes, update its row in the roadmap and the corresponding scope table.
6. Review this document before every production deployment.

**Version:** 1.0.0 — initial documentation
**Last inspected:** 14 November 2026
**Repository state at inspection:** no application code present
