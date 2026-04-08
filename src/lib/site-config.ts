/**
 * ChiroVision — single source of truth for site identity, contact, and links.
 * The trial signup form, header CTA, and footer all read from this file.
 */
export const siteConfig = {
  name: "ChiroVision",
  tagline: "Imaging & diagnostics for the modern chiropractic practice.",
  description:
    "ChiroVision is a complete imaging, diagnostic, and patient management platform built for chiropractors. Image comparison, DICOM support, interactive X-rays, posture analysis, voice navigation, and HCFA 1500 billing — with strict local-only image processing.",
  url: "https://chirovision.com",
  ogImage: "/og-chirovision.jpg",

  // Parent company (Picture Perfect Health, LLC)
  parentCompany: {
    name: "Picture Perfect Health, LLC",
    url: "https://pictureperfecthealth.com",
    founder: "Dr. Eric Hal Feintuch, D.C., CCSD",
  },

  // Contact for trial inquiries (uses PPH's main number)
  phone: "1-800-438-9355",
  phoneDisplay: "1-800-GET-WELL",
  phoneHref: "tel:+18004389355",
  supportEmail: "support@chirovision.com",

  // Header anchor nav (single-page site)
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],

  // Trial + pricing tiers — Options AI–style two-tier display
  trial: {
    days: 10,
    requiresCard: false,
  },
  // TODO: replace placeholder pricing with real ChiroVision rates from Eric
  plans: {
    annual: {
      id: "annual" as const,
      label: "Annual",
      monthlyEquivalent: "$79",
      annualTotal: "$948",
      savings: "Save 20%",
      tagline: "Best value — pay yearly and save",
      recommended: true,
    },
    monthly: {
      id: "monthly" as const,
      label: "Monthly",
      monthlyEquivalent: "$99",
      annualTotal: "$99/mo",
      savings: "Cancel anytime",
      tagline: "Pay month to month, cancel anytime",
      recommended: false,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
