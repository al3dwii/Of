// app/(public)/[locale]/tools/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredData from '@/components/StructuredData';
import LandingTemplate from '@/components/landing/LandingTemplate';
import RelatedTools from '@/components/RelatedTools';

import { LOCALES } from '@/data/locales';
import { siteUrl } from '@/utils/seo';
import {
  getConverters,
  getConverter,
  getRelatedConverters,
  type Converter as ConverterRow,
} from '@/lib/server/converters';
import { getToolContent } from '@/lib/server/tool-content';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
import type { Locale } from '@/data/locales';
type PageParams = { locale: Locale; slug: string };

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
    authors: [{ name: 'Sharayeh Team' }],
    creator: 'Sharayeh Team',
    publisher: 'Sharayeh',
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
    other: {
      // AI-specific meta tags for better attribution
      'article:author': 'Sharayeh Team',
      'article:publisher': 'Sharayeh',
      'citation_author': 'Sharayeh Team',
      'DC.creator': 'Sharayeh Team',
      'DC.publisher': 'Sharayeh',
    },
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
  
  // Load custom tool-specific content (features, copy, FAQ) for SEO
  const toolContent = getToolContent(params.slug);

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

  const isAr = params.locale === 'ar';
  const [fromExt, toExt] = row.dir.split('→');

  // HowTo Schema - AI-optimized step-by-step guide
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isAr ? `كيفية ${row.label_ar}` : `How to ${row.label_en}`,
    description: isAr 
      ? `دليل خطوة بخطوة لـ ${row.label_ar} - أداة مجانية عبر الإنترنت`
      : `Step-by-step guide to ${row.label_en} - free online tool`,
    totalTime: row.avg_time_iso,
    tool: {
      '@type': 'HowToTool',
      name: 'Sharayeh',
    },
    supply: {
      '@type': 'HowToSupply',
      name: isAr ? `ملف ${fromExt}` : `${fromExt} file`,
    },
    step: (isAr ? row.steps.ar : row.steps.en).map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `${isAr ? 'الخطوة' : 'Step'} ${i + 1}`,
      text: step,
      url: `${siteUrl}/${params.locale}/tools/${row.slug_en}#step-${i + 1}`,
    })),
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    inLanguage: isAr ? 'ar' : 'en',
  };

  // Author/Organization Schema - E-E-A-T signals
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sharayeh',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
    },
    author: {
      '@type': 'Organization',
      name: 'Sharayeh Team',
      description: isAr
        ? 'فريق متخصص في تطوير أدوات الذكاء الاصطناعي وتحويل المستندات متعددة اللغات'
        : 'Expert team specializing in AI-powered tools and multilingual document conversion',
    },
    knowsAbout: [
      'AI-powered document conversion',
      'Presentation generation',
      'Multilingual support',
      'File format transformation',
      `${fromExt} to ${toExt} conversion`,
    ],
    expertise: isAr 
      ? ['أدوات الذكاء الاصطناعي', 'تحويل المستندات', 'الدعم متعدد اللغات']
      : ['AI Tools', 'Document Conversion', 'Multilingual Support'],
    areaServed: 'Worldwide',
  };

  return (
    <>
      <StructuredData items={softwareJsonLd} />
      <StructuredData items={breadcrumbJsonLd} />
      <StructuredData items={howToSchema} />
      <StructuredData items={authorSchema} />
      <Breadcrumbs locale={params.locale} slug={params.slug} />
      
      <LandingTemplate locale={params.locale} row={row} related={related} toolContent={toolContent} />
      
      {/* Related Tools Section - Improves internal linking & SEO */}
      <RelatedTools tools={related} locale={params.locale} />
    </>
  );
}

