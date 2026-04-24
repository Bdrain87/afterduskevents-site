"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  FunnelSection,
  SectionHeader,
} from "@/components/funnel/layout";

/**
 * Home-page sound highlights. Customer-POV outcomes (what guests hear + feel),
 * no spec-sheet language, no brand names. Each column is anchored by a real
 * photo that carries the mood for the benefit underneath.
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

const SPEAKERS_PHOTO = {
  src: "https://images.unsplash.com/photo-1762215609231-538f04f78d75?auto=format&fit=crop&w=1600&q=80",
  alt: "Silhouetted crowd watching an outdoor movie screen at dusk",
};

const SUBS_PHOTO = {
  src: "https://images.unsplash.com/photo-1653579657403-25b2695601d4?auto=format&fit=crop&w=1600&q=80",
  alt: "Close-up of a professional speaker cone shot against pure black",
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

type ColumnProps = {
  photo: { src: string; alt: string };
  eyebrow: string;
  title: string;
  items: readonly string[];
  focalPoint?: string;
};

function SoundColumn({ photo, eyebrow, title, items, focalPoint = "50% 50%" }: ColumnProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={listVariants}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-charcoal/45"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover transition-transform duration-[2400ms] ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: focalPoint }}
        />
        {/* Bottom gradient to anchor text area and keep palette cohesive */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"
        />
        {/* Subtle ember vignette on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(221, 84, 84, 0.08) 0%, rgba(221, 84, 84, 0) 55%)",
          }}
        />
      </div>

      <div className="relative p-6 sm:p-8">
        <p className="text-caption text-ember mb-3">{eyebrow}</p>
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
      </div>
    </motion.div>
  );
}

export default function GearHighlights() {
  return (
    <FunnelSection labelledBy="sound-outcomes-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="sound-outcomes-heading"
          eyebrow="The sound"
          title="HEARD FROM THE BACK. FELT IN THE CHEST."
          body="A backyard movie usually sounds like a backyard movie. Your night should not. The sound is picked so guests in the last row hear what the first row hears, and the bass lands like you are inside a theater."
        />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <SoundColumn
            photo={SPEAKERS_PHOTO}
            eyebrow="Speakers"
            title="EVERYONE HEARS IT."
            items={SPEAKER_OUTCOMES}
            focalPoint="50% 55%"
          />
          <SoundColumn
            photo={SUBS_PHOTO}
            eyebrow="Subwoofers"
            title="EVERYONE FEELS IT."
            items={SUB_OUTCOMES}
            focalPoint="50% 50%"
          />
        </div>
      </div>
    </FunnelSection>
  );
}
