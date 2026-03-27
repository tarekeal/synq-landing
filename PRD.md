# PRD: Synq Landing Page

> **Author:** Tarek El Abdel-Laoui
> **Date:** 2026-03-27
> **Status:** Draft
> **Project:** Synq Consulting Landing Page
> **URL:** synq.pixldev.be (replace current platform page)

---

## 1. Problem

Companies know they need AI — but they're stuck between two bad options:

1. **Hire a "prompt engineer"** who wraps ChatGPT in a UI and calls it AI transformation. No engineering depth, no production reliability, no integration with existing systems.
2. **Build an internal AI team** — 6-12 month ramp, €200K+ in salaries before shipping anything, high risk of building the wrong thing.

Meanwhile, the actual opportunity is concrete: AI agents that do real work inside existing business processes — not chatbots, not demos, not "AI strategy decks."

---

## 2. What Synq Consulting Is

An AI implementation studio that builds and deploys production AI systems inside companies. We use **Synq** (our own orchestration platform) to coordinate multi-agent workflows, ship faster than any traditional agency, and maintain governance standards that enterprise clients require.

**Not a consultancy that writes PowerPoints. An engineering team that ships code.**

### Core positioning

> "We build the AI systems your team can't build yet — and leave you with the infrastructure to run them."

### What makes this different

| Typical AI Consultancy | Synq |
|---|---|
| Strategy decks and roadmaps | Working production systems |
| 3-6 month timelines | 2-4 week delivery cycles |
| Black-box vendor lock-in | Open architecture, your infra |
| Single-model dependency | Multi-model orchestration (Claude, GPT, Codex, custom) |
| No governance story | Built-in audit trails, RBAC, quality gates |
| "We'll advise your team" | We build it, then transfer ownership |

---

## 3. Target Audience

### Primary: SMEs and mid-market companies (50-500 employees)

- Have manual processes ripe for automation (document processing, compliance, reporting, internal tooling)
- Technical enough to know they need real engineering, not marketing fluff
- Budget: €10K-€50K per engagement
- Decision makers: CTO, VP Engineering, Head of Operations, or founder

### Secondary: Agencies and software companies

- Need AI capabilities bolted onto existing products
- Want a white-label partner, not a competitor
- Looking for a team that can plug into their stack

### Anti-personas (who this is NOT for)

- Companies wanting a chatbot on their website (go use Intercom)
- "We want to explore AI" with no concrete problem (not ready)
- Enterprise procurement cycles > 3 months (not our game right now)

---

## 4. Service Tiers

### Tier 1: AI Sprint (€10K-€15K)

- **Duration:** 2-3 weeks
- **Scope:** One well-defined automation or AI feature
- **Deliverable:** Production-ready system, deployed to client infra
- **Examples:**
  - Document processing pipeline (invoices, contracts, compliance docs)
  - Internal knowledge base with RAG over company data
  - Automated reporting system pulling from multiple data sources
- **Includes:** Architecture, implementation, deployment, 2 weeks post-launch support

### Tier 2: AI Integration (€20K-€35K)

- **Duration:** 4-6 weeks
- **Scope:** Multi-system AI integration into existing business processes
- **Deliverable:** Production system + monitoring + handover documentation
- **Examples:**
  - End-to-end compliance automation (ingest → validate → report → audit trail)
  - AI-powered operations platform (multi-agent coordination across departments)
  - Customer data pipeline with intelligent routing and processing
- **Includes:** Everything in Sprint + dedicated Slack channel, weekly syncs, 1 month post-launch support

### Tier 3: AI Partner (€5K-€8K/month retainer)

- **Duration:** Ongoing
- **Scope:** Continuous AI capability building — new features, optimization, scaling
- **Deliverable:** Monthly sprint cycles with defined deliverables
- **Best for:** Companies that want to keep building without hiring a full AI team
- **Includes:** Priority response, monthly architecture reviews, proactive optimization

