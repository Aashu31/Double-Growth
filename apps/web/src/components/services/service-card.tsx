import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceContent } from "@/content/services";
import { ServiceIcon } from "@/components/services/service-icon";

export function ServiceCard({
  service,
  detail = false,
}: {
  service: ServiceContent;
  detail?: boolean;
}) {
  return (
    <article
      id={detail ? service.id : undefined}
      className="card-hover flex h-full flex-col rounded-3xl border border-cloud bg-white p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-electric">
          <ServiceIcon name={service.icon} />
        </span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate/70">
          {service.category}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">
        {service.name}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate">{service.summary}</p>

      {detail ? (
        <>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
            The problem it solves
          </p>
          <p className="mt-2 text-sm leading-6 text-slate">{service.problem}</p>

          <ul className="mt-5 space-y-2">
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

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
            Outcomes
          </p>
          <ul className="mt-2 space-y-2">
            {service.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-2.5 text-sm leading-6 text-slate"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                />
                {benefit}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
            Technologies
          </p>
          <p className="mt-2 text-sm leading-6 text-slate">
            {service.technologies.join(" · ")}
          </p>
        </>
      ) : (
        <ul className="mt-5 space-y-2">
          {service.benefits.slice(0, 2).map((benefit) => (
            <li
              key={benefit}
              className="flex gap-2.5 text-sm leading-6 text-slate"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric"
              />
              {benefit}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={
          detail ? "/contact" : `/services#${service.id}`
        }
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-electric"
      >
        {detail ? "Request a quotation" : "Explore service"}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </article>
  );
}
