import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Period = "annual" | "monthly";

/**
 * Midnight pricing section. Ink-on-cream editorial drama, side-by-side
 * comparison style with the annual plan getting a glow ring + ribbon.
 */
export function PricingTrial() {
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState<Period>("annual");

  const scrollToForm = () => {
    document.getElementById("start-trial")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const plan =
    period === "annual" ? siteConfig.plans.annual : siteConfig.plans.monthly;

  const includedFeatures = [
    "Full feature access during trial",
    "All 10 ChiroVision capabilities",
    "Local-only image processing",
    "HCFA 1500 billing included",
    "Voice navigation",
    "Patient management database",
    "Email support",
  ];

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-foreground py-28 text-background sm:py-36"
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-primary/25 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-accent/25 blur-3xl"
        animate={reduce ? undefined : { x: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container">
        <Reveal>
          <SectionHeading
            variant="dark"
            eyebrow="Pricing"
            title="Full-featured chiropractic analysis."
            description={`Try ChiroVision free for ${siteConfig.trial.days} days, then choose the plan that fits your practice. No setup fees, no contracts.`}
          />
        </Reveal>

        {/* Period toggle */}
        <div className="mt-12 flex justify-center">
          <div className="relative inline-flex rounded-full border border-background/15 bg-background/5 p-1 backdrop-blur">
            {(["annual", "monthly"] as const).map((p) => {
              const active = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  data-cursor="link"
                  className={cn(
                    "relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors",
                    active ? "text-foreground" : "text-background/70 hover:text-background",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-background shadow-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {p === "annual" ? "Annual . Save 20%" : "Monthly"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow ring on annual */}
            {period === "annual" && !reduce && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.75rem] bg-gradient-to-tr from-primary/60 via-accent/60 to-secondary/60 blur-2xl"
                animate={{ opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-background/15 bg-background p-10 text-foreground shadow-[0_50px_120px_-30px_rgba(0,0,0,0.5)] sm:p-12">
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground shadow-soft">
                  Best value . Save 20%
                </Badge>
              )}

              <h3 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                {plan.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>

              <div className="mt-8 flex items-baseline gap-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={plan.monthlyEquivalent}
                    initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-7xl font-semibold leading-none tracking-tight text-foreground"
                  >
                    {plan.monthlyEquivalent}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-primary">{plan.savings}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Billed{" "}
                {period === "annual"
                  ? "annually as " + siteConfig.plans.annual.annualTotal
                  : "monthly"}
                .{period === "annual" && " Cancel anytime."}
              </p>

              <div className="my-8 h-px bg-foreground/10" />

              <ul className="flex-1 space-y-3 text-base">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <MagneticButton distance={0.25} radius={140}>
                  <Button onClick={scrollToForm} size="lg" className="h-14 w-full rounded-full text-base" data-cursor="link">
                    Start 10-day free trial
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-background/65">
          All trials include full feature access. No credit card required to start. We never
          auto-charge a card we do not have.
        </p>
      </div>
    </section>
  );
}
