import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AssetImage } from "@/components/shared/AssetImage";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface Callout {
  id: string;
  region: string;
  label: string;
  body: string;
  /** Position of the marker on the film, percentage coords. */
  x: number;
  y: number;
  /** Severity color */
  tone: "teal" | "amber";
  /** Image to show pinned for this step */
  src: string;
  alt: string;
}

const STEPS: Callout[] = [
  {
    id: "cervical",
    region: "Cervical spine",
    label: "C2 to C7. Lordotic curve.",
    body: "The AI measures the lordotic angle from C2 to C7 against a published 30 to 45 degree normal range. Anything under 20 degrees triggers a flag. This is the most actionable single measurement on a chiropractic film.",
    x: 30,
    y: 18,
    tone: "teal",
    src: "/screenshots/cervical-measurements.jpg",
    alt: "ChiroVision interactive cervical spine measurements with C2 to C7 lordosis overlay",
  },
  {
    id: "disc",
    region: "Disc spaces",
    label: "C5-C6 narrowing. Severity high.",
    body: "Disc space height is compared segment to segment. The AI flags asymmetry over 1.2mm and posts a severity score. Patient education renders Phase 0 to Phase 4 disc degeneration on demand.",
    x: 36,
    y: 38,
    tone: "amber",
    src: "/screenshots/disc-degeneration.png",
    alt: "ChiroVision disc degeneration simulator Phase 0 to Phase 4",
  },
  {
    id: "lumbar",
    region: "Lumbar spine",
    label: "Ferguson angle. Sacral base.",
    body: "On lumbar films, the AI overlays the Ferguson angle, sacral base angle, lordotic curve, disc heights, and gravity line. The patient sees the same image their DC sees, with the same overlay, in the same room.",
    x: 50,
    y: 62,
    tone: "teal",
    src: "/screenshots/lumbar-measurements.jpg",
    alt: "ChiroVision interactive lumbar spine measurements with Ferguson angle overlay",
  },
  {
    id: "report",
    region: "Patient-ready report",
    label: "One click. Plain English.",
    body: "Every read produces a HCFA-compatible report and a patient-facing summary. No more handwritten findings on the back of a chart. No more re-explaining the same image at every follow-up.",
    x: 70,
    y: 42,
    tone: "teal",
    src: "/screenshots/dashboard.jpg",
    alt: "ChiroVision dashboard generating a patient-ready report",
  },
];

export function SpineDeepDive() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;
    let cleanup: (() => void) | null = null;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${(STEPS.length - 1) * 100}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self: { progress: number }) => {
            const idx = Math.min(
              STEPS.length - 1,
              Math.max(0, Math.floor(self.progress * STEPS.length)),
            );
            setActive(idx);
          },
        });
      }, containerRef);

      cleanup = () => ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
    })();

    return () => {
      cleanup?.();
      ctx?.revert();
    };
  }, [reduce]);

  const step = STEPS[active];

  // Reduced-motion / mobile fallback: render as a stacked list of cards.
  if (reduce) {
    return (
      <section id="deep-dive" className="bg-canvas py-24 sm:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="How the AI reads a spine"
            title="A closer look at what the model actually sees."
            description="Four measurements, one report. The same overlays that took thirty years of practice to read on paper, rendered live on every film."
          />
          <div className="mt-16 grid gap-8">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className="grid items-center gap-6 border-t hairline pt-8 md:grid-cols-2"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
                    {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} . {s.region}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-ink">{s.label}</h3>
                  <p className="mt-3 leading-relaxed text-dim">{s.body}</p>
                </div>
                <div className="overflow-hidden rounded-xl border hairline">
                  <AssetImage src={s.src} alt={s.alt} className="aspect-[4/3] object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="deep-dive" className="relative bg-canvas">
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="container relative flex h-full items-center">
          {/* Left: text column */}
          <div className="grid w-full items-center gap-10 lg:grid-cols-[5fr_7fr]">
            <div className="relative z-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
                How the AI reads a spine
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
                Take a closer look.
              </h2>

              <div className="mt-10 min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dimmer">
                      {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} . {step.region}
                    </p>
                    <h3
                      className={`mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl ${
                        step.tone === "amber" ? "text-amber" : "text-ink"
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p className="mt-4 max-w-md leading-relaxed text-dim">{step.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step dots */}
              <div className="mt-10 flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      i === active ? "w-10 bg-teal" : "w-1.5 bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: pinned film */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border hairline-strong bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <AssetImage
                      src={step.src}
                      alt={step.alt}
                      className="aspect-[16/11] w-full object-cover"
                    />
                    {/* Floating annotation marker */}
                    <motion.div
                      key={step.id + "-marker"}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="absolute"
                      style={{ left: `${step.x}%`, top: `${step.y}%` }}
                    >
                      <span className="relative flex h-4 w-4">
                        <span
                          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${
                            step.tone === "amber" ? "bg-amber" : "bg-teal"
                          }`}
                        />
                        <span
                          className={`relative inline-flex h-4 w-4 rounded-full border-2 ${
                            step.tone === "amber"
                              ? "border-amber bg-amber/40"
                              : "border-teal bg-teal/40"
                          }`}
                        />
                      </span>
                      <span
                        className={`absolute left-6 top-0 whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm ${
                          step.tone === "amber"
                            ? "border-amber/40 bg-canvas/80 text-amber"
                            : "border-teal/40 bg-canvas/80 text-teal"
                        }`}
                      >
                        {step.region}
                      </span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
