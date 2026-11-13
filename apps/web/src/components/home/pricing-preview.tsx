import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { formatInr } from "@/lib/utils";
import { PACKAGES } from "@double-growth/shared";
import { packageInclusions } from "@/content/pricing";
import { Reveal } from "@/components/motion/reveal";

export function PricingPreview() {
  const pkg = PACKAGES[0];

  return (
    <section className="section-pad relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 grid-surface opacity-50" aria-hidden="true" />
      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-cyan">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              One clear annual package.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/65">
              The Growth Annual package covers an agreed website scope,
              deployment support and maintenance. Custom applications and larger
              builds are quoted separately after discovery.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.045] p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white/60">
                    {pkg.name}
                  </p>
                  <p className="mt-1 text-4xl font-semibold">
                    {formatInr(pkg.priceMinor)}
                    <span className="ml-1 text-sm font-medium text-white/50">
                      /{pkg.billingPeriod}
                    </span>
                  </p>
                </div>
                <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-cyan">
                  Published package
                </span>
              </div>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {packageInclusions.slice(0, 6).map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-6 text-white/70"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-cyan"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/pricing/checkout" className="flex-1">
                  Get Started
                </ButtonLink>
                <ButtonLink
                  href="/pricing"
                  variant="ghost"
                  className="flex-1"
                >
                  View Details
                </ButtonLink>
              </div>
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-300"
                />
                <div>
                  <p className="text-sm font-semibold text-amber-200">
                    What the package is not
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Not unlimited development, unlimited hosting or unlimited
                    support. We publish limits because sustainable service
                    requires them.
                  </p>
                </div>
              </div>

              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                    Included
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white/70">
                    Website build within scope, responsive delivery, core SEO,
                    enquiry form, deployment support and maintenance within the
                    published support scope.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                    Third-party costs
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white/70">
                    Domain, paid hosting, payment gateway fees and paid AI usage
                    are billed separately unless a quotation says otherwise.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                    Custom work
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white/70">
                    E-commerce extensions, custom applications and integrations
                    are scoped and quoted after discovery.
                  </dd>
                </div>
              </dl>

              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan"
              >
                Read the full pricing details
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
