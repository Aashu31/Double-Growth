import type { AppDependencies } from "../app.js";
import type { EmailContent } from "./email-templates.js";
import type { EmailResult } from "./email.js";
import type { NotificationType } from "../repositories/types.js";

/**
 * Sends a transactional message and records the attempt.
 *
 * Deliberately never throws: an email outage must not turn a successfully
 * stored lead, order or subscription into a failed request. The result is
 * returned so the caller can log the real delivery state.
 */
export async function deliverNotification(
  deps: AppDependencies,
  input: {
    type: NotificationType;
    to: string;
    content: EmailContent;
    leadId?: string;
    orderId?: string;
  },
): Promise<EmailResult> {
  const result = await deps.email.send({
    to: input.to,
    content: input.content,
  });

  if (deps.repositories) {
    try {
      await deps.repositories.notifications.create({
        type: input.type,
        recipient: input.to,
        subject: input.content.subject,
        status: result.status,
        provider: result.provider,
        error: result.error,
        leadId: input.leadId,
        orderId: input.orderId,
      });
    } catch {
      // Telemetry must not fail the business operation.
    }
  }

  return result;
}
