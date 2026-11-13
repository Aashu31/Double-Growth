import type { Metadata } from "next";
import Link from "next/link";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CheckoutForm } from "@/components/pricing/checkout-form";
import { PACKAGES } from "@double-growth/shared";
import { formatInr } from "@/lib/utils";
import { packageInclusions } from "@/content/pricing";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Checkout",
    description:
      "Place a Growth Annual package order with Double Growth. Payment is completed only through a verified provider.",
    path: "/pricing/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  const pkg = PACKAGES[0];

  return (
    <>
      <PageHero
        eyebrow="Order"
        title="Start your Growth Annual package."
        description="Enter your details to record an order. This does not charge you. Payment is completed only through a configured and verified provider."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-3xl border border-cloud bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-semibold text-ink">
                Customer information
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate">
                We use these details to create your order and contact you about
                payment and delivery.
              </p>
              <div className="mt-7">
                <CheckoutForm
                  packageId={pkg.id}
                  packageName={pkg.name}
                  priceMinor={pkg.priceMinor}
                />
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-cloud bg-mist/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  Order summary
                </p>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-ink">
                      {pkg.name}
                    </h2>
                    <p className="mt-1 text-xs text-slate">Annual package</p>
                  </div>
                  <p className="text-lg font-semibold text-ink">
                    {formatInr(pkg.priceMinor)}
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-cloud pt-5">
                  {packageInclusions.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-xs leading-5 text-slate"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between border-t border-cloud pt-4 text-sm">
                  <span className="font-medium text-ink">Total</span>
                  <span className="font-semibold text-ink">
                    {formatInr(pkg.priceMinor)}
                  </span>
                </div>
                <p className="mt-2 text-[0.68rem] leading-5 text-slate">
                  Taxes and third-party costs, if applicable, are confirmed
                  separately before payment.
                </p>
              </div>

              <div className="rounded-3xl border border-cloud bg-white p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Lock aria-hidden="true" className="h-4 w-4 text-electric" />
                  Payment status
                </p>
                <p className="mt-2 text-xs leading-5 text-slate">
                  Online payment is enabled only after a payment provider is
                  configured on the server. Until then, your order is recorded as
                  pending and no money is collected through this page.
                </p>
              </div>

              <div className="rounded-3xl border border-cloud bg-white p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <ShieldCheck
                    aria-hidden="true"
                    className="h-4 w-4 text-electric"
                  />
                  What happens next
                </p>
                <ol className="mt-3 space-y-2 text-xs leading-5 text-slate">
                  <li>1. Your order is recorded with a reference number.</li>
                  <li>2. The team reviews the details and confirms scope.</li>
                  <li>3. Payment instructions are issued through a verified channel.</li>
                  <li>4. Work begins after written acceptance and payment confirmation.</li>
                </ol>
                <Link
                  href="/terms"
                  className="mt-4 inline-flex text-xs font-semibold text-electric"
                >
                  Read the Terms and Conditions
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
