/**
 * Side-by-side comparison of the three audio tiers.
 *
 * Single screen size (30 ft). The pricing axis is audio only. Every tier includes
 * the same 30 ft inflatable screen, water-ballast setup, and BYO Content rule.
 */
import { Check, X } from "lucide-react";
import { audioTiers } from "@/lib/packages";

type Row = {
  label: string;
  values: (string | boolean)[];
};

const featureRows: Row[] = [
  {
    label: "Screen",
    values: ["30 ft inflatable", "30 ft inflatable", "30 ft inflatable"],
  },
  {
    label: "Speakers",
    values: ["1 speaker", "2 speakers", "2 speakers"],
  },
  {
    label: "Death From Below subwoofer",
    values: [false, false, true],
  },
  {
    label: "Water ballast setup",
    values: [true, true, true],
  },
  {
    label: "BYO Content",
    values: [true, true, true],
  },
  {
    label: "Best for",
    values: [
      "Smaller backyards, intimate gatherings",
      "Standard outdoor events, most bookings",
      "Fight nights, bass-heavy music",
    ],
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
        <caption className="sr-only">Side-by-side comparison of audio tiers</caption>
        <thead>
          <tr className="border-b border-white/10 text-left bg-charcoal">
            <th className="px-5 py-4 text-steel font-semibold w-[28%]">Feature</th>
            {audioTiers.map((tier) => (
              <th
                key={tier.slug}
                scope="col"
                className={[
                  "px-5 py-4 text-center font-semibold",
                  tier.popular ? "text-ember" : "text-projector",
                ].join(" ")}
              >
                <div className="flex flex-col items-center gap-1">
                  <span>{tier.name}</span>
                  {tier.popular && (
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
