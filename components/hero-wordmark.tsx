"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

/**
 * Hero wordmark rendered in ember with an outer projection glow (styled via
 * the .wordmark-glow class in globals.css). Sizing is pure CSS clamp. The
 * reveal uses a slow projector sweep instead of a hard flash.
 */
export default function HeroWordmark() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(ref.current, { type: "chars" });
      gsap.from(split.chars, {
        y: 30,
        opacity: 0,
        filter: "blur(3px)",
        duration: 0.64,
        stagger: 0.032,
        ease: "power2.out",
        delay: 0.18,
      });

      const revealEnd = 0.18 + 0.64 + (split.chars.length - 1) * 0.032 + 0.18;
      gsap.fromTo(
        split.chars,
        {
          color: "#DD5454",
          textShadow: "0 0 32px rgba(221, 84, 84, 0.25), 0 0 64px rgba(221, 84, 84, 0.12)",
        },
        {
          color: "#F3C1B8",
          textShadow: "0 0 18px rgba(243, 193, 184, 0.18), 0 0 54px rgba(221, 84, 84, 0.2)",
          duration: 0.42,
          stagger: { each: 0.045, from: "start" },
          ease: "sine.inOut",
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
