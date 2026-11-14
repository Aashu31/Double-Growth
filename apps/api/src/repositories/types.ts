import type { LeadInput, OrderInput } from "@double-growth/validators";

export interface LeadRecord {
  id: string;
  createdAt: Date;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  amountMinor: number;
  currency: string;
  status: string;
  createdAt: Date;
  paidAt: Date | null;
}

export interface PaymentEventInput {
  orderNumber: string;
  provider: "UPI" | "PAYPAL";
  eventId: string;
  status: "paid" | "failed" | "refunded";
  amountMinor?: number;
  currency?: string;
  payload: Record<string, unknown>;
}

export interface WebhookResult {
  orderNumber: string;
  status: string;
  duplicate: boolean;
  email: string;
  customerName: string;
  amountMinor: number;
  currency: string;
}

export interface LeadRepository {
  create(input: LeadInput): Promise<LeadRecord>;
}

export interface OrderRepository {
  create(input: OrderInput, amountMinor: number, currency: string): Promise<OrderRecord>;
  findByNumber(orderNumber: string, email: string): Promise<OrderRecord | null>;
  applyPaymentEvent(event: PaymentEventInput): Promise<WebhookResult>;
}

export interface NewsletterRecord {
  id: string;
  email: string;
  createdAt: Date;
  duplicate: boolean;
}

export const NOTIFICATION_TYPES = [
  "LEAD_ACKNOWLEDGEMENT",
  "LEAD_INTERNAL",
  "ORDER_CONFIRMATION",
  "PAYMENT_CONFIRMATION",
  "PAYMENT_FAILURE",
  "NEWSLETTER_WELCOME",
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export interface NotificationInput {
  type: NotificationType;
  recipient: string;
  subject: string;
  status: "sent" | "failed" | "skipped";
  provider: string | null;
  error?: string;
  leadId?: string;
  orderId?: string;
}

export interface NewsletterRepository {
  subscribe(email: string, source: string): Promise<NewsletterRecord>;
}

export interface NotificationRepository {
  create(input: NotificationInput): Promise<void>;
}

export interface ChatRepository {
  saveExchange(input: {
    userMessage: string;
    assistantMessage: string;
  }): Promise<void>;
}

export interface AiUsageRepository {
  consume(input: {
    period: string;
    promptChars: number;
    requestLimit: number;
  }): Promise<{ allowed: boolean; count: number }>;
}

export interface Repositories {
  leads: LeadRepository;
  orders: OrderRepository;
  newsletter: NewsletterRepository;
  notifications: NotificationRepository;
  chat: ChatRepository;
  aiUsage: AiUsageRepository;
}

export interface ChatProvider {
  readonly configured: boolean;
  reply(input: {
    message: string;
    history: { role: "user" | "assistant"; content: string }[];
  }): Promise<string>;
}
