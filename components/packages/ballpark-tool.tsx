"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCases, suggestTier } from "@/lib/packages";
import { Sparkles } from "lucide-react";

export default function BallparkTool() {
  const [useCaseSlug, setUseCaseSlug] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const result = useMemo(() => {
    if (!useCaseSlug) return null;
    return suggestTier(useCaseSlug, guestCount || undefined);
  }, [useCaseSlug, guestCount]);

  const inputClass =
    "w-full rounded-lg bg-screening border border-white/15 text-projector placeholder-steel px-3 py-2.5 text-sm focus:outline-none focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors";

  return (
    <div className="rounded-lg border border-white/10 bg-charcoal p-6 shadow-[0_24px_48px_rgba(0,0,0,0.4)] sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={16} className="text-ember" aria-hidden="true" />
        <h3 className="font-heading text-lg text-projector">Quick ballpark</h3>
      </div>
      <p className="text-steel text-xs mb-5 leading-relaxed">
        Two questions, one recommended setup. Final quote depends on date, distance, and add-ons.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ballpark-event" className="block text-xs uppercase tracking-wider text-steel mb-1.5">
            Event type
          </label>
          <select
            id="ballpark-event"
            value={useCaseSlug}
            onChange={(e) => setUseCaseSlug(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Pick one</option>
            {useCases.map((uc) => (
              <option key={uc.slug} value={uc.slug}>
                {uc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ballpark-guests" className="block text-xs uppercase tracking-wider text-steel mb-1.5">
            Guest count
          </label>
          <select
            id="ballpark-guests"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Pick one</option>
            <option value="Under 25">Under 25</option>
            <option value="25 to 75">25 to 75</option>
            <option value="75 to 150">75 to 150</option>
            <option value="150+">150+</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        {result ? (
          <div className="rounded-lg border border-white/10 border-l-2 border-l-oxblood bg-screening p-5 pl-6">
            <p className="text-xs uppercase tracking-wider text-ember font-semibold mb-1">
              Recommended setup
            </p>
            <p className="font-heading text-projector text-lg mb-2">{result.name}</p>
            <p className="text-steel text-sm leading-relaxed">
              {result.plainBenefit} {result.coverageNote} Every event is custom-quoted around your date, location, and add-ons.
            </p>
            <Link
              href={`/contact?package=${encodeURIComponent(result.name)}`}
              className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-oxblood px-5 py-2.5 text-sm font-semibold text-projector transition-colors hover:bg-oxblood-deep"
            >
              Get your personalized quote
            </Link>
          </div>
        ) : (
          <p className="text-steel text-sm">Pick an event type to see a recommendation.</p>
        )}
      </div>
    </div>
  );
}
