"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  FunnelSection,
  SectionHeader,
} from "@/components/funnel/layout";

/**
 * Home-page gear highlights. Product proof, translated into what guests
 * actually notice: a theater-quality picture, clear words, real bass, and a
 * cleaner layout.
 */

const GEAR_PROOFS = [
  {
    stat: "4K",
    label: "Theater-quality projection",
    body: "The picture side is not an office projector pointed at a sheet. You are getting a sharp 4K image built for a real outdoor cinema setup.",
  },
  {
    stat: "30 ft",
    label: "Real cinema scale",
    body: "The screen is big enough to become the centerpiece of the night, so guests are watching an event, not crowding around a TV.",
  },
  {
    stat: "126 dB",
    label: "Soundboks 4 headroom",
    body: "That means the speakers are not fighting for their life outside. We can keep voices clear across a yard without making the front row suffer.",
  },
  {
    stat: "25 Hz",
    label: "SKAA subwoofer low end",
    body: "That is the deep bass zone. Walkout music, movie scores, big game moments, and dance tracks feel physical instead of thin.",
  },
  {
    stat: "SKAA",
    label: "Wireless event audio",
    body: "The speakers and subs can link without cable runs through the middle of the party, so placement follows the crowd instead of the nearest outlet.",
  },
] as const;

const PICTURE_OUTCOMES = [
  "4K projection gives the image real detail, so movies, games, sports, and slideshows look intentional.",
  "The 30 ft screen gives the night scale before anyone hears a single speaker.",
  "Focus, placement, source connection, and system testing are handled before guests settle in.",
  "Your quote covers the full picture system, not just a screen rental.",
];

const SPEAKER_OUTCOMES = [
  "Soundboks 4 speakers throw clean sound across open air instead of fading halfway through the yard.",
  "Dialogue stays crisp, so guests can follow the movie, game, or fight without shouting over the setup.",
  "Battery power and wireless linking let us build the layout around the crowd, not around cable reach.",
  "Enough headroom for score, voices, crowd noise, walkout music, and big moments without harsh distortion.",
];

const SUB_OUTCOMES = [
  "SKAA Death From Below Mk2 subs handle the part small speakers cannot fake: real low-end impact.",
  "Walkout music lands. Home-run calls hit. Movie scores and dance tracks have weight.",
  "Dedicated bass lets the speakers focus on clear voices while the subs carry the punch.",
  "It is the difference between hearing the event and feeling like you are inside it.",
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
          eyebrow="The gear"
          title="THEATER PICTURE. EVENT SOUND."
          body="The setup is a 4K theater-quality projector on a real 30 ft screen, backed by Soundboks 4 speakers and SKAA Death From Below Mk2 subwoofers. Plain English: it looks sharp, sounds clean, hits hard, and feels like an actual event."
        />
        <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {GEAR_PROOFS.map((proof) => (
            <article
              key={proof.label}
              className="rounded-lg border border-white/10 bg-charcoal/55 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            >
              <p className="font-display text-display-md leading-none tracking-wider text-ember">
                {proof.stat}
              </p>
              <h3 className="mt-3 font-heading text-heading-sm text-projector">
                {proof.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-silver">{proof.body}</p>
            </article>
          ))}
        </div>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-12">
          <SoundColumn
            number="01"
            eyebrow="4K projection"
            title="EVERYONE SEES IT."
            items={PICTURE_OUTCOMES}
          />
          <SoundColumn
            number="02"
            eyebrow="Soundboks 4"
            title="EVERYONE HEARS IT."
            items={SPEAKER_OUTCOMES}
          />
          <SoundColumn
            number="03"
            eyebrow="SKAA subwoofers"
            title="EVERYONE FEELS IT."
            items={SUB_OUTCOMES}
          />
        </div>
      </div>
    </FunnelSection>
  );
}
