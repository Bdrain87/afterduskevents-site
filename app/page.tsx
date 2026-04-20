"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Spotlight } from "@/components/ui/spotlight";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Card3D } from "@/components/ui/card-3d";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight, Monitor, Volume2, Zap, Wifi, Shield } from "lucide-react";
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
    body: "Up to 6 Soundboks speakers across multiple zones. 50-meter wireless range. Ceremony zone, dance floor zone, tailgate zone, all from one rental.",
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
    desc: "30-foot inflatable screen, 4K laser projector, 4 Soundboks speakers across two zones, DFB MK2 subwoofer. Up to 250 people.",
    featured: true,
  },
  {
    name: "Intimate 20 ft",
    desc: "20-foot screen, 4K laser projector, 2 Soundboks speakers. Water ballast setup. Backyards, small gatherings, family nights.",
  },
  {
    name: "Indoor Winter",
    desc: "120-inch Da-Lite fast-fold screen, 4K laser projector, Soundboks audio. Year-round, weather-proof. Halls, gyms, barns.",
  },
];

export default function HomePage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heroTitleRef.current) {
      const split = new SplitText(heroTitleRef.current, { type: "chars" });
      gsap.set(split.chars, { y: 80, opacity: 0 });
      tl.to(split.chars, { y: 0, opacity: 1, duration: 0.7, stagger: 0.02, delay: 0.15 });
    }

    if (heroSubRef.current) {
      tl.fromTo(heroSubRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3");
    }
    if (heroCtaRef.current) {
      tl.fromTo(heroCtaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.35");
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
    description: "Veteran-owned outdoor cinema and event rentals for private events in Southeast Michigan.",
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
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=2000&q=80&auto=format"
            alt="Outdoor cinema at night"
            fill
            className="object-cover object-center scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-screening/60 via-screening/40 to-screening" />
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(107,31,31,0.25)" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-16">
            <h1
              ref={heroTitleRef}
              className="font-display text-[clamp(3.5rem,11vw,9rem)] tracking-[0.04em] text-projector leading-[0.9] mb-8"
              aria-label="Big screen. Bigger nights."
            >
              BIG SCREEN.<br />BIGGER NIGHTS.
            </h1>
            <p
              ref={heroSubRef}
              className="text-projector/75 text-lg sm:text-xl max-w-[55ch] mx-auto mb-10 leading-relaxed"
            >
              Veteran-owned outdoor cinema for private events across Southeast Michigan.
              30-foot screen. Concert-grade sound. Full power independence.
            </p>
            <div ref={heroCtaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ShimmerButton onClick={() => window.location.href = "/contact"} className="w-full sm:w-auto">
                Get a Quote
              </ShimmerButton>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector border-2 border-projector/20 hover:border-oxblood hover:text-oxblood transition-all duration-300 min-h-[56px] w-full sm:w-auto"
              >
                See Packages
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" aria-hidden="true">
            <span className="text-projector text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
            <div className="w-px h-8 bg-projector" style={{ animation: "scrollHint 2s ease-in-out infinite" }} />
          </div>
        </section>

        {/* Strip */}
        <div className="border-y border-white/8 bg-charcoal/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center gap-4 flex-wrap text-center">
            {["Private events only", "60 miles of Canton, MI", "BYO Content", "Veteran Owned"].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-4">
                <span className="text-steel text-xs tracking-[0.15em] uppercase">{t}</span>
                {i < arr.length - 1 && <span className="text-silver/20 text-xs hidden sm:inline">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Why section */}
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
                    <span className="font-display text-4xl text-oxblood/40 leading-none select-none">{d.num}</span>
                    <div className="mt-1">{d.icon}</div>
                  </div>
                  <h3 className="font-heading text-lg text-projector mb-3 group-hover:text-oxblood transition-colors duration-300">{d.title}</h3>
                  <p className="text-steel text-sm leading-relaxed max-w-[45ch]">{d.body}</p>
                </Card3D>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
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
                  { n: "01", title: "Tell us about your event", body: "Date, location, guest count, vibe. A quick form or an email." },
                  { n: "02", title: "We send a custom quote", body: "Custom to your event. No templates, no automated calculator." },
                  { n: "03", title: "Lock it with a deposit", body: "Card, tap, or invoice. Your date is held the moment it lands." },
                  { n: "04", title: "We arrive 3 hours early", body: "Setup, sound check, full systems test before your first guest arrives." },
                  { n: "05", title: "You enjoy the night", body: "We run everything and handle teardown. You just show up." },
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

        {/* Packages */}
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
                  <h3 className="font-display text-2xl tracking-wider text-projector leading-none mb-4">{pkg.name}</h3>
                  <p className="text-steel text-sm leading-relaxed flex-1 mb-6">{pkg.desc}</p>
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

        {/* Oxblood pull quote */}
        <section className="relative bg-oxblood py-28 px-4 sm:px-6 lg:px-8 overflow-hidden noise-bg">
          <div className="absolute inset-0 bg-gradient-to-br from-oxblood via-oxblood to-oxblood-deep" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="font-display text-[clamp(1.8rem,5vw,3.5rem)] tracking-wider text-projector leading-snug mb-6">
              "EVERY PIECE OF GEAR HAS A BACKUP. EVERY ARRIVAL IS 3 HOURS BEFORE YOUR FIRST GUEST."
            </p>
            <p className="text-projector/60 text-sm tracking-[0.15em] uppercase">Blake Drain. Owner. USAF Veteran.</p>
          </div>
        </section>

        {/* Weddings teaser */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="wedding-teaser-heading">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-steel text-xs tracking-[0.2em] uppercase mb-3">Weddings</p>
              <h2 id="wedding-teaser-heading" className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider text-projector leading-none mb-2">
                A WEDDING THAT LOOKS AS GOOD AS IT FEELS.
              </h2>
              <span className="oxblood-rule" />
              <p className="text-steel text-base leading-relaxed mt-6 mb-8 max-w-[55ch]">
                Elopement, reception cinema, or full-day ceremony through reception. Three tiers, one operator, ceremony audio through the dance floor.
              </p>
              <Link href="/packages/weddings" className="inline-flex items-center gap-2 text-oxblood font-medium hover:text-projector transition-colors group">
                See wedding packages <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
            <div className="aspect-[4/3] bg-screening rounded-lg overflow-hidden border border-white/8 relative">
              <Image
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80&auto=format"
                alt="Wedding outdoor cinema setup"
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-screening/60 to-transparent" />
            </div>
          </div>
        </section>

        {/* CTA */}
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

      <style>{`
        @keyframes scrollHint {
          0%, 100% { opacity: 0.4; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(0.4); transform-origin: top; }
        }
      `}</style>
    </>
  );
}
