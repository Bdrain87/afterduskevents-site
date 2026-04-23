"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useFitText } from "@/hooks/use-fit-text";
import Spotlight from "@/components/atmosphere/spotlight";
import Starfield from "@/components/atmosphere/starfield";
import TrustStrip from "@/components/trust-strip";
import EventGallery from "@/components/event-gallery";
import TestimonialsSection from "@/components/testimonials/testimonials-section";
import NextEventCard from "@/components/next-event-card";
import type { NearestCityResult } from "@/lib/nearest-city";

gsap.registerPlugin(SplitText, ScrollTrigger);

const statements = [
  {
    headline: "A SCREEN SO BIG YOUR GUESTS STOP TALKING.",
    body: "Thirty feet of inflatable screen. Every seat is the front row.",
    align: "left" as const,
    bg: "bg-screening",
  },
  {
    headline: "SOUND THAT ACTUALLY FILLS THE YARD.",
    body: "No wires. No volume fights. No calling the neighbors.",
    align: "right" as const,
    bg: "bg-charcoal",
  },
  {
    headline: "YOU SHOW UP. WE HANDLE THE REST.",
    body: "We arrive 3 hours early. We set up, test, and run the show. Teardown is ours too.",
    align: "left" as const,
    bg: "bg-screening",
  },
];

const eventTypes = [
  { name: "Movie Night",        desc: "Your yard. Our cinema. Bring your own content." },
  { name: "Sports Watch Party", desc: "Game day, bigger than any bar." },
  { name: "Fight Night",        desc: "UFC, boxing, WWE. Built for the bass drop." },
  { name: "Gaming Night",       desc: "8-bit retro with 4 controllers, or your PS/Xbox with staff hookup." },
  { name: "Wedding Reception",  desc: "Dance floor audio and a first-dance reel on a 30 ft screen." },
  { name: "Graduation Party",   desc: "Photo reel and a movie all night." },
  { name: "Get-together",       desc: "Birthdays, holidays, any private gathering." },
];

const packages = [
  { name: "30 ft + Two Speakers + Sub", tag: "Most popular", desc: "Two speakers plus Death From Below subwoofer. Dance-floor audio, fight-night bass.", featured: true },
  { name: "30 ft + Two Speakers",       tag: null,           desc: "Standard two-speaker setup. Covers most outdoor events." },
  { name: "30 ft + Single Speaker",     tag: null,           desc: "Intimate audio for small gatherings and tight backyards." },
];

type Props = {
  geo?: NearestCityResult | null;
};

