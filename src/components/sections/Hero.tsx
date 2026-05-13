import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Upload, ShieldCheck, Sparkles } from "lucide-react";
import { AssetImage } from "@/components/shared/AssetImage";
import { MagneticButton } from "@/components/shared/MagneticButton";

type ReadStage = "idle" | "loading" | "result";

const SAMPLE_FINDINGS = [
  { ts: "0.4s", text: "Loading DICOM. SOP class CR.", color: "text-dim" },
  { ts: "1.1s", text: "Spine segmentation complete. 24 vertebrae detected.", color: "text-ink" },
  { ts: "1.8s", text: "C2 to C7 lordotic curve. 12 degrees. Reduced.", color: "text-amber" },
  { ts: "2.4s", text: "Disc space narrowing flagged at C5-C6.", color: "text-amber" },
  { ts: "3.0s", text: "Soft tissue silhouette normal. No fracture signs.", color: "text-teal" },
  { ts: "3.4s", text: "Read complete. Confidence 96.2%. Full report paywalled.", color: "text-teal" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<ReadStage>("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const dragRef = useRef<HTMLDivElement>(null);

  const runRead = useCallback(() => {
    setStage("loading");
    setVisibleLines(0);
    // Reveal stage after a short delay
    const t1 = setTimeout(() => setStage("result"), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (stage !== "result") return;
    if (visibleLines >= SAMPLE_FINDINGS.length) return;
    const t = setTimeout(() => setVisibleLines((n) => n + 1), reduce ? 0 : 320);
    return () => clearTimeout(t);
  }, [stage, visibleLines, reduce]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragRef.current) dragRef.current.dataset.over = "true";
  };
  const handleDragLeave = () => {
    if (dragRef.current) dragRef.current.dataset.over = "false";
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragRef.current) dragRef.current.dataset.over = "false";
    runRead();
  };

  const reset = () => {
    setStage("idle");
    setVisibleLines(0);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-canvas pt-16 md:pt-24"
    >
      {/* SR-only H1 */}
      <h1 className="sr-only">
        AI X-ray reads for chiropractors. In under 90 seconds. ChiroVision chiropractic imaging
        software with DICOM, posture analysis, and HCFA 1500 billing.
      </h1>

      {/* Grid + radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_0%,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] bg-teal-radial"
      />

      <div className="container relative">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: reduce ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border hairline-strong bg-white/[0.02] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-dim">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
            Private beta. HIPAA-aware. Local-only.
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="mx-auto mt-8 max-w-5xl text-balance text-center font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] text-ink sm:text-6xl md:text-7xl lg:text-[88px]"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          AI X-ray reads for chiropractors.{" "}
          <span className="text-dim">In under 90 seconds.</span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-balance text-center text-[17px] leading-relaxed text-dim md:text-lg"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          Drop a DICOM, get a report-quality read with annotated findings, severity flags, and
          patient-ready language. Built by chiropractors and radiologists. HIPAA-aware. Processed
          locally.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <MagneticButton distance={0.3} radius={140}>
            <button
              type="button"
              onClick={runRead}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-teal px-6 text-[15px] font-semibold text-canvas shadow-glow transition hover:bg-teal-400 focus-visible:ring-2 focus-visible:ring-teal"
            >
              <Sparkles className="h-4 w-4" />
              See a sample read
              <ArrowRight className="ml-0.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </MagneticButton>
          <button
            type="button"
            onClick={() => scrollTo("start-trial")}
            className="inline-flex h-12 items-center gap-2 rounded-full border hairline-strong bg-white/[0.03] px-6 text-[15px] font-medium text-ink transition hover:bg-white/[0.06]"
          >
            Book a demo
          </button>
        </motion.div>

        {/* The demo widget */}
        <motion.div
          className="mx-auto mt-16 max-w-6xl"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <div className="relative rounded-2xl border hairline-strong bg-white/[0.02] p-2 backdrop-blur-sm">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b hairline px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dimmer">
                chirovision / reader / cervical-001.dcm
              </p>
              <span className="hidden font-mono text-[11px] text-teal sm:inline">
                ● Live
              </span>
            </div>

            {/* Body: drop zone or X-ray + AI panel */}
            <div className="grid gap-2 p-2 md:grid-cols-[1.4fr_1fr]">
              {/* Left: X-ray surface */}
              <div
                ref={dragRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                data-over="false"
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border hairline bg-black [&[data-over='true']]:border-teal [&[data-over='true']]:ring-2 [&[data-over='true']]:ring-teal/40"
              >
                <AnimatePresence mode="wait">
                  {stage === "idle" ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border hairline-strong bg-white/[0.03]">
                        <Upload className="h-6 w-6 text-teal" />
                      </div>
                      <p className="font-display text-2xl font-semibold text-ink">
                        Drop a DICOM
                      </p>
                      <p className="max-w-sm text-sm leading-relaxed text-dim">
                        Drag and drop a .dcm file, or click sample below. Nothing leaves your
                        browser.
                      </p>
                      <button
                        type="button"
                        onClick={runRead}
                        className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-teal underline-offset-4 hover:underline"
                      >
                        Use sample film [cervical-001.dcm]
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="film"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <AssetImage
                        src="/screenshots/dashboard.jpg"
                        alt="ChiroVision AI annotated cervical X-ray read"
                        priority
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                      />
                      {/* Scanline overlay during loading */}
                      {stage === "loading" && !reduce && (
                        <motion.div
                          className="absolute inset-x-0 h-12 bg-gradient-to-b from-teal/0 via-teal/30 to-teal/0"
                          initial={{ y: 0 }}
                          animate={{ y: "100%" }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      {/* AI annotation callouts on result */}
                      {stage === "result" && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="absolute left-[22%] top-[18%] flex items-center gap-2"
                          >
                            <span className="h-3 w-3 rounded-full border-2 border-amber bg-amber/30" />
                            <span className="rounded-md border border-amber/40 bg-canvas/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-amber backdrop-blur-sm">
                              C5-C6 narrowing
                            </span>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                            className="absolute right-[18%] top-[42%] flex items-center gap-2"
                          >
                            <span className="rounded-md border border-teal/40 bg-canvas/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-teal backdrop-blur-sm">
                              Lordosis 12 deg
                            </span>
                            <span className="h-3 w-3 rounded-full border-2 border-teal bg-teal/30" />
                          </motion.div>
                        </>
                      )}
                      {/* Reset chip */}
                      <button
                        type="button"
                        onClick={reset}
                        className="absolute bottom-3 right-3 rounded-full border hairline-strong bg-canvas/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-dim backdrop-blur hover:text-ink"
                      >
                        Reset
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: AI says console */}
              <div className="relative flex min-h-[260px] flex-col overflow-hidden rounded-xl border hairline bg-canvas">
                <div className="flex items-center justify-between border-b hairline px-4 py-2.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dimmer">
                    AI says
                  </p>
                  <Sparkles className="h-3.5 w-3.5 text-teal" />
                </div>
                <div className="flex-1 space-y-2 p-4 font-mono text-[12px] leading-relaxed">
                  {stage === "idle" && (
                    <p className="text-dimmer">
                      &gt; Awaiting film. Press &quot;See a sample read&quot; or drop a .dcm to start.
                    </p>
                  )}
                  {stage !== "idle" && (
                    <>
                      {SAMPLE_FINDINGS.slice(0, visibleLines).map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <span className="shrink-0 text-dimmer">{line.ts}</span>
                          <span className={line.color}>{line.text}</span>
                        </motion.div>
                      ))}
                      {visibleLines < SAMPLE_FINDINGS.length && (
                        <span className="inline-block h-3 w-2 animate-ticker-flicker bg-teal" />
                      )}
                    </>
                  )}
                </div>
                {stage === "result" && visibleLines >= SAMPLE_FINDINGS.length && (
                  <div className="border-t hairline p-4">
                    <button
                      type="button"
                      onClick={() => scrollTo("start-trial")}
                      className="group flex w-full items-center justify-between rounded-lg border border-teal/30 bg-teal/5 px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-wider text-teal transition hover:bg-teal/10"
                    >
                      Unlock full report
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero compliance band: HIPAA + local-only + parent co */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t hairline pb-16 pt-8 text-[11px] font-medium uppercase tracking-[0.22em] text-dimmer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-teal" />
            HIPAA-aware
          </span>
          <span>Local-only processing</span>
          <span>Built by chiropractors and radiologists</span>
          <span>A Picture Perfect Health product</span>
        </motion.div>
      </div>
    </section>
  );
}
