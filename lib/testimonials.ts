/**
 * Customer testimonials. After Dusk Events is pre-launch. this array stays empty
 * until Blake has real customer quotes to publish. TestimonialsSection renders
 * nothing when the array is empty, so the homepage stays honest.
 *
 * When adding a real testimonial:
 *   1. Append an entry here with real quote + author + event type + location.
 *   2. Set `featured: true` on the best 2–3 to surface in the marquee (5+ total = auto marquee).
 */
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  /** Event type, e.g. "Fight Night" */
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
};

export const testimonials: Testimonial[] = [
  // Intentionally empty. pre-launch. Add real customer quotes here as they arrive.
];

/** Returns all published testimonials. Currently empty. */
export function publishedTestimonials(): Testimonial[] {
  return testimonials;
}

export function featuredTestimonials(): Testimonial[] {
  return publishedTestimonials().filter((t) => t.featured);
}
