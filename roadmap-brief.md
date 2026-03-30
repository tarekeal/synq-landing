# Synq Landing Page — Roadmap Brief

> **Date:** 2026-03-27  
> **Author:** Tarek El Abdel-Laoui  
> **Source:** PRD.md + plan.md + codebase analysis  
> **Status:** Active  

---

## Vision

Deliver a production-ready Synq Consulting presence: a high-conversion landing page that positions Synq as an elite AI implementation studio, backed by a minimal authenticated notes app that demonstrates engineering credibility and provides the team with a lightweight internal tool.

**What this roadmap achieves:**
1. A dark-mode, terminal-aesthetic landing page that converts SME/mid-market decision-makers into qualified leads (target: 10 booked calls/month, 3–5% CVR).
2. A fully functional auth + CRUD backend (FastAPI + PostgreSQL) serving real JWT-authenticated endpoints.
3. A React + Vite + TailwindCSS frontend wired to that backend, with protected routes and a notes dashboard.
4. A deployable full-stack system: Vercel for the frontend, existing Pixl infra for the API.

The landing page is the commercial output. The notes app is the engineering proof-of-concept that stands behind it.

---

## Milestones

| # | Milestone | Scope | Status |
|---|-----------|-------|--------|
| **M0** | Foundation complete | F1: DB models, async SQLAlchemy engine, Alembic migrations, test fixtures | ✅ Done |
| **M1** | Auth API live | F2: `POST /register`, `/login`, `/refresh`, `GET /me`, JWT + bcrypt, httpOnly cookies | 🔲 Next |
| **M2** | Notes CRUD API live | F3: Full CRUD + pagination + search, row-level auth, OpenAPI docs | 🔲 |
| **M3** | Frontend scaffold + auth flows | F4 (partial): Vite + React 18 + TailwindCSS + React Router, login/register/dashboard pages, token refresh logic | 🔲 |
| **M4** | Notes UI complete | F4 (full): Notes list, note detail, create/edit, pagination, search, toast notifications | 🔲 |
| **M5** | Landing page live | F5: All 10 sections (hero → footer CTA), responsive dark-mode, animations, Calendly/Tally CTA | 🔲 |
| **M6** | Production deploy | Vercel (frontend) + Pixl infra (API), env vars, domain, Plausible analytics, Lighthouse ≥ 95 | 🔲 |

---

## Sequencing

The order is dictated by hard dependencies: no auth routes without models, no frontend without an API contract, no landing page launch without a stable deploy pipeline.

```
M0 (Done)
  └─► M1: Auth API
        └─► M2: Notes CRUD
              └─► M3: Frontend scaffold + auth flows
                    └─► M4: Notes UI
                          ├─► M5: Landing page (can start in parallel with M4 — no backend dependency)
                          └─► M6: Production deploy (requires M4 + M5 complete)
```

### Parallel opportunity

**M5 (Landing Page)** has zero backend dependency — it is fully static content. It can be started in parallel with M3/M4 once the React scaffold (Vite + TailwindCSS + routing skeleton) is in place. A frontend engineer can work on F5 sections while the backend engineer closes out F3.

### Recommended sprint breakdown

| Sprint | Duration | Deliverables |
|--------|----------|--------------|
| Sprint 1 | 3 days | M1 — Auth API, Pydantic schemas, error handling, tests |
| Sprint 2 | 3 days | M2 — Notes CRUD, pagination, search, endpoint tests |
| Sprint 3 | 4 days | M3 — Frontend scaffold, login/register/dashboard, API client with refresh |
| Sprint 4 | 3 days | M4 — Notes list/detail/new/edit, pagination UI, toasts |
| Sprint 4b | 3 days (parallel) | M5 — Landing page sections 5.1–5.10, mobile responsive, animations |
| Sprint 5 | 2 days | M6 — Deploy pipeline, domain, analytics, Lighthouse audit, SEO meta |

**Total estimate:** ~18 working days / ~3.5 weeks.

---

## Risk Assessment

### R1 — Auth complexity underestimated ⚠️ Medium
**Risk:** JWT refresh logic (httpOnly cookies vs Authorization headers) creates subtle cross-domain issues when the API is on a different subdomain from the Vite frontend in dev.  
**Mitigation:** Decide the token storage strategy (httpOnly cookie vs localStorage + Authorization header) at the start of M1. Document it in a decision record. Use `sameSite=lax` + `secure` for cookies in production. Test refresh flow explicitly in the frontend API client (M3).

