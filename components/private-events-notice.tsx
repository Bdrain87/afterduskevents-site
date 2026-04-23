export function PrivateEventsNotice() {
  return (
    <details className="group border-l-2 border-oxblood/60 bg-charcoal/40 backdrop-blur-sm px-5 py-4 text-sm text-silver">
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
