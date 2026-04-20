"use client";

import { useRef, useState, useEffect, useCallback } from "react";

function measureTextWidth(text: string, fontFamily: string, fontSizePx: number): number {
  if (typeof document === "undefined") return 0;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = `${fontSizePx}px ${fontFamily}`;
  return ctx.measureText(text).width;
}

export function useFitText(text: string, fontFamily = "Bebas Neue, cursive") {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(120);

  const calculate = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    if (containerWidth === 0) return;
    const basePx = 200;
    const measured = measureTextWidth(text, fontFamily, basePx);
    if (measured === 0) return;
    const scale = containerWidth / measured;
    setFontSize(Math.floor(basePx * scale));
  }, [text, fontFamily]);

  useEffect(() => {
    calculate();
    const observer = new ResizeObserver(calculate);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [calculate]);

  return { containerRef, fontSize };
}
