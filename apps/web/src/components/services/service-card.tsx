import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ServiceContent } from "@/content/services";
import { ServiceIcon } from "@/components/services/service-icon";
import { ServiceVisual } from "@/components/art/service-visual";

export function ServiceCard({
  service,
  detail = false,
  index,
}: {
  service: ServiceContent;
  detail?: boolean;
  index?: number;
}) {
  return (
    <article
      id={detail ? service.id : undefined}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-cloud bg-white"
    >
      <div className="relative h-40 overflow-hidden bg-navy sm:h-44">
        <div className="absolute inset-0 grid-surface opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-electric/25 via-transparent to-cyan/10"
          aria-hidden="true"
        />
        <ServiceVisual
          id={service.id}
          className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-cyan backdrop-blur">
            <ServiceIcon name={service.icon} />
          </span>
          <span className="rounded-full border border-white/15 bg-navy/60 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/65 backdrop-blur">
            {service.category}
          </span>
        </div>
        <span className="absolute right-5 top-5 font-mono text-[0.6rem] tracking-[0.2em] text-white/40">
          {typeof index === "number" ? String(index + 1).padStart(2, "0") : ""}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug text-ink">
          <Link
            href={`/services/${service.id}`}
            className="underline-sweep decoration-electric/50"
          >
            {service.name}
          </Link>
        </h3>
        <p className="mt-2.5 text-sm leading-6 text-slate">{service.summary}</p>

        {detail ? (
          <>
            <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate/70">
              The problem it solves
            </p>
            <p className="mt-2 text-sm leading-6 text-slate">{service.problem}</p>

            <ul className="mt-5 grid gap-2">
              {service.features.slice(0, 4).map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2.5 text-sm leading-6 text-slate"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate/70">
              Technologies
            </p>
            <p className="mt-1.5 text-xs leading-5 text-slate">
              {service.technologies.join(" · ")}
            </p>
          </>
        ) : (
          <ul className="mt-4 space-y-2">
            {service.benefits.slice(0, 2).map((benefit) => (
              <li
                key={benefit}
                className="flex gap-2.5 text-[0.82rem] leading-5 text-slate"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-cloud/80 pt-5">
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric"
          >
            Explore service
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          {detail ? (
            <Link
              href={`/contact?service=${service.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-ink/70 hover:text-ink"
            >
              Request quote
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
