"use client"
import Link from 'next/link';
import { getAllTools } from '@/lib/tools';
import StructuredData from '@/components/StructuredData';
import { siteUrl } from '@/utils/seo';

export default async function Breadcrumbs({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const tools = await getAllTools();
  const row = tools.find((t) => t.slug_en === slug || t.slug_ar === slug);
  if (!row) return null;

  const items = [
    {
      name: locale === 'ar' ? 'الرئيسية' : 'Home',
      url: `${siteUrl}/${locale}`,
    },
    {
      name: locale === 'ar' ? 'الأدوات' : 'Tools',
      url: `${siteUrl}/${locale}/tools`,
    },
    {
      name: locale === 'ar' ? row.label_ar : row.label_en,
      url: `${siteUrl}/${locale}/tools/${row.slug_en}`,
    },
  ];

  return (
    <>
      <nav aria-label="breadcrumb" className="mb-6 pt-4">
        <ol className="flex flex-wrap items-center gap-2 px-4 text-sm">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i === items.length - 1 ? (
                <span className="text-gray-900 font-semibold">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.url}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                  <span className="text-gray-400 select-none">/</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <StructuredData
        items={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
          })),
        }}
      />
    </>
  );
}
