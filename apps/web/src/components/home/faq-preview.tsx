import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homepageFaqs } from "@/content/faqs";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";

export function FaqPreview() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions worth answering clearly."
            description="Pricing, ownership, hosting and payments — the details that usually arrive after the sales call."
          />
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-electric"
          >
            Read all questions
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <FaqAccordion items={homepageFaqs} />
      </div>
    </section>
  );
}
