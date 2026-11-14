import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { GrowthOrbit } from "@/components/art/growth-orbit";

const capabilityStrip = [
  "Business websites",
  "E-commerce",
  "Custom applications",
  "Sarthi school ERP",
  "AI automation",
  "Cloud & DevOps",
  "Maintenance",
  "Digital solutions",
];

const orbitLabels = [
  {
    label: "Build",
    detail: "Websites and applications",
    icon: Code2,
    position: "left-0 top-[16%] sm:left-2",
    motion: "float-slow",
  },
  {
    label: "Automate",
    detail: "AI and integrations",
    icon: Sparkles,
    position: "right-0 top-[8%] sm:right-2",
    motion: "float-slower",
  },
  {
    label: "Grow",
    detail: "Maintenance and support",
    icon: TrendingUp,
    position: "bottom-[20%] right-0 sm:right-4",
    motion: "float-slow",
  },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 grid-surface opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 glow-surface" aria-hidden="true" />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 pb-16 pt-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-6 lg:pb-24 lg:pt-20">
          <div className="relative z-10">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-white/70">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                Digital agency and platform
              </p>

              <h1 className="mt-7 text-[clamp(2.8rem,6.2vw,5.35rem)] font-semibold leading-[0.94] tracking-[-0.045em]">
                <span className="block text-white">Build Digital.</span>
                <span className="text-gradient block">Grow Business.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                We create powerful digital experiences that help businesses
                establish, automate and scale — through modern websites,
                e-commerce, custom applications and practical AI.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact" size="lg">
                  Start Your Project
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/services" variant="ghost" size="lg">
                  Explore Our Services
                </ButtonLink>
              </div>

              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-colors hover:text-white"
              >
                See the ₹3,999/year package
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6">
                {[
                  "Written scope before work",
                  "Third-party costs stated separately",
                  "You own your delivered code",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-xs text-white/55"
                  >
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-cyan" />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto w-full max-w-[38rem]">
              <div
                className="absolute inset-6 rounded-full bg-electric/20 blur-3xl"
                aria-hidden="true"
              />
              <GrowthOrbit className="relative w-full" />

              {orbitLabels.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`absolute ${item.position} ${item.motion} hidden items-center gap-2.5 rounded-2xl border border-white/15 bg-navy/80 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl sm:flex`}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-electric/20 text-cyan">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="block text-[0.6rem] text-white/45">
                        {item.detail}
                      </span>
                    </span>
                  </div>
                );
              })}

              <div className="absolute inset-x-[14%] top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-navy/70 p-4 text-center backdrop-blur-xl sm:inset-x-[18%]">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-cyan">
                  One partner
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white">
                  One clear scope. One accountable team.
                </p>
              </div>
            </div>

            <div className="relative z-10 -mt-4 rounded-3xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-xl sm:-mt-10 sm:ml-auto sm:max-w-[21rem]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/45">
                    Published package
                  </p>
                  <p className="mt-1 text-2xl font-semibold leading-none text-white">
                    ₹3,999
                    <span className="text-xs font-medium text-white/50">/year</span>
                  </p>
                  <p className="mt-1.5 text-[0.65rem] leading-4 text-white/45">
                    Scope-based. Third-party costs excluded.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  aria-label="View the Growth Annual package"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-navy transition-colors hover:bg-cyan"
                >
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-y border-white/10 bg-white/[0.025] py-3.5">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {capabilityStrip.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-5 whitespace-nowrap px-5 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/40"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-cyan/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">
          Double Growth capabilities: {capabilityStrip.join(", ")}.
        </p>
      </div>
    </section>
  );
}
