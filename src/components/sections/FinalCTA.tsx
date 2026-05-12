import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.05, 0.96]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-foreground py-32 text-background sm:py-44"
    >
      {/* Mesh gradient backdrop */}
      <MeshGradient className="-z-10 opacity-70" />

      {/* GIANT "10 days" editorial wordmark behind content */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 select-none text-center font-serif text-[34vw] font-semibold leading-[0.82] tracking-[-0.06em] text-background/[0.06] sm:text-[28vw]"
        style={reduce ? undefined : { x: wordmarkX, scale: wordmarkScale }}
      >
        10 days.
      </motion.div>

      {/* Soft moving spot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-background/50">
            One last word
          </p>
          <h2 className="font-serif text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
            Ready to see your patients differently.
          </h2>
          <p className="mt-5 font-serif text-2xl italic tracking-tight text-background/85 sm:text-3xl">
            Are you ready for your patients to see you in a different light.
          </p>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-background/75">
            Ten days. Full access. No credit card. No contract. Built by a doctor with forty years
            at the table.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton distance={0.35} radius={170}>
              <Button
                size="lg"
                onClick={() => scrollTo("start-trial")}
                className="h-14 rounded-full bg-accent px-9 text-base text-accent-foreground shadow-[0_20px_50px_-15px_hsl(30_92%_56%_/_0.7)] hover:bg-accent/90"
                data-cursor="link"
              >
                Start your free trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </MagneticButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-background/25 bg-transparent px-9 text-base text-background hover:bg-background/10"
              data-cursor="link"
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
