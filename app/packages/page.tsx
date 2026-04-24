import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import MagneticButton from "@/components/magnetic-button";
import { ArrowRight } from "lucide-react";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import LightCheck from "@/components/packages/light-check";
import BallparkTool from "@/components/packages/ballpark-tool";
import ComparisonTable from "@/components/packages/comparison-table";
import { useCases } from "@/lib/packages";
import {
  buildAllServicesGraph,
  buildBreadcrumbList,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "One 30 ft inflatable screen. Four audio tiers up to four speakers and two subwoofers. Private events only in Southeast Michigan. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/packages" },
};

// Placeholder backgrounds per event type. Real photos TBD summer 2026.
const eventBg: Record<string, string> = {
  "movie-night": "linear-gradient(180deg, rgba(221,84,84,0.15) 0%, #0a0a0a 55%, #050508 100%)",
  gaming: "linear-gradient(180deg, rgba(74,14,14,0.3) 0%, #0f0814 55%, #050508 100%)",
  sports: "linear-gradient(180deg, rgba(107,31,31,0.3) 0%, #1a0f08 60%, #050505 100%)",
  fights: "radial-gradient(ellipse at 30% 40%, rgba(107,31,31,0.5) 0%, #0a0a0a 65%)",
  graduation: "linear-gradient(180deg, rgba(221,84,84,0.18) 0%, #140b0b 60%, #050505 100%)",
  celebration: "linear-gradient(180deg, rgba(221,84,84,0.22) 0%, #140808 50%, #050505 100%)",
};

export default function PackagesPage() {
  return (
    <>
      <SchemaMarkup
        id="packages-services"
        data={[
          ...buildAllServicesGraph(),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Packages", href: "/packages" },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section
          className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "96px", paddingBottom: "48px" }}
        >
          <div className="relative z-10 mx-auto max-w-5xl">
            <p className="text-caption text-ember mb-4">The setup</p>
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none mb-6">
              ONE SCREEN,
              <br />
              FOUR WAYS TO HEAR IT.
            </h1>
            <p className="text-silver text-body-lg leading-relaxed max-w-[60ch]">
              Every booking is a private, non-ticketed event on a 30 ft inflatable screen. Pick your audio. Add what you need. Setup, systems test, and teardown are ours.
            </p>
          </div>
        </section>

        {/* Private events notice */}
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 mt-6">
          <PrivateEventsNotice />
        </div>

        {/* Light Check tier selector */}
        <LightCheck />

        {/* Ballpark: Two questions, one recommendation */}
        <section
          aria-labelledby="ballpark-heading"
          className="relative px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "48px", paddingBottom: "96px" }}
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <p className="text-caption text-ember mb-3">Still not sure?</p>
              <h2
                id="ballpark-heading"
                className="font-display text-projector text-display-md tracking-wider leading-none"
              >
                TWO QUESTIONS, ONE RECOMMENDATION.
              </h2>
            </div>
            <BallparkTool />
          </div>
        </section>

        {/* Comparison table */}
        <section
          aria-labelledby="comparison-heading"
          className="relative px-6 sm:px-10 lg:px-16"
          style={{ paddingBottom: "96px" }}
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-caption text-ember mb-3">Compare</p>
              <h2
                id="comparison-heading"
                className="font-display text-projector text-display-md tracking-wider leading-none"
              >
                SIDE BY SIDE.
              </h2>
            </div>
            <ComparisonTable />
          </div>
        </section>

        {/* Event types grid. 6 compact cards with placeholder photo slots */}
        <section
          id="use-cases"
          aria-labelledby="use-cases-heading"
          className="relative px-6 sm:px-10 lg:px-16 bg-dusk"
          style={{ paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-caption text-ember mb-3">Private events</p>
              <h2
                id="use-cases-heading"
                className="font-display text-projector text-display-md tracking-wider leading-none"
              >
                EVENT TYPES.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((uc) => (
                <Link
                  key={uc.slug}
                  href={`/contact?useCase=${uc.slug}`}
                  id={uc.slug}
                  className="group relative aspect-[4/5] overflow-hidden block"
                  style={{ background: eventBg[uc.slug] ?? "#0a0a0a" }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(5,5,8,0.85) 100%)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 border border-transparent group-hover:border-ember/40 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-display text-heading-lg text-projector tracking-wider leading-none mb-2">
                      {uc.name}
                    </h3>
                    <p className="text-silver text-sm leading-relaxed max-w-[26ch]">
                      {uc.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-ember text-[11px] tracking-[0.2em] uppercase">
                      Inquire
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Add-Ons teaser: 2-column */}
        <section
          aria-labelledby="addons-teaser"
          className="relative px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-caption text-ember mb-3">Pile it on</p>
              <h2
                id="addons-teaser"
                className="font-display text-projector text-display-md tracking-wider leading-none mb-6"
              >
                ADD-ONS.
              </h2>
              <p className="text-silver text-body leading-relaxed">
                Karaoke, popcorn, drone video, cornhole, string lights, patio heater, bug zapper. If the night needs it, we probably have it.
              </p>
            </div>
            <div className="md:pt-20">
              <Link
                href="/add-ons"
                className="inline-flex items-center gap-2 text-ember text-sm font-semibold hover:text-projector transition-colors group"
              >
                Browse the full catalog
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "96px", paddingBottom: "128px" }}
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-projector text-display-lg tracking-wider leading-none mb-6">
              NOT SURE WHICH FITS?
            </h2>
            <p className="text-silver text-body-lg leading-relaxed mb-10 max-w-[44ch]">
              Tell us the event. We&apos;ll match the setup.
            </p>
            <MagneticButton className="inline-flex">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
              >
                Get a Quote
              </Link>
            </MagneticButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
