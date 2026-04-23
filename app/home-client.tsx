"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import HeroWordmark from "@/components/hero-wordmark";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import MagneticButton from "@/components/magnetic-button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Spotlight from "@/components/atmosphere/spotlight";
import TrustStrip from "@/components/trust-strip";
import TestimonialsSection from "@/components/testimonials/testimonials-section";
import NextEventCard from "@/components/next-event-card";
import ThirtyFootCheck from "@/components/home/thirty-foot-check";
import ManifestoLine from "@/components/home/manifesto-line";
import EventTypesMarquee from "@/components/home/event-types-marquee";
import RunSheet from "@/components/home/run-sheet";
import PackagesTeaser from "@/components/home/packages-teaser";
import type { NearestCityResult } from "@/lib/nearest-city";

type Props = {
  geo?: NearestCityResult | null;
};

export default function HomeClient({ geo }: Props = {}) {
  const heroRestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.dataset.home = "1";
    return () => {
      delete document.body.dataset.home;
    };
  }, []);

  useGSAP(() => {
    if (!heroRestRef.current) return;
    gsap.from(heroRestRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* 1. HERO. Dusk Horizon */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-12">
          {/* AmbientSky (sky gradient + starfield) renders globally in layout.tsx.
              The hero layers its own ember nebula + cursor-follow spotlight + horizon line. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(107,31,31,0.28) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 80% 75%, rgba(74,14,14,0.25) 0%, transparent 60%)",
            }}
          />
          <Spotlight fill="rgba(107, 31, 31, 0.45)" />
          <div
            aria-hidden="true"
            className="hero-horizon-fade absolute left-0 right-0 z-[2] pointer-events-none"
            style={{
              top: "62%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent 0%, rgba(221, 84, 84, 0.35) 20%, rgba(221, 84, 84, 0.45) 50%, rgba(221, 84, 84, 0.35) 80%, transparent 100%)",
              filter: "blur(1.5px)",
              opacity: "var(--atmo-glow-opacity, 1)",
            }}
          />

          <div className="relative z-10 w-full overflow-hidden pt-24 pb-2">
            <HeroWordmark />
          </div>

          <div ref={heroRestRef} className="relative z-10 pb-16 max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-oxblood" aria-hidden="true" />
              <span className="text-ember text-xs tracking-[0.28em] uppercase">
                Big screen. Bigger nights.
              </span>
            </div>
            <p className="text-silver text-body-lg leading-relaxed mb-9">
              {geo?.inRadius && geo.city.slug !== "canton"
                ? `Serving ${geo.city.name} from Canton, MI.`
                : geo?.travelZone
                  ? `We travel to ${geo.city.name}. Expect a travel line on the quote.`
                  : "We turn your outdoor space into a cinema."}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <MagneticButton>
                <ShimmerButton href={geo?.inRadius ? `/contact?location=${encodeURIComponent(geo.city.name)}` : "/contact"}>
                  {geo?.inRadius && geo.city.slug !== "canton" ? `Get a ${geo.city.name} Quote` : "Get a Quote"}
                </ShimmerButton>
              </MagneticButton>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-silver hover:text-ember text-sm font-medium transition-colors py-4 group"
              >
                See the setup
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
            <p className="text-silver text-[11px] tracking-[0.18em] uppercase">
              Canton, MI · Private events only · Veteran owned
            </p>
            <div className="mt-8">
              <TrustStrip />
            </div>
          </div>
        </section>

        {/* 2. NextEventCard. Thin band; hides when no open dates. */}
        <NextEventCard />

        {/* 3. 30-foot reality check with live scale-against selector */}
        <ThirtyFootCheck />

        {/* 4. Manifesto line */}
        <ManifestoLine />

        {/* 5. Event types marquee. Placeholder gradient cards; real photos TBD summer 2026. */}
        <EventTypesMarquee />

        {/* 6. Run sheet. Monospaced checklist, local dusk time on the final line. */}
        <RunSheet />

        {/* 7. Packages teaser. Three LED stacks linking into /packages. */}
        <PackagesTeaser />

        {/* 8. Social proof (renders only when lib/testimonials has real entries) */}
        <TestimonialsSection />

        {/* 9. Final CTA. Placeholder backdrop until a real projected-frame shot lands. */}
        <section
          aria-labelledby="cta-heading"
          className="relative flex flex-col justify-center px-4 sm:px-8 lg:px-12 overflow-hidden"
          style={{ minHeight: "70vh", paddingTop: "12vh", paddingBottom: "12vh" }}
        >
          {/* Placeholder projected-frame shot. real photo TBD summer 2026. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 38%, rgba(245, 241, 236, 0.09) 0%, rgba(221, 84, 84, 0.06) 35%, transparent 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-5xl w-full">
            <h2
              id="cta-heading"
              className="font-display text-projector text-display-xl tracking-wider mb-8"
            >
              BOOK YOUR
              <br />
              NIGHT.
            </h2>
            <p className="text-silver text-body-lg leading-relaxed mb-10 max-w-[44ch]">
              Tell us the event. We&apos;ll pick the rig.
            </p>
            <MagneticButton>
              <ShimmerButton onClick={() => (window.location.href = "/contact")}>
                Get a Quote
              </ShimmerButton>
            </MagneticButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
