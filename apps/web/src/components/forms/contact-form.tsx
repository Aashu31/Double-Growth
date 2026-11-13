"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { leadSchema } from "@double-growth/validators";
import { BUDGET_RANGES, SERVICES } from "@double-growth/shared";
import { ApiError, postJson } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const budgetLabels: Record<string, string> = {
  "under-25000": "Under ₹25,000",
  "25000-50000": "₹25,000 – ₹50,000",
  "50000-100000": "₹50,000 – ₹1,00,000",
  "100000-300000": "₹1,00,000 – ₹3,00,000",
  "300000-plus": "₹3,00,000+",
  "not-sure": "Not sure yet",
};

type FieldErrors = Record<string, string>;

const initialValues = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  service: "",
  budget: "",
  description: "",
  preferredContact: "email",
  consent: false,
  website: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-cloud bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/50 focus:border-electric";

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [reference, setReference] = useState<string | null>(null);

  function update<K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = leadSchema.safeParse({
      ...values,
      businessName: values.businessName || undefined,
      budget: values.budget || undefined,
    });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setFormError("Please correct the highlighted fields.");
      return;
    }

    setStatus("sending");
    try {
      const response = await postJson<{
        data: { id: string; receivedAt: string };
      }>("/api/v1/leads", parsed.data);

      setReference(response.data.id);
      setStatus("success");
      setValues(initialValues);
    } catch (error) {
      setStatus("idle");
      if (error instanceof ApiError) {
        if (error.fields) setErrors(error.fields);
        setFormError(
          error.code === "DATABASE_NOT_CONFIGURED"
            ? "The enquiry service is not configured on this environment yet, so your message was not sent. No data was stored."
            : error.message,
        );
      } else {
        setFormError(
          "Something went wrong while sending your enquiry. Nothing was stored.",
        );
      }
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
        <CheckCircle2
          aria-hidden="true"
          className="h-10 w-10 text-emerald-600"
        />
        <h2 className="mt-4 text-2xl font-semibold text-ink">
          Your enquiry has been received.
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate">
          Reference: <span className="font-semibold text-ink">{reference}</span>
          . The team will review your project details and respond using your
          preferred contact method.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReference(null);
          }}
          className="mt-6 text-sm font-semibold text-electric"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            Full name <span className="text-electric">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(inputClass, errors.name && "border-red-400")}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-business"
            className="text-sm font-medium text-ink"
          >
            Business name
          </label>
          <input
            id="contact-business"
            name="businessName"
            autoComplete="organization"
            value={values.businessName}
            onChange={(event) => update("businessName", event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            Email <span className="text-electric">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(inputClass, errors.email && "border-red-400")}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-ink">
            Phone <span className="text-electric">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={cn(inputClass, errors.phone && "border-red-400")}
          />
          {errors.phone ? (
            <p id="contact-phone-error" className="mt-1.5 text-xs text-red-600">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="text-sm font-medium text-ink"
          >
            Service required <span className="text-electric">*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "contact-service-error" : undefined}
            className={cn(inputClass, errors.service && "border-red-400")}
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p
              id="contact-service-error"
              className="mt-1.5 text-xs text-red-600"
            >
              {errors.service}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-budget" className="text-sm font-medium text-ink">
            Project budget
          </label>
          <select
            id="contact-budget"
            name="budget"
            value={values.budget}
            onChange={(event) => update("budget", event.target.value)}
            className={inputClass}
          >
            <option value="">Select a range</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {budgetLabels[range]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-description"
          className="text-sm font-medium text-ink"
        >
          Project description <span className="text-electric">*</span>
        </label>
        <textarea
          id="contact-description"
          name="description"
          rows={5}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "contact-description-error" : "contact-description-hint"
          }
          placeholder="What are you building, what should it achieve, and is there an existing site?"
          className={cn(inputClass, errors.description && "border-red-400")}
        />
        <p id="contact-description-hint" className="mt-1.5 text-xs text-slate">
          Minimum 20 characters. Specific context helps us respond usefully.
        </p>
        {errors.description ? (
          <p
            id="contact-description-error"
            className="mt-1.5 text-xs text-red-600"
          >
            {errors.description}
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          Preferred contact method
        </legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {(["email", "phone", "whatsapp"] as const).map((method) => (
            <label
              key={method}
              className="inline-flex items-center gap-2 text-sm capitalize text-slate"
            >
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={values.preferredContact === method}
                onChange={() => update("preferredContact", method)}
                className="h-4 w-4 accent-[#2F6BFF]"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="rounded-2xl border border-cloud bg-mist p-4">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#2F6BFF]"
          />
          <span>
            I consent to Double Growth using the details above to respond to
            this enquiry, as described in the{" "}
            <a href="/privacy" className="font-semibold text-electric">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-1.5 text-xs text-red-600">{errors.consent}</p>
        ) : null}
      </div>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      {formError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{formError}</p>
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Sending enquiry
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>

      <p className="text-xs leading-5 text-slate">
        We use these details only to respond to your enquiry. Required fields
        are marked with an asterisk.
      </p>
    </form>
  );
}
