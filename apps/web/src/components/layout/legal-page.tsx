import Link from "next/link";
import type { LegalDocument } from "@/content/legal";
import { siteConfig } from "@/lib/site";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <article className="pb-20 pt-12 sm:pt-16">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div
            role="note"
            className="rounded-2xl border border-amber-300/70 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-950"
          >
            <strong className="font-semibold">Draft for legal review.</strong>{" "}
            This page is a working draft and is not final legal advice. It must
            be reviewed by a qualified professional before commercial launch.
          </div>

          <header className="mt-10 border-b border-cloud pb-8">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
              {document.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate">
              {document.description}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate">
              Last updated: {document.updated}
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {document.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-[0.95rem] leading-7 text-slate"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[0.95rem] leading-7 text-slate"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="mt-14 rounded-2xl border border-cloud bg-mist p-6">
            <h2 className="text-lg font-semibold text-ink">
              Questions about this policy?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate">
              Contact details are pending verification and will be published on
              the contact page before launch. You can also review the{" "}
              <Link href="/terms" className="font-semibold text-electric">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/refund-policy" className="font-semibold text-electric">
                Refund Policy
              </Link>
              .
            </p>
            <p className="mt-3 text-xs text-slate/80">
              These policies are reviewed together. Changes to one may affect
              the others.
            </p>
          </aside>

          <p className="mt-8 text-xs leading-6 text-slate/70">
            {siteConfig.name} publishes this draft for transparency. It does not
            create rights beyond those confirmed in a signed agreement and
            applicable law.
          </p>
        </div>
      </div>
    </article>
  );
}
