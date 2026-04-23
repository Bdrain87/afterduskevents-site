"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Ref = {
  id: string;
  label: string;
  widthFt: number;
  heightFt: number;
  // SVG path relative to a 100-unit bounding box (fills/positions scale by widthFt/heightFt)
  render: (ox: number, oy: number, w: number, h: number) => React.ReactNode;
};

// 30 ft screen: treated as 30 ft wide x 17 ft tall (effective projected area).
const SCREEN_W = 30;
const SCREEN_H = 17;

const refs: Ref[] = [
  {
    id: "person",
    label: "Person",
    widthFt: 1.8,
    heightFt: 5.83,
    render: (ox, oy, w, h) => (
      <g stroke="#DD5454" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={ox + w / 2} cy={oy + h * 0.12} r={h * 0.08} />
        <line x1={ox + w / 2} y1={oy + h * 0.2} x2={ox + w / 2} y2={oy + h * 0.6} />
        <line x1={ox + w / 2} y1={oy + h * 0.3} x2={ox + w * 0.2} y2={oy + h * 0.45} />
        <line x1={ox + w / 2} y1={oy + h * 0.3} x2={ox + w * 0.8} y2={oy + h * 0.45} />
        <line x1={ox + w / 2} y1={oy + h * 0.6} x2={ox + w * 0.25} y2={oy + h} />
        <line x1={ox + w / 2} y1={oy + h * 0.6} x2={ox + w * 0.75} y2={oy + h} />
      </g>
    ),
  },
  {
    id: "minivan",
    label: "Minivan",
    widthFt: 17,
    heightFt: 6,
    render: (ox, oy, w, h) => (
      <g stroke="#DD5454" strokeWidth="0.8" fill="none">
        <path d={`M ${ox} ${oy + h * 0.6} L ${ox + w * 0.12} ${oy + h * 0.18} L ${ox + w * 0.78} ${oy + h * 0.18} L ${ox + w * 0.95} ${oy + h * 0.42} L ${ox + w} ${oy + h * 0.6}`} />
        <path d={`M ${ox} ${oy + h * 0.6} L ${ox + w} ${oy + h * 0.6} L ${ox + w} ${oy + h * 0.88} L ${ox} ${oy + h * 0.88} Z`} />
        <circle cx={ox + w * 0.2} cy={oy + h * 0.88} r={h * 0.12} />
        <circle cx={ox + w * 0.8} cy={oy + h * 0.88} r={h * 0.12} />
      </g>
    ),
  },
  {
    id: "garage",
    label: "Two-car garage",
    widthFt: 20,
    heightFt: 9,
    render: (ox, oy, w, h) => (
      <g stroke="#DD5454" strokeWidth="0.8" fill="none">
        <path d={`M ${ox} ${oy + h * 0.25} L ${ox + w / 2} ${oy} L ${ox + w} ${oy + h * 0.25} L ${ox + w} ${oy + h} L ${ox} ${oy + h} Z`} />
        <rect x={ox + w * 0.08} y={oy + h * 0.4} width={w * 0.36} height={h * 0.55} />
        <rect x={ox + w * 0.56} y={oy + h * 0.4} width={w * 0.36} height={h * 0.55} />
      </g>
    ),
  },
  {
    id: "tennis",
    label: "Tennis net",
    widthFt: 36,
    heightFt: 3.5,
    render: (ox, oy, w, h) => (
      <g stroke="#DD5454" strokeWidth="0.8" fill="none">
        <line x1={ox} y1={oy + h * 0.2} x2={ox + w} y2={oy + h * 0.2} strokeWidth="1.2" />
        <line x1={ox} y1={oy + h * 0.2} x2={ox} y2={oy + h} />
        <line x1={ox + w} y1={oy + h * 0.2} x2={ox + w} y2={oy + h} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={ox + (w * i) / 12} y1={oy + h * 0.2} x2={ox + (w * i) / 12} y2={oy + h} />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={`h${i}`} x1={ox} y1={oy + h * 0.2 + (h * 0.8 * i) / 3} x2={ox + w} y2={oy + h * 0.2 + (h * 0.8 * i) / 3} />
        ))}
      </g>
    ),
  },
];

