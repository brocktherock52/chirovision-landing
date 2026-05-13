import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Editorial site cursor. A small dot follows the mouse exactly.
 * A bigger ring trails with spring damping. Both expand on hover targets,
 * read `data-cursor="view|drag|click"` to morph into labelled states.
 * Hidden on touch devices and when prefers-reduced-motion.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [variant, setVariant] = useState<"default" | "link" | "view" | "drag">("default");
  const [hidden, setHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const update = () => setIsTouch(mq.matches);
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reduce || isTouch) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = e.target as HTMLElement | null;
      if (!target) return setVariant("default");
      const dataCursor = target.closest("[data-cursor]") as HTMLElement | null;
      if (dataCursor) {
        const v = dataCursor.getAttribute("data-cursor") as typeof variant | null;
        if (v) return setVariant(v);
      }
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      setVariant(interactive ? "link" : "default");
    };
    const onLeave = () => setHidden(true);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, isTouch, x, y]);

  if (reduce || isTouch) return null;

  const sizes = {
    default: { dot: 6, ring: 36, label: "" },
    link: { dot: 4, ring: 56, label: "" },
    view: { dot: 4, ring: 96, label: "View" },
    drag: { dot: 4, ring: 96, label: "Drag" },
  } as const;
  const s = sizes[variant];

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{ width: s.dot, height: s.dot, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
      >
        <motion.div
          animate={{
            width: s.ring,
            height: s.ring,
            opacity: hidden ? 0 : variant === "view" ? 0.95 : variant === "link" ? 0.7 : 0.45,
            backgroundColor:
              variant === "view"
                ? "hsl(30 92% 56%)"
                : variant === "link"
                ? "rgba(255,255,255,0.06)"
                : "transparent",
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 backdrop-blur-[2px]"
        >
          {s.label && (
            <span className="flex h-full w-full items-center justify-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {s.label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
