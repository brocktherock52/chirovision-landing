import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function initial(name: string) {
  return name.replace(/^Dr\.\s+/i, "").trim().charAt(0).toUpperCase();
}

/**
 * Single anchor pull-quote at center, dark canvas, teal accent.
 * Linear-style restraint, no marquees, no gradient blobs.
 */
export function TestimonialStrip() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
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
    const id = window.setInterval(next, 8500);
    return () => window.clearInterval(id);
  }, [next, paused, reduce]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y hairline bg-canvas py-28 sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle teal radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-teal-radial opacity-50"
      />

      <div className="container relative">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
          Field notes . Chiropractors on ChiroVision
        </p>

        <motion.div
          className="mx-auto max-w-5xl"
          style={reduce ? undefined : { y: quoteY }}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-center font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[64px]"
            >
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <motion.div
            className="mt-14 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-px w-12 bg-white/15" />
            <motion.div
              layoutId="testimonial-avatar"
              className="flex h-12 w-12 items-center justify-center rounded-full border hairline-strong bg-white/[0.04] font-mono text-base font-medium text-teal"
            >
              {initial(t.author)}
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-medium text-ink">{t.author}</p>
              <p className="mt-0.5 text-xs text-dim">
                {t.practice ? `${t.practice} . ${t.location}` : t.location}
              </p>
            </div>
            <div className="h-px w-12 bg-white/15" />
          </motion.div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border hairline-strong bg-white/[0.03] text-dim transition hover:bg-white/[0.06] hover:text-ink"
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
                    i === active ? "w-10 bg-teal" : "w-1.5 bg-white/15"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border hairline-strong bg-white/[0.03] text-dim transition hover:bg-white/[0.06] hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
