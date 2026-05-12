import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQ() {
  return (
    <section id="faq" className="bg-muted/30 py-20 sm:py-28">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions about the trial"
          />
        </Reveal>

        <ul className="mt-12 divide-y divide-foreground/10 rounded-2xl border border-foreground/10 bg-card/60 backdrop-blur">
          {faqs.map((faq, idx) => (
            <FaqRow key={idx} question={faq.question} answer={faq.answer} index={idx} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqRow({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(index === 0);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={open}
      >
        <span className="font-serif text-base font-semibold text-foreground sm:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/10",
            open ? "bg-primary/10 text-primary" : "bg-card text-foreground/60",
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6">
              <p className="text-base leading-relaxed text-foreground/80">{answer}</p>

              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span>Was this helpful?</span>
                <button
                  type="button"
                  aria-label="Mark answer as helpful"
                  onClick={() => setFeedback("up")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border border-foreground/10 transition",
                    feedback === "up"
                      ? "bg-primary/10 text-primary"
                      : "bg-card text-foreground/50 hover:text-foreground",
                  )}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Mark answer as not helpful"
                  onClick={() => setFeedback("down")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border border-foreground/10 transition",
                    feedback === "down"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-card text-foreground/50 hover:text-foreground",
                  )}
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </button>
                {feedback && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary"
                  >
                    Thanks for the feedback.
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
