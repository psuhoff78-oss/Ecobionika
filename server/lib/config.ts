/** Общие настройки сервера SitePing для сайта Экобионика. */

export const PROJECT_NAME = process.env.SITEPING_PROJECT ?? "ecobionika";

/** Ключ администратора: нужен для смены статуса и удаления (PATCH/DELETE). */
export const API_KEY = process.env.SITEPING_API_KEY ?? "";

/** Откуда разрешено обращаться к API (CORS). */
export const ALLOWED_ORIGINS = (
  process.env.SITEPING_ALLOWED_ORIGINS ??
  "https://psuhoff78-oss.github.io,http://localhost:8000,http://127.0.0.1:8000"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
