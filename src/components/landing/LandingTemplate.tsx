
// components/landing/LandingTemplate.tsx
'use client';

import { useRouter } from 'next/navigation';
import StructuredData from '@/components/StructuredData';
import Converter from '@/components/Converter';
import PromptForm from '@/components/PromptForm';
import FeatureSectionAr from '@/components/landing/FeatureSectionAr';
import FeatureSectionEn from '@/components/landing/FeatureSectionEn';
import LandingCopyAr from '@/components/landing/LandingCopyAr';
import LandingCopyEn from '@/components/landing/LandingCopyEn';
import FaqAr from '@/components/landing/FaqAr';
import { FaqEn } from '@/components/FaqEn';
import Link from 'next/link';
import type { Converter as ConverterRow } from '@/lib/server/converters';
import type { ToolContent } from '@/lib/server/tool-content';
import { getArVariations, getEnVariations } from '@/utils/variations';

interface LandingTemplateProps {
  locale: 'en' | 'ar';
  row: ConverterRow;
  related: ConverterRow[];
  toolContent?: ToolContent;
}

/** Utility: human readable “DOCX → PPT” string localized */
function dirLabel(row: ConverterRow, isAr: boolean): string {
  const spaced = row.dir.replace('→', ' → ');
  return isAr ? `(${spaced})` : spaced;
}

