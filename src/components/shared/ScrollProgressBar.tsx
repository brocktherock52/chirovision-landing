import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Thin top-of-page progress bar tied to document scroll.
 * Lives in a portal-friendly fixed position. No layout cost.
 */
export function ScrollProgressBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.2,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-teal via-teal-400 to-amber"
    />
  );
}
