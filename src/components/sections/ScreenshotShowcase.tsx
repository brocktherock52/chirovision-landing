import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { AssetImage } from "@/components/shared/AssetImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

interface Slide {
  src: string;
  alt: string;
  label: string;
  caption: string;
  meta: string;
}

const SLIDES: Slide[] = [
  {
    src: "/screenshots/dashboard.jpg",
    alt: "ChiroVision main dashboard, every module on one screen",
    label: "Every tool, one workspace",
    caption:
      "Cervical, lumbar, full x-ray, overlay, posture, ROM, image and video compare, DICOM, animations, voice notes, billing. All in a single browser tab.",
    meta: "Dashboard",
  },
  {
    src: "/screenshots/cervical-measurements.jpg",
    alt: "Interactive cervical spine measurements with C2-C7 lordosis and head translation",
    label: "Measurements that match your reading",
    caption:
      "C2-C7 lordosis, head translation, atlas plane, disc height, occiput-atlas, with normal ranges on screen.",
    meta: "Cervical",
  },
  {
    src: "/screenshots/spine-module.jpg",
    alt: "Interactive spine module showing segment by segment translation analysis",
    label: "Segment by segment readout",
    caption:
      "Click pedicles to shift each vertebra, watch translation update instantly, print a clean report.",
    meta: "Spine module",
  },
  {
    src: "/screenshots/overlay-tool.jpg",
    alt: "Overlay tool stacking two films for comparison",
    label: "Compare before and after, frame perfect",
    caption:
      "Stack two films, set opacity, drag, rotate, annotate. Show progress without flipping between tabs.",
    meta: "Overlay",
  },
  {
    src: "/screenshots/dicom-scan.jpg",
    alt: "DICOM scan review side by side in the browser",
    label: "Open DICOM scans in the browser",
    caption:
      "Compare DICOM scan series side by side. No second viewer, no second monitor, no conversion step.",
    meta: "DICOM",
  },
];

function useMotionValueState<T>(mv: MotionValue<T>): T {
  const [val, setVal] = useState<T>(mv.get());
  useEffect(() => {
    const unsub = mv.on("change", (v) => setVal(v));
    return () => unsub();
  }, [mv]);
  return val;
}

export function ScreenshotShowcase() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressIndex = useTransform(scrollYProgress, (v) => {
    const n = SLIDES.length;
    return Math.min(n - 1, Math.max(0, Math.floor(v * n)));
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((SLIDES.length - 1) / SLIDES.length) * 100}%`],
  );

  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="See it in action"
            title="Built by a chiropractor who actually reads and marks his own films."
            description="Every screen exists because a chiropractor needed it during a patient visit, not because a designer thought it would look nice. Reshow your patients their x-rays every week, so they are reminded of the goals you set for their care."
          />
        </Reveal>
      </div>

      {reduce ? (
        <div className="container mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SLIDES.map((s) => (
            <div
              key={s.label}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <AssetImage src={s.src} alt={s.alt} className="aspect-[4/3] object-cover object-top" />
              <div className="p-5">
                <p className="font-serif text-base font-semibold text-foreground">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={sectionRef}
          className="relative mt-10"
          style={{ height: `${SLIDES.length * 100}vh` }}
        >
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="container w-full">
              <div className="grid items-center gap-10 lg:grid-cols-[5fr,7fr]">
                <ActiveCaption progressIndex={progressIndex} />

                <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 shadow-soft">
                  <motion.div
                    className="flex"
                    style={{ x: trackX, width: `${SLIDES.length * 100}%` }}
                  >
                    {SLIDES.map((s) => (
                      <div
                        key={s.label}
                        className="relative flex-shrink-0"
                        style={{ width: `${100 / SLIDES.length}%` }}
                      >
                        <AssetImage
                          src={s.src}
                          alt={s.alt}
                          className="aspect-[4/3] w-full object-cover object-top"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                      </div>
                    ))}
                  </motion.div>

                  <DotIndicator progressIndex={progressIndex} count={SLIDES.length} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ActiveCaption({ progressIndex }: { progressIndex: MotionValue<number> }) {
  const active = useMotionValueState(progressIndex);
  const slide = SLIDES[active] || SLIDES[0];

  return (
    <div className="relative min-h-[260px]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")} . {slide.meta}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.label}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {slide.label}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {slide.caption}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DotIndicator({
  progressIndex,
  count,
}: {
  progressIndex: MotionValue<number>;
  count: number;
}) {
  const active = useMotionValueState(progressIndex);
  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
            i === active ? "w-8 bg-primary" : "w-1.5 bg-foreground/25"
          }`}
        />
      ))}
    </div>
  );
}
