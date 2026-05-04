import { motion } from "framer-motion";
import { howItWorksSteps } from "@/data/howItWorks";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/shared/Reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps from sign-up to first scan."
            description="No installation. No IT calls. No multi-day onboarding."
          />
        </Reveal>

        <Stagger className="relative mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3" stagger={0.12}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
          />
          {howItWorksSteps.map((step) => (
            <motion.div key={step.number} variants={staggerItem} className="relative">
              <div className="font-serif text-6xl font-semibold text-primary/15">
                {step.number}
              </div>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
