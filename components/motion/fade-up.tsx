"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE, useReducedMotionLive } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Set to false to fire on mount instead of on viewport entry. */
  inView?: boolean;
  /** Override y offset. */
  y?: number;
  /** Duration in seconds. Defaults to DUR.slow. */
  duration?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Tiny client island for fade-up entrances. Replaces inline `motion.div`
 * blocks throughout the site so easing/duration is uniform.
 */
export default function FadeUp({
  children,
  className,
  delay = 0,
  inView = true,
  y = 12,
  duration = DUR.slow,
  as = "div",
}: Props) {
  const reduced = useReducedMotionLive();
  const Comp =
    as === "section"
      ? motion.section
      : as === "li"
        ? motion.li
        : as === "span"
          ? motion.span
          : motion.div;

  if (reduced) {
    const Static =
      as === "section" ? "section" : as === "li" ? "li" : as === "span" ? "span" : "div";
    return <Static className={className}>{children}</Static>;
  }

  const animProps = inView
    ? {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      }
    : {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <Comp
      className={className}
      {...animProps}
      transition={{ duration, ease: EASE.snappy, delay }}
    >
      {children}
    </Comp>
  );
}
