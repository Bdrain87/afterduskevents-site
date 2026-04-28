import { audioTiers } from "./packages";

export type Faq = {
  q: string;
  a: string;
};

/**
 * FAQs reflect After Dusk Events' real operations only.
 * Anything Blake hasn't confirmed (power solution brand, rain-reschedule policy specifics,
 * exact deposit terms, etc.) stays out of this file until he supplies it.
 */
const audioTierSummary = audioTiers
  .map((tier) => `${tier.name}: ${tier.plainBenefit}`)
  .join(" ");

export const faqs: Faq[] = [
  {
    q: "How does pricing work?",
    a: "Every event is different. Date, distance, duration, venue, and add-ons all change the number. Every booking gets a custom quote within 24 hours of inquiry. No published price list, no automated calculator.",
  },
  {
    q: "Can I sell tickets or charge admission?",
    a: "No. All After Dusk Events bookings are for private, non-ticketed, non-admission-charged gatherings. Selling tickets, charging admission, taking donations tied to entry, or advertising to the general public turns a private screening into a public performance and triggers federal licensing obligations outside the scope of our service. Violations void the Service Agreement and shift full liability to the client.",
  },
  {
    q: "How far do you travel?",
    a: "Inside 40 miles of Canton, MI, no separate travel fee. Beyond 40 miles, an additional travel charge is added to the quote.",
  },
  {
    q: "Do we bring our own content?",
    a: "Yes. Stream from your own accounts: Netflix, Disney+, YouTube, Apple TV+, HBO Max, or whatever you subscribe to. Same rule applies to karaoke: we use YouTube karaoke tracks with our 2 wireless mics as an add-on. For console gaming you can add the retro gaming kit with four wireless controllers, or you can bring your own PlayStation or Xbox and staff connects it for you.",
  },
  {
    q: "What audio tiers do you offer?",
    a: `Four tiers on the same 4K projector and 30 ft screen setup. ${audioTierSummary} In plain terms: clearer voices, stronger bass, cleaner placement, and better coverage for the crowd.`,
  },
  {
    q: "What does the picture setup include?",
    a: "Every booking includes a 4K theater-quality projector and a 30 ft inflatable cinema screen. The picture side stays premium across every package; the package choice changes the audio coverage and bass.",
  },
  {
    q: "Can we hook up our own console or laptop?",
    a: "Yes. Staff connects your PlayStation, Xbox, or laptop for you. A BYO Console Hookup Waiver is signed at the event. Priced at quote.",
  },
  {
    q: "What is included with the retro gaming add-on?",
    a: "The retro gaming kit includes a 100,000+ classic-game library across 50+ classic systems, supports offline play, and can be set up with four wireless controllers for multiplayer nights.",
  },
  {
    q: "Do you offer karaoke?",
    a: "Yes, as an add-on: YouTube karaoke plus two wireless mics. BYO content rule applies: you pick the tracks.",
  },
  {
    q: "Can you handle cold weather, bugs, and airflow?",
    a: "Patio heaters, bug zappers, and fans are available as add-ons. Ask at quote time.",
  },
  {
    q: "Do you need to stake the screen?",
    a: "Yes. The screen uses ground anchors drilled into the site, so the setup needs an anchor-friendly grass or soil area. If the venue requires utility marking, the client calls Miss Dig 811 at least 3 business days ahead and provides the ticket number and visible markings.",
  },
  {
    q: "Do we need power or wifi?",
    a: "Venue power and wifi are ideal and will be used first when available. We bring a generator, battery bank, and Starlink as backups so the night runs either way.",
  },
  {
    q: "Who secures the venue permit if the event is on public or rented property?",
    a: "The customer. For any non-private-backyard venue (parks, community spaces, HOA common areas, rented properties, etc.), the customer is responsible for obtaining the permit or approval from the property owner or municipality. We show up and set up once that's confirmed.",
  },
  {
    q: "Are you insured?",
    a: "Yes. Full commercial general liability. We can add venues as additional insured on request. Certificate of Insurance available on request.",
  },
  {
    q: "What if it rains?",
    a: "Contact us to confirm the weather policy that applies to your booking. Rain policy specifics are spelled out in the Service Agreement that comes with your quote.",
  },
];
