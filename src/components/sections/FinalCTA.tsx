import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const reduce = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate overflow-hidden bg-canvas py-32 sm:py-40">
      {/* Subtle teal radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-teal-radial opacity-60"
      />

      <div className="container relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
            One last word
          </p>
          <h2 className="font-display text-balance text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[72px]">
            Read your next film with the AI.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dim">
            Ten days. Full access. No credit card. No contract. Built by chiropractors and
            radiologists.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton distance={0.35} radius={170}>
              <button
                type="button"
                onClick={() => scrollTo("start-trial")}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-teal px-7 text-sm font-semibold text-canvas shadow-glow transition hover:bg-teal-400"
              >
                Start your free trial
                <ArrowRight className="ml-0.5 h-4 w-4" />
              </button>
            </MagneticButton>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-12 items-center gap-2 rounded-full border hairline-strong bg-white/[0.03] px-7 text-sm font-medium text-ink transition hover:bg-white/[0.06]"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
