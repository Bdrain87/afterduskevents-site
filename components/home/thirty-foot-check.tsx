"use client";

import Image from "next/image";
import { FunnelSection, MediaPanel, TextCta } from "@/components/funnel/layout";

/**
 * "The screen" section. Left column is copy + CTA; right column is the
 * real studio render of the 30ft inflatable with a person at the base for
 * scale (the image Blake provided). Earlier rev tried an SVG stick-figure
 * scale diagram; it read as a children's drawing and was replaced with
 * the photo render.
 */
export default function ThirtyFootCheck() {
  return (
    <FunnelSection
      className="overflow-hidden"
      labelledBy="thirty-ft-heading"
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
            One screen size for every event we run. Water ballast setup, no digging. Crowd size is handled through audio coverage, not a smaller screen.
          </p>
          <TextCta href="/packages">Pick your audio tier</TextCta>
        </div>

        {/* Product render: 3 cols */}
        <div className="lg:col-span-3 order-1 lg:order-2 relative">
          <MediaPanel className="relative aspect-[4/5] sm:aspect-[5/6]">
            <Image
              src="/images/setup/30ft-screen-studio.avif"
              alt="After Dusk Events 30 foot inflatable outdoor cinema screen, studio render with a person at the base for scale"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain"
            />
          </MediaPanel>
        </div>
      </div>
    </FunnelSection>
  );
}
