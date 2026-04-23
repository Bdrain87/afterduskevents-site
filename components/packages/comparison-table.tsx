/**
 * Side-by-side comparison of core packages.
 *
 * Research-backed: pages with 3+ comparison tables earn ~25-34% more AI citations
 * (Frase / Profound 2026). Comparison tables also satisfy the "online estimates"
 * filter Google rolled out in local search.
 */
import { Check, X } from "lucide-react";
import { corePackages } from "@/lib/packages";

type Row = {
  label: string;
  values: (string | boolean)[];
};

const featureRows: Row[] = [
  {
    label: "Screen size",
    values: ["20 ft inflatable", "30 ft inflatable", "120″ Da-Lite fast-fold"],
  },
  {
    label: "Projector",
    values: ["4K laser (BenQ LU930)", "4K laser", "4K laser"],
  },
  {
    label: "Audio zones",
    values: ["2 Soundboks 4", "4 Soundboks 4 (2 zones)", "2 Soundboks 4"],
  },
  {
    label: "Subwoofer (DFB MK2)",
    values: [false, true, false],
  },
  {
    label: "Runtime",
    values: ["3 hours", "4 hours", "3 hours"],
  },
  {
    label: "Crowd coverage",
    values: ["Up to ~75", "Up to ~250", "Indoor venue capacity"],
  },
  {
    label: "Setup",
    values: ["Water ballast", "Water ballast", "Indoor / no ballast"],
  },
  {
    label: "BYO Content",
    values: [true, true, true],
  },
  {
    label: "Honda generator + EcoFlow",
    values: [true, true, false],
  },
  {
    label: "Starlink Mini",
    values: [true, true, true],
  },
  {
    label: "Weather-proof",
    values: [false, false, true],
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center text-ember">
        <Check size={16} aria-label="Included" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-steel/60">
        <X size={16} aria-label="Not included" />
      </span>
    );
  }
  return <span className="text-projector text-sm">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <caption className="sr-only">Side-by-side comparison of core cinema packages</caption>
        <thead>
          <tr className="border-b border-white/10 text-left bg-charcoal">
            <th className="px-5 py-4 text-steel font-semibold w-[28%]">Feature</th>
            {corePackages.map((pkg) => (
              <th
                key={pkg.slug}
                scope="col"
                className={[
                  "px-5 py-4 text-center font-semibold",
                  pkg.popular ? "text-ember" : "text-projector",
                ].join(" ")}
              >
                <div className="flex flex-col items-center gap-1">
                  <span>{pkg.name}</span>
                  {pkg.popular && (
                    <span className="text-[10px] uppercase tracking-wider bg-oxblood text-projector px-2 py-0.5 rounded-full font-bold">
                      Most popular
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-white/5 ${i % 2 === 1 ? "bg-charcoal/40" : ""}`}
            >
              <th
                scope="row"
                className="px-5 py-3.5 text-steel font-medium text-left align-top"
              >
                {row.label}
              </th>
              {row.values.map((v, j) => (
                <td key={j} className="px-5 py-3.5 text-center align-top">
                  <Cell value={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
