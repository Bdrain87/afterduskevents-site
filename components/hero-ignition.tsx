"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const COUNTDOWN_KEY = "adeIgnitionPlayed";
const DIGITS = ["3", "2", "1"] as const;
const PER_DIGIT_MS = 260;
const FADE_OUT_MS = 380;

/**
 * Home hero.
 * - Once per session, a brief film-gate countdown overlays the hero (3 . 2 . 1)
 *   and fades out. Skipped entirely for reduced-motion visitors and on repeat
 *   visits within the session.
 * - The 30 ft studio render reveals through a diagonal mask wipe.
 * - Headline renders letter-by-letter via motion stagger.
 *
 * All copy, layout, and alt text match the previous hero verbatim.
 */
type Props = {
  children: React.ReactNode;
  mediaAlt: string;
};

export default function HeroIgnition({ children, mediaAlt }: Props) {
  const reduced = useReducedMotion();
  const [countdownActive, setCountdownActive] = useState(false);
  const [digitIndex, setDigitIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(COUNTDOWN_KEY) === "1") return;
      sessionStorage.setItem(COUNTDOWN_KEY, "1");
    } catch {
      /* private browsing: skip */
      return;
    }
    setCountdownActive(true);
  }, [reduced]);

  useEffect(() => {
    if (!countdownActive) return;
    if (digitIndex >= DIGITS.length) {
      const fade = window.setTimeout(() => setCountdownActive(false), FADE_OUT_MS);
      return () => window.clearTimeout(fade);
    }
    const advance = window.setTimeout(() => setDigitIndex((i) => i + 1), PER_DIGIT_MS);
    return () => window.clearTimeout(advance);
  }, [countdownActive, digitIndex]);

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-24 lg:pt-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">{children}</div>
        <div className="lg:col-span-6">
          <motion.div
            className="relative mx-auto aspect-[4/5] max-w-[560px] overflow-hidden rounded-lg lg:ml-auto"
            initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(14px) brightness(0.4)" }}
            animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px) brightness(1)" }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: countdownActive ? 0.85 : 0.15 }}
          >
            <Image
              src="/images/setup/30ft-screen-studio.avif"
              alt={mediaAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="ken-burns object-cover object-[50%_55%]"
            />
          </motion.div>
        </div>
      </div>

      {countdownActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-screening/55 backdrop-blur-[2px] transition-opacity duration-300"
          style={{ opacity: digitIndex >= DIGITS.length ? 0 : 1 }}
        >
          <div className="relative flex h-48 w-36 items-center justify-center border-2 border-ember/70 sm:h-64 sm:w-48">
            {/* Sprocket holes */}
            <span className="absolute -left-3 top-2 h-3 w-2 rounded-sm bg-ember/70" />
            <span className="absolute -left-3 bottom-2 h-3 w-2 rounded-sm bg-ember/70" />
            <span className="absolute -right-3 top-2 h-3 w-2 rounded-sm bg-ember/70" />
            <span className="absolute -right-3 bottom-2 h-3 w-2 rounded-sm bg-ember/70" />
            <span className="font-display text-[7rem] leading-none text-projector sm:text-[9rem]">
              {DIGITS[Math.min(digitIndex, DIGITS.length - 1)]}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Per-letter animated wordmark. Used by the home hero.
 * Falls back to a single static span for reduced-motion visitors.
 */
export function IgnitedWordmark({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const letters = Array.from(text);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, y: "0.3em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.9 + i * 0.03 }}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
