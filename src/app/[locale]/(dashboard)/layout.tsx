'use client'

import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Detect locale from pathname
  const isAr = useMemo(() => {
    const localeMatch = pathname?.match(/^\/(en|ar|es)(\/|$)/)
    const locale = localeMatch?.[1]
    return locale === 'ar'
  }, [pathname])

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        {children}
      </div>
    </div>
  )
}
