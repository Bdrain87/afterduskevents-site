export type Package = {
  name: string;
  price: string;
  popular?: boolean;
  highlights: string[];
  best: string;
  slug: string;
};

export const corePackages: Package[] = [
  {
    name: "Intimate 20 ft",
    slug: "intimate-20",
    price: "Contact for quote",
    popular: false,
    highlights: [
      "3 hour event",
      "20 ft airtight inflatable screen",
      "4K laser projector (BenQ LU930)",
      "2 Soundboks 4 wireless speakers",
      "BYO Content",
      "Water ballast, no digging required",
    ],
    best: "Backyards, small parties, family movie nights",
  },
  {
    name: "Community 30 ft",
    slug: "community-30",
    price: "Contact for quote",
    popular: true,
    highlights: [
      "4 hour event",
      "30 ft airtight inflatable screen",
      "4K laser projector",
      "4 Soundboks 4 speakers across two zones",
      "1 Death From Below MK2 subwoofer",
      "BYO Content",
      "Coverage up to ~250 people",
    ],
    best: "HOA nights, block parties, church events, larger backyards",
  },
  {
    name: "Indoor Winter",
    slug: "indoor-winter",
    price: "Contact for quote",
    popular: false,
    highlights: [
      "3 hour event",
      "120 inch Da-Lite fast-fold screen",
      "4K laser projector",
      "2 Soundboks 4 speakers",
      "BYO Content",
      "Works in halls, gyms, barns, large living rooms",
    ],
    best: "Year-round events regardless of weather",
  },
];

export const eventPackages: Package[] = [
  {
    name: "Sports Watch Party",
    slug: "sports-watch-party",
    price: "Contact for quote",
    highlights: [
      "4 hour event, 30 ft screen",
      "Multi-zone Soundboks audio",
      "DFB MK2 subwoofer",
      "Live TV or streaming via Starlink Mini",
    ],
    best: "Fight nights, Super Bowl, Final Four, World Cup",
  },
  {
    name: "Gaming Night",
    slug: "gaming-night",
    price: "Contact for quote",
    highlights: [
      "4 hour event, 20 ft screen",
      "Nintendo Switch OLED + Retroid Pocket 4 Pro",
      "Wireless controllers",
      "2 Soundboks 4 speakers",
    ],
    best: "Birthdays, teen events, corporate team building",
  },
  {
    name: "Karaoke Night",
    slug: "karaoke-night",
    price: "Contact for quote",
    highlights: [
      "3 hour event, 20 ft screen",
      "2 professional wireless microphones",
      "Multi-zone Soundboks audio",
      "Lightboks audio-reactive LED lighting",
    ],
    best: "Birthdays, bachelorette, holiday parties",
  },
  {
    name: "Birthday or Graduation",
    slug: "birthday-or-graduation",
    price: "Contact for quote",
    highlights: [
      "3 to 4 hour event",
      "20 ft or 30 ft screen",
      "Full Soundboks audio",
      "Photo slideshow or memory reel on screen",
    ],
    best: "Milestone celebrations for all ages",
  },
  {
    name: "Corporate or Community Org",
    slug: "corporate-or-community-org",
    price: "Contact for quote",
    highlights: [
      "4 to 6 hour event, 30 ft screen",
      "Multi-zone Soundboks audio",
      "Wireless mic pair for speakers",
      "Starlink Mini for presentations and live streams",
      "Invoicing and COI support",
    ],
    best: "Company events, non-profits, community organizations",
  },
];

export const allPackages: Package[] = [...corePackages, ...eventPackages];
