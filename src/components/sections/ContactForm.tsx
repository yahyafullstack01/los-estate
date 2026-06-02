"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ContactForm({ propertySlug }: { propertySlug?: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
  }

  const inputClass = cn(
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm",
    "focus:outline-none focus:ring-2 focus:ring-brand-gold"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {propertySlug && (
        <input type="hidden" name="property" value={propertySlug} />
      )}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          {t("name")} *
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {t("email")} *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          {t("phone")}
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={
            propertySlug ? `Inquiry about: ${propertySlug}\n\n` : undefined
          }
          className={inputClass}
        />
      </div>
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{t("error")}</p>
      )}
      <Button type="submit" size="lg">
        {t("submit")}
      </Button>
    </form>
  );
}
