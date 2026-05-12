import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";

export function FoundersLetter() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-3xl border border-foreground/10 bg-card/80 p-8 shadow-soft backdrop-blur sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              A letter from the founder
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
              I built ChiroVision because nobody else was going to.
            </h2>

            <div className="prose prose-neutral mt-6 max-w-none font-serif text-lg leading-relaxed text-foreground/85">
              <p>
                I have been at the table for forty years. I have read tens of thousands of films,
                marked them with my own pencil, sat next to patients and shown them what their
                spine is actually doing. For most of that time the software I had to use was
                either built by engineers who never saw a patient, or it lived on a single
                exam-room computer and could not be trusted with anything sensitive. So I built
                the tool I wanted. Local-only image processing. Real measurements. A workflow
                that respects how chiropractors actually read films. A billing form that does
                not make you switch tabs. If it helps one of your patients understand their
                care plan, my forty years were worth it.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-serif text-lg font-semibold text-primary-foreground shadow-soft">
                EF
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-foreground">
                  Dr. Eric Hal Feintuch, D.C., CCSD
                </p>
                <p className="text-xs text-muted-foreground">
                  Founder, Picture Perfect Health, LLC
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
