"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { publishedGallery, type GalleryItem } from "@/lib/gallery";

type Props = {
  headingId?: string;
};

function spanClasses(span?: GalleryItem["span"]) {
  if (span === "feature") return "md:col-span-2 md:row-span-2";
  if (span === "wide") return "md:col-span-2";
  if (span === "tall") return "md:row-span-2";
  return "";
}

/**
 * Past events bento gallery. Bento on desktop, Embla carousel on mobile.
 * Renders nothing if there are zero published photos (placeholders filtered out).
 */
export default function EventGallery({ headingId = "gallery-heading" }: Props) {
  const items = publishedGallery();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  if (items.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby={headingId}>
      <div className="mx-auto max-w-7xl">
        <h2 id={headingId} className="font-heading text-2xl sm:text-3xl text-projector mb-3">
          Past events
        </h2>
        <p className="text-steel text-sm mb-8">
          Real backyards. Real venues. Documentary, not stock.
        </p>

        {/* Mobile: Embla carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="relative shrink-0 grow-0 basis-[85%] aspect-[4/5] rounded-lg overflow-hidden bg-charcoal"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, 50vw"
                    className="object-cover dusk-grade"
                    placeholder={item.blurDataURL ? "blur" : "empty"}
                    blurDataURL={item.blurDataURL}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-screening/95 to-transparent">
                    <p className="text-projector text-xs font-semibold">{item.eventType}</p>
                    <p className="text-steel text-[11px]">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => emblaApi?.scrollPrev()}
              className="rounded-full p-2 bg-charcoal border border-white/10 text-projector hover:border-oxblood/40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => emblaApi?.scrollNext()}
              className="rounded-full p-2 bg-charcoal border border-white/10 text-projector hover:border-oxblood/40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Desktop: bento grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-3">
          {items.map((item, i) => (
            <figure
              key={i}
              className={cn(
                "relative overflow-hidden rounded-xl bg-charcoal group",
                spanClasses(item.span),
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover dusk-grade transition-transform duration-700 group-hover:scale-105"
                placeholder={item.blurDataURL ? "blur" : "empty"}
                blurDataURL={item.blurDataURL}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-screening/95 via-screening/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-projector text-sm font-semibold">{item.eventType}</p>
                <p className="text-steel text-xs">{item.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
