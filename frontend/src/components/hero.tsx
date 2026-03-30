import { ArrowRight } from "lucide-react";

const logos = ["Synco", "Feen", "Pixl"];

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-sm font-medium text-brand">
          AI implementation partner
        </p>

        <h1 className="mb-6 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-7xl">
          AI that{" "}
          <span className="bg-gradient-to-r from-brand to-brand/60 bg-clip-text text-transparent">
            ships.
          </span>
          <br />
          Not AI that slides.
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-[1.7] text-muted-foreground sm:text-xl">
          We build AI systems that automate real work inside your business.
          Scoped in days, live in weeks, owned by your team.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Book a scoping call
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#case-studies"
            className="rounded-xl px-8 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See results
          </a>
        </div>
      </div>

      {/* Trust strip */}
      <div className="mt-20 flex flex-col items-center gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          Trusted by teams building with AI
        </p>
        <div className="flex items-center gap-8">
          {logos.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-tight text-muted-foreground/50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
