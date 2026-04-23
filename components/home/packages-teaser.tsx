import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { audioTiers } from "@/lib/packages";

// Visual LED stack: 5 bars lit for two-speakers-sub, 3 for two-speakers,
// 1 for single-speaker. Unlit bars render at 0.15 alpha.
const ledsByTier: Record<string, number> = {
  "single-speaker": 1,
  "two-speakers": 3,
  "two-speakers-sub": 5,
};

function LedStack({ lit }: { lit: number }) {
  return (
    <div aria-hidden="true" className="flex items-end gap-1 h-16 mb-5">
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < lit;
        return (
          <span
            key={i}
            className="w-2.5 rounded-[2px] transition-colors"
            style={{
              height: `${20 + i * 12}%`,
              background: on ? "#DD5454" : "rgba(245, 241, 236, 0.08)",
              boxShadow: on ? "0 0 10px rgba(221, 84, 84, 0.55)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

export default function PackagesTeaser() {
  return (
    <section
      aria-labelledby="packages-teaser-heading"
      className="relative bg-charcoal/40 backdrop-blur-sm border-y border-white/8 px-6 sm:px-10 lg:px-16"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="text-caption text-ember mb-3">The setup</p>
            <h2
              id="packages-teaser-heading"
              className="font-display text-projector text-display-lg tracking-wider leading-none"
            >
              ONE SCREEN. THREE WAYS TO HEAR IT.
            </h2>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-ember text-sm font-medium hover:text-projector transition-colors group"
          >
            Compare all three
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audioTiers.map((tier) => {
            const lit = ledsByTier[tier.slug] ?? 1;
            return (
              <Link
                key={tier.slug}
                href={`/packages#tier-${tier.slug}`}
                className="group relative block border border-white/10 hover:border-ember/40 bg-screening/60 p-6 transition-colors duration-200"
              >
                {tier.popular && (
                  <span className="absolute top-4 right-4 text-ember text-[10px] font-semibold tracking-[0.2em] uppercase border border-ember/40 px-2 py-0.5">
                    Most booked
                  </span>
                )}
                <LedStack lit={lit} />
                <h3 className="font-display text-heading-lg text-projector tracking-wider leading-tight mb-2">
                  {tier.name}
                </h3>
                <p className="text-silver text-sm leading-relaxed mb-6 max-w-[32ch]">
                  Best for {tier.best.toLowerCase()}.
                </p>
                <span className="inline-flex items-center gap-1.5 text-ember text-xs tracking-[0.2em] uppercase">
                  See setup
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
