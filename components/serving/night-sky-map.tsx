"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cities, type City } from "@/lib/cities";
import StatTicker from "@/components/stat-ticker";

// --- Map geometry ---------------------------------------------------------
const CANTON_LAT = 42.3086;
const CANTON_LNG = -83.482;
const MI_PER_DEG_LAT = 69;
const MI_PER_DEG_LNG = 51;

// viewBox in miles. Canton at center; padding leaves room for the outer ring
// and far cities (Lansing 67 mi, Port Huron 75 mi).
const VB_SIZE = 220;
const VB_CENTER = VB_SIZE / 2;

// New radius model: 40 mi = standard service, beyond = travel charge added.
// Outer ring at 80 mi gives a visual edge to the "+ travel charge" zone.
const SERVICE_RADIUS_MI = 40;
const OUTER_REFERENCE_MI = 80;

// Cities with permanently rendered labels on the map. Other cities are dots
// only with a hover/focus tooltip label.
const ANCHOR_CITY_SLUGS = new Set<string>([
  "detroit",
  "ann-arbor",
  "troy",
  "grosse-pointe",
  "flint",
  "lansing",
  "port-huron",
  "monroe",
]);

// Cities that sit close enough to Canton to crowd its label. We hide their
// labels entirely (still clickable) so Canton stays readable. Hover/focus
// still reveals the name.
const NEAR_CANTON_HIDE_LABEL = new Set<string>([
  "wayne",
  "plymouth",
  "westland",
  "northville",
  "livonia",
  "romulus",
  "garden-city",
  "belleville",
]);

function projectCity(city: City): { x: number; y: number } {
  const dLat = city.lat - CANTON_LAT;
  const dLng = city.lng - CANTON_LNG;
  return {
    x: VB_CENTER + dLng * MI_PER_DEG_LNG,
    y: VB_CENTER - dLat * MI_PER_DEG_LAT,
  };
}

function cityZone(city: City): "service" | "travel" {
  return city.distanceMiles <= SERVICE_RADIUS_MI ? "service" : "travel";
}

