import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Pricing tiers (display only). The actual signup form lives in <TrialSignupForm />.
 * This section sits ABOVE the form to set expectations and links into it.
 */
export function PricingTrial() {
  const plans = [siteConfig.plans.annual, siteConfig.plans.monthly] as const;

  const scrollToForm = () => {
    document.getElementById("start-trial")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        <SectionHeading
          eyebrow="Pricing"
          title="Full-featured chiropractic analysis."
          description={`Simple pricing. Cancel anytime. Try ChiroVision free for ${siteConfig.trial.days} days, then choose the plan that fits your practice. No setup fees, no contracts.`}
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex h-full flex-col p-8 shadow-soft",
                plan.recommended && "border-2 border-primary"
              )}
            >
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  Best value · Save 20%
                </Badge>
              )}

              <h3 className="font-serif text-2xl font-semibold text-foreground">{plan.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-5xl font-semibold text-foreground">
                  {plan.monthlyEquivalent}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-primary">{plan.savings}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Billed{" "}
                {plan.id === "annual" ? "annually as " + plan.annualTotal : "monthly"}.
                {plan.id === "annual" && " Cancel anytime."}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToForm}
                size="lg"
                variant={plan.recommended ? "default" : "outline"}
                className="mt-8 w-full"
              >
                Start 10-day free trial
              </Button>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          All trials include full feature access. No credit card required to start. We never auto-charge a card we don't have.
        </p>
      </div>
    </section>
  );
}
