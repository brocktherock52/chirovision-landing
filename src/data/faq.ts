import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    question: "What is included in the 10-day free trial?",
    answer:
      "Full access to every ChiroVision feature: image comparison, DICOM support, video motion analysis, interactive X-rays, ROM, posture analysis, voice navigation, patient management, and HCFA 1500 billing. No tier limits during the trial.",
  },
  {
    question: "Do I need to enter a credit card to start the trial?",
    answer:
      "No. We do not collect payment information until after your 10-day trial ends and you decide to continue.",
  },
  {
    question: "What happens after the 10 days are up?",
    answer:
      "You can choose to subscribe at our standard monthly rate, request an extended evaluation, or simply walk away. We will never auto-charge a card we do not have.",
  },
  {
    question: "What hardware or software do I need?",
    answer:
      "Any modern computer (Windows, Mac, Chromebook, or Linux) with a current version of Chrome, Safari, Firefox, or Edge. ChiroVision runs in the browser, there is nothing to install.",
  },
  {
    question: "Is patient data uploaded anywhere?",
    answer:
      "No. All images and patient data are processed locally in your browser. Nothing is uploaded to our servers. ChiroVision is designed with HIPAA-aware privacy practices from the ground up.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel anytime. Cancellations take effect on the monthly anniversary of the date you enrolled, and you keep full access until then. No cancellation fees, no termination penalties.",
  },
  {
    question: "How is payment processed once I subscribe?",
    answer:
      "Payments are processed by Authorize.Net through Picture Perfect Health, LLC's secure merchant account. Authorize.Net is PCI DSS Level 1 compliant, the highest level of payment security. Your card never touches our servers, and you can cancel or change methods at any time.",
  },
];
