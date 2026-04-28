"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { motion } from "motion/react";
import { DUR, EASE, useReducedMotionLive } from "@/lib/motion";

/**
 * Home hero. The 35 ft studio render fades in from a soft blur after
 * hydration so SSR users never see a half-rendered "snap." Headline
 * renders letter-by-letter via motion stagger.
 */
type Props = {
  children: React.ReactNode;
  mediaAlt: string;
};

export default function HeroIgnition({ children, mediaAlt }: Props) {
  const reduced = useReducedMotionLive();
  // Hydrate-then-animate: the SSR markup is fully visible. After hydration
  // we re-trigger the blur-in so the entrance reads the same as the headline.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:px-10 lg:px-16 lg:pb-24 lg:pt-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">{children}</div>
        <div className="lg:col-span-6">
          <motion.div
            className="relative mx-auto aspect-[4/5] max-w-[560px] overflow-hidden rounded-3xl lg:ml-auto [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)]"
            // SSR users see the image fully visible. After hydration, motion-
            // permitted clients get a brief brightness sweep.
            initial={!reduced && hydrated ? { opacity: 0, y: 14, filter: "brightness(0.55)" } : false}
            animate={{ opacity: 1, y: 0, filter: "brightness(1)" }}
            transition={{ duration: DUR.hero, ease: EASE.snappy, delay: 0.1 }}
          >
            <Image
              src="/images/setup/35ft-screen-hero.png"
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
  const reduced = useReducedMotionLive();
  const letterStartDelay = 0.12;
  const letterStagger = 0.05;

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
                  initial={{ opacity: 0.28, y: "0.12em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DUR.slow,
                    ease: EASE.snappy,
                    delay: letterStartDelay + i * letterStagger,
                  }}
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
