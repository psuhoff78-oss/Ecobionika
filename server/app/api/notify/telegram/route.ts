import { NextResponse } from "next/server";
import { formatTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

/**
 * Принимает generic-вебхук от SitePing и пересылает уведомление в Telegram.
 * Настройка: TELEGRAM_BOT_TOKEN (от @BotFather) и TELEGRAM_CHAT_ID (id чата/группы).
 */
export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ skipped: "telegram not configured" });

  // Защита от посторонних вызовов: заголовок должен совпадать с токеном бота.
  if (req.headers.get("x-siteping-secret") !== token) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const feedback = await req.json();
  const siteBase = process.env.SITE_BASE_URL ?? "https://psuhoff78-oss.github.io";
  const inboxBase =
    process.env.SITEPING_PUBLIC_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramMessage(feedback, siteBase, inboxBase),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    console.error("[telegram]", res.status, await res.text());
    return NextResponse.json({ error: "telegram error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
