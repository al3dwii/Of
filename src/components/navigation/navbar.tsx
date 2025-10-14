'use client'

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LOCALES, type Locale } from "@/data/locales";
import { UserButton, useUser } from '@clerk/nextjs';


import Image from 'next/image';

interface NavItem {
  href: string
  labelEn: string
  labelAr: string
  labelEs: string
  labelFr: string
  icon: string
  description?: string
  descriptionAr?: string
  descriptionEs?: string
  descriptionFr?: string
}

interface dash {
  href: string
  labelEn: string
  labelAr: string
  labelEs: string
  labelFr: string
  icon: string
  description?: string
  descriptionAr?: string
  descriptionEs?: string
  descriptionFr?: string
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const { isSignedIn } = useUser();


  const router = useRouter();
  const pathname = usePathname() || "/";
  const search = useSearchParams();

  // Determine current locale from the first segment (fallback to 'en')
  const currentLocale = useMemo<Locale>(() => {
    const m = pathname.match(/^\/(en|ar|es|fr)(\/|$)/);
    return (m?.[1] as Locale) || "en";
  }, [pathname]);

  const isAr = currentLocale === "ar";

  // Preserve the rest of the path after locale, e.g.
  // /ar/slides/convert-word-to-ppt?x=1 -> "slides/convert-word-to-ppt"
  const restPath = useMemo(() => {
    const stripped = pathname.replace(/^\/(en|ar|es|fr)(?=\/|$)/, "");
    return stripped.replace(/^\/+/, ""); // remove leading slash
  }, [pathname]);

  // Preserve query params on toggle
  const qs = useMemo(() => (search?.toString() ? `?${search.toString()}` : ""), [search]);

  // Build localized hrefs
  const hrefFor = (locale: Locale, subpath = "") =>
    `/${locale}${subpath ? (subpath.startsWith("/") ? subpath : `/${subpath}`) : ""}`;

  const localizedCurrent = `/${currentLocale}${restPath ? `/${restPath}` : ""}${qs}`;

  // Switch to a specific language (set cookie + navigate)
  function switchToLanguage(newLocale: Locale) {
    try {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // non-blocking
    }
    const newUrl = `/${newLocale}${restPath ? `/${restPath}` : ""}${qs}`;
    router.push(newUrl);
  }

  // Active link helper
  const isActive = (target: string) => {
    // Normalize: compare without trailing slash
    const a = localizedCurrent.replace(/\/+$/, "");
    const b = hrefFor(currentLocale, target).replace(/\/+$/, "");
    return a === b || a.startsWith(`${b}/`);
  };


  // Helper to get label by current locale
  const getLabel = (item: NavItem) => {
    if (currentLocale === 'ar') return item.labelAr
    if (currentLocale === 'es') return item.labelEs
    if (currentLocale === 'fr') return item.labelFr
    return item.labelEn
  }

  const getDescription = (item: NavItem) => {
    if (currentLocale === 'ar') return item.descriptionAr || item.description
    if (currentLocale === 'es') return item.descriptionEs || item.description
    if (currentLocale === 'fr') return item.descriptionFr || item.description
    return item.description
  }

  // Unified navigation items with multi-language support
  const navigationItems: NavItem[] = [
    { 
      href: "solutions", 
      labelEn: "Solutions", 
      labelAr: "الحلول",
      labelEs: "Soluciones",
      labelFr: "Solutions",
      icon: "📄", 
      description: "AI-generated slides",
      descriptionAr: "الشرائح المولدة بالذكاء الاصطناعي",
      descriptionEs: "Diapositivas generadas por IA",
      descriptionFr: "Diapositives générées par IA"
    },
    { 
      href: "tools", 
      labelEn: "Tools", 
      labelAr: "الأدوات",
      labelEs: "Herramientas",
      labelFr: "Outils",
      icon: "📄", 
      description: "AI-generated slides",
      descriptionAr: "الشرائح المولدة بالذكاء الاصطناعي",
      descriptionEs: "Diapositivas generadas por IA",
      descriptionFr: "Diapositives générées par IA"
    },
  
  
     {
  href: "blog",
  labelEn: "Blog",
  labelAr: "المدونة",
  labelEs: "Blog",
  labelFr: "Blog",
  icon: "📝",
  description: "Multilingual blog and updates",
  descriptionAr: "مدونة متعددة اللغات وتحديثات",
  descriptionEs: "Blog multilingüe y actualizaciones",
  descriptionFr: "Blog multilingue et mises à jour"
},
 
  ];
  
