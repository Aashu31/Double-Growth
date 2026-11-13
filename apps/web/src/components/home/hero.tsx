import Link from "next/link";
import {
  ArrowRight,
  Check,
  Layers3,
  School,
  ShoppingCart,
  Sparkles,
  Globe2,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const stack = [
  {
    label: "Website presence",
    detail: "Business sites and landing pages",
    tag: "Core",
    icon: Globe2,
  },
  {
    label: "Commerce",
    detail: "Catalogues, checkout and orders",
    tag: "Optional",
    icon: ShoppingCart,
  },
  {
    label: "Automation",
    detail: "AI assistants and integrations",
    tag: "Optional",
    icon: Sparkles,
  },
  {
    label: "Sarthi — School ERP",
    detail: "A module of the platform",
    tag: "Planned",
    icon: School,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 grid-surface opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 glow-surface" aria-hidden="true" />
      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] gap-14 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Digital agency and platform
          </p>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.9rem]">
            <span className="block text-white">Build Digital.</span>
            <span className="text-gradient block">Grow Business.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            We build powerful digital experiences that help businesses
            establish, automate and scale — through modern websites,
            e-commerce, cloud solutions and intelligent technology.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/pricing" size="lg">
              Get Started
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="lg">
              Explore Our Services
            </ButtonLink>
          </div>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-colors hover:text-white"
          >
            Request a Free Demo
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
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

        <Reveal delay={0.12} className="relative">
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-md sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-electric/15 text-cyan">
                  <Layers3 aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Your digital stack</p>
                  <p className="text-[0.68rem] text-white/45">
                    One partner, clear boundaries
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cyan">
                Modular
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {stack.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-3.5 py-3"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-white/80">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {item.label}
                      </p>
                      <p className="truncate text-[0.68rem] text-white/45">
                        {item.detail}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/8 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-white/55">
                      {item.tag}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 text-ink">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-slate">
                    Growth Annual from
                  </p>
                  <p className="mt-1 text-2xl font-semibold leading-none">
                    ₹3,999
                    <span className="text-sm font-medium text-slate">/year</span>
                  </p>
                  <p className="mt-1.5 text-[0.65rem] leading-4 text-slate">
                    Scope-based. Third-party costs excluded.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-electric"
                >
                  View pricing
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-navy/60 px-4 py-3">
              <p className="text-[0.68rem] leading-5 text-white/50">
                Sarthi is developed inside the Double Growth platform, not as a
                separate product or repository.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
