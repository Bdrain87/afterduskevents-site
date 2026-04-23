import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import TicketStub from "@/components/ticket-stub";
import FilmStrip from "@/components/film-strip";
import SpecSheet from "@/components/spec-sheet";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import { audioTiers, useCases, type AudioTier } from "@/lib/packages";
import { buildService, buildBreadcrumbList } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return audioTiers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tier = audioTiers.find((t) => t.slug === slug);
  if (!tier) return {};
  const title = `${tier.name} | After Dusk Events`;
  const description = `${tier.name}. ${tier.best}. 30 ft inflatable screen, BYO Content, private events in Southeast Michigan.`;
  return {
    title,
    description,
    alternates: { canonical: `/packages/${tier.slug}` },
    openGraph: {
      title,
      description,
      url: `https://afterduskevents.com/packages/${tier.slug}`,
    },
  };
}

const ADDON_SUGGESTIONS: Record<AudioTier["slug"], { heading: string; items: string[] }> = {
  "single-speaker": {
    heading: "Common add-ons for intimate setups",
    items: [
      "Popcorn machine rental",
      "Ambient string lighting",
      "Cornhole, can jam, ladder ball",
      "Photo area with backdrop",
    ],
  },
  "two-speakers": {
    heading: "Common add-ons for standard events",
    items: [
      "8-bit retro system + 4 wireless controllers",
      "YouTube karaoke + 2 wireless mics",
      "Popcorn machine rental",
      "Drone video and photos",
      "Photo area with backdrop",
    ],
  },
  "two-speakers-sub": {
    heading: "Common add-ons for fight nights and big-crowd events",
    items: [
      "YouTube karaoke + 2 wireless mics",
      "Drone video and photos",
      "Blacklight + Neon Kit",
      "Patio heater",
      "Early setup, late teardown",
    ],
  },
};

export default async function TierPage({ params }: Params) {
  const { slug } = await params;
  const tier = audioTiers.find((t) => t.slug === slug);
  if (!tier) notFound();

  const addons = ADDON_SUGGESTIONS[tier.slug];
  const otherTiers = audioTiers.filter((t) => t.slug !== tier.slug);
  const fitUseCases = useCases.filter((u) => u.recommendedTier === tier.slug);

  const tierNumber = audioTiers.findIndex((t) => t.slug === tier.slug) + 1;

  return (
    <>
      <SchemaMarkup
        id={`tier-${tier.slug}-schema`}
        data={[
          buildService(tier),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Setup", href: "/packages" },
            { name: tier.name, href: `/packages/${tier.slug}` },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1">
        {/* Hero — spec sheet header */}
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">
              Audio Tier № {String(tierNumber).padStart(2, "0")}
              {tier.popular && " · Most Popular"}
            </p>
            <h1
              className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none"
              style={{ viewTransitionName: `tier-name-${tier.slug}` }}
            >
              {tier.name}
            </h1>
            <p className="mt-8 font-body text-lg max-w-2xl">
              {tier.best}. 30 ft inflatable screen, water-ballast setup,
              bring your own content.
            </p>
            <div className="mt-10">
              <BulbButton
                href={`/contact?package=${encodeURIComponent(tier.name)}`}
              >
                Request a Quote
              </BulbButton>
            </div>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* Spec sheet — what's included */}
        <section
          className="bg-paper px-4 sm:px-10 py-20"
          aria-labelledby="includes-heading"
        >
          <div className="mx-auto max-w-3xl">
            <p className="serial text-tail mb-4">The Rig</p>
            <h2
              id="includes-heading"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] uppercase mb-10"
            >
              What&apos;s included.
            </h2>
            <SpecSheet
              rows={tier.includes.map((item, i) => ({
                label: `Item ${String(i + 1).padStart(2, "0")}`,
                value: item,
              }))}
            />
          </div>
        </section>

        {/* Fits these events */}
        {fitUseCases.length > 0 && (
          <section
            className="bg-ink text-paper px-4 sm:px-10 py-20"
            aria-labelledby="fits-heading"
          >
            <div className="mx-auto max-w-5xl">
              <p className="serial text-bulb mb-4">Fits These Events</p>
              <h2
                id="fits-heading"
                className="font-display text-[clamp(2.25rem,5vw,4rem)] uppercase mb-10"
              >
                Now showing.
              </h2>
              <ul className="divide-y-2 divide-paper/30 border-y-2 border-paper/30">
                {fitUseCases.map((uc) => (
                  <li key={uc.slug}>
                    <Link
                      href={`/packages#${uc.slug}`}
                      className="group grid grid-cols-[1fr_auto] gap-4 items-center py-5 hover:text-bulb transition-colors"
                    >
                      <div>
                        <p className="font-display text-2xl uppercase leading-none mb-1">
                          {uc.name}
                        </p>
                        <p className="font-mono text-sm opacity-70">{uc.desc}</p>
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
        )}

        {/* Add-on suggestions */}
        <section
          className="bg-paper px-4 sm:px-10 py-20"
          aria-labelledby="addons-heading"
        >
          <div className="mx-auto max-w-3xl">
            <p className="serial text-tail mb-4">The Concessions Stand</p>
            <h2
              id="addons-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-tight mb-4"
            >
              {addons.heading}.
            </h2>
            <p className="font-body text-concrete mb-8">
              All add-ons are quoted together with your setup. No set prices.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {addons.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 py-3 border-t border-ink/30 first:border-t-0 font-body"
                >
                  <span className="serial text-tail">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/add-ons"
              className="mt-10 inline-block serial border-b-2 border-ink pb-0.5 hover:text-tail hover:border-tail transition-colors"
            >
              Full add-on catalog →
            </Link>
          </div>
        </section>

        {/* Other tiers */}
        <section
          className="bg-ink text-paper px-4 sm:px-10 py-20"
          aria-labelledby="other-tiers-heading"
        >
          <div className="mx-auto max-w-5xl">
            <p className="serial text-bulb mb-4">Other Audio Tiers</p>
            <h2
              id="other-tiers-heading"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] uppercase mb-10"
            >
              Switch your reel.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {otherTiers.map((t, i) => (
                <TicketStub
                  key={t.slug}
                  tone="paper"
                  serial={`AT-${String(audioTiers.findIndex((x) => x.slug === t.slug) + 1).padStart(3, "0")}`}
                  stamp={t.popular ? "Most Popular" : undefined}
                >
                  <h3
                    className="font-display text-2xl uppercase leading-tight mb-3"
                    style={{ viewTransitionName: `tier-name-${t.slug}` }}
                  >
                    {t.name}
                  </h3>
                  <p className="font-mono text-sm text-concrete mb-5">
                    Best for: {t.best}
                  </p>
                  <Link
                    href={`/packages/${t.slug}`}
                    className="serial text-tail border-b-2 border-tail pb-0.5 hover:text-ink hover:border-ink transition-colors"
                  >
                    View Spec Sheet →
                  </Link>
                </TicketStub>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper px-4 sm:px-10 py-20">
          <div className="mx-auto max-w-3xl">
            <PrivateEventsNotice />
            <div className="text-center mt-12">
              <BulbButton
                href={`/contact?package=${encodeURIComponent(tier.name)}`}
              >
                Get a Quote
              </BulbButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
