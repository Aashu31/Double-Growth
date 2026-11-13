import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceCatalogue } from "@/components/services/service-catalogue";
import { processSteps } from "@/content/process";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Business websites, e-commerce, custom web applications, Sarthi school management, AI automation, cloud and DevOps, maintenance and digital business solutions.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service catalogue"
        title="Digital work with a defined scope."
        description="Every service below is delivered as an engagement with a written scope, clear exclusions and a named owner. Filter by category, then request a quotation for the work you need."
      >
        <ButtonLink href="/contact">
          Request a quotation
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <ServiceCatalogue />
        </div>
      </section>

      <section className="border-y border-cloud bg-mist/60 py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Delivery</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                The same process, regardless of service.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate">
                Scope is agreed before build, feedback happens on working
                software, and launch includes the operational work that keeps the
                project alive.
              </p>
              <Link
                href="/how-it-works"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric"
              >
                See how we work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2">
              {processSteps.map((step) => (
                <li
                  key={step.number}
                  className="rounded-2xl border border-cloud bg-white p-4"
                >
                  <p className="flex items-center gap-2 text-xs font-semibold text-electric">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    Step {step.number}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="rounded-3xl bg-navy p-8 text-center text-white sm:p-12">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Not sure which service fits?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60">
              Describe the business problem. We will recommend the smallest
              solution that actually solves it, including when that means less
              work rather than more.
            </p>
            <ButtonLink href="/contact" className="mt-6">
              Talk to the team
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
