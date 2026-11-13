import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Double Growth about your website, e-commerce or custom application project and request a quotation or demo.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building."
        description="Share the commercial goal and the current situation. A specific enquiry gets a specific response — and if we are not the right fit, we will say so."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="rounded-3xl border border-cloud bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-semibold text-ink">
                Project enquiry
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate">
                Fields marked with an asterisk are required. We use your details
                only to respond to this enquiry.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-cloud bg-mist/60 p-6">
                <h2 className="text-sm font-semibold text-ink">
                  What happens next
                </h2>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-slate">
                  <li className="flex gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-electric">
                      1
                    </span>
                    We review the enquiry and the project context.
                  </li>
                  <li className="flex gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-electric">
                      2
                    </span>
                    We reply with clarifying questions or a proposed next step.
                  </li>
                  <li className="flex gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-electric">
                      3
                    </span>
                    If there is a fit, you receive a written scope and quotation.
                  </li>
                </ol>
                <p className="mt-4 flex items-center gap-2 text-xs text-slate">
                  <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                  Enquiries are reviewed on business days.
                </p>
              </div>

              <div className="rounded-3xl border border-cloud bg-white p-6">
                <h2 className="text-sm font-semibold text-ink">
                  Direct contact
                </h2>
                <div className="mt-4 space-y-3 text-sm text-slate">
                  <p className="flex items-start gap-2.5">
                    <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    {siteConfig.contact.email ?? "Business email pending verification."}
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    {siteConfig.contact.phone ?? "Phone and WhatsApp pending verification."}
                  </p>
                  <p className="flex items-start gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    {siteConfig.contact.address ?? "Business address pending verification."}
                  </p>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate/80">
                  These placeholders are shown deliberately. We do not publish an
                  unmonitored inbox or a personal phone number as a company
                  contact channel.
                </p>
              </div>

              <div className="rounded-3xl border border-cloud bg-white p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <ShieldCheck aria-hidden="true" className="h-4 w-4 text-electric" />
                  Free demo request
                </h2>
                <p className="mt-2 text-xs leading-5 text-slate">
                  Mention “demo” in your project description. A demo is arranged
                  only when there is a relevant working interface to show — we do
                  not present a slide deck as a product demo.
                </p>
              </div>

              <div className="rounded-3xl border border-cloud bg-mist/60 p-6">
                <h2 className="text-sm font-semibold text-ink">
                  Common questions
                </h2>
                <ul className="mt-3 space-y-2 text-xs text-slate">
                  <li>
                    <Link href="/faq" className="font-semibold text-electric">
                      Pricing and payment FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="font-semibold text-electric">
                      Package inclusions and exclusions
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="font-semibold text-electric">
                      How delivery works
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
