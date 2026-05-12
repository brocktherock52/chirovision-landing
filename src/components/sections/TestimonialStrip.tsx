import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function initial(name: string) {
  return name.replace(/^Dr\.\s+/i, "").trim().charAt(0).toUpperCase();
}

/**
 * Magazine pull-quote section. One enormous Fraunces italic quote at center,
 * slow-drifting brand-color gradient behind it, parallax. Carousel for the
 * three quotes, but visually treated as a single cinematic moment.
 */
export function TestimonialStrip() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[active];

  const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(next, 8500);
    return () => window.clearInterval(id);
  }, [next, paused, reduce]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Mouse-reactive blob position
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });
  const blobX = useTransform(smx, (v) => `${v * 100}%`);
  const blobY = useTransform(smy, (v) => `${v * 100}%`);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-foreground py-32 text-background sm:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Drifting brand color blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-0 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          left: blobX,
          top: blobY,
          background:
            "radial-gradient(circle, hsl(30 92% 56% / 0.55), hsl(192 80% 32% / 0.3) 50%, transparent 75%)",
        }}
      />
      {/* Faint vertical "QUOTE" watermark */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 select-none text-center font-serif text-[28vw] font-semibold leading-none tracking-tighter text-background/[0.035] sm:text-[20vw]"
        style={{ y: watermarkY }}
      >
        &ldquo;
      </motion.div>

      <div className="container relative">
        <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-background/50">
          Field notes . Chiropractors on ChiroVision
        </p>

        <motion.div
          className="mx-auto max-w-5xl"
          style={reduce ? undefined : { y: quoteY }}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "blur(0px)" : "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: reduce ? 0 : -16, filter: reduce ? "blur(0px)" : "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-center font-serif text-4xl font-medium italic leading-[1.05] tracking-tight text-background sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <motion.div
            className="mt-14 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-px w-12 bg-background/30" />
            <motion.div
              layoutId="testimonial-avatar"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary font-serif text-xl font-semibold text-primary-foreground shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)]"
            >
              {initial(t.author)}
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-semibold text-background">{t.author}</p>
              <p className="text-xs text-background/60">
                {t.practice ? `${t.practice} . ${t.location}` : t.location}
              </p>
            </div>
            <span className="ml-2 hidden items-center gap-0.5 text-accent sm:flex">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <div className="h-px w-12 bg-background/30" />
          </motion.div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              data-cursor="link"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/5 text-background/80 transition hover:bg-background/15 hover:text-background"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  data-cursor="link"
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    i === active ? "w-10 bg-accent" : "w-1.5 bg-background/30"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              data-cursor="link"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/5 text-background/80 transition hover:bg-background/15 hover:text-background"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
