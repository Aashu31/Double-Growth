import { z } from "zod";

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "DATABASE_NOT_CONFIGURED"
  | "DATABASE_UNAVAILABLE"
  | "ORDER_NOT_FOUND"
  | "ORDER_CREATE_FAILED"
  | "ORDER_ALREADY_PAID"
  | "ORDER_NOT_PAYABLE"
  | "SERVICE_NOT_FOUND"
  | "PROJECT_NOT_FOUND"
  | "SOLUTION_NOT_FOUND"
  | "LEAD_CREATE_FAILED"
  | "AI_NOT_CONFIGURED"
  | "AI_PROVIDER_ERROR"
  | "AI_QUOTA_EXCEEDED"
  | "PAYMENTS_NOT_CONFIGURED"
  | "PAYMENT_VERIFICATION_FAILED"
  | "INVALID_SIGNATURE"
  | "AMOUNT_MISMATCH"
  | "SPAM_REJECTED"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: ErrorCode;
  readonly fields?: Record<string, string>;

  constructor(
    statusCode: number,
    code: ErrorCode,
    message: string,
    fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
  }
}

export function fieldErrorsFromZod(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fields[key]) fields[key] = issue.message;
  }

  return fields;
}

export function parseBody<T extends z.ZodType>(
  schema: T,
  body: unknown,
): z.infer<T> {
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    throw new AppError(
      400,
      "VALIDATION_ERROR",
      "Some fields need attention.",
      fieldErrorsFromZod(parsed.error),
    );
  }

  return parsed.data;
}
