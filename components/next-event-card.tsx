import { Calendar } from "lucide-react";
import { getUpcomingOpenDates } from "@/lib/availability";
import NextEventPills from "./next-event-pills";

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
      className="relative z-10 border-y border-oxblood/35 bg-charcoal/40 backdrop-blur-sm"
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
          <NextEventPills dates={upcoming} />
        </div>
      </div>
    </section>
  );
}
