import Link from "next/link";
import LogoMark from "./logo-mark";
import CopyEmail from "./copy-email";

export default function Footer() {
  return (
    <footer className="border-t-2 border-oxblood/30 bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <LogoMark size={32} />
              <span className="font-display text-xl tracking-wider text-projector leading-none">
                AFTER DUSK EVENTS
              </span>
            </div>
            <p className="text-ember text-sm italic leading-relaxed font-medium">
              Big screen. Bigger nights.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-projector font-semibold text-xs uppercase tracking-wider mb-3">
              Site
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/packages", label: "Setup" },
                { href: "/add-ons", label: "Add-Ons" },
                { href: "/faq", label: "FAQ" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Use" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-steel hover:text-projector transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-projector font-semibold text-xs uppercase tracking-wider mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-steel">
              <li>
                <CopyEmail className="hover:text-projector transition-colors" />
              </li>
              <li>Canton, MI 48188</li>
              <li>Service area: 60 miles of Canton</li>
            </ul>
            <p className="text-steel text-xs mt-4 leading-relaxed">
              Veteran-Owned Michigan LLC.<br />
              Private events only. Insured.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t-2 border-oxblood/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-steel text-xs text-center sm:text-left">
            &copy; After Dusk Events LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/afterduskevents" target="_blank" rel="noopener noreferrer"
              aria-label="After Dusk Events on Instagram" className="text-steel hover:text-projector transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://facebook.com/afterduskevents" target="_blank" rel="noopener noreferrer"
              aria-label="After Dusk Events on Facebook" className="text-steel hover:text-projector transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://tiktok.com/@afterduskevents" target="_blank" rel="noopener noreferrer"
              aria-label="After Dusk Events on TikTok" className="text-steel hover:text-projector transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.78a8.18 8.18 0 0 0 4.77 1.52V6.86a4.85 4.85 0 0 1-1-.17z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
