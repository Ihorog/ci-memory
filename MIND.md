# 🧠 MIND.md — Спільний Розум CIMEIKA

> Єдина стрічка дій усіх компонентів системи.
> Відкрий — і бачиш все: хто що робить, на якому етапі, коли останнє оновлення.

---

## ВОЛЯ КАЗКАРА

_Змінює тільки Казкар._

**Пріоритети:**
1. Deploy cimeika-unified → Vercel + apex DNS
2. WebDAV + Google Drive інтеграція
3. Windows Desktop UI
4. ci_gitapi → Production
5. ci-moment → Транзакції
6. cimeika.com.ua → повний Live (apex → app)

**Правила:**
- UI/контент — українською. Код — англійською.
- Стан: Є / Нема / Недоступно. Без «можливо».
- Нові репо — тільки з дозволу Казкара.
- Credentials — тільки через secrets/env.

**Агенти та їх спеціалізація:**

| Агент | Спеціалізація | Як вносить зміни |
|-------|--------------|------------------|
| **Claude** | Оркестрація, архітектура, контроль стану | Через Казкара або PR |
| **Gemini** | Аналіз, дослідження, великий контекст | Через Казкара |
| **GPT** | Код, UI-компоненти, контент | Через Казкара |
| **Copilot** | Код в IDE, PR reviews | Прямий commit/PR |

_Оновлено: 21.04.2026_

---

## ЗАДАЧІ — ЄДИНИЙ ТРЕКЕР

_Одна таблиця на все. Кожен агент бачить стан кожної задачі._

| # | Задача | Етап | Хто працює | Останнє оновлення | Блокер |
|---|--------|------|-----------|-------------------|--------|
| 1 | WebDAV + Google Drive | 🔴 Не розпочато | — | — | Архітектура не визначена |
| 2 | Windows Desktop UI | 🔴 Не розпочато | — | — | Не розпочато |
| 3 | cimeika-unified → Deploy | 🔴 Не задеплоєно | — | 21.04.2026: код є, 7 модулів готові | Vercel project + apex DNS |
| 4 | ci_gitapi → Production | 🟡 Код готовий | Claude | 21.04.2026: аудит, endpoints є | GitHub App credentials + Supabase |
| 5 | ci-moment → Транзакції | 🟡 Код готовий | Claude | 09.02.2026: аналіз, визначено блокери | Supabase + Stripe конфіг |
| 6 | cimeika.com.ua → Live | 🟡 Частково | — | 21.04.2026: www ✅ Pages, apex ❌ не прив'язаний | Deploy cimeika-unified |
| 7 | ci-memory → Спільний розум | 🟢 Активно | Claude + Copilot | 21.04.2026: ci_state_code.json створено | — |
| 8 | Event Bus (CIBus) | ⏸️ Концепція | Copilot | 10.02.2026: код запропоновано, на розгляді | Потрібен працюючий backend |
| 9 | Консолідація репо | ⏸️ Планування | — | 21.04.2026: cimeika-app → DEPRECATED | Не пріоритет зараз |
| 10 | media → Populate indexes | ⏸️ Очікує | — | 21.04.2026: albums/tags/images.jsonl порожні | npm run ingest |

**Етапи:** 🔴 Не розпочато → 🟡 В роботі → 🟢 Активно → ✅ Готово → ⏸️ Пауза

_Коли агент бере задачу або оновлює статус — змінює рядок у цій таблиці._

---

## РЕСУРСИ — ЄДИНИЙ СТАН

_Актуальний стан кожного ресурсу. Оновлює той, хто перевірив._

