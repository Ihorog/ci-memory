# 📦 REPOS.md — Реєстр Репозиторіїв

> Централізований каталог канонічних репозиторіїв CIMEIKA.
> Кожен репо має роль у системі, стан і відповідального.

_Останнє оновлення: 21.04.2026 (повний аудит Claude)_

---

## 🔵 CIMEIKA — Canonical Planes

### Presentation Plane
| Репо | Призначення | Стек | Стан | Деплой |
|------|-------------|------|------|--------|
| [cimeika-unified](https://github.com/Ihorog/cimeika-unified) | **CANONICAL** presentation plane. 7 модулів: Ci, Казкар, Подія, Настрій, Маля, Календар, Галерея | FastAPI + Next.js + PostgreSQL + pgvector + Docker | ✅ Код є, ❌ не задеплоєно | Vercel (потрібно) |

### Control Plane (Local)
| Репо | Призначення | Стек | Стан | Деплой |
|------|-------------|------|------|--------|
| [cit](https://github.com/Ihorog/cit) | Local control plane. API gateway, chat proxy, audit endpoints. v2.1.0 | Python + Termux + Docker | ✅ v2.1.0 Active | Termux / Docker local |

### Control Plane (Cloud)
| Репо | Призначення | Стек | Стан | Деплой |
|------|-------------|------|------|--------|
| [ci_gitapi](https://github.com/Ihorog/ci_gitapi) | Cloud control plane. Policy engine, GitHub App, orchestration, /ci/state | FastAPI + Supabase + GitHub Apps + Vercel | ✅ Код є, ❌ не задеплоєно | Vercel (потрібні credentials) |

### Knowledge / Policy Plane
| Репо | Призначення | Стек | Стан | Деплой |
|------|-------------|------|------|--------|
| [ciwiki](https://github.com/Ihorog/ciwiki) | Knowledge hub, docs, Legend CI, CIT Voice, security policies | MkDocs + Python + Node.js | ✅ Live | GitHub Pages → www.cimeika.com.ua |

### Coordination Plane
| Репо | Призначення | Стек | Стан | Деплой |
|------|-------------|------|------|--------|
| [ci-memory](https://github.com/Ihorog/ci-memory) | Shared AI agent context. MIND.md + CONSTITUTION.md + ci_state_code.json | Markdown + GitHub Actions | ✅ Активний | GitHub only |

### Assets Registry
| Репо | Призначення | Стек | Стан | Деплой |
|------|-------------|------|------|--------|
| [media](https://github.com/Ihorog/media) | Brand assets, character imagery, narrative images, icon sets | Node.js + JS scripts | ✅ CDN active (indexes порожні) | GitHub Raw CDN |

---

## 🌐 Canonical Domain Binding

| Домен | Ціль | Стан |
|-------|------|------|
| `cimeika.com.ua` | cimeika-unified (Vercel) | ❌ Не прив'язаний |
| `www.cimeika.com.ua` | ciwiki (GitHub Pages) | ✅ Live |
| HF Space | `https://ihorog-cimeika-api.hf.space` | ✅ Running (fallback API) |

---

## 🗄️ DEPRECATED

| Репо | Причина | Замінено на | Дія |
|------|---------|------------|-----|
| [cimeika-app](https://github.com/Ihorog/cimeika-app) | Публікаційний контур перенесено на cimeika-unified | cimeika-unified | Архівувати (очікує рішення Казкара) |

---

## 📊 СТАТИСТИКА

**Canonical repos:** 6  
**Deployed:** 2 (ciwiki, cit/local)  
**Code ready, not deployed:** 2 (cimeika-unified, ci_gitapi)  
**Coordination/assets (no deploy needed):** 2 (ci-memory, media)  
**Deprecated:** 1 (cimeika-app)

---

## 🎯 DІЇ ПОТРІБНІ

### Priority 111 (Critical)
- [ ] Deploy cimeika-unified → Vercel
- [ ] Bind `cimeika.com.ua` apex DNS → Vercel

### Priority 11 (Active)
- [ ] Deploy ci_gitapi → Vercel (потрібні: GitHub App creds + Supabase)
- [ ] Активувати CI_GITAPI_URL в cimeika-unified після deploy

### Priority 1 (Background)
- [ ] Populate media indexes: `npm run ingest` у media repo
- [ ] Архівувати cimeika-app (рішення Казкара)

---

**Версія:** 2.0  
**Власник:** Казкар (CIMEIKA)  
**Підтримка:** Claude  
**Аудит:** 21.04.2026
