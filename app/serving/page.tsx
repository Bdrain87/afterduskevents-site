import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import NightSkyMap from "@/components/serving/night-sky-map";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Service Area | Southeast Michigan",
  description:
    "Outdoor cinema rentals across Southeast Michigan. After Dusk Events serves a 60-mile radius from Canton, MI, including Detroit, Ann Arbor, Plymouth, Northville, Novi, Birmingham, and more.",
  alternates: { canonical: "/serving" },
};

export default function ServingIndexPage() {
  return (
    <>
      <SchemaMarkup
        id="serving-breadcrumb"
        data={buildBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Service Area", href: "/serving" },
        ])}
      />
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section
          className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "96px", paddingBottom: "48px" }}
        >
          <div className="relative z-10 mx-auto max-w-5xl">
            <p className="text-caption text-ember mb-4">Southeast Michigan</p>
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none mb-6">
              60 MILES OF CANTON.
            </h1>
            <p className="text-silver text-body-lg leading-relaxed max-w-[60ch]">
              Canton sits in the middle. Every dot on the map is a city we serve. Click any one to see its distance from Canton and jump straight to a quote.
            </p>
          </div>
        </section>

        {/* Night sky map */}
        <section
          className="relative px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "24px", paddingBottom: "96px" }}
          data-dim-beam
        >
          <div className="mx-auto max-w-7xl">
            <NightSkyMap />
          </div>
        </section>

        {/* Full city list as fallback + SEO */}
        <section
          aria-labelledby="city-list-heading"
          className="relative px-6 sm:px-10 lg:px-16 border-t border-white/8"
          style={{ paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-caption text-ember mb-3">All cities</p>
            <h2
              id="city-list-heading"
              className="font-display text-projector text-display-md tracking-wider leading-none mb-10"
            >
              EVERY CITY WE SERVE.
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/serving/${city.slug}`}
                    className="group flex items-baseline justify-between gap-3 border-b border-white/8 pb-2 hover:border-ember transition-colors"
                  >
                    <span className="text-silver group-hover:text-ember text-sm font-medium transition-colors">
                      {city.name}
                    </span>
                    <span className="text-mono text-steel shrink-0">
                      {city.distanceMiles === 0 ? "home" : `${city.distanceMiles} mi`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "96px", paddingBottom: "128px" }}
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-projector text-display-lg tracking-wider leading-none mb-6">
              OUTSIDE THE RING?
            </h2>
            <p className="text-silver text-body-lg leading-relaxed mb-10 max-w-[46ch]">
              We can usually make it work up to 90 miles with a travel line on the quote. Beyond that, still ask.
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
