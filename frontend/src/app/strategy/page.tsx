import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "The Plan — PixAzul.ia",
  robots: { index: false, follow: false },
};

/* ── data ────────────────────────────────────────────────────────── */

const revenueCards = [
  {
    label: "Primary",
    title: "Synq AI Engagements",
    items: [
      "AI Sprint: €10K–€15K per project (2-3 weeks)",
      "AI Integration: €20K–€35K per project (4-6 weeks)",
      "AI Partner: €5K–€8K/month (ongoing)",
    ],
    note: "This is where the big money is. Tarek sells, Hamza delivers with Synq.",
  },
  {
    label: "Volume",
    title: "Agency Projects",
    items: [
      "Landing pages: ~€1,500/project",
      "Restaurant sites (white-label): ~€3,000/project",
      "Web apps: €3,000–€5,000/project",
      "MVPs: ~€30,000/project",
    ],
    note: "Volume filler between Synq deals. Fast to close, fast to deliver.",
  },
  {
    label: "SaaS",
    title: "Feen",
    items: [
      "Starter: €9/mo · Pro: €19/mo · Business: €29/mo",
      "~20 users today, growing through Peppol urgency",
      "Accountant channel in progress",
    ],
    note: "Background revenue that compounds. Not the priority in months 1-2.",
  },
  {
    label: "Recurring",
    title: "Recurring Revenue",
    items: [
      "Hosting/maintenance: ~€50/client/month",
      "Feen subscriptions growing monthly",
    ],
    note: "This is what builds long-term stability.",
  },
];

const projections = [
  { line: "Synq AI Sprints (€12.5K avg)", realistic: "3 deals = €37,500", optimistic: "5 deals = €62,500" },
  { line: "Synq AI Integration (€27.5K avg)", realistic: "1 deal = €27,500", optimistic: "2 deals = €55,000" },
  { line: "Synq AI Partner (€6.5K/mo avg)", realistic: "1 client × 4mo = €26,000", optimistic: "2 clients = €52,000" },
  { line: "Agency projects (€2.5K avg)", realistic: "8 projects = €20,000", optimistic: "12 projects = €30,000" },
  { line: "Feen MRR (cumulative)", realistic: "35 users = €2,000", optimistic: "60 users = €4,500" },
  { line: "Hosting (cumulative)", realistic: "10 clients = €3,000", optimistic: "15 clients = €4,500" },
];

const milestones = [
  {
    date: "April 2026",
    title: "Launch",
    bullets: [
      "Tarek starts part-time at AREMIS",
      "Complete Pizza Roma delivery (first white-label reference)",
      "Synq landing page goes live",
      "First 30 warm outreach messages/week",
      "Target: 1-2 scoping calls booked",
    ],
    revenue: "€3K (Pizza Roma final payment)",
  },
  {
    date: "May 2026",
    title: "First Synq Deal",
    bullets: [
      "First Synq AI Sprint signed and delivered",
      "2-3 agency projects closed from warm network",
      "Feen Peppol urgency campaign results in",
      "Start restaurant white-label pitches",
    ],
    revenue: "€12K–€17K this month · €15K–€20K cumulative",
  },
  {
    date: "June 2026",
    title: "Momentum",
    bullets: [
      "Second Sprint or first AI Integration in pipeline",
      "Agency pipeline generating consistent inbound",
      "Feen: 30+ users, accountant outreach started",
      "First AI Partner conversation (retainer model)",
    ],
    revenue: "€15K–€25K this month · €35K–€50K cumulative",
  },
  {
    date: "July 2026",
    title: "€50K Trigger Zone",
    bullets: [
      "Cumulative revenue hits €50K",
      "Hamza transition conversation becomes real",
      "First AI Partner retainer signed",
      "Portfolio: 3-4 Synq case studies",
    ],
    revenue: "€50K–€70K cumulative",
    highlight: true,
  },
  {
    date: "Aug–Sep 2026",
    title: "Scale",
    bullets: [
      "Hamza begins transition planning",
      "Synq pipeline self-sustaining",
      "Feen: 40-50 users, accountant channel producing",
      "Agency projects on autopilot",
    ],
    revenue: "€70K–€100K cumulative",
  },
  {
    date: "Oct–Dec 2026",
    title: "Full Operation",
    bullets: [
      "Hamza joins full-time (if €50K trigger hit)",
      "Higher-ticket Synq deals (Integration + Partner)",
      "Feen pricing implementation",
    ],
    revenue: "€100K+ cumulative by December",
  },
];

