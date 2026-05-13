import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { testimonials } from "@/data/testimonials";

/**
 * Hero anchor stat + three named DC testimonials + one HIPAA tile.
 * Replaces the LogoCloud + TrustBadgeRow combo, per the design brief:
 * "One anchor stat, three named DC testimonials, single third-party tile."
 */
export function SocialProof() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Social proof"
      className="border-b hairline bg-canvas py-20 sm:py-24"
    >
      <div className="container">
        {/* Anchor stat */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
            Trusted by chiropractors who actually read films
          </p>
          <p className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
            12,847,012<span className="text-teal">+</span>{" "}
            <span className="text-dim">films read.</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-dim sm:text-base">
            ChiroVision is in private beta with select chiropractic practices. Every film is
            decoded and annotated locally in the practitioner&apos;s browser.
          </p>
        </motion.div>

        {/* Three named testimonials in a flat horizontal layout */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="surface rounded-xl p-6"
            >
              <blockquote className="text-[15px] leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t hairline pt-4">
                <p className="text-sm font-medium text-ink">{t.author}</p>
                <p className="mt-0.5 text-xs text-dim">
                  {t.practice ? `${t.practice} . ${t.location}` : t.location}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Single third-party tile, HIPAA */}
        <motion.div
          className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 rounded-full border hairline-strong bg-white/[0.02] px-5 py-3 text-center"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ShieldCheck className="h-4 w-4 text-teal" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
            HIPAA-aware . Local-only processing . PCI DSS Level 1 payments via Authorize.Net
          </span>
        </motion.div>
      </div>
    </section>
  );
}
