/**
 * Side-by-side comparison of the audio tiers.
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
    values: audioTiers.map(() => "30 ft inflatable"),
  },
  {
    label: "Speakers",
    values: audioTiers.map((tier) => `${tier.speakerCount} ${tier.speakerCount === 1 ? "speaker" : "speakers"}`),
  },
  {
    label: "Subwoofers",
    values: audioTiers.map((tier) => tier.subwooferCount ? `${tier.subwooferCount} ${tier.subwooferCount === 1 ? "subwoofer" : "subwoofers"}` : false),
  },
  {
    label: "Water ballast setup",
    values: audioTiers.map(() => true),
  },
  {
    label: "BYO Content",
    values: audioTiers.map(() => true),
  },
  {
    label: "Best for",
    values: audioTiers.map((tier) => tier.best),
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
    <div className="overflow-x-auto border border-white/10 bg-charcoal/40 backdrop-blur-sm">
      <table className="w-full text-sm">
        <caption className="sr-only">Side-by-side comparison of audio tiers</caption>
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th className="px-5 py-4 text-caption text-steel w-[28%]">Feature</th>
            {audioTiers.map((tier) => (
              <th
                key={tier.slug}
                scope="col"
                className="px-5 py-4 text-center"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className={`font-display text-base tracking-wider ${tier.popular ? "text-ember" : "text-projector"}`}>
                    {tier.name}
                  </span>
                  {tier.popular && (
                    <span className="text-caption text-ember">
                      Most booked
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row) => (
            <tr key={row.label} className="border-b border-white/5 last:border-b-0">
              <th
                scope="row"
                className="px-5 py-4 text-silver font-medium text-left align-top"
              >
                {row.label}
              </th>
              {row.values.map((v, j) => (
                <td key={j} className="px-5 py-4 text-center align-top text-silver">
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
