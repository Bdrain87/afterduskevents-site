import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import NightSkyMap from "@/components/serving/night-sky-map";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Area | Southeast Michigan",
  description:
    "Outdoor cinema rentals across Southeast Michigan. After Dusk Events serves a 40-mile radius from Canton, MI, with travel charges beyond. Includes Detroit, Ann Arbor, Plymouth, Northville, Novi, Birmingham, and more.",
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
              40 MILES OF CANTON.
            </h1>
            <p className="text-silver text-body-lg leading-relaxed max-w-[60ch]">
              Canton sits in the middle. Standard service runs to 40 miles. Anything past that picks up an additional travel charge on the quote. Click a dot for distance and to start a quote.
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

        {/* CTA */}
        <section
          className="relative px-6 sm:px-10 lg:px-16 border-t border-white/8"
          style={{ paddingTop: "96px", paddingBottom: "128px" }}
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-projector text-display-lg tracking-wider leading-none mb-6">
              OUTSIDE THE 40?
            </h2>
            <p className="text-silver text-body-lg leading-relaxed mb-10 max-w-[46ch]">
              We still come. The quote includes a travel charge that scales with the distance. Send the date and city and we will price it.
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
