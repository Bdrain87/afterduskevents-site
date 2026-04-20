"use client";

import { motion } from "motion/react";

const WORDS = ["BIG SCREEN.", "BIGGER NIGHTS."];

export default function AnimatedHeroText() {
  return (
    <h1
      className="font-display text-7xl sm:text-9xl tracking-wider text-brand-white leading-none mb-6"
      aria-label="Big screen. Bigger nights."
    >
      {WORDS.map((word, wi) => (
        <motion.span
          key={wi}
          className="block overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: wi * 0.5 }}
        >
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: 0.3 + wi * 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </h1>
  );
}

export function AnimatedSubtext({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="text-brand-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.p>
  );
}

export function AnimatedCTAs({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