const hamzaTasks = [
  {
    phase: "Now — March–April",
    tasks: [
      "Deliver Pizza Roma website (deadline: Apr 2)",
      "Review Pricing v3 spec and answer 17 questions",
      "Create tarek@feen.be email",
      "Keep Synq sharp — every project is a case study",
    ],
  },
  {
    phase: "Phase 1 — April–May",
    tasks: [
      "Deliver first Synq AI Sprint (Tarek sells, Hamza builds)",
      "Deliver agency projects as they come in",
      "Feen: fix paywall, implement new pricing tiers when capacity allows",
    ],
  },
  {
    phase: "Phase 2 — June–August",
    tasks: [
      "Scale Synq delivery (2-3 parallel projects)",
      "Feen: event tracking, system consolidation",
      "Start building AI Partner deliverables (monthly retainer work)",
    ],
  },
  {
    phase: "Phase 3 — Sep–Dec (if €50K hit)",
    tasks: [
      "Plan transition from current contract",
      "Go full-time on PixAzul.ia",
      "Scale Synq for larger Integration deals",
      "Feen: Mistral OCR, mobile app, Exact Online integration",
    ],
  },
];

const fallbacks = [
  { label: "Month 3 (June) — checkpoint.", text: "If insufficient traction, reassess strategy. Adjust, don't quit." },
  { label: "Month 6 (September) — decision point.", text: "If €50K not hit, Tarek returns to full-time. PixAzul.ia continues as side project. No hard feelings." },
  { label: "Hamza's risk is capped.", text: "€10K gift, no repayment regardless of outcome. He doesn't leave his contract until the numbers prove it works." },
  { label: "No bridges burned.", text: "AREMIS is part-time, not resigned. Tarek can scale back up anytime." },
];

/* ── components ──────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-medium text-brand">{children}</p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
      {children}
    </h2>
  );
}

/* ── page ────────────────────────────────────────────────────────── */

