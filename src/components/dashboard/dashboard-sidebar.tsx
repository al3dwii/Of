'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Presentation, 
  BarChart3, 
  Settings, 
  Plus,
  HelpCircle,
  FileCode,
  Clock,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavigationItem {
  name: string
  href: string
  icon: any
  badge?: string
  badgeColor?: string
}

interface NavigationSection {
  title?: string
  items: NavigationItem[]
}

const navigationSections: NavigationSection[] = [
  {
    items: [
      { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Presentations', href: '/dashboard/presentations', icon: Presentation },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Resources',
    items: [
      { name: 'API Documentation', href: '/dashboard/api-docs', icon: FileCode },
      { name: 'Changelog', href: '/dashboard/changelog', icon: Clock, badge: 'New', badgeColor: 'bg-blue-100 text-blue-700' },
      { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle },
    ]
  },
  {
    title: 'Account',
    items: [
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ]
  }
]

export function DashboardSidebar() {
  const pathname = usePathname()
  
  // Extract locale from pathname
  const locale = pathname?.match(/^\/(en|ar|es)/)?.[1] || 'en'
  const cleanPathname = pathname?.replace(/^\/(en|ar|es)/, '') || ''

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href={`/${locale}/dashboard`} className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sharayeh
          </span>
        </Link>
      </div>
      
      {/* New Project Button */}
      <div className="p-4 border-b border-gray-200">
        <Link href={`/${locale}/slides`}>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Presentation
          </Button>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = cleanPathname === item.href || cleanPathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={`/${locale}${item.href}`}
                    className={cn(
                      'flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className={cn(
                        "w-5 h-5 mr-3",
                        isActive ? "text-blue-600" : "text-gray-400"
                      )} />
                      {item.name}
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full",
                        item.badgeColor || "bg-gray-100 text-gray-700"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">AI Credits</span>
            <span className="text-xs font-bold text-blue-600">750 / 1000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <Link href={`/${locale}/pricing`} className="block mt-3">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Upgrade Plan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
