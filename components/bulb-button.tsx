import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * Bulb-edge CTA — black body with amber bulb-dot top/bottom edges.
 * One per page, reserved for the primary action.
 */
export default function BulbButton({ href, children, className = "" }: Props) {
  return (
    <Link href={href} className={`bulb-button ${className}`}>
      {children}
    </Link>
  );
}
