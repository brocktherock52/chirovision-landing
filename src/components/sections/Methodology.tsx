import { Lock, Cpu, Stethoscope, FileLock2 } from "lucide-react";
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
    body: "ChiroVision runs on WebGL, WebAssembly, and the browser's native canvas pipeline. No installer, no IT support call, no plug-ins to maintain. Works on Windows, Mac, Chromebook, and Linux equally.",
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

export function Methodology() {
  return (
    <section id="methodology" className="bg-canvas py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Methodology"
            title="How ChiroVision keeps patient data on your computer."
            description="Four structural commitments that separate ChiroVision from cloud-stored EHR systems. Each is a deliberate design choice, not a configuration toggle."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" stagger={0.07}>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} variants={staggerItem}>
                <div className="h-full rounded-xl border hairline bg-white/[0.02] p-7 transition-all hover:border-teal/30">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border hairline-strong bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-dim">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-dim">
            ChiroVision is operated by Picture Perfect Health, LLC, founded in 2006 by
            Dr. Eric Hal Feintuch, D.C., CCSD. Forty years of chiropractic practice
            informs every clinical decision in the platform.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
