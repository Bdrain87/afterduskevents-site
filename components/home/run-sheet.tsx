"use client";

import { useEffect, useRef, useState } from "react";
import SunCalc from "suncalc";

const CANTON = { lat: 42.3086, lng: -83.482 };

function formatHHMM(d: Date): string {
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

function useLocalDuskTime(): string {
  const [time, setTime] = useState<string>("20:47");
  useEffect(() => {
    function compute(lat: number, lng: number) {
      try {
        const times = SunCalc.getTimes(new Date(), lat, lng);
        if (times.dusk && !Number.isNaN(times.dusk.getTime())) {
          setTime(formatHHMM(times.dusk));
        }
      } catch {
        // keep fallback
      }
    }
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      compute(CANTON.lat, CANTON.lng);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => compute(pos.coords.latitude, pos.coords.longitude),
      () => compute(CANTON.lat, CANTON.lng),
      { timeout: 1500, maximumAge: 15 * 60 * 1000 },
    );
  }, []);
  return time;
}

const lines = [
  { t: "17:00", body: "UNIT ARRIVES · CANTON DEPOT" },
  { t: "17:12", body: "SURVEY SITE · POWER / LINE / SIGHTLINES" },
  { t: "17:25", body: "SCREEN INFLATE · WATER BALLAST" },
  { t: "17:44", body: "AUDIO RIG · STEREO TEST · SUB TUNE" },
  { t: "18:10", body: "PROJECTOR · GEOMETRY · COLOR PASS" },
  { t: "18:20", body: "SIGNAL CHECK · AUX / STREAMING / CONSOLE" },
  { t: "19:30", body: "GUEST ARRIVALS OK" },
];

/**
 * The Run Sheet. Replaces the numbered "HOW IT WORKS" block. A monospaced
 * checklist that ticks in on scroll. Final line uses the visitor's local
 * dusk time.
 */
export default function RunSheet() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const duskTime = useLocalDuskTime();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const allLines = [...lines, { t: duskTime, body: "DUSK. SHOW UP." }];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="run-sheet-heading"
      className="relative px-6 sm:px-10 lg:px-16"
      style={{ paddingTop: "96px", paddingBottom: "96px", minHeight: "70vh" }}
      data-dim-beam
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Run sheet lines */}
        <div className="lg:col-span-3 lg:order-1 order-2">
          <div className="border border-white/10 bg-charcoal/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-steel">
                run-sheet.log
              </span>
            </div>
            <ul className="font-mono text-[13px] sm:text-sm leading-relaxed divide-y divide-white/5">
              {allLines.map((l, i) => {
                const isFinal = i === allLines.length - 1;
                return (
                  <li
                    key={i}
                    className="run-line flex items-baseline gap-4 px-5 py-3"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(8px)",
                      transition: `opacity 420ms ease-out ${i * 110}ms, transform 420ms ease-out ${i * 110}ms`,
                    }}
                  >
                    <span className={`shrink-0 ${isFinal ? "text-ember" : "text-ember/80"} tracking-[0.05em]`}>
                      {l.t}
                    </span>
                    <span className={`${isFinal ? "text-projector font-semibold" : "text-silver"} tracking-[0.04em]`}>
                      {l.body}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Title + one-line body */}
        <div className="lg:col-span-2 lg:order-2 order-1">
          <p className="text-caption text-ember mb-4">The plan</p>
          <h2
            id="run-sheet-heading"
            className="font-display text-projector text-display-lg tracking-wider mb-6"
          >
            THE RUN SHEET.
          </h2>
          <p className="text-silver text-body-lg leading-relaxed max-w-[40ch]">
            We arrive three hours before your first guest. By the time they get there, the show is
            the only thing left to do.
          </p>
        </div>
      </div>
    </section>
  );
}
