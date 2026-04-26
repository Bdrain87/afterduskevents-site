"use client";

import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { AudioTier } from "@/lib/packages";
import Waveform from "@/components/packages/waveform";

type Props = {
  tier: AudioTier;
  href: string;
  compact?: boolean;
};

/**
 * Tier card. Wraps content in react-parallax-tilt for a subtle depth response.
 * Ember halo spread scales with (speakers + subs) so higher tiers physically
 * radiate more presence. Reduced-motion visitors get a flat static card.
 */
export default function TierCard({ tier, href, compact = false }: Props) {
  const reduced = useReducedMotion();
  const units = tier.speakerCount + tier.subwooferCount;
  // 1 -> 0, 2 -> 8, 3 -> 16, 6 -> 28
  const haloSpread = Math.min(28, (units - 1) * 7);
  const haloStyle = {
    boxShadow: `0 0 0 1px transparent, 0 18px 44px rgba(107, 31, 31, ${0.18 + units * 0.04}), 0 0 ${haloSpread}px rgba(221, 84, 84, 0.22)`,
  } as React.CSSProperties;

  const card = (
    <Link
      href={href}
      // Whole card is the link target; the hover state (border ember,
      // tilt scale, halo spread) carries the affordance, and the
      // animated ember bar at the bottom provides the visual flourish
      // without repeating "See setup" under every card.
      aria-label={`See the ${tier.name} setup`}
      className={cn(
        "group relative block h-full rounded-lg border border-white/10 bg-screening/70 p-5 transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ember/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember/70",
        tier.popular && "border-ember/40",
      )}
      style={haloStyle}
    >
      {/* Micro waveform badge, bottom-right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 h-10 w-16 opacity-50 transition-opacity duration-500 group-hover:opacity-90"
      >
        <Waveform
          speakers={tier.speakerCount}
          subs={tier.subwooferCount}
          className="h-full w-full"
        />
      </span>

      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-display text-heading-lg leading-none tracking-wider text-projector">
          {tier.name}
        </h3>
        {tier.popular && (
          <span className="shrink-0 rounded-full border border-ember/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ember">
            Most booked
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-silver">{tier.plainBenefit}</p>
      {!compact && (
        <p className="mt-3 text-xs leading-relaxed text-steel">{tier.coverageNote}</p>
      )}
      <span
        aria-hidden="true"
        className="mt-5 block h-px w-6 bg-ember transition-[width] duration-300 group-hover:w-10"
      />
    </Link>
  );

  if (reduced) return card;

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      perspective={1400}
      glareEnable={false}
      transitionSpeed={900}
      scale={1.015}
      className="h-full"
    >
      {card}
    </Tilt>
  );
}
