"use client";

type Props = {
  current: 1 | 2 | 3;
  labels?: [string, string, string];
};

const DEFAULT_LABELS: [string, string, string] = ["Event", "Package", "Contact"];

export default function ProgressIndicator({ current, labels = DEFAULT_LABELS }: Props) {
  return (
    <div className="mb-8">
      <ol className="flex items-center justify-between gap-2" aria-label="Form progress">
        {labels.map((label, i) => {
          const step = (i + 1) as 1 | 2 | 3;
          const isActive = step === current;
          const isComplete = step < current;
          return (
            <li key={label} className="flex items-center gap-2 flex-1">
              <span
                className={[
                  "flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold shrink-0 transition-colors",
                  isActive
                    ? "bg-oxblood text-projector ring-2 ring-oxblood/40"
                    : isComplete
                    ? "bg-oxblood text-projector"
                    : "bg-charcoal text-steel border border-white/10",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? "✓" : step}
              </span>
              <span
                className={[
                  "text-xs uppercase tracking-wider font-medium hidden sm:inline-block",
                  isActive ? "text-projector" : isComplete ? "text-projector" : "text-steel",
                ].join(" ")}
              >
                {label}
              </span>
              {step < 3 && (
                <span
                  className={[
                    "flex-1 h-px",
                    isComplete ? "bg-oxblood" : "bg-white/10",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-steel text-xs mt-3 text-center">
        Step <span className="text-projector font-semibold">{current}</span> of 3
      </p>
    </div>
  );
}
