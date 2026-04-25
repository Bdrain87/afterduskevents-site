"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cities, type City } from "@/lib/cities";
import StatTicker from "@/components/stat-ticker";

const CANTON_LAT = 42.3086;
const CANTON_LNG = -83.482;
const MI_PER_DEG_LAT = 69;
const MI_PER_DEG_LNG = 51;

const VB_SIZE = 220;
const VB_CENTER = VB_SIZE / 2;
const SERVICE_RADIUS_MI = 40;
const OUTER_REFERENCE_MI = 80;

type ProjectedCity = City & { x: number; y: number };
type LabelAnchor = "start" | "middle" | "end";

const FEATURED_LABELS: Record<string, { dx: number; dy: number; anchor: LabelAnchor }> = {
  "ann-arbor": { dx: -6.5, dy: 5.6, anchor: "end" },
  detroit: { dx: 5.8, dy: 2.6, anchor: "start" },
  birmingham: { dx: 5.4, dy: -3.7, anchor: "start" },
  monroe: { dx: 4.8, dy: 6.2, anchor: "start" },
  flint: { dx: -4.6, dy: -5.2, anchor: "end" },
  lansing: { dx: -4.8, dy: 1.2, anchor: "end" },
  "port-huron": { dx: 5.1, dy: -1.6, anchor: "start" },
};

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

function autoLabelPlacement(city: ProjectedCity): { x: number; y: number; anchor: LabelAnchor } {
  const dx = city.x - VB_CENTER;
  const dy = city.y - VB_CENTER;
  const len = Math.max(0.001, Math.hypot(dx, dy));
  const offset = city.distanceMiles < 12 ? 5 : 4;
  const x = city.x + (dx / len) * offset;
  const y = city.y + (dy / len) * offset + 0.7;
  const anchor = dx > 1 ? "start" : dx < -1 ? "end" : "middle";
  return { x, y, anchor };
}

function labelPlacement(city: ProjectedCity): { x: number; y: number; anchor: LabelAnchor } {
  const custom = FEATURED_LABELS[city.slug];
  if (!custom) return autoLabelPlacement(city);
  return {
    x: city.x + custom.dx,
    y: city.y + custom.dy,
    anchor: custom.anchor,
  };
}

