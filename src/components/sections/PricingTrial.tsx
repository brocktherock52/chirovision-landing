import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Period = "annual" | "monthly";

/**
 * Two-column pricing pad. Dark canvas. Annual plan glows teal.
 * Brief says: defer pricing to /pricing anchor with per-read + flat-monthly columns.
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
    "AI X-ray read in under 90 seconds",
    "Local-only image processing",
    "HCFA 1500 billing included",
    "Voice navigation",
    "Patient management database",
    "Priority email support",
  ];

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-canvas py-24 sm:py-32"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Two ways to read every film."
            description={`Try ChiroVision free for ${siteConfig.trial.days} days, then choose flat-monthly or pay-as-you-read. No setup fees. No contracts.`}
          />
        </Reveal>

        {/* Period toggle */}
        <div className="mt-12 flex justify-center">
          <div className="relative inline-flex rounded-full border hairline-strong bg-white/[0.03] p-1">
            {(["annual", "monthly"] as const).map((p) => {
              const active = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors",
                    active ? "text-canvas" : "text-dim hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-teal"
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
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow ring on annual */}
            {period === "annual" && !reduce && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl bg-teal/30 blur-2xl"
                animate={{ opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border hairline-strong bg-canvas p-10 sm:p-12">
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-canvas">
                  Best value . Save 20%
                </span>
              )}

              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                {plan.label}
              </h3>
              <p className="mt-2 text-sm text-dim">{plan.tagline}</p>

              <div className="mt-8 flex items-baseline gap-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={plan.monthlyEquivalent}
                    initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-6xl font-semibold leading-none tracking-tight text-ink"
                  >
                    {plan.monthlyEquivalent}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base text-dim">/month</span>
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-teal">
                {plan.savings}
              </p>
              <p className="mt-1 text-xs text-dim">
                Billed{" "}
                {period === "annual"
                  ? "annually as " + siteConfig.plans.annual.annualTotal
                  : "monthly"}
                .{period === "annual" && " Cancel anytime."}
              </p>

              <div className="my-8 h-px bg-white/8" />

              <ul className="flex-1 space-y-3 text-[15px]">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <MagneticButton distance={0.25} radius={140}>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="h-12 w-full rounded-full bg-teal text-sm font-semibold text-canvas transition hover:bg-teal-400"
                  >
                    Start 10-day free trial
                  </button>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-dim">
          All trials include full feature access. No credit card required to start. We never
          auto-charge a card we do not have.
        </p>
      </div>
    </section>
  );
}
