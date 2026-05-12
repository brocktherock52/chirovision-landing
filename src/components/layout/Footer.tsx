import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Stethoscope } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <footer
      ref={ref}
      className="relative isolate overflow-hidden border-t border-foreground/10 bg-background pt-20 sm:pt-24"
    >
      {/* Gradient line at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />

      <div className="container relative">
        {/* Top: editorial columns */}
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2"
              aria-label="ChiroVision home"
              data-cursor="link"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
                <Stethoscope className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                ChiroVision
              </span>
            </a>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Imaging and diagnostics for the modern chiropractic practice. Built by a doctor with
              forty years at the table. Engineered to keep patient data on your computer, where it
              belongs.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-foreground/40">
              Product of
            </p>
            <a
              href={siteConfig.parentCompany.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-1 inline-flex items-center gap-1 font-serif text-base font-semibold text-foreground hover:text-primary"
            >
              {siteConfig.parentCompany.name}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <FooterCol heading="Product">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition hover:text-foreground"
                  data-cursor="link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol heading="Support">
            <li>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-muted-foreground transition hover:text-foreground"
                data-cursor="link"
              >
                {siteConfig.supportEmail}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.phoneHref}
                className="text-muted-foreground transition hover:text-foreground"
                data-cursor="link"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
                data-cursor="link"
              >
                Parent company
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
          </FooterCol>

          <FooterCol heading="Company">
            <li className="text-muted-foreground">Founded 2006</li>
            <li className="text-muted-foreground">Picture Perfect Health, LLC</li>
            <li className="text-muted-foreground">Brooklyn, NY</li>
            <li>
              <a
                href="#methodology"
                className="text-muted-foreground transition hover:text-foreground"
                data-cursor="link"
              >
                Methodology
              </a>
            </li>
          </FooterCol>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} ChiroVision . A product of {siteConfig.parentCompany.name}</p>
          <p>HIPAA-aware . Local-only image processing . Made in Brooklyn</p>
        </div>
      </div>

      {/* GIANT ChiroVision editorial wordmark, parallaxes on scroll */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none relative mt-8 select-none overflow-hidden"
        style={reduce ? undefined : { y: wordmarkY }}
      >
        <p className="text-center font-serif text-[20vw] font-semibold leading-[0.82] tracking-[-0.06em] text-foreground/[0.07] sm:text-[18vw]">
          ChiroVision
        </p>
      </motion.div>
    </footer>
  );
}

function FooterCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/40">
        {heading}
      </h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}
