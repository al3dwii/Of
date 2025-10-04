'use client'

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LOCALES, type Locale } from "@/data/locales";


interface NavItem {
  href: string
  labelEn: string
  labelAr: string
  icon: string
  description?: string
  descriptionAr?: string
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter();
  const pathname = usePathname() || "/";
  const search = useSearchParams();

  // Determine current locale from the first segment (fallback to 'en')
  const currentLocale = useMemo<Locale>(() => {
    const m = pathname.match(/^\/(en|ar)(\/|$)/);
    return (m?.[1] as Locale) || "en";
  }, [pathname]);

  const isAr = currentLocale === "ar";
  const otherLocale: Locale = isAr ? "en" : "ar";

  // Preserve the rest of the path after locale, e.g.
  // /ar/slides/convert-word-to-ppt?x=1 -> "slides/convert-word-to-ppt"
  const restPath = useMemo(() => {
    const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
    return stripped.replace(/^\/+/, ""); // remove leading slash
  }, [pathname]);

  // Preserve query params on toggle
  const qs = useMemo(() => (search?.toString() ? `?${search.toString()}` : ""), [search]);

  // Build localized hrefs
  const hrefFor = (locale: Locale, subpath = "") =>
    `/${locale}${subpath ? (subpath.startsWith("/") ? subpath : `/${subpath}`) : ""}`;

  const localizedCurrent = `/${currentLocale}${restPath ? `/${restPath}` : ""}${qs}`;
  const localizedOther = `/${otherLocale}${restPath ? `/${restPath}` : ""}${qs}`;

  // Toggle language (set cookie + navigate)
  function toggleLanguage() {
    try {
      document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // non-blocking
    }
    router.push(localizedOther);
  }

  // Active link helper
  const isActive = (target: string) => {
    // Normalize: compare without trailing slash
    const a = localizedCurrent.replace(/\/+$/, "");
    const b = hrefFor(currentLocale, target).replace(/\/+$/, "");
    return a === b || a.startsWith(`${b}/`);
  };


  // Unified navigation items with multi-language support
  const navigationItems: NavItem[] = [
    { 
      href: "slides", 
      labelEn: "Slides", 
      labelAr: "الشرائح", 
      icon: "📄", 
      description: "AI-generated slides",
      descriptionAr: "الشرائح المولدة بالذكاء الاصطناعي"
    },
    { 
      href: "video", 
      labelEn: "Video", 
      labelAr: "الفيديو", 
      icon: "🎥", 
      description: "Multilingual dubbing",
      descriptionAr: "الدبلجة متعددة اللغات"
    },
    { 
      href: "dashboard", 
      labelEn: "Dashboard", 
      labelAr: "لوحة التحكم", 
      icon: "📊", 
      description: "Overview and stats",
      descriptionAr: "نظرة عامة وإحصائيات"
    },
    { 
      href: "dashboard/presentations", 
      labelEn: "Presentations", 
      labelAr: "العروض التقديمية", 
      icon: "📑", 
      description: "Manage presentations",
      descriptionAr: "إدارة العروض التقديمية"
    },
    { 
      href: "dashboard/analytics", 
      labelEn: "Analytics", 
      labelAr: "التحليلات", 
      icon: "📈", 
      description: "Performance insights",
      descriptionAr: "رؤى الأداء"
    },
  ];

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black bg-black border-b border-white/10"
      dir={isAr ? "rtl" : "ltr"}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link
            href={hrefFor(currentLocale)}
            className="flex items-center gap-2 hover:opacity-90"
            aria-label={isAr ? "الصفحة الرئيسية" : "Home"}
          >
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-white">
                {isAr ? "أولد" : "Oold"}
              </h1>
              <p className="text-xs text-white/60 -mt-0.5">
                {isAr ? "منصة محتوى الذكاء الاصطناعي" : "AI Content Platform"}
              </p>
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
                      : "border-white/10 bg-white/5 text-white hover:border-white/30"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {isAr ? (item.descriptionAr || item.description) : item.description}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Actions + Lang toggle + mobile button */}
        <div className="flex items-center gap-2">
          {/* Search Button - Desktop only */}
          <button 
            className="hidden sm:flex p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isAr ? "بحث" : "Search"}
          >
            <span className="text-lg">🔍</span>
          </button>

          {/* Notifications - Desktop only */}
          <button 
            className="hidden sm:flex relative p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isAr ? "الإشعارات" : "Notifications"}
          >
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile - Desktop only */}
          <div className="hidden sm:block relative">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">U</span>
              </div>
            </button>
          </div>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="relative inline-flex items-center rounded-md border border-white/15 bg-white/5 text-sm px-2 py-1.5 hover:border-white/40"
            aria-label={isAr ? "تغيير اللغة" : "Change language"}
          >
            <span
              className={`inline-flex items-center justify-center rounded-sm text-xs font-semibold w-8 h-6 ${
                isAr ? "bg-white text-black" : "bg-transparent text-white/80"
              }`}
            >
              AR
            </span>
            <span className="mx-1 text-white/30">|</span>
            <span
              className={`inline-flex items-center justify-center rounded-sm text-xs font-semibold w-8 h-6 ${
                !isAr ? "bg-white text-black" : "bg-transparent text-white/80"
              }`}
            >
              EN
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/15 bg-white/5 hover:border-white/40"
            aria-label={isAr ? "فتح القائمة" : "Open menu"}
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
                    <div>{isAr ? item.labelAr : item.labelEn}</div>
                    <div className="text-xs opacity-70">
                      {isAr ? (item.descriptionAr || item.description) : item.description}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}

          {/* Mobile-only actions */}
          <li className="pt-2 border-t border-white/10">
            <div className="flex gap-2">
              <button 
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-white/15 bg-white/5 text-sm text-white hover:border-white/40"
                aria-label={isAr ? "بحث" : "Search"}
              >
                <span>🔍</span>
                <span>{isAr ? "بحث" : "Search"}</span>
              </button>
              <button 
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-white/15 bg-white/5 text-sm text-white hover:border-white/40"
                aria-label={isAr ? "الإشعارات" : "Notifications"}
              >
                <span>🔔</span>
                <span>{isAr ? "الإشعارات" : "Notifications"}</span>
              </button>
            </div>
          </li>

          {/* Language toggle duplicated in drawer */}
          <li>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleLanguage();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 text-sm px-3 py-2 hover:border-white/40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path className="fill-white/80" d="M12 3a9 9 0 100 18 9 9 0 000-18Zm1 2.06A7 7 0 0118.94 11H13V5.06ZM11 5.06V11H5.06A7 7 0 0111 5.06ZM5.06 13H11v5.94A7 7 0 015.06 13ZM13 18.94V13h5.94A7 7 0 0113 18.94Z" />
              </svg>
              {isAr ? "تبديل إلى الإنجليزية" : "Switch to Arabic"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
