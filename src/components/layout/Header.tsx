import { useState } from "react";
import { Menu, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleAnchor = (href: string) => {
    setOpen(false);
    // Smooth-scroll to section
    requestAnimationFrame(() => {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2" aria-label="ChiroVision home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
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
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="default"
            className="hidden md:inline-flex"
          >
            <a
              href="#start-trial"
              onClick={(e) => {
                e.preventDefault();
                handleAnchor("#start-trial");
              }}
            >
              Start Free Trial
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>ChiroVision</SheetTitle>
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
                    className="rounded-md px-3 py-3 text-lg font-medium hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 border-t border-border pt-6">
                <Button
                  asChild
                  size="lg"
                  className="w-full"
                >
                  <a
                    href="#start-trial"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchor("#start-trial");
                    }}
                  >
                    Start Free Trial
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
