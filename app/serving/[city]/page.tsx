import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import { cities, getCity } from "@/lib/cities";
import {
  buildBreadcrumbList,
  buildCityServicePage,
} from "@/lib/schema";
import { corePackages } from "@/lib/packages";
import { Check, MapPin } from "lucide-react";
import Balancer from "react-wrap-balancer";

type Params = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const title = `Outdoor Movie Rentals in ${city.name}, MI`;
  const description = `Premium outdoor cinema and inflatable movie screen rentals serving ${city.name}, MI. 4K laser projection, Soundboks audio, water-ballast setup. Veteran-owned. Quote in 24 hours.`;
  return {
    title,
    description,
    alternates: { canonical: `/serving/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `https://afterduskevents.com/serving/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: Params) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  return (
    <>
      <SchemaMarkup
        id={`city-${city.slug}-schema`}
        data={[
          buildCityServicePage(city),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Service Area", href: "/serving" },
            { name: city.name, href: `/serving/${city.slug}` },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <p className="text-ember text-xs tracking-[0.2em] uppercase mb-3 inline-flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" />
                {city.county} County, MI
              </p>
              <h1 className="font-display text-5xl sm:text-7xl text-projector tracking-wider leading-none mb-2">
                <Balancer>OUTDOOR MOVIE RENTALS IN {city.name.toUpperCase()}, MI</Balancer>
              </h1>
              <span className="oxblood-rule" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-steel text-lg leading-relaxed mt-6">
                {city.blurb}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <MagneticButton className="inline-flex mt-8">
                <Link
                  href={`/contact?location=${encodeURIComponent(city.name)}`}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a {city.name} Quote
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>

        {/* What we do here */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-steel leading-relaxed">
            <FadeIn>
              <h2 className="font-heading text-2xl text-projector mb-3">
                Outdoor cinema, built for {city.name}
              </h2>
              <p>
                {city.name} is{" "}
                {city.distanceMiles === 0
                  ? "home base for After Dusk Events"
                  : `${city.distanceMiles} miles from our Canton home base, well inside our 60-mile service radius`}
                . Every {city.name} booking gets the same setup playbook: arrival three hours
                before guests, dual power redundancy via Honda generator and EcoFlow battery,
                Starlink Mini for content streaming, and a complete systems test before the
                first reel rolls.
              </p>
              <p>
                We run private events only — backyards, weddings, corporate gatherings, HOA
                nights, school events, and community organization screenings. No ticketed or
                publicly advertised showings.
              </p>
            </FadeIn>

            {city.featuredVenues && city.featuredVenues.length > 0 && (
              <FadeIn delay={0.1}>
                <h3 className="font-heading text-lg text-projector mt-6 mb-2">
                  Local venues we have set up at or near
                </h3>
                <ul className="space-y-1.5">
                  {city.featuredVenues.map((v) => (
                    <li key={v} className="flex items-start gap-2 text-sm">
                      <Check size={14} className="text-ember mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="city-packages-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="city-packages-heading" className="font-heading text-2xl sm:text-3xl text-projector mb-3">
                Packages available in {city.name}
              </h2>
              <p className="text-steel text-sm mb-8">
                Three core tiers. Every {city.name} booking is custom quoted around your event.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {corePackages.map((pkg) => (
                <div
                  key={pkg.slug}
                  className={`rounded-lg p-6 flex flex-col bg-screening ${
                    pkg.popular
                      ? "ring-2 ring-oxblood"
                      : "border border-white/10 hover:border-white/20 transition-colors"
                  }`}
                >
                  <h3 className="font-heading text-lg text-projector mb-1">{pkg.name}</h3>
                  <p className="text-steel text-xs mb-4 italic">Best for: {pkg.best}</p>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}&location=${encodeURIComponent(city.name)}`}
                    className={`mt-auto inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                      pkg.popular
                        ? "bg-oxblood text-projector hover:bg-oxblood-deep"
                        : "border border-ember text-ember hover:bg-oxblood hover:border-oxblood hover:text-projector"
                    }`}
                  >
                    Quote for {city.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other cities served */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="other-cities-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="other-cities-heading" className="font-heading text-2xl text-projector mb-2">
                Also serving
              </h2>
              <p className="text-steel text-sm mb-6">All within 60 miles of Canton, MI.</p>
            </FadeIn>
            <ul className="flex flex-wrap gap-3">
              {cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/serving/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-steel hover:text-projector border border-white/10 hover:border-oxblood/40 rounded-full px-4 py-1.5 transition-colors"
                    >
                      <MapPin size={12} className="text-ember" aria-hidden="true" />
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* Private events + CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl space-y-6">
            <PrivateEventsNotice />
            <div className="text-center pt-4">
              <MagneticButton className="inline-flex">
                <Link
                  href={`/contact?location=${encodeURIComponent(city.name)}`}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a {city.name} Quote
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
