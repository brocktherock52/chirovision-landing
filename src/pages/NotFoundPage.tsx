import { Seo } from "@/components/shared/Seo";
import { buildSeo } from "@/lib/seo";

export default function NotFoundPage() {
  const seo = buildSeo({ title: "Page Not Found", path: "/404" });

  return (
    <>
      <Seo {...seo} />
      <section className="bg-canvas py-32">
        <div className="container max-w-2xl text-center">
          <p className="font-display text-7xl font-semibold text-teal">404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            We can&apos;t find that page.
          </h1>
          <p className="mt-4 text-lg text-dim">
            It might have moved, or the link might be wrong. Let&apos;s get you back to ChiroVision.
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="inline-flex h-12 items-center rounded-full bg-teal px-6 text-sm font-semibold text-canvas hover:bg-teal-400"
            >
              Back to home
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
