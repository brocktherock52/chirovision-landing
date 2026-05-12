import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetImage } from "@/components/shared/AssetImage";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { SplitChars } from "@/components/shared/SplitChars";
import { siteConfig } from "@/lib/site-config";

const HEADLINE_LINE_1 = "Ready to see";
const HEADLINE_LINE_2 = "your patients";
const HEADLINE_LINE_3 = "differently.";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.55]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      {/* Mesh gradient backdrop */}
      <MeshGradient className="-z-10" />

      {/* Soft vignettes to anchor the type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-transparent to-background/80"
      />

      <motion.div className="container relative" style={{ opacity: heroOpacity, y: heroY }}>
        {/* SR-only H1 for crawlers, preserves keyword density. */}
        <h1 className="sr-only">
          Ready to see your patients differently. Are you ready for your patients to see you in a
          different light. ChiroVision chiropractic imaging software.
        </h1>

        {/* Top eyebrow + meta */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {siteConfig.trial.days}-day free trial . No credit card
          </div>
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.32em] text-foreground/40 md:block">
            Issue 01 . Spring 2026 . The Imaging Edition
          </p>
        </motion.div>

        {/* MASSIVE editorial headline */}
        <div
          className="relative mt-10 md:mt-16"
          aria-hidden="true"
          data-cursor="default"
        >
          <SplitChars
            as="div"
            text={HEADLINE_LINE_1}
            className="block font-serif text-[18vw] font-semibold leading-[0.88] tracking-[-0.04em] text-foreground sm:text-[15vw] md:text-[11vw] lg:text-[10rem]"
            delay={0.15}
            stagger={0.025}
          />
          <SplitChars
            as="div"
            text={HEADLINE_LINE_2}
            className="-mt-2 block font-serif text-[18vw] font-semibold italic leading-[0.88] tracking-[-0.04em] text-foreground/90 sm:text-[15vw] md:text-[11vw] lg:text-[10rem]"
            delay={0.35}
            stagger={0.025}
          />
          <div className="relative mt-1">
            <SplitChars
              as="div"
              text={HEADLINE_LINE_3}
              charClassName="bg-gradient-to-br from-[hsl(30_92%_56%)] via-[hsl(192_80%_32%)] to-[hsl(222_30%_10%)] bg-clip-text text-transparent"
              className="block font-serif text-[18vw] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[15vw] md:text-[11vw] lg:text-[10rem]"
              delay={0.55}
              stagger={0.025}
            />
            {/* Hand-drawn underline arc */}
            <motion.svg
              aria-hidden="true"
              className="absolute -bottom-4 left-0 h-4 w-[78%] text-accent/80 md:-bottom-6 md:h-6"
              viewBox="0 0 600 24"
              preserveAspectRatio="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.path
                d="M2 16 C 100 4, 280 24, 420 8 C 500 0, 560 14, 598 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.svg>
          </div>
        </div>

        {/* Body block + portrait */}
        <div className="mt-14 grid items-end gap-12 pb-20 md:mt-20 md:grid-cols-[1.2fr,1fr] md:gap-16 md:pb-28">
          <div className="max-w-xl">
            <motion.p
              className="font-serif text-2xl leading-snug text-foreground/80 sm:text-3xl"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              Are you ready for your patients to see{" "}
              <em className="font-medium text-foreground">you</em> in a different light.
            </motion.p>

            <motion.p
              className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
            >
              The diagnostic imaging, posture analysis, and patient management platform built by a
              doctor with forty years at the table. Image comparison, DICOM, interactive X-rays,
              HCFA 1500 billing. Everything in your browser. Everything processed locally.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
            >
              <MagneticButton distance={0.3} radius={150}>
                <Button
                  size="lg"
                  onClick={() => scrollTo("start-trial")}
                  className="group h-14 rounded-full px-8 text-base shadow-soft"
                  data-cursor="link"
                >
                  Start your 10-day trial
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("features")}
                className="h-14 rounded-full border-foreground/15 bg-card/40 px-8 text-base backdrop-blur"
                data-cursor="link"
              >
                See the platform
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.45 }}
            >
              {credibilityChips.map((chip, i) => {
                const Icon = chip.icon;
                return (
                  <motion.span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/70 px-3 py-1.5 text-foreground/75 backdrop-blur"
                    animate={reduce ? undefined : { y: [0, -3, 0, 3, 0] }}
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
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            style={reduce ? undefined : { y: portraitY, scale: portraitScale }}
            data-cursor="view"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-accent/20 to-transparent blur-3xl" />

            <motion.div
              className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-card shadow-[0_40px_100px_-30px_rgba(0,0,0,0.4)]"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
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
                className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Now in private beta
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 flex max-w-[300px] items-start gap-3 rounded-2xl border border-foreground/10 bg-card/95 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] backdrop-blur sm:-left-10"
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
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

        {/* Credibility byline */}
        <motion.div
          className="border-t border-foreground/10 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            A product of Picture Perfect Health, LLC
            <span className="mx-3 text-foreground/30">.</span>
            Founded by Dr. Eric Hal Feintuch, D.C., CCSD
            <span className="mx-3 text-foreground/30">.</span>
            Forty years at the table
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
