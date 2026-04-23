"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

/**
 * Hero wordmark rendered in ember with an outer projection glow (styled via
 * the .wordmark-glow class in globals.css). Sizing is pure CSS clamp — no JS
 * measurement hook. Reveal + shine animations are driven by GSAP SplitText
 * and skip entirely when prefers-reduced-motion is set.
 */
export default function HeroWordmark() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(ref.current, { type: "chars" });
      gsap.from(split.chars, {
        y: 32,
        opacity: 0,
        duration: 0.5,
        stagger: 0.028,
        ease: "power2.out",
        delay: 0.15,
      });

      const revealEnd = 0.15 + 0.5 + (split.chars.length - 1) * 0.028 + 0.12;
      gsap.fromTo(
        split.chars,
        { color: "#DD5454" },
        {
          color: "#FFFFFF",
          duration: 0.07,
          stagger: { each: 0.03, from: "start" },
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
          delay: revealEnd,
        },
      );
    },
    { scope: ref },
  );

  return (
    <h1
      ref={ref}
      aria-label="After Dusk Events"
      className="wordmark wordmark-glow font-display text-display-hero tracking-[0.01em] whitespace-nowrap"
    >
      AFTER DUSK EVENTS
    </h1>
  );
}
