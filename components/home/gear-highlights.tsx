"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  FunnelSection,
  SectionHeader,
} from "@/components/funnel/layout";

/**
 * Home-page sound highlights. Customer-POV outcomes only (what the guests
 * hear and feel), no spec-sheet language, no brand names.
 *
 * Two columns with distinct visual metaphors:
 *   - Speakers:  radiating arcs (coverage across a yard)
 *   - Subwoofers: pulsing bass orb (the thump in the chest)
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

/** Concentric-arc radiator. Shows sound spreading outward across a yard. */
function SpeakerCoverage() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 80"
      className="w-full h-32 sm:h-36"
    >
      <defs>
        <radialGradient id="speaker-source" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DD5454" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#6B1F1F" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      {/* Emitter: the speaker body on the left */}
      <rect x="8" y="30" width="10" height="20" rx="1.5" fill="url(#speaker-source)" />
      <circle cx="13" cy="40" r="3" fill="#0A0A0A" opacity="0.65" />

      {/* Radiating arcs: each animates scale + fade outward on its own beat.
          Arcs are centered on the speaker cone and open to the right. */}
      {[0, 1.2, 2.4].map((delay, i) => (
        <g key={i} style={{ transformOrigin: "13px 40px" }}>
          <path
            d="M 13 40 m -3 -18 a 18 18 0 0 1 0 36"
            fill="none"
            stroke="#DD5454"
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{
              animation: `speaker-radiate 3.6s ease-out ${delay}s infinite`,
              transformOrigin: "13px 40px",
              transformBox: "fill-box",
            }}
          />
        </g>
      ))}
      {/* Crowd: three tiny silhouettes on the right to anchor "the back row" */}
      {[90, 100, 110].map((x) => (
        <g key={x} opacity="0.45">
          <circle cx={x} cy="42" r="2" fill="#B8B8B8" />
          <rect x={x - 2.5} y="44" width="5" height="8" rx="1.2" fill="#B8B8B8" />
        </g>
      ))}
    </svg>
  );
}

/** Pulsing subwoofer cone. The visible thump. */
function SubwooferPulse() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 80"
      className="w-full h-32 sm:h-36"
    >
      <defs>
        <radialGradient id="sub-cone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DD5454" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#6B1F1F" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#4A0E0E" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Outer pressure ring: slow breath outward and back */}
      <circle
        cx="60"
        cy="40"
        r="26"
        fill="none"
        stroke="#DD5454"
        strokeWidth="0.7"
        opacity="0.35"
        style={{
          animation: "sub-pressure 2.4s ease-in-out infinite",
          transformOrigin: "60px 40px",
          transformBox: "fill-box",
        }}
      />

      {/* Mid ring: offset beat */}
      <circle
        cx="60"
        cy="40"
        r="20"
        fill="none"
        stroke="#DD5454"
        strokeWidth="0.9"
        opacity="0.5"
        style={{
          animation: "sub-pressure 2.4s ease-in-out 0.3s infinite",
          transformOrigin: "60px 40px",
          transformBox: "fill-box",
        }}
      />

      {/* Cone: the driver that thumps */}
      <circle
        cx="60"
        cy="40"
        r="14"
        fill="url(#sub-cone)"
        style={{
          animation: "sub-thump 2.4s ease-in-out infinite",
          transformOrigin: "60px 40px",
          transformBox: "fill-box",
        }}
      />
      <circle cx="60" cy="40" r="3.5" fill="#0A0A0A" opacity="0.7" />
    </svg>
  );
}

type ColumnProps = {
  visual: React.ReactNode;
  eyebrow: string;
  title: string;
  items: readonly string[];
};

function SoundColumn({ visual, eyebrow, title, items }: ColumnProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={listVariants}
      className="relative rounded-lg border border-white/10 bg-charcoal/45 p-6 sm:p-8"
    >
      <div className="mb-6">{visual}</div>
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
          body="A backyard movie usually sounds like a backyard movie. Your night should not. The sound is picked so guests in the last row hear what the first row hears, and the bass lands like you are actually inside a theater."
        />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <SoundColumn
            visual={<SpeakerCoverage />}
            eyebrow="Speakers"
            title="EVERYONE HEARS IT."
            items={SPEAKER_OUTCOMES}
          />
          <SoundColumn
            visual={<SubwooferPulse />}
            eyebrow="Subwoofers"
            title="EVERYONE FEELS IT."
            items={SUB_OUTCOMES}
          />
        </div>
      </div>
    </FunnelSection>
  );
}
