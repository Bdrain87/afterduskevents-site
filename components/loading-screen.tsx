"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

const IRIS_OPEN_S  = 0.45;
const IRIS_CLOSE_S = 0.55;

export default function LoadingScreen() {
  const [show,    setShow]    = useState(false);
  const [closing, setClosing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const flashRef     = useRef<HTMLDivElement>(null);
  const wordmarkRef  = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("ade-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("ade-loaded", "1");
    setShow(true);
  }, []);

  // Text reveal fires after iris finishes opening
  useGSAP(() => {
    if (!show || !wordmarkRef.current || !taglineRef.current) return;

    const split = new SplitText(wordmarkRef.current, { type: "chars" });
    gsap.set(split.chars, { y: 40, opacity: 0 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });

    const tl = gsap.timeline({ delay: IRIS_OPEN_S + 0.08 });

    // Projector flash
    if (flashRef.current) {
      tl.to(flashRef.current, { opacity: 0.6, duration: 0.06, ease: "none" })
        .to(flashRef.current, { opacity: 0, duration: 0.28, ease: "power2.out" });
    }

    // Characters stagger in
    tl.to(split.chars, {
      y: 0, opacity: 1,
      duration: 0.55, stagger: 0.022,
      ease: "power2.out",
    }, "-=0.15");

    // Tagline
    tl.to(taglineRef.current, {
      opacity: 1, y: 0,
      duration: 0.4, ease: "power2.out",
    }, "-=0.15");

    // Hold then close
    tl.add(() => setClosing(true), "+=0.3");

  }, { dependencies: [show], scope: containerRef });

  // Unmount after iris closes
  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => setShow(false), IRIS_CLOSE_S * 1000 + 120);
    return () => clearTimeout(t);
  }, [closing]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          ref={containerRef}
          className="fixed inset-0 z-[200] bg-screening flex items-center justify-center overflow-hidden"
          animate={{
            clipPath: closing
              ? "circle(0% at 50% 50%)"
              : "circle(150% at 50% 50%)",
          }}
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{
            clipPath: {
              duration: closing ? IRIS_CLOSE_S : IRIS_OPEN_S,
              ease: closing ? [0.76, 0, 0.24, 1] : [0.16, 1, 0.3, 1],
            },
          }}
        >
          {/* Projector flash */}
          <div
            ref={flashRef}
            aria-hidden="true"
            className="absolute inset-0 bg-white pointer-events-none opacity-0 z-10"
          />

          {/* Film grain */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              mixBlendMode: "overlay",
            }}
          />

          {/* Content */}
          <div className="relative z-20 text-center select-none px-6">
            <div
              ref={wordmarkRef}
              className="font-display text-[clamp(3rem,11vw,9rem)] text-projector tracking-[0.07em] leading-none overflow-hidden"
              aria-label="After Dusk Events"
            >
              AFTER DUSK EVENTS
            </div>
            <p
              ref={taglineRef}
              className="text-steel text-xs tracking-[0.35em] uppercase mt-5"
            >
              Big screen. Bigger nights.
            </p>
            <p className="sr-only">After Dusk Events — loading</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
