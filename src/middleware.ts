// Temporarily disabled Clerk middleware for development
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en', 'ar', 'es'] as const;
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  // Redirect to default locale if accessing root or path without locale
  if (pathname === '/' || (pathnameIsMissingLocale && !pathname.startsWith('/api') && !pathname.startsWith('/_next'))) {
    // Get preferred locale from cookie or accept-language header
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
    const acceptLanguage = request.headers.get('accept-language');
    
    let preferredLocale = DEFAULT_LOCALE;
    
    // Priority: cookie > accept-language header > default
    if (localeCookie && LOCALES.includes(localeCookie as any)) {
      preferredLocale = localeCookie;
    } else if (acceptLanguage) {
      // Parse accept-language header
      const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());
      for (const lang of languages) {
        if (lang.startsWith('ar')) {
          preferredLocale = 'ar';
          break;
        } else if (lang.startsWith('es')) {
          preferredLocale = 'es';
          break;
        } else if (lang.startsWith('en')) {
          preferredLocale = 'en';
          break;
        }
      }
    }
    
    // Redirect to locale-prefixed URL
    const redirectUrl = new URL(`/${preferredLocale}${pathname === '/' ? '' : pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  const response = NextResponse.next();
  
  // Detect locale from URL for headers
  const localeMatch = pathname.match(/^\/(en|ar|es)(\/|$)/);
  const locale = localeMatch?.[1] || DEFAULT_LOCALE;
  
  // Set headers for RTL detection
  response.headers.set('x-locale', locale);
  response.headers.set('x-dir', locale === 'ar' ? 'rtl' : 'ltr');
  
  // Set locale cookie for future visits
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
