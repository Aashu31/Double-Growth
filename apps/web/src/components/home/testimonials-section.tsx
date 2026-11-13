import { Quote, ShieldCheck } from "lucide-react";
import { testimonials } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection() {
  return (
    <section className="section-pad bg-mist/60">
      <div className="container-page">
        <SectionHeading
          eyebrow="Reviews"
          title="Verified feedback only."
          description="We do not write reviews, borrow them, or dress up a concept as a happy client. This section stays empty until real customers approve publication."
        />

        {testimonials.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-cloud bg-white p-8 sm:p-12">
            <div className="mx-auto max-w-xl text-center">
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-slate">
                <Quote aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">
                No verified reviews published yet.
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate">
                When a customer agrees to be quoted, their name, designation,
                review and rating will appear here. Until then, we would rather
                show an honest empty state than a fabricated one.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate">
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-electric" />
                No invented testimonials, ratings or client logos.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
