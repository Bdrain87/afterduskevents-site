"use client";

import { toast } from "sonner";
import { Mail } from "lucide-react";

type Props = {
  email?: string;
  className?: string;
  children?: React.ReactNode;
  /** Inline icon variant vs. plain text. */
  showIcon?: boolean;
};

const DEFAULT_EMAIL = "hello@afterduskevents.com";

export default function CopyEmail({
  email = DEFAULT_EMAIL,
  className,
  children,
  showIcon = false,
}: Props) {
  async function copy(e: React.MouseEvent | React.KeyboardEvent) {
    // Allow right-click / middle-click / long-press to fall through to mailto.
    if ("button" in e && e.button !== 0) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied — we reply within 24 hours", { duration: 3500 });
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  return (
    <a
      href={`mailto:${email}`}
      onClick={copy}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") copy(e);
      }}
      className={className}
      aria-label={`Copy ${email} to clipboard`}
    >
      {showIcon && <Mail size={14} className="mr-2 inline" aria-hidden="true" />}
      {children ?? email}
    </a>
  );
}
