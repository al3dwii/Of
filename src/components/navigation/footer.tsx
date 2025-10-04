'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

interface FooterSection {
  title: string
  links: { name: string; href: string }[]
}

export function Footer() {
  const pathname = usePathname()
  
  // Detect locale from pathname
  const isAr = useMemo(() => {
    const localeMatch = pathname?.match(/^\/(en|ar)(\/|$)/)
    const locale = localeMatch?.[1]
    return locale === 'ar'
  }, [pathname])
  const footerSections: FooterSection[] = [
    {
      title: 'Platform',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Presentations', href: '/dashboard/presentations' },
        { name: 'Video Dubbing', href: '/dashboard/dubbing' },
        { name: 'Analytics', href: '/dashboard/analytics' },
      ]
    },
    {
      title: 'Tools',
      links: [
        { name: 'Create Presentation', href: '/dashboard/presentations/new' },
        { name: 'Upload Video', href: '/dashboard/dubbing' },
        { name: 'API Documentation', href: '/dashboard/api-docs' },
        { name: 'Settings', href: '/dashboard/settings' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/dashboard/help' },
        { name: 'Contact Support', href: '/dashboard/help' },
        { name: 'System Status', href: '/dashboard/help' },
        { name: 'What\'s New', href: '/dashboard/changelog' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Security', href: '#' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Discord', href: '#', icon: '💬' },
    { name: 'GitHub', href: '#', icon: '🐙' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Agentic</h3>
                <p className="text-xs text-gray-500">AI Content Platform</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Create presentations and dub videos with the power of AI. Transform your content workflow.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                  title={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Ready to get started?</h3>
                <p className="text-sm text-gray-600">Create your first AI-powered content today.</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  href="/dashboard/presentations/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Presentation
                </Link>
                <Link
                  href="/dashboard/dubbing"
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Upload Video
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>© 2025 Agentic AI Platform. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/dashboard/help" className="text-sm text-gray-500 hover:text-gray-700">
                Need help?
              </Link>
              <Link href="/dashboard/api-docs" className="text-sm text-gray-500 hover:text-gray-700">
                API Docs
              </Link>
              <div className="text-sm text-gray-500">
                v2.1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
