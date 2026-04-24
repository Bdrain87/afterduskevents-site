import Link from "next/link";
import Marquee from "@/components/marquee";
import { ArrowRight } from "lucide-react";

// Event card placeholders. Real photography will replace the `bg` gradients
// with <Image> referenced by `shot`. Filenames intentionally descriptive so
// they can be dropped in without renaming.
const events = [
  {
    slug: "movie-night",
    name: "Movie Night",
    tagline: "Blankets in a row, 30 feet of story.",
    shot: "/images/events/movie-night-crowd-silhouettes-4x5.jpg", // TBD
    bg: "linear-gradient(180deg, rgba(221,84,84,0.15) 0%, #0a0a0a 50%, #050508 100%)",
  },
  {
    slug: "sports",
    name: "Sports Watch",
    tagline: "Game day, bigger than any bar.",
    shot: "/images/events/sports-beer-stadium-glow-4x5.jpg",
    bg: "linear-gradient(180deg, rgba(107,31,31,0.3) 0%, #1a0f08 60%, #050505 100%)",
  },
  {
    slug: "fights",
    name: "Fight Night",
    tagline: "UFC, boxing, WWE. Built for the bass.",
    shot: "/images/events/fight-glove-oxblood-bloom-4x5.jpg",
    bg: "radial-gradient(ellipse at 30% 40%, rgba(107,31,31,0.5) 0%, #0a0a0a 65%)",
  },
  {
    slug: "gaming",
    name: "Gaming Night",
    tagline: "Retro controller, 4 players, a wall.",
    shot: "/images/events/gaming-controller-screen-glow-4x5.jpg",
    bg: "linear-gradient(180deg, rgba(74,14,14,0.3) 0%, #0f0814 55%, #050508 100%)",
  },
  {
    slug: "graduation",
    name: "Graduation",
    tagline: "The photo reel, forty feet wide.",
    shot: "/images/events/graduation-reel-smiling-grad-4x5.jpg",
    bg: "linear-gradient(180deg, rgba(221,84,84,0.18) 0%, #140b0b 60%, #050505 100%)",
  },
  {
    slug: "celebration",
    name: "Get-together",
    tagline: "Birthday candles, screen glow behind.",
    shot: "/images/events/birthday-candles-screen-behind-4x5.jpg",
    bg: "linear-gradient(180deg, rgba(221,84,84,0.22) 0%, #140808 50%, #050505 100%)",
  },
];

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <Link
      href={`/contact?useCase=${event.slug}`}
      className="group relative block shrink-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{
        width: 320,
        height: 420,
        background: event.bg,
      }}
      aria-label={`Inquire about a ${event.name.toLowerCase()}`}
    >
      {/* Dark gradient over bottom 60% so the label reads */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(5,5,8,0.85) 100%)",
        }}
      />
      {/* Thin ember hairline on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 border border-transparent group-hover:border-ember/40 transition-colors duration-300"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="font-display text-projector text-heading-lg sm:text-display-md tracking-wider leading-none mb-3">
          {event.name}
        </h3>
        <p className="text-silver text-[13px] leading-relaxed max-w-[26ch] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {event.tagline}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-ember text-[11px] tracking-[0.2em] uppercase">
          Inquire
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function EventTypesMarquee() {
  return (
    <section
      aria-labelledby="events-marquee-heading"
      className="relative overflow-hidden"
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-caption text-ember mb-3">Private events</p>
          <h2 id="events-marquee-heading" className="font-display text-projector text-display-lg tracking-wider leading-none">
            ONE SCREEN. MANY WAYS TO USE IT.
          </h2>
        </div>
        <Link
          href="/packages"
          className="inline-flex items-center gap-1.5 text-ember text-sm font-medium hover:text-projector transition-colors group"
        >
          Pick your setup
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>

      <Marquee pauseOnHover repeat={3} className="[--duration:50s] [--gap:1.75rem] cursor-grab">
        {events.map((e) => (
          <EventCard key={e.slug} event={e} />
        ))}
      </Marquee>
    </section>
  );
}
