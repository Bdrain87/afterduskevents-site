"use client";

import Link from "next/link";
import { useRef } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Card3D } from "@/components/ui/card-3d";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight, Monitor, Volume2, Zap, Wifi, Shield, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const differentiators = [
  {
    num: "01",
    icon: <Monitor size={20} className="text-oxblood" aria-hidden="true" />,
    title: "BYO Content",
    body: "Show your own movie, slideshow, stream, or game feed. No licensing fees. No restrictions on what you screen at your private event.",
  },
  {
    num: "02",
    icon: <Volume2 size={20} className="text-oxblood" aria-hidden="true" />,
    title: "Soundboks Wireless Audio",
    body: "Up to 6 Soundboks speakers across multiple zones. 50-meter wireless range. Ceremony, dance floor, tailgate, all from one rental.",
  },
  {
    num: "03",
    icon: <Zap size={20} className="text-oxblood" aria-hidden="true" />,
    title: "Water Ballast Setup",
    body: "No stakes. No utility locates. Works on golf courses, vineyards, barns, hardscape, private estates. Most venues, zero digging.",
  },
  {
    num: "04",
    icon: <Wifi size={20} className="text-oxblood" aria-hidden="true" />,
    title: "Dual Power and Starlink",
    body: "Honda generator plus EcoFlow silent battery plus Starlink Mini satellite. Zero venue dependency. Zero wifi-is-down moments.",
  },
  {
    num: "05",
    icon: <Shield size={20} className="text-oxblood" aria-hidden="true" />,
    title: "Veteran Owned",
    body: "USAF veteran. Michigan LLC. Fully insured. COI available for any venue. Every event runs off a checklist.",
  },
];

const packages = [
  {
    name: "Community 30 ft",
    tag: "Most popular",
    specs: ["30 ft inflatable screen", "4K laser projector", "4 Soundboks speakers, 2 zones", "DFB MK2 subwoofer", "Coverage up to 250 people"],
    desc: "The anchor package for HOA nights, block parties, and large private events.",
    featured: true,
  },
  {
    name: "Intimate 20 ft",
    specs: ["20 ft inflatable screen", "4K laser projector", "2 Soundboks speakers", "Water ballast, no staking"],
    desc: "Backyards, small gatherings, and family movie nights.",
  },
  {
    name: "Indoor Winter",
    specs: ["120 in Da-Lite fast-fold screen", "4K laser projector", "2 Soundboks speakers"],
    desc: "Year-round, weather-proof. Works in halls, gyms, barns, and large living rooms.",
  },
];

