"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { ProjectCard } from "@/components/portfolio/project-card";
import { cn } from "@/lib/utils";

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();

  const filtered = projects.filter((project) => {
    const matchesCategory = active === "All" || project.category === active;
    const matchesQuery =
      term.length === 0 ||
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.technologies.some((technology) =>
        technology.toLowerCase().includes(term),
      );
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate"
          />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search concepts or technology"
            className="w-full rounded-full border border-cloud bg-white py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-slate/60 focus:border-electric"
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate" role="status" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-cloud bg-mist/60 p-10 text-center">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate shadow-sm">
            <SearchX aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-ink">
            No projects match that search.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate">
            Try a different term or clear the filters. Published client work is
            added only after delivery and written approval.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("All");
            }}
            className="mt-5 rounded-full border border-cloud bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-electric/40"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
