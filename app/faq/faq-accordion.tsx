"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs";

export default function FaqAccordion() {
  return (
    <Accordion multiple={false} className="space-y-2">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="bg-charcoal border border-white/10 rounded-lg px-6 data-open:border-oxblood/40"
        >
          <AccordionTrigger className="text-projector font-heading text-base text-left py-5 hover:no-underline hover:text-projector aria-expanded:text-ember">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-steel leading-relaxed pb-5">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
