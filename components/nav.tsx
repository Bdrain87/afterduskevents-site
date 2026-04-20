"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoMark from "./logo-mark";

const links = [
  { href: "/packages", label: "Packages" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-black/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="After Dusk Events home">
            <LogoMark size={36} />
            <span className="font-display text-2xl tracking-wider text-brand-white leading-none">
              AFTER DUSK EVENTS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-white ${
                  pathname === link.href ? "text-brand-white" : "text-brand-gray"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-brand-white bg-brand-red hover:bg-brand-red/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
            >
              Request a Quote
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brand-white p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-brand-black">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 px-2 text-base font-medium border-b border-white/5 transition-colors hover:text-brand-white ${
                  pathname === link.href ? "text-brand-white" : "text-brand-gray"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-lg px-4 py-3 text-base font-semibold text-brand-white bg-brand-red hover:bg-brand-red/90 transition-colors"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