export default function NightSkyMap() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<City | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const projected = useMemo<ProjectedCity[]>(
    () =>
      cities
        .map((c) => ({ ...c, ...projectCity(c) }))
        .sort((a, b) => b.distanceMiles - a.distanceMiles),
    [],
  );

  const nearbyInCounty = useMemo(() => {
    if (!selected) return [];
    return projected
      .filter((c) => c.county === selected.county && c.slug !== selected.slug)
      .sort((a, b) => a.distanceMiles - b.distanceMiles)
      .slice(0, 5);
  }, [projected, selected]);

  const selectedProjected = selected
    ? projected.find((c) => c.slug === selected.slug) ?? null
    : null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-stretch lg:gap-8">
        <div className="relative lg:col-span-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/10 bg-screening/70 shadow-[0_30px_90px_rgba(0,0,0,0.36)] backdrop-blur-sm lg:aspect-auto lg:h-full lg:max-h-[680px] lg:min-h-[560px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(221,84,84,0.13), rgba(221,84,84,0.03) 27%, transparent 48%), radial-gradient(circle at 78% 18%, rgba(245,241,236,0.06), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 36%)",
              }}
            />

            <div className="absolute left-4 top-4 z-10 hidden flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel sm:flex">
              <span className="rounded-full border border-ember/35 bg-oxblood/20 px-3 py-1 text-ember">
                Canton base
              </span>
              <span className="rounded-full border border-white/10 bg-screening/65 px-3 py-1">
                40 mi core
              </span>
              <span className="rounded-full border border-white/10 bg-screening/65 px-3 py-1">
                Travel quoted beyond
              </span>
            </div>

            <svg
              viewBox={`0 0 ${VB_SIZE} ${VB_SIZE}`}
              className="h-full w-full"
              role="img"
              aria-label="Southeast Michigan service area map. Canton is the base, the bright ring shows the 40-mile core service area, and outer cities can be quoted with travel."
            >
              <defs>
                <radialGradient id="service-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(221,84,84,0.22)" />
                  <stop offset="46%" stopColor="rgba(221,84,84,0.08)" />
                  <stop offset="100%" stopColor="rgba(221,84,84,0)" />
                </radialGradient>
                <filter id="ember-glow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="1.7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width={VB_SIZE} height={VB_SIZE} fill="transparent" />

              <motion.circle
                cx={VB_CENTER}
                cy={VB_CENTER}
                r={SERVICE_RADIUS_MI}
                fill="url(#service-glow)"
                initial={reduced ? undefined : { opacity: 0, scale: 0.82 }}
                animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${VB_CENTER}px ${VB_CENTER}px`, transformBox: "fill-box" }}
              />

              <Ring
                r={20}
                stroke="rgba(245,241,236,0.08)"
                reduced={reduced}
                delay={0.05}
              />
              <Ring
                r={SERVICE_RADIUS_MI}
                stroke="rgba(221,84,84,0.72)"
                strokeWidth={0.48}
                reduced={reduced}
                delay={0.16}
              />
              <Ring
                r={OUTER_REFERENCE_MI}
                stroke="rgba(221,84,84,0.2)"
                strokeWidth={0.36}
                dash="0.55 2.2"
                reduced={reduced}
                delay={0.24}
              />

              <MapPill x={VB_CENTER} y={VB_CENTER - SERVICE_RADIUS_MI - 4.4}>
                40 MILE CORE
              </MapPill>
              <MapPill x={VB_CENTER} y={VB_CENTER - OUTER_REFERENCE_MI - 5.2} muted>
                TRAVEL BEYOND
              </MapPill>

              {selectedProjected && selectedProjected.slug !== "canton" && (
                <SelectedRoute city={selectedProjected} reduced={reduced} />
              )}

              {projected.map((city, index) => {
                if (city.slug === "canton") return null;
                return (
                  <CityNode
                    key={city.slug}
                    city={city}
                    index={index}
                    reduced={reduced}
                    selected={selected}
                    hovered={hovered}
                    onSelect={() => setSelected(city)}
                    onHover={(slug) => setHovered(slug)}
                  />
                );
              })}

              <CantonBeacon reduced={reduced} />
            </svg>

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2 text-sm leading-relaxed text-silver sm:flex-row sm:items-center sm:gap-6">
              <span className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
                Within 40 mi (no travel charge)
              </span>
              <span className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
                Beyond 40 mi (+ travel charge)
              </span>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2" aria-live="polite">
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-charcoal/55 p-6 backdrop-blur-sm sm:p-7">
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

function CityNode({
  city,
  index,
  reduced,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  city: ProjectedCity;
  index: number;
  reduced: boolean | null;
  selected: City | null;
  hovered: string | null;
  onSelect: () => void;
  onHover: (slug: string | null) => void;
}) {
  const zone = cityZone(city);
  const isSelected = selected?.slug === city.slug;
  const isHovered = hovered === city.slug;
  const isFeatured = city.slug in FEATURED_LABELS;
  const isDimmed = Boolean(selected && !isSelected);
  const label = labelPlacement(city);
  const showLabel = isSelected || isHovered || isFeatured;
  const nodeColor = zone === "service" ? "#F5F1EC" : "#DD5454";
  const dotOpacity = isDimmed ? 0.18 : isFeatured ? 0.9 : zone === "service" ? 0.62 : 0.5;
  const radius = isSelected ? 2.75 : isHovered ? 2.25 : isFeatured ? 1.45 : zone === "service" ? 1.02 : 1;

  return (
    <motion.g
      className="cursor-pointer"
      initial={reduced ? undefined : { opacity: 0, scale: 0.65 }}
      animate={reduced ? undefined : { opacity: 1, scale: 1 }}
      transition={{
        duration: 0.38,
        delay: 0.55 + Math.min(city.distanceMiles / 90, 1) * 0.35 + (index % 6) * 0.025,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      onMouseEnter={() => onHover(city.slug)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(city.slug)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      role="button"
      aria-label={`Show ${city.name} details (${city.distanceMiles} miles from Canton)`}
      style={{ transformOrigin: `${city.x}px ${city.y}px`, transformBox: "fill-box" }}
    >
      <circle cx={city.x} cy={city.y} r={4.8} fill="transparent" />
      {(isSelected || isHovered) && (
        <circle
          cx={city.x}
          cy={city.y}
          r={4.4}
          fill={zone === "service" ? "rgba(245,241,236,0.1)" : "rgba(221,84,84,0.14)"}
          stroke={zone === "service" ? "rgba(245,241,236,0.36)" : "rgba(221,84,84,0.42)"}
          strokeWidth="0.25"
        />
      )}
      <circle
        cx={city.x}
        cy={city.y}
        r={radius}
        fill={nodeColor}
        opacity={isSelected || isHovered ? 1 : dotOpacity}
        filter={isSelected || isHovered ? "url(#ember-glow)" : undefined}
      />
      {showLabel && (
        <CityLabel
          name={city.name}
          x={label.x}
          y={label.y}
          anchor={label.anchor}
          active={isSelected || isHovered}
          dimmed={isDimmed}
        />
      )}
    </motion.g>
  );
}

function CantonBeacon({ reduced }: { reduced: boolean | null }) {
  const label = "CANTON BASE";
  const width = label.length * 2.35 + 7;
  const x = VB_CENTER - width / 2;
  const y = VB_CENTER + 6.2;

  return (
    <g pointerEvents="none">
      <motion.circle
        cx={VB_CENTER}
        cy={VB_CENTER}
        r={9.2}
        fill="rgba(221,84,84,0.16)"
        initial={reduced ? undefined : { opacity: 0, scale: 0.75 }}
        animate={reduced ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [0.9, 1.2, 0.9] }}
        transition={reduced ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${VB_CENTER}px ${VB_CENTER}px`, transformBox: "fill-box" }}
      />
      <circle cx={VB_CENTER} cy={VB_CENTER} r={4.6} fill="rgba(221,84,84,0.22)" />
      <circle cx={VB_CENTER} cy={VB_CENTER} r={2.25} fill="#DD5454" filter="url(#ember-glow)" />
      <rect
        x={x}
        y={y}
        width={width}
        height="8.3"
        rx="2.2"
        fill="rgba(10,10,10,0.9)"
        stroke="rgba(221,84,84,0.52)"
        strokeWidth="0.22"
      />
      <text
        x={VB_CENTER}
        y={y + 5.5}
        fontSize="3.6"
        fill="#DD5454"
        fontFamily="monospace"
        textAnchor="middle"
        style={{ fontWeight: 800, letterSpacing: "0.12em" }}
      >
        {label}
      </text>
    </g>
  );
}

