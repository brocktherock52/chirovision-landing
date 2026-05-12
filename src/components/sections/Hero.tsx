import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetImage } from "@/components/shared/AssetImage";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { siteConfig } from "@/lib/site-config";

const HEADLINE_PRIMARY = ["Ready", "to", "see", "your"];
const HEADLINE_ACCENT = ["patients", "differently?"];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on the hero portrait, tied to scroll position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.04]);

  // Mouse-follow gradient blob behind the headline
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const blobBg = useMotionTemplate`radial-gradient(700px circle at ${smx}% ${smy}%, hsl(var(--accent) / 0.18), transparent 55%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const wordVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "blur(0px)" : "blur(8px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const credibilityChips = [
    { icon: ShieldCheck, label: "Local-only processing" },
    { icon: ShieldCheck, label: "HIPAA-aware" },
    { icon: Star, label: "Built by a 40-year DC" },
  ];

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-hidden bg-background pt-10 md:pt-14"
    >
      {/* Mouse-follow accent blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={reduce ? undefined : { background: blobBg }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-ink-radial"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[460px] w-[460px] rounded-full bg-primary/10 blur-3xl"
        animate={reduce ? undefined : { y: [0, 18, 0], x: [0, 12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        animate={reduce ? undefined : { y: [0, -16, 0], x: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative">
        <div className="grid items-center gap-10 pb-16 md:grid-cols-[1.05fr,1fr] md:gap-14 md:pb-24 lg:gap-20">
          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 backdrop-blur"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {siteConfig.trial.days}-day free trial . No credit card
            </motion.div>

            <h1 className="mt-6 font-serif text-[2.6rem] font-semibold leading-[0.95] tracking-tight text-balance text-foreground sm:text-6xl md:text-[4.5rem] lg:text-[5rem]">
              <span className="flex flex-wrap gap-x-3">
                {HEADLINE_PRIMARY.map((word, i) => (
                  <motion.span
                    key={word + i}
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}
                    {i < HEADLINE_PRIMARY.length - 1 && <span className="sr-only"> </span>}
                  </motion.span>
                ))}
              </span>
              <span className="relative mt-2 inline-block">
                <span className="flex flex-wrap gap-x-3">
                  {HEADLINE_ACCENT.map((word, i) => (
                    <motion.span
                      key={word + i}
                      custom={i + HEADLINE_PRIMARY.length}
                      initial="hidden"
                      animate="show"
                      variants={wordVariants}
                      className="inline-block bg-gradient-to-tr from-primary via-secondary to-accent bg-clip-text text-transparent"
                    >
                      {word}
                      {i < HEADLINE_ACCENT.length - 1 && <span className="sr-only"> </span>}
                    </motion.span>
                  ))}
                </span>
                <motion.svg
                  aria-hidden="true"
                  className="absolute -bottom-3 left-0 h-3 w-full text-accent/70"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.path
                    d="M2 8 C 50 2, 150 14, 198 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.svg>
              </span>
            </h1>

            <motion.p
              className="mt-8 max-w-xl font-serif text-xl leading-snug text-foreground/75 sm:text-2xl"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
            >
              Are you ready for your patients to see{" "}
              <em className="font-medium text-foreground">you</em> in a different light?
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
            >
              The diagnostic imaging, posture analysis, and patient management platform built
              by a doctor with 40 years at the table. Image comparison, DICOM, interactive
              X-rays, HCFA 1500 billing. Everything in your browser. Everything processed locally.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
            >
              <MagneticButton distance={0.3} radius={150}>
                <Button
                  size="lg"
                  onClick={() => scrollTo("start-trial")}
                  className="group h-12 rounded-full px-7 text-base shadow-soft"
                >
                  Start your 10-day trial
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("features")}
                className="h-12 rounded-full border-foreground/15 bg-card/40 px-7 text-base backdrop-blur"
              >
                See the platform
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {credibilityChips.map((chip, i) => {
                const Icon = chip.icon;
                return (
                  <motion.span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/60 px-3 py-1.5 text-foreground/75 backdrop-blur"
                    animate={
                      reduce
                        ? undefined
                        : { y: [0, -3, 0, 3, 0] }
                    }
                    transition={{
                      duration: 9 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 text-accent" />
                    {chip.label}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>

          {/* Right: dramatic photo card with subtle scroll parallax */}
          <motion.div
            className="relative"
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={reduce ? undefined : { y: portraitY, scale: portraitScale }}
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-accent/15 to-transparent blur-3xl" />

            <motion.div
              className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <AssetImage
                src="/hero-chirovision.jpg"
                alt="ChiroVision chiropractic imaging software dashboard with cervical, lumbar, full x-ray, overlay, posture, range of motion, image and video comparison, DICOM, and HCFA 1500 billing modules"
                priority
                className="aspect-[4/5] object-cover sm:aspect-[5/6] md:aspect-[4/5]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              <motion.div
                className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Sparkles className="h-3 w-3 text-accent" />
                Now in private beta
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-5 flex max-w-[280px] items-start gap-3 rounded-2xl border border-foreground/10 bg-card/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] backdrop-blur sm:-left-8"
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-xs leading-snug">
                  <p className="font-semibold text-foreground">No data leaves your computer.</p>
                  <p className="mt-0.5 text-muted-foreground">
                    Local-only image processing, by design.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Credibility strip directly under hero */}
        <motion.div
          className="border-t border-foreground/10 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            A product of Picture Perfect Health, LLC
            <span className="mx-3 text-foreground/30">.</span>
            Founded by Dr. Eric Hal Feintuch, D.C., CCSD
            <span className="mx-3 text-foreground/30">.</span>
            Forty years at the table
          </p>
        </motion.div>
      </div>
    </section>
  );
}
