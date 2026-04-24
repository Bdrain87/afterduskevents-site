"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Home hero.
 * - The 30 ft studio render eases in without an interstitial splash.
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

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-24 sm:px-10 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">{children}</div>
        <div className="lg:col-span-6">
          <motion.div
            className="relative mx-auto aspect-[4/5] max-w-[560px] overflow-hidden rounded-lg lg:ml-auto"
            initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(14px) brightness(0.4)" }}
            animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px) brightness(1)" }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
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
    </section>
  );
}

/**
 * Per-letter animated wordmark. Used by the home hero.
 * Chars are grouped by word so wrapping, when it happens on narrow viewports,
 * only breaks at spaces ("AFTER DUSK" / "EVENTS") — never mid-word.
 * Falls back to a single static span for reduced-motion visitors.
 */
export function IgnitedWordmark({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  const wordStart: number[] = [];
  let acc = 0;
  for (const word of words) {
    wordStart.push(acc);
    acc += word.length + 1;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          {wi > 0 && " "}
          <span
            aria-hidden="true"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {Array.from(word).map((ch, ci) => {
              const i = wordStart[wi] + ci;
              return (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0, y: "0.3em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 + i * 0.11 }}
                  style={{ display: "inline-block" }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
