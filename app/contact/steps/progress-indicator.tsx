"use client";

type Props = {
  current: 1 | 2 | 3;
  labels?: [string, string, string];
};

const DEFAULT_LABELS: [string, string, string] = ["Event", "Package", "Contact"];

export default function ProgressIndicator({ current, labels = DEFAULT_LABELS }: Props) {
  return (
    <div className="mb-10">
      <ol className="flex items-center gap-2" aria-label="Form progress">
        {labels.map((label, i) => {
          const step = (i + 1) as 1 | 2 | 3;
          const isActive = step === current;
          const isComplete = step < current;
          return (
            <li key={label} className="flex items-center gap-3 flex-1 last:flex-none">
              <span
                className={[
                  "flex items-center justify-center h-8 w-8 text-xs font-semibold shrink-0 transition-colors border",
                  isActive
                    ? "bg-ember text-screening border-ember"
                    : isComplete
                      ? "bg-ember/90 text-screening border-ember/90"
                      : "bg-transparent text-steel border-white/15",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? "✓" : step}
              </span>
              <span
                className={[
                  "text-caption hidden sm:inline-block",
                  isActive ? "text-ember" : isComplete ? "text-silver" : "text-steel",
                ].join(" ")}
              >
                {label}
              </span>
              {step < 3 && (
                <span
                  className={[
                    "flex-1 h-px transition-colors duration-500",
                    isComplete ? "bg-ember" : "bg-white/10",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-mono text-steel mt-4">
        Step <span className="text-ember font-semibold">{current}</span> of 3
      </p>
    </div>
  );
}
