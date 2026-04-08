import {
  Image as ImageIcon,
  FileScan,
  Video,
  Activity,
  Move,
  PersonStanding,
  Mic,
  Users,
  Receipt,
  Lock,
} from "lucide-react";
import type { Feature } from "@/types";

/**
 * The 10 ChiroVision features. Drives the FeatureGrid section
 * and is the source of truth for the SoftwareApplication JSON-LD featureList.
 */
export const features: Feature[] = [
  {
    icon: ImageIcon,
    title: "Image Comparison",
    description:
      "Side-by-side before/after with zoom, rotation, and freehand annotation. Show patients the progress they cannot feel yet.",
  },
  {
    icon: FileScan,
    title: "DICOM Support",
    description:
      "Open and analyze DICOM scan files directly in the browser. No conversion, no third-party viewer.",
  },
  {
    icon: Video,
    title: "Video Motion Analysis",
    description:
      "Frame-by-frame video comparison for gait, range of motion, and rehabilitation tracking.",
  },
  {
    icon: Activity,
    title: "Interactive Cervical X-ray",
    description:
      "Interactive cervical spine visualization with measurement tools and standard reference overlays.",
  },
  {
    icon: Activity,
    title: "Interactive Lumbar X-ray",
    description:
      "Lumbar spine measurement and overlay tools designed around how chiropractors actually read films.",
  },
  {
    icon: Move,
    title: "Range of Motion",
    description:
      "Built-in ROM measurement and longitudinal tracking — no separate software, no manual logs.",
  },
  {
    icon: PersonStanding,
    title: "Posture Analysis",
    description:
      "Multi-angle posture assessment with anatomic landmark detection and printable patient reports.",
  },
  {
    icon: Mic,
    title: "Voice Navigation",
    description:
      "Hands-free voice commands so you can navigate scans and notes without touching the screen.",
  },
  {
    icon: Users,
    title: "Patient Management",
    description:
      "Integrated patient database with photo storage, insurance card scans, and visit history.",
  },
  {
    icon: Receipt,
    title: "HCFA 1500 Billing",
    description:
      "Generate compliant HCFA 1500 forms and manage billing inside the same workflow as your imaging.",
  },
];

/**
 * Featured trust badge: local-only image processing.
 * Pulled out separately because it deserves its own emphasis.
 */
export const localProcessingFeature: Feature = {
  icon: Lock,
  title: "Local-Only Image Processing",
  description:
    "All images are processed locally in your browser. Nothing is uploaded. Patient data never leaves your computer.",
};
