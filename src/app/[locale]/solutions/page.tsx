// app/(public)/[locale]/solutions/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { dataSource } from '@/lib/data';
import { LOCALES, type Locale } from '@/data/locales';
import { site } from '@/data/site';

import SolutionsGrid from './SolutionsGrid';
import StructuredData from '@/components/StructuredData';

// Generate static params for all supported locales
export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// SEO metadata for solutions overview page
export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Metadata {
  const metadata = {
    en: {
      title: 'PowerPoint Solutions & Tools | Document Conversion Suite',
      description:
        'Explore our comprehensive PowerPoint solutions for office work, education, business presentations, and more. 57+ free online tools for all your document conversion needs.',
      keywords:
        'PowerPoint solutions, document conversion, office tools, presentation software, PDF converter, Word to PowerPoint, business tools, educational resources',
    },
    ar: {
      title: 'حلول وأدوات بوربوينت | مجموعة تحويل المستندات',
      description:
        'اكتشف حلول بوربوينت الشاملة للعمل المكتبي والتعليم والعروض التقديمية التجارية والمزيد. أكثر من 57 أداة مجانية عبر الإنترنت لجميع احتياجات تحويل المستندات.',
      keywords:
        'حلول بوربوينت، تحويل المستندات، أدوات مكتبية، برامج العروض، محول PDF، وورد إلى بوربوينت، أدوات الأعمال، موارد تعليمية',
    },
    es: {
      title: 'Soluciones y Herramientas de PowerPoint | Suite de Conversión',
      description:
        'Explora nuestras soluciones completas de PowerPoint para trabajo de oficina, educación, presentaciones empresariales y más. Más de 57 herramientas gratuitas en línea para todas tus necesidades de conversión.',
      keywords:
        'soluciones PowerPoint, conversión documentos, herramientas oficina, software presentaciones, convertidor PDF, Word a PowerPoint, herramientas empresariales, recursos educativos',
    },
    fr: {
      title: 'Solutions et Outils PowerPoint | Suite de Conversion',
      description:
        'Explorez nos solutions PowerPoint complètes pour le travail de bureau, l\'éducation, les présentations d\'entreprise et plus encore. Plus de 57 outils gratuits en ligne pour tous vos besoins de conversion de documents.',
      keywords:
        'solutions PowerPoint, conversion documents, outils bureau, logiciel présentation, convertisseur PDF, Word vers PowerPoint, outils entreprise, ressources éducatives',
    },
  };

  const current = metadata[locale] || metadata.en;
  const canonicalUrl = `${site.baseUrl}/${locale}/solutions`;

  return {
    title: current.title,
    description: current.description,
    keywords: current.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${site.baseUrl}/en/solutions`,
        ar: `${site.baseUrl}/ar/solutions`,
        es: `${site.baseUrl}/es/solutions`,
        fr: `${site.baseUrl}/fr/solutions`,
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: canonicalUrl,
      siteName: locale === 'ar' ? site.nameAr : site.nameEn,
      locale: locale === 'ar' ? 'ar_SA' : locale === 'es' ? 'es_ES' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${site.baseUrl}/api/og?title=${encodeURIComponent(current.title)}`,
          width: 1200,
          height: 630,
          alt: current.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description,
      images: [`${site.baseUrl}/api/og?title=${encodeURIComponent(current.title)}`],
    },
  };
}

