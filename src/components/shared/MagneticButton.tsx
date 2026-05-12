import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const SPRING = { damping: 18, stiffness: 220, mass: 0.6 };

interface MagneticButtonProps {
  children: ReactNode;
  /** How much of the cursor distance to follow. 0.25 is subtle, 0.5 is strong. */
  distance?: number;
  /** Activation radius in px. Outside this, the button rests at center. */
  radius?: number;
  className?: string;
}

/**
 * Magnetic wrapper. Children remain a normal interactive element.
 * Respects useReducedMotion. Cleans up listeners on unmount.
 */
export function MagneticButton({
  children,
  distance = 0.35,
  radius = 140,
  className,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const strength = 1 - dist / radius;
        x.set(dx * distance * strength);
        y.set(dy * distance * strength);
        setHovering(true);
      } else {
        x.set(0);
        y.set(0);
        setHovering(false);
      }
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
      setHovering(false);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [distance, radius, reduce, x, y]);

  return (
    <motion.div
      ref={ref}
      data-magnetic-hover={hovering ? "true" : "false"}
      className={className}
      style={reduce ? undefined : { x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
