import type { SitepingStore } from "@siteping/adapter-prisma";

/**
 * Выбор хранилища.
 *
 * - по умолчанию — PostgreSQL через Prisma (продакшен на Vercel);
 * - SITEPING_STORE=memory — хранилище в памяти процесса: для локального
 *   превью без базы. Данные пропадают при перезапуске!
 */
export async function createStore(): Promise<SitepingStore> {
  if (process.env.SITEPING_STORE === "memory") {
    const { MemoryStore } = await import("@siteping/adapter-memory");
    console.warn("[siteping] SITEPING_STORE=memory — пометки НЕ сохраняются между перезапусками");
    return new MemoryStore();
  }
  const { PrismaStore } = await import("@siteping/adapter-prisma");
  const { prisma } = await import("./prisma");
  return new PrismaStore(prisma);
}
