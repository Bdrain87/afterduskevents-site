import type { ReactNode } from "react";

type Row = {
  label: string;
  value: ReactNode;
  muted?: boolean;
};

type Props = {
  rows: Row[];
  className?: string;
};

/**
 * Spec sheet — menu-style two-column list with dot leaders. Label left,
 * value right, dotted line connecting them. Mono type for the value.
 */
export default function SpecSheet({ rows, className = "" }: Props) {
  return (
    <dl className={`w-full ${className}`}>
      {rows.map((row, i) => (
        <div
          key={i}
          className="leader py-3 border-t-2 border-ink first:border-t-0"
        >
          <dt className="font-display text-xl tracking-wide uppercase">
            {row.label}
          </dt>
          <span className="leader-line" aria-hidden="true" />
          <dd
            className={`font-mono text-sm ${row.muted ? "text-concrete" : ""}`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
