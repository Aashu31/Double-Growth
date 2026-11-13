import Link from "next/link";
import { ArrowRight, Boxes, Code2, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const pillars = [
  {
    icon: Code2,
    title: "Build",
    description:
      "Websites, storefronts and custom applications built on a maintainable modern stack.",
  },
  {
    icon: Boxes,
    title: "Automate",
    description:
      "Practical integrations and AI assistance that remove repetitive work instead of adding noise.",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description:
      "A long-term technical partnership covering deployment, maintenance and measured improvements.",
  },
];

export function BrandIntro() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Who we are"
              title="One partner for the digital layer of your business."
              description="Double Growth is a two-founder digital agency and platform company. We plan, build and maintain the website, storefront, internal tool and integrations that a business actually uses — with a written scope before work starts."
            />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric"
              >
                More about Double Growth
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <p className="text-xs leading-5 text-slate">
                Sarthi, our School ERP module, is built inside this platform.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={0.06 + index * 0.06}>
                  <div className="h-full rounded-2xl border border-cloud bg-mist/60 p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-electric shadow-sm">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h2 className="mt-4 text-[0.95rem] font-semibold text-ink">
                      {pillar.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate">
                      {pillar.description}
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
