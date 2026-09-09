# SitePing на сайте Экобионика

[SitePing](https://siteping.dev) — открытый (MIT) виджет для сбора правок прямо на странице:
клиент обводит участок, пишет комментарий, и замечание «приклеивается» к элементу.

## Что лежит в папке

| Файл | Откуда |
|---|---|
| `siteping-widget.global.js` | `@siteping/widget@0.10.8` → `dist/index.global.js` (IIFE-сборка, глобал `window.SitePing`) |
| `siteping-adapter-localstorage.js` | `@siteping/adapter-localstorage@0.5.4` → `dist/index.js` (ES-модуль) |
| `init.js` | наша инициализация (настройки виджета) |
| `LICENSE` | лицензия MIT от авторов SitePing |

Подключение — две строки перед `</body>` в `index.html`:

```html
<script src="siteping/siteping-widget.global.js" defer></script>
<script type="module" src="siteping/init.js"></script>
```

## Как этим пользоваться

1. Открыть https://psuhoff78-oss.github.io/Ecobionika/
2. Справа внизу — зелёная круглая кнопка. Нажать → «Создать пометку» → обвести область → написать комментарий.
   Или просто **правый клик** по любому элементу.
3. Кнопка также открывает панель со списком всех пометок (поиск, фильтры, экспорт CSV/JSON).

## Важное ограничение текущего режима

Сейчас включён режим **без сервера** (`LocalStorageStore`): GitHub Pages — статический хостинг,
бэкенда там нет. Пометки хранятся в `localStorage` браузера, то есть:

- каждый человек видит **только свои** пометки и только на **своём** устройстве;
- чтобы передать замечания разработчику — открыть панель → **Экспорт → JSON/CSV** и отправить файл.

Чтобы все пометки собирались в одном месте (общая инбокс-панель, вебхуки в Telegram/Slack и т.д.),
нужен небольшой Node.js-сервер с `@siteping/adapter-prisma` (Vercel/Railway/любой VPS), а в `init.js`
вместо `store:` указать `endpoint: "https://ваш-сервер/api/siteping"`. Инструкция: https://siteping.dev/docs/quickstart

## Настройки (`init.js`)

- `forceShow: true` — обязательно: без него виджет считает сайт «продакшеном» и не показывается.
- `locale: "ru"`, `accentColor: "#138537"`, `theme: "auto"`, `position: "bottom-right"`.
- `enableScreenshot`, `enableRightClickComment`, `captureDiagnostics` — можно отключить, поставив `false`.

## Как убрать виджет перед сдачей сайта

Удалить две строки `<script ... siteping/...>` из `index.html` (и при желании — саму папку `siteping/`).
