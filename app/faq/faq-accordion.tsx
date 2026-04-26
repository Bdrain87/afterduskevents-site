"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { faqs } from "@/lib/faqs";

/**
 * FAQ list — flat editorial layout, no rounded box wrapping the whole
 * stack. Each question is a row separated from the next by a hairline
 * divider; the only chrome is a small ember "+" that rotates to a "−"
 * on expand. Reads like a magazine FAQ rather than a Bootstrap
 * accordion.
 *
 * Replaces the previous shared <Accordion> wrapper which surrounded the
 * list with a heavy rounded-lg border and rendered a bullseye-style
 * "projector bulb" indicator that looked like a radio button against
 * the question rows.
 */
export default function FaqAccordion() {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className="flex w-full flex-col"
    >
      {faqs.map((faq, i) => (
        <AccordionPrimitive.Item
          key={i}
          value={`item-${i}`}
          className="border-b border-white/[0.07] last:border-b-0 transition-colors data-open:bg-charcoal/15"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group/faq-trigger relative flex w-full items-start gap-6 py-5 text-left transition-colors outline-none focus-visible:bg-charcoal/30">
              <h3 className="font-heading text-heading-md text-projector flex-1 transition-colors group-hover/faq-trigger:text-ember group-aria-expanded/faq-trigger:text-ember">
                {faq.q}
              </h3>
              <span
                aria-hidden="true"
                className="relative mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center"
              >
                {/* horizontal bar — always present */}
                <span className="absolute h-px w-4 bg-steel/70 transition-colors group-hover/faq-trigger:bg-ember group-aria-expanded/faq-trigger:bg-ember" />
                {/* vertical bar — rotates 90° on expand so the "+" becomes a "−" */}
                <span className="absolute h-4 w-px bg-steel/70 transition-all duration-300 group-hover/faq-trigger:bg-ember group-aria-expanded/faq-trigger:rotate-90 group-aria-expanded/faq-trigger:bg-ember" />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel
            data-slot="accordion-content"
            className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
          >
            <div className="h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0">
              <p className="max-w-[60ch] pb-6 pr-10 text-body leading-relaxed text-silver">
                {faq.a}
              </p>
            </div>
          </AccordionPrimitive.Panel>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
