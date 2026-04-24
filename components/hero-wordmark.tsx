"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

/**
 * Hero wordmark rendered like projected light with a restrained ember halo.
 * The reveal uses a slow projector sweep instead of a hard flash.
 */
export default function HeroWordmark() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(ref.current, { type: "chars" });
      gsap.from(split.chars, {
        y: 24,
        opacity: 0,
        filter: "blur(2px)",
        duration: 0.72,
        stagger: 0.026,
        ease: "power2.out",
        delay: 0.2,
      });

      const revealEnd = 0.2 + 0.72 + (split.chars.length - 1) * 0.026 + 0.2;
      gsap.fromTo(
        split.chars,
        {
          color: "#F5F1EC",
          textShadow: "0 0 18px rgba(245, 241, 236, 0.14), 0 0 54px rgba(221, 84, 84, 0.14)",
        },
        {
          color: "#FFE1D8",
          textShadow: "0 0 22px rgba(255, 225, 216, 0.2), 0 0 62px rgba(221, 84, 84, 0.18)",
          duration: 0.34,
          stagger: { each: 0.038, from: "start" },
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          delay: revealEnd,
          onComplete: () => gsap.set(split.chars, { clearProps: "color,textShadow" }),
        },
      );
    },
    { scope: ref },
  );

  return (
    <h1
      ref={ref}
      aria-label="After Dusk Events"
      className="wordmark wordmark-glow font-display text-display-hero whitespace-nowrap"
    >
      AFTER DUSK EVENTS
    </h1>
  );
}
