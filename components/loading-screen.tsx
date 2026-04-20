"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LogoMark from "./logo-mark";

const TICK = 850;
const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function FilmHoles({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`absolute left-0 right-0 flex justify-between px-3 ${
        position === "top" ? "top-3" : "bottom-3"
      }`}
      aria-hidden="true"
    >
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="rounded-sm bg-white/80"
          style={{ width: 22, height: 14 }}
        />
      ))}
    </div>
  );
}

function CountdownRing({ count, tick }: { count: number; tick: number }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / TICK, 1);
      setOffset(CIRCUMFERENCE * t);
      if (t < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [tick]);

  return (
    <svg
      width={220}
      height={220}
      viewBox="0 0 220 220"
      className="absolute"
      style={{ transform: "rotate(-90deg)" }}
    >
      {/* Background circle */}
      <circle
        cx={110}
        cy={110}
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={3}
      />
      {/* Depleting ring */}
      <circle
        cx={110}
        cy={110}
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth={3}
        strokeLinecap="butt"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        style={{ transition: "none" }}
      />
    </svg>
  );
}

function Crosshairs() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {/* Horizontal */}
      <div className="absolute left-0 right-0 h-px bg-white/25" />
      {/* Vertical */}
      <div className="absolute top-0 bottom-0 w-px bg-white/25" />
      {/* Corner ticks */}
      {[
        "top-[calc(50%-55px)] left-[calc(50%-55px)]",
        "top-[calc(50%-55px)] right-[calc(50%-55px)]",
        "bottom-[calc(50%-55px)] left-[calc(50%-55px)]",
        "bottom-[calc(50%-55px)] right-[calc(50%-55px)]",
      ].map((pos, i) => (
        <div key={i} className={`absolute w-2 h-2 border-white/40 ${pos} ${
          i === 0 ? "border-t border-l" : i === 1 ? "border-t border-r" : i === 2 ? "border-b border-l" : "border-b border-r"
        }`} />
      ))}
    </div>
  );
}

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(3);
  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState<"countdown" | "logo">("countdown");
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ade-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    sessionStorage.setItem("ade-loaded", "1");
    setShow(true);

    // Flicker effect
    const flickerInterval = setInterval(() => {
      setFlicker(Math.random() > 0.9 ? 0.7 : 1);
    }, 120);

    const t1 = setTimeout(() => { setCount(2); setTick(1); }, TICK);
    const t2 = setTimeout(() => { setCount(1); setTick(2); }, TICK * 2);
    const t3 = setTimeout(() => { setPhase("logo"); clearInterval(flickerInterval); setFlicker(1); }, TICK * 3);
    const t4 = setTimeout(() => setShow(false), TICK * 3 + 1400);

    return () => {
      clearInterval(flickerInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ opacity: flicker }}
        >
          {/* Scan lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
            }}
            aria-hidden="true"
          />

          {/* Film strip holes */}
          <FilmHoles position="top" />
          <FilmHoles position="bottom" />

          {/* Side strip bars */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-black/60 border-r border-white/5" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-black/60 border-l border-white/5" aria-hidden="true" />

          <Crosshairs />

          <AnimatePresence mode="wait">
            {phase === "countdown" ? (
              <motion.div
                key={`count-${count}`}
                className="relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <CountdownRing count={count} tick={tick} />

                {/* Outer decorative ring */}
                <div
                  className="absolute rounded-full border border-white/10"
                  style={{ width: 210, height: 210 }}
                  aria-hidden="true"
                />
                {/* Inner ring */}
                <div
                  className="absolute rounded-full border border-white/20"
                  style={{ width: 140, height: 140 }}
                  aria-hidden="true"
                />

                {/* Number */}
                <span
                  className="relative font-display text-[7rem] text-white leading-none tabular-nums"
                  aria-live="polite"
                >
                  {count}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="logo-reveal"
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl bg-brand-red/20 scale-150"
                    aria-hidden="true"
                  />
                  <LogoMark size={72} />
                </div>
                <div className="text-center">
                  <p className="font-display text-4xl tracking-widest text-white leading-none">
                    AFTER DUSK EVENTS
                  </p>
                  <p className="text-brand-gray text-xs tracking-[0.3em] uppercase mt-2">
                    Now loading
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Frame counter strip */}
          <div
            className="absolute bottom-8 text-white/20 font-mono text-xs tracking-widest"
            aria-hidden="true"
          >
            {`ADE-${String(count).padStart(2, "0")} // 24fps // SE-MICHIGAN`}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
