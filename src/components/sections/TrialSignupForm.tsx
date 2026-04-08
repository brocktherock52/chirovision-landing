import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trialSignupSchema, type TrialSignupData } from "@/lib/validators/trialSignup";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Combined trial signup + plan picker — patterned after Options AI's two-step
 * "Create account / Choose plan" layout. Single form, two visible steps,
 * Annual vs Monthly cards, single submit button.
 */
export function TrialSignupForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrialSignupData>({
    resolver: zodResolver(trialSignupSchema),
    defaultValues: {
      plan: "annual",
    },
  });

  const selectedPlan = watch("plan");

  const onSubmit = async (data: TrialSignupData) => {
    // TODO: connect form backend
    // Currently logs payload to console. Wire to Formspree/Web3Forms/Resend before launch.
    console.log("[ChiroVision trial signup]", data);
    await new Promise((r) => setTimeout(r, 600));
    toast.success(
      "You're in! Check your email — Dr. Feintuch's team will activate your trial within one business day.",
      { duration: 6000 }
    );
    reset();
  };

  const plans = [siteConfig.plans.annual, siteConfig.plans.monthly] as const;

  return (
    <section id="start-trial" className="bg-section-gradient py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="grid lg:grid-cols-[7fr,5fr]">
              {/* LEFT — Form (Step 1 + Step 2) */}
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Start your free trial
                  </p>
                </div>
                <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
                  Try ChiroVision free for 10 days.
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  No credit card. Cancel anytime during your <strong>{siteConfig.trial.days}-day FREE trial</strong> period.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  {/* STEP 1 — Account info */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step 1
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
                      Create your account
                    </h3>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" placeholder="Eric" {...register("firstName")} />
                        {errors.firstName && (
                          <p className="text-xs text-destructive">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" placeholder="Feintuch" {...register("lastName")} />
                        {errors.lastName && (
                          <p className="text-xs text-destructive">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="practiceName">Practice or clinic name</Label>
                        <Input
                          id="practiceName"
                          placeholder="Finetouch Chiropractic"
                          {...register("practiceName")}
                        />
                        {errors.practiceName && (
                          <p className="text-xs text-destructive">{errors.practiceName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="dr@practice.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-xs text-destructive">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="providers">Number of providers in your practice</Label>
                        <Select onValueChange={(value) => setValue("providers", value)}>
                          <SelectTrigger id="providers">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Just me</SelectItem>
                            <SelectItem value="2-5">2–5 providers</SelectItem>
                            <SelectItem value="6-10">6–10 providers</SelectItem>
                            <SelectItem value="11+">11 or more</SelectItem>
                          </SelectContent>
                        </Select>
                        <input type="hidden" {...register("providers")} />
                        {errors.providers && (
                          <p className="text-xs text-destructive">{errors.providers.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* STEP 2 — Choose plan */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step 2
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
                      Choose your plan
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Cancel anytime during your{" "}
                      <span className="font-semibold text-primary">10-day FREE trial</span> period.
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {plans.map((plan) => {
                        const isSelected = selectedPlan === plan.id;
                        return (
                          <button
                            type="button"
                            key={plan.id}
                            onClick={() => setValue("plan", plan.id)}
                            aria-pressed={isSelected}
                            className={cn(
                              "relative rounded-xl border-2 p-5 text-left transition-all",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-soft"
                                : "border-border bg-background hover:border-primary/40"
                            )}
                          >
                            {plan.recommended && (
                              <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                                Best value
                              </span>
                            )}
                            <div className="flex items-start justify-between">
                              <span className="font-serif text-lg font-semibold text-foreground">
                                {plan.label}
                              </span>
                              {isSelected && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                  <Check className="h-3 w-3" />
                                </span>
                              )}
                            </div>
                            <div className="mt-3 flex items-baseline gap-1">
                              <span className="font-serif text-3xl font-semibold text-foreground">
                                {plan.monthlyEquivalent}
                              </span>
                              <span className="text-sm text-muted-foreground">/month</span>
                            </div>
                            <p className="mt-1 text-xs font-semibold text-primary">{plan.savings}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{plan.tagline}</p>
                          </button>
                        );
                      })}
                    </div>
                    {errors.plan && (
                      <p className="mt-2 text-xs text-destructive">{errors.plan.message}</p>
                    )}
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                      {...register("consent")}
                    />
                    <Label
                      htmlFor="consent"
                      className="text-sm font-normal leading-relaxed text-muted-foreground"
                    >
                      I agree to ChiroVision's terms of service and authorize{" "}
                      {siteConfig.parentCompany.name} to contact me about my trial.
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="-mt-3 text-xs text-destructive">{errors.consent.message}</p>
                  )}

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Activating your trial..." : "Start my 10-day free trial"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Already have an account?{" "}
                    <a
                      href={`mailto:${siteConfig.supportEmail}`}
                      className="font-semibold text-primary hover:underline"
                    >
                      Contact support
                    </a>
                  </p>
                </form>
              </div>

              {/* RIGHT — Marketing panel */}
              <div className="relative hidden bg-hero-gradient p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <div>
                  <h3 className="font-serif text-3xl font-semibold tracking-tight text-balance">
                    See your patients differently in 10 days.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/90">
                    ChiroVision is the diagnostic imaging and patient management tool built by a
                    chiropractor who codes. Try every feature free for 10 days — no card required.
                  </p>
                </div>

                <div className="my-8">
                  {/* TODO: replace with real ChiroVision screenshot */}
                  <div className="overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur">
                    <img
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80"
                      alt="ChiroVision interface preview"
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>Full feature access during trial — no tier limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>Local-only image processing — patient data never leaves your computer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>Browser-based — nothing to install, works on any computer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>Built and supported by Picture Perfect Health, LLC</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
