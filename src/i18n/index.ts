import { Locale } from '@/data/locales'
import { Translation } from './types'
import { en } from './locales/en'
import { ar } from './locales/ar'
import { es } from './locales/es'
import { fr } from './locales/fr'

const translations: Record<Locale, Translation> = {
  en,
  ar,
  es,
  fr,
}

export function getTranslation(locale: Locale): Translation {
  return translations[locale] || translations.en
}

export { en, ar, es, fr }
export type { Translation }
