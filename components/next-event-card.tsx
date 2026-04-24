import Link from "next/link";
import { Calendar } from "lucide-react";
import { getUpcomingOpenDates, formatOpenDate } from "@/lib/availability";

/**
 * Shows the next open booking dates as pills that pre-fill the contact form.
 * Renders nothing when the openDates array is empty, so a pre-launch site
 * doesn't lie about availability.
 */
export default function NextEventCard() {
  const upcoming = getUpcomingOpenDates(3);
  if (upcoming.length === 0) return null;

  return (
    <section
      className="relative z-10 border-y border-oxblood/20 bg-charcoal/40 backdrop-blur-sm"
      aria-labelledby="next-open-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p
              id="next-open-heading"
              className="text-ember text-[11px] tracking-[0.25em] uppercase flex items-center gap-2"
            >
              <Calendar size={14} aria-hidden="true" />
              Next open dates
            </p>
            <p className="text-steel text-sm mt-1">
              Tap a date to start your quote with it pre-filled.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {upcoming.map((d) => (
              <li key={d.date}>
                <Link
                  href={`/contact?eventDate=${encodeURIComponent(d.date)}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-ember bg-screening/60 hover:bg-oxblood/20 transition-colors px-4 py-2 text-sm"
                >
                  <span aria-hidden="true" className="block h-1 w-1 rounded-full bg-ember transition-transform duration-300 group-hover:scale-150" />
                  <span className="text-projector font-medium">{formatOpenDate(d.date)}</span>
                  {d.note && <span className="text-steel text-xs">· {d.note}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
