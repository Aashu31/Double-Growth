import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { processSteps, engagementPrinciples } from "@/content/process";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "How It Works",
  description:
    "The Double Growth delivery process: discovery, scope, design and development, launch, and ongoing support.",
  path: "/how-it-works",
});

const clientInputs = [
  "A clear description of the business and what the website must achieve.",
  "Your existing brand assets, or a decision to work with what is available.",
  "Content ownership or approval — text, images and service details.",
  "One decision-maker for consolidated feedback.",
  "Access to domain and hosting accounts where they already exist.",
  "A realistic launch expectation, agreed before development starts.",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A delivery process you can hold us to."
        description="No mystery phases and no silent weeks. Each stage has an output, a decision point and a clear owner."
      >
        <ButtonLink href="/contact">
          Start a conversation
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <ol className="space-y-5">
            {processSteps.map((step, index) => (
              <li
                key={step.number}
                className="grid gap-5 rounded-3xl border border-cloud bg-white p-6 sm:grid-cols-[auto_1fr] sm:p-8"
              >
                <div className="flex items-start gap-4 sm:flex-col">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-sm font-semibold text-white">
                    {step.number}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-full min-h-10 w-px bg-gradient-to-b from-electric/40 to-transparent sm:block"
                    />
                  ) : null}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate">
                    {step.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    Output
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate">
                    {index === 0
                      ? "A written understanding of the goal, audience and constraints."
                      : index === 1
                        ? "A scope document with pages, features, responsibilities and exclusions."
                        : index === 2
                          ? "Working software available for review on a staging environment."
                          : index === 3
                            ? "A tested production deployment with the operational basics in place."
                            : "A support path, maintenance scope and documented handover."}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-cloud bg-mist/60 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Working principles</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              How the engagement is governed.
            </h2>
            <div className="mt-6 space-y-3">
              {engagementPrinciples.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-cloud bg-white p-5"
                >
                  <h3 className="text-sm font-semibold text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Your side</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              What we need from you.
            </h2>
            <ul className="mt-6 space-y-3">
              {clientInputs.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-cloud bg-white p-4 text-sm leading-6 text-slate"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-electric"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-slate">
              When content or feedback is late, the delivery date moves. We will
              say so directly rather than absorbing the delay silently.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page text-center">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            Ready to scope the work?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate">
            Send the project context. If we are not the right fit, we will say
            that too.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">Contact the team</ButtonLink>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-cloud px-5 py-3 text-sm font-semibold text-ink"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
