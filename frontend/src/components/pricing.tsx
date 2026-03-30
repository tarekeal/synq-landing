import { ArrowRight, Check } from "lucide-react";

const tiers = [
  {
    name: "AI Sprint",
    price: "\u20ac10K\u2013\u20ac15K",
    duration: "2\u20133 weeks",
    description:
      "One focused automation or AI capability, scoped and delivered to production.",
    features: [
      "Full solution design and build",
      "Deployed on your infrastructure",
      "2 weeks post-launch support",
      "Complete documentation and handover",
    ],
    highlighted: false,
  },
  {
    name: "AI Integration",
    price: "\u20ac20K\u2013\u20ac35K",
    duration: "4\u20136 weeks",
    description:
      "Connect AI across multiple systems and business processes for deeper impact.",
    features: [
      "Everything in Sprint",
      "Dedicated Slack channel",
      "Weekly progress reviews",
      "1 month post-launch support",
    ],
    highlighted: true,
  },
  {
    name: "AI Partner",
    price: "\u20ac5K\u2013\u20ac8K/mo",
    duration: "Ongoing",
    description:
      "Continuous AI capability building. New automations, optimization, and scaling month over month.",
    features: [
      "Monthly delivery cycles",
      "Priority response times",
      "Architecture and strategy reviews",
      "Proactive performance optimization",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium text-brand">
          Pricing
        </p>
        <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Transparent pricing. No surprises.
        </h2>
        <p className="mb-14 leading-[1.7] text-muted-foreground">
          Every engagement starts with scoping. If we can&apos;t solve it in the
          timeframe, we&apos;ll tell you before you spend a euro.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl p-8 transition-shadow hover:shadow-sm ${
                tier.highlighted
                  ? "bg-surface ring-2 ring-brand scale-[1.02]"
                  : "bg-surface"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold tracking-tight">
                {tier.name}
              </h3>
              <div className="mt-3 mb-1">
                <span className="font-mono text-3xl font-semibold text-foreground">
                  {tier.price}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {tier.duration}
              </span>

              <p className="mt-4 mb-6 text-sm leading-[1.7] text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`flex items-center justify-center gap-2 w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-brand text-brand-foreground hover:bg-brand/90"
                    : "bg-background text-foreground ring-1 ring-border hover:bg-background/80"
                }`}
              >
                Scope your project
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
