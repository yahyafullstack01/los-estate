import { absoluteUrl } from "@/lib/seo";
import type { Guide, GuideContent } from "@/data/guides";

type Props = {
  guide: Guide;
  content: GuideContent;
  locale: string;
};

export function GuideJsonLd({ guide, content, locale }: Props) {
  const url = absoluteUrl(`/${locale}/guides/${guide.slug}`);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: content.title,
        description: content.description,
        datePublished: guide.publishedAt,
        dateModified: guide.publishedAt,
        inLanguage: locale,
        author: {
          "@type": "Organization",
          name: "LOS ESTATE",
          url: absoluteUrl(`/${locale}`),
        },
        publisher: {
          "@type": "Organization",
          name: "LOS ESTATE",
          url: absoluteUrl(`/${locale}`),
        },
        mainEntityOfPage: url,
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
