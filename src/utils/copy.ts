// src/utils/copy.ts
// Utility to get page copy in the correct language

import { pagesCopy, type PageContent } from '@/data/pages-copy';
import type { Locale } from '@/data/locales';

/**
 * Get page copy in the specified language
 * @param page - Page identifier
 * @param locale - Language code (en, ar, es)
 * @returns Page copy in the specified language
 */
export function getPageCopy<T extends keyof typeof pagesCopy>(
  page: T,
  locale: Locale
) {
  const pageCopy = pagesCopy[page] as PageContent;
  
  // Only support en and ar for now, fallback to en
  if (locale === 'ar' && pageCopy.ar) {
    return pageCopy.ar;
  }
  
  // Default to English
  return pageCopy.en;
}

/**
 * Get all available pages
 */
export function getAvailablePages() {
  return Object.keys(pagesCopy) as Array<keyof typeof pagesCopy>;
}

/**
 * Check if a page has copy for a specific locale
 */
export function hasLocale<T extends keyof typeof pagesCopy>(
  page: T,
  locale: Locale
): boolean {
  return locale in pagesCopy[page];
}

// Export page identifiers for type safety
export const PAGE_IDS = {
  HOME: 'home',
  AI_PRESENTATION: 'aiPresentationGenerator',
  DOC_TO_SLIDES: 'docToSlides',
  TEMPLATES: 'templatesThemes',
  PRICING: 'pricing',
  ENTERPRISE: 'enterprise',
  SECURITY: 'security',
  INTEGRATIONS: 'integrations',
  USE_CASES: 'useCases',
  RESOURCES: 'resources',
} as const;

// Type for page IDs
export type PageId = keyof typeof pagesCopy;
