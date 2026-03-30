import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly can we start?",
    answer:
      "Most engagements begin within 1\u20132 weeks of the initial call. We start with a focused scoping session, align on deliverables, and get building. No drawn-out discovery phases.",
  },
  {
    question: "How do you handle our data?",
    answer:
      "Your data stays in your environment. We deploy on your infrastructure with full audit trails and access controls. We\u2019re happy to work within your compliance and security framework.",
  },
  {
    question: "Does this replace our dev team?",
    answer:
      "Not at all. We build systems your team takes over. Every project includes full documentation, training, and handover so your developers can maintain and extend what we deliver.",
  },
  {
    question: "What if we already have an AI vendor?",
    answer:
      "We work alongside your existing tools and infrastructure. We\u2019re not selling you a platform \u2014 we\u2019re building on what you already have.",
  },
  {
    question: "What\u2019s the minimum engagement?",
    answer:
      "Our AI Sprint starts at \u20ac10K for a 2\u20133 week engagement. If your challenge can\u2019t be solved in that timeframe, we\u2019ll tell you upfront and recommend the right scope.",
  },
  {
    question: "Where are you based?",
    answer:
      "Brussels, Belgium. We work with companies across Europe, primarily in the Benelux region, though we\u2019re open to projects anywhere.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-surface py-24 px-6 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-medium text-brand">
          Frequently asked questions
        </p>
        <h2 className="mb-14 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Common questions
        </h2>

        <Accordion defaultValue={[0, 1]} className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={i}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-[1.7] text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
