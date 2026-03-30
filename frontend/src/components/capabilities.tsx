import {
  FileSearch,
  LayoutDashboard,
  Database,
  ShieldCheck,
  Workflow,
  Sparkles,
} from "lucide-react";

const capabilities = [
  {
    icon: FileSearch,
    title: "Document Processing",
    description:
      "Stop processing invoices and contracts manually. We automate extraction, validation, and routing end to end.",
  },
  {
    icon: LayoutDashboard,
    title: "Internal Tooling",
    description:
      "Give your operations team AI-powered dashboards that surface insights and eliminate busywork.",
  },
  {
    icon: Database,
    title: "Data Pipelines",
    description:
      "Connect your data sources, transform messy inputs into clean outputs, and keep everything in sync automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Automation",
    description:
      "Automate audit trails, validation rules, and regulatory reporting. Stay compliant without the manual overhead.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "Replace the manual workflows your team dreads. Approvals, handoffs, notifications \u2014 all automated.",
  },
  {
    icon: Sparkles,
    title: "Product AI Features",
    description:
      "Add intelligent capabilities to your existing product. Smarter search, recommendations, classification \u2014 whatever moves the needle.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium text-brand">
          What we automate
        </p>
        <h2 className="mb-14 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Real systems solving real problems
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-surface p-7 transition-shadow hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted">
                <item.icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="mb-1.5 font-semibold tracking-tight">
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
