import TestimonialCard from "./testimonial-card";
import { publishedTestimonials } from "@/lib/testimonials";

type Props = {
  headingId?: string;
};

/**
 * Renders testimonials as a simple grid when present. Renders nothing
 * when there are zero published testimonials (the site is pre-launch
 * so this is currently the case).
 */
export default function TestimonialsSection({ headingId = "testimonials-heading" }: Props) {
  const items = publishedTestimonials();
  if (items.length === 0) return null;

  return (
    <section
      className="bg-paper px-4 sm:px-10 py-20"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-5xl">
        <p className="serial text-tail mb-4">Word of Mouth</p>
        <h2
          id={headingId}
          className="font-display text-[clamp(2.25rem,5vw,4rem)] uppercase mb-10"
        >
          What people say.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
