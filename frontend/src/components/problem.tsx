import { DollarSign, Clock, FileText } from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    title: "Manual processes are bleeding margin",
    description:
      "Your team spends hours on tasks that should take minutes. Every month you delay automation, you pay the same overhead again.",
  },
  {
    icon: Clock,
    title: "Hiring an AI team takes 12+ months",
    description:
      "By the time you recruit, onboard, and ramp an internal team, your competitors have already shipped. The market won\u2019t wait.",
  },
  {
    icon: FileText,
    title: "Consultants deliver decks, not systems",
    description:
      "You\u2019ve spent six figures on strategy. You have the roadmap. What you don\u2019t have is anything running in production.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="bg-surface py-24 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium text-brand">
          The reality
        </p>
        <h2 className="mb-14 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Why most AI initiatives stall
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-xl bg-background p-7 transition-shadow hover:shadow-sm"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted">
                <item.icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mb-2 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.7] text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
