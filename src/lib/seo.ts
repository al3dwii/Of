/**
 * SEO Utilities
 * Centralized SEO configuration and helpers for the application
 */

import type { Metadata } from 'next'
import type { Locale } from '@/data/locales'

// Base site configuration
export const siteConfig = {
  name: 'Agentic - AI Content Creation Platform',
  description: 'Create professional presentations, dub videos, convert documents, and translate content with artificial intelligence. Powered by advanced AI for business and education.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  ogImage: '/og-image.png',
  twitterHandle: '@agentic',
  keywords: [
    'AI content creation',
    'AI presentations',
    'video dubbing',
    'document conversion',
    'AI translation',
    'PowerPoint generator',
    'AI slides',
    'video localization',
    'PDF converter',
    'presentation maker',
    'artificial intelligence',
    'automation tools',
    'business productivity',
    'content automation'
  ],
  author: 'Agentic',
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
    title: 'Agentic - AI Content Creation Platform',
    description: 'Create professional presentations, dub videos, convert documents, and translate content with AI. Fast, accurate, and powerful automation tools for business.',
    keywords: [
      'AI presentation maker',
      'video dubbing AI',
      'document converter',
      'AI translation',
      'PowerPoint AI',
      'content creation tools'
    ]
  },
  ar: {
    title: 'أجينتك - منصة إنشاء المحتوى بالذكاء الاصطناعي',
    description: 'أنشئ عروض تقديمية احترافية، ودبلج مقاطع فيديو، وحوّل المستندات، وترجم المحتوى باستخدام الذكاء الاصطناعي. أدوات أتمتة سريعة ودقيقة وقوية للأعمال.',
    keywords: [
      'صانع العروض التقديمية بالذكاء الاصطناعي',
      'دبلجة الفيديو بالذكاء الاصطناعي',
      'محول المستندات',
      'الترجمة بالذكاء الاصطناعي',
      'بوربوينت بالذكاء الاصطناعي',
      'أدوات إنشاء المحتوى'
    ]
  },
  es: {
    title: 'Agentic - Plataforma de Creación de Contenido con IA',
    description: 'Crea presentaciones profesionales, dobla videos, convierte documentos y traduce contenido con IA. Herramientas de automatización rápidas, precisas y potentes para empresas.',
    keywords: [
      'creador de presentaciones con IA',
      'doblaje de video con IA',
      'conversor de documentos',
      'traducción con IA',
      'PowerPoint con IA',
      'herramientas de creación de contenido'
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
      // Add your social media profiles
      'https://twitter.com/agentic',
      'https://linkedin.com/company/agentic',
      'https://facebook.com/agentic',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@yourdomain.com',
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
