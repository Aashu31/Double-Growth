import { BadgeIndianRupee, Compass, LifeBuoy, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const values = [
  {
    icon: BadgeIndianRupee,
    title: "Affordable by design",
    description:
      "A published annual package priced for small businesses, with third-party costs listed separately instead of buried in a promise.",
  },
  {
    icon: ShieldCheck,
    title: "Engineering quality",
    description:
      "TypeScript, server-side validation, accessible layouts and a production build that is tested before launch.",
  },
  {
    icon: Compass,
    title: "Transparent scope",
    description:
      "You receive a written scope, clear inclusions and an honest boundary on what is not part of the engagement.",
  },
  {
    icon: LifeBuoy,
    title: "Long-term support",
    description:
      "Maintenance, updates and a named technical contact after launch — not a handover and disappearance.",
  },
];

export function ValueSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Why Double Growth"
            title="A technology partner, not a template shop."
            description="We build the digital layer of a business: the website, the storefront, the internal tool and the integrations between them. Every engagement starts with the commercial outcome, not a theme selection."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-cloud bg-mist/60 p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-electric shadow-sm">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[0.95rem] font-semibold text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
