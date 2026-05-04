import { motion } from "framer-motion";
import { Award, Lock, ShieldCheck, Stethoscope } from "lucide-react";
import { Stagger, staggerItem } from "@/components/shared/Reveal";

const badges = [
  {
    icon: Award,
    label: "Made by Picture Perfect Health, LLC",
  },
  {
    icon: Lock,
    label: "Local-only image processing, nothing uploaded",
  },
  {
    icon: ShieldCheck,
    label: "HIPAA-aware design",
  },
  {
    icon: Stethoscope,
    label: "Built by a 40-year practicing DC",
  },
];

export function TrustBadgeRow() {
  return (
    <section className="border-y border-border bg-muted/30 py-8">
      <div className="container">
        <Stagger className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                variants={staggerItem}
                className="flex items-center gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-medium text-foreground">{b.label}</span>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
