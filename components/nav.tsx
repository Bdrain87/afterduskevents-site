"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandWordmark from "./brand-wordmark";
import LogoMark from "./logo-mark";
import LiveDuskClock from "./live-dusk-clock";

const links = [
  { href: "/packages", label: "Packages" },
  { href: "/add-ons", label: "Add-ons" },
  { href: "/serving", label: "Service Area" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-200 ${
          scrolled
            ? "border-white/12 bg-screening/80 backdrop-blur-xl"
            : "border-white/8 bg-screening/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="brand-lockup group flex items-center gap-2.5 shrink-0 min-w-0"
              aria-label="After Dusk Events home"
            >
              <LogoMark size={32} className="brand-logo-mark shrink-0" />
              <BrandWordmark className="text-base md:text-xl" />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-projector group ${
                    pathname.startsWith(link.href) ? "text-projector" : "text-silver"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-ember rounded-full transition-transform duration-200 origin-left ${
                      pathname.startsWith(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-3 inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold text-projector bg-oxblood hover:bg-oxblood-deep hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(107,31,31,0.4)] transition-all duration-200 min-h-[40px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood"
              >
                Request a Quote
              </Link>
            </nav>

            <button
              className="lg:hidden text-projector p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`lg:hidden fixed inset-0 z-[100] flex flex-col bg-screening transition-[opacity,transform] duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(120% 60% at 50% 0%, rgba(107,31,31,0.18) 0%, rgba(10,10,10,0) 60%)",
          }}
        />

        <div className="relative h-16 border-b border-white/8 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="brand-lockup group flex items-center gap-2.5 shrink-0 min-w-0"
            aria-label="After Dusk Events home"
          >
            <LogoMark size={32} className="brand-logo-mark shrink-0" />
            <BrandWordmark className="text-base" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-projector p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood"
          >
            <X size={22} />
          </button>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-oxblood/60 to-transparent"
        />

        <nav
          className="relative flex-1 overflow-y-auto flex flex-col px-6 pt-8 pb-6"
          aria-label="Mobile navigation"
        >
          <span className="text-steel text-[0.7rem] tracking-[0.25em] uppercase mb-5">
            Navigate
          </span>
          {links.map((link, i) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline gap-4 py-5 border-b border-white/8 transition-colors ${
                  active ? "text-projector" : "text-silver hover:text-projector"
                }`}
              >
                <span
                  className={`font-mono text-xs transition-colors ${
                    active ? "text-ember" : "text-steel group-hover:text-ember"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl tracking-wider flex-1">
                  {link.label}
                </span>
                {active && (
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex items-center justify-center rounded-lg px-6 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors min-h-[56px] shadow-[0_12px_28px_rgba(107,31,31,0.4)]"
          >
            Request a Quote
          </Link>
        </nav>

        <div className="relative px-6 pb-8 pt-5 border-t border-white/8 shrink-0">
          <LiveDuskClock />
          <p className="mt-5 text-steel text-xs tracking-[0.15em] uppercase">
            Private events only · 40 miles of Canton, MI
          </p>
        </div>
      </div>
    </>
  );
}
