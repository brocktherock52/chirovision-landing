import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";

export function TestimonialStrip() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="flex h-full flex-col p-6 shadow-soft">
              <Quote className="h-7 w-7 text-primary" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-foreground">
                {/* TODO: replace with real testimonial */}
                {t.quote}
              </blockquote>
              <footer className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">
                  {t.practice} · {t.location}
                </p>
              </footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
