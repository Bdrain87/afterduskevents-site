"use client";

import Link from "next/link";
import { useRef } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const eventTypes = [
  { name: "Backyard Movie Night", desc: "Your lawn. Our cinema. Bring the chairs." },
  { name: "Sports Watch Party", desc: "Fight night, playoffs, Super Bowl. Big screen, bigger reactions." },
  { name: "Wedding Reception", desc: "Dance floor audio, first-dance reel, ceremony sound. All handled." },
  { name: "Gaming Night", desc: "Console gaming, retro library, and a screen no one forgets." },
  { name: "Birthday and Graduation", desc: "A night your guests will talk about. Long after the cake is gone." },
  { name: "Corporate Event", desc: "Company screenings, presentations, team events. Fully insured." },
];

const packages = [
  {
    name: "Community 30 ft",
    tag: "Most popular",
    desc: "The full setup. Thirty-foot screen, concert-grade sound, subwoofer. For events up to 250 people.",
    featured: true,
  },
  {
    name: "Intimate 20 ft",
    desc: "Everything you need for a backyard or small venue. Twenty-foot screen, no staking, no hassle.",
  },
  {
    name: "Indoor Winter",
    desc: "Year-round, weather-proof. We bring the cinema inside when the season calls for it.",
  },
];

export default function HomePage() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const heroRestRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (nameRef.current) {
      const split = new SplitText(nameRef.current, { type: "chars" });
      gsap.set(split.chars, { y: 100, opacity: 0 });
      tl.to(split.chars, { y: 0, opacity: 1, duration: 0.8, stagger: 0.018, delay: 0.1 });
    }

    if (heroRestRef.current) {
      tl.fromTo(heroRestRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
    }
  }, []);

  useGSAP(() => {
    if (!timelineRef.current) return;
    const steps = timelineRef.current.querySelectorAll(".step");
    gsap.fromTo(steps,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.18, ease: "power2.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 70%" } }
    );
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "After Dusk Events LLC",
    description: "Veteran-owned outdoor cinema rental for private events in Southeast Michigan. We bring the screen, sound, and everything else.",
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

        {/* ─── HERO ────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-screening px-4 sm:px-8 lg:px-16 xl:px-24">

          {/* Oxblood projector glow */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 50% at 40% 30%, rgba(107,31,31,0.22) 0%, transparent 65%)" }} />

          <div className="relative z-10 pt-28 pb-20">

            {/* Company name — dominant element */}
            <h1
              ref={nameRef}
              className="font-display text-[clamp(4.5rem,14vw,13rem)] text-projector tracking-[0.02em] leading-[0.85] mb-6"
              aria-label="After Dusk Events"
            >
              AFTER<br />DUSK<br />EVENTS
            </h1>

            <div ref={heroRestRef}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-[2px] bg-oxblood" aria-hidden="true" />
                <span className="text-steel text-xs tracking-[0.25em] uppercase">Big screen. Bigger nights.</span>
              </div>

              <p className="text-steel text-lg sm:text-xl leading-relaxed max-w-[48ch] mb-10">
                We turn your outdoor space into a cinema. You bring the guests.
                We bring everything else.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <ShimmerButton onClick={() => window.location.href = "/contact"}>
                  Get a Quote
                </ShimmerButton>
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 text-steel hover:text-projector text-sm font-medium transition-colors py-4 group"
                >
                  See packages <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-steel/40 text-xs tracking-[0.15em] uppercase mt-10">
                Private events only — 60 miles of Canton, MI — Veteran owned
              </p>
            </div>
          </div>
        </section>

        {/* ─── THREE OUTCOME STATEMENTS ────────────────────────────── */}
        <section className="bg-charcoal" aria-label="What we deliver">
          {[
            {
              headline: "A SCREEN SO BIG YOUR GUESTS STOP TALKING.",
              body: "Thirty feet of inflatable screen. Every seat is the front row.",
            },
            {
              headline: "SOUND THAT ACTUALLY FILLS THE YARD.",
              body: "Wireless multi-zone speakers, no extension cords, no wires across the lawn, no fighting over the volume.",
            },
            {
              headline: "YOU SHOW UP. WE HANDLE EVERYTHING ELSE.",
              body: "We arrive 3 hours before your guests. We set up, run the show, and tear it all down. You enjoy the night.",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`px-4 sm:px-8 lg:px-16 xl:px-24 py-20 border-b border-white/8 ${i % 2 === 1 ? "bg-screening" : ""}`}
            >
              <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] text-projector tracking-wider leading-none mb-4 max-w-4xl">
                {s.headline}
              </h2>
              <p className="text-steel text-base leading-relaxed max-w-[55ch]">{s.body}</p>
            </div>
          ))}
        </section>

        {/* ─── EVENT TYPES ─────────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-8 lg:px-16 xl:px-24" aria-labelledby="events-heading">
          <div className="max-w-7xl">
            <p className="text-steel text-xs tracking-[0.2em] uppercase mb-4">We do this</p>
            <h2 id="events-heading" className="font-display text-[clamp(2.5rem,7vw,6rem)] tracking-wider text-projector leading-none mb-2">
              YOUR EVENT.
            </h2>
            <span className="oxblood-rule" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden mt-12">
              {eventTypes.map((e) => (
                <Link
                  key={e.name}
                  href="/packages"
                  className="bg-charcoal p-8 hover:bg-screening transition-colors duration-200 group"
                >
                  <h3 className="font-display text-2xl tracking-wider text-projector leading-none mb-3 group-hover:text-oxblood transition-colors duration-200">
                    {e.name}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed">{e.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS (3 steps) ──────────────────────────────── */}
        <section className="py-28 px-4 sm:px-8 lg:px-16 xl:px-24 bg-charcoal" aria-labelledby="how-heading">
          <div className="max-w-7xl">
            <p className="text-steel text-xs tracking-[0.2em] uppercase mb-4">The process</p>
            <h2 id="how-heading" className="font-display text-[clamp(2.5rem,7vw,6rem)] tracking-wider text-projector leading-none mb-2">
              THREE STEPS.
            </h2>
            <span className="oxblood-rule" />

            <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { n: "01", title: "Fill out the form.", body: "Tell us about your event. Blake sends a custom quote within 24 hours." },
                { n: "02", title: "We show up and set up.", body: "We arrive 3 hours early. Setup, sound check, full test. You do nothing." },
                { n: "03", title: "Your guests are blown away.", body: "You enjoy the night. We run the show and handle teardown." },
              ].map((step) => (
                <div key={step.n} className="step">
                  <div className="font-display text-7xl text-oxblood/25 leading-none mb-4 select-none" aria-hidden="true">
                    {step.n}
                  </div>
                  <h3 className="font-display text-3xl tracking-wider text-projector leading-tight mb-3">{step.title}</h3>
                  <p className="text-steel text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BLAKE'S QUOTE ───────────────────────────────────────── */}
        <section className="relative bg-oxblood py-28 px-4 sm:px-8 lg:px-16 xl:px-24 overflow-hidden noise-bg">
          <div className="absolute inset-0 bg-gradient-to-br from-oxblood to-oxblood-deep" aria-hidden="true" />
          <div className="relative z-10 max-w-4xl">
            <p className="font-display text-[clamp(2rem,5.5vw,4rem)] tracking-wider text-projector leading-snug mb-6">
              "EVERY PIECE OF GEAR HAS A BACKUP. EVERY ARRIVAL IS 3 HOURS BEFORE YOUR FIRST GUEST."
            </p>
            <p className="text-projector/50 text-sm tracking-[0.18em] uppercase">Blake Drain. Owner. USAF Veteran.</p>
          </div>
        </section>

        {/* ─── PACKAGES ────────────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-8 lg:px-16 xl:px-24" aria-labelledby="packages-heading">
          <div className="max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <p className="text-steel text-xs tracking-[0.2em] uppercase mb-4">Cinema packages</p>
                <h2 id="packages-heading" className="font-display text-[clamp(2.5rem,7vw,6rem)] tracking-wider text-projector leading-none mb-2">
                  PICK YOUR SETUP.
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

        {/* ─── FINAL CTA ───────────────────────────────────────────── */}
        <section className="py-28 px-4 sm:px-8 lg:px-16 xl:px-24 bg-charcoal" aria-labelledby="cta-heading">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="font-display text-[clamp(3.5rem,9vw,8rem)] tracking-wider text-projector leading-none mb-4">
              LET'S BUILD YOUR NIGHT.
            </h2>
            <span className="oxblood-rule" />
            <p className="text-steel text-lg leading-relaxed mt-6 mb-10 max-w-[48ch]">
              Pricing is custom to every event. Fill out the form and Blake responds within 24 hours.
            </p>
            <ShimmerButton onClick={() => window.location.href = "/contact"}>
              Get a Quote
            </ShimmerButton>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