### R2 — Frontend/API CORS mismatch 🟡 Low-Medium
**Risk:** Vite dev server (`localhost:5173`) and FastAPI (`localhost:8000`) require explicit CORS config. Misconfiguration causes silent 401s or preflight failures.  
**Mitigation:** Add CORS middleware in FastAPI early (M1), whitelist Vite dev origin and Vercel production origin via env var. Test with actual browser fetch calls during M3 scaffold.

### R3 — Landing page copy/asset gap 🟡 Low-Medium
**Risk:** Case study claims (Synco: 133 files, 16K lines; Feen: €700 MRR, 35 clients) are specific — verify numbers and confirm there are no NDA constraints before publishing.  
**Mitigation:** Resolve PRD open question #4 (case study permissions) before M5. Have fallback copy ready that anonymises client names if needed.

### R4 — Vite → Vercel static deploy config 🟡 Low
**Risk:** Vite SPA with React Router requires a `vercel.json` rewrite rule so that all routes serve `index.html`. Missing this causes 404 on direct URL access.  
**Mitigation:** Add `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` as part of M6 deploy setup. Validate with `vercel dev` before going live.

### R5 — Scope creep on landing page animations ⚠️ Medium
**Risk:** The PRD specifies typing effects, pipeline flow animations, and count-up numbers — these are non-trivial and can balloon M5 scope.  
**Mitigation:** Implement animations as progressive enhancement. Ship M5 with static content first, then layer in animations. Use lightweight libs (Framer Motion for React, or pure CSS). Never block launch on animation polish.

### R6 — Database URL / env var management across environments 🟡 Low
**Risk:** Different `DATABASE_URL` values for local dev (SQLite for tests), staging (Neon or Render Postgres), and production — easy to mix up or leak to git.  
**Mitigation:** Follow `.env.example` pattern already established in F1. Use `pydantic-settings` with environment-specific `.env` files. Never commit `.env` files. Use Vercel env vars for the deployed backend if hosting on Vercel Functions.

### R7 — Open questions blocking launch decisions 🔴 High
**Risk:** PRD has 6 open questions (domain, brand relationship, Calendly vs form, case study permissions, pricing visibility, waitlist migration). At least 3 of these (domain, Calendly/form, case study permissions) must be resolved before M5 can be finalised.  
**Mitigation:** Create a decision log. Force resolution of blocking questions before Sprint 4b starts. Default fallbacks: keep `synq.pixldev.be`, use Tally form (lower friction than Calendly to set up), anonymise case study names.

---

## Success Metrics

### Commercial KPIs (first 3 months post-launch)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Qualified leads (booked calls) | 10 / month | Calendly / Tally submissions |
| Landing page → contact conversion | 3–5% | Plausible events on CTA clicks |
| Average deal size | €15K+ | CRM / manual tracking |
| Time from first contact to signed | < 2 weeks | Deal cycle length |

### Technical KPIs (at launch)

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | ≥ 95 | Lighthouse CI |
| Lighthouse Accessibility | ≥ 90 | Lighthouse CI |
| Core Web Vitals (LCP) | < 2.5s | Vercel Speed Insights |
| API test coverage | ≥ 80% | pytest-cov |
| Zero open OWASP Top 10 issues | Pass | Manual + semgrep |
| Production uptime | 99.9% | Vercel / infra monitoring |

### Engineering velocity KPIs (in-sprint)

| Metric | Target |
|--------|--------|
| F2 Auth API complete + tested | End of Sprint 1 |
| F3 Notes CRUD complete + tested | End of Sprint 2 |
| Frontend auth flow working end-to-end | End of Sprint 3 |
| Full notes app usable in browser | End of Sprint 4 |
| Landing page all 10 sections responsive | End of Sprint 4b |
| Lighthouse 95+ on production URL | End of Sprint 5 |

---

## Appendix: PRD Open Questions Resolution Timeline

These must be resolved **before Sprint 4b (M5)** to avoid blocking the landing page build:

| # | Question | Deadline | Owner |
|---|----------|----------|-------|
| 1 | Domain: `synq.pixldev.be` vs dedicated | Before Sprint 4b | Tarek |
| 2 | Brand: "Synq by Pixl" vs standalone "Synq" | Before Sprint 4b | Tarek |
| 3 | Calendly vs Tally form for CTA | Before Sprint 4b | Tarek |
| 4 | Case study permissions (Synco NDA?) | Before Sprint 4b | Tarek |
| 5 | Pricing visibility: exact vs "starting from" | Before Sprint 4b | Tarek |
| 6 | Waitlist migration plan | Before M6 deploy | Tarek |
