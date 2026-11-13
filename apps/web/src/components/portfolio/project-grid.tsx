"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/portfolio";
import { ProjectCard } from "@/components/portfolio/project-card";
import { cn } from "@/lib/utils";

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => {
          const selected = active === category;
          const count =
            category === "All"
              ? projects.length
              : projects.filter((project) => project.category === category)
                  .length;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors",
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-cloud bg-white text-slate hover:border-electric/40 hover:text-ink",
              )}
            >
              {category}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[0.6rem]",
                  selected ? "bg-white/15 text-white" : "bg-mist text-slate",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-slate" role="status" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
