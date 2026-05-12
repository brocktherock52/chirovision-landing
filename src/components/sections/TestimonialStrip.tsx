import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function initial(name: string) {
  return name.replace(/^Dr\.\s+/i, "").trim().charAt(0).toUpperCase();
}

export function TestimonialStrip() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[active];

  const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(next, 6500);
    return () => window.clearInterval(id);
  }, [next, paused, reduce]);

  return (
    <section
      className="bg-muted/30 py-20 sm:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          What chiropractors are saying
        </p>

        <div className="relative mx-auto max-w-3xl">
          <Quote
            aria-hidden="true"
            className="mx-auto h-10 w-10 text-primary/30"
          />

          <div className="relative min-h-[260px] sm:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: reduce ? 0 : 18, filter: reduce ? "blur(0px)" : "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: reduce ? 0 : -14, filter: reduce ? "blur(0px)" : "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <blockquote className="font-serif text-2xl leading-snug text-foreground sm:text-3xl text-balance">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <motion.div
                    layoutId="testimonial-avatar"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-serif text-lg font-semibold text-primary-foreground shadow-soft"
                  >
                    {initial(t.author)}
                  </motion.div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.practice ? `${t.practice} . ${t.location}` : t.location}
                    </p>
                  </div>
                  <span className="ml-2 hidden items-center gap-0.5 text-amber-500 sm:flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-card text-foreground/70 transition hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    i === active ? "w-8 bg-primary" : "w-1.5 bg-foreground/25"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-card text-foreground/70 transition hover:bg-muted hover:text-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
