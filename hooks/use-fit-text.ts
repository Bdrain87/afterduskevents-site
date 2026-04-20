"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useFitText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef   = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(0);

  const calculate = useCallback(() => {
    const container = containerRef.current;
    const measure   = measureRef.current;
    if (!container || !measure) return;

    const containerWidth = container.offsetWidth;
    if (containerWidth === 0) return;

    // Measure at 100px using the real DOM (actual loaded font)
    measure.style.fontSize = "100px";
    const textWidth = measure.offsetWidth;
    if (textWidth === 0) return;

    // Scale proportionally, subtract 2px so it never exceeds container
    setFontSize(Math.floor((containerWidth / textWidth) * 100) - 2);
  }, []);

  useEffect(() => {
    calculate();
    document.fonts.ready.then(calculate);
    const ro = new ResizeObserver(calculate);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [calculate]);

  return { containerRef, measureRef, fontSize };
}
