import Link from 'next/link'
// Locale home (/en, /ar) – lists featured landings for that locale
import Script from "next/script";
import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/data/locales";
import { slidesLandings } from "@/data/landings.slides";



export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "الصفحة الرئيسية" : "Home",
    description: isAr
      ? "حوّل المستندات إلى عروض تقديمية وفيديو باستخدام الذكاء الاصطناعي."
      : "Turn documents into slides and video with AI.",
    alternates: {
      canonical: `/${params.locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l === "ar" ? "ar-KW" : "en-US", `/${l}`])
      ),
    },
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isAr = locale === "ar";
  const featured = slidesLandings.filter((x) => x.locale === locale).slice(0, 6);

  const ar = slidesLandings.find((x) => x.locale === "ar");
  const en = slidesLandings.find((x) => x.locale === "en");

  return (
    
    
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      

       <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Create slides & videos with AI
        </h1>
        <p className="mt-4 text-lg opacity-80">
          Upload a document or paste a topic. We turn it into clean, branded content—fast.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            className="rounded-md bg-white text-black px-5 py-3 font-medium"
            href="/slides"
          >
            Open Slides Workbench
          </Link>
          <Link
            className="rounded-md border border-white/20 px-5 py-3 font-medium"
            href="/video"
          >
            Open Video Workbench
          </Link>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Popular landings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ar && (
            <Link
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
              href={`/${ar.locale}/slides/${encodeURIComponent(ar.slug)}`}
            >
              <div className="text-sm opacity-70 mb-1">Arabic</div>
              <div className="font-semibold">{ar.h1}</div>
              <div className="text-sm opacity-70 mt-1">{ar.description}</div>
            </Link>
          )}
          {en && (
            <Link
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
              href={`/${en.locale}/slides/${encodeURIComponent(en.slug)}`}
            >
              <div className="text-sm opacity-70 mb-1">English</div>
              <div className="font-semibold">{en.h1}</div>
              <div className="text-sm opacity-70 mt-1">{en.description}</div>
            </Link>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          {isAr ? "صفحات شائعة" : "Popular Landings"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.map((n) => (
            <Link
              key={n.slug}
              href={`/${n.locale}/slides/${encodeURIComponent(n.slug)}`}
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
            >
              <div className="font-semibold">{n.h1}</div>
              <div className="text-sm opacity-70 mt-1">{n.description}</div>
            </Link>
          ))}
        </div>
           <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Amazing Content with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate professional presentations and dub videos in multiple languages 
              using cutting-edge artificial intelligence technology.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/dashboard/presentations/new"
                className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to create stunning content
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powered by the Agentic Kernel, our platform offers professional-grade 
              AI tools for content creation and localization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Presentations</h3>
              <p className="text-gray-600">
                Generate professional slide decks from simple prompts. 
                Complete with citations, charts, and export options.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Dubbing</h3>
              <p className="text-gray-600">
                Translate and dub videos with AI voices in 12+ languages. 
                Automatic speech recognition and voice synthesis.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Real-time processing with the Agentic Kernel backend. 
                Generate content in minutes, not hours.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Language</h3>
              <p className="text-gray-600">
                Support for 12+ languages including English, Spanish, French, 
                German, and more. Global reach made easy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">API Access</h3>
              <p className="text-gray-600">
                Full REST API access for integration with your existing 
                workflow. SDKs available for Python and Node.js.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">
                Track performance, usage statistics, and content insights 
                with detailed analytics and reporting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your content workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators using AI to produce amazing content faster than ever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Creating Now
            </Link>
            <Link
              href="/dashboard/help"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
      </section>

      {/* Site-level JSON-LD (WebSite + SearchAction) */}
      <Script
        id={`ld-website-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://yoursite.com",
            name: isAr
              ? "O"
              : "O",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://yoursite.com/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>

  );
}

