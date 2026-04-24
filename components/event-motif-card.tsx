import Link from "next/link";
import { audioTiers, useCases, type EventMotif, type UseCase } from "@/lib/packages";
import FilmFrame from "@/components/event-motifs/film-frame";
import CrtGlow from "@/components/event-motifs/crt-glow";
import StadiumBloom from "@/components/event-motifs/stadium-bloom";
import RingHalo from "@/components/event-motifs/ring-halo";
import ConfettiBeam from "@/components/event-motifs/confetti-beam";
import StringLights from "@/components/event-motifs/string-lights";

const MOTIF: Record<EventMotif, () => React.ReactElement> = {
  "film-frame": FilmFrame,
  "crt-glow": CrtGlow,
  "stadium-bloom": StadiumBloom,
  "ring-halo": RingHalo,
  "confetti-beam": ConfettiBeam,
  "string-lights": StringLights,
};

type Props = {
  event: UseCase;
  href: string;
  /** Optional override for the small CTA label. Defaults to "Start quote". */
  ctaLabel?: string;
};

/**
 * Replaces the old stock-photo event cards.
 * Motif SVG/CSS sits behind card content and intensifies on hover via
 * the `.motif-bg` / `.motif-center` / `.motif-corners` / `.motif-pulse`
 * selectors, scoped by the group-hover state on the Link.
 */
export default function EventMotifCard({ event, href, ctaLabel = "Start quote" }: Props) {
  const Motif = MOTIF[event.motif];
  const tier = audioTiers.find((t) => t.slug === event.recommendedTier);

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg border border-white/10 bg-charcoal/45 transition-colors hover:border-ember/45"
    >
      <div className="relative aspect-[3/2] border-b border-white/10 bg-screening">
        <Motif />
      </div>
      <div className="relative p-5">
        <p className="text-caption text-steel mb-3">{tier?.name}</p>
        <h3 className="font-display text-heading-lg leading-none tracking-wider text-projector">
          {event.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-silver">{event.desc}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ember">
          <span aria-hidden="true" className="block h-px w-6 bg-ember transition-[width] duration-300 group-hover:w-12" />
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}

export { useCases };
