import Link from "next/link";
import { ArrowRight, FolderKanban, ImageIcon, Layers, Link2 } from "lucide-react";
import { projects } from "@/content/portfolio";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export function PortfolioPreview() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Work we can stand behind."
            description="Delivered projects are published only with client permission. Until then, featured entries are clearly labelled design concepts — no stock screenshots, invented clients or borrowed case studies."
          />
          <ButtonLink href="/portfolio" variant="secondary" className="shrink-0">
            View portfolio
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </div>

        {projects.length > 0 ? (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <p className="mt-6 text-xs leading-5 text-slate">
              Every entry above is a design concept, not a paid client project.
              Client work will replace these only after delivery and written
              approval.
            </p>
          </>
        ) : (
          <div className="mt-10 overflow-hidden rounded-3xl border border-cloud bg-mist/60">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-electric shadow-sm">
                  <FolderKanban aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-ink">
                  Selected work is being prepared.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-slate">
                  The portfolio is intentionally empty until a real project is
                  delivered, documented and approved for publication. Any
                  concept demonstration added before then will be labelled as a
                  concept, not client work.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-electric"
                >
                  Discuss your project
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>

              <div className="border-t border-cloud bg-white p-7 lg:border-l lg:border-t-0 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  Each case study will include
                </p>
                <ul className="mt-4 space-y-4">
                  {[
                    {
                      icon: Layers,
                      title: "The problem and the solution",
                      detail: "What the business needed and what was built.",
                    },
                    {
                      icon: ImageIcon,
                      title: "Real screenshots",
                      detail: "Captured from the delivered project, not a mockup.",
                    },
                    {
                      icon: Link2,
                      title: "Stack and live demo",
                      detail: "Technologies used and a working link where available.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-electric">
                          <Icon aria-hidden="true" className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs leading-5 text-slate">
                            {item.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
