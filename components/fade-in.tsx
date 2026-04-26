"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE, STAGGER, useReducedMotionLive } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = DUR.slow,
  once = true,
}: FadeInProps) {
  const reduced = useReducedMotionLive();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE.subtle }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInGroup({
  children,
  className,
  stagger = STAGGER,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotionLive();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className,
  direction = "up",
  distance = 24,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "none";
  distance?: number;
}) {
  const reduced = useReducedMotionLive();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const dirMap = { up: { y: distance }, down: { y: -distance }, none: {} };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...dirMap[direction] },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR.slow, ease: EASE.subtle },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
