'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Navbar } from './navigation/navbar'
import { Footer } from './navigation/footer'
import { QuickActionMenu } from './navigation/quick-action-menu'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if we're on the editor page (only editor should have no scroll)
  const isEditor = pathname?.includes('/editor')
  
  // Check if we're on a presentation route (no navbar/footer)
  const presentationRoutes = ['/agentic', '/credits', '/database', '/editor', '/view', '/admin', '/dashboard', '/public-view' ]
  const isPresentation = presentationRoutes.some(route => pathname?.includes(route))
  
  // Prevent scrolling ONLY on editor page
  useEffect(() => {
    if (isEditor) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isEditor])
  
  if (isEditor) {
    // Editor: no scroll, no navbar/footer, fixed viewport
    return <div className="h-screen w-screen overflow-hidden">{children}</div>
  }
  
  if (isPresentation) {
    // Other presentation pages: no navbar/footer but allow scroll
    return <>{children}</>
  }
  
  // Render with navbar, footer, and quick actions for normal pages
  // Content scrolls below the navbar (navbar is sticky at top)
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
              <Navbar />

        {children}
      </main>
      <Footer />
      {/* <QuickActionMenu /> */}
    </div>
  )
}
