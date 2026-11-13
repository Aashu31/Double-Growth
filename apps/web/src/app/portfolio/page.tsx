import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { projects } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Double Growth project work and clearly labelled design concepts. Client work is published only with permission.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Real work, published honestly."
        description="Delivered projects appear here only when they are complete and the client has approved publication. Until then, the entries below are design concepts — clearly labelled, with no invented clients or results."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-amber-950">
              <strong className="font-semibold">Design concepts, not client work.</strong>{" "}
              These examples show our approach. They contain no client identity,
              live data or measured outcomes.
            </p>
            <ButtonLink
              href="/contact"
              variant="secondary"
              size="sm"
              className="shrink-0"
            >
              Discuss your project
            </ButtonLink>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-cloud bg-mist/50 p-10 text-center sm:p-16">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-electric shadow-sm">
                <FolderKanban aria-hidden="true" className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-ink">
                The portfolio is being prepared.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate">
                We would rather show nothing than populate this page with stock
                screenshots or invented clients. Delivered work will be added
                here with the problem, solution, stack and a working demo where
                one exists.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact">Discuss your project</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore services
                </ButtonLink>
              </div>
            </div>
          ) : (
            <ProjectGrid projects={projects} />
          )}

          <div className="mt-12 rounded-2xl border border-cloud bg-white p-6">
            <h2 className="text-base font-semibold text-ink">
              A note on proof
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate">
              We do not publish client names, logos, testimonials or performance
              numbers without written permission. If a project is shown as a
              concept demonstration, it was created to demonstrate capability and
              is not presented as paid client work.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
