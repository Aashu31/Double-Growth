function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const brand = {
  navy: "#0B1020",
  electric: "#2563EB",
  mist: "#F8FAFC",
  slate: "#52627A",
} as const;

function layout({
  heading,
  intro,
  body,
  footer,
}: {
  heading: string;
  intro: string;
  body: string;
  footer?: string;
}): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:${brand.mist};font-family:Arial,Helvetica,sans-serif;color:${brand.navy};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.mist};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #E2E8F0;">
            <tr>
              <td style="background:${brand.navy};padding:22px 28px;">
                <p style="margin:0;font-size:15px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;">Double Growth</p>
                <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#7AA2FF;">Build Digital. Grow Business.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px 8px;">
                <h1 style="margin:0;font-size:22px;line-height:1.3;color:${brand.navy};">${heading}</h1>
                <p style="margin:12px 0 0;font-size:14px;line-height:1.7;color:${brand.slate};">${intro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 28px;font-size:14px;line-height:1.7;color:${brand.slate};">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:${brand.mist};border-top:1px solid #E2E8F0;font-size:11px;line-height:1.6;color:#7B8798;">
                ${footer ?? "Double Growth · doublegrowth.in · This message was sent because you contacted us or subscribed to updates."}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

export function leadAcknowledgementEmail(input: {
  name: string;
  reference: string;
  serviceName: string;
}): EmailContent {
  const name = escapeHtml(input.name);
  return {
    subject: "We received your enquiry — Double Growth",
    html: layout({
      heading: `Thanks, ${name}.`,
      intro:
        "Your enquiry has reached the Double Growth team. We review project context before replying, so the next message should be specific rather than a generic brochure.",
      body: `<p style="margin:0 0 10px;"><strong>Reference:</strong> ${escapeHtml(input.reference)}</p>
        <p style="margin:0 0 10px;"><strong>Service:</strong> ${escapeHtml(input.serviceName)}</p>
        <p style="margin:0;">If you need to add context, reply to this email with the reference above. We will not ask for payment before a written scope is agreed.</p>`,
    }),
    text: `Thanks, ${input.name}. Your enquiry has reached Double Growth. Reference: ${input.reference}. Service: ${input.serviceName}. We will review the project context before replying.`,
  };
}

export function leadInternalEmail(input: {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  serviceName: string;
  budget?: string;
  description: string;
  preferredContact?: string;
  reference: string;
}): EmailContent {
  return {
    subject: `New enquiry · ${input.serviceName} · ${input.reference}`,
    html: layout({
      heading: "New project enquiry",
      intro: "A visitor submitted the enquiry form. Reply through a verified channel.",
      body: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;line-height:1.8;">
        <tr><td style="color:#7B8798;width:120px;">Reference</td><td>${escapeHtml(input.reference)}</td></tr>
        <tr><td style="color:#7B8798;">Name</td><td>${escapeHtml(input.name)}</td></tr>
        <tr><td style="color:#7B8798;">Email</td><td>${escapeHtml(input.email)}</td></tr>
        <tr><td style="color:#7B8798;">Phone</td><td>${escapeHtml(input.phone)}</td></tr>
        <tr><td style="color:#7B8798;">Business</td><td>${escapeHtml(input.businessName ?? "Not provided")}</td></tr>
        <tr><td style="color:#7B8798;">Service</td><td>${escapeHtml(input.serviceName)}</td></tr>
        <tr><td style="color:#7B8798;">Budget</td><td>${escapeHtml(input.budget ?? "Not provided")}</td></tr>
        <tr><td style="color:#7B8798;">Preferred</td><td>${escapeHtml(input.preferredContact ?? "Not provided")}</td></tr>
      </table>
      <p style="margin:16px 0 6px;font-weight:700;">Project details</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(input.description)}</p>`,
    }),
    text: `New enquiry ${input.reference}\n${input.name} · ${input.email} · ${input.phone}\nService: ${input.serviceName}\nBusiness: ${input.businessName ?? "Not provided"}\n\n${input.description}`,
  };
}

export function orderConfirmationEmail(input: {
  name: string;
  orderNumber: string;
  packageName: string;
  amount: string;
  paymentEnabled: boolean;
}): EmailContent {
  return {
    subject: `Order received · ${input.orderNumber}`,
    html: layout({
      heading: "Your order is recorded.",
      intro: input.paymentEnabled
        ? "Your order has been created and is awaiting payment confirmation from the provider. A browser redirect alone is never treated as proof of payment."
        : "Your order has been recorded as pending. Online payment is not enabled on this environment yet, so no money has been collected through this website.",
      body: `<p style="margin:0 0 8px;"><strong>Order:</strong> ${escapeHtml(input.orderNumber)}</p>
        <p style="margin:0 0 8px;"><strong>Package:</strong> ${escapeHtml(input.packageName)}</p>
        <p style="margin:0;"><strong>Amount:</strong> ${escapeHtml(input.amount)}</p>`,
      footer:
        "Double Growth · Order confirmation is not a receipt. Payment is confirmed only after server-side verification.",
    }),
    text: `Order ${input.orderNumber} recorded. Package: ${input.packageName}. Amount: ${input.amount}. ${input.paymentEnabled ? "Awaiting provider confirmation." : "Online payment is not enabled; no money was collected."}`,
  };
}

export function paymentStatusEmail(input: {
  name: string;
  orderNumber: string;
  status: "paid" | "failed" | "refunded";
  amount: string;
}): EmailContent {
  const copy = {
    paid: {
      subject: `Payment confirmed · ${input.orderNumber}`,
      heading: "Payment confirmed.",
      intro:
        "The provider confirmed your payment on our server. The order is now marked as paid.",
    },
    failed: {
      subject: `Payment unsuccessful · ${input.orderNumber}`,
      heading: "Payment was not completed.",
      intro:
        "The provider reported that the payment did not complete. The order has not been marked as paid and no service has been activated on the basis of this event.",
    },
    refunded: {
      subject: `Refund recorded · ${input.orderNumber}`,
      heading: "Refund recorded.",
      intro:
        "The provider confirmed a refund for this order. Bank processing times may vary.",
    },
  }[input.status];

  return {
    subject: copy.subject,
    html: layout({
      heading: copy.heading,
      intro: copy.intro,
      body: `<p style="margin:0 0 8px;"><strong>Order:</strong> ${escapeHtml(input.orderNumber)}</p>
        <p style="margin:0;"><strong>Amount:</strong> ${escapeHtml(input.amount)}</p>`,
    }),
    text: `${copy.heading} Order: ${input.orderNumber}. Amount: ${input.amount}.`,
  };
}

export function newsletterWelcomeEmail(): EmailContent {
  return {
    subject: "You are subscribed — Double Growth",
    html: layout({
      heading: "You are on the list.",
      intro:
        "Occasional Double Growth updates: new services, platform modules and practical notes on building digital operations. No resold lists and no daily marketing.",
      body: `<p style="margin:0;">You can unsubscribe at any time by replying to this message.</p>`,
    }),
    text: "You are subscribed to occasional Double Growth updates. Unsubscribe any time by replying to this message.",
  };
}
