import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import SchemaMarkup from "@/components/seo/schema-markup";
import { FunnelSection } from "@/components/funnel/layout";
import { buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides on outdoor movie rentals: pricing, screen sizing, weather policies, and more. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/guides" },
};

const guides = [
  {
    href: "/guides/outdoor-movie-rental-cost-michigan",
    title: "How much does an outdoor movie rental cost in Michigan? (2026)",
    description:
      "How we think about pricing, what changes the number, and why every event is quoted custom.",
  },
  {
    href: "/guides/screen-size-for-guest-count",
    title: "What size outdoor movie screen do I need for my guest count? (2026)",
    description:
      "Sizing chart matching guest count to screen size and audio coverage.",
  },
];

export default function GuidesIndexPage() {
  return (
    <>
      <SchemaMarkup
        id="guides-breadcrumb"
        data={buildBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
        ])}
      />
      <Nav />
      <main className="flex-1 pt-16">
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto max-w-5xl">
            <p className="text-caption text-ember mb-4">Plan the night</p>
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none">
              GUIDES.
            </h1>
            <p className="mt-6 max-w-[56ch] text-body-lg leading-relaxed text-silver">
              Plain-language guides for planning an outdoor cinema event.
            </p>
          </div>
        </FunnelSection>

        <FunnelSection>
          <div className="mx-auto max-w-5xl space-y-4">
            {guides.map((g, i) => (
              <FadeIn key={g.href} delay={i * 0.06}>
                <Link
                  href={g.href}
                  className="group relative flex items-start gap-6 rounded-lg p-6 bg-charcoal/60 border border-white/10 hover:border-ember/45 transition-colors overflow-hidden"
                >
                  <span aria-hidden="true" className="mt-2 block h-px w-5 bg-ember transition-[width] duration-300 group-hover:w-12" />
                  <div className="flex-1">
                    <h2 className="font-heading text-heading-md text-projector mb-2">{g.title}</h2>
                    <p className="text-silver text-sm leading-relaxed">{g.description}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
