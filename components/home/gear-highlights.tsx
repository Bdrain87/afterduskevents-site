"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  FunnelSection,
  SectionHeader,
} from "@/components/funnel/layout";

/**
 * Home-page sound highlights. Customer-POV outcomes (what guests hear + feel),
 * no specs, no brand names, no decorative imagery — purely typographic so the
 * section reads like the rest of the site (the "What we bring" numbered list,
 * the add-ons teaser, the booking-flow steps).
 */

const SPEAKER_OUTCOMES = [
  "The back row hears it as clean as the front row.",
  "Dialogue stays crisp. guests can follow the movie, not struggle through it.",
  "Scales from a quiet patio to a yard full of a fight-crowd.",
  "Handles the full mix: score, voices, crowd noise, hits.",
];

const SUB_OUTCOMES = [
  "Bass hits in the chest, not just the ears. same feel as a real theater.",
  "Walk-ins land. home-run calls hit. punchlines in music drop right.",
  "Fills a big yard, not just the middle.",
  "The difference between “outdoor movie” and “outdoor event.”",
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

type ColumnProps = {
  number: string;
  eyebrow: string;
  title: string;
  items: readonly string[];
};

function SoundColumn({ number, eyebrow, title, items }: ColumnProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={listVariants}
      className="group relative border-l-2 border-white/10 pl-6 sm:pl-8 transition-colors hover:border-ember"
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <p className="text-caption text-ember">{eyebrow}</p>
        <span className="font-display text-display-md leading-none tracking-wider text-steel transition-colors group-hover:text-ember">
          {number}
        </span>
      </div>
      <h3 className="font-display text-display-md tracking-wider leading-none text-projector mb-6">
        {title}
      </h3>
      <motion.ul variants={listVariants} className="space-y-3.5">
        {items.map((item) => (
          <motion.li
            key={item}
            variants={reduced ? undefined : itemVariants}
            className="flex items-start gap-3 text-body leading-relaxed text-silver"
          >
            <span
              aria-hidden="true"
              className="mt-[0.7rem] block h-px w-4 shrink-0 bg-ember"
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function GearHighlights() {
  return (
    <FunnelSection labelledBy="sound-outcomes-heading" tone="band">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="sound-outcomes-heading"
          eyebrow="The sound"
          title="HEARD FROM THE BACK. FELT IN THE CHEST."
          body="A backyard movie usually sounds like a backyard movie. Your night should not. The setup is picked so guests in the last row hear what the first row hears, and the bass lands like you are inside a theater."
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SoundColumn
            number="01"
            eyebrow="Speakers"
            title="EVERYONE HEARS IT."
            items={SPEAKER_OUTCOMES}
          />
          <SoundColumn
            number="02"
            eyebrow="Subwoofers"
            title="EVERYONE FEELS IT."
            items={SUB_OUTCOMES}
          />
        </div>
      </div>
    </FunnelSection>
  );
}