  const dash: dash[] = [


  { 
      href: "dashboard", 
      labelEn: "Dashboard", 
      labelAr: "لوحة التحكم",
      labelEs: "Panel",
      labelFr: "Tableau de bord",
      icon: "📊", 
      description: "Overview and stats",
      descriptionAr: "نظرة عامة وإحصائيات",
      descriptionEs: "Resumen y estadísticas",
      descriptionFr: "Aperçu et statistiques"
    },
  ];

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black bg-black border-b border-white/10"
      dir={isAr ? "rtl" : "ltr"}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        {/* Logo */}
        {/* <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10 animate-spin">
            <Image
              fill
              alt="Logo"
              src="/logo.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <span className="ml-2 text-2xl font-bold text-white">Sharayeh</span>
        </Link> */}

        <div className="flex items-center gap-3">
          <Link
            href={hrefFor(currentLocale)}
            className="flex items-center gap-2 hover:opacity-90"
            aria-label={currentLocale === 'ar' ? "الصفحة الرئيسية" : currentLocale === 'es' ? "Inicio" : "Home"}
          >
            <div className="relative h-10 w-10 animate-spin">
            <Image
              fill
              alt="Logo"
              src="/logo.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
            {/* <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div> */}
            <div className="hidden sm:block">
              <h2 className="text-xl p-2 font-bold text-white">
                {currentLocale === 'ar' ? "شرايح" : "Sharayeh"}
              </h2>
              {/* <p className="text-xs text-white/80 -mt-0.5">
                {currentLocale === 'ar' ? "منصة محتوى الذكاء الاصطناعي" : currentLocale === 'es' ? "Plataforma de Contenido IA" : "AI Content Platform"}
              </p> */}
            </div>
          </Link>
        </div>
        

