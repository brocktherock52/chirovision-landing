import { Hero } from "@/components/sections/Hero";
import { TrustBadgeRow } from "@/components/sections/TrustBadgeRow";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ScreenshotShowcase } from "@/components/sections/ScreenshotShowcase";
import { ProductTour } from "@/components/sections/ProductTour";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialStrip } from "@/components/sections/TestimonialStrip";
import { PricingTrial } from "@/components/sections/PricingTrial";
import { TrialSignupForm } from "@/components/sections/TrialSignupForm";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Seo } from "@/components/shared/Seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildSeo } from "@/lib/seo";
import { softwareApplicationSchema, organizationSchema } from "@/lib/schema";

export default function LandingPage() {
  const seo = buildSeo();

  return (
    <>
      <Seo {...seo} />
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={organizationSchema()} />

      <Hero />
      <TrustBadgeRow />
      <FeatureGrid />
      <ScreenshotShowcase />
      <ProductTour />
      <HowItWorks />
      <TestimonialStrip />
      <PricingTrial />
      <TrialSignupForm />
      <FAQ />
      <FinalCTA />
    </>
  );
}
