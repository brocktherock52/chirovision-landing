import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const reduce = useReducedMotion();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-95"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl text-balance">
            Ready to see your patients differently?
          </h2>
          <p className="mt-3 font-serif text-xl tracking-tight text-white/90 sm:text-2xl">
            Are you ready for your patients to see you in a different light?
          </p>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
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
        </motion.div>
      </div>
    </section>
  );
}
