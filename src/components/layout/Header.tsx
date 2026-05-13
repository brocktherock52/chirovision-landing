import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleAnchor = (href: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b hairline bg-canvas/85 backdrop-blur supports-[backdrop-filter]:bg-canvas/70">
      <div className="container flex h-14 items-center justify-between gap-4 md:h-16">
        {/* Wordmark, Linear-style. Type-only. */}
        <a
          href="#top"
          className="flex items-center gap-2"
          aria-label="ChiroVision home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border hairline-strong bg-white/[0.04] font-mono text-[12px] font-semibold text-teal">
            CV
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            ChiroVision
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleAnchor(item.href);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-dim transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <a
            href="#start-trial"
            onClick={(e) => {
              e.preventDefault();
              handleAnchor("#start-trial");
            }}
            className="hidden h-9 items-center rounded-full bg-teal px-4 text-[13px] font-semibold text-canvas transition hover:bg-teal-400 md:inline-flex"
          >
            Book a demo
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border hairline-strong bg-white/[0.03] text-ink md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-canvas text-ink">
              <SheetHeader>
                <SheetTitle className="font-display text-ink">ChiroVision</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
                {siteConfig.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchor(item.href);
                    }}
                    className="rounded-md px-3 py-3 text-lg font-medium text-dim hover:text-ink"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 border-t hairline pt-6">
                <a
                  href="#start-trial"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchor("#start-trial");
                  }}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-teal px-4 text-sm font-semibold text-canvas"
                >
                  Book a demo
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
