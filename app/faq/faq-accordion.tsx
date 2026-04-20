"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How far do you travel?",
    a: "Anywhere inside 60 miles of Canton, MI. Farther on request -- a travel fee applies beyond that radius. If you are in the greater Detroit or Ann Arbor metro area, we can almost certainly make it work.",
  },
  {
    q: "What if it rains?",
    a: "We watch forecasts closely. Safety and equipment protection come first. If we call the event due to severe weather, you reschedule within 12 months at no extra cost. Our full Weather Policy is spelled out in the Service Agreement so there are no surprises.",
  },
  {
    q: "Do you bring power?",
    a: "Yes. Our Premium Cinema and Corporate packages include a generator so we can set up on fields, farms, and parks with no outlets nearby. For venues with reliable power, we can run off your outlets and skip the generator. Just ask when you request a quote.",
  },
  {
    q: "What movie can we play?",
    a: "Your choice. You supply the content -- streaming, Blu-ray, or download -- and confirm you have the rights to show it at your event. We are strictly the equipment and operator. We do not supply content or licensing.",
  },
  {
    q: "Are you insured?",
    a: "Yes. We carry commercial general liability plus equipment coverage. A Certificate of Insurance is provided on request, which is typically needed for school and corporate venues.",
  },
  {
    q: "Do you need to stake the screen?",
    a: "Yes. Stakes go 1 to 4 feet into the ground depending on conditions. You must call Miss Dig 811 (just dial 811) at least 3 business days before your event to get underground utilities marked. We will not set up without a ticket number and visible markings. It takes about five minutes and protects everyone.",
  },
  {
    q: "Can we do sports or gaming?",
    a: "Absolutely. Sports Watch and Gaming are two of our most popular packages outside movie season. Live-stream support, multi-controller setup, you name it -- tell us what you are planning.",
  },
  {
    q: "How much is the deposit?",
    a: "50% at signing to hold the date, balance due on event day. We accept card, tap, or invoice. Deposits are non-refundable, but rescheduling is available for weather per our Weather Policy in the Service Agreement.",
  },
];

export default function FaqAccordion() {
  return (
    <Accordion multiple={false} className="space-y-2">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="bg-brand-charcoal border border-white/10 rounded-lg px-6 data-[state=open]:border-brand-red/40"
        >
          <AccordionTrigger className="text-brand-white font-heading text-base text-left py-5 hover:no-underline hover:text-brand-white [&[data-state=open]]:text-brand-red">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-brand-gray leading-relaxed pb-5">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
