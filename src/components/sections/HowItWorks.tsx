import { howItWorksSteps } from "@/data/howItWorks";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps from sign-up to first scan."
          description="No installation. No IT calls. No multi-day onboarding."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <div key={step.number} className="relative">
              <div className="font-serif text-6xl font-semibold text-primary/15">{step.number}</div>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
