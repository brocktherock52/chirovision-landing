import { motion, useReducedMotion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { faqs } from "@/data/faq";

/**
 * FAQ rendered as a chat-thread between a patient and Dr. Eric. Each Q is a
 * right-aligned bubble in cream, each A is a left-aligned bubble in ink with
 * a small doctor avatar. Reveals progressively on scroll.
 */
export function FAQ() {
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="relative overflow-hidden bg-muted/40 py-24 sm:py-32">
      {/* Background gradient orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 -z-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-1/4 -z-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="Office hours"
            title="A conversation with the doctor."
            description="Real questions Dr. Eric hears about ChiroVision, answered the way he answers patients."
          />
        </Reveal>

        <div className="mt-16 space-y-8">
          {faqs.map((faq, idx) => (
            <ChatRow
              key={idx}
              index={idx}
              question={faq.question}
              answer={faq.answer}
            />
          ))}

          {/* Live typing indicator at the end for editorial polish */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3"
          >
            <DoctorAvatar />
            <div className="rounded-2xl rounded-tl-md border border-foreground/10 bg-card px-5 py-4 shadow-soft">
              <div className="flex items-center gap-1.5">
                <Dot delay={0} />
                <Dot delay={0.15} />
                <Dot delay={0.3} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Have another question. Ask at{" "}
                <a
                  href="mailto:support@chirovision.com"
                  className="font-semibold text-primary hover:underline"
                  data-cursor="link"
                >
                  support@chirovision.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChatRow({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const stagger = Math.min(index * 0.04, 0.2);

  return (
    <div className="space-y-3">
      {/* Patient question: right-aligned cream bubble */}
      <motion.div
        className="flex justify-end"
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: 30, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: stagger, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-foreground/10 bg-card px-5 py-3.5 shadow-soft sm:max-w-[75%]">
          <p className="font-serif text-base text-foreground sm:text-lg">{question}</p>
        </div>
      </motion.div>

      {/* Doctor answer: left-aligned ink bubble with avatar */}
      <motion.div
        className="flex items-start gap-3"
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: -30, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: stagger + 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <DoctorAvatar />
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-foreground px-5 py-4 text-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] sm:max-w-[75%]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-background/60">
            Dr. Eric Hal Feintuch . D.C., CCSD
          </p>
          <p className="mt-1.5 text-base leading-relaxed sm:text-[17px]">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
}

function DoctorAvatar() {
  return (
    <div className="relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-soft">
      <Stethoscope className="h-4 w-4" />
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-muted bg-emerald-500" />
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-2 w-2 rounded-full bg-foreground/40"
      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
