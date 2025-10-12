'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface QuickAction {
  name: string
  href: string
  icon: string
  description: string
  color: string
}

export function QuickActionMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Detect locale from pathname
  const currentLocale = useMemo(() => {
    const localeMatch = pathname?.match(/^\/(en|ar|es)(\/|$)/)
    return (localeMatch?.[1] as 'en' | 'ar' | 'es') || 'en'
  }, [pathname])
  
  const isAr = currentLocale === 'ar'

  const quickActions: QuickAction[] = [
    {
      name: 'Create Presentation',
      href: '/dashboard/presentations/new',
      icon: '📊',
      description: 'Generate AI-powered slides',
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100'
    },
    {
      name: 'Convert Document',
      href: '/dashboard/presentations/new',
      icon: '📄',
      description: 'Word, PDF, Excel to PowerPoint',
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100'
    },
    {
      name: 'View Analytics',
      href: '/dashboard/analytics',
      icon: '📈',
      description: 'Check performance metrics',
      color: 'bg-green-50 text-green-700 hover:bg-green-100'
    },
    {
      name: 'API Docs',
      href: '/dashboard/api-docs',
      icon: '📚',
      description: 'Integration guide',
      color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
    }
  ]

  return (
    <div className="relative" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Quick Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 flex items-center justify-center`}
        title={isAr ? 'إجراءات سريعة' : 'Quick Actions'}
      >
        <span className="text-xl">{isOpen ? '✕' : '⚡'}</span>
      </button>

      {/* Quick Action Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-30"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className={`fixed bottom-20 ${isAr ? 'left-6' : 'right-6'} w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-40`}>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${action.color}`}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <div>
                      <div className="font-medium">{action.name}</div>
                      <div className="text-xs opacity-75">{action.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <Link
                  href="/dashboard/help"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <span>❓</span>
                  <span>Need help?</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
