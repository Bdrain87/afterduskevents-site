"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

type Tod = "day" | "golden" | "dusk" | "night";

/**
 * Four color palettes keyed to time-of-day. Each is a mesh of up to six
 * stops consumed by the shader. The order roughly reads top-to-bottom.
 */
const palettes: Record<Tod, string[]> = {
  day: [
    "#D9D3CC", // warm dove grey top
    "#C8D1DE", // soft morning blue
    "#B8A598", // mid warm neutral
    "#8B6F65", // deeper shadow
    "#6B1F1F", // oxblood accent, low
  ],
  golden: [
    "#F0C896", // apricot top
    "#E29C68", // warm golden
    "#B55244", // deep rose horizon
    "#6B1F1F", // oxblood base
    "#1a0f14", // night shadow floor
  ],
  dusk: [
    "#1e2a3a", // teal sky
    "#2a1e3a", // plum
    "#3a1014", // ember horizon band
    "#0a0a0a", // screening floor
    "#050505", // deepest shadow
  ],
  night: [
    "#050508", // near-pure screening
    "#0a0a0a", // screening
    "#0d0b1a", // violet-black nebula
    "#1a0f1a", // deep plum accent
    "#050505", // deepest shadow
  ],
};

function readTod(): Tod {
  if (typeof document === "undefined") return "night";
  const v = document.documentElement.dataset.tod as Tod | undefined;
  return v && v in palettes ? v : "night";
}

export default function SkyGradient() {
  const [tod, setTod] = useState<Tod>("night");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setTod(readTod());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const observer = new MutationObserver(() => setTod(readTod()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-tod"],
    });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <MeshGradient
      colors={palettes[tod]}
      speed={reduced ? 0 : 0.18}
      distortion={0.55}
      swirl={0.12}
      grainMixer={0.15}
      grainOverlay={0}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
