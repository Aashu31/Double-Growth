import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-midnight py-20 text-white sm:py-24">
      <div className="absolute inset-0 glow-surface opacity-80" aria-hidden="true" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center text-cyan">Start here</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
            Ready to Grow Your Business?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/60">
            Tell us what you are building. We will tell you honestly whether we
            are the right partner, what it will take and what it will cost.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/pricing" size="lg">
              Start Your Project
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost" size="lg">
              Contact Our Team
            </ButtonLink>
          </div>
          <p className="mt-6 text-xs text-white/35">
            No obligation. No invented timelines. A written scope before any
            payment.
          </p>
        </div>
      </div>
    </section>
  );
}
