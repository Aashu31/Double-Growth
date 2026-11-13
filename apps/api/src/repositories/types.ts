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
}

export interface LeadRepository {
  create(input: LeadInput): Promise<LeadRecord>;
}

export interface OrderRepository {
  create(input: OrderInput, amountMinor: number, currency: string): Promise<OrderRecord>;
  findByNumber(orderNumber: string, email: string): Promise<OrderRecord | null>;
  applyPaymentEvent(event: PaymentEventInput): Promise<WebhookResult>;
}

export interface Repositories {
  leads: LeadRepository;
  orders: OrderRepository;
}

export interface ChatProvider {
  readonly configured: boolean;
  reply(input: {
    message: string;
    history: { role: "user" | "assistant"; content: string }[];
  }): Promise<string>;
}
