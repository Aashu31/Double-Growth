import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Info,
  Layers3,
  Minus,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { SolutionExplorer } from "@/components/solutions/solution-explorer";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { SOLUTIONS, SOLUTION_FAQS } from "@double-growth/shared";
import { absoluteUrl, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Outcome-led solutions from Double Growth: establish an online presence, sell online, run operations, automate repetitive work and keep a live product healthy.",
  path: "/solutions",
});

const scopingSteps = [
  {
    number: "01",
    title: "Name the outcome",
    description:
      "We start with the business result you need, not a feature list. One paragraph is enough to begin.",
  },
  {
    number: "02",
    title: "Choose the smallest release",
    description:
      "We identify the minimum build that solves the problem properly. Features that can wait are listed, not silently added.",
  },
  {
    number: "03",
    title: "Quote in writing",
    description:
      "Scope, price, timeline, exclusions and third-party costs are agreed before development starts.",
  },
  {
    number: "04",
    title: "Build, verify, hand over",
    description:
      "You review working software, we test the production build, and launch includes ownership and maintenance terms.",
  },
] as const;

export default function SolutionsPage() {
  const solutionList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Double Growth solutions",
    itemListElement: SOLUTIONS.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: solution.name,
        description: solution.outcome,
        provider: { "@type": "Organization", name: siteConfig.name },
        url: absoluteUrl("/solutions"),
      },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Start with the outcome, not the feature list."
        description="A solution groups the services needed for one business result — a credible website, a working storefront, a single operational system, practical automation, or a product that stays healthy after launch."
        variant="dark"
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#solution-explorer">
            Explore the solutions
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Describe your problem
          </ButtonLink>
        </div>
      </PageHero>

      <section className="border-b border-cloud bg-mist/50 py-5">
        <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-electric" />
            One published package price
          </span>
          <span className="inline-flex items-center gap-2">
            <Check aria-hidden="true" className="h-3.5 w-3.5 text-emerald-600" />
            Written scope before work
          </span>
          <span className="inline-flex items-center gap-2">
            <Info aria-hidden="true" className="h-3.5 w-3.5 text-amber-600" />
            Third-party costs stated separately
          </span>
        </div>
      </section>

      <section id="solution-explorer" className="section-pad scroll-mt-24 bg-white">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Find the fit</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Five outcomes we are built to deliver.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate">
              Select a solution to see the problem it addresses, the services
              involved and the honest next step. These are engagement shapes, not
              fixed-price bundles — only Growth Annual is a published price.
            </p>
          </div>

          <div className="mt-10">
            <SolutionExplorer />
          </div>
        </div>
      </section>

      <section className="border-y border-cloud bg-mist/50 section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
            <div>
              <p className="eyebrow">From outcome to scope</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                A solution becomes a scope in four moves.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate">
                The goal is to avoid the two common failures: a scope so vague
                that nobody can price it, and a scope so large that the first
                release never ships.
              </p>
              <ButtonLink href="/how-it-works" variant="secondary" className="mt-6">
                Read the delivery process
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {scopingSteps.map((step, index) => (
                <Reveal key={step.number} delay={index * 0.05}>
                  <li className="h-full rounded-2xl border border-cloud bg-white p-5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy font-mono text-[0.6rem] text-white">
                      {step.number}
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-slate">
                      {step.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-cloud bg-mist/50 p-7 sm:p-9">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-electric shadow-sm">
                <Layers3 aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-ink">
                What a solution includes
              </h2>
              <ul className="mt-5 space-y-3">
                {[
                  "A defined business outcome and a written scope",
                  "One accountable team across the services involved",
                  "Working software you review before launch",
                  "Deployment support and a documented handover",
                  "Maintenance terms stated before the project ends",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-6 text-slate"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-9">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                <Minus aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-amber-950">
                What a solution is not
              </h2>
              <ul className="mt-5 space-y-3">
                {[
                  "Not unlimited development, hosting or support",
                  "Not a guaranteed revenue, ranking or lead result",
                  "Not a replacement for a contracted payment provider",
                  "Not a fixed price beyond the published Growth Annual package",
                  "Not a demo presented as a live customer deployment",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-6 text-amber-900/80"
                  >
                    <Minus
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-amber-600"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 underline-offset-4 hover:underline"
              >
                Read the pricing boundaries
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cloud bg-mist/50 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              Before choosing a solution.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate">
              The honest answer sometimes is that you do not need the largest
              option. We will recommend the smaller scope when that is true.
            </p>
            <ButtonLink href="/contact" variant="secondary" className="mt-5">
              Ask about your situation
            </ButtonLink>
          </div>
          <FaqAccordion items={SOLUTION_FAQS} />
        </div>
      </section>

      <section className="bg-white py-16">
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
                  Describe the problem. We will name the smallest solution.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                  Share what is failing today and what a good outcome looks like.
                  You will get a direct answer, a written scope and the limits
                  before any payment.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Start a conversation
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/services" variant="ghost" size="lg">
                  Browse services
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={solutionList} />
    </>
  );
}
