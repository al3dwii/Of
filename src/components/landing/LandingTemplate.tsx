
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
import  buildHowToSchema from '@/components/StructuredData';
import { getArVariations, getEnVariations } from '@/utils/variations';

interface LandingTemplateProps {
  locale: 'en' | 'ar';
  row: ConverterRow;
  related: ConverterRow[];
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
}: LandingTemplateProps) {
  const router = useRouter();
  const isAr = locale === 'ar';

  // Generate keyword variations for on‑page copy
  const variations = isAr
    ? getArVariations(row.label_ar, row.dir)
    : getEnVariations(row.label_en, row.dir);

  // Handle prompt submission - redirect to slides page with prompt
  const handlePromptSubmit = (prompt: string) => {
    // Encode the prompt and redirect to slides page
    const encodedPrompt = encodeURIComponent(prompt);
    router.push(`/${locale}/slides?prompt=${encodedPrompt}&autoStart=true`);
  };

  return (
    <main className="container mt-16 pt-16 min-h-screen mx-auto py-12 space-y-12">
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-bold">
          {isAr ? row.label_ar : row.label_en}
        </h1>
        <p className="text-sm text-muted-foreground">
          {dirLabel(row, isAr)}
        </p>
      </header>

      {/* AI Presentation Generator Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isAr ? 'إنشاء عرض تقديمي بالذكاء الاصطناعي' : 'Generate AI-Powered Presentation'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isAr 
                ? 'صف فكرتك في جملة واحدة ودع الذكاء الاصطناعي ينشئ عرضًا تقديميًا كاملاً في ثوانٍ'
                : 'Describe your idea in one sentence and let AI create a complete presentation in seconds'
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">
                {isAr ? 'أمثلة سريعة:' : 'Quick Examples:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(isAr ? [
                  'عرض تقديمي عن الذكاء الاصطناعي في الرعاية الصحية',
                  'خطة عمل لشركة ناشئة في التكنولوجيا',
                  'دليل تدريب للموظفين الجدد',
                  'استراتيجية تسويق رقمي لعام 2025',
                ] : [
                  'Presentation about AI in healthcare',
                  'Business plan for a tech startup',
                  'Training guide for new employees',
                  'Digital marketing strategy for 2025',
                ]).map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptSubmit(example)}
                    className="text-xs text-left px-3 py-2 rounded-lg transition-colors hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-200 hover:border-blue-300"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
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
      <Converter
        locale={locale}
        proxyPath={`/api/ai/${row.slug_en}`}
        templateGalleryPath="/templates"
      />

      {/* Features, copy & FAQ */}
      {isAr ? (
        <>
          <FeatureSectionAr row={row} />
          <LandingCopyAr row={row} />
          <FaqAr row={row} />
        </>
      ) : (
        <>
          <FeatureSectionEn row={row} />
          <LandingCopyEn row={row} />
          <FaqEn row={row} />
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

      {/* Structured data for HowTo schema */}
      <StructuredData data={buildHowToSchema(row, locale)} />

    </main>
  );
}

// // components/landing/LandingTemplate.tsx
// 'use client';

// import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import StructuredData, { buildHowToSchema, buildFaqSchema } from '@/components/StructuredData';

// import FeatureSectionAr from '@/components/landing/FeatureSectionAr';
// import FeatureSectionEn from '@/components/landing/FeatureSectionEn';
// import LandingCopyAr from '@/components/landing/LandingCopyAr';
// import LandingCopyEn from '@/components/landing/LandingCopyEn';
// import FaqAr from '@/components/landing/FaqAr';
// import { FaqEn } from '@/components/FaqEn';

// import HeroSpeed from '@/components/landing/HeroSpeed';
// import TrustBadges from '@/components/landing/TrustBadges';

// import type { Converter as ConverterRow } from '@/lib/server/converters';
// import { getArVariations, getEnVariations } from '@/utils/variations';
// import type { ConverterProps } from '@/components/Converter'; // <-- أضف هذا

// /* Lazy-load the heavy Converter widget to improve TTI */
// const Converter = dynamic(() => import('@/components/Converter'), {
//   ssr: false,
//   loading: () => <ConverterSkeleton />,
// });

// function ConverterSkeleton() {
//   return (
//     <div
//       role="status"
//       aria-live="polite"
//       className="rounded-xl border bg-muted/30 p-8 text-center animate-pulse"
//     >
//       <p className="text-sm text-muted-foreground">
//         Preparing converter…
//       </p>
//     </div>
//   );
// }

// /** Utility: human readable “DOCX → PPT” string localized */
// function dirLabel(row: ConverterRow, isAr: boolean): string {
//   const spaced = row.dir.replace('→', ' → ');
//   return isAr ? `(${spaced})` : spaced;
// }

// interface LandingTemplateProps {
//   locale: 'en' | 'ar';
//   row: ConverterRow;
//   related: ConverterRow[];
// }

// export default function LandingTemplate({ locale, row, related }: LandingTemplateProps) {
//   const isAr = locale === 'ar';

//   // Generate keyword variations for on-page copy
//   const variations = isAr
//     ? getArVariations(row.label_ar, row.dir)
//     : getEnVariations(row.label_en, row.dir);

//   return (
//     <main className="container mt-16 pt-16 min-h-screen mx-auto py-12 space-y-12">
//       <header className="text-center space-y-3" dir={isAr ? 'rtl' : 'ltr'}>
//         <h1 className="text-3xl font-bold">
//           {isAr ? row.label_ar : row.label_en}
//         </h1>
//         <p className="text-sm text-muted-foreground">{dirLabel(row, isAr)}</p>
//       </header>

//       {/* CRO: speed claim + social proof */}
//       {/* <HeroSpeed dir={row.dir} avgTimeIso={row.avg_time_iso} locale={locale} />
//       <TrustBadges
//         locale={locale}
//         stats={{ filesConverted: 2300000, avgRating: 4.9, reviews: 1200 }}
//       /> */}

//       {/* Converter */}
//       <Converter locale={locale} proxyPath={`/api/ai/${row.slug_en}`} templateGalleryPath="/templates" />

//       {/* Features, copy & FAQ */}
//       {isAr ? (
//         <>
//           <FeatureSectionAr row={row} />
//           <LandingCopyAr row={row} />
//           <FaqAr row={row} />
//         </>
//       ) : (
//         <>
//           <FeatureSectionEn row={row} />
//           <LandingCopyEn row={row} />
//           <FaqEn row={row} />
//         </>
//       )}

//       {/* Related converter links (contextual suggestions) — both locales */}
//       {related.length > 0 && (
//         <section className="mt-12" dir={isAr ? 'rtl' : 'ltr'}>
//           <h3 className="text-xl font-bold">
//             {isAr ? 'تم البحث أيضاً عن' : 'People also search for'}
//           </h3>
//           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             {related.map((c) => (
//               <li key={c.slug_en}>
//                 <Link href={`/${isAr ? 'ar' : 'en'}/tools/${c.slug_en}`}>
//                   {isAr ? c.label_ar : c.label_en}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Structured data */}
//       <StructuredData data={buildHowToSchema(row, locale)} />
//       <StructuredData data={buildFaqSchema(row, locale)} />

//       {/* Hidden variations for long-tail SEO (screen readers still OK) */}
//       <p className="sr-only">{variations.join(', ')}</p>
//     </main>
//   );
// }

// 'use client';

// /**
//  * Universal landing-page layout for every converter.
//  */

// import StructuredData from "@/components/StructuredData";
// import Converter from "@/components/Converter";
// import FeatureSectionAr from "@/components/landing/FeatureSectionAr";
// import LandingCopyAr from "@/components/landing/LandingCopyAr";
// import FaqAr from "@/components/landing/FaqAr";
// import { FaqEn, FAQ_EN } from "@/components/FaqEn";
// import { FAQ_AR } from "@/components/landing/FaqAr";
// import type { Converter as ConverterRow } from "@/lib/routes";
// import { PlanBadge } from "@/components/PlanBadge";
// import { useUserPlan } from "@/context/UserContext";
// import { buildHowToSchema } from '@/components/StructuredData';
// import { getRelatedConverters } from '@/lib/routes';

// import LandingCopyEn   from "@/components/landing/LandingCopyEn";
// import FeatureSectionEn from "@/components/landing/FeatureSectionEn";
// import Link from 'next/link';


// interface LandingTemplateProps {
//   locale: "en" | "ar";
//   row: ConverterRow;
// }



// /** Utility: human readable “DOCX → PPT” string localized */
// function dirLabel(row: ConverterRow, isAr: boolean): string {
//   // row.dir already looks like "DOCX→PPT"; just space it + localize arrow if needed
//   const spaced = row.dir.replace("→", " → ");
//   if (!isAr) return spaced;
//   // Arabic UI: keep Latin extensions; prepend verb
//   return `(${spaced})`;
// }

// export default function LandingTemplate({ locale, row }: LandingTemplateProps) {
//   const isAr = locale === "ar";
//   const plan = useUserPlan();
//   const related = isAr ? getRelatedConverters(row.slug_en) : [];

//   return (
//     <main className="container mt-16 pt-16 min-h-screen mx-auto py-12 space-y-12">
//       <header className="text-center space-y-3">
//         {/* <PlanBadge plan={plan} /> */}
//         <h1 className="text-3xl font-bold">
//           {isAr ? row.label_ar : row.label_en}
//         </h1>
//         <p className="text-sm text-muted-foreground">{dirLabel(row, isAr)}</p>
//       </header>

//       {/* Converter takes no props in current codebase */}
//       <Converter 
//       locale={locale}
//       proxyPath={`/api/ai/${row.slug_en}`}
//       templateGalleryPath="/templates"
      
//       />

//       {isAr ? (
//   <>
//     <FeatureSectionAr row={row} />
//     <LandingCopyAr   row={row} />
//     <FaqAr           row={row} />
//   </>
// ) : (
//   <>
//     <FeatureSectionEn row={row} />
//     <LandingCopyEn row={row} />
//     <FaqEn         row={row} />
//   </>
// )}

//       {isAr && related.length > 0 && (
//         <section className="mt-12" dir="rtl">
//           <h3 className="text-xl font-bold">تم البحث أيضاً عن</h3>
//           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             {related.map((c) => (
//               <li key={c.slug_en}>
//                 <Link href={`/ar/tools/${c.slug_en}`}>{c.label_ar}</Link>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}
// {/* 
//       {isAr ? (
//         <>
//           <FeatureSectionAr />
//           <LandingCopyAr />
//           <FaqAr />
//         </>
//       ) : (
//         <FaqEn />
//       )} */}

//       <StructuredData
//         type="HowTo"
//         data={buildHowToSchema(row, locale)}
//       />

//     </main>
//   );
// }
