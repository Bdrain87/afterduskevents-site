export type Package = {
  name: string;
  price: string;
  /** Optional starting price hint (e.g. "$425") rendered next to the quote line. Set null to keep fully quote-only. */
  startsAt?: string | null;
  popular?: boolean;
  highlights: string[];
  best: string;
  slug: string;
  /** Internal range used by the ballpark tool. Not rendered directly. */
  estimateRange?: { min: number; max: number };
};

export const corePackages: Package[] = [
  {
    name: "Intimate 20 ft",
    slug: "intimate-20",
    price: "Contact for quote",
    startsAt: null, // Blake to set when ready
    estimateRange: { min: 400, max: 650 },
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
    startsAt: null,
    estimateRange: { min: 650, max: 1100 },
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
    startsAt: null,
    estimateRange: { min: 450, max: 900 },
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
    estimateRange: { min: 700, max: 1400 },
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
    estimateRange: { min: 500, max: 900 },
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
    estimateRange: { min: 500, max: 900 },
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
    estimateRange: { min: 450, max: 1100 },
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
    estimateRange: { min: 900, max: 1800 },
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

/**
 * Map of event-type form values to suggested package + range.
 * Used by the ballpark tool and the multi-step contact form.
 */
export const eventTypeToPackage: Record<string, { suggestedSlug: string; range: { min: number; max: number } }> = {
  "Movie Night": { suggestedSlug: "intimate-20", range: { min: 400, max: 650 } },
  "Sports Watch Party": { suggestedSlug: "sports-watch-party", range: { min: 700, max: 1400 } },
  "Gaming Night": { suggestedSlug: "gaming-night", range: { min: 500, max: 900 } },
  "Karaoke Night": { suggestedSlug: "karaoke-night", range: { min: 500, max: 900 } },
  "Birthday or Graduation": { suggestedSlug: "birthday-or-graduation", range: { min: 450, max: 1100 } },
  "Wedding": { suggestedSlug: "wedding-reception-cinema", range: { min: 1500, max: 3500 } },
  "Corporate or Community Org": { suggestedSlug: "corporate-or-community-org", range: { min: 900, max: 1800 } },
  "HOA or Neighborhood": { suggestedSlug: "community-30", range: { min: 650, max: 1100 } },
  "Other Private Event": { suggestedSlug: "intimate-20", range: { min: 450, max: 1100 } },
};

export function suggestPackage(eventType: string, guestCount?: string): { name: string; range: { min: number; max: number } } | null {
  const base = eventTypeToPackage[eventType];
  if (!base) return null;

  // Guest count override: 75+ guests pushes to Community 30ft
  let suggestedSlug = base.suggestedSlug;
  let range = base.range;
  if (guestCount && (guestCount === "75 to 150" || guestCount === "150+") && eventType !== "Wedding") {
    suggestedSlug = "community-30";
    range = { min: 800, max: 1500 };
  }

  const pkg = allPackages.find((p) => p.slug === suggestedSlug);
  if (!pkg) return null;
  return { name: pkg.name, range };
}
