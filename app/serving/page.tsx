import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";
import { cities } from "@/lib/cities";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Area — Southeast Michigan",
  description:
    "Outdoor cinema rentals across Southeast Michigan. After Dusk Events serves a 60-mile radius from Canton, MI — including Detroit, Ann Arbor, Plymouth, Northville, Novi, Birmingham, and more.",
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="font-display text-5xl sm:text-6xl text-projector tracking-wider mb-2">
                SERVICE AREA
              </h1>
              <span className="oxblood-rule mx-auto" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-steel text-lg leading-relaxed mt-6">
                After Dusk Events serves a 60-mile radius from Canton, MI. Tap a city for
                location-specific details.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {cities.map((city, i) => (
                <FadeIn key={city.slug} delay={(i % 3) * 0.05}>
                  <li>
                    <Link
                      href={`/serving/${city.slug}`}
                      className="group flex items-start gap-3 rounded-lg p-5 bg-charcoal border border-white/10 hover:border-oxblood/40 transition-colors h-full"
                    >
                      <MapPin
                        size={18}
                        className="text-oxblood mt-1 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-heading text-base text-projector group-hover:text-projector">
                          {city.name}
                        </p>
                        <p className="text-steel text-xs mt-1">
                          {city.county} County
                          {city.distanceMiles > 0
                            ? ` · ${city.distanceMiles} mi from Canton`
                            : " · Home base"}
                        </p>
                      </div>
                    </Link>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl text-projector mb-4">
                Outside the 60-mile radius?
              </h2>
              <p className="text-steel mb-8 leading-relaxed text-sm">
                Contact Blake for a custom quote with travel.
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