// --- Component ------------------------------------------------------------
export default function NightSkyMap() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<City | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const projected = useMemo(
    () =>
      cities
        .map((c) => ({ ...c, ...projectCity(c) }))
        .sort((a, b) => a.distanceMiles - b.distanceMiles),
    [],
  );

  const nearbyInCounty = useMemo(() => {
    if (!selected) return [];
    return projected
      .filter((c) => c.county === selected.county && c.slug !== selected.slug)
      .slice(0, 5);
  }, [projected, selected]);

  const selectedProjected = selected
    ? projected.find((c) => c.slug === selected.slug) ?? null
    : null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 lg:items-stretch">
        {/* Map */}
        <div className="lg:col-span-3 relative">
          <div className="relative aspect-square lg:aspect-auto lg:h-full lg:min-h-[560px] lg:max-h-[680px] w-full border border-white/10 bg-screening/40 backdrop-blur-sm overflow-hidden rounded-lg">
            <svg
              viewBox={`0 0 ${VB_SIZE} ${VB_SIZE}`}
              className="w-full h-full"
              role="img"
              aria-label="Southeast Michigan service area map. Canton at center with a 40-mile service radius. Beyond 40 miles, a travel charge is added to the quote."
            >
              {/* Faint inner reference ring */}
              <RingWithLabel
                r={20}
                label="20 MI"
                stroke="rgba(245, 241, 236, 0.08)"
                labelFill="rgba(128, 136, 145, 0.75)"
                reduced={reduced}
                delay={0.1}
              />
              {/* 40 mi service boundary */}
              <RingWithLabel
                r={SERVICE_RADIUS_MI}
                label="40 MI SERVICE"
                stroke="rgba(221, 84, 84, 0.55)"
                fill="rgba(221, 84, 84, 0.04)"
                labelFill="#DD5454"
                reduced={reduced}
                delay={0.25}
              />
              {/* Outer "additional charge" reference ring */}
              <RingWithLabel
                r={OUTER_REFERENCE_MI}
                label="+ TRAVEL CHARGE"
                stroke="rgba(221, 84, 84, 0.18)"
                dash="0.4 2"
                labelFill="rgba(221, 84, 84, 0.55)"
                reduced={reduced}
                delay={0.4}
              />

              {/* Connection line: drawn UNDER city dots */}
              {selectedProjected && selectedProjected.slug !== "canton" && (
                <g pointerEvents="none">
                  <motion.line
                    x1={VB_CENTER}
                    y1={VB_CENTER}
                    x2={selectedProjected.x}
                    y2={selectedProjected.y}
                    stroke="#DD5454"
                    strokeWidth="0.5"
                    strokeDasharray="1.5 1.5"
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                    animate={reduced ? undefined : { pathLength: 1, opacity: 0.85 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </g>
              )}

              {/* City dots: rendered BEFORE Canton so Canton stays on top */}
              {projected.map((c, i) => {
                if (c.slug === "canton") return null;
                const zone = cityZone(c);
                const isSelected = selected?.slug === c.slug;
                const isHovered = hovered === c.slug;
                const isAnchor = ANCHOR_CITY_SLUGS.has(c.slug);
                const hideLabel = NEAR_CANTON_HIDE_LABEL.has(c.slug);
                const dim = selected && !isSelected;

                const baseR = zone === "service" ? 1.1 : 0.85;
                const r = isSelected ? 2 : isHovered ? 1.7 : baseR;
                const baseAlpha = zone === "service" ? 0.92 : 0.55;
                const alpha = dim ? 0.22 : isSelected ? 1 : baseAlpha;

                const showLabel = !hideLabel && (isAnchor || isHovered || isSelected);

                return (
                  <motion.g
                    key={c.slug}
                    className="cursor-pointer"
                    initial={reduced ? undefined : { opacity: 0, scale: 0 }}
                    animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.7 + Math.min(c.distanceMiles / 90, 1) * 0.5 + (i % 5) * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setSelected(c)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(c);
                      }
                    }}
                    onMouseEnter={() => setHovered(c.slug)}
                    onMouseLeave={() => setHovered((h) => (h === c.slug ? null : h))}
                    onFocus={() => setHovered(c.slug)}
                    onBlur={() => setHovered((h) => (h === c.slug ? null : h))}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show ${c.name} details (${c.distanceMiles} miles from Canton)`}
                    style={{ transformOrigin: `${c.x}px ${c.y}px`, transformBox: "fill-box" }}
                  >
                    {/* Invisible touch target (~44px at typical render width) */}
                    <circle cx={c.x} cy={c.y} r={4.5} fill="transparent" />
                    {isSelected && (
                      <circle cx={c.x} cy={c.y} r={3.5} fill="rgba(221, 84, 84, 0.2)" />
                    )}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={r}
                      fill={isSelected ? "#DD5454" : `rgba(245, 250, 250, ${alpha})`}
                      className="transition-all duration-200"
                    />
                    {showLabel && (
                      <text
                        x={c.x + 2.4}
                        y={c.y + 0.8}
                        fontSize="2.1"
                        fill={
                          isSelected
                            ? "#DD5454"
                            : isHovered
                            ? "#DD5454"
                            : "rgba(184, 184, 184, 0.92)"
                        }
                        fontFamily="monospace"
                        style={{ pointerEvents: "none" }}
                      >
                        {c.name}
                      </text>
                    )}
                  </motion.g>
                );
              })}

              {/* Distance badge on connection line */}
              {selectedProjected && selectedProjected.slug !== "canton" && (
                <motion.g
                  pointerEvents="none"
                  initial={reduced ? undefined : { opacity: 0, y: 2 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.5 }}
                >
                  <rect
                    x={(VB_CENTER + selectedProjected.x) / 2 - 6}
                    y={(VB_CENTER + selectedProjected.y) / 2 - 3.6}
                    width="12"
                    height="3.8"
                    rx="0.8"
                    fill="#0A0A0A"
                    stroke="rgba(221, 84, 84, 0.55)"
                    strokeWidth="0.2"
                  />
                  <text
                    x={(VB_CENTER + selectedProjected.x) / 2}
                    y={(VB_CENTER + selectedProjected.y) / 2 - 0.9}
                    fontSize="2.4"
                    fill="#DD5454"
                    fontFamily="monospace"
                    textAnchor="middle"
                    style={{ fontWeight: 600 }}
                  >
                    {selectedProjected.distanceMiles} MI
                  </text>
                </motion.g>
              )}

              {/* Canton beacon — rendered LAST so it sits on top of all dots */}
              <CantonBeacon reduced={reduced} />
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-mono text-steel pointer-events-none">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" aria-hidden="true" />
                Within 40 mi (no travel charge)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember/40" aria-hidden="true" />
                Beyond 40 mi (+ travel charge)
              </span>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <aside className="lg:col-span-2" aria-live="polite">
          <div className="h-full border border-white/10 bg-charcoal/55 backdrop-blur-sm rounded-lg p-6 sm:p-7 overflow-hidden relative flex flex-col">
            {selected ? (
              <SelectedDetail
                key={selected.slug}
                city={selected}
                nearby={nearbyInCounty}
                onClose={() => setSelected(null)}
                onSelectNearby={(c) => setSelected(c)}
                reduced={reduced}
              />
            ) : (
              <EmptyState reduced={reduced} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

// --- Sub-components -------------------------------------------------------

function CantonBeacon({ reduced }: { reduced: boolean | null }) {
  return (
    <g pointerEvents="none">
      {/* Outer halo */}
      <motion.circle
        cx={VB_CENTER}
        cy={VB_CENTER}
        r={7}
        fill="rgba(221, 84, 84, 0.18)"
        initial={reduced ? undefined : { scale: 0, opacity: 0 }}
        animate={reduced ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${VB_CENTER}px ${VB_CENTER}px`, transformBox: "fill-box" }}
      />
      {/* Punch-out: solid dark center so dots underneath don't bleed through */}
      <circle cx={VB_CENTER} cy={VB_CENTER} r={4.2} fill="#0A0A0A" />
      <circle cx={VB_CENTER} cy={VB_CENTER} r={3.8} fill="rgba(221, 84, 84, 0.35)" />
      {/* Pulsing core */}
      <circle cx={VB_CENTER} cy={VB_CENTER} r={2.4} fill="#DD5454">
        {!reduced && (
          <animate
            attributeName="r"
            values="2.4;3;2.4"
            dur="3.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      {/* Label: black pill above the beacon, ember text */}
      <rect
        x={VB_CENTER - 7.5}
        y={VB_CENTER - 11.2}
        width="15"
        height="4.6"
        rx="0.8"
        fill="#0A0A0A"
        stroke="rgba(221, 84, 84, 0.55)"
        strokeWidth="0.25"
      />
      <text
        x={VB_CENTER}
        y={VB_CENTER - 8}
        fontSize="2.8"
        fill="#DD5454"
        fontFamily="monospace"
        textAnchor="middle"
        style={{ fontWeight: 700, letterSpacing: "0.18em" }}
      >
        CANTON
      </text>
    </g>
  );
}

type RingProps = {
  r: number;
  label: string;
  stroke: string;
  dash?: string;
  fill?: string;
  labelFill: string;
  reduced: boolean | null;
  delay: number;
};

function RingWithLabel({ r, label, stroke, dash, fill, labelFill, reduced, delay }: RingProps) {
  const circumference = 2 * Math.PI * r;
  return (
    <g>
      <motion.circle
        cx={VB_CENTER}
        cy={VB_CENTER}
        r={r}
        fill={fill ?? "none"}
        stroke={stroke}
        strokeWidth="0.35"
        strokeDasharray={dash}
        initial={reduced || dash ? undefined : { strokeDasharray: circumference, strokeDashoffset: circumference }}
        animate={reduced || dash ? undefined : { strokeDashoffset: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.text
        x={VB_CENTER}
        y={VB_CENTER - r + 1.3}
        fontSize="2.2"
        fill={labelFill}
        fontFamily="monospace"
        textAnchor="middle"
        style={{ letterSpacing: "0.18em", fontWeight: 600 }}
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.35, delay: delay + 0.4 }}
      >
        {label}
      </motion.text>
    </g>
  );
}

function EmptyState({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.div
      key="empty"
      initial={reduced ? undefined : { opacity: 0 }}
      animate={reduced ? undefined : { opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-full justify-center"
    >
      <p className="text-caption text-ember mb-3">Service map</p>
      <h3 className="font-display text-projector text-display-md tracking-wider leading-none mb-5">
        PICK A CITY.
      </h3>
      <p className="text-silver text-body leading-relaxed mb-6">
        Tap a dot on the map to see its distance from Canton and start a quote.
      </p>
      <div className="space-y-3 text-mono text-steel">
        <p className="flex items-center gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
          Within 40 mi: standard service, no travel charge.
        </p>
        <p className="flex items-center gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-ember/40" aria-hidden="true" />
          Beyond 40 mi: an additional travel charge is added to the quote.
        </p>
      </div>
    </motion.div>
  );
}

function SelectedDetail({
  city,
  nearby,
  onClose,
  onSelectNearby,
  reduced,
}: {
  city: City;
  nearby: (City & { x: number; y: number })[];
  onClose: () => void;
  onSelectNearby: (c: City) => void;
  reduced: boolean | null;
}) {
  const zone = cityZone(city);
  return (
    <motion.div
      key={city.slug}
      initial={reduced ? undefined : { opacity: 0, y: 6 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-caption text-ember mb-2">
            {zone === "service" ? "Standard service" : "+ Travel charge"}
          </p>
          <h3 className="font-display text-projector text-display-md tracking-wider leading-none">
            {city.name.toUpperCase()}
          </h3>
          <p className="text-mono text-steel mt-2">
            {city.county} County
            {city.distanceMiles > 0 && (
              <>
                {" · "}
                <StatTicker
                  value={city.distanceMiles}
                  className="text-mono text-steel"
                />
                {" mi from Canton"}
              </>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail"
          className="text-steel hover:text-ember transition-colors p-1 -mt-1 min-h-[32px] min-w-[32px] flex items-center justify-center"
        >
          <X size={18} />
        </button>
      </div>

      {zone === "travel" && (
        <p className="text-sm text-silver leading-relaxed mb-5">
          Outside the 40-mile core radius. We still come; the quote includes an additional travel charge that scales with distance.
        </p>
      )}

      {nearby.length > 0 && (
        <div className="border-t border-white/10 pt-5 mb-5">
          <p className="text-caption text-steel mb-3">Also in {city.county} County</p>
          <ul className="flex flex-wrap gap-2">
            {nearby.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => onSelectNearby(c)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-screening/60 px-3 py-1 text-xs text-silver transition-colors hover:border-ember/60 hover:text-ember min-h-[28px]"
                >
                  {c.name}
                  <span className="text-steel">{c.distanceMiles} mi</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-1" />

      <div className="flex flex-wrap gap-3 pt-5 border-t border-white/10">
        <Link
          href={`/serving/${city.slug}`}
          className="inline-flex min-h-[44px] items-center px-5 py-3 text-sm font-semibold border border-white/20 text-silver hover:border-ember hover:text-ember transition-colors rounded-md"
        >
          {city.name} page
        </Link>
        <Link
          href={`/contact?location=${encodeURIComponent(city.name)}`}
          className="inline-flex min-h-[44px] items-center px-5 py-3 text-sm font-semibold bg-oxblood text-projector hover:bg-oxblood-deep transition-colors rounded-md"
        >
          Request a Quote
        </Link>
      </div>
    </motion.div>
  );
}
