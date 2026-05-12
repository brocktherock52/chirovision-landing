import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated SVG mesh gradient. Four large soft blobs continuously morph
 * (organic noise via sine waves) and react gently to the mouse position.
 * Lightweight, no Three.js, hardware-accelerated transforms.
 */
export function MeshGradient({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      mouseRef.current.x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      mouseRef.current.y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const el = rootRef.current;
      if (el) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const blobs = el.querySelectorAll<HTMLDivElement>("[data-blob]");
        blobs.forEach((b, i) => {
          const speed = 0.18 + i * 0.08;
          const sx = Math.sin(t * speed + i * 1.7) * 90 + (mx - 0.5) * 80;
          const sy = Math.cos(t * (speed * 0.85) + i * 2.1) * 70 + (my - 0.5) * 60;
          const s = 1 + 0.08 * Math.sin(t * (speed * 0.6) + i);
          b.style.transform = `translate3d(${sx}px, ${sy}px, 0) scale(${s})`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div
        data-blob
        className="absolute -left-32 -top-24 h-[55vw] w-[55vw] rounded-full opacity-70 blur-[110px] will-change-transform"
        style={{ background: "radial-gradient(circle, hsl(30 92% 56% / 0.55), transparent 65%)" }}
      />
      <div
        data-blob
        className="absolute -right-40 top-1/4 h-[60vw] w-[60vw] rounded-full opacity-65 blur-[120px] will-change-transform"
        style={{ background: "radial-gradient(circle, hsl(192 80% 32% / 0.55), transparent 65%)" }}
      />
      <div
        data-blob
        className="absolute bottom-0 left-1/4 h-[50vw] w-[50vw] rounded-full opacity-55 blur-[110px] will-change-transform"
        style={{ background: "radial-gradient(circle, hsl(188 70% 26% / 0.45), transparent 65%)" }}
      />
      <div
        data-blob
        className="absolute -bottom-32 right-0 h-[45vw] w-[45vw] rounded-full opacity-60 blur-[110px] will-change-transform"
        style={{ background: "radial-gradient(circle, hsl(30 80% 70% / 0.45), transparent 65%)" }}
      />

      {/* Faint grid overlay for editorial structure */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cv-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cv-grid)" />
      </svg>
    </div>
  );
}
