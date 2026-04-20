import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Outdoor cinema packages for every event -- backyard movie nights, weddings, corporate events, sports watch parties, gaming nights, and more. Canton, MI.",
  alternates: { canonical: "/packages" },
};

const packages = [
  {
    name: "Basic Cinema",
    range: "$950 to $1,250",
    highlights: [
      "30-foot inflatable screen",
      "Projector",
      "Stereo audio",
      "Essential lighting",
      "Professional setup and teardown",
    ],
  },
  {
    name: "Standard Cinema",
    range: "$1,300 to $1,600",
    highlights: [
      "Everything in Basic",
      "Broader speaker array",
      "Stronger lighting package",
      "Operator station",
      "Internet support for streaming",
    ],
  },
  {
    name: "Premium Cinema",
    range: "$1,950 to $2,450",
    featured: true,
    highlights: [
      "Everything in Standard",
      "Subwoofers included",
      "Enhanced lighting",
      "Full power independence (generator)",
      "Concessions option available",
    ],
  },
  {
    name: "Gaming Night",
    range: "$1,600 to $2,100",
    highlights: [
      "Large-screen console or retro gaming",
      "Controllers and peripherals",
      "Live display support",
      "Multiplayer setup available",
    ],
  },
  {
    name: "Sports Watch Party",
    range: "$1,850 to $2,250",
    highlights: [
      "Large screen",
      "Live-stream support",
      "Lounge-style environment",
      "Wireless audio",
    ],
  },
  {
    name: "Corporate Event",
    range: "$2,500 to $3,500",
    highlights: [
      "Premium Cinema base",
      "Wireless microphones",
      "Mixer and presentation support",
      "Branded operator station",
    ],
  },
  {
    name: "Wedding",
    range: "$2,000 to $2,900",
    highlights: [
      "Premium Cinema base",
      "Warm cinematic lighting",
      "Speech support",
      "Coordinated arrival and setup",
    ],
  },
];

const addOns = [
  { name: "Popcorn service", desc: "Fresh popped, bagged or open bucket -- priced per event." },
  { name: "Extended runtime", desc: "Add hours to any package. Quoted with your package." },
  { name: "Branded signage", desc: "Custom signage at the operator station or screen surround." },
  { name: "Secondary display", desc: "Second monitor or TV for overflow seating or a greenroom." },
];

export default function PackagesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-charcoal">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl sm:text-5xl text-brand-white mb-4">
              Packages and pricing
            </h1>
            <p className="text-brand-gray text-lg leading-relaxed">
              Every package includes professional setup, full systems test before your guests arrive,
              and teardown when the night is done. Pricing varies by event size and location.
            </p>
          </div>
        </section>

        {/* Package cards */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Package options">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-lg p-8 flex flex-col ${
                    pkg.featured
                      ? "bg-brand-charcoal ring-2 ring-brand-red"
                      : "bg-brand-charcoal border border-white/10"
                  }`}
                >
                  {pkg.featured && (
                    <span className="inline-flex self-start mb-4 bg-brand-red text-brand-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most popular
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <h2 className="font-heading text-2xl text-brand-white">{pkg.name}</h2>
                    <span className="shrink-0 bg-brand-red/10 text-brand-red text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {pkg.range}
                    </span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-brand-gray text-sm">
                        <Check size={15} className="text-brand-green mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`inline-flex items-center justify-center rounded px-5 py-3 text-sm font-semibold transition-colors ${
                      pkg.featured
                        ? "bg-brand-red text-brand-white hover:bg-brand-red/90"
                        : "border border-white/20 text-brand-white hover:border-white/50 hover:bg-white/5"
                    }`}
                  >
                    Request this Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-charcoal" aria-labelledby="addons-heading">
          <div className="mx-auto max-w-7xl">
            <h2
              id="addons-heading"
              className="font-heading text-2xl sm:text-3xl text-brand-white mb-2"
            >
              Add-ons
            </h2>
            <p className="text-brand-gray mb-10 text-sm">
              Priced per event and quoted alongside your package.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {addOns.map((addon) => (
                <div key={addon.name} className="bg-brand-black rounded-lg p-6 border border-white/10">
                  <h3 className="font-heading text-base text-brand-white mb-2">{addon.name}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl text-brand-white mb-4">
              Not sure which package fits?
            </h2>
            <p className="text-brand-gray mb-8 leading-relaxed">
              Tell us about your event and we will recommend the right setup and send a tailored quote.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded px-8 py-4 text-base font-semibold text-brand-white bg-brand-red hover:bg-brand-red/90 transition-colors"
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
