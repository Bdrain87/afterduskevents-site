import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import NightSkyMap from "@/components/serving/night-sky-map";
import SchemaMarkup from "@/components/seo/schema-markup";
import {
  FunnelSection,
  QuotePanel,
} from "@/components/funnel/layout";
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
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto max-w-5xl">
            <p className="text-caption text-ember mb-4">Southeast Michigan</p>
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none">
              40 MILES OF CANTON.
            </h1>
            <p className="mt-6 max-w-[60ch] text-body-lg leading-relaxed text-silver">
              Canton sits in the middle. Standard service runs to 40 miles. Anything past that picks up an additional travel charge on the quote. Click a dot for distance and to start a quote.
            </p>
          </div>
        </FunnelSection>

        <FunnelSection>
          <div className="mx-auto max-w-7xl" data-dim-beam>
            <NightSkyMap />
          </div>
        </FunnelSection>

        <FunnelSection tone="band">
          <div className="mx-auto max-w-4xl">
            <QuotePanel
              title="OUTSIDE THE 40?"
              body="We still come. The quote includes a travel charge that scales with the distance. Send the date and city and we will price it."
            />
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
