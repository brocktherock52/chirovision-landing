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
  /** All testimonials are placeholders. */
  isPlaceholder: true;
  quote: string;
  author: string;
  practice: string;
  location: string;
}