export default function StrategyPlan() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── Hero ─── */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium text-brand">
          PixAzul.ia — Internal
        </p>
        <h1 className="mb-6 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl md:text-6xl">
          The Plan. The Numbers.
          <br />
          The Bet.
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-[1.7] text-muted-foreground">
          Everything you need to know about the PixAzul.ia transition — where we
          are, where we&apos;re going, and what it takes to get there.
        </p>
      </section>

      {/* ─── Section 1: The Transition ─── */}
      <section className="bg-surface py-24 px-6 md:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>The transition</SectionLabel>
          <H2>What&apos;s changing</H2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-background p-7 shadow-sm ring-1 ring-border">
              <h3 className="mb-3 font-semibold">Tarek</h3>
              <ul className="space-y-2 text-sm leading-[1.7] text-muted-foreground">
                <li>Part-time at AREMIS starting April (Mon/Wed/Fri)</li>
                <li>Tue/Thu + mornings/evenings + weekends = full-time PixAzul.ia</li>
                <li>Synq is the engine — agency speed with a 2-person team</li>
              </ul>
            </div>
            <div className="rounded-xl bg-background p-7 shadow-sm ring-1 ring-border">
              <h3 className="mb-3 font-semibold">Hamza</h3>
              <ul className="space-y-2 text-sm leading-[1.7] text-muted-foreground">
                <li>Continues full-time at current contract</li>
                <li>Evenings + weekends = 15-25h/week on PixAzul.ia</li>
                <li>Transitions full-time once €50K trigger is hit</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-brand/20 bg-brand-muted p-7">
            <h3 className="mb-3 font-semibold text-brand">
              Financial safety net
            </h3>
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <span className="font-mono text-lg font-semibold">€6,000/mo</span>
                <p className="mt-0.5 text-muted-foreground">Tarek&apos;s AREMIS income (3 days × €500/day)</p>
              </div>
              <div>
                <span className="font-mono text-lg font-semibold">€10,000</span>
                <p className="mt-0.5 text-muted-foreground">Hamza&apos;s gift — pay-it-forward, no strings</p>
              </div>
              <div>
                <span className="font-mono text-lg font-semibold">€10,000/mo</span>
                <p className="mt-0.5 text-muted-foreground">Azulia company burn (includes Tarek&apos;s salary)</p>
              </div>
              <div>
                <span className="font-mono text-lg font-semibold">~2.5 months</span>
                <p className="mt-0.5 text-muted-foreground">Runway with AREMIS income + gift, no PixAzul.ia revenue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Revenue Lines ─── */}
      <section className="py-24 px-6 md:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Revenue lines</SectionLabel>
          <H2>Four ways we make money</H2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {revenueCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-xl bg-surface p-7 transition-shadow hover:shadow-sm"
              >
                <span className="mb-2 text-xs font-medium text-brand">
                  {card.label}
                </span>
                <h3 className="mb-4 text-lg font-semibold">
                  {card.title}
                </h3>
                <ul className="flex-1 space-y-1.5 text-sm leading-[1.7] text-muted-foreground">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground italic">
                  {card.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: The Numbers ─── */}
      <section className="bg-surface py-24 px-6 md:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>The numbers</SectionLabel>
          <H2>Revenue projections (April–December 2026)</H2>

          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            {/* Header */}
            <div className="grid grid-cols-3 bg-background text-sm font-semibold text-muted-foreground">
              <div className="px-5 py-3">Revenue Line</div>
              <div className="px-5 py-3 text-center">Realistic</div>
              <div className="px-5 py-3 text-center">Optimistic</div>
            </div>
            {/* Rows */}
            {projections.map((row) => (
              <div
                key={row.line}
                className="grid grid-cols-3 border-t border-border bg-background text-sm"
              >
                <div className="px-5 py-3">{row.line}</div>
                <div className="px-5 py-3 text-center font-mono text-muted-foreground">
                  {row.realistic}
                </div>
                <div className="px-5 py-3 text-center font-mono text-muted-foreground">
                  {row.optimistic}
                </div>
              </div>
            ))}
            {/* Totals */}
            <div className="grid grid-cols-3 border-t border-brand/30 bg-brand-dark text-sm font-semibold text-brand-foreground">
              <div className="px-5 py-3">Total</div>
              <div className="px-5 py-3 text-center font-mono">
                €116,000
              </div>
              <div className="px-5 py-3 text-center font-mono">
                €208,500
              </div>
            </div>
          </div>

          {/* Downside */}
          <div className="mt-6 rounded-xl bg-background p-5 text-sm ring-1 ring-border">
            <span className="font-semibold">
              Downside scenario:
            </span>{" "}
            <span className="text-muted-foreground">
              2 Sprints (€25K) + 1 Integration (€27.5K) + 8 agency projects
              (€20K) + recurring (€5K) ={" "}
              <span className="font-mono font-semibold text-foreground">
                €77,500
              </span>{" "}
              — still past the €50K trigger.
            </span>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Milestones ─── */}
      <section className="py-24 px-6 md:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>The roadmap</SectionLabel>
          <H2>Milestones</H2>

          <div className="relative mt-10">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.date} className="relative pl-10">
                  {/* Node */}
                  <div
                    className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                      m.highlight
                        ? "border-brand bg-brand-muted"
                        : "border-muted-foreground/30 bg-surface"
                    }`}
                  />

                  <span
                    className={`text-xs font-semibold ${
                      m.highlight ? "text-brand" : "text-muted-foreground"
                    }`}
                  >
                    {m.date}
                  </span>
                  <h3
                    className={`mt-1 text-lg font-semibold ${
                      m.highlight ? "text-brand" : ""
                    }`}
                  >
                    {m.title}
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm leading-[1.7] text-muted-foreground">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    {m.revenue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: The Trigger ─── */}
      <section className="py-24 px-6 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brand/20 bg-brand-muted p-10 text-center">
            <SectionLabel>The trigger</SectionLabel>
            <h2 className="mb-2 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              €50K cumulative revenue
            </h2>
            <p className="mb-8 text-lg text-brand">
              = Hamza leaves his contract
            </p>

            <div className="grid gap-4 text-left text-sm sm:grid-cols-2">
              <div className="rounded-xl bg-background p-5 ring-1 ring-border">
                <span className="font-mono text-xl font-semibold">July 2026</span>
                <p className="mt-1 text-muted-foreground">Realistic projection — month 4</p>
              </div>
              <div className="rounded-xl bg-background p-5 ring-1 ring-border">
                <span className="font-mono text-xl font-semibold">September 2026</span>
                <p className="mt-1 text-muted-foreground">Downside projection — month 6</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Pre-agreed, measurable, no ambiguity. If month 6 passes without
              traction → Tarek returns full-time, PixAzul.ia continues as side
              project.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 6: Hamza's Role ─── */}
      <section className="bg-surface py-24 px-6 md:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Your role</SectionLabel>
          <H2>What Hamza needs to do</H2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {hamzaTasks.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-xl bg-background p-7 shadow-sm ring-1 ring-border"
              >
                <h3 className="mb-4 text-sm font-semibold text-brand">
                  {phase.phase}
                </h3>
                <ul className="space-y-2.5 text-sm leading-[1.7] text-muted-foreground">
                  {phase.tasks.map((task) => (
                    <li key={task} className="flex gap-3">
                      <span className="mt-1 block h-4 w-4 shrink-0 rounded border border-border" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 7: Fallback Rules ─── */}
      <section className="py-24 px-6 md:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>If it doesn&apos;t work</SectionLabel>
          <H2>Fallback rules</H2>

          <div className="mt-10 space-y-4">
            {fallbacks.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-surface p-5"
              >
                <span className="font-semibold">{item.label}</span>{" "}
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer CTA ─── */}
      <section className="bg-brand-dark py-24 px-6 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] text-brand-foreground sm:text-4xl">
            Let&apos;s do this.
          </h2>
          <p className="mb-10 text-brand-foreground/60">
            Review the numbers. Ask the hard questions. Then let&apos;s build.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://www.notion.so/330586b52a338166b0ebfe01d60b31ff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-foreground px-6 py-3 text-sm font-semibold text-brand-dark transition-opacity hover:opacity-90"
            >
              Pricing v3 Spec
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-foreground/20 px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-foreground/10"
            >
              Full Strategy Doc
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
