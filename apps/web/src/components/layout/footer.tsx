import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { Brand } from "@/components/brand";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { legalNavigation, siteConfig } from "@/lib/site";
import { SERVICES } from "@double-growth/shared";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="grid-surface">
        <div className="container-page py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.7fr_1fr_0.95fr]">
            <div className="max-w-sm">
              <Brand inverted />
              <p className="mt-5 text-sm leading-6 text-white/60">
                We help businesses establish, automate and grow their digital
                presence through well-engineered websites, applications and
                practical technology.
              </p>
              <div className="mt-6">
                <NewsletterForm />
              </div>
            </div>

            <div>
              <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                Company
              </h2>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="underline-sweep text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                Services
              </h2>
              <ul className="mt-4 space-y-2.5">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.id}`}
                      className="underline-sweep text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                Contact
              </h2>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                {siteConfig.contact.email ? (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="block hover:text-white"
                  >
                    {siteConfig.contact.email}
                  </a>
                ) : (
                  <p className="text-white/50">
                    Business email pending verification.
                  </p>
                )}
                {siteConfig.contact.phone ? (
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="block hover:text-white"
                  >
                    {siteConfig.contact.phone}
                  </a>
                ) : (
                  <p className="text-white/50">
                    Phone and WhatsApp pending verification.
                  </p>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-semibold text-cyan hover:text-white"
                >
                  Send an enquiry
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                {siteConfig.social.length === 0 ? (
                  <p className="text-xs text-white/40">
                    Social profiles pending verification.
                  </p>
                ) : null}
                <p className="flex items-start gap-2 pt-1 text-xs leading-5 text-white/40">
                  <CircleDot aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 text-cyan" />
                  Sarthi, our School ERP module, is part of the Double Growth
                  platform — not a separate product.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 hairline" aria-hidden="true" />

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                Legal
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {legalNavigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-xl text-[0.7rem] leading-5 text-white/35">
                Legal pages are working drafts and require professional review
                before commercial launch.
              </p>
            </div>

            <div className="text-xs text-white/45 lg:text-right">
              <p>
                © {year} {siteConfig.name}. All rights reserved.
              </p>
              <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
                Build Digital. Grow Business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
