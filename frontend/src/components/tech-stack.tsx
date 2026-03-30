import { Check } from "lucide-react";

const comparisons = [
  {
    theirs: "Strategy decks and roadmaps",
    ours: "Working systems in production",
  },
  {
    theirs: "3\u20136 month timelines",
    ours: "2\u20134 weeks to live",
  },
  {
    theirs: "Vendor lock-in and platform fees",
    ours: "You own everything \u2014 code, infra, IP",
  },
  {
    theirs: "Black box with limited visibility",
    ours: "Full documentation and source access",
  },
  {
    theirs: "Ongoing dependency on the vendor",
    ours: "Your team maintains it independently",
  },
];

export function TechStack() {
  return (
    <section className="bg-surface py-24 px-6 md:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-medium text-brand">
          The difference
        </p>
        <h2 className="mb-14 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          How we compare
        </h2>

        <div className="overflow-hidden rounded-xl border border-border">
          {/* Header */}
          <div className="grid grid-cols-2">
            <div className="border-b border-r border-border bg-surface px-6 py-4">
              <span className="text-sm font-semibold text-muted-foreground">
                Typical AI consultancy
              </span>
            </div>
            <div className="border-b border-border bg-brand-muted px-6 py-4">
              <span className="text-sm font-semibold text-brand">
                Synq
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={row.theirs}
              className={`grid grid-cols-2 ${
                i < comparisons.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3 border-r border-border px-6 py-4">
                <span className="text-sm text-muted-foreground/60">
                  {row.theirs}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-brand-muted/50 px-6 py-4">
                <Check className="h-4 w-4 shrink-0 text-brand" />
                <span className="text-sm font-medium text-foreground">
                  {row.ours}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
