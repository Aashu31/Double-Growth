import type { AppConfig } from "../config.js";
import { AppError } from "../errors.js";
import { PACKAGES, SERVICES } from "@double-growth/shared";
import type { ChatProvider } from "../repositories/types.js";

const systemPrompt = [
  "You are the Double Growth website assistant.",
  "Double Growth is a two-founder digital solutions agency: Build Digital. Grow Business.",
  "Answer only from the approved information below. Never invent clients, projects, testimonials, statistics, prices, contact details, delivery dates or legal guarantees.",
  "If the answer is not covered, say so plainly and direct the visitor to the contact page.",
  "Keep answers short (under 120 words), specific and free of marketing exaggeration.",
  "The annual package costs the published amount below. It does not include unlimited development, unlimited hosting or unlimited support. Third-party costs are billed separately.",
  "Never claim a payment has been received. Payment is confirmed only after server-side verification.",
  "",
  "Approved services:",
  ...SERVICES.map((service) => `- ${service.name}: ${service.summary}`),
  "",
  "Approved package:",
  ...PACKAGES.map(
    (item) => `- ${item.name}: INR ${item.priceMinor / 100} per ${item.billingPeriod}. ${item.summary}`,
  ),
  "",
  "Policy facts:",
  "- Domains, paid hosting, payment gateway fees and paid AI usage are third-party costs, billed separately.",
  "- Source code ownership transfers on full payment under the Ownership and Source Code Policy, subject to third-party licences.",
  "- Maintenance covers updates, fixes and small changes within a published scope. It is not unlimited support.",
  "- Online payment is enabled only after a provider is configured. Orders are recorded first and verified on the server.",
  "- Contact, phone and business address details are pending verification and must not be guessed. Direct visitors to the contact page.",
].join("\n");

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[];
}

export function createChatProvider(config: AppConfig): ChatProvider {
  const { baseUrl, model, apiKey, provider } = config.ai;

  const configured = Boolean(baseUrl && model && apiKey && provider);

  return {
    configured,

    async reply({ message, history }) {
      if (!configured || !baseUrl || !model || !apiKey) {
        throw new AppError(
          503,
          "AI_NOT_CONFIGURED",
          "The assistant is not available because no AI provider is configured on this environment.",
        );
      }

      const endpoint = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

      let response: Response;

      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            temperature: 0.3,
            max_tokens: 400,
            messages: [
              { role: "system", content: systemPrompt },
              ...history.slice(-12),
              { role: "user", content: message },
            ],
          }),
          signal: AbortSignal.timeout(20_000),
        });
      } catch {
        throw new AppError(
          502,
          "AI_PROVIDER_ERROR",
          "The assistant could not be reached. Please use the contact page instead.",
        );
      }

      if (!response.ok) {
        throw new AppError(
          502,
          "AI_PROVIDER_ERROR",
          "The assistant could not answer right now. Please use the contact page instead.",
        );
      }

      const payload = (await response
        .json()
        .catch(() => null)) as ChatCompletionResponse | null;

      const content = payload?.choices?.[0]?.message?.content?.trim();

      if (!content) {
        throw new AppError(
          502,
          "AI_PROVIDER_ERROR",
          "The assistant returned an empty response. Please use the contact page instead.",
        );
      }

      return content;
    },
  };
}
