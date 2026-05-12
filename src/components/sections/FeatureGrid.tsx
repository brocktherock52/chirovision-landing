import { motion, useReducedMotion } from "framer-motion";
import { features, localProcessingFeature } from "@/data/features";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/shared/Reveal";
import { TiltCard } from "@/components/shared/TiltCard";

export function FeatureGrid() {
  const Icon = localProcessingFeature.icon;
  const reduce = useReducedMotion();

  return (
    <section id="features" className="bg-background py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to read, document, and bill an exam."
            description="Ten capabilities that chiropractors can actually use to validate patient care plans, in one tool. No tab-switching. No second monitor. No data leaving your computer."
          />
        </Reveal>

        <Stagger
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.06}
        >
          {features.map((feature) => {
            const FIcon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                style={reduce ? undefined : { perspective: 1200 }}
              >
                <TiltCard className="h-full" max={6}>
                  <Card className="group relative h-full overflow-hidden p-6 transition-all hover:border-primary/30 hover:shadow-soft">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <FIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="relative inline-block font-serif text-lg font-semibold text-foreground">
                      {feature.title}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-accent transition-[width] duration-500 ease-out group-hover:w-full"
                      />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-background p-8 shadow-soft sm:p-12">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
                animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative grid items-center gap-6 md:grid-cols-[auto,1fr]">
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
        </Reveal>
      </div>
    </section>
  );
}
