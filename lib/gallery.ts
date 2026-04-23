/**
 * Past-event gallery. After Dusk Events is pre-launch. the only published entry
 * is the 30 ft studio render. Real past-event photos get added here as they
 * arrive. EventGallery auto-hides when no entries are published, so nothing
 * on the homepage claims events that haven't happened.
 *
 * Drop new image files into `public/images/gallery/` and reference them here.
 * Filename pattern: `{event-type}-{location}-{YYYY-MM-DD}.avif`.
 * Alt text should DESCRIBE the photo honestly. no invented gear or event claims.
 */
export type GalleryItem = {
  src: string;
  alt: string;
  eventType: string;
  location: string;
  /** ISO date string */
  date?: string;
  /** Optional blurDataURL for placeholder */
  blurDataURL?: string;
  /** Layout hint: "wide" spans 2 columns in bento, "tall" spans 2 rows */
  span?: "wide" | "tall" | "feature";
  /** Marks the hero shot. only one entry should set this true */
  isHero?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/setup/30ft-screen-studio.avif",
    alt: "After Dusk Events 30 foot inflatable outdoor cinema screen, studio render with person at base for scale",
    eventType: "The 30 ft",
    location: "Studio",
    span: "feature",
    isHero: true,
  },
];

/** Returns only entries that have a real `src`. */
export function publishedGallery(): GalleryItem[] {
  return gallery.filter((g) => g.src && g.src.length > 0);
}

export function getHeroImage(): GalleryItem | null {
  return publishedGallery().find((g) => g.isHero) ?? publishedGallery()[0] ?? null;
}
