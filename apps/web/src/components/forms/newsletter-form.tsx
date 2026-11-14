"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { newsletterSchema } from "@double-growth/validators";
import { ApiError, postJson } from "@/lib/api";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const parsed = newsletterSchema.safeParse({ email });

    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    setStatus("sending");

    try {
      await postJson("/api/v1/newsletter", parsed.data);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("idle");
      setMessage(
        error instanceof ApiError
          ? error.message
          : "The subscription could not be completed. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
        />
        <p className="text-xs leading-5 text-white/70">
          You are on the list. We only send occasional product and service
          updates — no resold lists.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label
        htmlFor="newsletter-email"
        className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40"
      >
        Occasional updates
      </label>
      <div className="mt-2 flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35"
          />
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage(null);
            }}
            placeholder="you@business.com"
            aria-describedby={message ? "newsletter-message" : undefined}
            aria-invalid={Boolean(message)}
            className="w-full rounded-full border border-white/12 bg-white/[0.05] py-2.5 pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-cyan/60"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          aria-label="Subscribe to updates"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-navy transition-colors hover:bg-cyan disabled:opacity-60"
        >
          {status === "sending" ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>
      {message ? (
        <p
          id="newsletter-message"
          role="alert"
          className="mt-2 text-xs leading-5 text-amber-300"
        >
          {message}
        </p>
      ) : (
        <p className="mt-2 text-[0.68rem] leading-4 text-white/35">
          By subscribing you agree to the{" "}
          <a href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </a>
          . Unsubscribe at any time.
        </p>
      )}
    </form>
  );
}
