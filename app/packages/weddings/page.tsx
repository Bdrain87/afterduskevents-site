import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Check } from "lucide-react";
import FadeIn, { FadeInGroup, FadeInItem } from "@/components/fade-in";
import AnimatedCard from "@/components/animated-card";
import MagneticButton from "@/components/magnetic-button";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import {
  weddingTiers as tiers,
  weddingAddOns,
  weddingFaq,
} from "@/lib/wedding-tiers";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildWeddingService,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding Cinema Packages",
  description:
    "Outdoor wedding cinema in Southeast Michigan. Elopement, reception, or full-day ceremony plus reception. Veteran-owned, water ballast setup, wireless audio. Contact for quote.",
  alternates: { canonical: "/packages/weddings" },
};

export default function WeddingsPage() {
  return (
    <>
      <SchemaMarkup
        id="weddings-schema"
        data={[
          ...tiers.map(buildWeddingService),
          buildFAQPage(weddingFaq),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Packages", href: "/packages" },
            { name: "Weddings", href: "/packages/weddings" },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h1 className="font-display text-5xl sm:text-7xl text-projector tracking-wider leading-none mb-2">
                A WEDDING THAT LOOKS AS GOOD AS IT FEELS.
              </h1>
              <span className="oxblood-rule" />
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="text-steel text-lg leading-relaxed mt-6 max-w-2xl">
                Elopement, reception cinema, or full-day ceremony plus reception.
                Ceremony audio through the dance floor, all from one veteran-owned operator.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <MagneticButton className="inline-flex mt-8">
                <Link
                  href="/contact?package=Wedding"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a Wedding Quote
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>

        {/* Three tiers */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="tiers-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="tiers-heading" className="font-heading text-2xl sm:text-3xl text-projector mb-10">
                Three tiers, one operator
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tiers.map((tier, i) => (
                <AnimatedCard
                  key={tier.name}
                  delay={i * 0.1}
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
                  <h3 className="font-heading text-xl text-projector mb-1">{tier.name}</h3>
                  <p className="text-steel text-xs mb-5">{tier.duration}</p>
                  <ul className="space-y-2.5 flex-1 mt-5 mb-6">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-steel text-sm">
                        <Check size={14} className="text-ember mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?package=${encodeURIComponent(tier.name)}`}
                    className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      tier.popular
                        ? "bg-oxblood text-projector hover:bg-oxblood-deep"
                        : "border border-ember text-ember hover:bg-oxblood hover:border-oxblood hover:text-projector"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding add-ons */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="wedding-addons-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="wedding-addons-heading" className="font-heading text-2xl text-projector mb-6">
                Wedding Add-Ons
              </h2>
            </FadeIn>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="px-5 py-3 text-steel font-semibold">Item</th>
                    <th className="px-5 py-3 text-steel font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {weddingAddOns.map((row, i) => (
                    <tr
                      key={row.item}
                      className={`border-b border-white/5 ${i % 2 === 1 ? "bg-screening/40" : ""}`}
                    >
                      <td className="px-5 py-3.5 text-projector font-medium">{row.item}</td>
                      <td className="px-5 py-3.5 text-steel">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
            </div>
          </div>
        </section>

        {/* Wedding FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="wedding-faq-heading">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 id="wedding-faq-heading" className="font-heading text-2xl text-projector mb-8">
                Common questions
              </h2>
            </FadeIn>
            <FadeInGroup className="space-y-5" stagger={0.07}>
              {weddingFaq.map((item) => (
                <FadeInItem key={item.q}>
                  <div className="border-b border-white/10 pb-5">
                    <h3 className="font-heading text-base text-projector mb-2">{item.q}</h3>
                    <p className="text-steel text-sm leading-relaxed">{item.a}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInGroup>
          </div>
        </section>

        {/* Private events + CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl space-y-6">
            <PrivateEventsNotice />
            <div className="text-center pt-4">
              <MagneticButton className="inline-flex">
                <Link
                  href="/contact?package=Wedding"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a Wedding Quote
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