---

## 5. Landing Page Structure

### 5.1 Hero

- **Headline:** "AI that ships. Not AI that slides."
- **Subline:** "We build production AI systems inside your business — multi-agent workflows, real integrations, governed and observable. Live in weeks, not quarters."
- **CTA:** "Talk to us" → Calendly or contact form
- **Secondary CTA:** "See our work" → scrolls to case studies
- **Visual:** Terminal/dashboard aesthetic showing a Synq pipeline running — not stock photos of robots

### 5.2 Problem Section

- **Header:** "The AI implementation gap"
- Three cards showing the reality:
  1. **"ChatGPT wrappers don't scale"** — Most AI projects die after the demo because nobody planned for production, error handling, or governance.
  2. **"Your team is 12 months from ready"** — Hiring, training, and ramping an internal AI team takes longer than the market will wait.
  3. **"Strategy decks don't ship code"** — You don't need another roadmap. You need systems running in production.

### 5.3 How We Work

- **Header:** "From problem to production in weeks"
- Timeline visualization (horizontal):
  1. **Week 0: Scope** — We map your process, identify the highest-impact automation, define success criteria. No fluff workshops.
  2. **Week 1-2: Build** — Multi-agent development using Synq. Parallel workstreams (backend, frontend, QA, security) coordinated through our orchestration platform.
  3. **Week 3: Deploy** — Production deployment on your infrastructure. Monitoring, alerting, documentation. Your team can maintain it.
  4. **Week 4+: Support** — We stay on for handover, optimization, and any adjustments based on real usage data.

### 5.4 The Synq Advantage

- **Header:** "Built on our own orchestration platform"
- Explanation of what Synq is (the platform) and why it matters for client delivery:
  - **Speed:** 7 specialist AI agents working in parallel = 10x faster than traditional agency delivery
  - **Quality:** Automated quality gates, security scans, and review loops before anything hits production
  - **Governance:** Every decision logged, every change tracked, full audit trail for compliance-heavy industries
  - **Cost transparency:** Real-time token and compute tracking — you know exactly what you're paying for
- Small diagram: Orchestrator coordinating Architect, Backend, Frontend, QA, DevOps, Security, Tech Lead agents

### 5.5 Case Studies

Two cards, concrete numbers:

**Synco — Compliance Platform**
- Full-stack compliance system: 133 files, 16K lines of code
- Built in ~4 hours of orchestrated AI development
- Stack: FastAPI + Next.js + PostgreSQL + Docker
- "From blank repo to production-deployed compliance platform in a single session"

**Feen — AI Accounting SaaS**
- Invoice management for Belgian SMEs, Peppol-compliant
- €700 MRR, 35 paying clients
- Built across 12 Synq sessions
- Integrations: OCR, government APIs, PSD2, Exact Online
- "The kind of product that used to take a team of 5 six months"

### 5.6 What We Build

Grid of capability cards (icon + title + one-liner):

| Capability | Description |
|---|---|
| Document Processing | Extract, validate, route — invoices, contracts, compliance docs |
| Internal Tooling | AI-powered dashboards and ops platforms for your team |
| Data Pipelines | Ingest from multiple sources, transform, load — with AI in the loop |
| Compliance Automation | Audit trails, validation rules, regulatory reporting |
| Process Automation | Replace manual workflows with governed AI agents |
| Product AI Features | Add AI capabilities to your existing product |

### 5.7 Tech Stack (Credibility Section)

- **Header:** "Real engineering. Real stack."
- Logo row or minimal grid: Next.js, FastAPI, PostgreSQL, Docker, TypeScript, Python
- AI providers: Claude, GPT-4, Codex, custom models
- "Provider-agnostic. We use whatever solves your problem best."

### 5.8 Pricing Overview

- Three tier cards (Sprint / Integration / Partner) with price ranges
- No detailed breakdowns on the landing page — just enough to qualify
- CTA under each: "Scope your project" → contact

