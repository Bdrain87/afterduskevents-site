/**
 * After Dusk Events real offering model:
 *   - One screen: 30 ft inflatable
 *   - Three audio tiers (the pricing axis): single speaker / two speakers / two speakers + Death From Below subwoofer
 *   - Content rule: BYO content + logins (Netflix, Disney+, YouTube, gaming consoles, etc.)
 *
 * Event types below are marketing framings, not distinct SKUs. A booking = one audio tier + relevant add-ons.
 *
 * Pricing: every tier's `startsAt` is null until Blake supplies real numbers. UI renders "Custom quote"
 * while null. `estimateRange` is internal to the ballpark tool only (not shown on package cards).
 */

export type AudioTier = {
  slug: "single-speaker" | "two-speakers" | "two-speakers-sub";
  name: string;
  price: string;
  /** Optional starting price (e.g. "$425"). Set null to keep fully quote-only. Blake to supply. */
  startsAt: string | null;
  popular?: boolean;
  /** What's in the setup. Only list gear Blake has confirmed. */
  includes: string[];
  /** Use-case fit, shown on cards. */
  best: string;
  /** Internal range for the ballpark tool. Blake to supply real numbers before this surfaces. */
  estimateRange?: { min: number; max: number };
};

export const audioTiers: AudioTier[] = [
  {
    slug: "single-speaker",
    name: "30 ft + Single Speaker",
    price: "Contact for quote",
    startsAt: null,
    includes: [
      "30 ft inflatable screen",
      "Single speaker",
      "BYO Content",
      "Water ballast setup — no digging",
    ],
    best: "Smaller backyards, intimate gatherings",
  },
  {
    slug: "two-speakers",
    name: "30 ft + Two Speakers",
    price: "Contact for quote",
    startsAt: null,
    popular: true,
    includes: [
      "30 ft inflatable screen",
      "Two speakers",
      "BYO Content",
      "Water ballast setup — no digging",
    ],
    best: "Standard outdoor events, most bookings",
  },
  {
    slug: "two-speakers-sub",
    name: "30 ft + Two Speakers + Death From Below Sub",
    price: "Contact for quote",
    startsAt: null,
    includes: [
      "30 ft inflatable screen",
      "Two speakers",
      "Death From Below subwoofer",
      "BYO Content",
      "Water ballast setup — no digging",
    ],
    best: "Fight nights, dance floors, bass-heavy music, large crowds",
  },
];

/**
 * Event types — marketing framings, not distinct products.
 * Each one maps to a recommended audio tier for the ballpark tool.
 */
export type UseCase = {
  slug:
    | "movie-night"
    | "gaming"
    | "sports"
    | "fights"
    | "wedding"
    | "graduation"
    | "celebration";
  name: string;
  desc: string;
  recommendedTier: AudioTier["slug"];
};

export const useCases: UseCase[] = [
  {
    slug: "movie-night",
    name: "Movie Night",
    desc: "Your yard. Our cinema. Bring your own content.",
    recommendedTier: "two-speakers",
  },
  {
    slug: "gaming",
    name: "Gaming Night",
    desc: "8-bit retro with 4 wireless controllers, or your PS/Xbox with staff hookup.",
    recommendedTier: "two-speakers",
  },
  {
    slug: "sports",
    name: "Sports Watch Party",
    desc: "Game day, bigger than any bar.",
    recommendedTier: "two-speakers-sub",
  },
  {
    slug: "fights",
    name: "Fight Night",
    desc: "UFC, boxing, WWE. Built for the bass drop.",
    recommendedTier: "two-speakers-sub",
  },
  {
    slug: "wedding",
    name: "Wedding Reception",
    desc: "Dance floor audio and a first-dance reel on a 30 ft screen.",
    recommendedTier: "two-speakers-sub",
  },
  {
    slug: "graduation",
    name: "Graduation Party",
    desc: "Photo reel and a movie all night.",
    recommendedTier: "two-speakers",
  },
  {
    slug: "celebration",
    name: "Get-together",
    desc: "Birthdays, holidays, any private gathering.",
    recommendedTier: "two-speakers",
  },
];

/** Map event type → suggested audio tier (for the ballpark tool and multi-step form). */
export function suggestTier(
  useCaseSlug: string,
  _guestCount?: string,
): AudioTier | null {
  const uc = useCases.find((u) => u.slug === useCaseSlug);
  if (!uc) return null;
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
