import { motion } from "framer-motion";
import { AssetImage } from "@/components/shared/AssetImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/shared/Reveal";

const tour = [
  {
    src: "/screenshots/overlay-tool.jpg",
    title: "Image overlay tool",
    body: "Stack two films, set opacity, drag, rotate, and annotate. Show progress without flipping between tabs.",
  },
  {
    src: "/screenshots/overlay-upload.jpg",
    title: "Bottom and top layer upload",
    body: "Upload JPG, PNG, GIF, or DICOM straight into the overlay engine, no conversion step.",
  },
  {
    src: "/screenshots/dicom-scan.jpg",
    title: "DICOM scan review",
    body: "Open and compare DICOM scan series side by side in the browser. No second viewer, no second monitor.",
  },
  {
    src: "/screenshots/lumbar-measurements.jpg",
    title: "Lumbar spine measurements",
    body: "L1 to L5 lordosis, Ferguson angle, sacral base angle, L5-S1 disc angle, gravity line, George's line, pelvic tilt, disc heights, all overlaid on the film.",
  },
  {
    src: "/screenshots/image-library.jpg",
    title: "Central image library",
    body: "Patient images stored locally, accessible across every ChiroVision module, with optional local-network sync between exam rooms.",
  },
  {
    src: "/screenshots/voice-auth.jpg",
    title: "Voice biometric authentication",
    body: "HIPAA-aware voice print sign in. Hands free access to protected patient data, no shared passwords on the front desk computer.",
  },
  {
    src: "/screenshots/billing-hcfa.jpg",
    title: "HCFA 1500 billing",
    body: "Patient ledger, claims, payments, adjustments, write offs, and one-click HCFA 1500 export inside the same workflow.",
  },
  {
    src: "/screenshots/disc-degeneration.png",
    title: "Disc degeneration simulator",
    body: "Phase 0 healthy through Phase 4 critical, with weight loading and disc height visualized. Patient education that lands.",
  },
];

export function ProductTour() {
  return (
    <section id="tour" className="py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="The full product tour"
            title="Eight more screens, all the way to the billing form."
            description="ChiroVision is not a single screenshot. Here is what your day inside the software actually looks like, from the first image upload through the HCFA 1500 export."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {tour.map((t) => (
            <motion.div
              key={t.title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <AssetImage
                  src={t.src}
                  alt={t.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <p className="font-serif text-base font-semibold text-foreground">{t.title}</p>
                <p className="text-sm text-muted-foreground">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
