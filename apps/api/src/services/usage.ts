import type { Repositories } from "../repositories/types.js";

/**
 * Fallback counters used when no database is configured. They are per-process
 * only, so they are a guardrail rather than an accounting system. With a
 * database present the AiUsage table is the authoritative monthly counter.
 */
const memoryUsage = new Map<string, number>();

export function currentPeriod(now: Date = new Date()): string {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function consumeAiQuota(
  repositories: Repositories | null,
  requestLimit: number,
  promptChars: number,
  now: Date = new Date(),
): Promise<{ allowed: boolean; count: number; persisted: boolean }> {
  const period = currentPeriod(now);

  if (repositories) {
    const result = await repositories.aiUsage.consume({
      period,
      promptChars,
      requestLimit,
    });
    return { ...result, persisted: true };
  }

  const count = (memoryUsage.get(period) ?? 0) + 1;
  memoryUsage.set(period, count);

  return { allowed: count <= requestLimit, count, persisted: false };
}

export function resetInMemoryUsage(): void {
  memoryUsage.clear();
}
