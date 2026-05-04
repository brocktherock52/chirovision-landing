import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import { Stagger, staggerItem } from "@/components/shared/Reveal";

export function TestimonialStrip() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="container">
        <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.1}>
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Card className="flex h-full flex-col p-6 shadow-soft transition-shadow hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <Quote className="h-7 w-7 text-primary" aria-hidden="true" />
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-3 flex-1 text-base leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <footer className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.practice ? `${t.practice} · ${t.location}` : t.location}
                  </p>
                </footer>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
