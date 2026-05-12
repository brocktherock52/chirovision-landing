import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { TrustBadgeRow } from "@/components/sections/TrustBadgeRow";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ScreenshotShowcase } from "@/components/sections/ScreenshotShowcase";
import { ProductTour } from "@/components/sections/ProductTour";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialStrip } from "@/components/sections/TestimonialStrip";
import { FoundersLetter } from "@/components/sections/FoundersLetter";
import { Methodology } from "@/components/sections/Methodology";
import { PricingTrial } from "@/components/sections/PricingTrial";
import { TrialSignupForm } from "@/components/sections/TrialSignupForm";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Seo } from "@/components/shared/Seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildSeo } from "@/lib/seo";
import {
  softwareApplicationSchema,
  organizationSchema,
  personSchema,
  faqPageSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export default function LandingPage() {
  const seo = buildSeo();

  return (
    <>
      <Seo {...seo} />
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd data={faqPageSchema()} />
      <JsonLd data={breadcrumbSchema()} />

      <Hero />
      <LogoCloud />
      <TrustBadgeRow />
      <FeatureGrid />
      <ScreenshotShowcase />
      <ProductTour />
      <HowItWorks />
      <TestimonialStrip />
      <FoundersLetter />
      <Methodology />
      <PricingTrial />
      <TrialSignupForm />
      <FAQ />
      <FinalCTA />
    </>
  );
}
