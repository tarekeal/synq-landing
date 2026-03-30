import { Search, Wrench, Rocket, Headphones } from "lucide-react";

const steps = [
  {
    icon: Search,
    week: "Week 0",
    title: "Audit & scope",
    description:
      "We audit your process and define what success looks like. Clear deliverables, clear timeline, clear cost \u2014 before you commit.",
  },
  {
    icon: Wrench,
    week: "Week 1\u20132",
    title: "Build & iterate",
    description:
      "We build and iterate fast. You see real progress daily \u2014 not status updates, working software you can test.",
  },
  {
    icon: Rocket,
    week: "Week 3",
    title: "Go live",
    description:
      "Your system goes live on your infrastructure. Monitoring, alerting, and documentation included from day one.",
  },
  {
    icon: Headphones,
    week: "Week 4+",
    title: "Handover & support",
    description:
      "Your team takes over with full documentation and training. We stay available for questions and optimization.",
  },
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className="py-24 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-brand">
            Engagement model
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            From problem to production in weeks
          </h2>
          <p className="leading-[1.7] text-muted-foreground">
            A clear, four-phase process. You know exactly what happens, when, and
            what it costs at every step.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col bg-background p-7"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                <step.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="mb-1 text-xs font-medium text-brand">
                {step.week}
              </span>
              <h3 className="mb-2 text-base font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-[1.7] text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
