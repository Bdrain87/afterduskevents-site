"use client";

import { motion, useReducedMotion } from "motion/react";
import { Volume2, Waves } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  FunnelSection,
  SectionHeader,
} from "@/components/funnel/layout";

/**
 * Home-page gear highlights. Plain-English benefits of the speakers and
 * subwoofers, no brand names. Two parallel columns with staggered entrance
 * reveals and an animated waveform behind each column header.
 */

const SPEAKER_HIGHLIGHTS = [
  "Concert-grade loudness that fills an outdoor yard front to back.",
  "Full range sound from rolling bass to clear dialogue.",
  "Battery-powered. one charge runs an all-night event.",
  "Splash and dust resistant. built for rain and dirt.",
  "Wireless linking pairs multiple units for stereo and wide coverage.",
  "Low-latency audio stays in sync with the picture on screen.",
];

const SUB_HIGHLIGHTS = [
  "Theater-grade low end. you feel the hits, not just hear them.",
  "Long-throw driver delivers deep bass that stays clean at volume.",
  "Battery-powered alongside the speakers. no cables across the yard.",
  "Wireless pairing lets the sub sit anywhere on site.",
  "Splash and dust resistant housing for outdoor nights.",
  "Rolling transport so placement moves with the setup.",
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

type GearColumnProps = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  title: string;
  items: readonly string[];
  barCount: number;
};

function GearColumn({ Icon, label, title, items, barCount }: GearColumnProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={listVariants}
      className="relative rounded-lg border border-white/10 bg-charcoal/45 p-6 sm:p-8"
    >
      {/* Header row: icon + animated bars + caption */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ember/40 bg-screening/60 text-ember"
          >
            <Icon width={18} height={18} />
          </span>
          <p className="text-caption text-ember">{label}</p>
        </div>
        <SoundBars count={barCount} />
      </div>

      <h3 className="font-display text-heading-lg tracking-wider leading-none text-projector mb-5">
        {title}
      </h3>

      <motion.ul variants={listVariants} className="space-y-3">
        {items.map((item) => (
          <motion.li
            key={item}
            variants={reduced ? undefined : itemVariants}
            className="flex items-start gap-3 text-sm leading-relaxed text-silver"
          >
            <span
              aria-hidden="true"
              className="mt-[0.55rem] block h-1 w-1 shrink-0 rounded-full bg-ember"
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/**
 * Decorative sound-bar equalizer in the column header. Pure CSS animation
 * via an inline style delay offset so each bar breathes on its own beat.
 * Respects reduced-motion (the animation is gated behind motion-safe).
 */
function SoundBars({ count }: { count: number }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-end gap-[3px] h-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-[3px] rounded-sm bg-ember/70 motion-safe:animate-sound-bar"
          style={{
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${1.6 + (i % 3) * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function GearHighlights() {
  return (
    <FunnelSection labelledBy="gear-highlights-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="gear-highlights-heading"
          eyebrow="The gear"
          title="CONCERT SOUND. FIELD READY."
          body="The same kit scales from a single speaker on a patio up to four speakers and two subs in a big yard. Battery-powered, wireless, and built for the weather so the setup never leans on the venue."
        />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <GearColumn
            Icon={Volume2}
            label="Speakers"
            title="LOUD ENOUGH. CLEAR ALL NIGHT."
            items={SPEAKER_HIGHLIGHTS}
            barCount={7}
          />
          <GearColumn
            Icon={Waves}
            label="Subwoofers"
            title="BASS YOU FEEL."
            items={SUB_HIGHLIGHTS}
            barCount={5}
          />
        </div>
      </div>
    </FunnelSection>
  );
}
