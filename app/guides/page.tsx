import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FilmStrip from "@/components/film-strip";
import SchemaMarkup from "@/components/seo/schema-markup";
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
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 009 · The Reading Room</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-none">
              Guides.
            </h1>
            <p className="mt-8 font-body text-lg max-w-xl">
              Plain-language answers for planning an outdoor cinema event.
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        <section className="bg-paper px-4 sm:px-10 py-16">
          <div className="mx-auto max-w-3xl">
            <ul className="divide-y-2 divide-ink border-y-2 border-ink">
              {guides.map((g, i) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="group grid grid-cols-[auto_1fr_auto] gap-5 items-baseline py-6 hover:text-tail transition-colors"
                  >
                    <span className="serial text-tail">
                      №&nbsp;{String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-2xl uppercase leading-tight mb-2">
                        {g.title}
                      </h2>
                      <p className="font-body text-sm text-concrete max-w-prose">
                        {g.description}
                      </p>
                    </div>
                    <span className="serial group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
