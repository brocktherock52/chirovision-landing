import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-95"
      />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl text-balance">
            Ready to see your patients differently?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">
            Start your 10-day free trial. No credit card. No contract. Built by a doctor with 40
            years at the table.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => scrollTo("start-trial")}
              className="bg-background text-primary hover:bg-background/90"
            >
              Start Free Trial
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <a href={siteConfig.phoneHref}>
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
