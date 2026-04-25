import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AudioTier } from "@/lib/packages";

type SectionProps = {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
  tone?: "base" | "band" | "quiet";
};

export function FunnelSection({
  children,
  id,
  labelledBy,
  className,
  tone = "base",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative px-6 py-16 sm:px-10 sm:py-20 lg:px-16",
        tone === "band" && "border-y border-white/8 bg-charcoal/35",
        tone === "quiet" && "bg-screening",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  id,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="text-caption text-ember mb-3">{eyebrow}</p>}
      <h2
        id={id}
        className="font-display text-display-md text-projector tracking-wider leading-none"
      >
        {title}
      </h2>
      {body && <p className="mt-5 text-body-lg leading-relaxed text-silver">{body}</p>}
    </div>
  );
}

export function MediaPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-charcoal shadow-[0_24px_70px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ActionBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>{children}</div>;
}

export function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-oxblood px-6 py-3 text-sm font-semibold text-projector transition-colors hover:bg-oxblood-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
    >
      {children}
    </Link>
  );
}

export function TextCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex min-h-[48px] items-center text-sm font-semibold text-ember transition-colors hover:text-projector"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-ember transition-[width] duration-300 ease-out group-hover:w-full"
        />
      </span>
    </Link>
  );
}

export { default as TierCard } from "@/components/tier-card";

export function QuotePanel({
  title,
  body,
  href = "/contact",
  ctaLabel = "Request a Quote",
  eyebrow = "Quote next",
}: {
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  eyebrow?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-charcoal/55 p-6 sm:p-8">
      <p className="text-caption text-ember mb-3">{eyebrow}</p>
      <h2 className="font-display text-display-md leading-none tracking-wider text-projector">
        {title}
      </h2>
      <p className="mt-4 max-w-[48ch] text-body leading-relaxed text-silver">{body}</p>
      <div className="mt-6">
        <PrimaryCta href={href}>{ctaLabel}</PrimaryCta>
      </div>
    </div>
  );
}

export function BookingStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-screening/65 p-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-ember/45 text-sm font-semibold text-ember">
        {number}
      </div>
      <h3 className="font-heading text-heading-md text-projector">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-silver">{body}</p>
    </div>
  );
}
