import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnsplashImage } from "@/components/shared/UnsplashImage";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative overflow-hidden bg-section-gradient pt-12 md:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.18),transparent)]"
      />

      <div className="container">
        <div className="grid items-center gap-12 pb-16 md:grid-cols-2 md:pb-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              {siteConfig.trial.days}-day free trial · No credit card
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
              Advanced imaging for the{" "}
              <span className="text-primary">modern chiropractic practice.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              ChiroVision is the diagnostic imaging, posture analysis, and patient management
              platform built by a doctor with 40 years at the table. Image comparison, DICOM
              support, interactive X-rays, billing, all in your browser, all processed locally.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => scrollTo("start-trial")}>
                Start Free Trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("features")}>
                See Features
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <span>Local-only image processing · HIPAA-aware · Built by Picture Perfect Health</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-primary/15 via-accent/20 to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              {/* TODO: replace with real ChiroVision screenshot */}
              <UnsplashImage
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80"
                alt="ChiroVision diagnostic imaging interface on a laptop"
                priority
                className="aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
