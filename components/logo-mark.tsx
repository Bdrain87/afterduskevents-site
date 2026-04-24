"use client";

export default function LogoMark({
  size = 36,
  color = "#DD5454",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Projector body */}
      <rect x="6" y="26" width="30" height="18" rx="3" stroke={color} strokeWidth="3" />
      {/* Screen slot on body */}
      <rect x="11" y="32" width="14" height="5" rx="1.5" stroke={color} strokeWidth="2.5" />
      {/* Lens housing (circle) */}
      <circle cx="46" cy="35" r="12" stroke={color} strokeWidth="3" />
      {/* Inner lens */}
      <circle cx="46" cy="35" r="5" stroke={color} strokeWidth="2.5" />
      {/* Connector between body and lens */}
      <line x1="36" y1="35" x2="34" y2="35" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Light rays */}
      <line x1="46" y1="18" x2="46" y2="14" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="56" y1="22" x2="59" y2="19" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="61" y1="32" x2="65" y2="32" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
