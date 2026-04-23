import { Star } from "lucide-react";
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
        "border-l-2 border-oxblood bg-charcoal p-6 max-w-sm shrink-0",
        className,
      )}
    >
      {testimonial.rating && (
        <div className="flex items-center gap-0.5 mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-oxblood text-ember"
              aria-hidden="true"
            />
          ))}
        </div>
      )}
      <blockquote className="text-cream/80 text-base leading-relaxed mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="text-xs">
        <p className="text-projector font-semibold">{testimonial.author}</p>
        {(testimonial.eventType || testimonial.location) && (
          <p className="text-steel mt-0.5">
            {testimonial.eventType}
            {testimonial.eventType && testimonial.location ? " · " : ""}
            {testimonial.location}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
