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
        {/* Oversized decorative quotation glyph */}
        <div
          aria-hidden="true"
          className="font-serif absolute -top-6 -left-2 sm:-left-6 text-projector/[0.04] leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem, 18vw, 16rem)", lineHeight: 1 }}
        >
          &ldquo;
        </div>

        <blockquote className="relative z-10 sm:pl-6">
          <p
            className="font-serif italic text-cream/90 leading-[1.2] mb-10"
            style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.6rem)" }}
          >
            {t.quote}
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
