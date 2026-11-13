import type { Metadata } from "next";
import { Compass, Eye, ShieldCheck, Target, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Double Growth is a two-founder digital solutions agency building websites, applications and the Sarthi school management module.",
  path: "/about",
});

const values = [
  {
    title: "Honesty over polish",
    description:
      "We show empty states instead of fake testimonials, and state exclusions instead of promising unlimited work.",
  },
  {
    title: "Engineering discipline",
    description:
      "Typed code, server-side validation, accessible interfaces and a build that is tested before it ships.",
  },
  {
    title: "Commercial clarity",
    description:
      "Scope, price, third-party costs and ownership are agreed before development begins.",
  },
  {
    title: "Long-term thinking",
    description:
      "A website is an asset that needs maintenance. We plan for what happens after launch.",
  },
];

const whyChoose = [
  "Direct access to the people building the work, not an account manager relaying messages.",
  "A written scope and a published annual package instead of an opaque sales process.",
  "Modern architecture with clear separation between the website, API and database.",
  "Security and payment handling treated as engineering requirements, not afterthoughts.",
  "An honest boundary on what a small team can deliver well.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small team with a serious approach."
        description="Double Growth is a digital solutions agency founded by two co-founders. We build the digital layer of a business and, over time, our own platform."
        variant="dark"
      >
        <ButtonLink href="/contact" variant="ghost">
          Work with us
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Built to solve real business problems.
              </h2>
              <div className="mt-5 space-y-4 text-[0.95rem] leading-7 text-slate">
                <p>
                  Double Growth exists because many businesses are stuck between
                  two bad options: a cheap template that does not represent them,
                  or an agency process that is larger and more expensive than the
                  problem requires.
                </p>
                <p>
                  We take a different route. We start with the commercial
                  outcome, define a scope that fits, and build with modern tools
                  that keep the result maintainable. The same engineering
                  discipline applies whether the engagement is a five-page
                  website or a custom application.
                </p>
                <p>
                  The company also builds <strong className="text-ink">Sarthi</strong>,
                  its School Management System (School ERP) module. Sarthi is
                  part of the Double Growth platform, not a separate standalone
                  product.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-cloud bg-mist/60 p-6">
                <Target aria-hidden="true" className="h-5 w-5 text-electric" />
                <h3 className="mt-3 text-base font-semibold text-ink">
                  Mission
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate">
                  Help businesses establish a credible, effective digital
                  presence — and grow through it — using well-engineered
                  websites and applications.
                </p>
              </div>
              <div className="rounded-2xl border border-cloud bg-mist/60 p-6">
                <Eye aria-hidden="true" className="h-5 w-5 text-electric" />
                <h3 className="mt-3 text-base font-semibold text-ink">Vision</h3>
                <p className="mt-2 text-sm leading-6 text-slate">
                  Operate as a digital solutions agency that funds and builds its
                  own software platform, beginning with Sarthi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-cloud bg-mist/50 py-16">
        <div className="container-page">
          <p className="eyebrow">Values</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            The rules we work by.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-cloud bg-white p-5"
              >
                <h3 className="text-sm font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow">Founders</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Two founders. Two areas of accountability.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate">
                Names, biographies and photographs are pending verification and
                will be published only when confirmed. The roles below describe
                how the work is divided.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.founders.map((founder, index) => (
                <div
                  key={founder.role}
                  className="rounded-3xl border border-cloud bg-white p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-sm font-semibold text-white">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {founder.name ?? "Profile pending verification"}
                      </p>
                      <p className="text-xs text-slate">{founder.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate">
                    {founder.focus}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-slate/70">
                    <Users aria-hidden="true" className="h-3.5 w-3.5" />
                    Separate accounts and access
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cloud bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Technology in service of the business.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate">
              We use Next.js, React, TypeScript, Tailwind CSS, Node.js and
              Fastify, with PostgreSQL and Prisma for data. The stack is chosen
              for maintainability, performance and a clear separation between
              the public website, the API and the database.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate">
              The frontend never connects to the database directly. Sensitive
              operations run through validated backend endpoints, and payment or
              AI credentials stay on the server.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-electric" />
              Security and validation are part of the build, not an add-on.
            </p>
          </div>

          <div>
            <p className="eyebrow">Why choose Double Growth</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              What you can expect.
            </h2>
            <ul className="mt-5 space-y-3">
              {whyChoose.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-slate"
                >
                  <Compass
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
