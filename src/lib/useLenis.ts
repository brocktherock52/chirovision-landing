import { useEffect } from "react";

/**
 * Mount Lenis smooth scroll for the whole page. Cleans up on unmount.
 * Disabled when prefers-reduced-motion or on coarse pointer devices.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let rafId: number;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    (async () => {
      try {
        const mod = await import("lenis");
        const Lenis = mod.default;
        lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.2,
        });
        const tick = (time: number) => {
          lenis?.raf(time);
          rafId = window.requestAnimationFrame(tick);
        };
        rafId = window.requestAnimationFrame(tick);
      } catch {
        // Lenis unavailable, fall back to native scroll.
      }
    })();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);
}
