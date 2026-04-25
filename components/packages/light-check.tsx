"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { audioTiers } from "@/lib/packages";

type TierSlug = (typeof audioTiers)[number]["slug"];

const shortLabel: Record<TierSlug, string> = {
  "single-speaker": "Single",
  "two-speakers": "Two",
  "two-speakers-sub": "Two + Sub",
  "four-speakers-two-subs": "Four + 2",
};

const coverageRows: Record<TierSlug, number[]> = {
  "single-speaker": [4, 5, 6],
  "two-speakers": [5, 7, 9, 7],
  "two-speakers-sub": [6, 8, 10, 8, 6],
  "four-speakers-two-subs": [6, 8, 10, 12, 10, 8],
};

const diagramCopy: Record<TierSlug, { kicker: string; body: string }> = {
  "single-speaker": {
    kicker: "Compact yard",
    body: "One main speaker starts up front and aims back at the seating area.",
  },
  "two-speakers": {
    kicker: "Balanced coverage",
    body: "Left and right mains flank the screen and aim into the audience.",
  },
  "two-speakers-sub": {
    kicker: "Stronger bass",
    body: "Mains stay up front, with sub support placed near the front of the setup.",
  },
  "four-speakers-two-subs": {
    kicker: "Maximum coverage",
    body: "Front mains carry the show; extra speakers become delay-aligned side fills when the yard needs reach.",
  },
};

const placements: Record<TierSlug, { label: string; top: string; left: string; tone?: "main" | "sub" | "fill" }[]> = {
  "single-speaker": [
    { label: "MAIN", top: "18%", left: "50%" },
  ],
  "two-speakers": [
    { label: "L", top: "18%", left: "24%" },
    { label: "R", top: "18%", left: "76%" },
  ],
  "two-speakers-sub": [
    { label: "L", top: "18%", left: "22%" },
    { label: "SUB", top: "29%", left: "50%", tone: "sub" },
    { label: "R", top: "18%", left: "78%" },
  ],
  "four-speakers-two-subs": [
    { label: "L", top: "17%", left: "20%" },
    { label: "R", top: "17%", left: "80%" },
    { label: "SUB", top: "30%", left: "42%", tone: "sub" },
    { label: "SUB", top: "30%", left: "58%", tone: "sub" },
    { label: "FILL L", top: "64%", left: "15%", tone: "fill" },
    { label: "FILL R", top: "64%", left: "85%", tone: "fill" },
  ],
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

function SpeakerBlock({
  label,
  active = true,
  tone = "main",
}: {
  label: string;
  active?: boolean;
  tone?: "main" | "sub" | "fill";
}) {
  const activeClass =
    tone === "sub"
      ? "border-ember/55 bg-oxblood/40 text-projector shadow-[0_0_30px_rgba(221,84,84,0.16)]"
      : tone === "fill"
        ? "border-ember/35 bg-oxblood/20 text-silver shadow-[0_0_22px_rgba(221,84,84,0.08)]"
        : "border-ember/50 bg-oxblood/30 text-projector shadow-[0_0_28px_rgba(221,84,84,0.12)]";

  return (
    <span
      className={`flex h-10 w-14 items-center justify-center rounded-lg border text-center text-[9px] font-semibold leading-none tracking-[0.14em] uppercase sm:h-11 sm:w-16 sm:text-[10px] ${
        active ? activeClass : "border-white/10 bg-screening text-steel"
      }`}
    >
      {label}
    </span>
  );
}

function CoverageDiagram({ slug }: { slug: TierSlug }) {
  const rows = coverageRows[slug];
  const copy = diagramCopy[slug];
  const speakerPlacements = placements[slug];

  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-lg border border-white/10 bg-charcoal/50 p-6 sm:p-7">
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
        <p className="mb-4 text-center text-[10px] tracking-[0.22em] uppercase text-steel">
          30 ft screen
        </p>

        <div className="relative min-h-[238px]">
          <p className="absolute left-1/2 top-0 -translate-x-1/2 text-[9px] uppercase tracking-[0.18em] text-steel/80">
            front mains
          </p>
          {speakerPlacements.map((speaker, i) => (
            <span
              key={`${speaker.label}-${i}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: speaker.top, left: speaker.left }}
            >
              <SpeakerBlock label={speaker.label} tone={speaker.tone} />
            </span>
          ))}
          <div className="absolute inset-x-0 top-[43%] flex flex-col items-center justify-center gap-4">
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
        </div>

        <div className="mt-5 border-t border-white/10 pt-5">
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
          <p className="text-caption text-ember mb-3">Sound chooser</p>
          <h2
            id="light-check-heading"
            className="font-display text-projector text-display-lg tracking-wider leading-none"
          >
            PICK YOUR SOUND.
          </h2>
          <p className="text-silver text-body-lg leading-relaxed mt-5 max-w-[50ch]">
            Same 4K projector and 30-foot screen, four levels of coverage. Tap a tier to see what changes in the yard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Meter + selector, 2 cols */}
          <div className="lg:col-span-2">
            <CoverageDiagram slug={activeSlug} />

            <div className="mt-4 grid grid-cols-2 gap-2">
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
                    className={`group rounded-lg border px-3 py-3 text-left transition-colors ${
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
              className="rounded-lg border border-white/10 bg-charcoal/60 p-8 backdrop-blur-sm sm:p-10"
              style={{ animation: "light-check-in 380ms ease-out" }}
            >
              {active.popular && (
                <span className="mb-5 inline-flex items-center rounded-full border border-ember/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ember">
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

              <p className="text-silver text-body leading-relaxed mb-5">
                {active.plainBenefit}
              </p>
              <p className="text-steel text-sm leading-relaxed mb-6">
                {active.coverageNote}
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

              <p className="text-caption text-steel mb-2">Sound profile</p>
              <p className="text-silver text-sm mb-6">{active.soundProfile}</p>

              <p className="text-caption text-steel mb-3">Best for</p>
              <div className="mb-8 flex flex-wrap gap-2">
                {active.recommendedFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-silver"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/packages/${active.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-silver transition-colors hover:border-ember hover:text-ember"
                >
                  See example setup
                </Link>
                <Link
                  href={`/contact?package=${encodeURIComponent(active.name)}`}
                  className="inline-flex min-h-[44px] items-center rounded-lg bg-oxblood px-5 py-3 text-sm font-semibold text-projector transition-colors hover:bg-oxblood-deep"
                >
                  Request a Quote
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
