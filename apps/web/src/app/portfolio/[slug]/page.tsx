import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import { projects } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <article className="section-pad">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-slate">
            <li>
              <Link href="/portfolio" className="font-semibold hover:text-ink">
                Portfolio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{project.category}</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate">
            {project.description}
          </p>
          {project.concept ? (
            <p className="mt-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              Design concept — not paid client work
            </p>
          ) : null}
        </header>

        <div className="mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-700 to-electric/70">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid-surface flex h-full items-center justify-center px-6 text-center text-sm text-white/55">
              Visual preview pending. No invented screenshot is shown.
            </div>
          )}
        </div>

        {project.concept && project.note ? (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            />
            <div>
              <h2 className="text-sm font-semibold text-amber-950">
                What this page is
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-amber-900/80">
                {project.note}
              </p>
            </div>
          </div>
        ) : null}

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-6">
            {project.brief ? (
              <div className="rounded-3xl border border-cloud bg-white p-6">
                <h2 className="text-lg font-semibold text-ink">The brief</h2>
                <p className="mt-2 text-sm leading-7 text-slate">
                  {project.brief}
                </p>
              </div>
            ) : null}

            {project.approach ? (
              <div className="rounded-3xl border border-cloud bg-white p-6">
                <h2 className="text-lg font-semibold text-ink">
                  Proposed approach
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate">
                  {project.approach}
                </p>
              </div>
            ) : null}

            {project.features && project.features.length > 0 ? (
              <div className="rounded-3xl border border-cloud bg-white p-6">
                <h2 className="text-lg font-semibold text-ink">
                  Planned features
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2.5 text-sm leading-6 text-slate"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-electric"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-3xl border border-cloud bg-white p-6">
              <h2 className="text-lg font-semibold text-ink">
                {project.concept ? "Proposed technology stack" : "Technology stack"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate">
                {project.technologies.join(" · ")}
              </p>
              {project.concept ? (
                <p className="mt-2 text-xs leading-5 text-slate">
                  Proposed for a build of this kind. No application has been
                  deployed for this concept.
                </p>
              ) : null}
            </div>

            {!project.concept && !project.brief ? (
              <div className="rounded-3xl border border-cloud bg-white p-6">
                <h2 className="text-lg font-semibold text-ink">
                  Project details
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate">
                  Detailed problem, solution and feature documentation is added
                  when the project is approved for publication.
                </p>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-3xl border border-cloud bg-mist/60 p-6">
            <h2 className="text-sm font-semibold text-ink">
              Build something similar
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate">
              Share your requirements and we will suggest the smallest solution
              that fits, with a written scope before any payment.
            </p>
            <ButtonLink href="/contact" className="mt-5 w-full">
              Request a quotation
            </ButtonLink>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-cloud bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                Open live demo
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ) : null}
            <Link
              href="/portfolio"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate hover:text-ink"
            >
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              Back to portfolio
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
