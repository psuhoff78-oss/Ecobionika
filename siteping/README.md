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

## Где хранятся пометки

Виджет работает в двух режимах — переключается константой `SITEPING_ENDPOINT` в `init.js`:

| Режим | Когда | Кто видит пометки |
|---|---|---|
| **Сервер** (`SITEPING_ENDPOINT = "https://…/api/siteping"`) | основной — после развёртывания папки `/server` на Vercel | **все**, у кого открыт сайт; статусы меняются из инбокса `/inbox`; уведомления в Telegram/Slack |
| **localStorage** (`SITEPING_ENDPOINT = ""`) | запасной, пока сервер не развёрнут | только автор, только в своём браузере |

Инструкция по развёртыванию сервера — в [`server/README.md`](../server/README.md).

## Настройки (`init.js`)

- `forceShow: true` — обязательно: без него виджет считает сайт «продакшеном» и не показывается.
- `locale: "ru"`, `accentColor: "#138537"`, `theme: "auto"`, `position: "bottom-right"`.
- `enableScreenshot`, `enableRightClickComment`, `captureDiagnostics`, `deepLink` — можно отключить, поставив `false`.

## Как убрать виджет перед сдачей сайта

Удалить две строки `<script ... siteping/...>` из `index.html` (и при желании — саму папку `siteping/`).
