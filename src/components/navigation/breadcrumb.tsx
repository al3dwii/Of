'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  name: string
  href: string
}

export function Breadcrumb() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage or dashboard root
  if (pathname === '/' || pathname === '/dashboard') {
    return null
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always start with dashboard for dashboard routes
    if (pathname.startsWith('/dashboard')) {
      breadcrumbs.push({ name: 'Dashboard', href: '/dashboard' })
      
      // Process remaining segments
      let currentPath = '/dashboard'
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i]
        currentPath += `/${segment}`
        
        // Convert segment to display name
        let displayName = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        // Special cases for better display names
        switch (segment) {
          case 'presentations':
            displayName = 'Presentations'
            break
          case 'dubbing':
            displayName = 'Video Dubbing'
            break
          case 'analytics':
            displayName = 'Analytics'
            break
          case 'settings':
            displayName = 'Settings'
            break
          case 'help':
            displayName = 'Help & Support'
            break
          case 'changelog':
            displayName = 'What\'s New'
            break
          case 'new':
            displayName = 'New'
            break
        }

        breadcrumbs.push({ name: displayName, href: currentPath })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          {index > 0 && <span>/</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.name}</span>
          ) : (
            <Link 
              href={item.href}
              className="hover:text-gray-700 transition-colors"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
