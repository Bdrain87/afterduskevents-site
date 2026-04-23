"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { publishedTestimonials } from "@/lib/testimonials";

type Props = {
  headingId?: string;
};

export default function TestimonialsSection({ headingId = "testimonials-heading" }: Props) {
  const items = publishedTestimonials();
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  const t = items[index];
  const hasMultiple = items.length > 1;

  return (
    <section
      className="py-24 px-4 sm:px-8 lg:px-12 bg-screening overflow-hidden"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="sr-only">
        What people say
      </h2>

      <div className="mx-auto max-w-5xl relative">
        {/* Decorative rule */}
        <div className="w-12 h-[2px] bg-oxblood mb-10" aria-hidden="true" />

        <blockquote className="relative z-10">
          <p
            className="font-heading font-medium text-cream/85 leading-[1.25] mb-10"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>

          <footer className="flex items-center justify-between gap-6 flex-wrap border-t border-white/8 pt-6">
            <div>
              <p className="font-display tracking-[0.22em] text-ember text-sm">
                {t.author.toUpperCase()}
              </p>
              {(t.eventType || t.location) && (
                <p className="text-steel text-xs tracking-[0.18em] uppercase mt-1">
                  {t.eventType}
                  {t.eventType && t.location ? "  ·  " : ""}
                  {t.location}
                </p>
              )}
            </div>

            {hasMultiple && (
              <div className="flex items-center gap-4">
                <span className="text-steel/50 text-xs tracking-[0.2em] uppercase">
                  {index + 1} / {items.length}
                </span>
                <button
                  onClick={() => setIndex((i) => (i + 1) % items.length)}
                  aria-label="Next testimonial"
                  className="p-2.5 border border-white/15 hover:border-ember/60 text-steel hover:text-ember transition-colors duration-200"
                >
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            )}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
