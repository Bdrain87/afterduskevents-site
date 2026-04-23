"use client";

type Props = {
  current: 1 | 2 | 3;
  labels?: [string, string, string];
};

const DEFAULT_LABELS: [string, string, string] = ["Basics", "Rig", "Contact"];

export default function ProgressIndicator({ current, labels = DEFAULT_LABELS }: Props) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <p className="serial text-ink">
        Reel <span className="text-tail">{current}</span> of 3
      </p>
      <ol className="flex items-center gap-2 font-mono text-xs" aria-label="Form progress">
        {labels.map((label, i) => {
          const step = (i + 1) as 1 | 2 | 3;
          const isActive = step === current;
          const isComplete = step < current;
          return (
            <li
              key={label}
              className={[
                "px-2 py-1 border-2 uppercase tracking-wider",
                isActive
                  ? "bg-ink text-paper border-ink"
                  : isComplete
                    ? "bg-bulb text-ink border-ink"
                    : "bg-transparent text-concrete border-concrete",
              ].join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              {label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
