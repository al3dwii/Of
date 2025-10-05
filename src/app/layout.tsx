import type { Metadata } from 'next'
import { Inter, Tajawal } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Navbar } from '../components/navigation/navbar'
import { Footer } from '../components/navigation/footer'
import { QuickActionMenu } from '../components/navigation/quick-action-menu'
import { LocaleProvider } from '../components/locale-provider'
// import { ThemeProvider } from 'next-themes'
import './globals.css'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: {
    default: 'Agentic - AI Content Creation Platform',
    template: '%s | Agentic'
  },
  description: 'Create professional presentations, dub videos, convert documents, and translate content with AI. Fast, accurate, and powerful automation tools for business and education.',
  keywords: [
    'AI content creation',
    'AI presentations',
    'video dubbing',
    'document conversion',
    'AI translation',
    'PowerPoint generator',
    'automation tools',
    'business productivity'
  ],
  authors: [{ name: 'Agentic' }],
  creator: 'Agentic',
  publisher: 'Agentic',
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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    siteName: 'Agentic',
    title: 'Agentic - AI Content Creation Platform',
    description: 'Create professional presentations, dub videos, and convert documents with AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agentic AI Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic - AI Content Creation Platform',
    description: 'Create professional presentations, dub videos, and convert documents with AI',
    images: ['/og-image.png'],
    creator: '@agentic'
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
                name: 'Agentic',
                url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
                logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/logo.png`,
                description: 'AI-powered content creation platform for presentations, videos, documents, and translations',
                sameAs: [
                  // TODO: Add your real social media URLs or remove if not applicable
                  'https://twitter.com/agentic',
                  'https://www.facebook.com/agentic',
                  'https://www.linkedin.com/company/agentic',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
                  email: 'support@yourdomain.com', // TODO: Update with real email
                  availableLanguage: ['English', 'Arabic', 'Spanish']
                }
              })
            }}
          />
        </head>
        <body>
          <LocaleProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <QuickActionMenu />
            </div>
          </LocaleProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
