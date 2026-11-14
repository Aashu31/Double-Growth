import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
} from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { ServiceVisual } from "@/components/art/service-visual";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { findServiceContent, servicesContent } from "@/content/services";
import { processSteps } from "@/content/process";
import { projects } from "@/content/portfolio";
import { absoluteUrl, pageMetadata, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicesContent.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findServiceContent(slug);

  if (!service) return { title: "Service not found" };

  return pageMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.id}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findServiceContent(slug);

  if (!service) notFound();

  const relatedProjects = projects.slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    serviceType: service.category,
    url: absoluteUrl(`/services/${service.id}`),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 grid-surface opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 glow-surface" aria-hidden="true" />
        <div className="container-page relative py-10 sm:py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan">
                {service.category}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                {service.name}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
                {service.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?service=${service.id}`} size="lg">
                  Start this project
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/pricing" variant="ghost" size="lg">
                  View pricing
                </ButtonLink>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {service.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/55"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] p-3 backdrop-blur">
                <div className="relative overflow-hidden rounded-2xl bg-navy">
                  <div className="absolute inset-0 grid-surface opacity-60" aria-hidden="true" />
                  <ServiceVisual
                    id={service.id}
                    className="relative h-56 w-full opacity-90 sm:h-72"
                  />
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/10 pt-3">
                  {[
                    { label: "Scope", value: "Written" },
                    { label: "Delivery", value: "Staged" },
                    { label: "Support", value: "Defined" },
                  ].map((item) => (
                    <div key={item.label} className="px-3 py-2">
                      <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/40">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-cloud bg-mist/60 p-7 sm:p-9">
              <p className="eyebrow">The problem</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                What usually goes wrong
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate">{service.problem}</p>
            </div>
            <div className="rounded-3xl border border-electric/15 bg-gradient-to-br from-electric/[0.07] to-cyan/[0.04] p-7 sm:p-9">
              <p className="eyebrow">Our approach</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                How we solve it
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate">{service.solution}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-cloud bg-mist/50 section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <SectionHeading
                eyebrow="What is included"
                title="A defined engagement, not an open-ended retainer."
                description="Every deliverable below is confirmed in the written scope. Anything outside it is quoted separately rather than quietly absorbed — or quietly dropped."
              />

              <div className="mt-8 space-y-3">
                {service.deliverables.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-cloud bg-white p-4"
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[0.6rem] text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-ink">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-cloud bg-white p-5">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate/70">
                  Technologies
                </p>
                <p className="mt-2 text-sm leading-6 text-slate">
                  {service.technologies.join(" · ")}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-ink">
                Capabilities in this service
              </h2>
              <ul className="mt-5 grid gap-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 rounded-2xl border border-cloud bg-white p-4 text-sm leading-6 text-slate"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-semibold text-ink">
                What that means for the business
              </h2>
              <ul className="mt-5 space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm leading-6 text-slate">
                    <CircleDot
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Delivery"
            title="How this engagement runs."
            description="The same five-stage process applies across every service, so you always know what is happening and what is waiting on your side."
          />

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <li
                key={step.number}
                className="relative rounded-2xl border border-cloud bg-white p-5"
              >
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-electric">
                  {step.number}
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-cloud bg-mist/50 py-16">
        <div className="container-page">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Related work"
              title="Concept studies in this area."
              description="These are clearly labelled design concepts, not paid client projects. They show how we think about the problem."
            />
            <ButtonLink href="/portfolio" variant="secondary" className="shrink-0">
              All concepts
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group rounded-2xl border border-cloud bg-white p-5 transition-colors hover:border-electric/40"
              >
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-amber-700">
                  Design concept
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {project.title}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate">
                  {project.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-electric">
                  View concept
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title="Before you request a quotation."
              description="Specific answers, including the limits. If your question is not here, ask directly."
            />
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={`/contact?service=${service.id}`}>
                Ask about this service
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate hover:text-ink"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Back to all services
              </Link>
            </div>
          </div>
          <FaqAccordion items={service.faqs} />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white sm:p-12">
            <div className="absolute inset-0 grid-surface opacity-50" aria-hidden="true" />
            <div className="absolute inset-0 glow-surface" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan">
                  Next step
                </p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Tell us what {service.name.toLowerCase()} needs to achieve.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                  Share the goal and the current situation. You receive a written
                  scope and a clear boundary before any work begins.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`/contact?service=${service.id}`} size="lg">
                  Start a project
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="ghost" size="lg">
                  How it works
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
    </>
  );
}