export default async function SolutionsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const slugs   = await dataSource.getAllPillars();
  const pillars = (
    await Promise.all(slugs.map((s) => dataSource.findPillar(s, locale)))
  ).filter(Boolean);           // strip nulls

  // Intro content for SEO
  const introContent = {
    en: {
      heading: 'PowerPoint Solutions for Every Need',
      paragraph:
        'Transform your workflow with our comprehensive suite of PowerPoint and document conversion tools. Whether you\'re a student working on assignments, an educator creating interactive courses, or a business professional preparing presentations, we have the perfect solution for you. Explore our curated categories below to find tools tailored to your specific needs—all free, fast, and browser-based.',
    },
    ar: {
      heading: 'حلول بوربوينت لكل احتياج',
      paragraph:
        'حوّل سير عملك مع مجموعتنا الشاملة من أدوات بوربوينت وتحويل المستندات. سواء كنت طالبًا تعمل على واجباتك، أو معلمًا ينشئ دورات تفاعلية، أو محترفًا في مجال الأعمال يحضر عروضًا تقديمية، لدينا الحل المثالي لك. استكشف فئاتنا المنسقة أدناه للعثور على الأدوات المصممة خصيصًا لاحتياجاتك—كلها مجانية وسريعة وتعمل عبر المتصفح.',
    },
    es: {
      heading: 'Soluciones de PowerPoint para Cada Necesidad',
      paragraph:
        'Transforma tu flujo de trabajo con nuestra suite completa de herramientas de PowerPoint y conversión de documentos. Ya seas un estudiante trabajando en tareas, un educador creando cursos interactivos, o un profesional de negocios preparando presentaciones, tenemos la solución perfecta para ti. Explora nuestras categorías seleccionadas a continuación para encontrar herramientas adaptadas a tus necesidades específicas—todas gratuitas, rápidas y basadas en navegador.',
    },
    fr: {
      heading: 'Solutions PowerPoint pour Chaque Besoin',
      paragraph:
        'Transformez votre flux de travail avec notre suite complète d\'outils PowerPoint et de conversion de documents. Que vous soyez un étudiant travaillant sur des devoirs, un éducateur créant des cours interactifs, ou un professionnel d\'affaires préparant des présentations, nous avons la solution parfaite pour vous. Explorez nos catégories sélectionnées ci-dessous pour trouver des outils adaptés à vos besoins spécifiques—tous gratuits, rapides et basés sur navigateur.',
    },
  };

  const content = introContent[locale] || introContent.en;
  const isRTL = locale === 'ar';

  // Metadata for structured data
  const metadata = {
    en: {
      title: 'PowerPoint Solutions & Tools | Document Conversion Suite',
      description:
        'Explore our comprehensive PowerPoint solutions for office work, education, business presentations, and more. 57+ free online tools for all your document conversion needs.',
    },
    ar: {
      title: 'حلول وأدوات بوربوينت | مجموعة تحويل المستندات',
      description:
        'اكتشف حلول بوربوينت الشاملة للعمل المكتبي والتعليم والعروض التقديمية التجارية والمزيد. أكثر من 57 أداة مجانية عبر الإنترنت لجميع احتياجات تحويل المستندات.',
    },
    es: {
      title: 'Soluciones y Herramientas de PowerPoint | Suite de Conversión',
      description:
        'Explora nuestras soluciones completas de PowerPoint para trabajo de oficina, educación, presentaciones empresariales y más. Más de 57 herramientas gratuitas en línea para todas tus necesidades de conversión.',
    },
    fr: {
      title: 'Solutions et Outils PowerPoint | Suite de Conversion',
      description:
        'Explorez nos solutions PowerPoint complètes pour le travail de bureau, l\'éducation, les présentations d\'entreprise et plus encore. Plus de 57 outils gratuits en ligne pour tous vos besoins de conversion de documents.',
    },
  };

  const currentMeta = metadata[locale] || metadata.en;

  // Structured data schemas
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : locale === 'es' ? 'Inicio' : 'Home',
        item: `${site.baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ar' ? 'الحلول' : locale === 'es' ? 'Soluciones' : 'Solutions',
        item: `${site.baseUrl}/${locale}/solutions`,
      },
    ],
  };

  const itemListSchema = {
    '@type': 'ItemList',
    name: currentMeta.title,
    description: currentMeta.description,
    numberOfItems: pillars.length,
    itemListElement: pillars.map((pillar: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: pillar.title,
      description: pillar.description,
      url: `${site.baseUrl}/${locale}/solutions/${pillar.slug}`,
    })),
  };

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${site.baseUrl}/${locale}/solutions#webpage`,
    url: `${site.baseUrl}/${locale}/solutions`,
    name: currentMeta.title,
    description: currentMeta.description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${site.baseUrl}/#website`,
      url: site.baseUrl,
      name: locale === 'ar' ? site.nameAr : site.nameEn,
    },
    inLanguage: locale === 'ar' ? 'ar-SA' : locale === 'es' ? 'es-ES' : 'en-US',
    breadcrumb: {
      '@id': `${site.baseUrl}/${locale}/solutions#breadcrumb`,
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData items={[breadcrumbSchema, itemListSchema, webPageSchema]} />

      <main className="container mt-16 pt-16 min-h-screen mx-auto px-4 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Page Heading */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {content.heading}
        </h1>
        
        {/* SEO Intro Paragraph */}
        <p className="mb-12 text-lg text-muted-foreground max-w-4xl leading-relaxed">
          {content.paragraph}
        </p>

        {/* Solutions Grid */}
        <SolutionsGrid locale={locale} pillars={pillars as any[]} />
      </main>
    </>
  );
}


// import FeatureCard from '@/components/landing/FeatureCard';
// import {
//   FileText,
//   FileCode,
//   FileType2,
//   FileUp,
//   Presentation,
// } from 'lucide-react';
// import type { LucideIcon } from 'lucide-react';

// /* --- Static params: pre‑render this page for every locale --- */
// export async function generateStaticParams() {
//   return LOCALES.map((locale) => ({ locale }));
// }

