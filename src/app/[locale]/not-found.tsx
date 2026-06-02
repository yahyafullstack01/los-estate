import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("nav");

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-6xl text-brand-gold">404</p>
      <h1 className="mt-4 font-serif text-2xl">Page not found</h1>
      <p className="mt-2 text-muted">The page you are looking for does not exist.</p>
      <div className="mt-8">
        <Button href="/">{t("home")}</Button>
      </div>
    </div>
  );
}
