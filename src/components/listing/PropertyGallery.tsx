"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Listing } from "@/data/listings";
import { cn } from "@/lib/utils";

const lightboxControlClass = cn(
  "group z-10 rounded-full border border-white/25 bg-white/10 p-3 text-white shadow-lg backdrop-blur-sm",
  "transition-all duration-200 ease-out",
  "hover:scale-110 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-teal hover:shadow-brand-gold/30 hover:shadow-xl",
  "active:scale-95",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
);

interface PropertyGalleryProps {
  listing: Listing;
  title: string;
  placeholder: string;
}

export function PropertyGallery({
  listing,
  title,
  placeholder,
}: PropertyGalleryProps) {
  const t = useTranslations("listings");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = listing.images;
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, showPrevious, showNext]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface-muted px-6 text-center">
        <p className="text-sm text-muted">{placeholder}</p>
        {listing.imageDir && (
          <p className="font-mono text-xs text-brand-gold">{listing.imageDir}/</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <GalleryImageButton
          src={images[0]}
          alt={title}
          className="aspect-[4/3] rounded-xl"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          openLabel={t("openPhoto")}
          onOpen={() => setActiveIndex(0)}
        />
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-3">
            {images.slice(1).map((src, i) => (
              <GalleryImageButton
                key={src}
                src={src}
                alt={`${title} ${i + 2}`}
                className="aspect-video rounded-lg"
                sizes="(max-width: 1024px) 50vw, 25vw"
                openLabel={t("openPhoto")}
                onOpen={() => setActiveIndex(i + 1)}
              />
            ))}
          </div>
        )}
      </div>

      {isOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={t("photoViewer")}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className={cn(lightboxControlClass, "absolute end-4 top-4")}
            aria-label={t("closeGallery")}
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className={cn(
                  lightboxControlClass,
                  "absolute left-2 top-1/2 -translate-y-1/2 sm:left-4"
                )}
                aria-label={t("previousPhoto")}
              >
                <ChevronLeft className="h-7 w-7 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className={cn(
                  lightboxControlClass,
                  "absolute right-2 top-1/2 -translate-y-1/2 sm:right-4"
                )}
                aria-label={t("nextPhoto")}
              >
                <ChevronRight className="h-7 w-7 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </>
          )}

          <div
            className="relative flex h-full w-full max-h-[90vh] max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} ${activeIndex + 1}`}
              width={1920}
              height={1080}
              className="max-h-[90vh] w-auto max-w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
            {t("photoOf", { current: activeIndex + 1, total: images.length })}
          </p>
        </div>
      )}
    </>
  );
}

function GalleryImageButton({
  src,
  alt,
  className,
  sizes,
  priority,
  openLabel,
  onOpen,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  openLabel: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={openLabel}
      className={cn(
        "group relative w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        sizes={sizes}
        priority={priority}
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/35">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/0 bg-white/0 text-white opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/15 group-hover:opacity-100">
          <ZoomIn className="h-6 w-6" />
        </span>
      </span>
    </button>
  );
}
