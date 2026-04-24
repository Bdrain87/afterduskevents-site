type BrandWordmarkProps = {
  className?: string;
};

export default function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <span
      className={`brand-wordmark font-display leading-none whitespace-nowrap${className ? ` ${className}` : ""}`}
      aria-label="After Dusk Events"
    >
      <span className="brand-wordmark__main" aria-hidden="true">
        AFTER DUSK EVENTS
      </span>
    </span>
  );
}
