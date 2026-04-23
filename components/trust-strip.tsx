import { Shield, MapPin, FileCheck } from "lucide-react";
import NumberTicker from "@/components/number-ticker";
import { testimonialCount } from "@/lib/testimonials";

type Props = {
  /** Override events-completed count when known. Pass the real cumulative count; strip hides the count line when 0. */
  eventsCompleted?: number;
  className?: string;
};

export default function TrustStrip({ eventsCompleted, className }: Props) {
  // Show a real count or nothing. No fake floor — the {count > 0 && ...} guard below hides the line when 0.
  const count = eventsCompleted ?? testimonialCount();

  return (
    <div
      className={[
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em]",
        className ?? "",
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-2 text-steel">
        <Shield size={14} className="text-ember" aria-hidden="true" />
        Veteran-owned
      </span>
      <span className="hidden sm:inline-block text-white/15" aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-2 text-steel">
        <FileCheck size={14} className="text-ember" aria-hidden="true" />
        Fully Insured
      </span>
      <span className="hidden sm:inline-block text-white/15" aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-2 text-steel">
        <MapPin size={14} className="text-ember" aria-hidden="true" />
        SE Michigan
      </span>
      {count > 0 && (
        <>
          <span className="hidden sm:inline-block text-white/15" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-2 text-projector">
            <NumberTicker value={count} format={(n) => `${n}+`} className="text-projector" />
            <span className="text-steel font-normal normal-case tracking-normal text-[11px]">events booked</span>
          </span>
        </>
      )}
    </div>
  );
}
