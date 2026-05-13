import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
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
import { MagneticButton } from "@/components/shared/MagneticButton";
import { trialSignupSchema, type TrialSignupData } from "@/lib/validators/trialSignup";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const STEPS = ["Account", "Plan", "Confirm"] as const;

export function TrialSignupForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrialSignupData>({
    resolver: zodResolver(trialSignupSchema),
    defaultValues: { plan: "annual" },
    mode: "onChange",
  });

  const selectedPlan = watch("plan");

  const next = async () => {
    if (step === 0) {
      const ok = await trigger(["firstName", "lastName", "practiceName", "email", "phone", "providers"]);
      if (!ok) return;
    } else if (step === 1) {
      const ok = await trigger(["plan"]);
      if (!ok) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: TrialSignupData) => {
    console.log("[ChiroVision trial signup]", data);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    toast.success(
      "You're in! Check your email, Dr. Feintuch's team will activate your trial within one business day.",
      { duration: 6000 },
    );
  };

  const restart = () => {
    setSubmitted(false);
    setStep(0);
    reset();
  };

  const plans = [siteConfig.plans.annual, siteConfig.plans.monthly] as const;

  return (
    <section id="start-trial" className="bg-canvas py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-2xl border hairline-strong bg-white/[0.02]">
            <div className="grid lg:grid-cols-[7fr,5fr]">
              {/* LEFT, multi-step form */}
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-teal" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
                    Start your free trial
                  </p>
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl text-balance">
                  Try ChiroVision free for 10 days.
                </h2>
                <p className="mt-3 text-base text-dim">
                  No credit card. Cancel anytime during your{" "}
                  <strong>{siteConfig.trial.days}-day FREE trial</strong> period.
                </p>

                {/* Progress dots */}
                <div className="mt-8 flex items-center gap-3">
                  {STEPS.map((label, i) => {
                    const active = i === step;
                    const done = submitted || i < step;
                    return (
                      <div key={label} className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <motion.span
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                              done
                                ? "bg-teal text-teal-foreground"
                                : active
                                  ? "bg-teal/15 text-teal ring-2 ring-teal/30"
                                  : "bg-white/5 text-dim",
                            )}
                            animate={active && !reduce ? { scale: [1, 1.06, 1] } : undefined}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                          </motion.span>
                          <span
                            className={cn(
                              "text-xs font-semibold uppercase tracking-[0.16em]",
                              active ? "text-ink" : "text-dim",
                            )}
                          >
                            {label}
                          </span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <span className="h-px w-6 bg-foreground/15 sm:w-10" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Success state */}
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-10 flex flex-col items-center text-center"
                    >
                      <motion.div
                        initial={{ scale: reduce ? 1 : 0.4, rotate: reduce ? 0 : -8 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 14 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-teal text-teal-foreground shadow-soft"
                      >
                        <Check className="h-10 w-10" strokeWidth={2.5} />
                      </motion.div>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                        You are in.
                      </h3>
                      <p className="mt-2 max-w-md text-base text-dim">
                        Check your inbox. Dr. Feintuch's team will activate your trial within one
                        business day.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={restart}
                        className="mt-6"
                      >
                        Sign up another practice
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 space-y-6"
                    >
                      <AnimatePresence mode="wait">
                        {step === 0 && (
                          <motion.div
                            key="step-0"
                            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="grid gap-4 sm:grid-cols-2"
                          >
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
                                  <SelectItem value="2-5">2 to 5 providers</SelectItem>
                                  <SelectItem value="6-10">6 to 10 providers</SelectItem>
                                  <SelectItem value="11+">11 or more</SelectItem>
                                </SelectContent>
                              </Select>
                              <input type="hidden" {...register("providers")} />
                              {errors.providers && (
                                <p className="text-xs text-destructive">{errors.providers.message}</p>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {step === 1 && (
                          <motion.div
                            key="step-1"
                            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="grid gap-4 sm:grid-cols-2"
                          >
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
                                      ? "border-teal bg-teal/5 shadow-soft"
                                      : "border-white/10 bg-white/[0.02] hover:border-teal/40",
                                  )}
                                >
                                  {plan.recommended && (
                                    <span className="absolute -top-3 right-4 rounded-full bg-amber px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-canvas">
                                      Best value
                                    </span>
                                  )}
                                  <div className="flex items-start justify-between">
                                    <span className="font-display text-lg font-semibold text-ink">
                                      {plan.label}
                                    </span>
                                    {isSelected && (
                                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal text-teal-foreground">
                                        <Check className="h-3 w-3" />
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-3 flex items-baseline gap-1">
                                    <span className="font-display text-3xl font-semibold text-ink">
                                      {plan.monthlyEquivalent}
                                    </span>
                                    <span className="text-sm text-dim">/month</span>
                                  </div>
                                  <p className="mt-1 text-xs font-semibold text-teal">{plan.savings}</p>
                                  <p className="mt-2 text-xs text-dim">{plan.tagline}</p>
                                </button>
                              );
                            })}
                            {errors.plan && (
                              <p className="text-xs text-destructive sm:col-span-2">{errors.plan.message}</p>
                            )}
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div
                            key="step-2"
                            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-4"
                          >
                            <div className="rounded-xl border hairline bg-white/[0.02] p-5">
                              <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                                You selected
                              </p>
                              <p className="mt-1 font-display text-xl font-semibold text-ink">
                                {selectedPlan === "annual"
                                  ? `Annual at ${siteConfig.plans.annual.monthlyEquivalent}/mo`
                                  : `Monthly at ${siteConfig.plans.monthly.monthlyEquivalent}/mo`}
                              </p>
                              <p className="mt-2 text-sm text-dim">
                                10-day free trial. No card required. We will never auto-charge a
                                card we do not have.
                              </p>
                            </div>

                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                id="consent"
                                className="mt-1 h-4 w-4 rounded border-input text-teal focus:ring-2 focus:ring-ring"
                                {...register("consent")}
                              />
                              <Label
                                htmlFor="consent"
                                className="text-sm font-normal leading-relaxed text-dim"
                              >
                                I agree to ChiroVision's terms of service and authorize{" "}
                                {siteConfig.parentCompany.name} to contact me about my trial.
                              </Label>
                            </div>
                            {errors.consent && (
                              <p className="text-xs text-destructive">{errors.consent.message}</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center justify-between gap-3">
                        {step > 0 ? (
                          <Button type="button" variant="outline" onClick={back}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </Button>
                        ) : (
                          <span />
                        )}

                        {step < STEPS.length - 1 ? (
                          <Button type="button" onClick={next}>
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        ) : (
                          <MagneticButton distance={0.25} radius={130}>
                            <Button type="submit" size="lg" disabled={isSubmitting}>
                              {isSubmitting ? "Activating..." : "Start my 10-day free trial"}
                            </Button>
                          </MagneticButton>
                        )}
                      </div>

                      <p className="text-center text-xs text-dim">
                        Already have an account?{" "}
                        <a
                          href={`mailto:${siteConfig.supportEmail}`}
                          className="font-semibold text-teal hover:underline"
                        >
                          Contact support
                        </a>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT, marketing panel */}
              <div className="relative hidden bg-canvas p-12 text-ink border-l hairline lg:flex lg:flex-col lg:justify-between">
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-balance">
                    See your patients differently in 10 days.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-dim">
                    ChiroVision is the diagnostic imaging and patient management tool built by a
                    chiropractor dedicated to helping patients make structural and functional
                    once-in-a-lifetime changes. Try every feature free for 10 days, no card required.
                  </p>
                </div>

                <div className="my-8">
                  <div className="overflow-hidden rounded-xl border hairline-strong bg-black">
                    <picture>
                      <source type="image/webp" srcSet="/hero-chirovision-laptop.webp" />
                      <img
                        src="/hero-chirovision-laptop.jpg"
                        alt="ChiroVision chiropractic imaging software preview, dashboard view with every module on one screen"
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </picture>
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>Full feature access during trial, no tier limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>Local-only image processing, patient data never leaves your computer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>Browser-based, nothing to install, works on any computer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
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
