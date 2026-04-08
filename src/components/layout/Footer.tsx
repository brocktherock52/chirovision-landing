import { Stethoscope } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr,1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2" aria-label="ChiroVision home">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Stethoscope className="h-5 w-5" />
              </span>
              <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
                ChiroVision
              </span>
            </a>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Advanced imaging and diagnostics for the modern chiropractic practice. A product of{" "}
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-secondary hover:underline"
              >
                {siteConfig.parentCompany.name}
              </a>
              , founded by {siteConfig.parentCompany.founder}.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {siteConfig.supportEmail}
                </a>
              </li>
              <li>
                <a href={siteConfig.phoneHref} className="text-muted-foreground hover:text-foreground">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.parentCompany.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Parent company →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} ChiroVision · A product of {siteConfig.parentCompany.name}</p>
          <p>HIPAA-aware · Local-only image processing</p>
        </div>
      </div>
    </footer>
  );
}
