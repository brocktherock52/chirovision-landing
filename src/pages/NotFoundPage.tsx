import { Button } from "@/components/ui/button";
import { Seo } from "@/components/shared/Seo";
import { buildSeo } from "@/lib/seo";

export default function NotFoundPage() {
  const seo = buildSeo({ title: "Page Not Found", path: "/404" });

  return (
    <>
      <Seo {...seo} />
      <section className="bg-section-gradient py-32">
        <div className="container max-w-2xl text-center">
          <p className="font-serif text-7xl font-semibold text-primary">404</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            We can't find that page.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            It might have moved, or the link might be wrong. Let's get you back to ChiroVision.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <a href="/">Back to home</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
