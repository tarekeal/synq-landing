"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export function FooterCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to backend or form service (Tally, Formspree, etc.)
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-brand-dark py-24 px-6 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] text-brand-foreground sm:text-4xl">
          Let&apos;s build something real.
        </h2>
        <p className="mb-12 leading-[1.7] text-brand-foreground/60">
          No pitch decks. No 6-month discovery phases. Tell us what&apos;s
          slowing your team down and we&apos;ll scope a solution.
        </p>

        {submitted ? (
          <div className="rounded-xl bg-brand-foreground/10 p-8">
            <p className="font-medium text-brand-foreground">
              Message received. We&apos;ll get back to you within 24 hours with
              an initial assessment.
            </p>
          </div>
        ) : (
          <div>
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-lg space-y-4 text-left"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm text-brand-foreground/60"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-brand-foreground/20 bg-brand-foreground/10 px-4 py-2.5 text-sm text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-foreground/30 focus:border-brand-foreground/40"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="mb-1.5 block text-sm text-brand-foreground/60"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full rounded-xl border border-brand-foreground/20 bg-brand-foreground/10 px-4 py-2.5 text-sm text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-foreground/30 focus:border-brand-foreground/40"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm text-brand-foreground/60"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-brand-foreground/20 bg-brand-foreground/10 px-4 py-2.5 text-sm text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-foreground/30 focus:border-brand-foreground/40"
                  placeholder="jane@acme.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-brand-foreground/60"
                >
                  What&apos;s slowing your team down?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border border-brand-foreground/20 bg-brand-foreground/10 px-4 py-2.5 text-sm text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-foreground/30 focus:border-brand-foreground/40"
                  placeholder="We manually process 500 invoices/month and need..."
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-foreground px-6 py-3.5 text-sm font-semibold text-brand-dark transition-opacity hover:opacity-90"
              >
                Send message
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* What happens next */}
            <p className="mt-4 text-xs text-brand-foreground/40">
              We review every message personally. Expect a reply within 24 hours
              with an initial assessment — no automated sequences, no sales
              pitch.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center gap-4 border-t border-brand-foreground/10 pt-8">
          <div className="flex gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-foreground/40 transition-colors hover:text-brand-foreground"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="mailto:hello@pixldev.be"
              className="text-brand-foreground/40 transition-colors hover:text-brand-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-brand-foreground/40">
            <p>
              &copy; {new Date().getFullYear()} Synq by Pixl SRL. Brussels,
              Belgium.
            </p>
            <span className="hidden sm:inline">&middot;</span>
            <p>BE 0123.456.789</p>
            <span className="hidden sm:inline">&middot;</span>
            <a href="#" className="underline underline-offset-2 hover:text-brand-foreground/60">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