### 5.9 FAQ

1. **"Do you replace our dev team?"** — No. We build systems your team maintains. Full handover, documentation, and training included.
2. **"What if we already have an AI vendor?"** — We integrate with existing tools and infrastructure. We're not selling you a platform — we're building on yours.
3. **"How do you handle sensitive data?"** — Sandboxed execution, on-premise deployment options, audit trails. We can work within your compliance framework.
4. **"What's the minimum engagement?"** — AI Sprint at €10K. If your problem can't be solved in 2-3 weeks, we'll tell you upfront and scope accordingly.
5. **"Where are you based?"** — Brussels, Belgium. We work with clients across Europe, primarily in the Benelux region.

### 5.10 Footer CTA

- **Header:** "Let's build something real."
- **Subline:** "No pitch decks. No 6-month discovery phases. Tell us what's broken and we'll scope a fix."
- Contact form: Name, company, email, "What do you want to automate?" (textarea)
- Or: Calendly embed for 30-min intro call
- Social: LinkedIn, email (hello@pixldev.be)

---

## 6. Design Direction

- **Dark mode.** Terminal/engineering aesthetic. This isn't a corporate consultancy — it's a technical studio.
- **Monospace for code/metrics** (Geist Mono or JetBrains Mono), clean sans-serif for body (Geist Sans or Inter)
- **Accent color:** Electric blue or teal on dark zinc/slate background
- **No stock photos.** Use code snippets, terminal output, architecture diagrams, Synq dashboard screenshots
- **Animations:** Subtle — typing effects on the hero, pipeline flow animation, number count-ups on traction stats
- **Mobile-first.** Decision makers scroll on phones during commutes.

---

## 7. Pages

### MVP (launch)

1. **Landing Page** (`/`) — Everything in Section 5 above, single long-scroll page
2. **Login** (`/login`) — Email + password form, link to register
3. **Register** (`/register`) — Email + password + display name, link to login
4. **Dashboard** (`/app`) — Protected, shows recent notes + quick actions
5. **Notes List** (`/app/notes`) — Paginated notes list with search
6. **Note Detail** (`/app/notes/:id`) — View/edit single note
7. **New Note** (`/app/notes/new`) — Create note form
8. **Contact/Book** — Calendly embed or Tally form (modal on landing page)

### V2 (post-launch)

9. **Case Studies** — Expanded Synco and Feen write-ups with architecture diagrams and timelines
10. **Blog** — Migrate existing Synq blog posts (orchestration patterns, baton pattern, production case studies)
11. **About** — Team, Pixl backstory, why we built Synq

---

## 8. Technical Requirements

- **Frontend:** React 18 + Vite + TailwindCSS
- **Backend:** Python (FastAPI or Flask) with SQLAlchemy ORM + Alembic migrations
- **Database:** PostgreSQL
- **Auth:** JWT (access + refresh tokens) + bcrypt password hashing
- **Hosting:** Vercel (frontend) + existing Pixl infra (API)
- **Forms:** Tally embed, Calendly embed, or simple mailto
- **Analytics:** Plausible (privacy-friendly, no cookie banner needed)
- **SEO:** Standard meta tags, OG images, structured data for LocalBusiness
- **i18n:** English only for MVP. French/Dutch V2 if targeting Belgian market specifically.
- **Performance:** Target 95+ Lighthouse score. Static generation where possible.

---

## 8.1 Feature Breakdown

### F1: Database & Models (SQLAlchemy, Alembic)

- **ORM:** SQLAlchemy 2.x with async support
- **Migrations:** Alembic for schema versioning (auto-generate from models)
- **Models:**
  - `User` — id (UUID), email (unique), hashed_password, display_name, created_at, updated_at
  - `Note` — id (UUID), title, content (text), user_id (FK → User), created_at, updated_at
