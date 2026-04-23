"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function AnimatedCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
}
