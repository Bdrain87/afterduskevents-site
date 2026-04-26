"use client";

import { useEffect, useState } from "react";
import type { Variants } from "motion/react";

/**
 * Single source of truth for motion across the site.
 * If a duration, easing, or stagger isn't here, it shouldn't be in a component.
 */

export const EASE = {
  // Snappy out-cubic-ish: starts fast, lands soft. Use for entrances.
  snappy: [0.16, 1, 0.3, 1] as const,
  // Subtle ease-in-out: gentle reveals; use for content fades.
  subtle: [0.32, 0.72, 0.44, 1] as const,
} as const;

export const DUR = {
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  hero: 0.95,
} as const;

export const STAGGER = 0.08;
export const STAGGER_FAST = 0.05;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.snappy },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.slow, ease: EASE.subtle },
  },
};

export function staggerContainer(opts: { stagger?: number; delayChildren?: number } = {}): Variants {
  const { stagger = STAGGER, delayChildren = 0 } = opts;
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/**
 * Live `prefers-reduced-motion` reader. Updates when the OS-level toggle
 * changes mid-session, unlike `useReducedMotion()` which only reads on mount.
 */
export function useReducedMotionLive(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const update = () => setReduced(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
