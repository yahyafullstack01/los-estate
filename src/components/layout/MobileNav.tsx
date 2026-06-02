"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/listings", key: "listings" as const },
  { href: "/contact", key: "contact" as const },
];

export function MobileNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-muted"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="fixed inset-x-0 top-16 z-50 border-b border-border bg-background p-4 shadow-lg"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-base font-medium",
                      pathname === link.href
                        ? "bg-surface-muted text-brand-gold"
                        : "hover:bg-surface-muted"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
