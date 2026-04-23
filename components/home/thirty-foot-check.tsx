"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * "The screen" section. Left column is copy + CTA; right column is the
 * real studio render of the 30ft inflatable with a person at the base for
 * scale (the image Blake provided). Earlier rev tried an SVG stick-figure
 * scale diagram; it read as a children's drawing and was replaced with
 * the photo render.
 */
export default function ThirtyFootCheck() {
  return (
    <section
      className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
      aria-labelledby="thirty-ft-heading"
      data-dim-beam
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Copy: 2 cols */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <p className="text-caption text-ember mb-4">The screen</p>
          <h2
            id="thirty-ft-heading"
            className="font-display text-projector text-display-xl tracking-wider mb-6"
          >
            30 FEET.
          </h2>
          <p className="text-silver text-body-lg leading-relaxed mb-6 max-w-[44ch]">
            One screen size for every event we run. Water ballast setup, no digging. Scales
            to crowd through audio, not screen size.
          </p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-ember text-sm font-semibold hover:text-projector transition-colors group"
          >
            Pick your audio tier
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Product render: 3 cols */}
        <div className="lg:col-span-3 order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden">
            <Image
              src="/images/setup/30ft-screen-studio.avif"
              alt="After Dusk Events 30 foot inflatable outdoor cinema screen, studio render with a person at the base for scale"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
