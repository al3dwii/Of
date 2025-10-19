import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en', 'ar', 'es', 'fr'] as const;
const DEFAULT_LOCALE = 'en';

export default clerkMiddleware((auth: any, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  
  // Check if it's a dashboard route
  const isDashboardRoute = /^\/(en|ar|es|fr)\/dashboard/.test(pathname);
  
  // Protect dashboard routes
  if (isDashboardRoute) {
    auth().protect()
  }
  
  return handleLocaleMiddleware(req)
})

function handleLocaleMiddleware(request: any) {
  const pathname = request.nextUrl.pathname;
  
  // Skip static files and API routes
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/static') ||
      pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf|otf|css|js)$/)) {
    return NextResponse.next();
  }
  
  // Detect if request is from a bot/crawler
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator/i.test(userAgent);
  
  // Check if pathname already has a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  
  // If path already has a locale, don't redirect
  if (pathnameHasLocale) {
    const response = NextResponse.next();
    
    // Detect locale from URL for headers
    const localeMatch = pathname.match(/^\/(en|ar|es|fr)(\/|$)/);
    const locale = localeMatch?.[1] || DEFAULT_LOCALE;
    
    // Set headers for RTL detection
    response.headers.set('x-locale', locale);
    response.headers.set('x-dir', locale === 'ar' ? 'rtl' : 'ltr');
    
    // Set locale cookie for future visits (but don't affect bots)
    if (!isBot) {
      response.cookies.set('NEXT_LOCALE', locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      });
    }
    
    return response;
  }
  
  // Only redirect if pathname is truly missing locale
  if (pathname === '/' || !pathnameHasLocale) {
    let preferredLocale = DEFAULT_LOCALE;
    
    // For bots, always use default locale (don't check cookies/headers)
    if (!isBot) {
      // Get preferred locale from cookie or accept-language header
      const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
      const acceptLanguage = request.headers.get('accept-language');
      
      // Priority: cookie > accept-language header > default
      if (localeCookie && LOCALES.includes(localeCookie as any)) {
        preferredLocale = localeCookie;
      } else if (acceptLanguage) {
        // Parse accept-language header
        const languages = acceptLanguage.split(',').map((lang: string) => lang.split(';')[0].trim().toLowerCase());
        for (const lang of languages) {
          if (lang.startsWith('ar')) {
            preferredLocale = 'ar';
            break;
          } else if (lang.startsWith('es')) {
            preferredLocale = 'es';
            break;
          } else if (lang.startsWith('fr')) {
            preferredLocale = 'fr';
            break;
          } else if (lang.startsWith('en')) {
            preferredLocale = 'en';
            break;
          }
        }
      }
    }
    
    // Redirect to locale-prefixed URL
    const redirectUrl = new URL(`/${preferredLocale}${pathname === '/' ? '' : pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
