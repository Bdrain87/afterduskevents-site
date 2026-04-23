/**
 * Customer testimonials. Replace placeholders with real entries as Blake collects them.
 * Set `featured: true` to surface in the marquee. Optional `videoSrc` for video testimonials
 * (host on Mux when ready).
 */
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  /** Event type, e.g. "Wedding Reception" */
  eventType?: string;
  /** City + state, e.g. "Plymouth, MI" */
  location?: string;
  /** ISO date string */
  date?: string;
  /** Mux playback ID, YouTube ID, or local /videos/X.mp4 path */
  videoSrc?: string;
  /** Star rating, 1-5 */
  rating?: 1 | 2 | 3 | 4 | 5;
  featured?: boolean;
  /** Marks placeholder content awaiting Blake's real entries */
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  // Replace these placeholders with real customer quotes.
  // The site renders testimonials only when isPlaceholder is false OR not set.
  {
    id: "placeholder-1",
    quote: "Placeholder testimonial — Blake to replace with first real customer quote.",
    author: "First Customer Name",
    eventType: "Backyard Movie Night",
    location: "Canton, MI",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    quote: "Placeholder testimonial — Blake to replace with second real customer quote.",
    author: "Second Customer Name",
    eventType: "HOA Block Party",
    location: "Plymouth, MI",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    quote: "Placeholder testimonial — Blake to replace with third real customer quote.",
    author: "Third Customer Name",
    eventType: "Wedding Reception Cinema",
    location: "Northville, MI",
    rating: 5,
    isPlaceholder: true,
  },
];

/** Returns only real (non-placeholder) testimonials. */
export function publishedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => !t.isPlaceholder);
}

export function featuredTestimonials(): Testimonial[] {
  return publishedTestimonials().filter((t) => t.featured);
}

export function testimonialCount(): number {
  return publishedTestimonials().length;
}
