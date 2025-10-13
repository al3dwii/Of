/**
 * SEO Utilities
 * Centralized SEO configuration and helpers for the application
 */

import type { Metadata } from 'next'
import type { Locale } from '@/data/locales'

// Base site configuration
export const siteConfig = {
  name: 'Sharayeh - AI Presentation Generator',
  description: 'Transform documents into professional presentations with AI. Convert Word, PDF, Excel, and images to PowerPoint slides instantly. AI-powered presentation maker for business and education.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sharayeh.com',
  ogImage: '/og-image.png',
  twitterHandle: '@sharayeh',
  keywords: [
    'AI presentation generator',
    'AI presentation maker',
    'document to presentation',
    'Word to PowerPoint',
    'PDF to PowerPoint',
    'AI slide generator',
    'presentation creator',
    'PowerPoint generator',
    'AI slides',
    'document conversion',
    'Excel to presentation',
    'image to presentation',
    'automatic presentation',
    'business presentations',
    'AI PowerPoint',
    'presentation automation'
  ],
  author: 'Sharayeh Team',
  language: 'en',
  themeColor: '#2563eb',
}

// Locale-specific metadata
export const localeMetadata: Record<Locale, {
  title: string
  description: string
  keywords: string[]
}> = {
  en: {
    title: 'Sharayeh - AI Presentation Generator & Document to PowerPoint Converter',
    description: 'Create professional presentations from documents instantly with AI. Convert Word, PDF, Excel, and images to PowerPoint slides. Fast, accurate presentation maker for business and education.',
    keywords: [
      'AI presentation generator',
      'document to PowerPoint',
      'Word to PowerPoint converter',
      'PDF to slides',
      'AI presentation maker',
      'automatic slide generator',
      'PowerPoint AI',
      'presentation automation'
    ]
  },
  ar: {
    title: 'شرايح - مولد العروض التقديمية بالذكاء الاصطناعي',
    description: 'حوّل المستندات إلى عروض تقديمية احترافية بالذكاء الاصطناعي. تحويل Word وPDF وExcel والصور إلى شرائح بوربوينت فوراً. صانع عروض تقديمية بالذكاء الاصطناعي للأعمال والتعليم.',
    keywords: [
      'مولد العروض التقديمية بالذكاء الاصطناعي',
      'تحويل المستندات إلى بوربوينت',
      'Word إلى PowerPoint',
      'PDF إلى شرائح',
      'صانع العروض التقديمية',
      'بوربوينت تلقائي',
      'شرائح بالذكاء الاصطناعي',
      'أتمتة العروض التقديمية'
    ]
  },
  es: {
    title: 'Sharayeh - Generador de Presentaciones con IA',
    description: 'Transforma documentos en presentaciones profesionales con IA. Convierte Word, PDF, Excel e imágenes a diapositivas de PowerPoint al instante. Creador de presentaciones con IA para empresas y educación.',
    keywords: [
      'generador de presentaciones con IA',
      'documento a PowerPoint',
      'Word a PowerPoint',
      'PDF a diapositivas',
      'creador de presentaciones',
      'PowerPoint automático',
      'diapositivas con IA',
      'automatización de presentaciones'
    ]
  },
  fr: {
    title: 'Sharayeh - Générateur de Présentations IA',
    description: 'Transformez des documents en présentations professionnelles avec l\'IA. Convertissez Word, PDF, Excel et images en diapositives PowerPoint instantanément. Créateur de présentations IA pour entreprises et éducation.',
    keywords: [
      'générateur de présentations IA',
      'document vers PowerPoint',
      'Word vers PowerPoint',
      'PDF vers diapositives',
      'créateur de présentations',
      'PowerPoint automatique',
      'diapositives IA',
      'automatisation de présentations'
    ]
  }
}

/**
 * Generate page metadata with SEO optimization
 */
export function generatePageMetadata({
  title,
  description,
  locale = 'en',
  path = '',
  image,
  keywords = [],
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  title: string
  description: string
  locale?: Locale
  path?: string
  image?: string
  keywords?: string[]
  noindex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}): Metadata {
  const baseUrl = siteConfig.url
  const url = `${baseUrl}/${locale}${path}`
  const ogImage = image || `${baseUrl}${siteConfig.ogImage}`
  
  const localeData = localeMetadata[locale]
  const allKeywords = [...siteConfig.keywords, ...localeData.keywords, ...keywords]

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    ...(noindex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${baseUrl}/en${path}`,
        'ar-KW': `${baseUrl}/ar${path}`,
        'es-ES': `${baseUrl}/es${path}`,
      },
    },
    openGraph: {
      type,
      locale: locale === 'ar' ? 'ar_AR' : locale === 'es' ? 'es_ES' : 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    category: 'technology',
    ...(locale === 'ar' && { 
      other: {
        'format-detection': 'telephone=no',
      }
    }),
  }
}

/**
 * Generate breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}/${locale}${item.url}`,
    })),
  }
}

/**
 * Generate organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      'https://twitter.com/sharayeh',
      'https://linkedin.com/company/sharayeh',
      'https://facebook.com/sharayeh',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@sharayeh.com',
      availableLanguage: ['English', 'Arabic', 'Spanish'],
    },
  }
}

/**
 * Generate software application JSON-LD schema
 */
export function generateSoftwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    description: siteConfig.description,
  }
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate article JSON-LD schema
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author = siteConfig.author,
}: {
  title: string
  description: string
  url: string
  image: string
  publishedTime: string
  modifiedTime?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

/**
 * Generate video object JSON-LD schema
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
}: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl: contentUrl,
  }
}

/**
 * Generate how-to JSON-LD schema
 */
export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
  totalTime?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }
}
