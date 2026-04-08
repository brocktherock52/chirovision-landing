import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { faqs } from "@/data/faq";

export function FAQ() {
  return (
    <section id="faq" className="bg-muted/30 py-20 sm:py-28">
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Common questions about the trial" />

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-left text-base font-semibold sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
