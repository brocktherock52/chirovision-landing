import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SplitCharsProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** When `true`, animate as soon as mounted. When `false`, animate when in view. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Optional element rendered after the animated chars (e.g. underline svg). */
  children?: ReactNode;
}

/**
 * Letter-by-letter mask reveal. Each char rises from below a clip mask
 * so it appears to wipe up from a baseline. Preserves spaces as visible
 * gaps. Falls back to a static rendering with prefers-reduced-motion.
 */
export function SplitChars({
  text,
  className,
  charClassName,
  delay = 0,
  duration = 0.85,
  stagger = 0.028,
  immediate = true,
  as = "span",
  children,
}: SplitCharsProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (immediate || reduce) return;
    const el = ref.current;
    if (!el) return;
    // Reveal once when scrolled into view
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "true";
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [immediate, reduce]);

  const words = text.split(" ");
  const Tag = as as any;

  if (reduce) {
    return <Tag className={className}>{text}{children}</Tag>;
  }

  let charIndex = 0;
  return (
    <Tag ref={ref as any} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            const i = charIndex++;
            return (
              <span
                key={i}
                className="relative inline-block overflow-hidden align-baseline"
                aria-hidden="true"
              >
                <motion.span
                  className={`inline-block will-change-transform ${charClassName ?? ""}`}
                  initial={{ y: "110%" }}
                  animate={immediate ? { y: "0%" } : undefined}
                  whileInView={immediate ? undefined : { y: "0%" }}
                  viewport={immediate ? undefined : { once: true, amount: 0.4 }}
                  transition={{
                    duration,
                    delay: delay + i * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      {children}
    </Tag>
  );
}
