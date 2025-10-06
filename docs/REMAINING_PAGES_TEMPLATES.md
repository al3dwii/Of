# 🚀 Quick Implementation Guide - Remaining 3 Pages

Use these templates to quickly create the remaining pages.

---

## Page 8: Security & Compliance

**Path:** `/src/app/[locale]/security/page.tsx`

```typescript
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { getPageCopy } from "@/utils/copy";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const copy = getPageCopy('security', params.locale);
  return {
    title: copy.h1,
    description: copy.subhead,
    alternates: {
      canonical: `/${params.locale}/security`,
    },
  };
}

export default function SecurityPage({ params }: { params: { locale: Locale } }) {
  const copy = getPageCopy('security', params.locale);
  const isAr = params.locale === "ar";

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {copy.h1}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {copy.subhead}
          </p>
        </div>
      </section>

      {/* Security Practices */}
      {copy.features && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {copy.features.items.slice(0, 6).map((item, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{['🔒', '🛡️', '🔐', '📊', '⚡', '✅'][idx % 6]}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compliance Certifications */}
      {copy.features && copy.features.items.length > 6 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {isAr ? "الشهادات والامتثال" : "Compliance Certifications"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {copy.features.items.slice(6).map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{['🏆', '🌍', '🔏', '📋', '✓', '🛡️'][idx % 6]}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {copy.faq && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.faq.title}
            </h2>
            <div className="space-y-4">
              {copy.faq.items.map((item, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <summary className="font-semibold cursor-pointer text-lg text-gray-900">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      {copy.footerCTA && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              {copy.footerCTA}
            </h2>
            <Link
              href={`/${params.locale}/dashboard`}
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {copy.primaryCTA}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Schema */}
      {copy.faq && (
        <Script
          id={`ld-faq-${params.locale}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: copy.faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}
    </main>
  );
}
```

**Test:**
- `http://localhost:3000/en/security`
- `http://localhost:3000/ar/security`

---

## Page 9: Integrations

**Path:** `/src/app/[locale]/integrations/page.tsx`

```typescript
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { getPageCopy } from "@/utils/copy";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const copy = getPageCopy('integrations', params.locale);
  return {
    title: copy.h1,
    description: copy.subhead,
    alternates: {
      canonical: `/${params.locale}/integrations`,
    },
  };
}

export default function IntegrationsPage({ params }: { params: { locale: Locale } }) {
  const copy = getPageCopy('integrations', params.locale);
  const isAr = params.locale === "ar";

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {copy.h1}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {copy.subhead}
          </p>
          <Link
            href={`/${params.locale}/dashboard`}
            className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-cyan-700 transition-colors shadow-lg"
          >
            {copy.primaryCTA}
          </Link>
        </div>
      </section>

      {/* Featured Integrations */}
      {copy.features && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copy.features.items.slice(0, 8).map((item, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{['📁', '☁️', '📦', '📝', '🔗', '📊', '💬', '🔌'][idx % 8]}</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-center">{item.split(':')[0]}</p>
                  {item.includes(':') && (
                    <p className="text-sm text-gray-600 mt-1 text-center">{item.split(':')[1]?.trim()}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Developer Tools */}
      {copy.features && copy.features.items.length > 8 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {isAr ? "أدوات المطورين" : "Developer Tools"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {copy.features.items.slice(8).map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{['🔧', '📚', '⚙️', '🌐', '🔐', '📡'][idx % 6]}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {copy.faq && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.faq.title}
            </h2>
            <div className="space-y-4">
              {copy.faq.items.map((item, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors">
                  <summary className="font-semibold cursor-pointer text-lg text-gray-900">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      {copy.footerCTA && (
        <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              {copy.footerCTA}
            </h2>
            <Link
              href={`/${params.locale}/dashboard`}
              className="inline-block bg-white text-cyan-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {copy.primaryCTA}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Schema */}
      {copy.faq && (
        <Script
          id={`ld-faq-${params.locale}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: copy.faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}
    </main>
  );
}
```

**Test:**
- `http://localhost:3000/en/integrations`
- `http://localhost:3000/ar/integrations`

---

## Page 10: Use Cases Hub

**Path:** `/src/app/[locale]/use-cases/page.tsx`

```typescript
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { getPageCopy } from "@/utils/copy";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const copy = getPageCopy('useCases', params.locale);
  return {
    title: copy.h1,
    description: copy.subhead,
    alternates: {
      canonical: `/${params.locale}/use-cases`,
    },
  };
}

export default function UseCasesPage({ params }: { params: { locale: Locale } }) {
  const copy = getPageCopy('useCases', params.locale);
  const isAr = params.locale === "ar";

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {copy.h1}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {copy.subhead}
          </p>
          <Link
            href={`/${params.locale}/dashboard`}
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors shadow-lg"
          >
            {copy.primaryCTA}
          </Link>
        </div>
      </section>

      {/* Role-Specific Use Cases */}
      {copy.features && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copy.features.items.slice(0, 8).map((item, idx) => (
                <Link
                  key={idx}
                  href={`/${params.locale}/use-cases/${item.split(':')[0].toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-6 rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{['💼', '📢', '🎓', '🚀', '⚙️', '🔬', '👥', '📦'][idx % 8]}</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{item.split(':')[0]}</p>
                  {item.includes(':') && (
                    <p className="text-sm text-gray-600 mt-2">{item.split(':')[1]?.trim()}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What's Included */}
      {copy.features && copy.features.items.length > 8 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {isAr ? "ما المتضمن" : "What's Included"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {copy.features.items.slice(8).map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{['✨', '🎨', '📊', '🔄', '💡', '🎯'][idx % 6]}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {copy.faq && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.faq.title}
            </h2>
            <div className="space-y-4">
              {copy.faq.items.map((item, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                  <summary className="font-semibold cursor-pointer text-lg text-gray-900">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      {copy.footerCTA && (
        <section className="py-16 bg-gradient-to-r from-orange-600 to-yellow-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              {copy.footerCTA}
            </h2>
            <Link
              href={`/${params.locale}/dashboard`}
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {copy.primaryCTA}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Schema */}
      {copy.faq && (
        <Script
          id={`ld-faq-${params.locale}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: copy.faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}
    </main>
  );
}
```

**Test:**
- `http://localhost:3000/en/use-cases`
- `http://localhost:3000/ar/use-cases`

---

## 🎯 Quick Create Commands

Copy-paste these three files to complete all 10 pages:

```bash
# Security page
cat > src/app/[locale]/security/page.tsx << 'EOF'
[paste Security page code from above]
EOF

# Integrations page
cat > src/app/[locale]/integrations/page.tsx << 'EOF'
[paste Integrations page code from above]
EOF

# Use Cases page
cat > src/app/[locale]/use-cases/page.tsx << 'EOF'
[paste Use Cases page code from above]
EOF
```

Then test with:
```bash
npm run dev
open http://localhost:3000/en
```

---

## ✅ All 10 Pages Complete!

Once you create these 3 remaining pages, you'll have:

1. ✅ Home
2. ✅ Pricing
3. ✅ FAQ
4. ✅ AI Presentation Generator
5. ✅ Doc to Slides
6. ✅ Templates & Themes
7. ✅ Enterprise & Teams
8. ⏳ Security & Compliance
9. ⏳ Integrations
10. ⏳ Use Cases Hub

**Total:** 10 pages × 2 languages = **20 complete page versions!** 🎉
