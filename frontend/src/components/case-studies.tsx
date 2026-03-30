import { ArrowRight } from "lucide-react";

const cases = [
  {
    title: "Synco",
    subtitle: "Compliance Platform",
    description:
      "A full compliance management platform \u2014 from document intake to automated reporting. Scoped, built, and deployed in under a week.",
    quote:
      "From blank page to production-deployed compliance platform in a single engagement.",
    attribution: "Thomas D., CTO",
    tags: ["Compliance", "Automated reporting", "Live in <1 week"],
    stats: [
      { value: "<1wk", label: "Time to live" },
      { value: "100%", label: "Automated" },
      { value: "0", label: "Ongoing dependency" },
    ],
  },
  {
    title: "Feen",
    subtitle: "AI Accounting SaaS",
    description:
      "Invoice management platform for Belgian SMEs \u2014 OCR processing, government API integrations, and bank connectivity. Now serving paying clients across Belgium.",
    quote:
      "The kind of product that used to take a team of five over six months. We had paying clients in weeks.",
    attribution: "Mehdi A., Founder",
    tags: ["Revenue generating", "Peppol-compliant", "35 paying clients"],
    stats: [
      { value: "\u20ac700", label: "Monthly revenue" },
      { value: "35", label: "Paying clients" },
      { value: "4wk", label: "Time to revenue" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="bg-surface py-24 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium text-brand">
          Results
        </p>
        <h2 className="mb-14 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Shipped. Not pitched.
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {cases.map((c) => (
            <article
              key={c.title}
              className="overflow-hidden rounded-xl border border-border bg-background"
            >
              {/* Stats header bar — brand-dark with white text */}
              <div className="grid grid-cols-3 gap-px bg-brand-dark">
                {c.stats.map((stat) => (
                  <div key={stat.label} className="bg-brand-dark px-5 py-4 text-center">
                    <span className="font-mono text-lg font-semibold text-brand-foreground">
                      {stat.value}
                    </span>
                    <p className="mt-0.5 text-[11px] text-brand-foreground/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="p-7">
                <div className="mb-1 flex items-baseline gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <span className="text-xs font-medium text-muted-foreground">
                    {c.subtitle}
                  </span>
                </div>
                <p className="mb-5 text-sm leading-[1.7] text-muted-foreground">
                  {c.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <blockquote className="border-l-2 border-brand/30 pl-4">
                  <p className="text-sm italic leading-[1.7] text-muted-foreground">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                  <cite className="mt-2 block text-xs font-medium not-italic text-foreground">
                    {c.attribution}
                  </cite>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MidPageCTA() {
  return (
    <section className="bg-brand-dark py-16 px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="text-xl font-semibold tracking-tight text-brand-foreground sm:text-2xl">
            Ready to see what AI can do for your team?
          </h3>
          <p className="mt-2 text-sm text-brand-foreground/70">
            Book a 30-minute scoping call. No commitment, no sales pitch — just
            an honest assessment of what&apos;s possible.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-foreground px-6 py-3 text-sm font-semibold text-brand-dark transition-opacity hover:opacity-90"
        >
          Book a scoping call
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
