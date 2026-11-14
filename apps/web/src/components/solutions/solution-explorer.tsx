"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Building2,
  Check,
  Compass,
  Sparkles,
  Store,
} from "lucide-react";
import { SOLUTIONS, type Solution } from "@double-growth/shared";
import { servicesContent } from "@/content/services";
import { ServiceIcon } from "@/components/services/service-icon";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconById = {
  "establish-online": Compass,
  "sell-online": Store,
  "run-operations": Building2,
  "automate-work": Sparkles,
  "keep-it-running": Activity,
} as const;

const fallbackSolution = SOLUTIONS[0] as Solution;

export function SolutionExplorer() {
  const [activeId, setActiveId] = useState(fallbackSolution.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const foundIndex = SOLUTIONS.findIndex(
    (solution) => solution.id === activeId,
  );
  const activeIndex = foundIndex === -1 ? 0 : foundIndex;
  const active = SOLUTIONS[activeIndex] ?? fallbackSolution;

  const services = active.serviceIds
    .map((id) => servicesContent.find((service) => service.id === id))
    .filter((service): service is (typeof servicesContent)[number] =>
      Boolean(service),
    );

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();

    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      (activeIndex + direction + SOLUTIONS.length) % SOLUTIONS.length;
    const next = SOLUTIONS[nextIndex];

    if (!next) return;

    setActiveId(next.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
      <div
        role="tablist"
        aria-label="Business solutions"
        aria-orientation="vertical"
        className="grid gap-2"
      >
        {SOLUTIONS.map((solution, index) => {
          const Icon = iconById[solution.id as keyof typeof iconById] ?? Compass;
          const selected = solution.id === activeId;

          return (
            <button
              key={solution.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`solution-tab-${solution.id}`}
              aria-selected={selected}
              aria-controls={`solution-panel-${solution.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(solution.id)}
              onKeyDown={onKeyDown}
              className={cn(
                "group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
                selected
                  ? "border-electric/35 bg-white shadow-soft"
                  : "border-cloud bg-mist/40 hover:border-electric/20 hover:bg-white",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                  selected
                    ? "bg-navy text-cyan"
                    : "bg-white text-electric shadow-sm",
                )}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate/60">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {solution.name}
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate">
                  {solution.tagline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`solution-panel-${active.id}`}
        aria-labelledby={`solution-tab-${active.id}`}
        key={active.id}
        className="relative overflow-hidden rounded-3xl border border-cloud bg-white p-6 shadow-soft sm:p-8"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-electric/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="eyebrow">Solution {String(activeIndex + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
            {active.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate">{active.outcome}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-cloud bg-mist/50 p-4">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate/70">
                The problem
              </p>
              <p className="mt-2 text-xs leading-6 text-slate">{active.problem}</p>
            </div>
            <div className="rounded-2xl border border-cloud bg-mist/50 p-4">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate/70">
                Best for
              </p>
              <p className="mt-2 text-xs leading-6 text-slate">{active.bestFor}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate/70">
              What the engagement includes
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {active.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-xs leading-5 text-slate"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate/70">
              Services used
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-cloud bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-electric/35 hover:text-electric"
                >
                  <span className="text-electric">
                    <ServiceIcon name={service.icon} className="h-3.5 w-3.5" />
                  </span>
                  {service.name.replace(" Development", "")}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-electric/15 bg-electric/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-electric">
              Next step
            </p>
            <p className="mt-1.5 text-xs leading-6 text-slate">{active.nextStep}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/contact?service=${active.serviceIds[0]}`}>
              Discuss this solution
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              See the published package
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
