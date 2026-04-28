import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import {
  ActionBar,
  FunnelSection,
  PrimaryCta,
  SectionHeader,
  TierCard,
} from "@/components/funnel/layout";
import { cities, getCity } from "@/lib/cities";
import {
  buildBreadcrumbList,
  buildCityServicePage,
} from "@/lib/schema";
import { audioTiers } from "@/lib/packages";
import { Check, MapPin } from "lucide-react";
import Balancer from "react-wrap-balancer";
import StatTicker from "@/components/stat-ticker";

type Params = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const title = `Outdoor Movie Rentals in ${city.name}, MI`;
  const description = `Outdoor cinema and private event rentals serving ${city.name}, MI. 4K theater-quality projection, a 35 ft inflatable screen, Soundboks 4 audio tiers, and SKAA subwoofer support. Veteran-owned. Quote in 24 hours.`;
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

  const locationParam = encodeURIComponent(city.name);

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
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="text-caption text-ember mb-4 inline-flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" />
                {city.county} County, MI
              </p>
              <h1 className="font-display text-projector text-display-lg tracking-wider leading-none">
                <Balancer>OUTDOOR MOVIE RENTALS IN {city.name.toUpperCase()}, MI</Balancer>
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              {city.distanceMiles > 0 && (
                <p className="mt-6 flex items-baseline gap-2 font-display tracking-wider text-projector">
                  <StatTicker
                    value={city.distanceMiles}
                    className="text-display-md leading-none"
                  />
                  <span className="text-lg uppercase tracking-[0.2em] text-ember">mi from Canton</span>
                </p>
              )}
            </FadeIn>
            <FadeIn delay={0.2}>
              <ActionBar className="mt-8">
                <PrimaryCta href={`/contact?location=${locationParam}`}>
                  Get a {city.name} Quote
                </PrimaryCta>
              </ActionBar>
            </FadeIn>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="city-overview-heading">
          <div className="mx-auto max-w-3xl space-y-6 text-silver leading-relaxed">
            <FadeIn>
              <h2
                id="city-overview-heading"
                className="font-display text-projector text-display-md tracking-wider leading-none mb-6"
              >
                OUTDOOR CINEMA, BUILT FOR {city.name.toUpperCase()}.
              </h2>
              <p>
                {city.name} is{" "}
                {city.distanceMiles === 0
                  ? "home base for After Dusk Events"
                  : `${city.distanceMiles} miles from our Canton home base${city.distanceMiles <= 40 ? ", well inside our 40-mile service radius" : ", outside the 40-mile core radius (an additional travel charge is added to the quote)"}`}
                . Every {city.name} booking is a 4K theater-quality projector, a 35 ft inflatable screen, and one of four audio tiers,
                set up on site with a complete systems test before the first reel rolls.
              </p>
              <p>
                We run private events only: backyards, corporate gatherings, HOA
                nights, school events, and community organization screenings. No ticketed or
                publicly advertised showings.
              </p>
            </FadeIn>

            {city.featuredVenues && city.featuredVenues.length > 0 && (
              <FadeIn delay={0.1}>
                <h3 className="font-heading text-heading-md text-projector mt-6 mb-3">
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
        </FunnelSection>

        <FunnelSection labelledBy="city-tiers-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="city-tiers-heading"
              eyebrow="Audio tiers"
              title={`AUDIO TIERS AVAILABLE IN ${city.name.toUpperCase()}.`}
              body={`One 4K projector. One 35 ft screen. Four audio tiers. Every ${city.name} booking is custom quoted around your event.`}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audioTiers.map((tier) => (
                <TierCard
                  key={tier.slug}
                  tier={tier}
                  href={`/contact?package=${encodeURIComponent(tier.name)}&location=${locationParam}`}
                  compact
                />
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="other-cities-heading">
          <div className="mx-auto max-w-5xl">
            <SectionHeader
              id="other-cities-heading"
              eyebrow="Also serving"
              title="OTHER CITIES."
              body="Standard service within 40 miles of Canton, MI. Beyond that, a travel charge is added."
            />
            <ul className="flex flex-wrap gap-3">
              {cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/serving/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-silver hover:text-projector border border-white/10 hover:border-ember/40 rounded-full px-4 py-1.5 transition-colors"
                    >
                      <MapPin size={12} className="text-ember" aria-hidden="true" />
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </FunnelSection>

        <FunnelSection tone="band">
          <div className="mx-auto max-w-3xl space-y-6">
            <PrivateEventsNotice />
            <ActionBar>
              <PrimaryCta href={`/contact?location=${locationParam}`}>
                Get a {city.name} Quote
              </PrimaryCta>
            </ActionBar>
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
