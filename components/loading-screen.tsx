"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("ade-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("ade-loaded", "1");
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setExit(true),
      });

      if (line1Ref.current && line2Ref.current) {
        const split1 = new SplitText(line1Ref.current, { type: "chars" });
        const split2 = new SplitText(line2Ref.current, { type: "chars" });

        gsap.set([split1.chars, split2.chars], { y: 80, opacity: 0 });

        tl.to(split1.chars, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.035,
          ease: "power3.out",
          delay: 0.1,
        })
          .to(
            split2.chars,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.028,
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to({}, { duration: 0.35 });
      }

      if (barRef.current) {
        gsap.to(barRef.current, {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.inOut",
          delay: 0.1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [show]);

  useEffect(() => {
    if (!exit) return;
    const timer = setTimeout(() => setShow(false), 750);
    return () => clearTimeout(timer);
  }, [exit]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={containerRef}
          key="loader"
          className="fixed inset-0 z-[200] bg-screening flex flex-col items-center justify-center"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Film grain overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              mixBlendMode: "overlay",
            }}
          />

          <div className="relative select-none text-center overflow-hidden">
            <div
              ref={line1Ref}
              aria-hidden="true"
              className="font-display text-[clamp(3.5rem,10vw,8rem)] text-projector tracking-[0.06em] leading-none overflow-hidden"
            >
              AFTER DUSK
            </div>
            <div
              ref={line2Ref}
              aria-hidden="true"
              className="font-display text-[clamp(3.5rem,10vw,8rem)] text-projector tracking-[0.06em] leading-none overflow-hidden"
            >
              EVENTS
            </div>
            <p className="sr-only">After Dusk Events. Loading.</p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              ref={barRef}
              className="h-full w-full bg-oxblood origin-left rounded-full"
              style={{ transform: "scaleX(0)" }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
