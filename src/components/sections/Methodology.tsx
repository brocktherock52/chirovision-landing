import { Lock, Cpu, Stethoscope, FileLock2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/shared/Reveal";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Lock,
    title: "Local-only image processing",
    body: "Every DICOM decode, overlay computation, and annotation happens inside the chiropractor's own browser sandbox. The ChiroVision servers never see, store, or back up patient images. This is the foundation of our HIPAA-aware design.",
  },
  {
    icon: Cpu,
    title: "Browser-native rendering",
    body: "ChiroVision runs on WebGL, WebAssembly, and the browser's native canvas pipeline. No installer, no IT support call, no plug-ins to maintain. It works on Windows, Mac, Chromebook, and Linux equally.",
  },
  {
    icon: Stethoscope,
    title: "Clinical logic from 40 years at the table",
    body: "Every measurement, reference angle, and patient-education visualization was specified by Dr. Eric Hal Feintuch, D.C., CCSD, after tens of thousands of films read and marked by hand. The software reflects how chiropractors actually read films.",
  },
  {
    icon: FileLock2,
    title: "Authorize.Net PCI DSS Level 1 payments",
    body: "Subscription payments are processed by Authorize.Net through Picture Perfect Health, LLC's merchant account. Your card never touches our servers. Cancel or change methods at any time through the patient portal.",
  },
];

/**
 * Methodology / About section. Provides E-E-A-T signals for search engines
 * (experience, expertise, authority, trust) and gives buyers the structural
 * reassurance they need before sharing patient data with a new tool.
 */
export function Methodology() {
  return (
    <section id="methodology" className="bg-muted/30 py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Methodology"
            title="How ChiroVision keeps patient data on your computer."
            description="Four structural commitments that separate ChiroVision from cloud-stored EHR systems. Each one is a deliberate design choice, not a configuration toggle."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" stagger={0.07}>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} variants={staggerItem}>
                <Card className="h-full p-7 shadow-soft transition-all hover:border-primary/30">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            ChiroVision is operated by Picture Perfect Health, LLC, founded in 2006 by
            Dr. Eric Hal Feintuch, D.C., CCSD. Forty years of chiropractic practice
            informs every clinical decision in the platform.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
