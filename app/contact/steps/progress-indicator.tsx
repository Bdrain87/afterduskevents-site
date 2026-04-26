"use client";

type Props = {
  current: 1 | 2 | 3;
  labels?: [string, string, string];
};

const DEFAULT_LABELS: [string, string, string] = ["Event", "Package", "Contact"];

/**
 * Filmstrip-style step indicator. Each step is a film frame with sprocket
 * holes on the top and bottom edges. Active frame lights up in ember and
 * glows; completed frames stay ember-outlined. Upcoming frames are dim.
 * The "strip" itself is a continuous dark band behind all frames.
 */
export default function ProgressIndicator({ current, labels = DEFAULT_LABELS }: Props) {
  return (
    <div className="mb-10 min-w-0 max-w-full">
      <ol
        className="relative flex max-w-full items-stretch gap-1.5 overflow-hidden rounded-lg border border-white/10 bg-charcoal/70 px-2 py-3 sm:gap-3 sm:px-3"
        aria-label="Form progress"
      >
        {labels.map((label, i) => {
          const step = (i + 1) as 1 | 2 | 3;
          const isActive = step === current;
          const isComplete = step < current;
          return (
            <li
              key={label}
              className="relative flex min-w-0 flex-1 flex-col items-center justify-center"
              aria-current={isActive ? "step" : undefined}
            >
              {/* Sprockets top */}
              <span className="absolute inset-x-2 top-0 flex justify-between sm:inset-x-3" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, j) => (
                  <span
                    key={`t-${j}`}
                    className={`block h-1 w-1.5 rounded-sm transition-colors duration-200 ${
                      isActive || isComplete ? "bg-ember/70" : "bg-white/10"
                    }`}
                  />
                ))}
              </span>
              {/* Frame body */}
              <span
                className={[
                  "flex h-11 w-full min-w-0 max-w-full flex-col items-center justify-center gap-0.5 rounded-lg border text-xs transition-all sm:h-12",
                  isActive
                    ? "border-ember bg-ember/10 text-ember shadow-[0_0_24px_rgba(221,84,84,0.35)]"
                    : isComplete
                      ? "border-ember/60 bg-screening/60 text-ember/90"
                      : "border-white/10 bg-screening/40 text-steel",
                ].join(" ")}
              >
                <span className="font-display text-sm leading-none tracking-[0.12em] sm:tracking-[0.2em]">
                  {isComplete ? "✓" : `0${step}`}
                </span>
                <span className="hidden max-w-full truncate text-[10px] uppercase tracking-[0.14em] sm:block">
                  {label}
                </span>
              </span>
              {/* Sprockets bottom */}
              <span className="absolute inset-x-2 bottom-0 flex justify-between sm:inset-x-3" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, j) => (
                  <span
                    key={`b-${j}`}
                    className={`block h-1 w-1.5 rounded-sm transition-colors duration-200 ${
                      isActive || isComplete ? "bg-ember/70" : "bg-white/10"
                    }`}
                  />
                ))}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="text-mono text-steel mt-4">
        Reel <span className="text-ember font-semibold">{current}</span> of 3
      </p>
    </div>
  );
}
