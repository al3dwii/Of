'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useTranslation } from '@/i18n/useTranslation'
import Image from 'next/image';

interface FooterSection {
  title: string
  links: { name: string; href: string }[]
}

export function Footer() {
  const { t, locale } = useTranslation()
  const pathname = usePathname()
  
  // Detect locale from pathname
  const currentLocale = useMemo(() => {
    const localeMatch = pathname?.match(/^\/(en|ar|es|fr)(\/|$)/)
    return (localeMatch?.[1] as 'en' | 'ar' | 'es' | 'fr') || 'en'
  }, [pathname])
  
  const isAr = currentLocale === 'ar'
  
  // Helper to build localized hrefs
  const hrefFor = (path: string) => {
    if (path === '#') return path
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `/${currentLocale}/${cleanPath}`
  }
  
  const footerSections: FooterSection[] = [
    {
      title: t.footer.platform.title,
      links: [
        { name: t.footer.platform.dashboard, href: '/dashboard' },
        { name: t.footer.platform.presentations, href: '/dashboard/presentations' },
        { name: t.footer.platform.analytics, href: '/dashboard/analytics' },
      ]
    },
    {
      title: t.footer.tools.title,
      links: [
        { name: t.footer.tools.createPresentation, href: '/dashboard/presentations/new' },
        { name: t.footer.tools.settings, href: '/dashboard/settings' },
      ]
    },
    {
      title: t.footer.support.title,
      links: [
        { name: t.footer.support.helpCenter, href: '/dashboard/help' },
        { name: t.footer.support.contactSupport, href: '/dashboard/help' },
        { name: t.footer.support.systemStatus, href: '/dashboard/help' },
        { name: t.footer.support.whatsNew, href: '/dashboard/changelog' },
      ]
    },
    {
      title: t.footer.company.title,
      links: [
        { name: t.footer.company.about, href: '/about' },
        { name: t.footer.company.privacy, href: '/privacy' },
        { name: t.footer.company.terms, href: '/terms' },
        { name: t.footer.company.security, href: '/security' },
      ]
    }
  ]

  const socialLinks = [
    { name: t.footer.social.twitter, href: '#', icon: '🐦' },
    { name: t.footer.social.discord, href: '#', icon: '💬' },
    { name: t.footer.social.github, href: '#', icon: '🐙' },
    { name: t.footer.social.linkedin, href: '#', icon: '💼' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
               <div className="relative h-10 w-10 animate-spin">
                          <Image
                            fill
                            alt="Logo"
                            src="/logo.png"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div> */}
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t.brand.name}</h3>
                <p className="text-xs text-gray-500">{t.footer.brand.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t.footer.brand.description}
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
                      href={hrefFor(link.href)}
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
                <h3 className="text-lg font-medium text-gray-900 mb-1">{t.footer.readyToStart.title}</h3>
                <p className="text-sm text-gray-600">{t.footer.readyToStart.subtitle}</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  href={hrefFor('/dashboard/presentations/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {t.footer.readyToStart.createButton}
                </Link>
                <Link
                  href={hrefFor('/dashboard')}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>© 2025 {t.brand.name}. {t.footer.bottom.allRightsReserved}.</span>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t.footer.bottom.allSystemsOperational}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href={hrefFor('/dashboard/help')} className="text-sm text-gray-500 hover:text-gray-700">
                {t.footer.bottom.needHelp}
              </Link>
              <div className="text-sm text-gray-500">
                {t.footer.bottom.version}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
