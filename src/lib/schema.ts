import { siteConfig } from "./site-config";

/**
 * JSON-LD schema generators for ChiroVision.
 * Emits SoftwareApplication + Organization (with PPH as parent).
 */

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "MedicalApplication",
    operatingSystem: "Web Browser",
    softwareVersion: "2026",
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
    offers: {
      "@type": "Offer",
      category: "FreeTrial",
      description: `${siteConfig.trial.days}-day free trial, no credit card required`,
      eligibleCustomerType: "https://schema.org/Practitioner",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Image comparison with annotation",
      "DICOM support",
      "Video motion analysis",
      "Interactive cervical X-ray",
      "Interactive lumbar X-ray",
      "Full-spine visualization",
      "Range of motion assessment",
      "Posture analysis",
      "Voice navigation",
      "Patient management & HCFA 1500 billing",
      "Local-only image processing",
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.parentCompany.founder,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: siteConfig.supportEmail,
      areaServed: "US",
    },
  };
}
