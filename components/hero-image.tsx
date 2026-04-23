import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** AVIF/WebP-friendly placeholder; pass a generated 4-byte blurDataURL */
  blurDataURL?: string;
  className?: string;
  /** Optional vignette intensity 0-1, default 0.55 */
  vignette?: number;
  /** When true, applies the warm dusk color grade filter */
  duskGrade?: boolean;
  priority?: boolean;
};

export default function HeroImage({
  src,
  alt,
  blurDataURL,
  className,
  vignette = 0.55,
  duskGrade = true,
  priority = true,
}: Props) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        quality={90}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={cn("object-cover ken-burns", duskGrade && "dusk-grade")}
      />
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 110% 80% at 50% 45%, transparent 35%, rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      {/* Bottom-fade so headlines remain legible */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 100%)",
        }}
      />
    </div>
  );
}
