import { Prisma, PrismaClient } from "@prisma/client";

export * from "@prisma/client";
export { Prisma };

let client: PrismaClient | undefined;

/**
 * Returns a process-wide Prisma client. The caller is responsible for deciding
 * whether a database is configured at all — this function never falls back to
 * an in-memory store.
 */
export function getPrismaClient(): PrismaClient {
  if (!client) {
    client = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["warn", "error"]
          : ["error"],
    });
  }

  return client;
}

export async function disconnectPrisma(): Promise<void> {
  if (client) {
    await client.$disconnect();
    client = undefined;
  }
}

export function isPrismaKnownError(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export function isPrismaConnectionError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  if (error instanceof Prisma.PrismaClientRustPanicError) return true;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return ["P1001", "P1002", "P1008", "P1017"].includes(error.code);
  }
  return false;
}
