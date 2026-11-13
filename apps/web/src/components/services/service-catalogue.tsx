"use client";

import { useMemo, useState } from "react";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@double-growth/shared";
import { servicesContent } from "@/content/services";
import { ServiceCard } from "@/components/services/service-card";
import { cn } from "@/lib/utils";

export function ServiceCatalogue() {
  const [category, setCategory] = useState<ServiceCategory>("All");

  const visible = useMemo(
    () =>
      category === "All"
        ? servicesContent
        : servicesContent.filter((service) => service.category === category),
    [category],
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter services by category"
      >
        {SERVICE_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === item
                ? "border-navy bg-navy text-white"
                : "border-cloud bg-white text-slate hover:border-navy/25 hover:text-ink",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate" aria-live="polite">
        Showing {visible.length} of {servicesContent.length} services
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} detail />
        ))}
      </div>
    </div>
  );
}
