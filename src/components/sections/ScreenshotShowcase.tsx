import { motion } from "framer-motion";
import { AssetImage } from "@/components/shared/AssetImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/shared/Reveal";

const screenshots = [
  {
    src: "/screenshots/dashboard.jpg",
    alt: "ChiroVision main dashboard, every module on one screen",
    label: "Every tool, one workspace",
    caption: "Cervical, lumbar, full x-ray, overlay, posture, ROM, image and video compare, DICOM, animations, voice notes, billing.",
  },
  {
    src: "/screenshots/cervical-measurements.jpg",
    alt: "Interactive cervical spine measurements with C2-C7 lordosis and head translation",
    label: "Measurements that match your reading",
    caption: "C2-C7 lordosis, head translation, atlas plane, disc height, occiput-atlas, with normal ranges on screen.",
  },
  {
    src: "/screenshots/spine-module.jpg",
    alt: "Interactive spine module showing segment by segment translation analysis",
    label: "Segment by segment readout",
    caption: "Click pedicles to shift each vertebra, watch translation update instantly, print a clean report.",
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
              <AssetImage src={s.src} alt={s.alt} className="aspect-[4/3] object-cover object-top" />
              <div className="p-5">
                <p className="font-serif text-base font-semibold text-foreground">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.caption}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
