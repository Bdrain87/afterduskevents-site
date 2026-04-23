import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";
import { ArrowRight } from "lucide-react";
import PageAtmosphere from "@/components/atmosphere/page-atmosphere";

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
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal overflow-hidden">
          <PageAtmosphere variant="space" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="font-display text-5xl sm:text-6xl text-projector tracking-wider mb-2">
                GUIDES
              </h1>
              <span className="oxblood-rule mx-auto" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-silver text-lg leading-relaxed mt-6">
                Plain-language guides for planning an outdoor cinema event.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4">
            {guides.map((g, i) => (
              <FadeIn key={g.href} delay={i * 0.06}>
                <Link
                  href={g.href}
                  className="group flex items-start justify-between gap-6 rounded-lg p-6 bg-charcoal border border-white/10 hover:border-oxblood/40 transition-colors"
                >
                  <div>
                    <h2 className="font-heading text-xl text-projector mb-2">{g.title}</h2>
                    <p className="text-steel text-sm leading-relaxed">{g.description}</p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-ember shrink-0 mt-1 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
