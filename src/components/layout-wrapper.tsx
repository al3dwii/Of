'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './navigation/navbar'
import { Footer } from './navigation/footer'
import { QuickActionMenu } from './navigation/quick-action-menu'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if we're on a fullscreen route (any page in the (presentations) route group)
  // Presentations folder includes: /agentic, /credits, /database, /editor, /view
  const presentationRoutes = ['/agentic', '/credits', '/database', '/editor', '/view']
  const isFullscreen = presentationRoutes.some(route => pathname?.includes(route))
  
  if (isFullscreen) {
    // Render only children for fullscreen pages
    return <>{children}</>
  }
  
  // Render with navbar, footer, and quick actions for normal pages
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* <QuickActionMenu /> */}
    </div>
  )
}
