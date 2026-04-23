import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import { audioTiers, useCases, type AudioTier } from "@/lib/packages";
import { buildService, buildBreadcrumbList } from "@/lib/schema";
import { Check, ArrowRight } from "lucide-react";
import Balancer from "react-wrap-balancer";
import PageAtmosphere from "@/components/atmosphere/page-atmosphere";

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
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal overflow-hidden">
          <PageAtmosphere variant={tier.popular ? "ember" : "dusk"} />
          <div className="relative z-10 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <FadeIn>
                <p className="text-ember text-xs tracking-[0.25em] uppercase mb-3">Audio tier</p>
                <h1 className="font-display text-5xl sm:text-6xl text-projector tracking-wider leading-none mb-4">
                  <Balancer>{tier.name}</Balancer>
                </h1>
                <span className="oxblood-rule" />
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-steel text-lg leading-relaxed mt-6">
                  {tier.best}. 30 ft inflatable screen, water ballast setup, bring your own content.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <MagneticButton className="inline-flex mt-8">
                  <Link
                    href={`/contact?package=${encodeURIComponent(tier.name)}`}
                    className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                    style={{ viewTransitionName: `tier-cta-${tier.slug}` }}
                  >
                    Request a Quote
                  </Link>
                </MagneticButton>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-screening">
                <Image
                  src="/images/setup/30ft-screen-studio.avif"
                  alt="30 ft inflatable outdoor cinema screen, studio render"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover dusk-grade"
                  style={{ viewTransitionName: `tier-image-${tier.slug}` }}
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Includes */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="includes-heading">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 id="includes-heading" className="font-editorial text-3xl sm:text-4xl text-projector mb-6">
                What&apos;s included.
              </h2>
            </FadeIn>
            <ul className="space-y-3">
              {tier.includes.map((item, i) => (
                <FadeIn key={item} delay={i * 0.04}>
                  <li className="flex items-start gap-3 text-projector text-base">
                    <Check size={18} className="text-ember mt-1 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>

        {/* Fits these events */}
        {fitUseCases.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="fits-heading">
            <div className="mx-auto max-w-5xl">
              <FadeIn>
                <h2 id="fits-heading" className="font-editorial text-3xl sm:text-4xl text-projector mb-6">
                  Fits these events.
                </h2>
              </FadeIn>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fitUseCases.map((uc) => (
                  <li key={uc.slug}>
                    <Link
                      href={`/packages#${uc.slug}`}
                      className="group flex items-start justify-between gap-3 rounded-lg p-5 bg-screening border border-white/10 hover:border-oxblood/40 transition-colors"
                    >
                      <div>
                        <p className="font-heading text-base text-projector">{uc.name}</p>
                        <p className="text-steel text-xs mt-1">{uc.desc}</p>
                      </div>
                      <ArrowRight size={16} className="text-ember mt-0.5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Add-on suggestions */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="addons-heading">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 id="addons-heading" className="font-editorial text-3xl sm:text-4xl text-projector mb-3">
                {addons.heading}.
              </h2>
              <p className="text-steel text-sm mb-6">
                All add-ons are quoted together with your setup. No set prices.
              </p>
            </FadeIn>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {addons.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-steel text-sm">
                  <Check size={14} className="text-ember mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/add-ons"
              className="mt-6 inline-flex items-center gap-2 text-ember underline-offset-4 hover:underline text-sm"
            >
              Full add-on catalog
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Other tiers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="other-tiers-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="other-tiers-heading" className="font-editorial text-3xl sm:text-4xl text-projector mb-6">
                Other audio tiers.
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherTiers.map((t) => (
                <Link
                  key={t.slug}
                  href={`/packages/${t.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-lg p-5 bg-screening border border-white/10 hover:border-oxblood/40 transition-colors"
                >
                  <div>
                    <p
                      className="font-heading text-base text-projector"
                      style={{ viewTransitionName: `tier-name-${t.slug}` }}
                    >
                      {t.name}
                    </p>
                    <p className="text-steel text-xs mt-1">Best for: {t.best}</p>
                  </div>
                  <ArrowRight size={16} className="text-ember mt-0.5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <PrivateEventsNotice />
            <div className="text-center pt-4">
              <MagneticButton className="inline-flex">
                <Link
                  href={`/contact?package=${encodeURIComponent(tier.name)}`}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a Quote
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