// /* --- Metadata --- */
// export function generateMetadata(
//   { params }: { params: { locale: Locale } },
// ): Metadata {
//   const { locale } = params;
//   const title = locale === 'ar' ? 'الحلول' : 'Solutions';
//   const description =
//     locale === 'ar'
//       ? 'استكشف مولدات الشرائح والقوالب المدعومة بالذكاء الاصطناعي، مصنفة حسب الفئة.'
//       : 'Explore our AI‑powered slide generators and templates, organised by solution category.';
//   const canonical = `${siteUrl}/${locale}/solutions`;

//   return {
//     title,
//     description,
//     alternates: {
//       canonical,
//       languages: LOCALES.reduce((acc, loc) => {
//         acc[loc] = `${siteUrl}/${loc}/solutions`;
//         return acc;
//       }, {} as Record<string, string>),
//     },
//     openGraph: {
//       title,
//       description,
//       url: canonical,
//       type: 'website',
//     },
//   };
// }

// /* --- Re‑usable icon map (slug substring → Lucide icon) --- */
// const iconMap: Record<string, LucideIcon> = {
//   word: FileType2,
//   pdf: FileUp,
//   ppt: Presentation,
//   markdown: FileCode,
//   default: FileText,
// };

// /* --- Page component --- */
// export default async function SolutionsPage({
//   params,
// }: {
//   params: { locale: Locale };
// }) {
//   const { locale } = params;
//   const slugs = await dataSource.getAllPillars();
//   const pillars = await Promise.all(
//     slugs.map((slug) => dataSource.findPillar(slug, locale)),
//   );

//   return (
//     <main className="container mt-16 pt-16 min-h-screen mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">
//         {locale === 'ar' ? 'الحلول' : 'Solutions'}
//       </h1>

//       <ul
//         dir={locale === 'ar' ? 'rtl' : 'ltr'}
//         className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         {pillars.map((pillar) => {
//           if (!pillar) return null;

//           /* Pick an icon based on the slug; fall back to FileText */
//           const Icon =
//             Object.entries(iconMap).find(([key]) =>
//               pillar.slug.includes(key),
//             )?.[1] ?? iconMap.default;

//           return (
//             <li key={pillar.slug}>
//               {/* Entire card is a link */}
//               <Link href={`/${locale}/solutions/${pillar.slug}`} passHref>
//                 <FeatureCard
//                   Icon={Icon}
//                   title={pillar.title}
//                   desc={pillar.description}
//                   rtl={locale === 'ar'}
//                 />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </main>
//   );
// }


// // app/(public)/[locale]/solutions/page.tsx
// import Link from 'next/link';
// import type { Metadata } from 'next';
// import { dataSource } from '@/lib/data';
// import type { Locale } from '@/utils/i18n';
// import { LOCALES } from '@/utils/i18n';
// import { siteUrl } from '@/utils/seo';

// /* --- Static params: pre-render this page for every locale --- */
// export async function generateStaticParams() {
//   return LOCALES.map((locale) => ({ locale }));
// }

// /* --- Metadata --- */
// export function generateMetadata(
//   { params }: { params: { locale: Locale } }
// ): Metadata {
//   const { locale } = params;
//   const title = locale === 'ar' ? 'الحلول' : 'Solutions';
//   const description =
//     locale === 'ar'
//       ? 'استكشف مولدات الشرائح والقوالب المدعومة بالذكاء الاصطناعي، مصنفة حسب الفئة.'
//       : 'Explore our AI‑powered slide generators and templates, organised by solution category.';
//   const canonical = `${siteUrl}/${locale}/solutions`;

//   return {
//     title,
//     description,
//     alternates: {
//       canonical,
//       languages: LOCALES.reduce((acc, loc) => {
//         acc[loc] = `${siteUrl}/${loc}/solutions`;
//         return acc;
//       }, {} as Record<string, string>),
//     },
//     openGraph: {
//       title,
//       description,
//       url: canonical,
//       type: 'website',
//     },
//   };
// }

// // app/(public)/[locale]/solutions/page.tsx
// export default async function SolutionsPage({ params }: { params: { locale: Locale }}) {
//   const { locale } = params;
//   const slugs = await dataSource.getAllPillars();
//   const pillars = await Promise.all(slugs.map((slug) => dataSource.findPillar(slug, locale)));

//   return (
//     <main className="container mt-16 pt-16 min-h-screen mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">
//         {locale === 'ar' ? 'الحلول' : 'Solutions'}
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pillars.map((pillar) =>
//           pillar ? (
//             <article key={pillar.slug} className="bg-white border rounded-lg shadow-sm p-5">
//               <h2 className="text-xl font-semibold mb-2">{pillar.title}</h2>
//               <p className="text-gray-600 mb-4">{pillar.description}</p>
//               <Link href={`/${locale}/solutions/${pillar.slug}`} className="text-blue-600 font-medium">
//                 {locale === 'ar' ? 'اقرأ المزيد' : 'Learn more'}
//               </Link>
//             </article>
//           ) : null
//         )}
//       </div>
//     </main>
//   );
// }
