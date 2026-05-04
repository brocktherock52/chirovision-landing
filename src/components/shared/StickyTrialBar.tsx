import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "chirovision_sticky_dismissed_v1";

export function StickyTrialBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
      setDismissed(true);
      return;
    }
    const onScroll = () => {
      const trigger = window.innerHeight * 0.6;
      setVisible(window.scrollY > trigger);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  const scrollToForm = () => {
    document.getElementById("start-trial")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:pb-4"
          role="region"
          aria-label="Free trial reminder"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-primary/20 bg-card/95 p-3 shadow-soft backdrop-blur sm:p-4">
            <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary sm:flex">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                See your patients differently in 10 days.
              </p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                {siteConfig.trial.days}-day free trial. No credit card. Cancel anytime.
              </p>
            </div>
            <Button onClick={scrollToForm} size="sm" className="shrink-0">
              Start Free Trial
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
            <button
              type="button"
              onClick={close}
              aria-label="Dismiss"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
