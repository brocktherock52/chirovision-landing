import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  fadeWidth?: number;
}

/**
 * Edge-faded infinite marquee. Pauses on hover via group-hover.
 * Renders children twice to seam-loop, like Vercel/Stripe customer strips.
 */
export function Marquee({ children, speed = 40, className, fadeWidth = 80 }: MarqueeProps) {
  const reduce = useReducedMotion();
  const duration = Math.max(8, 80 / Math.max(speed, 1) * 30);

  const mask = {
    maskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
    WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
  } as const;

  if (reduce) {
    return (
      <div className={cn("group relative w-full overflow-hidden", className)} style={mask}>
        <div className="flex w-max items-center gap-12 py-4">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("group relative w-full overflow-hidden", className)} style={mask}>
      <motion.div
        className="flex w-max items-center gap-12 py-4 group-hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
