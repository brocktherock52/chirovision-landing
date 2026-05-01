import { features, localProcessingFeature } from "@/data/features";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FeatureGrid() {
  const Icon = localProcessingFeature.icon;

  return (
    <section id="features" className="bg-background py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to read, document, and bill an exam."
          description="Ten capabilities that chiropractors can actually use to validate patient care plans, in one tool. No tab-switching. No second monitor. No data leaving your computer."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => {
            const FIcon = feature.icon;
            return (
              <Card key={feature.title} className="h-full p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Feature spotlight: local processing */}
        <div className="mt-10">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-background p-8 shadow-soft sm:p-12">
            <div className="grid items-center gap-6 md:grid-cols-[auto,1fr]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  The privacy promise
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                  {localProcessingFeature.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {localProcessingFeature.description}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
