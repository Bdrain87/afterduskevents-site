import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Neon-tube text — flickers in once on mount. Use sparingly: one per
 * page, reserved for the single loudest moment.
 */
export default function NeonSign({ children, className = "" }: Props) {
  return (
    <span className={`neon-sign ${className}`}>{children}</span>
  );
}
