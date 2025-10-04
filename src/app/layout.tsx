import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Navbar } from '../components/navigation/navbar'
import { Footer } from '../components/navigation/footer'
import { QuickActionMenu } from '../components/navigation/quick-action-menu'
import { LocaleProvider } from '../components/locale-provider'
// import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agentic - AI Content Creation Platform',
  description: 'Create professional presentations and dub videos with artificial intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning>
        <body className={inter.className}>
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
