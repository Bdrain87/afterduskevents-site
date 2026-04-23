"use client";

import { useEffect } from "react";
import { useTimeOfDay } from "@/hooks/use-time-of-day";

/**
 * Sets a `data-tod` attribute on <html> keyed to time-of-day (day / golden /
 * dusk / night). CSS targets `[data-tod="..."]` to shift the atmosphere
 * palette. grain opacity, vignette intensity, star brightness. Pure client
 * hydration; SSR renders without the attribute.
 */
export default function TimeOfDayProvider() {
  const tod = useTimeOfDay();
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-tod", tod);
    return () => {
      root.removeAttribute("data-tod");
    };
  }, [tod]);
  return null;
}
