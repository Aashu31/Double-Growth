import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesContent } from "@/content/services";
import { ServiceCard } from "@/components/services/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function ServicesOverview() {
  return (
    <section className="section-pad bg-mist/60">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="What we build"
            description="Eight focused capabilities covering the digital work most businesses actually need."
          />
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-electric"
          >
            View the full catalogue
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicesContent.map((service, index) => (
            <Reveal key={service.id} delay={(index % 4) * 0.04}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
