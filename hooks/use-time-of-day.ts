"use client";

import { useEffect, useState } from "react";
import SunCalc from "suncalc";

export type TimeOfDay = "day" | "golden" | "dusk" | "night";

/** Canton, MI. used as a fallback when geolocation is unavailable. */
const FALLBACK_LAT = 42.3086;
const FALLBACK_LNG = -83.482;

/**
 * Resolves the current time-of-day bucket for the visitor's local sunset.
 * SunCalc is pure math. no network request. SSR-safe: returns "night" as
 * the initial server value then hydrates to the real bucket on the client.
 */
export function useTimeOfDay(): TimeOfDay {
  const [bucket, setBucket] = useState<TimeOfDay>("night");

  useEffect(() => {
    function compute(lat: number, lng: number) {
      const now = new Date();
      const times = SunCalc.getTimes(now, lat, lng);
      const t = now.getTime();
      const sunrise = times.sunrise.getTime();
      const goldenHourStart = times.goldenHour.getTime(); // evening golden hour begins
      const sunset = times.sunset.getTime();
      const dusk = times.dusk.getTime();

      if (t < sunrise) return setBucket("night");
      if (t >= sunrise && t < goldenHourStart) return setBucket("day");
      if (t >= goldenHourStart && t < sunset) return setBucket("golden");
      if (t >= sunset && t < dusk) return setBucket("dusk");
      return setBucket("night");
    }

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      compute(FALLBACK_LAT, FALLBACK_LNG);
      return;
    }

    // Try once with a short timeout; on denial or failure, use Canton fallback.
    navigator.geolocation.getCurrentPosition(
      (pos) => compute(pos.coords.latitude, pos.coords.longitude),
      () => compute(FALLBACK_LAT, FALLBACK_LNG),
      { timeout: 1500, maximumAge: 15 * 60 * 1000 },
    );
  }, []);

  return bucket;
}
