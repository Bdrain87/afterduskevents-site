"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { cities, type City } from "@/lib/cities";

// Canton center
const CANTON_LAT = 42.3086;
const CANTON_LNG = -83.482;
// Mercator-lite: miles per degree lat / lng at Canton's latitude
const MI_PER_DEG_LAT = 69;
const MI_PER_DEG_LNG = 51;

// viewBox in miles. Canton at center plus ~100 mi of padding each way so the
// travel-zone ring and the far cities (Port Huron, Lansing) are visible.
const VB_SIZE = 220;
const VB_CENTER = VB_SIZE / 2;
const SERVICE_RADIUS_MI = 60;
const TRAVEL_RADIUS_MI = 90;

function projectCity(city: City): { x: number; y: number } {
  const dLat = city.lat - CANTON_LAT;
  const dLng = city.lng - CANTON_LNG;
  const miEast = dLng * MI_PER_DEG_LNG;
  const miNorth = dLat * MI_PER_DEG_LAT;
  return {
    x: VB_CENTER + miEast,
    y: VB_CENTER - miNorth,
  };
}

function cityIsInRadius(city: City): boolean {
  return city.distanceMiles <= SERVICE_RADIUS_MI;
}

function cityInTravelZone(city: City): boolean {
  return city.distanceMiles > SERVICE_RADIUS_MI && city.distanceMiles <= TRAVEL_RADIUS_MI;
}

export default function NightSkyMap() {
  const [selected, setSelected] = useState<City | null>(null);

  const projected = useMemo(
    () => cities.map((c) => ({ ...c, ...projectCity(c) })),
    [],
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        {/* Map */}
        <div className="lg:col-span-3 relative">
          <div className="relative aspect-square w-full border border-white/10 bg-screening/40 backdrop-blur-sm overflow-hidden">
            <svg
              viewBox={`0 0 ${VB_SIZE} ${VB_SIZE}`}
              className="w-full h-full"
              role="img"
              aria-label="Southeast Michigan service area map. Canton at center with a 60-mile service radius and a 90-mile travel zone."
            >
              {/* Concentric range rings for visual rhythm */}
              {[20, 40].map((r) => (
                <circle
                  key={r}
                  cx={VB_CENTER}
                  cy={VB_CENTER}
                  r={r}
                  fill="none"
                  stroke="rgba(245, 241, 236, 0.04)"
                  strokeWidth="0.3"
                />
              ))}
              {/* 60-mile service radius: soft ember glow */}
              <circle
                cx={VB_CENTER}
                cy={VB_CENTER}
                r={SERVICE_RADIUS_MI}
                fill="rgba(221, 84, 84, 0.03)"
                stroke="rgba(221, 84, 84, 0.35)"
                strokeWidth="0.4"
                strokeDasharray="0.8 1.4"
              />
              {/* 90-mile travel zone ring */}
              <circle
                cx={VB_CENTER}
                cy={VB_CENTER}
                r={TRAVEL_RADIUS_MI}
                fill="none"
                stroke="rgba(221, 84, 84, 0.12)"
                strokeWidth="0.3"
                strokeDasharray="0.4 2"
              />

              {/* Canton center: larger ember dot with halo */}
              <circle
                cx={VB_CENTER}
                cy={VB_CENTER}
                r={4.5}
                fill="rgba(221, 84, 84, 0.25)"
              />
              <circle
                cx={VB_CENTER}
                cy={VB_CENTER}
                r={1.8}
                fill="#DD5454"
              />
              <text
                x={VB_CENTER + 3}
                y={VB_CENTER + 1.2}
                fontSize="3"
                fill="#DD5454"
                fontFamily="monospace"
                style={{ fontWeight: 600 }}
              >
                CANTON
              </text>

              {/* City dots */}
              {projected.map((c) => {
                if (c.slug === "canton") return null;
                const inRadius = cityIsInRadius(c);
                const travel = cityInTravelZone(c);
                const isSelected = selected?.slug === c.slug;
                const r = isSelected ? 1.8 : inRadius ? 1.2 : 0.9;
                const alpha = inRadius ? 0.95 : travel ? 0.6 : 0.35;
                return (
                  <g
                    key={c.slug}
                    className="cursor-pointer"
                    onClick={() => setSelected(c)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(c);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show details for ${c.name}`}
                  >
                    {isSelected && (
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={3}
                        fill="rgba(221, 84, 84, 0.2)"
                      />
                    )}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={r}
                      fill={isSelected ? "#DD5454" : `rgba(245, 250, 250, ${alpha})`}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-mono text-steel">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" aria-hidden="true" />
                Service area (0 to 60 mi)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember/40" aria-hidden="true" />
                Travel zone (60 to 90 mi)
              </span>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <aside className="lg:col-span-2" aria-live="polite">
          {selected ? (
            <div className="border border-white/10 bg-charcoal/60 backdrop-blur-sm p-8 h-full flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-caption text-ember mb-2">
                    {cityIsInRadius(selected) ? "Service area" : cityInTravelZone(selected) ? "Travel zone" : "Beyond 90 mi"}
                  </p>
                  <h3 className="font-display text-projector text-display-md tracking-wider leading-none">
                    {selected.name.toUpperCase()}
                  </h3>
                  <p className="text-mono text-steel mt-2">
                    {selected.county} County · {selected.distanceMiles} mi from Canton
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close detail"
                  className="text-steel hover:text-ember transition-colors p-1 -mt-1"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1" />
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/serving/${selected.slug}`}
                  className="inline-flex min-h-[44px] items-center px-5 py-3 text-sm font-semibold border border-white/20 text-silver hover:border-ember hover:text-ember transition-colors"
                >
                  {selected.name} page
                </Link>
                <Link
                  href={`/contact?location=${encodeURIComponent(selected.name)}`}
                  className="inline-flex min-h-[44px] items-center px-5 py-3 text-sm font-semibold bg-oxblood text-projector hover:bg-oxblood-deep transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          ) : (
            <div className="border border-white/10 bg-charcoal/40 backdrop-blur-sm p-8 h-full flex flex-col justify-center">
              <p className="text-caption text-ember mb-4">Service map</p>
              <h3 className="font-display text-projector text-display-md tracking-wider leading-none mb-5">
                PICK A CITY.
              </h3>
              <p className="text-silver text-body leading-relaxed">
                Canton sits in the middle. Every dot is a city in our service area. Click or tap one to see its distance from Canton and go straight to a quote.
              </p>
              <p className="text-mono text-steel mt-6">
                0 to 60 mi: standard service · 60 to 90 mi: travel line added to the quote.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
