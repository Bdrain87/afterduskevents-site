/**
 * After Dusk Events real offering model:
 *   - One screen: 30 ft inflatable
 *   - Four audio tiers (the pricing axis): single speaker / two speakers / two speakers + subwoofer / four speakers + two subwoofers
 *   - Content rule: BYO content + logins (Netflix, Disney+, YouTube, gaming consoles, etc.)
 *
 * Event types below are marketing framings, not distinct SKUs. A booking = one audio tier + relevant add-ons.
 *
 * Pricing: every tier's `startsAt` is null until Blake supplies real numbers. UI renders "Custom quote"
 * while null. `estimateRange` is internal to the ballpark tool only (not shown on package cards).
 */

export type AudioTier = {
  slug: "single-speaker" | "two-speakers" | "two-speakers-sub" | "four-speakers-two-subs";
  name: string;
  popular?: boolean;
  speakerCount: number;
  subwooferCount: number;
  /** Plain-English sales promise for package cards and recommendations. */
  plainBenefit: string;
  /** How this setup covers the space, written for non-audio people. */
  coverageNote: string;
  /** What the customer should expect to hear/feel. */
  soundProfile: string;
  /** Small technical details for detail pages and comparison views. */
  technicalNotes: string[];
  /** Practical event fits that can be shown as chips. */
  recommendedFor: string[];
  /** What's in the setup. Only list gear Blake has confirmed. */
  includes: string[];
  /** Use-case fit, shown on cards. */
  best: string;
};

export const audioTiers: AudioTier[] = [
  {
    slug: "single-speaker",
    name: "30 ft + Single Speaker",
    speakerCount: 1,
    subwooferCount: 0,
    plainBenefit: "Simple, clean sound for smaller groups seated close to the screen.",
    coverageNote: "Best when everyone is gathered in one main viewing area.",
    soundProfile: "Clear dialogue and enough punch for a calm backyard movie night.",
    technicalNotes: [
      "Speaker system is manufacturer-rated up to 126 dB max volume.",
      "Full-range speaker response covers 40 Hz-20 kHz.",
      "Battery-powered audio keeps setup flexible when outlets are not nearby.",
    ],
    recommendedFor: ["Small yards", "Family movie nights", "Groups under 25"],
    includes: [
      "30 ft inflatable screen",
      "Single speaker",
      "BYO Content",
      "Water ballast setup. no digging",
    ],
    best: "Smaller backyards, intimate gatherings",
  },
  {
    slug: "two-speakers",
    name: "30 ft + Two Speakers",
    popular: true,
    speakerCount: 2,
    subwooferCount: 0,
    plainBenefit: "Wider left/right coverage for most private events.",
    coverageNote: "Two speakers spread the sound so guests do not need to sit in one tight cluster.",
    soundProfile: "Balanced dialogue, sports audio, and music at a comfortable outdoor volume.",
    technicalNotes: [
      "Each speaker is manufacturer-rated up to 126 dB max volume.",
      "Full-range speaker response covers 40 Hz-20 kHz.",
      "Wireless speaker linking supports a clean left/right layout.",
    ],
    recommendedFor: ["Most backyards", "Graduations", "Sports watch parties", "25-75 guests"],
    includes: [
      "30 ft inflatable screen",
      "Two speakers",
      "BYO Content",
      "Water ballast setup. no digging",
    ],
    best: "Standard outdoor events, most bookings",
  },
  {
    slug: "two-speakers-sub",
    name: "30 ft + Two Speakers + Subwoofer",
    speakerCount: 2,
    subwooferCount: 1,
    plainBenefit: "Adds real low-end support for events where the audio matters more.",
    coverageNote: "Stereo speakers carry the main sound while the subwoofer fills in the low end.",
    soundProfile: "Cleaner bass for fights, sports, music, and bigger outdoor groups.",
    technicalNotes: [
      "Subwoofer uses dual 8-inch low-frequency drivers.",
      "Subwoofer response reaches 25 Hz-180 Hz for deeper low-end support.",
      "Wireless SKAA connection keeps the subwoofer placement flexible.",
      "Battery-powered subwoofer can run away from wall power.",
    ],
    recommendedFor: ["Fight nights", "Sports", "Music-heavy events", "75-150 guests"],
    includes: [
      "30 ft inflatable screen",
      "Two speakers",
      "Subwoofer",
      "BYO Content",
      "Water ballast setup. no digging",
    ],
    best: "Fight nights, bass-heavy music, large crowds",
  },
  {
    slug: "four-speakers-two-subs",
    name: "30 ft + Four Speakers + Two Subwoofers",
    speakerCount: 4,
    subwooferCount: 2,
    plainBenefit: "Maximum coverage for big yards, field layouts, and high-energy crowds.",
    coverageNote: "Four speakers help cover the space front to back while two subs support the low end.",
    soundProfile: "The fullest setup: more even coverage, stronger bass, and better reach across a larger layout.",
    technicalNotes: [
      "Four linked full-range speakers support wider outdoor coverage.",
      "Each full-range speaker is manufacturer-rated up to 126 dB max volume.",
      "Two wireless subwoofers add dual-driver low-end support down to 25 Hz.",
      "Battery-powered speakers and subs keep the layout flexible.",
    ],
    recommendedFor: ["Large yards", "Fields", "150+ guests", "High-energy events"],
    includes: [
      "30 ft inflatable screen",
      "Four speakers",
      "Two subwoofers",
      "BYO Content",
      "Water ballast setup. no digging",
    ],
    best: "Large crowds, field layouts, high-energy events",
  },
];

