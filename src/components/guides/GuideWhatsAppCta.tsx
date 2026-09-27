"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "48575656702";

type Props = {
  heading: string;
  body: string;
  buttonLabel: string;
  prefill: string;
};

export function GuideWhatsAppCta({
  heading,
  body,
  buttonLabel,
  prefill,
}: Props) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;

  return (
    <aside className="mt-12 border border-brand-gold/30 bg-surface-muted/50 px-6 py-8 sm:px-8">
      <h2 className="font-serif text-2xl sm:text-3xl">{heading}</h2>
      <p className="mt-3 max-w-2xl text-muted leading-relaxed">{body}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-gold-light"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        {buttonLabel}
      </a>
    </aside>
  );
}
