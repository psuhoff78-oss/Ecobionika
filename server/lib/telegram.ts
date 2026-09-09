import type { WebhookConfig } from "@siteping/adapter-prisma";

/**
 * Описание вебхука, которое SitePing вызовет при каждой новой пометке.
 * Указывает на наш маршрут /api/notify/telegram (см. app/api/notify/telegram/route.ts).
 */
export function telegramWebhook(): WebhookConfig {
  const base =
    process.env.SITEPING_PUBLIC_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return {
    url: `${base}/api/notify/telegram`,
    type: "generic",
    headers: { "x-siteping-secret": process.env.TELEGRAM_BOT_TOKEN ?? "" },
    onError: (err, id) => console.error("[siteping] telegram webhook failed", id, err.message),
  };
}

const TYPE_LABEL: Record<string, string> = {
  bug: "🐞 Ошибка",
  change: "✏️ Правка",
  question: "❓ Вопрос",
  other: "💬 Другое",
};

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function formatTelegramMessage(f: {
  id: string;
  type: string;
  message: string;
  url: string;
  authorName: string;
  authorEmail?: string;
  projectName: string;
}, siteBase: string, inboxBase: string): string {
  const pageUrl = `${siteBase}${f.url}${f.url.includes("?") ? "&" : "?"}siteping=${encodeURIComponent(f.id)}`;
  const lines = [
    `<b>${TYPE_LABEL[f.type] ?? f.type}</b> — новая пометка на сайте <b>${escapeHtml(f.projectName)}</b>`,
    "",
    escapeHtml(f.message).slice(0, 3000),
    "",
    `👤 ${escapeHtml(f.authorName)}${f.authorEmail ? ` (${escapeHtml(f.authorEmail)})` : ""}`,
    `🔗 <a href="${pageUrl}">Открыть на странице</a> · <a href="${inboxBase}/inbox">Инбокс</a>`,
  ];
  return lines.join("\n");
}
