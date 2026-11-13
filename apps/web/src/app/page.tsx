import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { BrandIntro } from "@/components/home/brand-intro";
import { ValueSection } from "@/components/home/value-section";
import { ServicesOverview } from "@/components/home/services-overview";
import { ProcessSection } from "@/components/home/process-section";
import { PricingPreview } from "@/components/home/pricing-preview";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqPreview } from "@/components/home/faq-preview";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, pageMetadata, siteConfig } from "@/lib/site";
import { SERVICES } from "@double-growth/shared";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const serviceList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Double Growth services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        provider: { "@type": "Organization", name: siteConfig.name },
        url: absoluteUrl(`/services#${service.id}`),
      },
    })),
  };

  return (
    <>
      <Hero />
      <BrandIntro />
      <ServicesOverview />
      <ValueSection />
      <ProcessSection />
      <PricingPreview />
      <PortfolioPreview />
      <TestimonialsSection />
      <FaqPreview />
      <FinalCta />
      <JsonLd data={serviceList} />
    </>
  );
}
