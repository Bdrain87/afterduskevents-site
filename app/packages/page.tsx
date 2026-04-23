import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Check } from "lucide-react";
import FadeIn from "@/components/fade-in";
import AnimatedCard from "@/components/animated-card";
import MagneticButton from "@/components/magnetic-button";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import BallparkTool from "@/components/packages/ballpark-tool";
import ComparisonTable from "@/components/packages/comparison-table";
import PageAtmosphere from "@/components/atmosphere/page-atmosphere";
import { audioTiers, useCases } from "@/lib/packages";
import {
  buildAllServicesGraph,
  buildBreadcrumbList,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Setup & Audio Tiers",
  description:
    "One 30 ft inflatable screen. Three audio tiers. Private events only in Southeast Michigan. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/packages" },
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
            { name: "Setup", href: "/packages" },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal overflow-hidden">
          <PageAtmosphere variant="dusk" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="font-display text-5xl sm:text-6xl text-projector tracking-wider mb-2">
                ONE SCREEN. THREE AUDIO TIERS.
              </h1>
              <span className="oxblood-rule mx-auto" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-steel text-lg leading-relaxed mt-6">
                Every booking is a private, non-ticketed event on a 30 ft inflatable screen.
                Pick your audio tier. Add what you need. Setup, systems test, and teardown included.
              </p>
              <p className="text-steel text-sm mt-2 italic">
                Every event is custom-quoted. Contact for a real number within 24 hours.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Private events notice */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <PrivateEventsNotice />
        </div>

        {/* Three audio tiers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="tiers-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="tiers-heading" className="font-editorial text-3xl sm:text-4xl text-projector mb-8">
                Audio tiers.
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audioTiers.map((tier, i) => (
                <AnimatedCard
                  key={tier.slug}
                  delay={i * 0.08}
                  className={`rounded-lg p-8 flex flex-col ${
                    tier.popular
                      ? "bg-charcoal ring-2 ring-oxblood"
                      : "bg-charcoal border border-white/10 hover:border-white/20 transition-colors"
                  }`}
                >
                  {tier.popular && (
                    <span className="inline-flex self-start mb-3 bg-oxblood text-projector text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most popular
                    </span>
                  )}
                  <h3
                    className="font-heading text-xl text-projector mb-1"
                    style={{ viewTransitionName: `tier-name-${tier.slug}` }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-ember font-semibold text-sm mb-1">Custom quote per event</p>
                  <p className="text-steel text-xs mt-3 mb-4 italic">Best for: {tier.best}</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-steel text-sm">
                        <Check size={14} className="text-ember mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={`/packages/${tier.slug}`}
                      className="text-ember text-xs font-semibold uppercase tracking-wider hover:text-projector transition-colors"
                    >
                      Details →
                    </Link>
                    <Link
                      href={`/contact?package=${encodeURIComponent(tier.name)}`}
                      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                        tier.popular
                          ? "bg-oxblood text-projector hover:bg-oxblood-deep"
                          : "border border-ember text-ember hover:bg-oxblood hover:border-oxblood hover:text-projector"
                      }`}
                    >
                      Request a Quote
                    </Link>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Quick ballpark tool */}
        <section className="py-12 px-4 sm:px-6 lg:px-8" aria-labelledby="ballpark-heading">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 id="ballpark-heading" className="sr-only">Quick ballpark</h2>
              <BallparkTool />
            </FadeIn>
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="comparison-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="comparison-heading" className="font-editorial text-3xl sm:text-4xl text-projector mb-3">
                Compare audio tiers.
              </h2>
              <p className="text-steel text-sm mb-6">
                Same screen. Same BYO Content rule. Sound scales with your event.
              </p>
              <ComparisonTable />
            </FadeIn>
          </div>
        </section>

        {/* Event types */}
        <section id="use-cases" className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="use-cases-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="use-cases-heading" className="font-editorial text-3xl sm:text-4xl text-projector mb-3">
                Event types.
              </h2>
              <p className="text-steel text-sm mb-8">
                Pick your event. We pick the right audio tier and walk you through add-ons.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((uc, i) => (
                <AnimatedCard
                  key={uc.slug}
                  delay={(i % 2) * 0.08}
                  className="bg-charcoal rounded-lg p-8 flex flex-col border border-white/10 hover:border-white/20 transition-colors"
                >
                  <h3 id={uc.slug} className="font-heading text-xl text-projector mb-2">{uc.name}</h3>
                  <p className="text-steel text-sm leading-relaxed mb-5 flex-1">{uc.desc}</p>
                  <Link
                    href={`/contact?package=${encodeURIComponent(uc.name)}`}
                    className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold border border-ember text-ember hover:bg-oxblood hover:border-oxblood hover:text-projector transition-colors"
                  >
                    Request a Quote
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons link */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl text-projector mb-3">Need extras?</h2>
              <p className="text-steel mb-6 text-sm leading-relaxed">
                Karaoke, drone video, popcorn, cornhole, photo backdrop, string lights, patio heater, bug zapper, and more.
              </p>
              <Link href="/add-ons" className="text-ember underline-offset-4 hover:underline font-medium">
                Browse the Add-On Catalog
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-heading text-3xl text-projector mb-4">Not sure which fits?</h2>
              <p className="text-steel mb-8 leading-relaxed">
                Tell us about your event and we will recommend the right setup.
              </p>
              <MagneticButton className="inline-flex">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a Quote
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
