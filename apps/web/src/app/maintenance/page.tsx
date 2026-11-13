import type { Metadata } from "next";
import { Check, Info, Minus, Wrench } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Maintenance and Support",
  description:
    "Double Growth website maintenance and technical support: what is covered, what is not, and how requests are handled.",
  path: "/maintenance",
});

const covered = [
  "Dependency and security updates for the delivered stack",
  "Fix verification for bugs in the delivered functionality",
  "Small content and configuration changes within the agreed allowance",
  "Form, endpoint and integration health checks",
  "Deployment support and rollback guidance",
  "Backup and restoration checks for managed environments",
  "Advice on hosting, domain and third-party service issues",
];

const notCovered = [
  "New features, new pages or redesigns outside the agreed scope",
  "Content writing, photography and brand design",
  "Third-party subscription, hosting, domain or API charges",
  "Changes to a site hosted or managed by another provider",
  "Emergency recovery caused by unauthorised edits or credential sharing",
  "Unlimited changes or guaranteed response times not stated in writing",
];

const requestSteps = [
  "Send the request through the contact page or the agreed support channel.",
  "Include the page, the expected behaviour and what actually happened.",
  "We triage the request and confirm whether it falls within maintenance scope.",
  "In-scope work is scheduled; out-of-scope work is quoted before it starts.",
  "The fix is verified and the change is recorded.",
];

export default function MaintenancePage() {
  return (
    <>
      <PageHero
        eyebrow="Maintenance"
        title="Support that keeps the site alive."
        description="A website is not finished at launch. Maintenance covers the unglamorous work that prevents small issues from becoming outages."
      >
        <ButtonLink href="/contact">Raise a support request</ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-cloud bg-white p-6 sm:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Check aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-ink">
                Covered by maintenance
              </h2>
              <ul className="mt-4 space-y-2.5">
                {covered.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-cloud bg-white p-6 sm:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-slate">
                <Minus aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-ink">
                Not covered
              </h2>
              <ul className="mt-4 space-y-2.5">
                {notCovered.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate">
                    <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-slate/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-cloud bg-mist/60 p-6 sm:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-electric shadow-sm">
                <Wrench aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-ink">
                How a request is handled
              </h2>
              <ol className="mt-4 space-y-3">
                {requestSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-slate">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-electric">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Info aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-amber-950">
                Honest limits
              </h2>
              <p className="mt-3 text-sm leading-6 text-amber-900/80">
                Maintenance is a defined scope, not unlimited availability. There
                is no 24/7 guarantee and no promise of instant response unless a
                separate written agreement says so.
              </p>
              <p className="mt-3 text-sm leading-6 text-amber-900/80">
                The Growth Annual package includes maintenance within the
                published support scope. Additional work is quoted before it
                begins.
              </p>
              <ButtonLink href="/pricing" variant="secondary" className="mt-5">
                View package details
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