export default function HomePage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heroTitleRef.current) {
      const split = new SplitText(heroTitleRef.current, { type: "chars" });
      gsap.set(split.chars, { y: 80, opacity: 0 });
      tl.to(split.chars, { y: 0, opacity: 1, duration: 0.7, stagger: 0.02, delay: 0.15 });
    }
    if (heroSubRef.current) {
      tl.fromTo(heroSubRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    }
    if (heroMetaRef.current) {
      tl.fromTo(heroMetaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
    }
    if (heroCtaRef.current) {
      tl.fromTo(heroCtaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.25");
    }
  }, []);

  useGSAP(() => {
    if (!timelineRef.current) return;
    const line = timelineRef.current.querySelector(".timeline-line");
    if (line) {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 70%" },
      });
    }
    const steps = timelineRef.current.querySelectorAll(".timeline-step");
    gsap.fromTo(steps, { x: -20, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.55, stagger: 0.15, ease: "power2.out",
      scrollTrigger: { trigger: timelineRef.current, start: "top 65%" },
    });
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "After Dusk Events LLC",
    description: "Veteran-owned portable outdoor cinema and event rental for private events in Southeast Michigan. 30-foot inflatable screen, 4K laser projector, wireless Soundboks audio.",
    url: "https://afterduskevents.com",
    email: "hello@afterduskevents.com",
    address: { "@type": "PostalAddress", addressLocality: "Canton", addressRegion: "MI", postalCode: "48188", addressCountry: "US" },
    areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 42.3084, longitude: -83.4822 }, geoRadius: "96560" },
    image: "https://afterduskevents.com/og-image.png",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <main className="flex-1">

        {/* ─── HERO: typographic, no stock photo ─────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-screening">

          {/* Subtle radial glow suggesting projector beam */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,31,31,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Horizontal scan line texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">

            {/* Eyebrow */}
            <p className="text-steel text-xs tracking-[0.3em] uppercase mb-8">
              Canton, MI — Private outdoor cinema
            </p>

            {/* Hero headline */}
            <h1
              ref={heroTitleRef}
              className="font-display text-[clamp(4rem,12vw,10rem)] tracking-[0.03em] text-projector leading-[0.88] mb-8"
              aria-label="Big screen. Bigger nights."
            >
              BIG SCREEN.<br />BIGGER NIGHTS.
            </h1>

            {/* Subtext */}
            <p
              ref={heroSubRef}
              className="text-steel text-lg sm:text-xl leading-relaxed max-w-[52ch] mb-6"
            >
              We show up to your backyard, venue, or field with a 30-foot inflatable screen,
              4K laser projector, and concert-grade wireless audio. You supply the guest list.
            </p>

            {/* Spec strip */}
            <div ref={heroMetaRef} className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {[
                "30 ft inflatable screen",
                "4K laser projector",
                "Soundboks wireless audio",
                "Starlink included",
                "Generator backup",
                "60-mile radius, Canton MI",
              ].map((s) => (
                <span key={s} className="flex items-center gap-1.5 text-steel text-sm">
                  <CheckCircle size={13} className="text-oxblood shrink-0" aria-hidden="true" />
                  {s}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div ref={heroCtaRef} className="flex flex-col sm:flex-row items-start gap-4">
              <ShimmerButton onClick={() => window.location.href = "/contact"}>
                Get a Quote
              </ShimmerButton>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-steel hover:text-projector text-sm font-medium transition-colors py-4 group"
              >
                See packages
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Bottom oxblood rule */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-oxblood/20" aria-hidden="true" />
        </section>

        {/* ─── WHAT WE BRING ─────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="equipment-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <p className="text-steel text-xs tracking-[0.2em] uppercase mb-3">The equipment</p>
              <h2 id="equipment-heading" className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider text-projector leading-none">
                WHAT WE BRING<br />TO YOUR EVENT
              </h2>
              <span className="oxblood-rule" />
            </div>

            {/* Equipment list — two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  label: "Screen",
                  items: [
                    "30 ft airtight inflatable screen (Community package)",
                    "20 ft airtight inflatable screen (Intimate package)",
                    "120 in Da-Lite fast-fold (Indoor Winter)",
                    "Water ballast setup — no staking, works anywhere",
                  ],
                },
                {
                  label: "Projection",
                  items: [
                    "BenQ LU930 4K laser projector",
                    "7,000 ANSI lumens — visible even at dusk",
                    "HDMI, streaming, Blu-ray, laptop input",
                    "BYO Content — no licensing required for private events",
                  ],
                },
                {
                  label: "Audio",
                  items: [
                    "Soundboks 4 wireless speakers (up to 6)",
                    "Death From Below MK2 subwoofer",
                    "50-meter wireless range",
                    "Multi-zone: viewing zone, dance floor, ceremony zone",
                  ],
                },
                {
                  label: "Power and Connectivity",
                  items: [
                    "Honda generator — venue power not required",
                    "EcoFlow silent battery backup",
                    "Starlink Mini satellite internet — included on every event",
                    "No wifi needed, no extension cords from your house",
                  ],
                },
              ].map((col) => (
                <div key={col.label}>
                  <h3 className="font-heading text-sm text-oxblood uppercase tracking-[0.12em] mb-3">{col.label}</h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-steel text-sm leading-relaxed">
                        <span className="text-oxblood mt-1.5 shrink-0 text-xs">&#9632;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-steel text-xs tracking-[0.15em] uppercase border-t border-white/8 pt-6">
              We show up 3 hours early. We do the setup, the sound check, and the systems test. You show up and watch the movie.
            </p>
          </div>
        </section>

        {/* ─── WHY AFTER DUSK ────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="why-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <p className="text-steel text-xs tracking-[0.2em] uppercase mb-3">Why After Dusk</p>
              <h2 id="why-heading" className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider text-projector leading-none">
                NOT YOUR AVERAGE<br />BACKYARD PROJECTOR
              </h2>
              <span className="oxblood-rule" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden">
              {differentiators.map((d) => (
                <Card3D key={d.num} className="bg-charcoal p-8 group cursor-default">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="font-display text-4xl text-oxblood/30 leading-none select-none">{d.num}</span>
                    <div className="mt-1">{d.icon}</div>
                  </div>
                  <h3 className="font-heading text-lg text-projector mb-3 group-hover:text-oxblood transition-colors duration-300">{d.title}</h3>
                  <p className="text-steel text-sm leading-relaxed">{d.body}</p>
                </Card3D>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ──────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="how-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <p className="text-steel text-xs tracking-[0.2em] uppercase mb-3">The process</p>
              <h2 id="how-heading" className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider text-projector leading-none">
                HOW IT WORKS
              </h2>
              <span className="oxblood-rule" />
            </div>
            <div ref={timelineRef} className="relative max-w-2xl">
              <div className="timeline-line absolute left-[19px] top-3 bottom-3 w-[2px] bg-oxblood/30 origin-top" aria-hidden="true" />
              <div className="space-y-10">
                {[
                  { n: "01", title: "Tell us about your event", body: "Date, location, guest count, event type. A quick form or an email." },
                  { n: "02", title: "Blake sends a custom quote", body: "Custom to your event, your location, your duration. No templates, no automated calculator." },
                  { n: "03", title: "Lock it with a deposit", body: "Card, tap, or invoice. Your date is held the moment the deposit clears." },
                  { n: "04", title: "We arrive 3 hours early", body: "Full setup, sound check, and systems test before your first guest sets foot on the lawn." },
                  { n: "05", title: "You enjoy the night", body: "We run the equipment. We handle teardown. You just show up." },
                ].map((step) => (
                  <div key={step.n} className="timeline-step flex items-start gap-6">
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0 rounded-full border-2 border-oxblood bg-screening">
                      <span className="font-display text-sm text-oxblood leading-none">{step.n}</span>
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-heading text-base text-projector mb-1">{step.title}</h3>
                      <p className="text-steel text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PACKAGES ──────────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="packages-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <p className="text-steel text-xs tracking-[0.2em] uppercase mb-3">Cinema packages</p>
                <h2 id="packages-heading" className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider text-projector leading-none">
                  CORE PACKAGES
                </h2>
                <span className="oxblood-rule" />
              </div>
              <Link href="/packages" className="flex items-center gap-2 text-oxblood text-sm font-medium hover:text-projector transition-colors group">
                All packages <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-lg p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] ${
                    pkg.featured ? "bg-charcoal ring-1 ring-oxblood/60" : "bg-charcoal border border-white/8 hover:border-white/20"
                  }`}
                >
                  {pkg.featured && <BorderBeam size={250} duration={12} />}
                  {pkg.tag && (
                    <span className="inline-flex self-start mb-4 bg-oxblood/15 text-oxblood text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pkg.tag}
                    </span>
                  )}
                  <h3 className="font-display text-2xl tracking-wider text-projector leading-none mb-3">{pkg.name}</h3>
                  <p className="text-steel text-sm leading-relaxed mb-5">{pkg.desc}</p>
                  <ul className="space-y-1.5 flex-1 mb-6">
                    {pkg.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-steel text-xs">
                        <span className="text-oxblood mt-1 shrink-0 text-[10px]">&#9632;</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 min-h-[44px] ${
                      pkg.featured
                        ? "bg-oxblood text-projector hover:bg-oxblood-deep hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(107,31,31,0.4)]"
                        : "border border-oxblood text-oxblood hover:bg-oxblood hover:text-projector"
                    }`}
                  >
                    Get a Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OXBLOOD QUOTE ─────────────────────────────────────── */}
        <section className="relative bg-oxblood py-28 px-4 sm:px-6 lg:px-8 overflow-hidden noise-bg">
          <div className="absolute inset-0 bg-gradient-to-br from-oxblood to-oxblood-deep" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="font-display text-[clamp(1.8rem,5vw,3.5rem)] tracking-wider text-projector leading-snug mb-6">
              "EVERY PIECE OF GEAR HAS A BACKUP. EVERY ARRIVAL IS 3 HOURS BEFORE YOUR FIRST GUEST."
            </p>
            <p className="text-projector/60 text-sm tracking-[0.15em] uppercase">Blake Drain. Owner. USAF Veteran.</p>
          </div>
        </section>

        {/* ─── WHO WE SERVE ──────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="serve-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-steel text-xs tracking-[0.2em] uppercase mb-3">Private events only</p>
              <h2 id="serve-heading" className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider text-projector leading-none">
                WHO WE SERVE
              </h2>
              <span className="oxblood-rule" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Backyard movie nights",
                "HOA and neighborhood events",
                "Block parties",
                "Birthday and graduation parties",
                "Sports watch parties",
                "Gaming nights",
                "Karaoke nights",
                "Corporate events",
                "Non-profits and church events",
                "Elopements",
                "Wedding receptions",
                "Indoor winter events",
              ].map((s) => (
                <div key={s} className="bg-screening rounded-lg p-4 border border-white/8">
                  <p className="text-steel text-sm leading-tight">{s}</p>
                </div>
              ))}
            </div>
            <p className="text-steel text-xs mt-8 tracking-[0.1em] uppercase">
              All bookings are for private, non-ticketed gatherings within 60 miles of Canton, MI.
            </p>
          </div>
        </section>

        {/* ─── FINAL CTA ─────────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="cta-heading" className="font-display text-[clamp(3rem,8vw,7rem)] tracking-wider text-projector leading-none mb-4">
              GET A QUOTE
            </h2>
            <span className="oxblood-rule mx-auto" />
            <p className="text-steel text-lg leading-relaxed mt-6 mb-10">
              Pricing is custom to every event. Fill out the form and Blake responds within 24 hours.
            </p>
            <ShimmerButton onClick={() => window.location.href = "/contact"} className="mx-auto">
              Contact Blake
            </ShimmerButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
