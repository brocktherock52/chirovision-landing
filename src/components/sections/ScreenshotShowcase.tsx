import { motion } from "framer-motion";
import { AssetImage } from "@/components/shared/AssetImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/shared/Reveal";

const screenshots = [
  {
    src: "/screenshot-xray.jpg",
    alt: "Interactive cervical X-ray analysis on a clinical desk",
    label: "Interactive X-ray analysis",
  },
  {
    src: "/screenshot-posture.jpg",
    alt: "Posture analysis dashboard reference photo",
    label: "Posture analysis dashboard",
  },
  {
    src: "/screenshot-patient.jpg",
    alt: "Patient management interface used during a consult",
    label: "Patient management interface",
  },
];

export function ScreenshotShowcase() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="See it in action"
            title="Built by a chiropractor who actually reads and marks his own films."
            description="Every screen exists because a chiropractor needed it during a patient visit, not because a designer thought it would look nice. Reshow your patients their x-rays every week, so they are reminded of the goals you set for their care."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {screenshots.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <AssetImage src={s.src} alt={s.alt} className="aspect-video object-cover" />
              <div className="p-4 text-center">
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
