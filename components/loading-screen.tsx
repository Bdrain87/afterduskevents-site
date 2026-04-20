"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const IRIS_DURATION = 0.65;

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const flashRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("ade-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("ade-loaded", "1");
    setShow(true);
  }, []);

  // Run text animations after iris opens
  const handleIrisComplete = () => {
    if (!wordmarkRef.current || !taglineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const split = new SplitText(wordmarkRef.current!, { type: "chars" });
      gsap.set(split.chars, { y: 30, opacity: 0 });

      // Projector flash
      if (flashRef.current) {
        tl.to(flashRef.current, { opacity: 0.45, duration: 0.08, ease: "none" })
          .to(flashRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
      }

      tl.to(split.chars, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.025, ease: "power2.out",
      }, "-=0.1")
        .fromTo(taglineRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.1")
        .add(() => {
          setTimeout(() => setClosing(true), 700);
        });
    }, containerRef);

    return () => ctx.revert();
  };

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, [closing]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          ref={containerRef}
          className="fixed inset-0 z-[200] bg-screening flex items-center justify-center overflow-hidden"
          // Iris opens on mount
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: closing ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)" }}
          transition={{
            clipPath: {
              duration: closing ? 0.8 : IRIS_DURATION,
              ease: closing ? [0.76, 0, 0.24, 1] : [0.16, 1, 0.3, 1],
            },
          }}
          onAnimationComplete={(def) => {
            // After iris opens, fire the text animation
            if (!closing && typeof def === "object") handleIrisComplete();
          }}
        >
          {/* Projector flash layer */}
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

          {/* Wordmark + tagline */}
          <div className="relative z-20 text-center select-none px-4">
            <div
              ref={wordmarkRef}
              className="font-display text-[clamp(4rem,13vw,9.5rem)] text-projector tracking-[0.06em] leading-[0.88] overflow-hidden"
              aria-label="After Dusk Events"
            >
              AFTER DUSK EVENTS
            </div>
            <p
              ref={taglineRef}
              className="text-steel text-xs tracking-[0.35em] uppercase mt-4 opacity-0"
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
