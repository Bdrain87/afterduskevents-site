import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/testimonials";

type Props = {
  testimonial: Testimonial;
  className?: string;
};

export default function TestimonialCard({ testimonial, className }: Props) {
  return (
    <figure
      className={cn(
        "border-2 border-ink bg-paper p-6",
        className,
      )}
    >
      {testimonial.rating && (
        <p
          className="serial text-tail mb-3"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {"★".repeat(testimonial.rating)}
          {"☆".repeat(5 - testimonial.rating)}
        </p>
      )}
      <blockquote className="font-body text-base leading-relaxed mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="serial">
        <span className="text-ink">{testimonial.author}</span>
        {(testimonial.eventType || testimonial.location) && (
          <span className="text-concrete">
            {" · "}
            {testimonial.eventType}
            {testimonial.eventType && testimonial.location ? " · " : ""}
            {testimonial.location}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
