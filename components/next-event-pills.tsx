"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { formatOpenDate, type OpenDate } from "@/lib/availability";

export default function NextEventPills({ dates }: { dates: OpenDate[] }) {
  const reduced = useReducedMotion();

  return (
    <motion.ul
      className="flex flex-wrap gap-2.5"
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {dates.map((d) => (
        <motion.li
          key={d.date}
          variants={
            reduced
              ? undefined
              : {
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  },
                }
          }
        >
          <Link
            href={`/contact?eventDate=${encodeURIComponent(d.date)}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-ember bg-screening/60 hover:bg-oxblood/20 transition-colors px-4 py-2 text-sm"
          >
            <span
              aria-hidden="true"
              className="block h-1 w-1 rounded-full bg-ember transition-transform duration-300 group-hover:scale-150"
            />
            <span className="text-projector font-medium">{formatOpenDate(d.date)}</span>
            {d.note && <span className="text-steel text-xs">· {d.note}</span>}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
