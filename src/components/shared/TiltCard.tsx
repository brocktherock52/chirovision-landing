import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on either axis. */
  max?: number;
}

/**
 * 3D tilt card. Tracks mouse within bounds and rotates a perspective layer.
 * Also exposes a CSS-variable spotlight that follows the cursor.
 * Reduced-motion users get a flat, non-interactive card.
 */
export function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [`${max}deg`, `-${max}deg`]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [`-${max}deg`, `${max}deg`]);

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotBg = useMotionTemplate`radial-gradient(220px circle at ${spotX}% ${spotY}%, hsl(var(--accent) / 0.18), transparent 60%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    spotX.set(px * 100);
    spotY.set(py * 100);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    spotX.set(50);
    spotY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={reduce ? undefined : { background: spotBg }}
      />
      <div style={reduce ? undefined : { transform: "translateZ(24px)" }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}
