import { Award, Lock, ShieldCheck, Stethoscope, FileScan, Mic, Users, Receipt } from "lucide-react";
import { Marquee } from "@/components/shared/Marquee";

const badges = [
  { icon: Award, label: "Made by Picture Perfect Health, LLC" },
  { icon: Lock, label: "Local-only image processing" },
  { icon: ShieldCheck, label: "HIPAA-aware design" },
  { icon: Stethoscope, label: "Built by a 40-year practicing DC" },
  { icon: FileScan, label: "DICOM support in the browser" },
  { icon: Mic, label: "Voice-biometric authentication" },
  { icon: Users, label: "Patient management included" },
  { icon: Receipt, label: "HCFA 1500 billing built in" },
];

export function TrustBadgeRow() {
  return (
    <section className="border-y border-border bg-muted/30 py-6">
      <Marquee speed={36} fadeWidth={120}>
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className="flex shrink-0 items-center gap-3 px-2 text-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap font-medium text-foreground">{b.label}</span>
              <span className="ml-6 text-foreground/20">.</span>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
