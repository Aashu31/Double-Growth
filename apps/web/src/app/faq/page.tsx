import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs } from "@/content/faqs";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about Double Growth services, the ₹3,999 annual package, hosting, ownership, maintenance, payments and international clients.",
  path: "/faq",
});

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: absoluteUrl("/faq"),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="The details, answered directly."
        description="Pricing, scope, ownership, maintenance and payments. If a question is missing here, ask it and we will answer it."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} />

            <div className="mt-10 rounded-3xl border border-cloud bg-mist/60 p-7 text-center">
              <h2 className="text-xl font-semibold text-ink">
                Still have a question?
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate">
                Ask directly. We would rather clarify a policy before you buy
                than explain it afterwards.
              </p>
              <ButtonLink href="/contact" className="mt-5">
                Ask the team
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd} />
    </>
  );
}
