import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { howItWorksSteps } from "@/data/howItWorks";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 25%"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 100, damping: 22, mass: 0.3 });

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

        <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
          {/* Vertical rail track */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-7 top-2 bottom-2 w-px bg-foreground/10 sm:left-8"
          />
          {/* Vertical rail fill, scroll-linked */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-7 top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-primary via-secondary to-accent sm:left-8"
            style={reduce ? { scaleY: 1 } : { scaleY: railScale }}
          />

          <ol className="space-y-12">
            {howItWorksSteps.map((step, i) => (
              <Step key={step.number} step={step} index={i} reduce={!!reduce} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  reduce,
}: {
  step: (typeof howItWorksSteps)[number];
  index: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 30%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
  const numberScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.li
      ref={ref}
      className="relative grid grid-cols-[3.75rem,1fr] items-start gap-5 sm:grid-cols-[4.5rem,1fr]"
      style={reduce ? undefined : { opacity }}
    >
      <motion.div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/10 bg-card font-serif text-xl font-semibold text-primary shadow-soft sm:h-16 sm:w-16 sm:text-2xl"
        style={reduce ? undefined : { scale: numberScale }}
      >
        {step.number}
        <span className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-md" />
      </motion.div>
      <div className="pt-2 sm:pt-3">
        <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {step.description}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
          Step {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </motion.li>
  );
}