function Ring({
  r,
  stroke,
  strokeWidth = 0.34,
  dash,
  reduced,
  delay,
}: {
  r: number;
  stroke: string;
  strokeWidth?: number;
  dash?: string;
  reduced: boolean | null;
  delay: number;
}) {
  const circumference = 2 * Math.PI * r;
  return (
    <motion.circle
      cx={VB_CENTER}
      cy={VB_CENTER}
      r={r}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dash}
      initial={reduced || dash ? undefined : { strokeDasharray: circumference, strokeDashoffset: circumference }}
      animate={reduced || dash ? undefined : { strokeDashoffset: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function CityLabel({
  name,
  x,
  y,
  anchor,
  active,
  dimmed,
}: {
  name: string;
  x: number;
  y: number;
  anchor: LabelAnchor;
  active: boolean;
  dimmed: boolean;
}) {
  const fontSize = active ? 4.8 : 4.15;
  const width = Math.max(18, name.length * (active ? 2.45 : 2.16) + 6.2);
  const height = active ? 9.2 : 8.1;
  const rectX =
    anchor === "start" ? x - 2.3 : anchor === "end" ? x - width + 2.3 : x - width / 2;
  const textX = anchor === "start" ? rectX + 3 : anchor === "end" ? rectX + width - 3 : x;

  return (
    <g pointerEvents="none" opacity={dimmed ? 0.52 : 1}>
      <rect
        x={rectX}
        y={y - height + 1.2}
        width={width}
        height={height}
        rx="2"
        fill="rgba(10,10,10,0.88)"
        stroke={active ? "rgba(245,241,236,0.42)" : "rgba(245,241,236,0.16)"}
        strokeWidth="0.2"
      />
      <text
        x={textX}
        y={y - 2}
        fontSize={fontSize}
        fill={active ? "#F5F1EC" : "rgba(245,241,236,0.82)"}
        fontFamily="monospace"
        textAnchor={anchor}
        style={{ fontWeight: active ? 800 : 700, letterSpacing: "0.02em" }}
      >
        {name}
      </text>
    </g>
  );
}

function MapPill({
  x,
  y,
  muted = false,
  children,
}: {
  x: number;
  y: number;
  muted?: boolean;
  children: ReactNode;
}) {
  const text = String(children);
  const width = text.length * 2.7 + 9;
  return (
    <g pointerEvents="none">
      <rect
        x={x - width / 2}
        y={y - 5.8}
        width={width}
        height="8.6"
        rx="2.2"
        fill="rgba(10,10,10,0.86)"
        stroke={muted ? "rgba(221,84,84,0.26)" : "rgba(221,84,84,0.62)"}
        strokeWidth="0.22"
      />
      <text
        x={x}
        y={y - 0.7}
        fontSize="3.55"
        fill={muted ? "rgba(221,84,84,0.76)" : "#DD5454"}
        fontFamily="monospace"
        textAnchor="middle"
        style={{ fontWeight: 800, letterSpacing: "0.14em" }}
      >
        {children}
      </text>
    </g>
  );
}

function SelectedRoute({ city, reduced }: { city: ProjectedCity; reduced: boolean | null }) {
  return (
    <g pointerEvents="none">
      <motion.line
        x1={VB_CENTER}
        y1={VB_CENTER}
        x2={city.x}
        y2={city.y}
        stroke="#DD5454"
        strokeWidth="0.62"
        strokeDasharray="1.7 1.4"
        initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
        animate={reduced ? undefined : { pathLength: 1, opacity: 0.92 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.g
        initial={reduced ? undefined : { opacity: 0, y: 2 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
      >
        <rect
          x={(VB_CENTER + city.x) / 2 - 7.8}
          y={(VB_CENTER + city.y) / 2 - 4.2}
          width="15.6"
          height="4.8"
          rx="1.2"
          fill="rgba(10,10,10,0.92)"
          stroke="rgba(221,84,84,0.64)"
          strokeWidth="0.22"
        />
        <text
          x={(VB_CENTER + city.x) / 2}
          y={(VB_CENTER + city.y) / 2 - 1}
          fontSize="2.45"
          fill="#DD5454"
          fontFamily="monospace"
          textAnchor="middle"
          style={{ fontWeight: 800 }}
        >
          {city.distanceMiles} MI
        </text>
      </motion.g>
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
      className="flex h-full flex-col justify-center"
    >
      <p className="text-caption text-ember mb-3">Service map</p>
      <h3 className="font-display text-display-md leading-none tracking-wider text-projector mb-5">
        PICK A CITY.
      </h3>
      <p className="text-body leading-relaxed text-silver mb-6">
        Tap a dot on the map to see distance from Canton, service-zone notes, and quote links.
      </p>
      <div className="space-y-3 text-sm leading-relaxed text-silver">
        <p className="flex items-center gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
          Bright dots are inside the 40-mile core area.
        </p>
        <p className="flex items-center gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
          Ember dots are travel-quoted cities beyond the core.
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
  nearby: ProjectedCity[];
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
      className="flex h-full flex-col"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-caption text-ember mb-2">
            {zone === "service" ? "Standard service" : "+ Travel charge"}
          </p>
          <h3 className="font-display text-display-md leading-none tracking-wider text-projector">
            {city.name.toUpperCase()}
          </h3>
          <p className="text-mono text-steel mt-2">
            {city.county} County
            {city.distanceMiles > 0 && (
              <>
                {" · "}
                <StatTicker value={city.distanceMiles} className="text-mono text-steel" />
                {" mi from Canton"}
              </>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail"
          className="-mt-1 flex min-h-[32px] min-w-[32px] items-center justify-center p-1 text-steel transition-colors hover:text-ember"
        >
          <X size={18} />
        </button>
      </div>

      {zone === "travel" ? (
        <p className="mb-5 text-sm leading-relaxed text-silver">
          Outside the 40-mile core radius. We still come; the quote includes an additional travel charge that scales with distance.
        </p>
      ) : (
        <p className="mb-5 text-sm leading-relaxed text-silver">
          Inside the 40-mile core radius, so there is no added travel charge.
        </p>
      )}

      {nearby.length > 0 && (
        <div className="mb-5 border-t border-white/10 pt-5">
          <p className="text-caption text-steel mb-3">Also in {city.county} County</p>
          <ul className="flex flex-wrap gap-2">
            {nearby.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => onSelectNearby(c)}
                  className="inline-flex min-h-[28px] items-center gap-1.5 rounded-full border border-white/10 bg-screening/60 px-3 py-1 text-xs text-silver transition-colors hover:border-ember/60 hover:text-ember"
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

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
        <Link
          href={`/serving/${city.slug}`}
          className="inline-flex min-h-[44px] items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-silver transition-colors hover:border-ember hover:text-ember"
        >
          {city.name} page
        </Link>
        <Link
          href={`/contact?location=${encodeURIComponent(city.name)}`}
          className="inline-flex min-h-[44px] items-center rounded-lg bg-oxblood px-5 py-3 text-sm font-semibold text-projector transition-colors hover:bg-oxblood-deep"
        >
          Request a Quote
        </Link>
      </div>
    </motion.div>
  );
}
