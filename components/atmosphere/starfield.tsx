"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** How many stars. 150 reads as "deep sky", 80 reads as "dusk sky". */
  quantity?: number;
  /** Max size in px. Most stars will be much smaller. */
  maxSize?: number;
  /** Base color (will be drawn at varying alpha). Default near-white. */
  color?: string;
  /** Very slow vertical drift in px/frame. 0 = still. */
  vy?: number;
  className?: string;
};

type Star = {
  x: number;
  y: number;
  r: number;         // radius in px
  baseAlpha: number; // 0.15–1
  twinkleAmp: number; // amplitude of alpha wobble (0 for non-twinklers)
  phase: number;     // twinkle phase offset
  vy: number;
};

/**
 * Canvas starfield. varied star sizes, per-star twinkle, slow drift.
 * Built to give the hero a "space at dusk" feel without Three.js.
 * Respects prefers-reduced-motion (renders one static frame).
 */
export default function Starfield({
  quantity = 140,
  maxSize = 1.6,
  color = "#FAFAFA",
  vy = 0.02,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let stars: Star[] = [];

    function seed() {
      stars = Array.from({ length: quantity }, () => {
        // power-bias toward small stars so a few stand out
        const sizeBias = Math.pow(Math.random(), 2.5);
        const r = Math.max(0.3, sizeBias * maxSize);
        const baseAlpha = 0.25 + Math.random() * 0.75;
        // ~30% of stars twinkle meaningfully
        const twinkleAmp = Math.random() < 0.3 ? 0.35 + Math.random() * 0.4 : 0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          baseAlpha,
          twinkleAmp,
          phase: Math.random() * Math.PI * 2,
          vy: vy * (0.5 + Math.random() * 0.8),
        };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Parse color once
    function parseRGB(c: string): [number, number, number] {
      if (c.startsWith("#")) {
        const hex = c.slice(1);
        const v =
          hex.length === 3
            ? hex
                .split("")
                .map((h) => h + h)
                .join("")
            : hex;
        return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
      }
      // default to white
      return [250, 250, 250];
    }
    const [cr, cg, cb] = parseRGB(color);

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);
      for (const s of stars) {
        const alpha = Math.max(
          0,
          Math.min(
            1,
            s.baseAlpha +
              (s.twinkleAmp > 0 ? Math.sin(t / 1100 + s.phase) * s.twinkleAmp : 0),
          ),
        );
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx!.fill();
        // subtle bloom on brighter stars
        if (s.r > maxSize * 0.65) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 2.4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.12})`;
          ctx!.fill();
        }
      }
    }

    function step(t: number) {
      for (const s of stars) {
        s.y -= s.vy;
        if (s.y < -2) s.y = height + 2;
      }
      draw(t);
      raf = requestAnimationFrame(step);
    }

    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [quantity, maxSize, color, vy]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
