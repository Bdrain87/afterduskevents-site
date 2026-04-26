import Link from "next/link";
import LogoMark from "./logo-mark";
import CopyEmail from "./copy-email";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-charcoal/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          {/* Brand + summary */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoMark size={28} />
              <span className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-projector">
                After Dusk Events
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-silver">
              Outdoor cinema, sound, power, and setup for private events across Southeast Michigan.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-caption text-silver mb-4">Site</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/packages", label: "Packages" },
                { href: "/add-ons", label: "Add-Ons" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/serving", label: "Service area" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-silver hover:text-ember transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-caption text-silver mb-4">Reach us</h3>
            <ul className="space-y-2.5 text-sm text-silver">
              <li>
                <CopyEmail className="hover:text-ember transition-colors" />
              </li>
              <li>Canton, MI 48188</li>
              <li className="text-silver text-xs leading-relaxed pt-2">
                40 miles of Canton. Private events only.
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://instagram.com/afterduskevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="After Dusk Events on Instagram"
                className="text-silver hover:text-ember transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember rounded"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com/afterduskevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="After Dusk Events on Facebook"
                className="text-silver hover:text-ember transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember rounded"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@afterduskevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="After Dusk Events on TikTok"
                className="text-silver hover:text-ember transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember rounded"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.78a8.18 8.18 0 0 0 4.77 1.52V6.86a4.85 4.85 0 0 1-1-.17z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-silver text-xs tracking-wide">
            &copy; {new Date().getFullYear()} After Dusk Events LLC · Private events only · Veteran-owned
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-silver hover:text-projector text-xs transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-silver hover:text-projector text-xs transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
