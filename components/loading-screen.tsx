"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE_EXPO = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ade-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("ade-loaded", "1");
    setShow(true);
    setTimeout(() => setShow(false), 2600);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] bg-[#080808] flex items-center justify-center"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
        >
          <div className="flex flex-col items-center">
            {/* Wordmark above line */}
            <div className="overflow-hidden">
              <motion.p
                className="font-display text-[clamp(2.5rem,8vw,5.5rem)] tracking-[0.18em] text-white leading-none pb-4"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE_OUT }}
              >
                AFTER DUSK EVENTS
              </motion.p>
            </div>

            {/* Hairline */}
            <motion.div
              className="h-px w-full bg-white/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE_EXPO }}
              style={{ transformOrigin: "center" }}
            />

            {/* Tagline below line */}
            <div className="overflow-hidden">
              <motion.p
                className="text-[clamp(0.6rem,1.2vw,0.75rem)] tracking-[0.35em] text-white/40 uppercase pt-4 font-light"
                initial={{ y: "-110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.25, ease: EASE_OUT }}
              >
                Big screen.&nbsp;&nbsp;Bigger nights.
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
