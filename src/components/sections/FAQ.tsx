import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { faqs } from "@/data/faq";

/**
 * FAQ as a clean two-column conversation: question label + ink answer block.
 * Dark canvas, hairline rules, mono labels. Linear-style restraint.
 */
export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-canvas py-24 sm:py-32">
      <div className="container relative max-w-4xl">
        <Reveal>
          <SectionHeading
            eyebrow="Office hours"
            title="Real questions, answered the way Dr. Eric answers patients."
            description="Built by chiropractors and radiologists. Operated by a 40-year DC. Patient data never leaves the practitioner's computer."
          />
        </Reveal>

        <div className="mt-16 divide-y hairline border-t hairline">
          {faqs.map((faq, idx) => (
            <Row key={idx} index={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-dim">
          Have another question. Ask at{" "}
          <a
            href="mailto:support@chirovision.com"
            className="font-medium text-teal underline-offset-4 hover:underline"
          >
            support@chirovision.com
          </a>
        </p>
      </div>
    </section>
  );
}

function Row({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2) }}
      className="grid gap-6 py-8 md:grid-cols-[1fr_2fr]"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-teal">
          Q.{String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
          {question}
        </h3>
      </div>
      <p className="text-[17px] leading-relaxed text-dim">{answer}</p>
    </motion.div>
  );
}
