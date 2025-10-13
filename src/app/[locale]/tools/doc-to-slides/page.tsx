import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { getTranslation } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = getTranslation(params.locale);
  return {
    title: t.docToSlides.hero.title,
    description: t.docToSlides.hero.subtitle,
    alternates: {
      canonical: `/${params.locale}/tools/doc-to-slides`,
    },
  };
}

export default function DocToSlidesPage({ params }: { params: { locale: Locale } }) {
  const t = getTranslation(params.locale);
  const isAr = params.locale === "ar";

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.docToSlides.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.docToSlides.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${params.locale}/dashboard`}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors shadow-lg"
              >
                {t.docToSlides.hero.ctaPrimary}
              </Link>
              <Link
                href={`/${params.locale}/documents`}
                className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t.docToSlides.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.docToSlides.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.docToSlides.features.items.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{['📄', '🤖', '🎨', '⚡', '�', '✨'][idx % 6]}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.docToSlides.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.docToSlides.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {idx + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.docToSlides.faq.title}
          </h2>
          <div className="space-y-4">
            {t.docToSlides.faq.items.map((item, idx) => (
              <details key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                <summary className="font-semibold cursor-pointer text-lg text-gray-900">
                  {item.q}
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            {t.docToSlides.cta.title}
          </h2>
          <Link
            href={`/${params.locale}/dashboard`}
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
          >
            {t.docToSlides.cta.button}
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <Script
        id={`ld-faq-${params.locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.docToSlides.faq.items.map((item) => ({
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
    </main>
  );
}
