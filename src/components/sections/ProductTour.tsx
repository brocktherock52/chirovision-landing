import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { AssetImage } from "@/components/shared/AssetImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Lightbox } from "@/components/shared/Lightbox";

interface TourItem {
  src: string;
  title: string;
  alt: string;
  body: string;
  span: string; // tailwind grid-span string
}

/**
 * Bento layout: one hero card, two medium, the rest small.
 * Hover-lift, glow, and click-to-lightbox on every card.
 */
const tour: TourItem[] = [
  {
    src: "/screenshots/overlay-tool.jpg",
    title: "Image overlay tool",
    alt: "ChiroVision overlay tool stacking two chiropractic films with adjustable opacity and rotation",
    body: "Stack two films, set opacity, drag, rotate, and annotate. Show progress without flipping between tabs.",
    span: "md:col-span-3 md:row-span-2",
  },
  {
    src: "/screenshots/dicom-scan.jpg",
    title: "DICOM scan review",
    alt: "ChiroVision DICOM scan review interface comparing two scan series side by side in the browser",
    body: "Open and compare DICOM scan series side by side in the browser. No second viewer, no second monitor.",
    span: "md:col-span-3",
  },
  {
    src: "/screenshots/lumbar-measurements.jpg",
    title: "Lumbar spine measurements",
    alt: "Interactive lumbar spine measurement overlay with Ferguson angle, sacral base angle, and disc heights",
    body: "L1 to L5 lordosis, Ferguson angle, sacral base angle, disc heights, gravity line, all overlaid on the film.",
    span: "md:col-span-3",
  },
  {
    src: "/screenshots/billing-hcfa.jpg",
    title: "HCFA 1500 billing",
    alt: "ChiroVision HCFA 1500 billing module with patient ledger, claims, payments, and adjustments",
    body: "Patient ledger, claims, payments, adjustments, write offs, and one-click HCFA 1500 export.",
    span: "md:col-span-2",
  },
  {
    src: "/screenshots/voice-auth.jpg",
    title: "Voice biometric auth",
    alt: "ChiroVision voice biometric authentication screen for HIPAA-aware hands free sign in",
    body: "HIPAA-aware voice print sign in. Hands free access, no shared passwords.",
    span: "md:col-span-2",
  },
  {
    src: "/screenshots/disc-degeneration.png",
    title: "Disc degeneration simulator",
    alt: "ChiroVision disc degeneration simulator showing Phase 0 through Phase 4 spinal disc health for patient education",
    body: "Phase 0 to Phase 4 disc health. Patient education that lands.",
    span: "md:col-span-2",
  },
  {
    src: "/screenshots/image-library.jpg",
    title: "Central image library",
    alt: "ChiroVision central patient image library, locally stored and shared across exam rooms",
    body: "Patient images stored locally, accessible across every ChiroVision module.",
    span: "md:col-span-3",
  },
  {
    src: "/screenshots/overlay-upload.jpg",
    title: "Bottom and top layer upload",
    alt: "ChiroVision overlay upload screen, importing JPG, PNG, GIF, and DICOM scans",
    body: "Upload JPG, PNG, GIF, or DICOM into the overlay engine. No conversion step.",
    span: "md:col-span-3",
  },
];

export function ProductTour() {
  const reduce = useReducedMotion();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <section id="tour" className="bg-background py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="The full product tour"
            title="Eight more screens, all the way to the billing form."
            description="ChiroVision is not a single screenshot. Here is what your day inside the software actually looks like, from the first image upload through the HCFA 1500 export."
          />
        </Reveal>

        {/* Bento grid */}
        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 md:grid-cols-6 md:gap-5">
          {tour.map((t, i) => (
            <motion.button
              type="button"
              onClick={() => setLightboxIdx(i)}
              key={t.title}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: (i % 4) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduce ? undefined : { y: -6 }}
              className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition-all hover:border-primary/30 hover:shadow-[0_30px_60px_-20px_rgba(8,145,178,0.35)] ${t.span}`}
              data-cursor="view"
            >
              <div className="relative h-3/5 overflow-hidden bg-muted">
                <AssetImage
                  src={t.src}
                  alt={t.alt}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent" />
                <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <p className="font-serif text-lg font-semibold tracking-tight text-foreground">
                  {t.title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>

              {/* Hover glow overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-primary/0 via-accent/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:via-accent/10 group-hover:opacity-100"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIdx !== null}
        src={lightboxIdx !== null ? tour[lightboxIdx].src : null}
        alt={lightboxIdx !== null ? tour[lightboxIdx].alt : undefined}
        caption={lightboxIdx !== null ? `${tour[lightboxIdx].title}. ${tour[lightboxIdx].body}` : undefined}
        onClose={() => setLightboxIdx(null)}
      />
    </section>
  );
}
