"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LOCALES, type Locale } from "@/data/locales";

/**
 * Professional top nav with:
 * - Locale-aware links (/, /[locale]/slides, /[locale]/video, etc.)
 * - Robust language toggle (preserves slug + query, sets cookie)
 * - Active link highlighting
 * - Mobile menu
 * - RTL support for Arabic
 */
export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const search = useSearchParams();
  const [open, setOpen] = useState(false);

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

  // Nav items (add/remove as needed)
  const items: { href: string; labelEn: string; labelAr: string }[] = [
    // { href: "", labelEn: "Home", labelAr: "الرئيسية" },
    { href: "slides", labelEn: "Slides", labelAr: "الشرائح" },
    { href: "video", labelEn: "Video", labelAr: "الفيديو" },
    // { href: "pricing", labelEn: "Pricing", labelAr: "الأسعار" },
    // { href: "faq", labelEn: "FAQ", labelAr: "الأسئلة" },
  ];

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10"
      dir={isAr ? "rtl" : "ltr"}
    >
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link
            href={hrefFor(currentLocale)}
            className="flex items-center gap-2 font-semibold hover:opacity-90"
            aria-label={isAr ? "الصفحة الرئيسية" : "Home"}
          >
            {/* Minimal logo (SVG) */}
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9A3.5 3.5 0 0 1 16.5 20h-9A3.5 3.5 0 0 1 4 16.5v-9Z"
                className="fill-white/10"
              />
              <path
                d="M8 8h8v2H8zm0 4h6v2H8z"
                className="fill-white/80"
              />
            </svg>
            <span className="text-sm md:text-base">
              {isAr ? " O " : "O"}
            </span>
          </Link>
        </div>

        {/* Center: Desktop links */}
        <ul className="hidden md:flex items-center gap-3">
          {items.map((it) => {
            const href = hrefFor(currentLocale, it.href);
            const active = isActive(it.href);
            return (
              <li key={it.href}>
                <Link
                  href={href}
                  className={`px-3 py-1.5 rounded-md text-sm border transition ${
                    active
                      ? "bg-white text-black border-white"
                      : "border-white/10 bg-white/5 text-white hover:border-white/30"
                  }`}
                >
                  {isAr ? it.labelAr : it.labelEn}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Lang toggle + mobile button */}
        <div className="flex items-center gap-2">
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
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path className="fill-white/80" d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden border-t border-white/10 bg-black/70 transition-[max-height] overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="px-4 py-3 space-y-2">
          {items.map((it) => {
            const href = hrefFor(currentLocale, it.href);
            const active = isActive(it.href);
            return (
              <li key={it.href}>
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded-md text-sm border ${
                    active
                      ? "bg-white text-black border-white"
                      : "border-white/10 bg-white/5 text-white hover:border-white/30"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {isAr ? it.labelAr : it.labelEn}
                </Link>
              </li>
            );
          })}

          {/* Language toggle duplicated in drawer */}
          <li className="pt-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
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
  );
}
