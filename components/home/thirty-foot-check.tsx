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
          <p className="text-caption text-ember mb-4">The picture</p>
          <h2
            id="thirty-ft-heading"
            className="font-display text-projector text-display-xl tracking-wider mb-6"
          >
            4K ON 30 FEET.
          </h2>
          <p className="text-silver text-body-lg leading-relaxed mb-6 max-w-[44ch]">
            Every booking gets the big-screen treatment: a 4K theater-quality projector, one 30 ft inflatable cinema screen, and a stable ground-anchor setup. Crowd size changes the audio tier, not the picture quality.
          </p>
          <TextCta href="/packages">Pick your audio tier</TextCta>
        </div>

        {/* Product render: 3 cols */}
        <div className="lg:col-span-3 order-1 lg:order-2 relative">
          <MediaPanel className="relative aspect-[4/5] border-0 bg-transparent shadow-none sm:aspect-[5/6]">
            <Image
              src="/images/setup/30ft-screen-section.png"
              alt="After Dusk Events 30 foot inflatable outdoor cinema screen with the company name on the base, diagonal arrow showing the 30 ft span"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="rounded-lg object-cover object-[50%_55%]"
            />
          </MediaPanel>
        </div>
      </div>
    </FunnelSection>
  );
}
