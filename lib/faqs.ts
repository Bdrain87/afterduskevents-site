export type Faq = {
  q: string;
  a: string;
};

/**
 * FAQs reflect After Dusk Events' real operations only.
 * Anything Blake hasn't confirmed (power solution brand, rain-reschedule policy specifics,
 * exact deposit terms, etc.) stays out of this file until he supplies it.
 */
export const faqs: Faq[] = [
  {
    q: "How does pricing work?",
    a: "Every event is different. Date, distance, duration, venue, and add-ons all change the number. Every booking gets a custom quote from Blake, delivered within 24 hours of inquiry. No published price list, no automated calculator.",
  },
  {
    q: "Can I sell tickets or charge admission?",
    a: "No. All After Dusk Events bookings are for private, non-ticketed, non-admission-charged gatherings. Selling tickets, charging admission, taking donations tied to entry, or advertising to the general public turns a private screening into a public performance and triggers federal licensing obligations outside the scope of our service. Violations void the Service Agreement and shift full liability to the client.",
  },
  {
    q: "How far do you travel?",
    a: "Inside 60 miles of Canton, MI, no separate travel fee. Beyond that, contact Blake for a custom quote with travel.",
  },
  {
    q: "Do we bring our own content?",
    a: "Yes. Stream from your own accounts: Netflix, Disney+, YouTube, Apple TV+, HBO Max, or whatever you subscribe to. Same rule applies to karaoke: we use YouTube karaoke tracks with our 2 wireless mics as an add-on. For console gaming you either use our 8-bit retro system with 4 wireless controllers, or you bring your own PlayStation or Xbox and staff connects it for you.",
  },
  {
    q: "What audio tiers do you offer?",
    a: "Three tiers on the same 30 ft screen: single speaker, two speakers, or two speakers plus a Death From Below subwoofer. The subwoofer tier is the right call for fight nights and music-heavy events where bass matters.",
  },
  {
    q: "Can we hook up our own console or laptop?",
    a: "Yes. Staff connects your PlayStation, Xbox, or laptop for you. A BYO Console Hookup Waiver is signed at the event. Priced at quote.",
  },
  {
    q: "Do you offer karaoke?",
    a: "Yes, as an add-on: YouTube karaoke plus two wireless mics. BYO content rule applies: you pick the tracks.",
  },
  {
    q: "Can you handle cold weather and bugs?",
    a: "Patio heater and bug zapper are both available as add-ons. Ask Blake at quote time.",
  },
  {
    q: "Do you need to stake the screen?",
    a: "Most of the time, no. Water ballast setup handles most sites including backyards, driveways, barns, hardscape, and private estates. If stakes are required by weather or venue, the client calls Miss Dig 811 at least 3 business days ahead and provides the ticket number and visible markings.",
  },
  {
    q: "Do we need power or wifi?",
    a: "No. We bring our own generator and battery backup on every event, and Starlink for content streaming when venue wifi is unavailable. Zero venue dependency.",
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
    q: "Do you handle weddings?",
    a: "Yes. Wedding receptions run on the same 30 ft screen with your chosen audio tier (most wedding receptions go with two speakers plus the Death From Below subwoofer). Wedding-relevant add-ons include early setup, late teardown, photo area with backdrop, ambient string lighting, and patio heater.",
  },
  {
    q: "What if it rains?",
    a: "Contact Blake to confirm the weather policy that applies to your booking. Rain policy specifics are spelled out in the Service Agreement that comes with your quote.",
  },
];
