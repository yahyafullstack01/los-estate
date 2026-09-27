import { Link } from "@/i18n/navigation";
import type { GuideContent } from "@/data/guides";

type Props = {
  slug: string;
  content: GuideContent;
  readMoreLabel: string;
  dateLabel: string;
  publishedAt: string;
};

export function GuideCard({
  slug,
  content,
  readMoreLabel,
  dateLabel,
  publishedAt,
}: Props) {
  return (
    <article className="flex flex-col border-b border-border pb-8 last:border-0 sm:pb-10">
      <p className="text-xs font-medium uppercase tracking-wider text-brand-gold">
        {dateLabel}: {publishedAt}
      </p>
      <h2 className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">
        <Link
          href={`/guides/${slug}`}
          className="transition-colors hover:text-brand-gold"
        >
          {content.title}
        </Link>
      </h2>
      <p className="mt-3 max-w-3xl text-muted leading-relaxed">{content.excerpt}</p>
      <Link
        href={`/guides/${slug}`}
        className="mt-4 inline-flex text-sm font-semibold text-brand-gold hover:text-brand-gold-light"
      >
        {readMoreLabel} →
      </Link>
    </article>
  );
}
