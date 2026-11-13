"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { orderSchema } from "@double-growth/validators";
import { ApiError, getJson, postJson } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface OrderResult {
  orderNumber: string;
  amountMinor: number;
  currency: string;
  status: string;
  payment: {
    enabled: boolean;
    checkoutUrl: string | null;
    message: string;
  };
}

const inputClass =
  "mt-2 w-full rounded-xl border border-cloud bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/50 focus:border-electric";

type FieldErrors = Record<string, string>;

export function CheckoutForm({
  packageId,
  packageName,
  priceMinor,
}: {
  packageId: string;
  packageName: string;
  priceMinor: number;
}) {
  const [values, setValues] = useState({
    customerName: "",
    email: "",
    phone: "",
    businessName: "",
    gstin: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  function update<K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = orderSchema.safeParse({
      ...values,
      packageId,
      businessName: values.businessName || undefined,
      gstin: values.gstin || undefined,
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

    setSubmitting(true);
    try {
      const response = await postJson<{ data: OrderResult }>(
        "/api/v1/orders",
        parsed.data,
      );
      setOrder(response.data);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.fields) setErrors(error.fields);
        setFormError(
          error.code === "DATABASE_NOT_CONFIGURED"
            ? "Order creation is not configured on this environment yet. No order was recorded and no payment was taken."
            : error.message,
        );
      } else {
        setFormError("The order could not be created. No payment was taken.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function refreshStatus() {
    if (!order) return;
    setRefreshing(true);
    setFormError(null);
    try {
      const response = await getJson<{
        data: { orderNumber: string; status: string };
      }>(
        `/api/v1/orders/${encodeURIComponent(order.orderNumber)}?email=${encodeURIComponent(values.email)}`,
      );
      setOrder((current) =>
        current ? { ...current, status: response.data.status } : current,
      );
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "The order status could not be refreshed.",
      );
    } finally {
      setRefreshing(false);
    }
  }

  if (order) {
    return (
      <div className="rounded-3xl border border-cloud bg-white p-6 shadow-soft sm:p-8">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-emerald-600" />
        <h2 className="mt-4 text-2xl font-semibold text-ink">
          Order recorded — payment pending.
        </h2>
        <dl className="mt-6 grid gap-4 border-y border-cloud py-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-slate">
              Order number
            </dt>
            <dd className="mt-1 font-mono text-sm font-semibold text-ink">
              {order.orderNumber}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-slate">
              Amount
            </dt>
            <dd className="mt-1 text-sm font-semibold text-ink">
              {formatInr(order.amountMinor)} {order.currency}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-slate">
              Package
            </dt>
            <dd className="mt-1 text-sm text-ink">{packageName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-slate">
              Status
            </dt>
            <dd className="mt-1">
              <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                {order.status.replaceAll("_", " ")}
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <p className="font-semibold">Online payment is not enabled yet.</p>
          <p className="mt-1">{order.payment.message}</p>
        </div>

        {order.payment.checkoutUrl ? (
          <a
            href={order.payment.checkoutUrl}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white"
          >
            Continue to secure payment
          </a>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={refreshStatus} variant="secondary" disabled={refreshing}>
            {refreshing ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
            )}
            Refresh payment status
          </Button>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-cloud px-5 py-3 text-sm font-semibold text-ink"
          >
            Contact the team
          </a>
        </div>

        {formError ? (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {formError}
          </p>
        ) : null}

        <p className="mt-6 text-xs leading-5 text-slate">
          Keep your order number for reference. No payment is marked complete
          until the provider webhook is verified on the server.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="order-name" className="text-sm font-medium text-ink">
            Full name <span className="text-electric">*</span>
          </label>
          <input
            id="order-name"
            autoComplete="name"
            value={values.customerName}
            onChange={(event) => update("customerName", event.target.value)}
            aria-invalid={Boolean(errors.customerName)}
            className={cn(inputClass, errors.customerName && "border-red-400")}
          />
          {errors.customerName ? (
            <p className="mt-1.5 text-xs text-red-600">{errors.customerName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="order-email" className="text-sm font-medium text-ink">
            Email <span className="text-electric">*</span>
          </label>
          <input
            id="order-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={cn(inputClass, errors.email && "border-red-400")}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="order-phone" className="text-sm font-medium text-ink">
            Phone <span className="text-electric">*</span>
          </label>
          <input
            id="order-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className={cn(inputClass, errors.phone && "border-red-400")}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="order-business" className="text-sm font-medium text-ink">
            Business name
          </label>
          <input
            id="order-business"
            autoComplete="organization"
            value={values.businessName}
            onChange={(event) => update("businessName", event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="order-gstin" className="text-sm font-medium text-ink">
            GSTIN (optional)
          </label>
          <input
            id="order-gstin"
            value={values.gstin}
            onChange={(event) => update("gstin", event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-cloud bg-mist p-4">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#2F6BFF]"
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="font-semibold text-electric">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/refund-policy" className="font-semibold text-electric">
              Refund Policy
            </a>
            , and consent to the processing described in the{" "}
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
        <label htmlFor="order-website">Website</label>
        <input
          id="order-website"
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

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Creating order
          </>
        ) : (
          `Place order — ${formatInr(priceMinor)}`
        )}
      </Button>

      <p className="text-xs leading-5 text-slate">
        Placing an order records your details and package selection. It does not
        charge you. Payment is completed only through a configured provider and
        verified on the server.
      </p>
    </form>
  );
}
