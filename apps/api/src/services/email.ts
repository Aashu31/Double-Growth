import type { AppConfig } from "../config.js";
import type { EmailContent } from "./email-templates.js";

export type EmailStatus = "sent" | "failed" | "skipped";

export interface EmailResult {
  status: EmailStatus;
  provider: string | null;
  error?: string;
}

export interface EmailService {
  readonly configured: boolean;
  readonly provider: string | null;
  send(input: {
    to: string;
    content: EmailContent;
    replyTo?: string | null;
  }): Promise<EmailResult>;
}

interface ResendResponse {
  id?: string;
  message?: string;
  name?: string;
}

/**
 * Configurable transactional email adapter.
 *
 * The provider is selected entirely through environment variables. When no
 * provider is configured every send resolves as "skipped" — the site never
 * pretends a message was delivered.
 */
export function createEmailService(config: AppConfig): EmailService {
  const { provider, apiKey, from, replyTo } = config.email;
  const configured = Boolean(provider === "resend" && apiKey && from);

  return {
    configured,
    provider: configured ? "resend" : null,

    async send({ to, content, replyTo: messageReplyTo }) {
      if (!configured || !apiKey || !from) {
        return { status: "skipped", provider: null };
      }

      let response: Response;

      try {
        response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from,
            to: [to],
            subject: content.subject,
            html: content.html,
            text: content.text,
            ...(messageReplyTo ?? replyTo
              ? { reply_to: messageReplyTo ?? replyTo }
              : {}),
          }),
          signal: AbortSignal.timeout(15_000),
        });
      } catch {
        return {
          status: "failed",
          provider,
          error: "The email provider could not be reached.",
        };
      }

      const payload = (await response
        .json()
        .catch(() => null)) as ResendResponse | null;

      if (!response.ok) {
        return {
          status: "failed",
          provider,
          error:
            payload?.message ??
            `The email provider rejected the message (HTTP ${response.status}).`,
        };
      }

      return { status: "sent", provider };
    },
  };
}
