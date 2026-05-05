import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetImage } from "@/components/shared/AssetImage";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const reduce = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fadeUp = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-background pt-10 md:pt-14"
    >
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
              {...fadeUp}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {siteConfig.trial.days}-day free trial · No credit card
            </motion.div>

            <motion.h1
              className="mt-6 font-serif text-[2.6rem] font-semibold leading-[0.95] tracking-tight text-balance text-foreground sm:text-6xl md:text-[4.5rem] lg:text-[5rem]"
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Ready to see your{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-tr from-primary via-secondary to-accent bg-clip-text text-transparent">
                  patients differently?
                </span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-3 left-0 h-3 w-full text-accent/70"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 50 2, 150 14, 198 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl font-serif text-xl leading-snug text-foreground/75 sm:text-2xl"
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              Are you ready for your patients to see{" "}
              <em className="font-medium text-foreground">you</em> in a different light?
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              The diagnostic imaging, posture analysis, and patient management platform built
              by a doctor with 40 years at the table. Image comparison, DICOM, interactive
              X-rays, HCFA 1500 billing. Everything in your browser. Everything processed locally.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              <Button
                size="lg"
                onClick={() => scrollTo("start-trial")}
                className="group h-12 rounded-full px-7 text-base shadow-soft"
              >
                Start your 10-day trial
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
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
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="flex items-center gap-2 text-foreground/70">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Local-only processing
              </span>
              <span className="flex items-center gap-2 text-foreground/70">
                <ShieldCheck className="h-4 w-4 text-accent" />
                HIPAA-aware
              </span>
              <span className="flex items-center gap-2 text-foreground">
                <span className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                <span className="text-foreground/70">Built by a 40-year DC</span>
              </span>
            </motion.div>
          </div>

          {/* Right: dramatic full-bleed photo card with glassmorphic accents */}
          <motion.div
            className="relative"
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-accent/15 to-transparent blur-3xl" />

            <motion.div
              className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <AssetImage
                src="/hero-chirovision.jpg"
                alt="Doctor reviewing a cervical spine x-ray on a clean tablet interface"
                priority
                className="aspect-[4/5] object-cover sm:aspect-[5/6] md:aspect-[4/5]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Floating "1,247 chiropractors" trust pill */}
              <motion.div
                className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Sparkles className="h-3 w-3 text-accent" />
                Now in private beta
              </motion.div>

              {/* Floating privacy promise card */}
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

        {/* Marquee-ish credibility strip directly under hero */}
        <motion.div
          className="border-t border-foreground/10 py-6"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            A product of Picture Perfect Health, LLC
            <span className="mx-3 text-foreground/30">·</span>
            Founded by Dr. Eric Hal Feintuch, D.C., CCSD
            <span className="mx-3 text-foreground/30">·</span>
            Forty years at the table
          </p>
        </motion.div>
      </div>
    </section>
  );
}
