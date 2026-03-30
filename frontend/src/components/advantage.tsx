import { Zap, Lock, ShieldCheck, Users } from "lucide-react";

const stats = [
  {
    metric: "2\u20134 weeks",
    description: "From scoping call to production. What takes agencies 3\u20136 months, we deliver in weeks.",
  },
  {
    metric: "100%",
    description: "Code ownership. No vendor lock-in, no monthly platform fees. The code, infra, and IP are yours.",
  },
  {
    metric: "0",
    description: "Ongoing dependency. Your team maintains it independently with full documentation and training.",
  },
];

const advantages = [
  {
    icon: Zap,
    title: "10x faster delivery",
    description: "Same quality, fraction of the timeline. Real progress daily, not status updates.",
  },
  {
    icon: Lock,
    title: "Built for compliance",
    description: "Full audit trails, governance controls, and data that stays in your environment.",
  },
  {
    icon: ShieldCheck,
    title: "Production-grade from day one",
    description: "Monitoring, alerting, and documentation included. Not a prototype \u2014 a system.",
  },
  {
    icon: Users,
    title: "Your team takes over",
    description: "We build, document, and hand over. Your developers extend it without us.",
  },
];

export function Advantage() {
  return (
    <section className="py-24 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-brand">
            Why Synq
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Built different from every other AI consultancy
          </h2>
          <p className="leading-[1.7] text-muted-foreground">
            We don&apos;t sell strategy. We ship systems you can see, touch, and
            measure from week one.
          </p>
        </div>

        {/* KPI stat cards — filled brand-dark background */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.metric}
              className="rounded-xl bg-brand-dark p-7 text-brand-foreground"
            >
              <span className="font-mono text-3xl font-semibold">
                {item.metric}
              </span>
              <p className="mt-2 text-sm leading-[1.7] text-brand-foreground/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple text advantages with icons */}
        <div className="grid gap-6 sm:grid-cols-2">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl bg-surface p-6"
            >
              <div className="shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted">
                  <item.icon className="h-5 w-5 text-brand" />
                </div>
              </div>
              <div>
                <h3 className="mb-1 font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.7] text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