- **Conventions:** UTC timestamps, UUID primary keys, soft-delete optional in V2
- **Seed:** Alembic migration for initial schema; no seed data in production

### F2: Auth API (JWT, bcrypt)

- **Password hashing:** bcrypt via `passlib[bcrypt]`
- **Tokens:** JWT (HS256) with short-lived access token (15 min) + long-lived refresh token (7 days)
- **Endpoints:**
  - `POST /api/auth/register` — email, password, display_name → user + tokens
  - `POST /api/auth/login` — email, password → access + refresh tokens
  - `POST /api/auth/refresh` — refresh_token → new access token
  - `GET /api/auth/me` — returns current user profile (auth-protected)
- **Validation:** Email format, password min 8 chars, duplicate email check
- **Security:** Tokens in httpOnly cookies or Authorization header; bcrypt cost factor 12

### F3: Notes CRUD API (paginated, auth-protected)

- **All endpoints require valid JWT** (401 if missing/expired)
- **Users can only access their own notes** (row-level filtering by user_id)
- **Endpoints:**
  - `GET /api/notes` — list notes, paginated (default 20/page), sorted by updated_at desc
  - `GET /api/notes/:id` — get single note (404 if not found or not owned)
  - `POST /api/notes` — create note (title required, content optional)
  - `PUT /api/notes/:id` — update note (partial update allowed)
  - `DELETE /api/notes/:id` — delete note (hard delete)
- **Pagination:** offset-based with `page` and `per_page` query params; response includes `total`, `page`, `per_page`, `pages`
- **Search:** Optional `q` query param for full-text search on title + content (V2: proper FTS with pg_trgm)

### F4: React Frontend (Vite, TailwindCSS)

- **Stack:** React 18 + Vite 5 + TailwindCSS 3 + React Router 6
- **Pages:**
  - `/` — Landing page (F5)
  - `/login` — Login form
  - `/register` — Registration form
  - `/app` — Protected dashboard, redirects to `/login` if unauthenticated
  - `/app/notes` — Notes list with pagination
  - `/app/notes/:id` — Note detail / edit view
  - `/app/notes/new` — Create note form
- **State management:** React Context for auth state; no external state library for MVP
- **API client:** Fetch wrapper with automatic token refresh on 401
- **Design:** TailwindCSS utility classes, dark mode default, Geist Sans / Geist Mono fonts
- **Components:** Reusable form inputs, button variants, card layouts, pagination control, toast notifications

### F5: Landing Page (hero, features, CTA)

- Implements sections 5.1–5.10 from this PRD (hero, problem, how we work, advantage, case studies, capabilities, tech stack, pricing, FAQ, footer CTA)
- **Public route** — no auth required
- **Static content** — hardcoded, no CMS
- **Responsive** — mobile-first, dark mode
- **CTA actions:** "Talk to us" → Calendly embed or contact form modal; "See our work" → smooth scroll to case studies
- **Animations:** Subtle typing effect on hero headline, count-up on traction numbers, pipeline flow diagram

---

## 9. Success Metrics

| Metric | Target (first 3 months) |
|---|---|
| Qualified leads (booked calls) | 10/month |
| Website → contact conversion | 3-5% |
| Average deal size | €15K+ |
| Time from first contact to signed | < 2 weeks |
| Lighthouse performance score | 95+ |

---

## 10. Open Questions

1. **Domain:** Keep synq.pixldev.be or get a dedicated domain (synq.ai, synqstudio.com, etc.)?
2. **Brand relationship:** Is this "Synq by Pixl" or standalone "Synq"? Current site says Pixl SRL.
3. **Calendly vs form:** Do we want to qualify leads before a call (form) or reduce friction (direct Calendly)?
4. **Case study permissions:** Can we name Synco publicly? Any NDA constraints?
5. **Pricing visibility:** Show exact numbers on the site or keep it as "starting from" ranges?
6. **Existing waitlist:** There are people on the current waitlist — migration plan?
