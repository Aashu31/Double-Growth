import { processSteps } from "@/content/process";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function ProcessSection() {
  return (
    <section className="section-pad bg-mist/60">
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title="A process built to remove surprises."
          description="Five stages, each with a clear output. You always know what is being built, what is next and what is waiting on you."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.05}>
              <div className="relative h-full rounded-3xl border border-cloud bg-mist/50 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                    {step.number}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-gradient-to-r from-electric/40 to-transparent lg:block"
                    />
                  ) : null}
                </div>
                <h3 className="mt-4 text-[0.95rem] font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
