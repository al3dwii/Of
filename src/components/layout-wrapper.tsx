'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './navigation/navbar'
import { Footer } from './navigation/footer'
import { QuickActionMenu } from './navigation/quick-action-menu'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if we're on a fullscreen route (any page in the (fullscreen) route group)
  // This includes /test-agentic and /view/[jobId]
  const isFullscreen = pathname?.includes('/agentic') || pathname?.includes('/view/')
  
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
      <QuickActionMenu />
    </div>
  )
}
