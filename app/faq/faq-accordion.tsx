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
    <Accordion multiple={false} className="divide-y divide-white/10 border-t border-b border-white/10">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="data-open:bg-charcoal/30"
        >
          <AccordionTrigger className="text-projector font-heading text-heading-md text-left py-6 pr-2 hover:no-underline hover:text-ember aria-expanded:text-ember transition-colors">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-silver leading-relaxed pb-6 pr-6 max-w-[56ch] text-body">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
