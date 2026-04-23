/**
 * Past-event gallery data. Drop image files into `public/images/gallery/` and
 * reference them here. Filename pattern: `{event-type}-{location}-{YYYY-MM-DD}.avif`
 *
 * The 30 ft studio render lives at `public/images/setup/30ft-screen-studio.avif` and
 * is the first real entry. Other entries are empty-src placeholders that filter out
 * at render time until Blake drops real event photos.
 *
 * For each entry, alt text should DESCRIBE the photo honestly — no fabricated gear.
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
  /** Marks the hero shot — only one entry should set this true */
  isHero?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    // TODO: Blake — save the 30 ft studio render you sent to `public/images/setup/30ft-screen-studio.avif`
    // then replace the empty src below. Until then this entry stays hidden.
    src: "",
    alt: "After Dusk Events 30 foot inflatable outdoor cinema screen, studio render with person at base for scale",
    eventType: "The 30 ft",
    location: "Studio",
    span: "feature",
    isHero: true,
  },
  // Empty-src placeholders below — filtered out at render until Blake drops real event photos.
  {
    src: "",
    alt: "Backyard movie night with 30 ft inflatable screen at dusk",
    eventType: "Movie Night",
    location: "Canton, MI",
    span: "wide",
  },
  {
    src: "",
    alt: "Wedding reception with 30 ft screen and dance-floor audio",
    eventType: "Wedding Reception",
    location: "Ann Arbor, MI",
  },
  {
    src: "",
    alt: "Fight night watch party with Death From Below subwoofer and packed crowd",
    eventType: "Fight Night",
    location: "Plymouth, MI",
    span: "tall",
  },
  {
    src: "",
    alt: "Graduation party with photo reel on the 30 ft screen",
    eventType: "Graduation Party",
    location: "Northville, MI",
  },
  {
    src: "",
    alt: "Gaming night with the 8-bit retro system and wireless controllers on the big screen",
    eventType: "Gaming Night",
    location: "Canton, MI",
  },
  {
    src: "",
    alt: "Sports watch party with the 30 ft screen and concert-level audio",
    eventType: "Sports Watch Party",
    location: "Detroit, MI",
  },
  {
    src: "",
    alt: "Glow party with blacklights and neon kit on the 30 ft screen",
    eventType: "Get-together",
    location: "Birmingham, MI",
  },
];

/** Returns only entries that have a real `src`. */
export function publishedGallery(): GalleryItem[] {
  return gallery.filter((g) => g.src && g.src.length > 0);
}

export function getHeroImage(): GalleryItem | null {
  return publishedGallery().find((g) => g.isHero) ?? publishedGallery()[0] ?? null;
}
