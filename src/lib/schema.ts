import { siteConfig } from "./site-config";
import { faqs } from "@/data/faq";

/**
 * JSON-LD schema generators for ChiroVision.
 * The static skeleton in index.html ships the same blocks at first paint;
 * these React-emitted versions act as a backup and stay in sync with site data.
 */

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    alternateName: "ChiroVision Chiropractic Imaging Software",
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "MedicalApplication",
    applicationSubCategory: "Chiropractic Imaging Software",
    operatingSystem: "Web Browser (Chrome, Safari, Firefox, Edge)",
    softwareVersion: "2026",
    screenshot: `${siteConfig.url}/screenshots/dashboard.jpg`,
    image: `${siteConfig.url}/og-chirovision.jpg`,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
    },
    offers: [
      {
        "@type": "Offer",
        name: "ChiroVision Annual Plan",
        price: "79.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        category: "Subscription",
      },
      {
        "@type": "Offer",
        name: "ChiroVision Monthly Plan",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        category: "Subscription",
      },
      {
        "@type": "Offer",
        name: "ChiroVision 10-day Free Trial",
        price: "0.00",
        priceCurrency: "USD",
        category: "FreeTrial",
        description: `${siteConfig.trial.days}-day free trial with full feature access. No credit card required.`,
        availability: "https://schema.org/InStock",
      },
    ],
    featureList: [
      "Image comparison with annotation",
      "DICOM scan review in the browser",
      "Video motion analysis",
      "Interactive cervical X-ray",
      "Interactive lumbar X-ray",
      "Full spine visualization",
      "Range of motion measurement",
      "Posture analysis",
      "Voice navigation and biometric authentication",
      "Patient management database",
      "HCFA 1500 billing",
      "Local-only image processing",
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.parentCompany.name,
    alternateName: "PPH",
    url: siteConfig.parentCompany.url,
    logo: `${siteConfig.url}/logo.svg`,
    foundingDate: "2006-06",
    founder: {
      "@type": "Person",
      name: "Dr. Eric Hal Feintuch",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: siteConfig.supportEmail,
      areaServed: "US",
    },
    sameAs: [siteConfig.parentCompany.url],
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Eric Hal Feintuch",
    honorificSuffix: "D.C., CCSD",
    jobTitle: "Doctor of Chiropractic, Founder",
    description:
      "Forty year practicing chiropractor and founder of Picture Perfect Health, LLC, the makers of ChiroVision chiropractic imaging software.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "New York Chiropractic College",
    },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
    },
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Features", item: `${siteConfig.url}/#features` },
      { "@type": "ListItem", position: 3, name: "Product Tour", item: `${siteConfig.url}/#tour` },
      { "@type": "ListItem", position: 4, name: "How It Works", item: `${siteConfig.url}/#how-it-works` },
      { "@type": "ListItem", position: 5, name: "Pricing", item: `${siteConfig.url}/#pricing` },
      { "@type": "ListItem", position: 6, name: "Start Trial", item: `${siteConfig.url}/#start-trial` },
      { "@type": "ListItem", position: 7, name: "FAQ", item: `${siteConfig.url}/#faq` },
      { "@type": "ListItem", position: 8, name: "Methodology", item: `${siteConfig.url}/#methodology` },
    ],
  };
}
