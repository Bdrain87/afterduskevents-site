"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

/**
 * Sticky availability dock. appears after the visitor scrolls past the
 * hero. Mobile bottom pill / desktop floating top-right. One date input +
 * "Check availability" button that deep-links to /contact with the date
 * pre-filled.
 *
 * Hides on /contact and /thanks so it doesn't double up with the form
 * itself.
 */
export default function AvailabilityDock() {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    function onScroll() {
      const threshold = window.innerHeight * 0.6;
      setVisible(window.scrollY > threshold);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact" || pathname === "/thanks") return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return;
    if ("vibrate" in navigator) navigator.vibrate([8]);
    router.push(`/contact?eventDate=${encodeURIComponent(date)}`);
  }

  return (
    <div
      aria-hidden={!visible}
      className={[
        "fixed z-40 transition-all duration-500",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none",
        // Mobile: bottom-left (leaves room for StickyCTA bottom-right)
        "left-3 bottom-3 right-3 sm:right-auto sm:max-w-sm",
        // Desktop: top-right, below nav
        "md:left-auto md:right-4 md:top-20 md:bottom-auto md:max-w-md",
      ].join(" ")}
    >
      <form
        onSubmit={submit}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-charcoal/95 backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.5)] px-3 py-2"
      >
        <Calendar size={14} className="text-ember shrink-0 ml-1" aria-hidden="true" />
        <label className="sr-only" htmlFor="dock-date">
          Event date
        </label>
        <input
          id="dock-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-transparent text-projector text-sm outline-none flex-1 min-w-0"
          min={new Date().toISOString().slice(0, 10)}
          required
        />
        <button
          type="submit"
          disabled={!date}
          className="shrink-0 rounded-full bg-oxblood text-projector hover:bg-oxblood-deep disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold uppercase tracking-wider px-3.5 py-2 transition-colors"
        >
          Check availability
        </button>
      </form>
    </div>
  );
}
