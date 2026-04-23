import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import FilmStrip from "@/components/film-strip";
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
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-12">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 008 · Routes</p>
            <h1 className="font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-none">
              60 mi · Canton, MI
            </h1>
            <p className="mt-8 font-body text-lg max-w-2xl">
              Private outdoor cinema across Southeast Michigan. Tap a city
              for location-specific details. Outside the 60-mile radius —
              ask for a custom quote with travel.
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        <section className="bg-paper px-4 sm:px-10 py-16">
          <div className="mx-auto max-w-5xl">
            <ul className="divide-y-2 divide-ink border-y-2 border-ink">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/serving/${city.slug}`}
                    className="group grid grid-cols-[1fr_auto_auto] gap-6 items-baseline py-5 hover:text-tail transition-colors"
                  >
                    <p className="font-display text-2xl sm:text-4xl uppercase leading-none">
                      {city.name}
                    </p>
                    <p className="serial text-concrete">
                      {city.distanceMiles === 0
                        ? "Home base"
                        : `${city.distanceMiles} mi`}
                    </p>
                    <span className="serial group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-ink text-paper px-4 sm:px-10 py-20 text-center">
          <p className="serial text-bulb mb-4">Outside the Radius?</p>
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] uppercase leading-none mb-8">
            Ask for travel.
          </h2>
          <BulbButton href="/contact">Get a Quote</BulbButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
