"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Why is every price a starting estimate?",
    a: "Every event is different. Date, distance, duration, venue requirements, and add-ons all change the number. Every booking gets a custom quote from Blake. There is no automated calculator.",
  },
  {
    q: "Can I sell tickets or charge admission?",
    a: "No. All After Dusk Events bookings are for private, non-ticketed, non-admission-charged gatherings. Selling tickets, charging admission, taking donations tied to entry, or advertising to the general public turns a private screening into a public performance and triggers federal licensing obligations outside the scope of our service. The Service Agreement and Private Event Acknowledgment prohibit ticketed use. Violations void the agreement and shift full liability to the client.",
  },
  {
    q: "How far do you travel?",
    a: "Anywhere inside 60 miles of Canton, MI. Beyond that, contact Blake for a custom quote with a travel fee.",
  },
  {
    q: "Do we need to provide power?",
    a: "No. Dual power comes with every event: Honda generator plus EcoFlow silent battery backup. Zero venue dependency.",
  },
  {
    q: "Do we need wifi?",
    a: "No. Starlink Mini is included on every event. If your venue wifi goes down, we do not.",
  },
  {
    q: "Can we rent without a movie license?",
    a: "Yes. We are a BYO Content business. You bring your own movie, show, slideshow, stream, or game feed. You supply the content and confirm you have the right to show it privately. We run the equipment.",
  },
  {
    q: "What if it rains?",
    a: "We monitor forecasts 72 hours out. If we call the event, you get a free reschedule within 6 months. Our Weather Policy is in the Service Agreement.",
  },
  {
    q: "Can we hook up our own console or laptop?",
    a: "Yes, with a signed BYO Console Hookup Waiver. It is a $75 add-on.",
  },
  {
    q: "Do you do indoor events?",
    a: "Yes. The Indoor Winter package uses a 120 inch Da-Lite fast-fold screen. Works in community rooms, church halls, gyms, large living rooms, and barns. Year-round, weather-proof.",
  },
  {
    q: "Is the audio loud enough for a big crowd?",
    a: "Yes. Four Soundboks 4 speakers cover up to ~250 people. Add extra Soundboks zones or the DFB MK2 subwoofer for larger crowds or dance floors.",
  },
  {
    q: "Do you need to stake the screen?",
    a: "Most of the time, no. Water ballast setup handles most sites including golf courses, vineyards, barns, hardscape, and private estates. If stakes are required by weather or venue, you call Miss Dig 811 at least 3 business days ahead and provide the ticket number and visible markings.",
  },
  {
    q: "Are you insured?",
    a: "Yes. Full commercial general liability. We can add venues as additional insured on request. Certificate of Insurance available on request.",
  },
  {
    q: "Do you handle weddings?",
    a: "Yes. Three tiers: Elopement, Wedding Reception Cinema, and Wedding Full Day. See the Weddings page for full details.",
  },
];

export default function FaqAccordion() {
  return (
    <Accordion multiple={false} className="space-y-2">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="bg-charcoal border border-white/10 rounded-lg px-6 data-open:border-oxblood/40"
        >
          <AccordionTrigger className="text-projector font-heading text-base text-left py-5 hover:no-underline hover:text-projector data-[panel-open]:text-oxblood">
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
