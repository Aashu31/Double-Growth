import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faqs";

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-cloud rounded-3xl border border-cloud bg-white">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-2 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[0.95rem] font-semibold text-ink marker:hidden">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-slate transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="pb-5 text-sm leading-7 text-slate">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
