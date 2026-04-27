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
  /** Show occasional shooting stars. */
  shootingStars?: boolean;
  /** Mean ms between shooting-star spawns. Actual jitter is 0.55x..1.45x. */
  meteorMeanIntervalMs?: number;
  className?: string;
};

/** Envelope flavor picked per-flare so adjacent twinkles look distinct.
 *  0 = quick blink (snappy triangle, ~120-260ms)
 *  1 = standard scintillation (sharp rise + gentle decay, ~300-650ms)
 *  2 = slow swell (smooth sine, ~800-1500ms) */
type EnvelopeKind = 0 | 1 | 2;

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  vy: number;
  twinkles: boolean;
  doubleFlare: boolean;
  flareStart: number;
  flareDur: number;
  flarePeak: number;
  flareSizeBoost: number;
  flareKind: EnvelopeKind;
  nextFlareAt: number;
  secondFlareAt: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  ttl: number;
};

const MAX_METEORS = 2;

/**
 * Canvas night sky. Most stars sit steady; ~15% scintillate in brief,
 * irregular bursts (real stars don't breathe in unison). Optional shooting
 * stars trail across at random intervals. Single canvas, single RAF, no deps.
 * Respects prefers-reduced-motion (renders one static frame).
 */
export default function Starfield({
  quantity = 140,
  maxSize = 1.6,
  color = "#FAFAFA",
  vy = 0.02,
  shootingStars = true,
  meteorMeanIntervalMs = 15000,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reducedMQ.matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let nextMeteorAt = 0;
    let lastT = 0;

    function scheduleNextMeteor(now: number) {
      const jitter = 0.55 + Math.random() * 0.9;
      nextMeteorAt = now + meteorMeanIntervalMs * jitter;
    }

    function seed(now: number) {
      stars = Array.from({ length: quantity }, () => {
        const sizeBias = Math.pow(Math.random(), 2.5);
        const r = Math.max(0.3, sizeBias * maxSize);
        const baseAlpha = 0.25 + Math.random() * 0.75;
        // ~45% of stars scintillate. With three envelope flavors picked at
        // each flare, the result reads as a busy random sky — quick blinks
        // mixed with slow swells, never in unison.
        const twinkles = Math.random() < 0.45;
        const doubleFlare = twinkles && Math.random() < 0.22;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          baseAlpha,
          vy: vy * (0.5 + Math.random() * 0.8),
          twinkles,
          doubleFlare,
          flareStart: -Infinity,
          flareDur: 0,
          flarePeak: 0,
          flareSizeBoost: 0,
          flareKind: 1,
          // Very wide entry-jitter so first flares spread across the full
          // first 6 seconds instead of bunching into an opening wave.
          nextFlareAt: now + 200 + Math.random() * 5800,
          secondFlareAt: -Infinity,
        };
      });
      meteors = [];
      scheduleNextMeteor(now);
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed(performance.now());
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

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
        return [
          parseInt(v.slice(0, 2), 16),
          parseInt(v.slice(2, 4), 16),
          parseInt(v.slice(4, 6), 16),
        ];
      }
      return [250, 250, 250];
    }
    const [cr, cg, cb] = parseRGB(color);

    /** Three envelope shapes picked at random per flare so the sky never
     *  looks like every star uses the same blink curve. Quick blinks read
     *  as scintillation; slow swells read as a star "burning up" briefly. */
    function flareEnvelope(elapsed: number, dur: number, kind: EnvelopeKind): number {
      if (elapsed <= 0 || elapsed >= dur) return 0;
      const t = elapsed / dur;
      if (kind === 0) {
        // Quick triangle, peak at 40%
        if (t < 0.4) return t / 0.4;
        return 1 - (t - 0.4) / 0.6;
      }
      if (kind === 2) {
        // Smooth sine swell — gentle rise, peak at 50%, gentle fall
        return Math.sin(t * Math.PI);
      }
      // Standard: sharp 30% rise, gentle 70% decay (same as old shape)
      if (t < 0.3) return t / 0.3;
      return 1 - (t - 0.3) / 0.7;
    }

    function startFlare(s: Star, t: number) {
      s.flareStart = t;
      // Pick a random envelope flavor with weighted distribution: most
      // flares are standard, ~25% are quick blinks, ~15% are slow swells.
      const pick = Math.random();
      if (pick < 0.25) {
        s.flareKind = 0;
        s.flareDur = 120 + Math.random() * 140;
        s.flarePeak = 0.55 + Math.random() * 0.45;
        s.flareSizeBoost = 0.4 + Math.random() * 0.4;
      } else if (pick < 0.85) {
        s.flareKind = 1;
        s.flareDur = 300 + Math.random() * 350;
        s.flarePeak = 0.45 + Math.random() * 0.5;
        s.flareSizeBoost = 0.3 + Math.random() * 0.45;
      } else {
        s.flareKind = 2;
        s.flareDur = 800 + Math.random() * 700;
        s.flarePeak = 0.32 + Math.random() * 0.4;
        s.flareSizeBoost = 0.5 + Math.random() * 0.6;
      }
      // Tighter spacing — 0.8 to 5.8s gap. With 45% of stars active, this
      // keeps the sky visibly busy without strobing.
      s.nextFlareAt = t + s.flareDur + 800 + Math.random() * 5000;
      if (s.doubleFlare) {
        s.secondFlareAt = t + s.flareDur + 50 + Math.random() * 200;
      }
    }

    function ageEnvelope(life: number, ttl: number): number {
      const inAt = 120;
      const rampIn = Math.min(life / inAt, 1);
      const rampOut = Math.max(0, (ttl - life) / 200);
      return Math.max(0, Math.min(rampIn, 1, rampOut));
    }

    function spawnMeteor() {
      const fromTop = Math.random() < 0.7;
      const speed = 7 + Math.random() * 3;
      let x: number, y: number, vx: number, vy: number;
      if (fromTop) {
        x = width * (0.05 + Math.random() * 0.9);
        y = -10;
        const angleDeg = 15 + Math.random() * 20;
        const dirX = Math.random() < 0.5 ? -1 : 1;
        const a = (angleDeg * Math.PI) / 180;
        vx = speed * Math.cos(a) * dirX;
        vy = speed * Math.sin(a);
      } else {
        x = width + 10;
        y = height * (0.05 + Math.random() * 0.4);
        const angleDeg = 20 + Math.random() * 20;
        const a = (angleDeg * Math.PI) / 180;
        vx = -speed * Math.cos(a);
        vy = speed * Math.sin(a);
      }
      meteors.push({
        x,
        y,
        vx,
        vy,
        length: 90 + Math.random() * 70,
        life: 0,
        ttl: 650 + Math.random() * 350,
      });
    }

    function drawStars(t: number) {
      for (const s of stars) {
        let alpha = s.baseAlpha;
        let r = s.r;
        let envelope = 0;
        if (!reduced && s.twinkles) {
          if (s.secondFlareAt > 0 && t >= s.secondFlareAt) {
            // Second flash within a double — give it its own random
            // envelope so it doesn't mirror the first.
            const pick = Math.random();
            s.flareStart = t;
            s.flareKind = pick < 0.5 ? 0 : 1;
            s.flareDur = s.flareKind === 0 ? 100 + Math.random() * 140 : 200 + Math.random() * 220;
            s.flarePeak = 0.4 + Math.random() * 0.4;
            s.flareSizeBoost = 0.3 + Math.random() * 0.4;
            s.secondFlareAt = -Infinity;
          } else if (
            t >= s.nextFlareAt &&
            t > s.flareStart + s.flareDur
          ) {
            startFlare(s, t);
          }
          if (t >= s.flareStart && t <= s.flareStart + s.flareDur) {
            envelope = flareEnvelope(t - s.flareStart, s.flareDur, s.flareKind);
            alpha = Math.max(0, Math.min(1, s.baseAlpha + envelope * s.flarePeak));
            // Pulse the radius with the envelope. This is the part that
            // actually reads as "twinkle" — a star that grows then shrinks
            // looks alive in a way that pure alpha modulation does not.
            r = s.r * (1 + envelope * s.flareSizeBoost);
          }
        }
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx!.fill();
        // Halo for the brighter / actively-flaring stars. The flare check
        // means even small stars get a momentary halo at peak twinkle.
        if (s.r > maxSize * 0.65 || envelope > 0.35) {
          const haloAlpha = alpha * (0.12 + envelope * 0.18);
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, r * 2.4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${haloAlpha})`;
          ctx!.fill();
        }
      }
    }

    function drawMeteors() {
      for (const m of meteors) {
        const speed = Math.hypot(m.vx, m.vy) || 1;
        const tx = m.x - (m.vx / speed) * m.length;
        const ty = m.y - (m.vy / speed) * m.length;
        const a = ageEnvelope(m.life, m.ttl);
        const grad = ctx!.createLinearGradient(tx, ty, m.x, m.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.6, `rgba(255,255,255,${0.18 * a})`);
        grad.addColorStop(1, `rgba(255,255,255,${0.95 * a})`);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.4;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(m.x, m.y);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.fill();
      }
    }

    function step(t: number) {
      const dt = lastT ? t - lastT : 16;
      lastT = t;

      ctx!.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.y -= s.vy;
        if (s.y < -2) s.y = height + 2;
      }

      drawStars(t);

      if (shootingStars) {
        if (meteors.length < MAX_METEORS && t >= nextMeteorAt) {
          spawnMeteor();
          scheduleNextMeteor(t);
        }
        for (const m of meteors) {
          m.x += m.vx;
          m.y += m.vy;
          m.life += dt;
        }
        meteors = meteors.filter(
          (m) =>
            m.life < m.ttl &&
            m.x > -m.length &&
            m.x < width + m.length &&
            m.y > -m.length &&
            m.y < height + m.length,
        );
        drawMeteors();
      }

      raf = requestAnimationFrame(step);
    }

    function startLoop() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    }
    function stopLoop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    if (reduced) {
      ctx.clearRect(0, 0, width, height);
      drawStars(0);
    } else {
      startLoop();
    }

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        stopLoop();
      } else if (!reduced) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const onReducedChange = () => {
      reduced = reducedMQ.matches;
      if (reduced) {
        stopLoop();
        ctx!.clearRect(0, 0, width, height);
        drawStars(0);
      } else {
        startLoop();
      }
    };
    reducedMQ.addEventListener("change", onReducedChange);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      reducedMQ.removeEventListener("change", onReducedChange);
    };
  }, [quantity, maxSize, color, vy, shootingStars, meteorMeanIntervalMs]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
