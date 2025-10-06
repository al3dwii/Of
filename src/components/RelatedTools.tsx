// src/components/RelatedTools.tsx
import Link from 'next/link';
import type { Converter as ConverterRow } from '@/lib/server/converters';

interface RelatedToolsProps {
  tools: ConverterRow[];
  locale: 'en' | 'ar';
  className?: string;
}

/**
 * RelatedTools Component
 * 
 * Displays a grid of related conversion tools with proper internal linking.
 * Improves SEO through contextual internal links and user navigation.
 * 
 * @param tools - Array of related converter tools
 * @param locale - Current language (en/ar)
 * @param className - Optional additional CSS classes
 */
export default function RelatedTools({ tools, locale, className = '' }: RelatedToolsProps) {
  const isAr = locale === 'ar';
  
  if (tools.length === 0) return null;

  const heading = isAr ? 'أدوات ذات صلة' : 'Related Tools';
  const subheading = isAr 
    ? 'اكتشف المزيد من أدوات التحويل المفيدة'
    : 'Discover more useful conversion tools';

  return (
    <section 
      className={`mt-16 py-12 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 ${className}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {heading}
          </h2>
          <p className="text-gray-600 text-lg">
            {subheading}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const [fromExt, toExt] = tool.dir.split('→');
            const toolLabel = isAr ? tool.label_ar : tool.label_en;
            const toolUrl = `/${locale}/tools/${tool.slug_en}`;

            return (
              <Link
                key={tool.slug_en}
                href={toolUrl}
                className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
                    />
                  </svg>
                </div>

                {/* Tool Label */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {toolLabel}
                </h3>

                {/* Conversion Direction */}
                <p className="text-sm text-gray-600 mb-3">
                  {fromExt} → {toExt}
                </p>

                {/* CTA Badge */}
                <div className="inline-flex items-center text-xs font-medium text-blue-600 group-hover:text-blue-700">
                  {isAr ? 'جرب الآن' : 'Try Now'}
                  <svg 
                    className={`w-4 h-4 ${isAr ? 'mr-1 rotate-180' : 'ml-1'} group-hover:translate-x-1 transition-transform`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Browse All Link */}
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            {isAr ? 'تصفح جميع الأدوات' : 'Browse All Tools'}
            <svg 
              className={`w-5 h-5 ${isAr ? 'mr-2 rotate-180' : 'ml-2'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
