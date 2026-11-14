import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { ProjectVisual } from "@/components/art/project-visual";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-cloud bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        <ProjectVisual
          visual={project.visual}
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {project.concept ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-amber-950">
            <Sparkles aria-hidden="true" className="h-3 w-3" />
            Design concept
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate">{project.description}</p>

        <p className="mt-4 text-xs leading-5 text-slate">
          <span className="font-semibold text-ink/70">
            {project.concept ? "Proposed stack" : "Stack"}:
          </span>{" "}
          {project.technologies.join(" · ")}
        </p>

        <div className="mt-auto flex flex-wrap gap-4 border-t border-cloud/80 pt-5">
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
