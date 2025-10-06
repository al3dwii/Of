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
  const copy = getPageCopy('pricing', params.locale);
  return {
    title: copy.h1,
    description: copy.subhead,
    alternates: {
      canonical: `/${params.locale}/pricing`,
    },
  };
}

export default function PricingPage({ params }: { params: { locale: Locale } }) {
  const copy = getPageCopy('pricing', params.locale);
  const isAr = params.locale === "ar";

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {copy.h1}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {copy.subhead}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      {copy.features && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copy.features.items.map((plan, idx) => (
                <div key={idx} className={`rounded-lg border-2 p-8 ${idx === 1 ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {plan.split(':')[0]}
                    </h3>
                    <div className="text-gray-700 mb-6 whitespace-pre-line">
                      {plan.split(':')[1]?.trim()}
                    </div>
                    <Link
                      href={`/${params.locale}/dashboard`}
                      className={`block w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                        idx === 1 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {copy.primaryCTA}
                    </Link>
                  </div>
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

      {/* Final CTA */}
      {copy.footerCTA && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              {copy.footerCTA}
            </h2>
            <Link
              href={`/${params.locale}/dashboard`}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
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
