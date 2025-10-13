'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Locale } from '@/data/locales'
import { getTranslation, Translation } from './index'

export function useTranslation(): { t: Translation; locale: Locale } {
  const pathname = usePathname()

  const locale = useMemo<Locale>(() => {
    const match = pathname?.match(/^\/(en|ar|es|fr)(\/|$)/)
    return (match?.[1] as Locale) || 'en'
  }, [pathname])

  const t = useMemo(() => getTranslation(locale), [locale])

  return { t, locale }
}
