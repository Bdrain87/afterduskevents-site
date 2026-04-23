import type { ReactNode } from "react";

type Props = {
  serial?: string;
  stamp?: string;
  className?: string;
  children: ReactNode;
  tone?: "ink" | "paper";
};

/**
 * Ticket stub — perforated top/bottom edges, serial label, optional
 * diagonal stamp overlay. Used for packages, CTA callouts, Blake quotes.
 */
export default function TicketStub({
  serial,
  stamp,
  className = "",
  children,
  tone = "paper",
}: Props) {
  const colors =
    tone === "ink"
      ? "bg-ink text-paper"
      : "bg-paper text-ink";

  return (
    <article className={`relative ${className}`}>
      <div
        className="perf-top"
        style={{
          height: 10,
          ["--perf-color" as string]:
            tone === "ink" ? "#F0E5D0" : "#0E0A08",
        }}
        aria-hidden="true"
      />
      <div className={`relative border-x-2 border-ink px-6 py-7 ${colors}`}>
        {stamp && <span className="diagonal-stamp">{stamp}</span>}
        {serial && (
          <div className="serial mb-4 opacity-70">
            №&nbsp;{serial}
          </div>
        )}
        {children}
      </div>
      <div
        className="perf-bottom"
        style={{
          height: 10,
          ["--perf-color" as string]:
            tone === "ink" ? "#F0E5D0" : "#0E0A08",
        }}
        aria-hidden="true"
      />
    </article>
  );
}
