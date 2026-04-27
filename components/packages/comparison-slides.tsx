"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { audioTiers } from "@/lib/packages";
import Waveform from "@/components/packages/waveform";

/**
 * Four tiers rendered as a horizontal slide track on mobile/tablet and a
 * four-column grid on desktop. Replaces the old striped comparison table.
 * Each card shows: waveform (sized to speaker/sub count), recommended-for
 * chips, and a monospace kit list.
 */
export default function ComparisonSlides() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div>
      {/* Mobile + tablet: Embla slide track */}
      <div className="lg:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {audioTiers.map((tier) => (
              <Link
                key={tier.slug}
                href={`/packages/${tier.slug}`}
                aria-label={`See the ${tier.name} setup`}
                className="group flex min-w-[85%] flex-col rounded-lg border border-white/10 bg-screening/70 p-6 transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ember/45 hover:bg-charcoal/70 hover:shadow-[0_18px_44px_rgba(107,31,31,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember/70 sm:min-w-[70%]"
              >
                <TierContent tier={tier} />
              </Link>
            ))}
          </div>
        </div>
        {snaps.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to ${audioTiers[i]?.name ?? `tier ${i + 1}`}`}
                className={`h-px transition-all ${
                  i === selectedIndex
                    ? "w-10 bg-ember"
                    : "w-5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: 4-col grid */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-4">
        {audioTiers.map((tier) => (
          <Link
            key={tier.slug}
            href={`/packages/${tier.slug}`}
            aria-label={`See the ${tier.name} setup`}
            className="group flex flex-col rounded-lg border border-white/10 bg-screening/70 p-6 transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ember/45 hover:bg-charcoal/70 hover:shadow-[0_18px_44px_rgba(107,31,31,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember/70"
          >
            <TierContent tier={tier} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function TierContent({ tier }: { tier: (typeof audioTiers)[number] }) {
  const totalUnits = tier.speakerCount + tier.subwooferCount;
  return (
    <>
      {/* Waveform */}
      <div className="mb-5 h-28 rounded-md border border-white/5 bg-charcoal/40 transition-colors duration-300 group-hover:border-white/15 group-hover:bg-charcoal/60">
        <Waveform
          speakers={tier.speakerCount}
          subs={tier.subwooferCount}
          className="h-full w-full"
        />
      </div>

      {/* Name + badge */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-display text-heading-lg leading-none tracking-wider text-projector">
          {tier.name}
        </h3>
        {tier.popular && (
          <span className="shrink-0 rounded-full border border-ember/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ember">
            Most booked
          </span>
        )}
      </div>

      {/* Spec line */}
      <p className="text-caption text-steel mb-4">
        {totalUnits} {totalUnits === 1 ? "unit" : "units"}
        <span className="mx-2 text-white/20">·</span>
        {tier.speakerCount} speaker{tier.speakerCount === 1 ? "" : "s"}
        {tier.subwooferCount > 0 && (
          <>
            <span className="mx-2 text-white/20">·</span>
            {tier.subwooferCount} sub{tier.subwooferCount === 1 ? "" : "s"}
          </>
        )}
      </p>

      <p className="mb-4 text-sm leading-relaxed text-silver">{tier.plainBenefit}</p>

      {/* Recommended-for chips */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {tier.recommendedFor.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/10 bg-charcoal/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-steel"
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Kit list */}
      <ul className="mt-auto space-y-1.5 border-t border-white/8 pt-4 font-mono text-[11px] leading-relaxed text-silver">
        {tier.includes.map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden="true" className="text-ember">+</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* Ember affordance — grows on hover, mirrors TierCard */}
      <span
        aria-hidden="true"
        className="mt-4 block h-px w-6 bg-ember transition-[width] duration-300 group-hover:w-10"
      />
    </>
  );
}
