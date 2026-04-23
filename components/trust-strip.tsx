import { Shield, MapPin, FileCheck } from "lucide-react";

type Props = {
  className?: string;
};

export default function TrustStrip({ className }: Props) {
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
    </div>
  );
}
