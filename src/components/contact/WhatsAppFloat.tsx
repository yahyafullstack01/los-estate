"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { whatsappHref } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const t = useTranslations("contact");
  const href = whatsappHref(t("whatsappPrefill"));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
