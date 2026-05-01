import { UnsplashImage } from "@/components/shared/UnsplashImage";
import { SectionHeading } from "@/components/shared/SectionHeading";

const screenshots = [
  {
    src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80",
    alt: "Interactive X-ray analysis on a laptop screen",
    label: "Interactive X-ray analysis",
  },
  {
    src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&q=80",
    alt: "Posture analysis dashboard",
    label: "Posture analysis dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    alt: "Patient management interface",
    label: "Patient management interface",
  },
];

export function ScreenshotShowcase() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="See it in action"
          title="Built by a chiropractor who actually reads and marks his own films."
          description="Every screen exists because a chiropractor needed it during a patient visit, not because a designer thought it would look nice. Reshow your patients their x-rays every week, so they are reminded of the goals you set for their care."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {screenshots.map((s) => (
            // TODO: replace with real ChiroVision screenshot
            <div key={s.label} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <UnsplashImage src={s.src} alt={s.alt} className="aspect-video object-cover" />
              <div className="p-4 text-center">
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
