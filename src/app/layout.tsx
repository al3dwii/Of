import type { Metadata } from 'next'
import { Inter, Tajawal } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { LayoutWrapper } from '../components/layout-wrapper'
import { LocaleProvider } from '../components/locale-provider'
// import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Navbar } from '@/components/navigation/navbar'


const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true
})
const tajawal = Tajawal({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Sharayeh - AI Presentation Generator | Document to PowerPoint Converter',
    template: '%s | Sharayeh'
  },
  description: 'Transform documents into professional presentations with AI. Convert Word, PDF, Excel, and images to PowerPoint slides instantly. AI-powered presentation maker for business and education.',
  keywords: [
    'AI presentation generator',
    'document to PowerPoint',
    'Word to PowerPoint',
    'PDF to slides',
    'AI presentation maker',
    'PowerPoint converter'
  ],
  authors: [{ name: 'Sharayeh Team' }],
  creator: 'Sharayeh',
  publisher: 'Sharayeh',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Sharayeh',
    title: 'Sharayeh - AI Presentation Generator',
    description: 'Transform documents into professional presentations with AI. Convert Word, PDF, Excel to PowerPoint instantly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sharayeh AI Presentation Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharayeh - AI Presentation Generator',
    description: 'Transform documents into professional presentations with AI. Convert Word, PDF, Excel to PowerPoint instantly.',
    images: ['/og-image.png'],
    creator: '@sharayeh'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  },
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: [
      { url: '/apple-icon.png' }
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  if (!clerkPubKey) {
    console.warn('Warning: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set')
  }
  
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
    >
      <html 
        suppressHydrationWarning 
        className={`${inter.variable} ${tajawal.variable}`}
        lang="en"
      >
        <head>
          <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'} />
          <meta name="theme-color" content="#2563eb" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          
          {/* Organization Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Sharayeh',
                url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sharayeh.com',
                logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sharayeh.com'}/logo.png`,
                description: 'AI-powered presentation generator. Transform documents into professional PowerPoint presentations instantly.',
                sameAs: [
                  'https://twitter.com/sharayeh',
                  'https://www.facebook.com/sharayeh',
                  'https://www.linkedin.com/company/sharayeh',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
                  email: 'support@sharayeh.com',
                  availableLanguage: ['English', 'Arabic', 'Spanish']
                }
              })
            }}
          />
        </head>
        <body>
          <LocaleProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </LocaleProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
