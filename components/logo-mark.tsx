"use client";

import { useState } from "react";
import Image from "next/image";

interface LogoMarkProps {
  size?: number;
}

export default function LogoMark({ size = 36 }: LogoMarkProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="36" rx="4" fill="#1A1A1A" />
        <circle cx="22" cy="16" r="6" stroke="#E63946" strokeWidth="2" fill="none" />
        <rect x="6" y="13" width="10" height="6" rx="1" stroke="#E63946" strokeWidth="2" fill="none" />
        <line x1="16" y1="16" x2="16" y2="16" stroke="#E63946" strokeWidth="2" />
        <line x1="21" y1="6" x2="21" y2="8" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="8" x2="25.5" y2="9.5" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
        <line x1="29" y1="14" x2="27" y2="14" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <Image
        src="/logo.png"
        alt=""
        fill
        className="object-contain"
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}
