'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  useEffect(() => {
    // Detect locale from pathname
    const localeMatch = pathname?.match(/^\/(en|ar|es)(\/|$)/)
    const locale = localeMatch?.[1] || 'en'
    const isRTL = locale === 'ar'
    
    // Set dir and lang on html element
    const htmlElement = document.documentElement
    htmlElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    htmlElement.setAttribute('lang', locale)
  }, [pathname])
  
  return <>{children}</>
}
