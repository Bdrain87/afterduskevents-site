/**
 * Past-event gallery data. Drop image files into `public/images/gallery/` and
 * reference them here. Filename pattern: `{event-type}-{location}-{YYYY-MM-DD}.avif`
 *
 * For each entry, alt text should DESCRIBE the photo (Vision AI flags mismatches).
 */
export type GalleryItem = {
  src: string;
  alt: string;
  eventType: string;
  location: string;
  /** ISO date string */
  date?: string;
  /** Optional 4-byte blurDataURL (data URI) for placeholder */
  blurDataURL?: string;
  /** Layout hint: "wide" spans 2 columns in bento, "tall" spans 2 rows */
  span?: "wide" | "tall" | "feature";
  /** Marks AI-generated placeholder vs. real event photo */
  isAIPlaceholder?: boolean;
  /** Marks the hero shot — only one entry should set this true */
  isHero?: boolean;
};

/**
 * Placeholder slots — replace `src` with `/images/gallery/{filename}.avif`
 * when real photos arrive. Until then, entries with empty `src` are filtered
 * out at render time so the gallery just renders the available items.
 */
export const gallery: GalleryItem[] = [
  {
    src: "",
    alt: "Hero photo of a 30-foot inflatable cinema screen at dusk in a Canton backyard",
    eventType: "Backyard Movie Night",
    location: "Canton, MI",
    span: "feature",
    isHero: true,
  },
  {
    src: "",
    alt: "Wedding reception cinema with screen displaying first dance reel",
    eventType: "Wedding",
    location: "Plymouth, MI",
    span: "wide",
  },
  {
    src: "",
    alt: "Soundboks 4 speakers and projector setup detail at sunset",
    eventType: "Equipment Detail",
    location: "Canton, MI",
  },
  {
    src: "",
    alt: "HOA block-party movie night with full audience seated on lawn",
    eventType: "HOA or Neighborhood",
    location: "Northville, MI",
    span: "tall",
  },
  {
    src: "",
    alt: "Indoor winter setup with 120-inch fast-fold screen in a community hall",
    eventType: "Indoor Winter",
    location: "Ann Arbor, MI",
  },
  {
    src: "",
    alt: "Sports watch party with Soundboks audio and live game on screen",
    eventType: "Sports Watch Party",
    location: "Detroit, MI",
  },
  {
    src: "",
    alt: "Birthday party at dusk with fairy-light strung backyard and movie playing",
    eventType: "Birthday or Graduation",
    location: "Birmingham, MI",
  },
  {
    src: "",
    alt: "Corporate event with multi-zone Soundboks audio and presentation on screen",
    eventType: "Corporate or Community Org",
    location: "Novi, MI",
  },
];

/** Returns only entries that have a real `src`. */
export function publishedGallery(): GalleryItem[] {
  return gallery.filter((g) => g.src && g.src.length > 0);
}

export function getHeroImage(): GalleryItem | null {
  return publishedGallery().find((g) => g.isHero) ?? publishedGallery()[0] ?? null;
}
