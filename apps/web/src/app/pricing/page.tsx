import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Code2, Info, LifeBuoy, Minus, Server, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { formatInr } from "@/lib/utils";
import { PACKAGES } from "@double-growth/shared";
import {
  packageComparison,
  packageExclusions,
  packageInclusions,
  pricingFaqs,
  pricingPolicies,
} from "@/content/pricing";
import { pageMetadata } from "@/lib/site";

const policyIcons = [Server, LifeBuoy, Code2];

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "The Double Growth Growth Annual package at ₹3,999 per year, with clear inclusions, exclusions and third-party costs.",
  path: "/pricing",
});

export default function PricingPage() {
  const pkg = PACKAGES[0];

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Clear pricing. Visible limits."
        description="One published annual package for businesses that want a dependable website and technical partner. Larger builds are scoped and quoted after discovery."
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/pricing/checkout">
            Start with Growth Annual
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Ask a pricing question
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="min-w-0 rounded-3xl border border-cloud bg-white p-7 shadow-soft sm:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Primary package</p>
                  <h2 className="mt-2 text-2xl font-semibold text-ink">
                    {pkg.name}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate">
                    {pkg.summary}
                  </p>
                </div>
                <span className="rounded-full bg-mist px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-slate">
                  Annual
                </span>
              </div>

              <p className="mt-8 text-5xl font-semibold tracking-tight text-ink">
                {formatInr(pkg.priceMinor)}
                <span className="ml-1 text-sm font-medium text-slate">
                  /{pkg.billingPeriod}
                </span>
              </p>
              <p className="mt-2 text-xs text-slate">
                Indicative published price. Taxes and third-party costs are
                shown separately.
              </p>

              <ButtonLink
                href="/pricing/checkout"
                size="lg"
                className="mt-6 w-full"
              >
                Get Started
              </ButtonLink>

              <div className="mt-8 border-t border-cloud pt-6">
                <h3 className="text-sm font-semibold text-ink">
                  What is included
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {packageInclusions.map((item) => (
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

              <div className="mt-6 border-t border-cloud pt-6">
                <h3 className="text-sm font-semibold text-ink">
                  What is not included
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {packageExclusions.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-6 text-slate"
                    >
                      <Minus
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-slate/50"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="min-w-0 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-cloud">
                <p className="border-b border-cloud bg-mist/60 px-4 py-2.5 text-xs text-slate sm:hidden">
                  Scroll the table sideways to compare all three columns.
                </p>
                <div
                  className="overflow-x-auto"
                  role="region"
                  aria-label="Package comparison table"
                  tabIndex={0}
                >
                  <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                    <caption className="sr-only">
                      Comparison of Double Growth engagement types
                    </caption>
                    <thead>
                      <tr className="bg-navy text-white">
                        <th scope="col" className="px-4 py-3 font-semibold">
                          Capability
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold">
                          Growth Annual
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold">
                          Custom project
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold">
                          Platform build
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cloud bg-white">
                      {packageComparison.map((row) => (
                        <tr key={row.feature}>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-ink"
                          >
                            {row.feature}
                          </th>
                          <td className="px-4 py-3 text-slate">{row.growth}</td>
                          <td className="px-4 py-3 text-slate">{row.project}</td>
                          <td className="px-4 py-3 text-slate">{row.platform}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-start gap-3">
                  <Info
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-amber-950">
                      Third-party charges are separate
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-amber-900/80">
                      Domain registration, paid hosting, payment gateway
                      transaction fees, premium assets and paid AI usage are not
                      included in the package price. Any amount that will be
                      passed on is stated in your quotation before work starts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-cloud bg-mist/60 p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-electric"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      Payment handling
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate">
                      Orders are recorded first. Online payment is enabled only
                      after a payment provider is configured, and a payment is
                      considered complete only after server-side verification.
                      A browser redirect or screenshot is never treated as proof
                      of payment.
                    </p>
                    <Link
                      href="/faq"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-electric"
                    >
                      Read payment FAQs
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cloud bg-white py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Policies</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              What the price does and does not cover.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate">
              These policies are part of the commercial agreement, not fine
              print added later. Read them together with the quotation for your
              project.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricingPolicies.map((policy, index) => {
              const Icon = policyIcons[index] ?? ShieldCheck;
              return (
                <div
                  key={policy.title}
                  className="rounded-3xl border border-cloud bg-mist/50 p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-electric shadow-sm">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">
                    {policy.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate">
                    {policy.body}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs leading-5 text-slate">
            Full detail:{" "}
            <Link
              href="/maintenance"
              className="font-semibold text-electric"
            >
              Maintenance and Support
            </Link>{" "}
            and{" "}
            <Link href="/ownership" className="font-semibold text-electric">
              Ownership and Source Code Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-cloud bg-mist/50 py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Pricing FAQ</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              Questions about the package.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate">
              If your question is not answered here, ask directly. We will give a
              specific answer rather than a sales page.
            </p>
            <ButtonLink
              href="/contact"
              variant="secondary"
              className="mt-5"
            >
              Ask a pricing question
            </ButtonLink>
          </div>
          <FaqAccordion items={pricingFaqs} />
        </div>
      </section>

      <section className="border-t border-cloud bg-white py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              Need something larger?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate">
              E-commerce, custom applications and platform work are quoted after
              discovery. We will tell you if the annual package is enough — and
              if it is not, what the realistic scope looks like.
            </p>
            <ButtonLink href="/contact" className="mt-6">
              Request a custom quotation
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
