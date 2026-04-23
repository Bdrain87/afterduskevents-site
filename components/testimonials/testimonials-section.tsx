import Marquee from "@/components/marquee";
import TestimonialCard from "./testimonial-card";
import { publishedTestimonials } from "@/lib/testimonials";

type Props = {
  /** Heading id used for aria-labelledby */
  headingId?: string;
};

/**
 * Renders testimonials as Marquee when 5+, grid when 3-4, single column when 1-2.
 * Renders nothing when zero published testimonials (placeholders auto-filtered).
 */
export default function TestimonialsSection({ headingId = "testimonials-heading" }: Props) {
  const items = publishedTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby={headingId}>
      <div className="mx-auto max-w-7xl">
        <h2 id={headingId} className="font-heading text-2xl sm:text-3xl text-projector mb-3">
          What people say
        </h2>
        <p className="text-steel text-sm mb-8">
          Real events. Real customers. Veteran-owned, insured, and serving 60 miles of Canton.
        </p>

        {items.length >= 5 ? (
          <div className="relative overflow-hidden">
            <Marquee pauseOnHover className="[--duration:50s]">
              {items.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} className="mx-2" />
              ))}
            </Marquee>
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-charcoal to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-charcoal to-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} className="max-w-none" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
