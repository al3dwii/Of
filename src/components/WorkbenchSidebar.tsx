"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Locale = "en" | "ar";

type NavItem = {
  key: string;
  href: string;
  labelEn: string;
  labelAr: string;
  icon: (props: { className?: string }) => JSX.Element;
  external?: boolean;
};

function getLocaleFromPath(pathname: string): Locale {
  const m = pathname.match(/^\/(en|ar)(\/|$)/);
  return (m?.[1] as Locale) || "en";
}

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/* ========================= Icons (inline) ========================= */
const IconApp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" className="fill-white" />
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" className="stroke-slate-200" fill="none" />
    <path d="M8 8h8v2H8zm0 4h6v2H8z" className="fill-slate-800" />
  </svg>
);

const IconPlus = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconSlides = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="4" y="6" width="16" height="12" rx="2" className="fill-transparent" />
    <rect x="4" y="6" width="16" height="12" rx="2" className="stroke-current" strokeWidth="1.6" />
    <path d="M7 9h10M7 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconVideo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="3.5" y="6.5" width="13" height="11" rx="2" className="fill-transparent" />
    <rect x="3.5" y="6.5" width="13" height="11" rx="2" className="stroke-current" strokeWidth="1.6" />
    <path d="M16.5 10l4-2.5v9L16.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IconHome = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M4 10.5l8-6 8 6V19a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2v-8.5z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);

const IconDrive = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M7.5 4h9L22 13.5 16.5 20h-9L2 13.5 7.5 4z" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M7.5 4L12 11h9" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconSettings = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M19.5 12a7.5 7.5 0 0 0-.1-1.2l2.1-1.6-2-3.4-2.5 1a7.6 7.6 0 0 0-2-.9l-.4-2.7H11.4l-.4 2.7a7.6 7.6 0 0 0-2 .9L6.5 4.8l-2 3.4 2.1 1.6a7.5 7.5 0 0 0 0 2.4l-2.1 1.6 2 3.4 2.5-1a7.6 7.6 0 0 0 2 .9l.4 2.7h3.2l.4-2.7a7.6 7.6 0 0 0 2-.9l2.5 1 2-3.4-2.1-1.6c.07-.39.11-.79.11-1.2z" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

const IconLogout = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M15 17l5-5-5-5M20 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 5V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);

/* ========================= Sidebar ========================= */
export default function WorkbenchSidebar({
  className,
  userName,
  userEmail,
  credits,
  planText,
}: {
  className?: string;
  userName?: string;
  userEmail?: string;
  credits?: number;
  planText?: string;
}) {
  const pathname = usePathname() || "/";
  const search = useSearchParams();

  const locale = getLocaleFromPath(pathname);
  const isAr = locale === "ar";
  const dir: "ltr" | "rtl" = isAr ? "rtl" : "ltr";

  const items: NavItem[] = useMemo(
    () => [
      { key: "home",   href: `/${locale}`,        labelEn: "Home",       labelAr: "الرئيسية",               icon: IconHome },
      { key: "new",    href: `/${locale}/slides`, labelEn: "New",        labelAr: "جديد",                   icon: IconPlus },
      { key: "slides", href: `/${locale}/slides`, labelEn: "AI Slides",  labelAr: "شرائح الذكاء الاصطناعي", icon: IconSlides },
      { key: "video",  href: `/${locale}/video`,  labelEn: "AI Video",   labelAr: "فيديو الذكاء الاصطناعي", icon: IconVideo },
      { key: "drive",  href: `/${locale}/drive`,  labelEn: "AI Drive",   labelAr: "سحابة الذكاء",           icon: IconDrive },
    ],
    [locale]
  );

  const activeKey = useMemo(() => {
    const clean = pathname.replace(/\?.*$/, "");
    for (const it of items) {
      if (clean === it.href || clean.startsWith(`${it.href}/`)) return it.key;
    }
    return "";
  }, [pathname, items]);

  const query = search?.toString() ? `?${search?.toString()}` : "";

  return (
    <aside
      dir={dir}
      className={cx(
        "h-full shrink-0 bg-white text-slate-800 border-r border-slate-200 shadow-sm",
        "w-[160px] xl:w-[180px]",
        "flex flex-col",
        className
      )}
      role="navigation"
      aria-label={isAr ? "شريط جانبي" : "Sidebar"}
    >
      {/* Header / Brand */}
      <div className="flex items-center gap-3 px-3 py-3">
        <Link
          href={`/${locale}`}
          className="h-10 w-10 grid place-items-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
          aria-label={isAr ? "التطبيق" : "App"}
        >
          <IconApp className="h-5 w-5" />
        </Link>
        <div className="text-sm font-semibold text-slate-900">apisharayeh</div>
      </div>

      <div className="mx-3 my-2 border-t border-slate-200" />

      {/* Nav (scrollable if needed) */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-3">
        <ul className="space-y-1">
          {items.map((it) => {
            const active = activeKey === it.key;
            const label = isAr ? it.labelAr : it.labelEn;
            return (
              <li key={it.key}>
                <Link
                  href={`${it.href}${query}`}
                  className={cx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition border focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
                    active
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  )}
                  aria-current={active ? "page" : undefined}
                  target={it.external ? "_blank" : undefined}
                  rel={it.external ? "noopener noreferrer" : undefined}
                >
                  <it.icon className={cx("h-5 w-5", active ? "text-white" : "text-indigo-600")} />
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="my-3 border-t border-slate-200" />

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/${locale}/settings`}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <IconSettings className="h-4 w-4" />
            <span>{isAr ? "الإعدادات" : "Settings"}</span>
          </Link>
          <Link
            href={`/${locale}/drive`}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <IconDrive className="h-4 w-4" />
            <span>{isAr ? "الملفات" : "Drive"}</span>
          </Link>
        </div>
      </div>

      {/* Account (always visible) */}
      <div className="flex-none px-3 pb-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-slate-200 grid place-items-center text-sm font-semibold text-slate-700">
              {userName?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-slate-900">
                {userName || (isAr ? "مستخدم" : "User")}
              </div>
              <div className="truncate text-[11px] text-slate-500">
                {userEmail || "user@example.com"}
              </div>
            </div>
          </div>

          <div className="px-3 pb-3 space-y-2">
            <Link
              href={`/${locale}/plans`}
              className="block rounded-lg bg-indigo-600 text-white px-3 py-1.5 text-xs font-semibold text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              {planText || (isAr ? "عرض الخطة" : "View Plan")}
            </Link>

            <div className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-center text-slate-700">
              {isAr ? "الأرصدة" : "Credits"}: {credits ?? 0}
            </div>
            <Link
              href={`/${locale}/support`}
              className="block rounded-lg bg-indigo-600 text-white px-3 py-1.5 text-xs font-semibold text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              {isAr ? "الدعم " : "Support "}
            </Link>

            
          </div>

          <div className="border-t border-slate-200" />

          <button
            onClick={() => {
              // wire sign-out here
            }}
            className="flex w-full items-center justify-center gap-2 rounded-b-2xl bg-slate-100 px-3 py-2 text-xs text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            aria-label={isAr ? "تسجيل الخروج" : "Sign out"}
          >
            <IconLogout className="h-4 w-4" />
            <span>{isAr ? "تسجيل الخروج" : "Sign out"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
