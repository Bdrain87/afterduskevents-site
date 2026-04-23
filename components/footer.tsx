import Link from "next/link";
import CopyEmail from "./copy-email";
import FilmStrip from "./film-strip";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <FilmStrip tone="paper" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
          {/* Marquee block */}
          <div>
            <p className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none uppercase">
              Big screen.
              <br />
              Bigger nights.
            </p>
            <p className="serial mt-6 text-bulb">
              Private outdoor cinema · Canton, MI · Veteran&nbsp;owned
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="serial text-bulb mb-4">Site</p>
            <ul className="space-y-2 font-mono text-sm">
              {[
                { href: "/packages", label: "Setup" },
                { href: "/add-ons", label: "Add-Ons" },
                { href: "/faq", label: "FAQ" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-bulb transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="serial text-bulb mb-4">Contact</p>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <CopyEmail className="hover:text-bulb transition-colors" />
              </li>
              <li>Canton, MI 48188</li>
              <li>60 mi radius</li>
            </ul>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://instagram.com/afterduskevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="serial hover:text-bulb transition-colors"
              >
                IG
              </a>
              <a
                href="https://facebook.com/afterduskevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="serial hover:text-bulb transition-colors"
              >
                FB
              </a>
              <a
                href="https://tiktok.com/@afterduskevents"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="serial hover:text-bulb transition-colors"
              >
                TT
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-perf/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="serial opacity-80">
            © After Dusk Events LLC — All rights reserved
          </p>
          <p className="serial opacity-60">
            Insured · Private events only
          </p>
        </div>
      </div>
    </footer>
  );
}