// viewBox drawn in "feet units" so positions map 1:1 to reality.
// Ground line: bottom row. Screen sits at left, reference at right.
const VB_W = 80;
const VB_H = SCREEN_H + 4; // extra breathing room above
const GROUND = VB_H - 1;
const SCREEN_X = 2;
const REF_X = SCREEN_W + 10;

export default function ThirtyFootCheck() {
  const [activeId, setActiveId] = useState<string>("person");
  const active = refs.find((r) => r.id === activeId) ?? refs[0];

  return (
    <section
      className="relative bg-dusk overflow-hidden px-6 sm:px-10 lg:px-16"
      style={{ paddingTop: "96px", paddingBottom: "96px", minHeight: "80vh" }}
      aria-labelledby="thirty-ft-heading"
      data-dim-beam
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Scale diagram: 3 cols */}
        <div className="lg:col-span-3 relative">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            role="img"
            aria-labelledby="thirty-ft-diagram-title"
            className="w-full h-auto"
          >
            <title id="thirty-ft-diagram-title">
              30-foot screen compared to a {active.label.toLowerCase()}
            </title>

            {/* Ground line */}
            <line x1={0} y1={GROUND} x2={VB_W} y2={GROUND} stroke="rgba(221,84,84,0.25)" strokeWidth="0.1" strokeDasharray="0.6 0.6" />

            {/* 30 ft screen outline */}
            <rect
              x={SCREEN_X}
              y={GROUND - SCREEN_H}
              width={SCREEN_W}
              height={SCREEN_H}
              fill="none"
              stroke="#F5F1EC"
              strokeWidth="0.15"
            />
            {/* projected area cross */}
            <line x1={SCREEN_X} y1={GROUND - SCREEN_H} x2={SCREEN_X + SCREEN_W} y2={GROUND} stroke="rgba(245,241,236,0.1)" strokeWidth="0.08" />
            <line x1={SCREEN_X + SCREEN_W} y1={GROUND - SCREEN_H} x2={SCREEN_X} y2={GROUND} stroke="rgba(245,241,236,0.1)" strokeWidth="0.08" />

            {/* Dim labels */}
            <text x={SCREEN_X + SCREEN_W / 2} y={GROUND - SCREEN_H - 0.5} fill="#DD5454" fontSize="1.1" textAnchor="middle" fontFamily="monospace">
              30 ft
            </text>
            <text x={SCREEN_X + SCREEN_W + 0.4} y={GROUND - SCREEN_H / 2} fill="#808891" fontSize="0.9" fontFamily="monospace">
              ~17 ft
            </text>

            {/* Reference object, right-aligned to the ground */}
            {active.render(REF_X, GROUND - active.heightFt, active.widthFt, active.heightFt)}
            <text
              x={REF_X + active.widthFt / 2}
              y={GROUND + 0.6}
              fill="#808891"
              fontSize="0.8"
              textAnchor="middle"
              fontFamily="monospace"
              dominantBaseline="hanging"
            >
              {active.label} · {active.widthFt} ft wide · {active.heightFt} ft tall
            </text>
          </svg>
        </div>

        {/* Copy + selector: 2 cols */}
        <div className="lg:col-span-2">
          <p className="text-caption text-ember mb-4">The screen</p>
          <h2
            id="thirty-ft-heading"
            className="font-display text-projector text-display-xl tracking-wider mb-6"
          >
            30 FEET, ONE SIZE.
          </h2>
          <p className="text-silver text-body-lg leading-relaxed mb-8 max-w-[42ch]">
            Water ballast setup, no digging. Scales to crowd through audio, not screen size.
            Every event gets the same 30-foot presence.
          </p>

          <div className="mb-8">
            <p className="text-caption text-steel mb-3">Scale against...</p>
            <div className="flex flex-wrap gap-2">
              {refs.map((r) => {
                const isActive = r.id === activeId;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveId(r.id)}
                    aria-pressed={isActive}
                    className={`px-3.5 py-2 text-sm tracking-wide transition-colors duration-200 border ${
                      isActive
                        ? "border-ember text-ember bg-ember/10"
                        : "border-white/15 text-steel hover:border-ember/40 hover:text-silver"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-ember text-sm font-semibold hover:text-projector transition-colors group"
          >
            Pick your audio tier
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