| Ресурс | Стан | Останній хто перевірив | Коли |
|--------|------|----------------------|------|
| cimeika.com.ua (apex) | ❌ Не прив'язаний до app | Claude | 21.04.2026 |
| www.cimeika.com.ua | ✅ Live (ciwiki / GitHub Pages) | Claude | 21.04.2026 |
| HF cimeika-api | ✅ Running (ihorog-cimeika-api.hf.space) | Claude | 21.04.2026 |
| ci_gitapi (Vercel) | ❌ Не задеплоєно (код є, потрібні credentials) | Claude | 21.04.2026 |
| ci-moment (Vercel) | ❌ Не сконфігуровано | Claude | 09.02.2026 |
| ciwiki (GitHub Pages) | ✅ Live → www.cimeika.com.ua | Claude | 21.04.2026 |
| cimeika-unified (GitHub) | ✅ Код є, не задеплоєно (7 модулів, FastAPI+Next.js) | Claude | 21.04.2026 |
| cimeika-app (GitHub) | 🗄️ DEPRECATED (замінено на cimeika-unified) | Claude | 21.04.2026 |
| cit (GitHub/Termux) | ✅ v2.1.0 Active (local) | Claude | 21.04.2026 |
| ci-memory (GitHub) | ✅ Активний | Claude | 21.04.2026 |
| media (GitHub CDN) | ✅ CDN active (indexes порожні) | Claude | 21.04.2026 |
| ci_state_code.json | ✅ Створено (ci-memory/ci_state_code.json) | Claude | 21.04.2026 |
| Supabase | ❌ Не підключено | Claude | 09.02.2026 |
| Stripe | ❌ Не підключено | Claude | 09.02.2026 |
| Google Drive | 🔑 iglu963@gmail | Claude | 10.02.2026 |
| GitHub repos | 6 canonical (аудит 21.04.2026) | Claude | 21.04.2026 |
| Railway | ❌ Не задеплоєно | Claude | 10.02.2026 |

---

## РІШЕННЯ — ЄДИНИЙ РЕЄСТР

| # | Рішення | Хто запропонував | Казкар | Дата |
|---|---------|-----------------|--------|------|
| 1 | Об'єднати ci_gitapi з ci-memory | Claude | ✅ | 13.02.2026 |
| 2 | Створити ci-memory | Claude | ✅ | 10.02.2026 |
| 3 | MIND.md як єдиний канал | Казкар | ✅ | 10.02.2026 |
| 4 | ci_gitapi: 10 кроків активації | Claude | ✅ | 09.02.2026 |
| 5 | ci-moment: фіналізація до транзакцій | Claude | ✅ | 09.02.2026 |
| 6 | Event Bus (CIBus) | Copilot | ⏳ | 10.02.2026 |
| 7 | Маніфест Мета-системи Казкар | Gemini | ⏳ | 10.02.2026 |
| 8 | cimeika-unified = canonical presentation plane | Claude | ⏳ | 21.04.2026 |
| 9 | cimeika-app → DEPRECATED | Claude | ⏳ | 21.04.2026 |

---

## CI_GITAPI — ІНТЕГРАЦІЯ З GITHUB API

_Ci_gitapi об'єднано з ci-memory як єдину систему управління контекстом._

**Призначення:**
- GitHub API orchestration через FastAPI
- Автоматична синхронізація репозиторіїв
- Моніторинг змін у коді та issues
- Webhook обробка для оновлення MIND.md

**Стан інтеграції:**
- ✅ Код є: FastAPI + Supabase + GitHub Apps + Telegram + HF + Vercel
- ✅ Endpoints реалізовані: /health, /ci/state, /control/decision, /orchestrate/event
- ❌ Не задеплоєно (потребує GitHub App credentials + Supabase config)
- 🔄 Координація через MIND.md як єдине джерело істини

**10 кроків активації (визначені 09.02.2026):**
1. Конфігурація GitHub App
2. Налаштування Vercel deployment
3. Підключення webhooks
4. Тестування API endpoints
5. Інтеграція з Observer script
6. Автоматичне оновлення REPOS.md
7. Синхронізація з MIND.md
8. Моніторинг стану репозиторіїв
9. Обробка PR та Issues
10. Production readiness check

---

## МОДУЛІ CIMEIKA

