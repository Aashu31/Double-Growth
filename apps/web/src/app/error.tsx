"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle aria-hidden="true" className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl">
            Something went wrong.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate">
            This page could not be displayed. Nothing was submitted, stored or
            charged because of this error.
          </p>
          {error.digest ? (
            <p className="mt-3 text-xs text-slate">
              Reference: <span className="font-mono">{error.digest}</span>
            </p>
          ) : null}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#245cff]"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3.5 text-[0.95rem] font-semibold text-navy transition-colors hover:bg-mist"
            >
              Back to homepage
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate">
            If the problem continues,{" "}
            <Link href="/contact" className="font-semibold text-electric">
              contact the team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