        {/* Center: Desktop links */}
        <ul className="hidden md:flex items-center gap-2">
          {navigationItems.map((item) => {
            const href = hrefFor(currentLocale, item.href);
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className={`group relative px-3 py-2 rounded-md text-sm border transition flex items-center gap-2 ${
                    active
                      ? "bg-white text-black border-white"
                      : "border-white/10 bg-white/5 text-white hover:border-yellow-300"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{getLabel(item)}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-yellow-300 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {getDescription(item)}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

         <div className="flex items-center gap-4">

          {isSignedIn ? (
            <>
              {dash.map((item) => (
                
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-3 py-2 rounded-md text-sm border transition flex items-center gap-2 ${
                    isActive(item.href)
                      ? "bg-white text-black border-white"
                      : "border-white/10 bg-white/5 text-white hover:border-yellow-300"
                  }`}
                >
                  {getLabel(item)}
                </Link>
              ))}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/sign-up"
                className="bg-[#7859ff] text-white py-2 px-4 rounded-xl hover:bg-[#7859ff]/80"
              >
                {currentLocale === 'ar' ? 'التسجيل' : currentLocale === 'es' ? 'Registrarse' : currentLocale === 'fr' ? "S'inscrire" : 'Sign Up'}
              </Link>
              <Link
                href="/sign-in"
                className="bg-[#5f4b8b]/60 text-white py-2 px-4 rounded-xl hover:bg-[#7859ff]/80"
              >
                {currentLocale === 'ar' ? 'الدخول' : currentLocale === 'es' ? 'Iniciar Sesión' : currentLocale === 'fr' ? 'Se Connecter' : 'Sign In'}
              </Link>
            </div>
          )}
        </div>

        {/* Right: Actions + Lang toggle + mobile button */}
        <div className="flex items-center gap-2">
          {/* Search Button - Desktop only */}
          {/* <button 
            className="hidden sm:flex p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={currentLocale === 'ar' ? "بحث" : currentLocale === 'es' ? "Buscar" : "Search"}
          >
            <span className="text-lg">🔍</span>
          </button> */}

          {/* Notifications - Desktop only */}
          {/* <button 
            className="hidden sm:flex relative p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={currentLocale === 'ar' ? "الإشعارات" : currentLocale === 'es' ? "Notificaciones" : "Notifications"}
          >
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}

          {/* User Profile - Desktop only */}
          {/* <div className="hidden sm:block relative">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">U</span>
              </div>
            </button>
          </div> */}

          {/* Language selector dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="relative inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 text-sm px-3 py-1.5 hover:border-white/40 transition-colors"
              aria-label={currentLocale === 'ar' ? "تغيير اللغة" : currentLocale === 'es' ? "Cambiar idioma" : currentLocale === 'fr' ? "Changer de langue" : "Change language"}
            >
              <span className="text-base">
                {currentLocale === 'en' ? '🇬🇧' : currentLocale === 'ar' ? '🇸🇦' : currentLocale === 'es' ? '🇪🇸' : '🇫🇷'}
              </span>
              <span className="text-white font-medium">
                {currentLocale === 'en' ? 'EN' : currentLocale === 'ar' ? 'AR' : currentLocale === 'es' ? 'ES' : 'FR'}
              </span>
              <svg 
                className={`w-4 h-4 text-white/60 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isLangDropdownOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLangDropdownOpen(false)}
                />
                
                {/* Dropdown content */}
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-gray-900 shadow-xl z-50 overflow-hidden">
                  <div className="py-1">
                    {/* English */}
                    <button
                      type="button"
                      onClick={() => {
                        switchToLanguage('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        currentLocale === 'en'
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">🇬🇧</span>
                      <span className="flex-1 text-left">English</span>
                      {currentLocale === 'en' && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* Arabic */}
                    <button
                      type="button"
                      onClick={() => {
                        switchToLanguage('ar');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        currentLocale === 'ar'
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">🇸🇦</span>
                      <span className="flex-1 text-left">العربية</span>
                      {currentLocale === 'ar' && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* Spanish */}
                    <button
                      type="button"
                      onClick={() => {
                        switchToLanguage('es');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        currentLocale === 'es'
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">🇪🇸</span>
                      <span className="flex-1 text-left">Español</span>
                      {currentLocale === 'es' && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* French */}
                    <button
                      type="button"
                      onClick={() => {
                        switchToLanguage('fr');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        currentLocale === 'fr'
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">🇫🇷</span>
                      <span className="flex-1 text-left">Français</span>
                      {currentLocale === 'fr' && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/15 bg-white/5 hover:border-white/40"
            aria-label={currentLocale === 'ar' ? "فتح القائمة" : currentLocale === 'es' ? "Abrir menú" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path 
                className="fill-white/80" 
                d={isMobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"} 
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden border-t border-white/10 bg-black/70 transition-[max-height] overflow-hidden ${
          isMobileMenuOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <ul className="px-4 py-3 space-y-2">
          {navigationItems.map((item) => {
            const href = hrefFor(currentLocale, item.href);
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm border ${
                    active
                      ? "bg-white text-black border-white"
                      : "border-white/10 bg-white/5 text-white hover:border-white/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div>{getLabel(item)}</div>
                    <div className="text-xs opacity-70">
                      {getDescription(item)}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}

          {/* Mobile-only actions */}
{/*           
          <li className="pt-2 border-t border-white/10">
            <div className="flex gap-2">
              <button 
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-white/15 bg-white/5 text-sm text-white hover:border-white/40"
                aria-label={currentLocale === 'ar' ? "بحث" : currentLocale === 'es' ? "Buscar" : "Search"}
              >
                <span>🔍</span>
                <span>{currentLocale === 'ar' ? "بحث" : currentLocale === 'es' ? "Buscar" : "Search"}</span>
              </button>
              <button 
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-white/15 bg-white/5 text-sm text-white hover:border-white/40"
                aria-label={currentLocale === 'ar' ? "الإشعارات" : currentLocale === 'es' ? "Notificaciones" : "Notifications"}
              >
                <span>🔔</span>
                <span>{currentLocale === 'ar' ? "الإشعارات" : currentLocale === 'es' ? "Notificaciones" : "Notifications"}</span>
              </button>
            </div>
          </li> */}

          

          {/* Language selector in drawer */}
          <li>
            <div className="space-y-2">
              <div className="text-xs text-white/60 px-3">
                {currentLocale === 'ar' ? 'اختر اللغة' : currentLocale === 'es' ? 'Elegir idioma' : currentLocale === 'fr' ? 'Choisir la langue' : 'Choose language'}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    switchToLanguage('en');
                  }}
                  className={`flex items-center justify-center gap-1 rounded-md border text-sm px-3 py-2 transition ${
                    currentLocale === 'en'
                      ? 'bg-white text-black border-white'
                      : 'border-white/15 bg-white/5 text-white hover:border-white/40'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    switchToLanguage('ar');
                  }}
                  className={`flex items-center justify-center gap-1 rounded-md border text-sm px-3 py-2 transition ${
                    currentLocale === 'ar'
                      ? 'bg-white text-black border-white'
                      : 'border-white/15 bg-white/5 text-white hover:border-white/40'
                  }`}
                >
                  <span>🇸🇦</span>
                  <span>AR</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    switchToLanguage('es');
                  }}
                  className={`flex items-center justify-center gap-1 rounded-md border text-sm px-3 py-2 transition ${
                    currentLocale === 'es'
                      ? 'bg-white text-black border-white'
                      : 'border-white/15 bg-white/5 text-white hover:border-white/40'
                  }`}
                >
                  <span>🇪🇸</span>
                  <span>ES</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    switchToLanguage('fr');
                  }}
                  className={`flex items-center justify-center gap-1 rounded-md border text-sm px-3 py-2 transition ${
                    currentLocale === 'fr'
                      ? 'bg-white text-black border-white'
                      : 'border-white/15 bg-white/5 text-white hover:border-white/40'
                  }`}
                >
                  <span>🇫🇷</span>
                  <span>FR</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  )
}
