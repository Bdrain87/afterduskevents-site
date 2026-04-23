"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { suggestPackage } from "@/lib/packages";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BallparkTool() {
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const result = useMemo(() => {
    if (!eventType) return null;
    return suggestPackage(eventType, guestCount || undefined);
  }, [eventType, guestCount]);

  const inputClass =
    "w-full rounded-lg bg-screening border border-white/15 text-projector placeholder-steel px-3 py-2.5 text-sm focus:outline-none focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors";

  return (
    <div className="rounded-2xl border border-white/10 bg-charcoal p-6 sm:p-8 shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={16} className="text-ember" aria-hidden="true" />
        <h3 className="font-heading text-lg text-projector">Quick ballpark</h3>
      </div>
      <p className="text-steel text-xs mb-5 leading-relaxed">
        Two questions, instant range. Final quote depends on date, distance, and add-ons.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ballpark-event" className="block text-xs uppercase tracking-wider text-steel mb-1.5">
            Event type
          </label>
          <select
            id="ballpark-event"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Pick one</option>
            <option value="Movie Night">Movie Night</option>
            <option value="Sports Watch Party">Sports Watch Party</option>
            <option value="Gaming Night">Gaming Night</option>
            <option value="Karaoke Night">Karaoke Night</option>
            <option value="Birthday or Graduation">Birthday or Graduation</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate or Community Org">Corporate or Community Org</option>
            <option value="HOA or Neighborhood">HOA or Neighborhood</option>
            <option value="Other Private Event">Other Private Event</option>
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
          <div className="rounded-lg border border-oxblood/40 bg-screening p-5">
            <p className="text-xs uppercase tracking-wider text-ember font-semibold mb-1">
              Suggested setup
            </p>
            <p className="font-heading text-projector text-lg mb-2">{result.name}</p>
            <p className="text-steel text-sm leading-relaxed">
              Most events like yours fall between{" "}
              <span className="text-projector font-semibold">
                ${result.range.min.toLocaleString()}
              </span>
              {" and "}
              <span className="text-projector font-semibold">
                ${result.range.max.toLocaleString()}
              </span>
              .
            </p>
            <Link
              href={`/contact?package=${encodeURIComponent(result.name)}`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold bg-oxblood text-projector hover:bg-oxblood-deep transition-colors"
            >
              Get a real quote
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <p className="text-steel text-sm italic">Pick an event type to see a range.</p>
        )}
      </div>
    </div>
  );
}
