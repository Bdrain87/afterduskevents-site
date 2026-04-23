"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoMark from "./logo-mark";

const links = [
  { href: "/packages", label: "Packages" },
  { href: "/add-ons", label: "Add-Ons" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-screening/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0" aria-label="After Dusk Events home">
            <LogoMark size={32} />
            <span className="font-display text-xl tracking-wider text-projector leading-none hidden md:block whitespace-nowrap">
              AFTER DUSK EVENTS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-projector group ${
                  pathname.startsWith(link.href) ? "text-projector" : "text-steel"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-[2px] bg-oxblood rounded-full transition-transform duration-200 origin-left ${
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
              Get a Quote
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-projector p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — full screen takeover */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-16 z-40 bg-screening flex flex-col"
        >
          <nav className="flex flex-col px-6 py-8 flex-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-5 text-2xl font-display tracking-wider border-b border-white/8 transition-colors hover:text-projector ${
                  pathname.startsWith(link.href) ? "text-ember" : "text-steel"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center rounded-lg px-6 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors min-h-[56px]"
            >
              Get a Quote
            </Link>
          </nav>
          <div className="px-6 pb-8 text-steel text-xs tracking-[0.12em] uppercase">
            Private events only. 60 miles of Canton, MI.
          </div>
        </div>
      )}
    </header>
  );
}
