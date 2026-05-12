import { motion, useReducedMotion } from "framer-motion";
import { Award, Lock, ShieldCheck, Stethoscope, FileScan, Mic, Users, Receipt, Sparkles, Activity } from "lucide-react";

const rowOne = [
  { icon: Award, label: "Made by Picture Perfect Health, LLC" },
  { icon: Lock, label: "Local-only image processing" },
  { icon: ShieldCheck, label: "HIPAA-aware design" },
  { icon: Stethoscope, label: "Built by a 40-year practicing DC" },
  { icon: FileScan, label: "DICOM support in the browser" },
];

const rowTwo = [
  { icon: Mic, label: "Voice-biometric authentication" },
  { icon: Users, label: "Patient management included" },
  { icon: Receipt, label: "HCFA 1500 billing built in" },
  { icon: Sparkles, label: "10-day trial. No credit card." },
  { icon: Activity, label: "Range of motion + posture" },
];

/**
 * Editorial double-row marquee with mask gradients on both edges.
 * Top row drifts right-to-left, bottom row drifts left-to-right
 * (slower), for a layered editorial feel.
 */
export function TrustBadgeRow() {
  const reduce = useReducedMotion();

  const mask = {
    maskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
  } as const;

  return (
    <section className="relative isolate overflow-hidden border-y border-foreground/10 bg-muted/40 py-8">
      <div className="space-y-4" style={mask}>
        <MarqueeRow items={rowOne} direction="left" duration={reduce ? 0 : 48} />
        <MarqueeRow items={rowTwo} direction="right" duration={reduce ? 0 : 64} />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: { icon: typeof Award; label: string }[];
  direction: "left" | "right";
  duration: number;
}) {
  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo = direction === "left" ? "-50%" : "0%";

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-10"
        animate={duration > 0 ? { x: [xFrom, xTo] } : undefined}
        transition={duration > 0 ? { duration, ease: "linear", repeat: Infinity } : undefined}
      >
        {[...items, ...items].map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={`${b.label}-${i}`}
              className="flex shrink-0 items-center gap-3 rounded-full border border-foreground/10 bg-card/70 px-5 py-2.5 text-sm backdrop-blur"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap font-medium text-foreground">{b.label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
