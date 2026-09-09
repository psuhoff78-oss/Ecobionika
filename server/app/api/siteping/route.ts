import { createSitepingHandler, type SitepingHandler, type WebhookConfig } from "@siteping/adapter-prisma";
import { API_KEY, ALLOWED_ORIGINS } from "@/lib/config";
import { createStore } from "@/lib/store";
import { telegramWebhook } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function buildWebhooks(): WebhookConfig[] {
  const webhooks: WebhookConfig[] = [];
  if (process.env.SLACK_WEBHOOK_URL) {
    webhooks.push({ url: process.env.SLACK_WEBHOOK_URL, type: "slack" });
  }
  if (process.env.DISCORD_WEBHOOK_URL) {
    webhooks.push({ url: process.env.DISCORD_WEBHOOK_URL, type: "discord" });
  }
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    // Telegram не принимает «сырые» вебхуки SitePing — прокидываем через
    // наш маршрут /api/notify/telegram, который форматирует сообщение.
    webhooks.push(telegramWebhook());
  }
  return webhooks;
}

let handlerPromise: Promise<SitepingHandler> | undefined;

function getHandler(): Promise<SitepingHandler> {
  handlerPromise ??= createStore().then((store) => {
    const webhooks = buildWebhooks();
    return createSitepingHandler({
      store,
      apiKey: API_KEY || undefined,
      // GET публичный: виджет на сайте показывает пометки всем без ключа.
      // POST публичный: любой посетитель может оставить пометку.
      // PATCH/DELETE — только с ключом администратора (панель /inbox).
      publicEndpoints: ["GET", "POST", "OPTIONS"],
      allowedOrigins: ALLOWED_ORIGINS,
      webhooks: webhooks.length ? webhooks : undefined,
    });
  });
  return handlerPromise;
}

export async function GET(req: Request) {
  return (await getHandler()).GET(req);
}
export async function POST(req: Request) {
  return (await getHandler()).POST(req);
}
export async function PATCH(req: Request) {
  return (await getHandler()).PATCH(req);
}
export async function DELETE(req: Request) {
  return (await getHandler()).DELETE(req);
}
export async function OPTIONS(req: Request) {
  return (await getHandler()).OPTIONS(req);
}
