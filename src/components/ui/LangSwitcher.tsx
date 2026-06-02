"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export function LangSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(next: Locale) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm",
          "hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 text-brand-gold" />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 top-full z-50 mt-1 min-w-[10rem] rounded-lg border border-border bg-surface py-1 shadow-lg"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                className={cn(
                  "w-full px-4 py-2 text-start text-sm hover:bg-surface-muted transition-colors",
                  loc === locale && "text-brand-gold font-medium"
                )}
              >
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
