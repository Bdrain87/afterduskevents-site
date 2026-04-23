"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { audioTiers } from "@/lib/packages";

type TierSlug = (typeof audioTiers)[number]["slug"];

const meterLevels: Record<TierSlug, number> = {
  "single-speaker": 0.4,
  "two-speakers": 0.7,
  "two-speakers-sub": 1.0,
};

const shortLabel: Record<TierSlug, string> = {
  "single-speaker": "Single",
  "two-speakers": "Two",
  "two-speakers-sub": "Two + Sub",
};

function SoundMeter({ level, active }: { level: number; active: boolean }) {
  // 18 bars; lit count = round(18 * level). Base ember intensity scales with active state.
  const bars = 18;
  const lit = Math.max(1, Math.round(bars * level));
  return (
    <div
      aria-hidden="true"
      className="flex items-end gap-[3px] h-28 w-16"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const isLit = i < lit;
        const heightPct = 8 + (i / (bars - 1)) * 90;
        return (
          <span
            key={i}
            className="flex-1 rounded-[1.5px] transition-all duration-300"
            style={{
              height: `${heightPct}%`,
              background: isLit
                ? active
                  ? "#DD5454"
                  : "rgba(221, 84, 84, 0.55)"
                : "rgba(245, 241, 236, 0.06)",
              boxShadow: isLit && active ? "0 0 6px rgba(221, 84, 84, 0.6)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

export default function LightCheck() {
  const [activeSlug, setActiveSlug] = useState<TierSlug>("two-speakers");

  const active = useMemo(
    () => audioTiers.find((t) => t.slug === activeSlug) ?? audioTiers[1],
    [activeSlug],
  );

  return (
    <section
      id="tier-selector"
      aria-labelledby="light-check-heading"
      className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
      data-dim-beam
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-caption text-ember mb-3">Light check</p>
          <h2
            id="light-check-heading"
            className="font-display text-projector text-display-lg tracking-wider leading-none"
          >
            PICK YOUR SOUND.
          </h2>
          <p className="text-silver text-body-lg leading-relaxed mt-5 max-w-[50ch]">
            Same 30-foot screen, three ways to hear it. Hover or tap each tier to see what lands in your yard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Meter + selector, 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-end gap-6 sm:gap-8 justify-center lg:justify-start border border-white/10 bg-charcoal/40 backdrop-blur-sm p-8">
              {audioTiers.map((tier) => {
                const isActive = tier.slug === activeSlug;
                return (
                  <button
                    key={tier.slug}
                    id={`tier-${tier.slug}`}
                    type="button"
                    onClick={() => setActiveSlug(tier.slug)}
                    onMouseEnter={() => setActiveSlug(tier.slug)}
                    onFocus={() => setActiveSlug(tier.slug)}
                    aria-pressed={isActive}
                    aria-label={`Select ${tier.name}`}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <SoundMeter level={meterLevels[tier.slug]} active={isActive} />
                    <span
                      className={`font-display text-xl tracking-wider transition-colors ${
                        isActive ? "text-ember" : "text-steel group-hover:text-silver"
                      }`}
                    >
                      {shortLabel[tier.slug]}
                    </span>
                    <span
                      className={`h-[2px] w-10 transition-colors ${
                        isActive ? "bg-ember" : "bg-white/10 group-hover:bg-white/25"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-mono text-steel tracking-wider">
              Bass demo: coming v2
            </p>
          </div>

          {/* Card detail, 3 cols */}
          <div className="lg:col-span-3">
            <article
              key={active.slug}
              className="border border-white/10 bg-charcoal/60 backdrop-blur-sm p-8 sm:p-10"
              style={{ animation: "light-check-in 380ms ease-out" }}
            >
              {active.popular && (
                <span className="inline-flex items-center text-ember text-[11px] font-semibold tracking-[0.2em] uppercase border border-ember/40 px-2.5 py-0.5 mb-5">
                  Most booked
                </span>
              )}
              <h3 className="font-display text-display-md text-projector tracking-wider leading-none mb-3">
                {active.name}
              </h3>
              <p className="text-ember text-sm font-semibold mb-1">Custom quote per event</p>
              <p
                className="text-steel text-xs mb-6"
                title="Every event is quoted custom because travel distance, date, and add-ons all shift the number."
              >
                Why no fixed price?
              </p>

              <p className="text-caption text-steel mb-3">In the box</p>
              <ul className="space-y-2 mb-6">
                {active.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-silver text-sm leading-relaxed">
                    <span className="mt-[0.55em] w-1 h-1 rounded-full bg-ember shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-caption text-steel mb-2">Best for</p>
              <p className="text-silver text-sm mb-8">{active.best}.</p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/packages/${active.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-white/20 text-silver hover:border-ember hover:text-ember transition-colors"
                >
                  See example setup
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  href={`/contact?package=${encodeURIComponent(active.name)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-oxblood text-projector hover:bg-oxblood-deep transition-colors"
                >
                  Request a Quote
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
