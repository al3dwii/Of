// Temporarily disabled Clerk middleware for development
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Detect locale from URL
  const pathname = request.nextUrl.pathname
  const localeMatch = pathname.match(/^\/(en|ar|es)(\/|$)/)
  const locale = localeMatch?.[1] || 'en'
  
  // Set headers for RTL detection
  response.headers.set('x-locale', locale)
  response.headers.set('x-dir', locale === 'ar' ? 'rtl' : 'ltr')
  
  return response
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
