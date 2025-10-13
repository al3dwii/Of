import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { type Locale } from "@/data/locales"
import { slidesLandings } from "@/data/landings.slides"
import { getPageCopy } from "@/utils/copy"
import { getTranslation } from "@/i18n"

interface PageProps {
  params: { locale: Locale }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = getTranslation(params.locale)
  return {
    title: t.home.hero.title,
    description: t.home.hero.subtitle,
    alternates: {
      canonical: `/${params.locale}`,
    },
  }
}

export default function HomePage({ params }: PageProps) {
  const { locale } = params
  const t = getTranslation(locale)
  const copy = getPageCopy('home', locale)
  const isAr = locale === "ar"
  const featured = slidesLandings.filter((x) => x.locale === locale).slice(0, 6)

  const ar = slidesLandings.find((x) => x.locale === "ar")
  const en = slidesLandings.find((x) => x.locale === "en")

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.home.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.home.hero.subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/dashboard`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                {t.home.hero.ctaSlides}
              </Link>
              <Link
                href={`/${locale}/slides`}
                className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t.home.hero.ctaConvert}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {copy.features?.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copy.features?.items.map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{['🤖', '📄', '⚡', '🎨', '🌐'][idx % 5]}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {copy.howItWorks && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.howItWorks.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copy.howItWorks.steps.map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      {copy.socialProof && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.socialProof.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {copy.socialProof.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-gray-700 text-lg">{stat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {copy.faq && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.faq.title}
            </h2>
            <div className="space-y-4">
              {copy.faq.items.map((item, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
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

      {/* Final CTA Section */}
      {copy.footerCTA && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              {copy.footerCTA}
            </h2>
            <Link
              href={`/${locale}/dashboard`}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {copy.primaryCTA}
            </Link>
          </div>
        </section>
      )}

      {/* Schema.org JSON-LD */}
      <Script
        id={`ld-website-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: `https://yoursite.com/${locale}`,
            name: t.brand.name,
            description: t.home.hero.subtitle,
            inLanguage: locale,
            potentialAction: {
              "@type": "SearchAction",
              target: `https://yoursite.com/${locale}/{search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      {copy.faq && (
        <Script
          id={`ld-faq-${locale}`}
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
  )
}
