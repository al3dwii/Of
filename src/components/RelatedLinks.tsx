// src/components/RelatedLinks.tsx
import Link from "next/link";
import { slidesLandings } from "@/data/landings.slides";
import type { Locale } from "@/data/locales";

function findBySlugOrAlt(
  dataset: { locale: Locale; slug: string; alt?: { en?: string; ar?: string }; h1: string }[],
  locale: Locale,
  slug: string
) {
  return dataset.find((n) => n.locale === locale && (n.slug === slug || n.alt?.en === slug || n.alt?.ar === slug));
}

export default function RelatedLinks({
  locale,
  slugs,
  title,
  dir = "ltr",
}: {
  locale: Locale;
  slugs: string[];
  title?: string;
  dir?: "ltr" | "rtl";
}) {
  const items = slugs
    .map((s) => {
      const slide = findBySlugOrAlt(slidesLandings as any, locale, s);
      if (slide) return { href: `/${locale}/slides/${encodeURIComponent(slide.slug)}`, text: slide.h1 };
      return null;
    })
    .filter(Boolean) as { href: string; text: string }[];

  if (!items.length) return null;

  return (
    <section className="mb-10" dir={dir}>
      <h2 className="text-xl font-semibold mb-3">{title ?? (locale === "ar" ? "روابط ذات صلة" : "Related")}</h2>
      <ul className="flex flex-wrap gap-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="inline-block rounded-full border border-white/15 px-3 py-1 text-sm hover:border-white/40"
            >
              {it.text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
