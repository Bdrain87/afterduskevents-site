import Link from "next/link";
import type { SVGProps } from "react";
import {
  Clapperboard,
  Gamepad2,
  GraduationCap,
  PartyPopper,
  Trophy,
} from "lucide-react";
import { audioTiers, useCases, type UseCase } from "@/lib/packages";

type Props = {
  event: UseCase;
  href: string;
  /** Optional override for the small CTA label. Defaults to "Start quote". */
  ctaLabel?: string;
};

function BoxingGloveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.48901 17.7273H18.3556M8.48901 17.7273V21H18.3556V17.7273M8.48901 17.7273C5.20016 15.5455 3.55573 10.0909 4.10387 8.45455C4.54239 7.14545 6.47916 7.54545 7.39273 7.90909C7.39273 4.09091 9.03715 3 13.4223 3C17.8074 3 20 4.09091 20 9.54545C20 13.9091 18.9037 16.8182 18.3556 17.7273"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.39282 7.90909C7.75825 8.27272 8.81799 9 10.1335 9C11.4491 9 13.9705 9 15.0668 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.39282 7.90909C7.39282 11.7273 9.03725 12.2727 10.1335 12.2727"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const eventIcons = {
  "movie-night": Clapperboard,
  gaming: Gamepad2,
  sports: Trophy,
  fights: BoxingGloveIcon,
  graduation: GraduationCap,
  celebration: PartyPopper,
} as const;

function EventScene({ slug }: { slug: UseCase["slug"] }) {
  const Icon = eventIcons[slug];
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(221,84,84,0.22),transparent_42%),linear-gradient(135deg,#161616_0%,#0b0b0b_62%,#180d0d_100%)]"
    >
      <div className="absolute inset-6 rounded-lg border border-white/8" />
      <div className="absolute inset-x-10 top-9 h-px bg-white/8" />
      <div className="absolute inset-x-10 bottom-9 h-px bg-white/8" />
      <div className="absolute bottom-7 h-px w-28 bg-ember/70" />
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-ember/35 bg-black/30 shadow-[0_0_50px_rgba(221,84,84,0.25)] transition-transform duration-300 group-hover:scale-[1.03]">
        <Icon
          className="h-16 w-16 text-projector"
          strokeWidth={1.75}
        />
      </div>
    </div>
  );
}

export default function EventMotifCard({ event, href, ctaLabel = "Start quote" }: Props) {
  const tier = audioTiers.find((t) => t.slug === event.recommendedTier);

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg border border-white/10 bg-[#101010] transition-all duration-300 hover:border-ember/45 hover:bg-charcoal/80 hover:shadow-[0_24px_60px_rgba(0,0,0,0.36)]"
    >
      <div className="relative aspect-[16/10] border-b border-white/10 bg-screening">
        <EventScene slug={event.slug} />
      </div>
      <div className="relative p-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-steel">
          {tier?.name}
        </p>
        <h3 className="font-heading text-heading-md text-projector">
          {event.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-silver">{event.desc}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          <span aria-hidden="true" className="block h-px w-6 bg-ember transition-[width] duration-300 group-hover:w-12" />
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}

export { useCases };
