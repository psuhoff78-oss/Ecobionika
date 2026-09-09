/**
 * SitePing — виджет обратной связи для правок по сайту.
 * https://siteping.dev/  (MIT, self-hosted)
 *
 * Все пометки, их статусы и комментарии хранятся на общем сервере
 * (папка /server этого репозитория, развёрнута на Vercel) и видны
 * всем, у кого открыт сайт. Панель администратора: <SERVER>/inbox
 */

/**
 * Адрес API сервера SitePing.
 * После деплоя на Vercel впишите сюда свой адрес, например:
 *   "https://ecobionika-siteping.vercel.app/api/siteping"
 * Пока не задан — виджет работает локально (localStorage, пометки видны
 * только вам), чтобы сайт не ломался.
 */
const SITEPING_ENDPOINT = "https://ecobionika.vercel.app/api/siteping";
const SITEPING_DISABLED = true;

const common = {
  projectName: "ecobionika", // должно совпадать с SITEPING_PROJECT на сервере

  // GitHub Pages — это «продакшен» с точки зрения виджета, без этого флага
  // кнопка не появится. Заодно снимает ограничение по ширине экрана.
  forceShow: true,

  locale: "ru",
  theme: "auto",
  position: "bottom-right",
  accentColor: "#138537", // фирменный зелёный сайта

  enableScreenshot: true,          // прикладывать скриншот выделенной области
  enableRightClickComment: true,   // правый клик → сразу комментарий
  captureDiagnostics: true,        // ошибки консоли / неудачные запросы
  deepLink: true,                  // ?siteping=<id> в URL подсвечивает пометку (ссылки из инбокса/Telegram)

  onSkip: (reason) => console.warn("[siteping] skipped:", reason),
  onError: (err) => console.error("[siteping] error:", err?.code, err?.message),
};

async function boot() {
  if (!window.SitePing || typeof window.SitePing.initSiteping !== "function") {
    console.error("[siteping] siteping-widget.global.js не загрузился");
    return;
  }
  if (SITEPING_DISABLED) return;
  let config;
  if (SITEPING_ENDPOINT) {
    config = { ...common, endpoint: SITEPING_ENDPOINT };
  } else {
    const { LocalStorageStore } = await import("./siteping-adapter-localstorage.js");
    console.warn("[siteping] SITEPING_ENDPOINT не задан — пометки сохраняются только в этом браузере");
    config = { ...common, store: new LocalStorageStore({ key: "ecobionika_siteping_feedbacks" }) };
  }

  window.siteping = window.SitePing.initSiteping(config);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
