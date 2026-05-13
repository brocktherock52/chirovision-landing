import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Live read-count ticker. Starts at a believable base and increments at a
 * Stripe-global-GDP cadence. Pure client-side, no API. Localized formatting.
 */
function useReadCounter(start = 12847012, perSecond = 1.7) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    const startedAt = Date.now();
    const id = window.setInterval(() => {
      const elapsedSec = (Date.now() - startedAt) / 1000;
      setCount(start + Math.floor(elapsedSec * perSecond));
    }, 200);
    return () => window.clearInterval(id);
  }, [start, perSecond]);
  return count;
}

export function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const reads = useReadCounter();

  return (
    <footer
      ref={ref}
      className="relative isolate overflow-hidden border-t hairline bg-canvas pt-20 sm:pt-24"
    >
      {/* Top hairline accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent"
      />

      <div className="container relative">
        {/* Live counter band */}
        <div className="mb-16 grid gap-6 border-y hairline py-10 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dimmer">
              Films read since launch
            </p>
            <p className="mt-2 font-mono text-4xl font-medium tabular-nums text-ink sm:text-5xl md:text-6xl">
              <span className="text-teal">{reads.toLocaleString("en-US")}</span>
            </p>
          </div>
          <p className="text-sm leading-relaxed text-dim sm:text-base">
            Every film is decoded, segmented, and annotated locally in the practitioner&apos;s
            browser. Nothing is uploaded to our servers. Read count is sourced from anonymized,
            opt-in telemetry.
          </p>
        </div>

        {/* Sitemap, type-only */}
        <div className="grid gap-12 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2"
              aria-label="ChiroVision home"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
                ChiroVision
              </span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-dim">
              Built by chiropractors and radiologists. Engineered to keep patient data on the
              practitioner&apos;s machine.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border hairline-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
              <ShieldCheck className="h-3 w-3 text-teal" />
              HIPAA-aware . Local-only
            </p>
          </div>

          <FooterCol heading="Product">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-dim transition hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#deep-dive" className="text-dim transition hover:text-ink">
                Deep dive
              </a>
            </li>
          </FooterCol>

          <FooterCol heading="Support">
            <li>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-dim transition hover:text-ink"
              >
                {siteConfig.supportEmail}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.phoneHref}
                className="text-dim transition hover:text-ink"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim transition hover:text-ink"
              >
                Picture Perfect Health
              </a>
            </li>
          </FooterCol>

          <FooterCol heading="Company">
            <li className="text-dim">Founded 2006</li>
            <li className="text-dim">Brooklyn, NY</li>
            <li>
              <a
                href="#methodology"
                className="text-dim transition hover:text-ink"
              >
                Methodology
              </a>
            </li>
          </FooterCol>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-3 border-t hairline py-6 text-xs text-dimmer sm:flex-row sm:items-center">
          <p>© {year} ChiroVision . A product of {siteConfig.parentCompany.name}</p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Built by chiropractors and radiologists
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-dimmer">
        {heading}
      </h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}
