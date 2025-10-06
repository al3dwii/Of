import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { getPageCopy } from "@/utils/copy";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const copy = getPageCopy('templatesThemes', params.locale);
  return {
    title: copy.h1,
    description: copy.subhead,
    alternates: {
      canonical: `/${params.locale}/templates`,
    },
  };
}

export default function TemplatesPage({ params }: { params: { locale: Locale } }) {
  const copy = getPageCopy('templatesThemes', params.locale);
  const isAr = params.locale === "ar";

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {copy.h1}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {copy.subhead}
            </p>
            
            <Link
              href={`/${params.locale}/dashboard`}
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg"
            >
              {copy.primaryCTA}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      {copy.features && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copy.features.items.map((category, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{['💼', '📊', '📱', '🎓', '📚', '🔬', '📈', '📋'][idx % 8]}</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{category.split(':')[0]}</p>
                  {category.includes(':') && (
                    <p className="text-sm text-gray-600 mt-1">{category.split(':')[1]?.trim()}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {copy.howItWorks && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {copy.howItWorks.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {copy.howItWorks.steps.map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
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
                <details key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
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
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              {copy.footerCTA}
            </h2>
            <Link
              href={`/${params.locale}/dashboard`}
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {copy.primaryCTA}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
