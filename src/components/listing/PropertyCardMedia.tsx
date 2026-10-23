"use client";

import Image from "next/image";
import { useState, type MouseEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn, listingImageAlt } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  images: string[];
  badges: ReactNode;
};

export function PropertyCardMedia({ slug, title, images, badges }: Props) {
  const [index, setIndex] = useState(0);
  const list = images.length > 0 ? images : ["/og-default.png"];
  const current = list[Math.min(index, list.length - 1)]!;
  const hasMany = list.length > 1;
  const visibleDots = list.slice(0, 5);
  const activeDot = Math.min(index, visibleDots.length - 1);

  function go(delta: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIndex((i) => (i + delta + list.length) % list.length);
  }

  return (
    <div className="relative aspect-[5/4] overflow-hidden bg-surface-muted sm:aspect-[4/3]">
      <Link href={`/listings/${slug}`} className="absolute inset-0 block">
        <Image
          src={current}
          alt={listingImageAlt(title, current)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between p-3">
        <div className="pointer-events-auto flex flex-wrap gap-2">{badges}</div>
      </div>

      {hasMany ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => go(-1, e)}
            className="absolute start-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-brand-gold hover:text-brand-teal"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => go(1, e)}
            className="absolute end-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-brand-gold hover:text-brand-teal"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center">
            <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
              {visibleDots.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    i === activeDot
                      ? "bg-brand-gold ring-1 ring-white/80"
                      : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
