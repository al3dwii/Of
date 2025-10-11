import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { getConverters } from '@/lib/server/converters';
import { LOCALES } from '@/data/locales';
import { siteUrl } from '@/utils/seo';
import StructuredData from '@/components/StructuredData';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type PageParams = { locale: 'en' | 'ar' };

/* ------------------------------------------------------------------ */
/* Rendering strategy                                                  */
/* ------------------------------------------------------------------ */
export const dynamic = 'auto';

/* ------------------------------------------------------------------ */
/* Static params                                                       */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === 'ar';

  const title = isAr
    ? 'جميع الأدوات - أدوات تحويل الملفات المجانية | Sharayeh'
    : 'All Tools - Free File Conversion Tools | Sharayeh';

  const description = isAr
    ? 'استكشف مجموعتنا الكاملة من أدوات تحويل الملفات المجانية عبر الإنترنت. حوّل المستندات والعروض التقديمية والفيديو والصوت بسهولة.'
    : 'Explore our complete collection of free online file conversion tools. Convert documents, presentations, videos, and audio files with ease.';

  const canonical = `${siteUrl}/${locale}/tools`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en/tools`,
        ar: `${siteUrl}/ar/tools`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      images: [{ url: `${siteUrl}/api/og`, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/api/og`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default async function ToolsPage({ params }: { params: PageParams }) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const tools = getConverters();

  // Group tools by category (from/to extensions)
  const categories = new Map<string, typeof tools>();
  
  tools.forEach((tool) => {
    const [fromExt] = tool.dir.split('→');
    const category = fromExt.trim().toUpperCase();
    
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)?.push(tool);
  });

  // Sort categories alphabetically
  const sortedCategories = Array.from(categories.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'الأدوات' : 'Tools',
        item: `${siteUrl}/${locale}/tools`,
      },
    ],
  };

  // Collection page schema
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isAr ? 'أدوات تحويل الملفات' : 'File Conversion Tools',
    description: isAr
      ? 'مجموعة كاملة من أدوات تحويل الملفات المجانية'
      : 'Complete collection of free file conversion tools',
    url: `${siteUrl}/${locale}/tools`,
    inLanguage: locale,
  };

  return (
    <>
      <StructuredData items={breadcrumbJsonLd} />
      <StructuredData items={collectionJsonLd} />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <Link 
                    href={`/${locale}`}
                    className="text-blue-100 hover:text-white hover:underline transition-colors"
                  >
                    {isAr ? 'الرئيسية' : 'Home'}
                  </Link>
                  <span className="text-blue-300 select-none">/</span>
                </li>
                <li>
                  <span className="text-white font-semibold">
                    {isAr ? 'الأدوات' : 'Tools'}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-8 h-8" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  {isAr ? 'جميع أدوات التحويل' : 'All Conversion Tools'}
                </h1>
              </div>
              <p className="text-xl text-blue-100 mb-8">
                {isAr
                  ? `اكتشف ${tools.length} أداة مجانية لتحويل الملفات. حوّل المستندات والعروض التقديمية والوسائط بسهولة.`
                  : `Discover ${tools.length} free tools to convert your files. Transform documents, presentations, and media with ease.`}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder={isAr ? 'ابحث عن أداة...' : 'Search for a tool...'}
                  className="w-full px-6 py-2 rounded-lg text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                  id="toolSearch"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="container mx-auto px-4 py-12">
    

          {/* Categories and Tools */}
          <div className="space-y-12" id="toolsContainer">
            {sortedCategories.map(([category, categoryTools]) => (
              <div key={category} className="tool-category">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {category.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isAr ? `أدوات ${category}` : `${category} Tools`}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {categoryTools.length} {isAr ? 'أداة' : 'tools'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map((tool) => {
                    const [fromExt, toExt] = tool.dir.split('→');
                    const toolLabel = isAr ? tool.label_ar : tool.label_en;
                    const toolSlug = tool.slug_en;

                    return (
                      <Link
                        key={toolSlug}
                        href={`/${locale}/tools/${toolSlug}`}
                        className="tool-card group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-blue-500"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              {fromExt.trim().charAt(0)}
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">
                              {toExt.trim().charAt(0)}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {toolLabel}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {fromExt.trim()}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {toExt.trim()}
                          </span>
                        </div>

                        {tool.search_vol && (
                          <div className="text-xs text-gray-500">
                            {isAr ? 'شائع' : 'Popular'}: {Number(tool.search_vol).toLocaleString()} {isAr ? 'بحث' : 'searches'}
                          </div>
                        )}

                        <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                          {isAr ? 'جرب الآن' : 'Try Now'}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isAr ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isAr
                ? 'اختر أي أداة من الأعلى وابدأ في تحويل ملفاتك مجانًا.'
                : 'Choose any tool above and start converting your files for free.'}
            </p>
          </div>
        </div>
      </div>

      {/* Client-side search script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const searchInput = document.getElementById('toolSearch');
              const toolsContainer = document.getElementById('toolsContainer');
              const categories = document.querySelectorAll('.tool-category');
              
              if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                  const searchTerm = e.target.value.toLowerCase();
                  
                  categories.forEach(category => {
                    const cards = category.querySelectorAll('.tool-card');
                    let visibleCount = 0;
                    
                    cards.forEach(card => {
                      const text = card.textContent.toLowerCase();
                      if (text.includes(searchTerm)) {
                        card.style.display = 'block';
                        visibleCount++;
                      } else {
                        card.style.display = 'none';
                      }
                    });
                    
                    // Hide category if no visible tools
                    category.style.display = visibleCount > 0 ? 'block' : 'none';
                  });
                });
              }
            });
          `,
        }}
      />
    </>
  );
}
