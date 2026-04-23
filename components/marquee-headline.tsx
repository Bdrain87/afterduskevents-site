/**
 * Marquee letterboard — each letter in its own cell with bulb-edge
 * borders. Accepts a string of words; words are split to preserve spacing.
 * Rendered server-side; the cell styling lives in globals.css.
 */
type Props = {
  children: string;
  className?: string;
  cellSize?: "lg" | "xl" | "2xl";
};

export default function MarqueeHeadline({ children, className = "", cellSize = "2xl" }: Props) {
  const sizeClass =
    cellSize === "2xl"
      ? "text-[clamp(2.5rem,9vw,8rem)]"
      : cellSize === "xl"
        ? "text-[clamp(2rem,6vw,5.5rem)]"
        : "text-[clamp(1.5rem,4vw,3.5rem)]";

  const words = children.split(/\s+/);

  return (
    <div
      role="heading"
      aria-level={1}
      aria-label={children}
      className={`font-display leading-none tracking-tight ${sizeClass} ${className}`}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex flex-wrap mr-2 last:mr-0">
          {[...word].map((char, ci) => (
            <span key={ci} className="marquee-cell">
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
