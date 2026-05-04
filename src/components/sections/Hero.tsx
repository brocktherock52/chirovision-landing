import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnsplashImage } from "@/components/shared/UnsplashImage";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const reduce = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fadeUp = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section id="top" className="relative overflow-hidden bg-section-gradient pt-12 md:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.18),transparent)]"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 -z-10 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl"
        animate={reduce ? undefined : { y: [0, 18, 0], x: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-[380px] w-[380px] rounded-full bg-accent/20 blur-3xl"
        animate={reduce ? undefined : { y: [0, -16, 0], x: [0, 12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container">
        <div className="grid items-center gap-12 pb-16 md:grid-cols-2 md:pb-24">
          <div className="max-w-xl">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
              {...fadeUp}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-3 w-3" />
              {siteConfig.trial.days}-day free trial · No credit card
            </motion.span>

            <motion.h1
              className="mt-5 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance"
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Ready to see your{" "}
              <span className="text-primary">patients differently?</span>
            </motion.h1>

            <motion.p
              className="mt-5 font-serif text-xl leading-snug text-foreground/80 sm:text-2xl"
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Are you ready for your patients to see you in a different light?
            </motion.p>

            <motion.p
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              ChiroVision is the diagnostic imaging, posture analysis, and patient management
              platform built by a doctor with 40 years at the table. Image comparison, DICOM
              support, interactive X-rays, billing, all in your browser, all processed locally.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Button size="lg" onClick={() => scrollTo("start-trial")} className="shadow-soft">
                Start Free Trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("features")}>
                See Features
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Local-only processing
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                HIPAA-aware
              </span>
              <span className="flex items-center gap-2 text-foreground/80">
                <span className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                Built by a 40-year DC
              </span>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-primary/15 via-accent/20 to-transparent blur-2xl" />
            <motion.div
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <UnsplashImage
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80"
                alt="ChiroVision diagnostic imaging interface on a laptop"
                priority
                className="aspect-[4/3] object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-card p-3 shadow-soft sm:flex sm:items-center sm:gap-3"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-xs leading-tight">
                <p className="font-semibold text-foreground">No data leaves your computer</p>
                <p className="text-muted-foreground">Local-only image processing</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
