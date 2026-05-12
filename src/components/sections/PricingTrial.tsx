import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Period = "annual" | "monthly";

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
    <section id="pricing" className="bg-background py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Full-featured chiropractic analysis."
            description={`Simple pricing. Cancel anytime. Try ChiroVision free for ${siteConfig.trial.days} days, then choose the plan that fits your practice. No setup fees, no contracts.`}
          />
        </Reveal>

        {/* Period toggle */}
        <div className="mt-10 flex justify-center">
          <div className="relative inline-flex rounded-full border border-foreground/10 bg-card p-1 shadow-soft">
            {(["annual", "monthly"] as const).map((p) => {
              const active = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                    active ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary shadow-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {p === "annual" ? "Annual . Save 20%" : "Monthly"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card
              className={cn(
                "relative flex h-full flex-col overflow-hidden p-8 shadow-soft sm:p-10",
                period === "annual" && "border-2 border-primary",
              )}
            >
              {/* Glow ring on annual */}
              {period === "annual" && !reduce && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 -z-10 rounded-[1.1rem] bg-gradient-to-tr from-primary/40 via-accent/40 to-secondary/40 blur-xl"
                  animate={{ opacity: [0.45, 0.75, 0.45] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  Best value . Save 20%
                </Badge>
              )}

              <h3 className="font-serif text-2xl font-semibold text-foreground">{plan.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={plan.monthlyEquivalent}
                    initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -18 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-5xl font-semibold text-foreground"
                  >
                    {plan.monthlyEquivalent}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-primary">{plan.savings}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Billed{" "}
                {period === "annual"
                  ? "annually as " + siteConfig.plans.annual.annualTotal
                  : "monthly"}
                .{period === "annual" && " Cancel anytime."}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <MagneticButton distance={0.25} radius={120}>
                  <Button onClick={scrollToForm} size="lg" className="w-full">
                    Start 10-day free trial
                  </Button>
                </MagneticButton>
              </div>
            </Card>
          </motion.div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          All trials include full feature access. No credit card required to start. We never
          auto-charge a card we do not have.
        </p>
      </div>
    </section>
  );
}
