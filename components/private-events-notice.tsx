export function PrivateEventsNotice() {
  return (
    <details className="group rounded-lg border border-white/10 border-l-2 border-l-oxblood/60 bg-charcoal/40 px-5 py-4 text-sm text-silver backdrop-blur-sm">
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none marker:hidden">
        <span className="text-ember font-semibold">Why we only do private events</span>
        <span
          aria-hidden="true"
          className="text-ember text-xs transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="mt-3 leading-relaxed">
        All bookings are for private, non-ticketed, non-admission-charged gatherings. We do not
        support public or ticketed screenings. Our Service Agreement and Private Event
        Acknowledgment require this.
      </p>
    </details>
  );
}