export default function HomeClient({ geo }: Props = {}) {
  const { containerRef: nameRef, measureRef, fontSize } = useFitText();
  const heroRestRef    = useRef<HTMLDivElement>(null);
  const statementsRef  = useRef<HTMLDivElement>(null);

  // Only animate once fontSize is calculated from the real font
  useGSAP(() => {
    if (!fontSize || !nameRef.current) return;
    const el = nameRef.current.querySelector(".wordmark");
    if (!el) return;
    const split = new SplitText(el, { type: "chars" });
    gsap.from(split.chars, {
      y: 80, opacity: 0,
      duration: 0.75, stagger: 0.018,
      ease: "power3.out", delay: 0.1,
    });
  }, { dependencies: [fontSize] });

  useGSAP(() => {
    if (!heroRestRef.current) return;
    gsap.from(heroRestRef.current, {
      y: 24, opacity: 0,
      duration: 0.7, ease: "power2.out", delay: 0.5,
    });
  }, []);

  useGSAP(() => {
    if (!statementsRef.current) return;
    const rows = statementsRef.current.querySelectorAll(".statement-row");
    rows.forEach((row, i) => {
      const hl = row.querySelector(".statement-hl");
      const body = row.querySelector(".statement-body");
      const dir = i % 2 === 0 ? -60 : 60;
      gsap.from(hl, {
        x: dir, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: row, start: "top 78%" },
      });
      gsap.from(body, {
        y: 16, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: row, start: "top 75%" },
      });
    });
  }, []);

  // Sitewide org/business schema is injected via app/layout.tsx (Workstream C);
  // homepage doesn't need to repeat it.

  return (
    <>
      <Nav />
      <main className="flex-1">

        {/* ─── 1. HERO: full-width fitted wordmark ─────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center bg-screening overflow-hidden px-4 sm:px-8 lg:px-12">
          {/* Atmosphere stack: deep-space gradient → starfield → ember nebula glow → spotlight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 50% 110%, rgba(15, 10, 30, 0.8) 0%, rgba(10, 10, 15, 0.95) 45%, #050508 100%)",
            }}
          />
          <Starfield quantity={160} maxSize={1.8} vy={0.015} />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(107,31,31,0.28) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 80% 75%, rgba(74,14,14,0.25) 0%, transparent 60%)",
            }}
          />
          <Spotlight fill="rgba(107, 31, 31, 0.45)" />

          {/* Full-width company name */}
          <div ref={nameRef} className="relative z-10 w-full overflow-hidden pt-24 pb-2">
            {/* Hidden measuring span — uses the real loaded font, not canvas */}
            <span
              ref={measureRef}
              aria-hidden="true"
              className="font-display absolute opacity-0 pointer-events-none whitespace-nowrap leading-none tracking-[0.01em] select-none"
              style={{ fontSize: "100px", top: 0, left: 0 }}
            >
              AFTER DUSK EVENTS
            </span>
            <h1
              className="wordmark wordmark-glow font-display text-projector leading-none tracking-[0.01em] whitespace-nowrap"
              style={{ fontSize: fontSize > 0 ? `${fontSize}px` : "clamp(4rem,12vw,10rem)" }}
              aria-label="After Dusk Events"
            >
              AFTER DUSK EVENTS
            </h1>
          </div>

          {/* Hero body */}
          <div ref={heroRestRef} className="relative z-10 pb-16 max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-oxblood" aria-hidden="true" />
              <span className="text-steel text-xs tracking-[0.28em] uppercase">Big screen. Bigger nights.</span>
            </div>
            <p className="text-steel text-lg leading-relaxed mb-9">
              {geo?.inRadius && geo.city.slug !== "canton"
                ? `Serving ${geo.city.name} from Canton, MI. Private outdoor cinema, 30 ft screen, three audio tiers.`
                : geo?.travelZone
                  ? `We travel to ${geo.city.name}. Expect a travel line on the quote. Otherwise — private outdoor cinema, 30 ft screen, three audio tiers.`
                  : "We turn your outdoor space into a cinema. You bring the guests. We bring everything else."}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <ShimmerButton href={geo?.inRadius ? `/contact?location=${encodeURIComponent(geo.city.name)}` : "/contact"}>
                {geo?.inRadius && geo.city.slug !== "canton" ? `Get a ${geo.city.name} Quote` : "Get a Quote"}
              </ShimmerButton>
              <Link href="/packages" className="inline-flex items-center gap-2 text-steel hover:text-projector text-sm font-medium transition-colors py-4 group">
                See setup <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
            <p className="text-steel/80 text-[11px] tracking-[0.18em] uppercase">
              Canton, MI — Private events only — Veteran owned
            </p>
            <div className="mt-8">
              <TrustStrip />
            </div>
          </div>
        </section>

        {/* Next open dates — hides when availability.openDates is empty */}
        <NextEventCard />

        {/* ─── 2. FULL-BLEED STATEMENT: oxblood ───────────────────── */}
        <section
          className="relative bg-oxblood overflow-hidden noise-bg"
          style={{ padding: "10vw 12vw" }}
          aria-label="What we do"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-oxblood to-oxblood-deep" aria-hidden="true" />
          <h2 className="kinetic-headline relative z-10 font-display text-projector leading-none tracking-wider"
            style={{ fontSize: "clamp(3rem, 8.5vw, 8rem)" }}>
            <span style={{ animationDelay: "0ms" }}>WE</span>{" "}
            <span style={{ animationDelay: "60ms" }}>TURN</span>{" "}
            <span style={{ animationDelay: "120ms" }}>YOUR</span>{" "}
            <br />
            <span style={{ animationDelay: "200ms" }}>OUTDOOR</span>{" "}
            <span style={{ animationDelay: "260ms" }}>SPACE</span>
            <br />
            <span style={{ animationDelay: "340ms" }}>INTO</span>{" "}
            <span style={{ animationDelay: "400ms" }}>A</span>{" "}
            <span style={{ animationDelay: "460ms" }}>CINEMA.</span>
          </h2>
        </section>

        {/* ─── 3. THREE STATEMENTS: alternating alignment ──────────── */}
        <div ref={statementsRef} aria-label="Why After Dusk">
          {statements.map((s, i) => (
            <div
              key={i}
              className={`statement-row ${s.bg} border-b border-white/8 flex flex-col justify-center`}
              style={{
                minHeight: "38vh",
                padding: `clamp(3rem, 6vw, 5rem) clamp(1.5rem, 8vw, 7rem)`,
              }}
            >
              <div className={s.align === "right" ? "text-right" : "text-left"}>
                <h3
                  className="statement-hl font-display text-projector leading-none tracking-wider mb-4"
                  style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
                >
                  {s.headline}
                </h3>
                <p
                  className={`statement-body text-steel text-base leading-relaxed max-w-[52ch] ${s.align === "right" ? "ml-auto" : ""}`}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 4. EVENT MENU: vertical list, no cards ──────────────── */}
        <section className="bg-charcoal py-24 px-4 sm:px-8 lg:px-12" aria-labelledby="events-heading">
          <p id="events-heading" className="text-steel text-xs tracking-[0.25em] uppercase mb-10 ml-1">
            Your event
          </p>
          <div className="divide-y divide-white/8 border-t border-white/8">
            {eventTypes.map((e) => (
              <motion.div key={e.name} whileHover={{ backgroundColor: "rgba(107,31,31,0.07)" }}
                transition={{ duration: 0.15 }} className="rounded-sm">
                <Link
                  href="/packages"
                  className="flex items-baseline gap-3 py-5 group"
                >
                  <span className="font-display text-[clamp(1.6rem,3.5vw,3rem)] text-projector leading-none tracking-wider group-hover:text-ember transition-colors duration-200 shrink-0">
                    {e.name}
                  </span>
                  <span className="flex-1 border-b border-dotted border-white/15 self-center mb-1 hidden sm:block" aria-hidden="true" />
                  <span className="text-steel text-sm leading-relaxed shrink-0 hidden sm:block max-w-[32ch] text-right">
                    {e.desc}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-ember shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── 5. HOW IT WORKS: decorative vertical text + steps ───── */}
        <section className="bg-screening py-24 overflow-hidden" aria-labelledby="how-heading">
          <div className="flex gap-0">
            {/* Decorative vertical text */}
            <div
              aria-hidden="true"
              className="hidden lg:flex flex-col leading-none font-display text-oxblood/10 select-none shrink-0 pl-8 pt-2"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)", lineHeight: 0.88 }}
            >
              {"HOW IT WORKS".split("").map((ch, i) => (
                <span key={i} className={ch === " " ? "opacity-0" : ""}>{ch === " " ? "H" : ch}</span>
              ))}
            </div>

            {/* Steps */}
            <div className="flex-1 px-8 lg:px-16 xl:px-20">
              <h2 id="how-heading" className="sr-only">How it works</h2>
              <div className="space-y-14">
                {[
                  { n: "01", title: "Fill out the form.", body: "Tell us your date, location, and event type. Blake sends a custom quote within 24 hours." },
                  { n: "02", title: "We arrive 3 hours early.", body: "Full setup, sound check, and systems test before your first guest sets foot on the lawn." },
                  { n: "03", title: "Your guests are blown away.", body: "You enjoy the night. We run the show. Teardown is ours." },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-8">
                    <span className="font-display text-[clamp(3rem,6vw,5.5rem)] text-oxblood/25 leading-none select-none shrink-0 w-[3ch]">
                      {step.n}
                    </span>
                    <div className="pt-2">
                      <h3 className="font-display text-[clamp(1.8rem,3.5vw,3.2rem)] text-projector tracking-wider leading-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-steel text-base leading-relaxed max-w-[44ch]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. BLAKE'S QUOTE: oxblood, no container limit ───────── */}
        <section className="relative bg-oxblood overflow-hidden noise-bg py-20 px-4 sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-oxblood to-oxblood-deep" aria-hidden="true" />
          <div className="relative z-10">
            <p
              className="font-display text-projector leading-[0.9] tracking-wider mb-8"
              style={{ fontSize: "clamp(2.2rem, 6.5vw, 6rem)" }}
            >
              "EVERY PIECE OF<br />GEAR HAS A BACKUP."
            </p>
            <p className="text-projector/45 text-sm tracking-[0.2em] uppercase text-right max-w-5xl ml-auto">
              Blake Drain, Owner. USAF Veteran.
            </p>
          </div>
        </section>

        {/* ─── 7. PACKAGES: minimal full-width rows ────────────────── */}
        <section className="bg-charcoal py-20 px-4 sm:px-8 lg:px-12" aria-labelledby="packages-heading">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <h2 id="packages-heading" className="font-display text-[clamp(2rem,5vw,4.5rem)] text-projector tracking-wider leading-none">
              PICK YOUR SETUP.
            </h2>
            <Link href="/packages" className="flex items-center gap-2 text-ember text-sm font-medium hover:text-projector transition-colors group">
              All packages <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-t border-white/10">
            {packages.map((pkg) => (
              <Link
                key={pkg.name}
                href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                className="flex items-center gap-4 py-6 border-b border-white/10 hover:bg-screening/40 transition-colors duration-200 group px-2 -mx-2 rounded-sm"
              >
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.8rem)] text-projector tracking-wider leading-none group-hover:text-ember transition-colors duration-200 shrink-0">
                  {pkg.name}
                </h3>
                {pkg.tag && (
                  <span className="text-ember text-xs font-semibold px-2.5 py-0.5 rounded-full border border-oxblood/30 shrink-0 hidden sm:inline-flex">
                    {pkg.tag}
                  </span>
                )}
                <span className="text-steel text-sm flex-1 hidden md:block">{pkg.desc}</span>
                <span className="text-ember text-sm font-medium whitespace-nowrap group-hover:text-projector transition-colors duration-200">
                  Get a Quote <ArrowRight size={13} className="inline group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Past events gallery (renders only when public/images/gallery has real photos) */}
        <EventGallery />

        {/* Social proof (renders only when lib/testimonials has real entries) */}
        <TestimonialsSection />

        {/* ─── 8. FINAL CTA: stark, maximum whitespace ─────────────── */}
        <section className="bg-screening flex flex-col justify-center px-4 sm:px-8 lg:px-12" style={{ minHeight: "60vh", paddingTop: "10vh", paddingBottom: "10vh" }} aria-labelledby="cta-heading">
          <h2
            id="cta-heading"
            className="font-display text-projector leading-none tracking-wider mb-10"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            BOOK YOUR<br />NIGHT.
          </h2>
          <ShimmerButton onClick={() => window.location.href = "/contact"}>
            Get a Quote
          </ShimmerButton>
        </section>

      </main>
      <Footer />
    </>
  );
}