export default function LandingTemplate({
  locale,
  row,
  related,
  toolContent,
}: LandingTemplateProps) {
  const router = useRouter();
  const isAr = locale === 'ar';

  // Generate keyword variations for on‑page copy
  const variations = isAr
    ? getArVariations(row.label_ar, row.dir)
    : getEnVariations(row.label_en, row.dir);

  // Handle prompt submission - redirect to tool-specific page
  const handlePromptSubmit = (prompt: string) => {
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Map each tool to its dedicated page
    const getToolPage = (slug: string): string => {
      // Video/dubbing tools -> /video page
      if (slug.includes('video') || slug.includes('dubbing')) {
        return 'video';
      }
      
      // PowerPoint/Presentation/Slides tools -> /slides page
      if (slug.includes('powerpoint') || 
          slug.includes('ppt') || 
          slug.includes('slides') ||
          slug.includes('presentation') ||
          slug.includes('word-to-powerpoint') ||
          slug.includes('pdf-to-powerpoint') ||
          slug.includes('create-powerpoint')) {
        return 'agentic';
      }
      
      // PDF conversion tools -> /pdf page
      if (slug.includes('pdf') && !slug.includes('powerpoint')) {
        return 'pdf';
      }
      
      // Document/Word/Excel tools -> /documents page
      if (slug.includes('word') || slug.includes('doc') || slug.includes('excel')) {
        return 'documents';
      }
      
      // Translation tools -> /translate page
      if (slug.includes('translate') || slug.includes('subtitle')) {
        return 'translate';
      }
      
      // HTML/Web tools -> /web page
      if (slug.includes('html') || slug.includes('url')) {
        return 'web';
      }
      
      // Default: redirect to /slides as fallback (most tools are presentation-related)
      return 'agentic';
    };
    
    const toolPage = getToolPage(row.slug_en);
    
    // Redirect to the specific tool page with the prompt
    router.push(`/${locale}/${toolPage}?prompt=${encodedPrompt}&autoStart=true&tool=${row.slug_en}`);
  };

  return (
    <main className="container mt-2 pt-2 min-h-screen mx-auto py-6 space-y-6">
      <header
  className={`flex items-center gap-3 justify-center ${isAr ? "flex-row-reverse text-right" : "text-left"}`}
  dir={isAr ? "rtl" : "ltr"}
>
  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>

  <h1 className="text-3xl font-bold">
    {isAr ? row.label_ar : row.label_en}
  </h1>
</header>

      {/* <header className="text-center space-y-3">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
        <h1 className="text-3xl font-bold">
          {isAr ? row.label_ar : row.label_en}
        </h1>
        
      </header> */}

      {/* AI Tool Generator Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
           
            {/* <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isAr ? `استخدم الذكاء الاصطناعي: ${row.label_ar}` : `Use AI to ${row.label_en}`}
            </h2> */}
            <p className="text-gray-600 text-lg">
              {isAr 
                ? 'صف ما تريد إنشاءه ودع الذكاء الاصطناعي يعمل من أجلك'
                : 'Describe what you want to create and let AI do the work for you'
              }
            </p>
          </div>

          {/* Prompt Form */}
          <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
            <PromptForm 
              onSubmit={handlePromptSubmit} 
              isLoading={false}
            />
            
            {/* Quick Examples */}
            {/* <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">
                {isAr ? 'أمثلة سريعة:' : 'Quick Examples:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(() => {
                  // Generate tool-specific examples based on the tool category
                  const getExamples = () => {
                    const slug = row.slug_en;
                    
                    // Video/dubbing examples
                    if (slug.includes('video')) {
                      return isAr ? [
                        'دبلج فيديو تعليمي إلى العربية',
                        'ترجمة فيديو تسويقي بالذكاء الاصطناعي',
                        'تحويل عرض تقديمي إلى فيديو',
                        'إضافة تعليق صوتي للفيديو',
                      ] : [
                        'Dub educational video to Arabic',
                        'Translate marketing video with AI',
                        'Convert presentation to video',
                        'Add voiceover to video',
                      ];
                    }
                    
                    // PowerPoint/Slides examples
                    if (slug.includes('powerpoint') || slug.includes('ppt') || slug.includes('slides')) {
                      return isAr ? [
                        'عرض تقديمي عن الذكاء الاصطناعي في الرعاية الصحية',
                        'خطة عمل لشركة ناشئة في التكنولوجيا',
                        'دليل تدريب للموظفين الجدد',
                        'استراتيجية تسويق رقمي لعام 2025',
                      ] : [
                        'Presentation about AI in healthcare',
                        'Business plan for a tech startup',
                        'Training guide for new employees',
                        'Digital marketing strategy for 2025',
                      ];
                    }
                    
                    // Translation examples
                    if (slug.includes('translate') || slug.includes('subtitle')) {
                      return isAr ? [
                        'ترجمة عرض تقديمي إلى الإنجليزية',
                        'إضافة ترجمات عربية للشرائح',
                        'ترجمة مستند أعمال إلى العربية',
                        'تحويل النص من اليمين لليسار',
                      ] : [
                        'Translate presentation to English',
                        'Add Arabic subtitles to slides',
                        'Translate business document to Arabic',
                        'Convert text to RTL format',
                      ];
                    }
                    
                    // Generic examples for other tools
                    return isAr ? [
                      `${row.label_ar} للمستند التسويقي`,
                      `${row.label_ar} لتقرير الأعمال`,
                      `${row.label_ar} للعقد القانوني`,
                      `${row.label_ar} للدليل التعليمي`,
                    ] : [
                      `${row.label_en} for marketing document`,
                      `${row.label_en} for business report`,
                      `${row.label_en} for legal contract`,
                      `${row.label_en} for educational guide`,
                    ];
                  };
                  
                  const examples = getExamples();
                  
                  return examples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePromptSubmit(example)}
                      className="text-xs text-left px-3 py-2 rounded-lg transition-colors hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-200 hover:border-blue-300"
                    >
                      {example}
                    </button>
                  ));
                })()}
              </div>
            </div> */}
          </div>

          {/* Features List */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: '⚡', label: isAr ? 'سريع جداً' : 'Lightning Fast' },
              { icon: '🎨', label: isAr ? 'تصميم احترافي' : 'Professional Design' },
              { icon: '🌐', label: isAr ? 'متعدد اللغات' : 'Multi-Language' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl mb-1">{feature.icon}</div>
                <p className="text-xs font-medium text-gray-700">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Converter component */}
      <div id="converter-section">
        <Converter
          locale={locale}
          proxyPath={`/api/ai/${row.slug_en}`}
          templateGalleryPath="/templates"
        />
      </div>

      {/* Features, copy & FAQ */}
      {isAr ? (
        <>
          <FeatureSectionAr row={row} customFeatures={toolContent?.features_ar} />
          <LandingCopyAr row={row} customCopy={toolContent?.copy_ar} />
          <FaqAr row={row} customFAQ={toolContent?.faq_ar} />
        </>
      ) : (
        <>
          <FeatureSectionEn row={row} customFeatures={toolContent?.features_en} />
          <LandingCopyEn row={row} customCopy={toolContent?.copy_en} />
          <FaqEn row={row} customFAQ={toolContent?.faq_en} />
        </>
      )}


      {/* Related converter links (contextual suggestions) */}
      {isAr && related.length > 0 && (
        <section className="mt-12" dir="rtl">

      <script src="https://widget.senja.io/widget/004b216b-7496-4544-943b-fada94eb906d/platform.js" type="text/javascript" async></script>
<div className="senja-embed" data-id="004b216b-7496-4544-943b-fada94eb906d" data-mode="shadow" data-lazyload="false"></div>

          <h3 className="text-xl font-bold">تم البحث أيضاً عن</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {related.map((c) => (
              <li key={c.slug_en}>
                <Link href={`/ar/tools/${c.slug_en}`}>{c.label_ar}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

    </main>
  );
}
