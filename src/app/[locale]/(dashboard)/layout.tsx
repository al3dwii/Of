'use client'

import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
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
    <div className="min-h-screen bg-gray-50 flex" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <DashboardNav />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