| Модуль | Стан | Де код | Хто відповідає | Останнє |
|--------|------|--------|---------------|--------|
| **Ci** (Ядро) | ✅ Реалізовано | cimeika-unified /modules/ci | Claude | 21.04: аудит |
| **Казкар** (Пам'ять) | ✅ Реалізовано | cimeika-unified /modules/kazkar + pgvector | Claude | 21.04: аудит |
| **Подія** (Сценарії) | ✅ Реалізовано | cimeika-unified /modules/podija | Claude | 21.04: аудит |
| **Настрій** (Емоції) | ✅ Реалізовано | cimeika-unified /modules/nastrij | Claude | 21.04: аудит |
| **Маля** (Ідеї) | ✅ Реалізовано | cimeika-unified /modules/malya | Claude | 21.04: аудит |
| **Календар** (Час) | ✅ Реалізовано | cimeika-unified /modules/calendar + Google API | Claude | 21.04: аудит |
| **Галерея** (Візуал) | ✅ Реалізовано | cimeika-unified /modules/gallery | Claude | 21.04: аудит |

> Всі 7 модулів реалізовані в cimeika-unified. Блокер не код — блокер deploy.

---

## СТРІЧКА ПОДІЙ

_Зворотна хронологія. Кожен агент додає свої дії сюди._

| Коли | Хто | Що зробив | Задача # | Результат |
|------|-----|-----------|----------|-----------|
| 21.04.2026 | Claude | Повний аудит 6 репо: cimeika-unified, cit, ci_gitapi, ciwiki, media, ci-memory | — | ci_state_code.json створено, MIND.md+REPOS.md оновлено |
| 21.04.2026 | Claude | Визначено: cimeika-app DEPRECATED, cimeika-unified = canonical presentation plane | #9 | Рішення #8 і #9 в реєстрі |
| 21.04.2026 | Claude | Підтверджено: всі 7 модулів реалізовані в cimeika-unified | #3 | Блокер — deploy, не код |
| 21.04.2026 | Claude | Підтверджено: www.cimeika.com.ua живий (ciwiki/Pages), apex не прив'язаний | #6 | P0: потрібен Vercel + DNS |
| 13.02.2026 | Claude | Об'єднав ci_gitapi з ci-memory | #4 | Додано секцію CI_GITAPI, оновлено МОДУЛІ |
| 10.02.2026 | Copilot | Виконав реструктуризацію ci-memory v3.0 | #7 | MIND.md єдина стрічка |
| 10.02.2026 | Казкар | Делегував реструктуризацію ci-memory Copilot | #7 | ТЗ v3 |
| 10.02.2026 | Copilot | Запропонував Event Bus архітектуру | #8 | Код CIBus, на розгляді |
| 10.02.2026 | Claude | Оцінив маніфест Gemini | #7 | Концепція → робочий формат |
| 10.02.2026 | Claude | Створив ci-memory v1.0 | #7 | 16 файлів, push OK |
| 09.02.2026 | Claude | Аналіз ci_gitapi | #4 | FastAPI, 10 кроків активації |
| 09.02.2026 | Claude | Аналіз ci-moment | #5 | Next.js+Stripe, блокери визначені |

---

## ЯК ВНОСИТИ ЗМІНИ

**Будь-який агент, працюючи з CIMEIKA:**

1. Відкрий MIND.md
2. Подивись таблицю ЗАДАЧІ — знайди свою або візьми нову
3. Виконай роботу
4. Оновити в MIND.md:
   - ЗАДАЧІ → змінити етап, останнє оновлення
   - РЕСУРСИ → якщо перевірив стан
   - СТРІЧКА ПОДІЙ → додати рядок зверху
   - РІШЕННЯ → якщо є пропозиція
5. Commit: `🤖 <агент>: <що зробив>`

**Казкар передає зміни через:**
- Прямий git push
- Copy-paste від агента в файл
- PR від Copilot
