export type WeddingTier = {
  name: string;
  slug: string;
  duration: string;
  popular?: boolean;
  includes: string[];
  cta: string;
};

export const weddingTiers: WeddingTier[] = [
  {
    name: "Elopement / Micro-Wedding",
    slug: "elopement-micro-wedding",
    duration: "3 hour event",
    includes: [
      "20 ft airtight inflatable screen",
      "4K laser projector",
      "2 Soundboks 4 speakers",
      "Ceremony wireless mic pair",
      "Projected ceremony backdrop",
      "Water ballast, no venue staking required",
    ],
    cta: "Request Elopement Quote",
  },
  {
    name: "Wedding Reception Cinema",
    slug: "wedding-reception-cinema",
    duration: "4 to 5 hour event",
    popular: true,
    includes: [
      "30 ft airtight inflatable screen",
      "4K laser projector",
      "Dance floor Soundboks audio zone",
      "Death From Below MK2 subwoofer",
      "First dance film or love-story reel display",
      "Wireless mic pair for toasts",
      "Lightboks audio-reactive LED lighting",
    ],
    cta: "Request Reception Quote",
  },
  {
    name: "Wedding Full Day",
    slug: "wedding-full-day",
    duration: "6 to 8 hour event (ceremony through reception)",
    includes: [
      "Dual audio zones: ceremony and reception",
      "Wireless mic pair for vows and officiant",
      "Ceremony backdrop projection",
      "30 ft reception screen",
      "Reception dance floor Soundboks and DFB MK2",
      "Lightboks dance floor lighting",
      "On-site crew from ceremony through breakdown",
    ],
    cta: "Request Full Day Quote",
  },
];

export const weddingAddOns = [
  { item: "Ceremony sound setup", bestFor: "Clean vows audio and processional music" },
  { item: "First dance projected film", bestFor: "Love-story reel during first dance" },
  { item: "Reception dance floor zone", bestFor: "Premium Soundboks and Lightboks dance floor" },
  { item: "Late night after-party bass drop", bestFor: "After-dinner energy shift" },
  { item: "Brunch projection loop", bestFor: "Next-day brunch recap loops" },
];

export const weddingFaq = [
  {
    q: "Do you handle ceremonies and receptions?",
    a: "Yes. The Full Day package covers ceremony through reception with dual audio zones. The Elopement and Reception Cinema tiers are purpose-built for shorter events.",
  },
  {
    q: "Do you need to stake the screen at our venue?",
    a: "No. Water ballast setup handles most sites including golf courses, vineyards, barns, hardscape, and private estates. No utility locates needed.",
  },
  {
    q: "Can you show our engagement video or love-story reel?",
    a: "Yes. BYO Content means you supply the video and we display it. The First Dance Projected Film add-on is built for exactly this.",
  },
  {
    q: "Is the audio loud enough for a dance floor?",
    a: "Yes. The Reception and Full Day tiers include a dedicated dance floor Soundboks zone and a DFB MK2 subwoofer.",
  },
  {
    q: "Are these private events only?",
    a: "Yes. All bookings are for private, non-ticketed gatherings. Selling tickets or charging admission is prohibited per our Service Agreement.",
  },
];
