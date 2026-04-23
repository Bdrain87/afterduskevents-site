"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/packages", label: "Setup" },
  { href: "/add-ons", label: "Add-Ons" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper border-b-2 border-bulb">
      {/* Bulb strip — full-width row of amber dots top and bottom */}
      <div
        aria-hidden="true"
        style={{
          height: 6,
          backgroundImage:
            "radial-gradient(circle, #E8B84C 2.5px, transparent 3px)",
          backgroundSize: "14px 6px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between h-14 gap-6">
          <Link
            href="/"
            className="font-display tracking-wide text-xl sm:text-2xl leading-none uppercase"
            aria-label="After Dusk Events, home"
          >
            After&nbsp;Dusk&nbsp;Events
          </Link>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1"
          >
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`serial px-3 py-2 transition-colors ${
                    active ? "text-bulb" : "text-paper hover:text-bulb"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="serial ml-2 px-4 py-2 text-ink bg-bulb hover:bg-paper transition-colors"
            >
              Get a Quote
            </Link>
          </nav>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden serial py-2 px-3 border-2 border-bulb text-bulb"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="primary-mobile-menu"
          className="md:hidden bg-ink text-paper border-t-2 border-bulb px-6 py-6"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl uppercase py-3 border-b border-perf/30"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-5 bulb-button text-center"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
