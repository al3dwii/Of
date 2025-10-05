// app/(public)/[locale]/tools/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredData from '@/components/StructuredData';
import LandingTemplate from '@/components/landing/LandingTemplate';

import { LOCALES } from '@/utils/i18n';
import { siteUrl } from '@/utils/seo';
import {
  getConverters,
  getConverter,
  getRelatedConverters,
  type Converter as ConverterRow,
} from '@/lib/server/converters';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type PageParams = { locale: 'en' | 'ar'; slug: string };

/* ------------------------------------------------------------------ */
/* Rendering strategy                                                  */
/* ------------------------------------------------------------------ */
export const dynamic = 'auto'; // Static if listed by generateStaticParams()

/* ------------------------------------------------------------------ */
/* Static params                                                       */
/* ------------------------------------------------------------------ */
const converters = getConverters(); // one CSV/JSON read at build time

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    converters.map((c) => ({ locale, slug: c.slug_en }))
  );
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { locale, slug } = params;
  const row = getConverter(slug);
  if (!row) notFound();

  const isAr = locale === 'ar';
  const [fromExt, toExt] = row.dir.split('→');

  const title = isAr ? `${row.label_ar} | Sharayeh` : `${row.label_en} | Sharayeh`;

  const description = isAr
    ? `أداة سحابية مجانية وسهلة ${row.label_ar} – حوّل ملفات ${fromExt} إلى ${toExt} في ثوانٍ مع الحفاظ على التنسيق والصور والخطوط.`
    : `Free online tool for ${row.label_en}. Convert ${fromExt} to ${toExt} in seconds and keep fonts, images and formatting intact.`;

  const canonical = `${siteUrl}/${locale}/tools/${row.slug_en}`;

  const keywords = isAr
    ? [
        `${fromExt} إلى ${toExt}`,
        `تحويل ${fromExt} إلى ${toExt} أونلاين`,
        `أداة ${row.label_ar}`,
        row.label_ar,
      ]
    : [
        `${fromExt} to ${toExt}`,
        `${fromExt}-to-${toExt} online converter`,
        `free ${row.label_en} tool`,
        row.label_en,
      ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en/tools/${row.slug_en}`,
        ar: `${siteUrl}/ar/tools/${row.slug_ar}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      images: [{ url: `${siteUrl}/api/og/tool/${row.slug_en}`, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/api/og/tool/${row.slug_en}`],
    },
    robots: {
      index: true,
      follow: true,
    },
    viewport: 'width=device-width,initial-scale=1',
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default async function Page({ params }: { params: PageParams }) {
  const row = getConverter(params.slug);
  if (!row) return notFound();

  // Show related for both languages — not only Arabic
  const related: ConverterRow[] = getRelatedConverters(params.slug);

  // SoftwareApplication schema (per tool)
  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: row.label_en,
    alternateName: row.label_ar,
    applicationCategory: 'FileConversionTool',
    operatingSystem: 'All',
    url: `${siteUrl}/${params.locale}/tools/${row.slug_en}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    inLanguage: params.locale,
  };

  // BreadcrumbList schema for richer SERP crumbs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: params.locale === 'ar' ? 'الرئيسية' : 'Home',
        item: `${siteUrl}/${params.locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: params.locale === 'ar' ? 'الأدوات' : 'Tools',
        item: `${siteUrl}/${params.locale}/tools`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: params.locale === 'ar' ? row.label_ar : row.label_en,
        item: `${siteUrl}/${params.locale}/tools/${row.slug_en}`,
      },
    ],
  };

  return (
    <>

      <StructuredData data={softwareJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs locale={params.locale} slug={params.slug} />
      
      <LandingTemplate locale={params.locale} row={row} related={related} />
    </>
  );
}

