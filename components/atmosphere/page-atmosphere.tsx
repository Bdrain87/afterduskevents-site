"use client";

import { MeshGradient, GrainGradient } from "@paper-design/shaders-react";

type Variant = "dusk" | "ember" | "space";

type Props = {
  variant?: Variant;
  className?: string;
};

const PALETTES: Record<Variant, string[]> = {
  // Default. soft oxblood wash over deep charcoal
  dusk: ["#0A0A0A", "#1A1A1A", "#3A0E0E", "#6B1F1F"],
  // Brighter. for pages that want more warmth (add-ons, contact)
  ember: ["#0A0A0A", "#2a0e0e", "#6B1F1F", "#DD5454"],
  // Cooler. navy / oxblood blend for long-form pages (guides, about)
  space: ["#050508", "#0F0A1E", "#1A1A1A", "#4A0E0E"],
};

/**
 * GPU-cheap Paper Design MeshGradient + GrainGradient pair used as a
 * drop-in hero/section backdrop on every page that was previously a flat
 * charcoal. Speed is intentionally slow (0.06) so it reads as atmosphere,
 * not motion. Opacity is driven by the global --atmo-nebula-opacity var
 * so time-of-day shifts propagate here too.
 */
export default function PageAtmosphere({ variant = "dusk", className = "" }: Props) {
  const colors = PALETTES[variant];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: "var(--atmo-nebula-opacity, 1)" }}
    >
      <MeshGradient
        colors={colors}
        speed={0.06}
        distortion={1.2}
        swirl={0.5}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      <GrainGradient
        colors={["#00000000", "#00000066"]}
        speed={0.02}
        softness={1}
        intensity={0.22}
        noise={0.35}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
