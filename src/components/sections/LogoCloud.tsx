import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileScan,
  Receipt,
  Stethoscope,
  Globe2,
  Flag,
} from "lucide-react";

const trustSignals = [
  { icon: ShieldCheck, label: "HIPAA-aware" },
  { icon: Lock, label: "Local-only processing" },
  { icon: FileScan, label: "DICOM compatible" },
  { icon: Receipt, label: "HCFA 1500 ready" },
  { icon: Stethoscope, label: "40 years of chiropractic" },
  { icon: Flag, label: "Made in USA" },
  { icon: Globe2, label: "Browser based" },
];

/**
 * Trust strip placed directly under the hero. Replaces the usual customer
 * logo cloud (this is private beta, so no customer logos yet). Communicates
 * the seven structural promises in a single horizontal scan.
 */
export function LogoCloud() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Trust signals"
      className="border-y border-border bg-background py-10 sm:py-12"
    >
      <div className="container">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Built around seven promises
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-7">
          {trustSignals.map((sig, i) => {
            const Icon = sig.icon;
            return (
              <motion.li
                key={sig.label}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold leading-tight text-foreground/80">
                  {sig.label}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