/**
 * Event types. marketing framings, not distinct products.
 * Each one maps to a recommended audio tier for the ballpark tool.
 */
export type UseCase = {
  slug:
    | "movie-night"
    | "gaming"
    | "sports"
    | "fights"
    | "graduation"
    | "celebration";
  name: string;
  desc: string;
  image: string;
  imageAlt: string;
  recommendedTier: AudioTier["slug"];
};

export const useCases: UseCase[] = [
  {
    slug: "movie-night",
    name: "Movie Night",
    desc: "A private outdoor cinema setup for your own movie, account, or playlist.",
    image: "/images/events/movie-night.jpg",
    imageAlt: "Blank outdoor movie screen with striped chairs in front of it",
    recommendedTier: "two-speakers",
  },
  {
    slug: "gaming",
    name: "Gaming Night",
    desc: "Plug-and-play retro games with wireless controllers, or your PS/Xbox with staff hookup.",
    image: "/images/events/gaming-night.jpg",
    imageAlt: "Friends on a couch playing video games with snacks and drinks",
    recommendedTier: "two-speakers",
  },
  {
    slug: "sports",
    name: "Sports Watch Party",
    desc: "Big screen visibility with enough audio coverage for the whole yard.",
    image: "/images/events/sports-watch.jpg",
    imageAlt: "Friends in football gear cheering while watching a game together",
    recommendedTier: "two-speakers-sub",
  },
  {
    slug: "fights",
    name: "Fight Night",
    desc: "Clear commentary, crowd energy, and low-end support for the walkouts.",
    image: "/images/events/fight-night.jpg",
    imageAlt: "Boxers fighting in a ring with a crowd watching ringside",
    recommendedTier: "two-speakers-sub",
  },
  {
    slug: "graduation",
    name: "Graduation Party",
    desc: "Photo reels, speeches, slideshows, or a movie once the sun drops.",
    image: "/images/events/graduation.jpg",
    imageAlt: "Graduate in cap and gown celebrating outdoors on a sunny campus walkway",
    recommendedTier: "two-speakers",
  },
  {
    slug: "celebration",
    name: "Get-together",
    desc: "Birthdays, holidays, and private gatherings that need a focal point.",
    image: "/images/events/celebration.jpg",
    imageAlt: "Friends taking a selfie during an outdoor backyard dinner party",
    recommendedTier: "two-speakers",
  },
];

/** Map event type → suggested audio tier (for the ballpark tool and multi-step form). */
export function suggestTier(
  useCaseSlug: string,
  guestCount?: string,
): AudioTier | null {
  const uc = useCases.find((u) => u.slug === useCaseSlug);
  if (!uc) return null;

  if (guestCount === "150+") {
    return audioTiers.find((t) => t.slug === "four-speakers-two-subs") ?? null;
  }

  return audioTiers.find((t) => t.slug === uc.recommendedTier) ?? null;
}

/** Back-compat: some call sites expect an event-type-string → suggestion map.
 *  New callers should use `suggestTier(useCaseSlug, guestCount)` directly.
 *  Key is the UseCase.name (what shows in the UI). */
export const eventTypeToTier: Record<string, AudioTier["slug"]> = useCases.reduce(
  (acc, uc) => {
    acc[uc.name] = uc.recommendedTier;
    return acc;
  },
  {} as Record<string, AudioTier["slug"]>,
);

/** All tiers, for iteration in schema + comparison-table. */
export const allTiers: AudioTier[] = [...audioTiers];
