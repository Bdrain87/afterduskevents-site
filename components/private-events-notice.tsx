export function PrivateEventsNotice() {
  return (
    <details className="group min-w-0 overflow-hidden rounded-lg border border-white/10 border-l-2 border-l-oxblood/60 bg-charcoal/40 px-4 py-4 text-sm text-silver backdrop-blur-sm sm:px-5">
      <summary className="flex min-w-0 cursor-pointer list-none items-center justify-between gap-3 marker:hidden sm:gap-4">
        <span className="min-w-0 break-words font-semibold leading-snug text-ember">
          Why we only do private events
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-xs text-ember transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="mt-3 break-words leading-relaxed">
        All bookings are for private, non-ticketed, non-admission-charged gatherings. We do not
        support public or ticketed screenings. Our Service Agreement and Private Event
        Acknowledgment require this.
      </p>
    </details>
  );
}
