import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const KEY = "cv_intro_seen_v1";

/**
 * First-visit intro: cream curtain wipes from top, oversized Fraunces wordmark
 * scales in and out, then content reveals beneath. Skipped on return visits
 * via sessionStorage, and on prefers-reduced-motion.
 */
export function IntroReveal() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const seen = typeof window !== "undefined" && window.sessionStorage.getItem(KEY);
    if (seen) {
      setShow(false);
      return;
    }
    setShow(true);
    const t = window.setTimeout(() => {
      window.sessionStorage.setItem(KEY, "1");
      setShow(false);
    }, 1900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  if (show === null || show === false) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-background"
          aria-hidden="true"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, hsl(30 92% 56% / 0.18), transparent 50%), radial-gradient(circle at 70% 60%, hsl(192 80% 32% / 0.18), transparent 55%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative px-6 text-center"
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-foreground/50">
              Picture Perfect Health, LLC
            </p>
            <h1 className="font-serif text-6xl font-semibold leading-none tracking-tighter text-foreground sm:text-8xl md:text-[10rem]">
              ChiroVision
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-foreground/30" />
            <p className="mt-4 font-serif text-base italic text-foreground/60 sm:text-lg">
              Forty years at the table.
            </p>
          </motion.div>

          {/* Bottom progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1] }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-accent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
