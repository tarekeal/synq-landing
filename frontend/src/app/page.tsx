import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { HowWeWork } from "@/components/how-we-work";
import { Advantage } from "@/components/advantage";
import { CaseStudies, MidPageCTA } from "@/components/case-studies";
import { Capabilities } from "@/components/capabilities";
import { TechStack } from "@/components/tech-stack";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { FooterCTA } from "@/components/footer-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowWeWork />
        <Advantage />
        <CaseStudies />
        <MidPageCTA />
        <Capabilities />
        <TechStack />
        <Pricing />
        <FAQ />
        <FooterCTA />
      </main>
    </>
  );
}
