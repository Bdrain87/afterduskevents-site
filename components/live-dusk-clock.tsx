"use client";

import { useEffect, useState } from "react";
import SunCalc from "suncalc";

const CANTON = { lat: 42.3086, lng: -83.482 };

function format12(d: Date): string {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function nextDusk(): { when: "Today" | "Tomorrow"; time: string } | null {
  try {
    const now = new Date();
    const todayTimes = SunCalc.getTimes(now, CANTON.lat, CANTON.lng);
    if (todayTimes.dusk.getTime() > now.getTime()) {
      return { when: "Today", time: format12(todayTimes.dusk) };
    }
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowTimes = SunCalc.getTimes(tomorrow, CANTON.lat, CANTON.lng);
    return { when: "Tomorrow", time: format12(tomorrowTimes.dusk) };
  } catch {
    return null;
  }
}

/**
 * Live dusk clock for the footer. Always shows Canton, MI time (business
 * location); updates on the minute. SSR-safe: renders deterministic
 * placeholders until mounted so hydration doesn't mismatch.
 */
export default function LiveDuskClock() {
  const [now, setNow] = useState<string>("");
  const [dusk, setDusk] = useState<ReturnType<typeof nextDusk>>(null);

  useEffect(() => {
    const tick = () => {
      setNow(format12(new Date()));
      setDusk(nextDusk());
    };
    tick();
    // Align to the next minute boundary, then tick every 60s.
    const ms = 60_000 - (Date.now() % 60_000);
    const timeout = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60_000);
      (timeout as unknown as { interval?: number }).interval = interval as unknown as number;
    }, ms);
    return () => {
      clearTimeout(timeout);
      const ref = timeout as unknown as { interval?: number };
      if (ref.interval) clearInterval(ref.interval);
    };
  }, []);

  return (
    <dl className="text-mono tracking-wider text-steel space-y-1.5 mt-4" aria-live="off">
      <div className="flex items-baseline justify-between gap-4">
        <dt>Right now in Canton, MI</dt>
        <dd className="text-ember font-semibold">{now || "--:--"}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt>Next dusk</dt>
        <dd className="text-silver">
          {dusk ? `${dusk.when}, ${dusk.time}` : "--:--"}
        </dd>
      </div>
    </dl>
  );
}
