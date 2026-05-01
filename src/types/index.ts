import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  /** Remaining unverified placeholder testimonials still awaiting real quotes. */
  isPlaceholder?: boolean;
  quote: string;
  author: string;
  practice?: string;
  location: string;
}
