const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:4000";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    code: string,
    fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    fields?: Record<string, string>;
  };
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    throw new ApiError(
      "The service is unreachable right now. Please try again shortly.",
      0,
      "NETWORK_ERROR",
    );
  }

  const payload = (await response.json().catch(() => ({}))) as
    | T
    | ApiErrorBody;

  if (!response.ok) {
    const body = payload as ApiErrorBody;
    throw new ApiError(
      body.error?.message ??
        "The request could not be completed. Please try again.",
      response.status,
      body.error?.code ?? "REQUEST_FAILED",
      body.error?.fields,
    );
  }

  return payload as T;
}

export function postJson<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function getJson<T>(path: string): Promise<T> {
  return request<T>(path, { method: "GET" });
}
