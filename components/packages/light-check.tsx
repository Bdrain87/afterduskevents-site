"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { audioTiers } from "@/lib/packages";

type TierSlug = (typeof audioTiers)[number]["slug"];

const shortLabel: Record<TierSlug, string> = {
  "single-speaker": "Single",
  "two-speakers": "Two",
  "two-speakers-sub": "Two + Sub",
};

const coverageRows: Record<TierSlug, number[]> = {
  "single-speaker": [4, 5, 6],
  "two-speakers": [5, 7, 9, 7],
  "two-speakers-sub": [6, 8, 10, 8, 6],
};

const diagramCopy: Record<TierSlug, { kicker: string; body: string }> = {
  "single-speaker": {
    kicker: "Compact yard",
    body: "One clean speaker for smaller groups near the screen.",
  },
  "two-speakers": {
    kicker: "Balanced coverage",
    body: "Left and right speakers spread the room without pushing volume.",
  },
  "two-speakers-sub": {
    kicker: "Full low end",
    body: "Stereo coverage plus sub support for fights, sports, and bigger crowds.",
  },
};

function CoverageDot({ active, delay }: { active: boolean; delay: number }) {
  return (
    <span
      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
        active ? "bg-ember shadow-[0_0_14px_rgba(221,84,84,0.5)]" : "bg-white/10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    />
  );
}

function SpeakerBlock({ label, active = true }: { label: string; active?: boolean }) {
  return (
    <span
      className={`flex h-11 w-14 items-center justify-center border text-[10px] font-semibold tracking-[0.18em] uppercase ${
        active
          ? "border-ember/50 bg-oxblood/30 text-projector shadow-[0_0_28px_rgba(221,84,84,0.12)]"
          : "border-white/10 bg-screening text-steel"
      }`}
    >
      {label}
    </span>
  );
}

function CoverageDiagram({ slug }: { slug: TierSlug }) {
  const rows = coverageRows[slug];
  const copy = diagramCopy[slug];
  const hasTwoSpeakers = slug !== "single-speaker";
  const hasSub = slug === "two-speakers-sub";

  return (
    <div className="relative overflow-hidden border border-white/10 bg-charcoal/50 p-6 sm:p-7 min-h-[390px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, rgba(245,241,236,0.08) 0%, transparent 34%), radial-gradient(ellipse at 50% 95%, rgba(107,31,31,0.24) 0%, transparent 58%)",
        }}
      />

      <div className="relative">
        <div className="mx-auto mb-2 h-2 w-[78%] bg-projector/80 shadow-[0_0_26px_rgba(245,241,236,0.22)]" />
        <p className="mb-10 text-center text-[10px] tracking-[0.22em] uppercase text-steel">
          30 ft screen
        </p>

        <div className="flex min-h-[138px] flex-col items-center justify-center gap-4">
          {rows.map((count, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-3">
              {Array.from({ length: count }).map((_, dotIndex) => (
                <CoverageDot
                  key={dotIndex}
                  active
                  delay={(rowIndex * count + dotIndex) * 12}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-9 flex items-end justify-center gap-5 sm:gap-7">
          {hasTwoSpeakers ? <SpeakerBlock label="L" /> : <SpeakerBlock label="L" active={false} />}
          <SpeakerBlock label={hasSub ? "Sub" : slug === "single-speaker" ? "Spk" : "AV"} active />
          {hasTwoSpeakers ? <SpeakerBlock label="R" /> : <SpeakerBlock label="R" active={false} />}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="font-display text-heading-md tracking-wider text-projector">
            {copy.kicker}
          </p>
          <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-silver">
            {copy.body}
          </p>
        </div>
      </div>
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
            <CoverageDiagram slug={activeSlug} />

            <div className="mt-4 grid grid-cols-3 gap-2">
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
                    className={`group border px-3 py-3 text-left transition-colors ${
                      isActive
                        ? "border-ember/60 bg-oxblood/25"
                        : "border-white/10 bg-screening/55 hover:border-white/25"
                    }`}
                  >
                    <span
                      className={`block font-display text-base tracking-wider transition-colors ${
                        isActive ? "text-ember" : "text-steel group-hover:text-silver"
                      }`}
                    >
                      {shortLabel[tier.slug]}
                    </span>
                    <span
                      className={`mt-2 block h-[2px] w-full transition-colors ${
                        isActive ? "bg-ember" : "bg-white/10"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
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
