"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting particles atmospheric layer.
 * Pattern adapted from Magic UI Particles (https://magicui.design/docs/components/particles).
 * Canvas-based, ~60fps, GPU-accelerated. Honors prefers-reduced-motion.
 */
type Props = {
  className?: string;
  quantity?: number;
  color?: string;
  /** Particle drift speed multiplier */
  vy?: number;
  size?: number;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vy: number;
  vx: number;
};

export default function Particles({
  className = "",
  quantity = 50,
  color = "#FAFAFA",
  vy = 0.15,
  size = 1.2,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      const { width, height } = canvas.getBoundingClientRect();
      particles.current = Array.from({ length: quantity }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * size + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        vy: (Math.random() * 0.4 + 0.1) * vy * -1,
        vx: (Math.random() - 0.5) * 0.05,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const p of particles.current) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) animationId.current = requestAnimationFrame(draw);
    };

    resize();
    init();
    if (reduce) {
      // Render one static frame
      draw();
    } else {
      draw();
    }

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationId.current !== null) cancelAnimationFrame(animationId.current);
    };
  }, [color, quantity, size, vy]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
