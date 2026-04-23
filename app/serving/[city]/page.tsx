import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import FilmStrip from "@/components/film-strip";
import SpecSheet from "@/components/spec-sheet";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import { cities, getCity } from "@/lib/cities";
import { buildBreadcrumbList, buildCityServicePage } from "@/lib/schema";
import { audioTiers } from "@/lib/packages";

type Params = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const title = `Outdoor Movie Rentals in ${city.name}, MI`;
  const description = `Outdoor cinema and private event rentals serving ${city.name}, MI. 30 ft inflatable screen with three audio tiers up to a Death From Below subwoofer. Veteran-owned. Quote in 24 hours.`;
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
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">
              {city.county} County · Michigan ·{" "}
              {city.distanceMiles === 0
                ? "Home Base"
                : `${city.distanceMiles} mi from Canton`}
            </p>
            <h1 className="font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-none">
              {city.name}, MI
            </h1>
            <p className="mt-8 font-body text-lg max-w-2xl">{city.blurb}</p>
            <div className="mt-10">
              <BulbButton
                href={`/contact?location=${encodeURIComponent(city.name)}`}
              >
                Get a {city.name} Quote
              </BulbButton>
            </div>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* Editorial */}
        <section className="bg-paper px-4 sm:px-10 py-20">
          <div className="mx-auto max-w-3xl font-body text-lg leading-relaxed space-y-5">
            <p className="serial text-tail">What We Do Here</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none mb-2">
              Outdoor cinema built for {city.name}.
            </h2>
            <p>
              {city.name} is{" "}
              {city.distanceMiles === 0
                ? "home base for After Dusk Events"
                : `${city.distanceMiles} miles from our Canton home base, well inside our 60-mile service radius`}
              . Every {city.name} booking is a 30 ft inflatable screen with
              one of three audio tiers, set up on site with water ballast
              and a complete systems test before the first reel rolls.
            </p>
            <p>
              We run private events only: backyards, corporate gatherings,
              HOA nights, school events, and community organization
              screenings. No ticketed or publicly advertised showings.
            </p>

            {city.featuredVenues && city.featuredVenues.length > 0 && (
              <>
                <p className="serial text-tail pt-4">Venues Nearby</p>
                <ul className="font-mono text-sm space-y-1 text-concrete">
                  {city.featuredVenues.map((v) => (
                    <li key={v}>· {v}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        {/* Audio tiers as spec sheet */}
        <section
          className="bg-ink text-paper px-4 sm:px-10 py-20"
          aria-labelledby="city-tiers-heading"
        >
          <div className="mx-auto max-w-3xl">
            <p className="serial text-bulb mb-4">The Rigs</p>
            <h2
              id="city-tiers-heading"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] uppercase mb-10"
            >
              Audio tiers in {city.name}.
            </h2>
            <SpecSheet
              rows={audioTiers.map((tier) => ({
                label: tier.name,
                value: (
                  <Link
                    href={`/contact?package=${encodeURIComponent(tier.name)}&location=${encodeURIComponent(city.name)}`}
                    className="text-bulb hover:text-paper transition-colors"
                  >
                    Quote →
                  </Link>
                ),
              }))}
            />
          </div>
        </section>

        {/* Also serving */}
        <section
          className="bg-paper px-4 sm:px-10 py-16"
          aria-labelledby="other-cities-heading"
        >
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-4">Also Serving</p>
            <h2
              id="other-cities-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase mb-6"
            >
              Within 60 mi of Canton.
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
              {cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/serving/${c.slug}`}
                      className="hover:text-tail transition-colors"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* Private events + CTA */}
        <section className="bg-ink text-paper px-4 sm:px-10 py-20">
          <div className="mx-auto max-w-3xl">
            <PrivateEventsNotice />
            <div className="text-center mt-10">
              <BulbButton
                href={`/contact?location=${encodeURIComponent(city.name)}`}
              >
                Get a {city.name} Quote
              </BulbButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
