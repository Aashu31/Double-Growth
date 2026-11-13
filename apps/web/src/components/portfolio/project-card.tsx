import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  Globe2,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import type { Project } from "@/content/portfolio";

const categoryIcons: Record<string, typeof Globe2> = {
  Commerce: ShoppingBag,
  Platform: LayoutDashboard,
  Website: Globe2,
};

export function ProjectCard({ project }: { project: Project }) {
  const Icon = categoryIcons[project.category] ?? FolderKanban;

  return (
    <article className="card-hover flex h-full flex-col overflow-hidden rounded-3xl border border-cloud bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy via-navy-700 to-electric/70">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid-surface flex h-full items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/70 backdrop-blur">
              <Icon aria-hidden="true" className="h-7 w-7" />
            </span>
          </div>
        )}
        {project.concept ? (
          <span className="absolute left-3 top-3 rounded-full bg-amber-300 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-amber-950">
            Design concept
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate">
          {project.description}
        </p>

        <p className="mt-4 text-xs leading-5 text-slate">
          <span className="font-semibold text-ink/70">
            {project.concept ? "Proposed stack" : "Stack"}:
          </span>{" "}
          {project.technologies.join(" · ")}
        </p>

        <div className="mt-auto flex flex-wrap gap-4 pt-5">
          {project.caseStudyUrl ? (
            <Link
              href={project.caseStudyUrl}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric"
            >
              {project.concept ? "View concept" : "View case study"}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
            >
              Live demo
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
