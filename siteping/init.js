/**
 * SitePing — виджет обратной связи для правок по сайту.
 * https://siteping.dev/  (MIT, self-hosted)
 *
 * Режим "без сервера": замечания хранятся в localStorage браузера,
 * то есть каждый рецензент видит только свои пометки на своей машине.
 * Чтобы собирать замечания централизованно, нужен бэкенд
 * (@siteping/adapter-prisma) — см. README в этой папке.
 */
import { LocalStorageStore } from "./siteping-adapter-localstorage.js";

function boot() {
  if (!window.SitePing || typeof window.SitePing.initSiteping !== "function") {
    console.error("[siteping] siteping-widget.global.js не загрузился");
    return;
  }

  window.siteping = window.SitePing.initSiteping({
    store: new LocalStorageStore({ key: "ecobionika_siteping_feedbacks" }),
    projectName: "ecobionika",

    // GitHub Pages — это "продакшен" с точки зрения виджета, без этого флага
    // кнопка не появится. Заодно снимает ограничение по ширине экрана.
    forceShow: true,

    locale: "ru",
    theme: "auto",
    position: "bottom-right",
    accentColor: "#138537", // фирменный зелёный сайта

    enableScreenshot: true,          // прикладывать скриншот выделенной области
    enableRightClickComment: true,   // правый клик → сразу комментарий
    captureDiagnostics: true,        // ошибки консоли / неудачные запросы

    onSkip: (reason) => console.warn("[siteping] skipped:", reason),
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
