import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
            This page could not be found.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate">
            The link may be outdated or the page may have moved. Start from the
            homepage, or tell us what you were looking for.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">Back to homepage</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-slate">
            Or browse our{" "}
            <Link href="/services" className="font-semibold text-electric">
              services
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
