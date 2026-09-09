# Сервер SitePing для сайта Экобионика

Небольшое Next.js-приложение, которое:

- принимает и хранит пометки с сайта в PostgreSQL (`/api/siteping`);
- показывает **инбокс** для разбора правок — статусы «открыто / в работе / решено / не будем делать», поиск, скриншоты, ссылка «открыть на странице» (`/inbox`);
- шлёт уведомления о каждой новой пометке в **Telegram**, Slack и/или Discord.

Все, у кого открыт сайт, видят одни и те же пометки и их статусы.

## Развёртывание на Vercel (бесплатно, ~10 минут)

### 1. Создать проект

1. Зайти на https://vercel.com → **Add New… → Project** → выбрать репозиторий `psuhoff78-oss/Ecobionika`.
2. В настройках импорта:
   - **Root Directory** → `server` (нажать *Edit* и выбрать папку)
   - Framework: Next.js (определится сам)
3. Пока **не** нажимать Deploy — сначала переменные.

### 2. База данных

В том же экране (или потом в **Storage** проекта) → **Create Database → Neon (Postgres)** → Create.
Vercel сам добавит переменную `DATABASE_URL` (Neon может назвать её `POSTGRES_PRISMA_URL` / `DATABASE_URL` — нужна именно `DATABASE_URL`; если её нет, скопируйте значение из `POSTGRES_PRISMA_URL`).

### 3. Переменные окружения (Environment Variables)

| Переменная | Значение |
|---|---|
| `DATABASE_URL` | появится из Neon (см. выше) |
| `SITEPING_API_KEY` | придумать длинный случайный ключ — это пароль от инбокса. Например: `openssl rand -hex 24` |
| `SITEPING_PROJECT` | `ecobionika` |
| `SITEPING_ALLOWED_ORIGINS` | `https://psuhoff78-oss.github.io` |
| `SITE_BASE_URL` | `https://psuhoff78-oss.github.io` |
| `TELEGRAM_BOT_TOKEN` | *(по желанию)* токен от [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | *(по желанию)* id чата/группы, куда слать. Добавьте бота в группу, напишите там что-нибудь и откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` — там будет `"chat":{"id":-100…}` |
| `SLACK_WEBHOOK_URL` | *(по желанию)* Incoming Webhook |
| `DISCORD_WEBHOOK_URL` | *(по желанию)* вебхук канала |

Полный список с комментариями — в `.env.example`.

### 4. Deploy

Нажать **Deploy**. Команда сборки (`npm run build`) сама создаст таблицы в базе (`prisma db push`) и соберёт приложение.
После деплоя получите адрес вида `https://ecobionika-siteping.vercel.app`.

### 5. Подключить сайт

В файле `siteping/init.js` (корень репозитория) вписать адрес:

```js
const SITEPING_ENDPOINT = "https://ecobionika-siteping.vercel.app/api/siteping";
```

Закоммитить в `main` — GitHub Pages обновится за 1–2 минуты. Готово: пометки с сайта попадают на сервер.

## Как пользоваться

- **Сайт** https://psuhoff78-oss.github.io/Ecobionika/ — зелёная кнопка справа внизу: обвести область → написать → отправить. При первой пометке виджет спросит имя и e-mail (авторство). Все пометки и их статусы видны любому посетителю через ту же кнопку.
- **Инбокс** `https://<ваш-сервер>/inbox` — ввести `SITEPING_API_KEY`. Горячие клавиши: `j`/`k` — по списку, `Enter` — открыть, `e` — решено, `p` — в работе, `x` — не будем делать, `u` — отменить, `/` — поиск, `?` — подсказка. Кнопка «Открыть на странице» ведёт на сайт с подсветкой именно этой пометки.
- **Telegram/Slack/Discord** — уведомление о каждой новой пометке с текстом, автором и ссылкой на страницу.

## Права доступа

| Действие | Кто может |
|---|---|
| Смотреть пометки и статусы | все (e-mail авторов скрыт) |
| Оставить пометку | все |
| Менять статус / удалять | только с `SITEPING_API_KEY` (инбокс) |

Сайт закрыт от индексации (`noindex`), поэтому случайных посетителей практически нет. Если понадобится ограничить и создание пометок — скажите, добавим общий пароль на виджет.

## Локальный запуск (для разработчика)

```bash
cd server
cp .env.example .env.local     # и заполнить
npm install
npm run dev                    # http://localhost:3000/inbox
```

Без базы можно запустить в режиме памяти: `SITEPING_STORE=memory` в `.env.local` (пометки живут до перезапуска).

## Структура

```
server/
├── app/api/siteping/route.ts         API SitePing (GET/POST/PATCH/DELETE)
├── app/api/notify/telegram/route.ts  пересылка вебхука в Telegram
├── app/inbox/                        панель разбора правок (@siteping/dashboard)
├── lib/config.ts                     переменные окружения
├── lib/store.ts                      выбор хранилища (Postgres / memory)
├── lib/telegram.ts                   форматирование сообщения
├── prisma/schema.prisma              схема БД (официальная от SitePing)
└── .env.example                      все переменные с пояснениями
```
