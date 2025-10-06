import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlugAndLanguage, getPostTranslations } from '@/utils/posts';
import { marked } from 'marked';
import Script from 'next/script';
import Link from 'next/link';
import styles from './post.module.css';
import { LOCALES, type Locale } from '@/data/locales';
import { siteUrl } from '@/utils/seo';

interface BlogPostProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  const params: Array<{ locale: string; slug: string }> = [];
  
  posts.forEach((post) => {
    // Add the post in its native language
    params.push({ locale: post.language || 'ar', slug: post.slug });
    
    // If post has translations, add those too
    if (post.translationKey) {
      const translations = posts.filter(p => p.translationKey === post.translationKey);
      translations.forEach((translation) => {
        if (translation.language && translation.language !== post.language) {
          params.push({ locale: translation.language, slug: translation.slug });
        }
      });
    }
  });
  
  return params;
}

export function generateMetadata({ params }: BlogPostProps) {
  const { locale, slug } = params;
  const post = getPostBySlugAndLanguage(slug, locale);
  if (!post) return {};

  const title = post.title;
  const description = post.excerpt ?? post.content.slice(0, 160);
  const canonical = `${siteUrl}/${locale}/blog/${slug}`;

  // Extract frontmatter data if available
  const postData = post as any;
  const keywords = postData.keywords?.join(', ') || postData.tags?.join(', ') || '';
  const image = postData.image || '/og/default-blog.png';
  const author = postData.author || 'Sharayeh Team';

  // Get all translations for hreflang tags
  const translations = getPostTranslations(post);
  const languageAlternates: Record<string, string> = {};
  
  translations.forEach((translation) => {
    if (translation.language) {
      languageAlternates[translation.language] = `${siteUrl}/${translation.language}/blog/${translation.slug}`;
    }
  });

  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: postData.date,
      modifiedTime: postData.updated || postData.date,
      authors: [author],
      section: postData.category || 'Blog',
      tags: postData.tags || [],
      locale: locale === 'ar' ? 'ar_SA' : locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}${image}`],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const { locale, slug } = params;
  const post = getPostBySlugAndLanguage(slug, locale);

  if (!post) {
    return notFound();
  }

  // Get all translations for language switcher
  const translations = getPostTranslations(post);

  const htmlContent = marked(post.content);
  const description = post.excerpt ?? post.content.slice(0, 160);
  const canonical = `${siteUrl}/${locale}/blog/${slug}`;

  // Extract frontmatter data
  const postData = post as any;
  const image = postData.image || '/og/default-blog.png';
  const author = postData.author || 'Sharayeh Team';
  const category = postData.category || 'Blog';
  const readingTime = postData.readingTime || '';
  const updatedDate = postData.updated || post.date;

  // Enhanced JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: post.title,
    description,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}${image}`,
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: updatedDate,
    author: {
      '@type': 'Organization',
      name: author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sharayeh',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    inLanguage: locale === 'ar' ? 'ar-SA' : locale === 'es' ? 'es-ES' : 'en-US',
    articleSection: category,
    keywords: postData.keywords?.join(', ') || postData.tags?.join(', ') || '',
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : locale === 'es' ? 'Inicio' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ar' ? 'المدونة' : locale === 'es' ? 'Blog' : 'Blog',
        item: `${siteUrl}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      {/* Article structured data */}
      <Script
        id={`blog-article-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb structured data */}
      <Script
        id={`blog-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main
        className={styles.postContainer}
        lang={locale}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <article itemScope itemType="https://schema.org/Article">
          {/* Article metadata */}
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="description" content={description} />
          <meta itemProp="datePublished" content={post.date} />
          <meta itemProp="dateModified" content={updatedDate} />
          <meta itemProp="author" content={author} />
          <meta itemProp="image" content={`${siteUrl}${image}`} />

          <div className="mt-12">
            <h1 className={styles.postTitle} itemProp="name">
              {post.title}
            </h1>
          </div>

          {/* Language Switcher */}
          {translations.length > 1 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'متوفر بـ:' : locale === 'es' ? 'Disponible en:' : 'Available in:'}
              </span>
              {translations.map((translation) => {
                const lang = translation.language || 'ar';
                const langName = lang === 'ar' ? 'العربية' : lang === 'es' ? 'Español' : 'English';
                const isCurrent = translation.slug === post.slug && translation.language === post.language;
                
                return (
                  <Link
                    key={lang}
                    href={`/${lang}/blog/${translation.slug}`}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {langName}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Article metadata bar */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            <time dateTime={post.date} className={styles.postDate} itemProp="datePublished">
              {new Date(post.date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {updatedDate !== post.date && (
              <span>
                {locale === 'ar' ? 'تحديث:' : locale === 'es' ? 'Actualizado:' : 'Updated:'}{' '}
                <time dateTime={updatedDate}>
                  {new Date(updatedDate).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>
            )}
            {readingTime && (
              <span>
                📖 {readingTime}
              </span>
            )}
            {category && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {category}
              </span>
            )}
          </div>

          {/* Article content */}
          <div
            className={styles.postContent}
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </main>
    </>
  );
}

// // app/(public)/[locale]/blog/[slug]/page.tsx
// import { notFound } from 'next/navigation';
// import { getAllPosts } from '@/utils/posts';
// import { marked } from 'marked';
// import styles from './post.module.css';
// import type { Locale } from '@/utils/i18n';
// import { LOCALES } from '@/utils/i18n';
// import { siteUrl } from '@/utils/seo';
// // import { Footer } from '@/components/gadawel/footer';

// interface BlogPostProps {
//   params: {
//     locale: Locale;
//     slug: string;
//   };
// }

// export function generateStaticParams() {
//   const posts = getAllPosts();
//   // Pre‑render every post in every supported locale
//   return posts.flatMap((post) =>
//     LOCALES.map((locale) => ({ locale, slug: post.slug }))
//   );
// }

// /**
//  * Generate per‑post metadata. This adds a descriptive title and description,
//  * sets the canonical URL and defines language alternates for each blog post.
//  */
// export function generateMetadata({ params }: BlogPostProps) {
//   const { locale, slug } = params;
//   const post = getAllPosts().find((p) => p.slug === slug);
//   if (!post) return {};

//   const title = `${post.title} – Blog`;
//   const description = post.excerpt ?? post.content.slice(0, 150);
//   const canonical = `${siteUrl}/${locale}/blog/${slug}`;

  

//   return {
//     title,
//     description,
//     alternates: {
//       canonical,
//       languages: LOCALES.reduce((acc, loc) => {
//         acc[loc] = `${siteUrl}/${loc}/blog/${slug}`;
//         return acc;
//       }, {} as Record<string, string>),
//     },
//     openGraph: {
//       title,
//       description,
//       url: canonical,
//       type: 'article',
//     },
//   };
// }

// export default function BlogPostPage({ params }: BlogPostProps) {
//   const { slug } = params;
//   const posts = getAllPosts();
//   const post = posts.find((p) => p.slug === slug);

//   if (!post) {
//     notFound();
//   }

//   const htmlContent = marked(post.content);

//   const jsonLd = {
//   '@context': 'https://schema.org',
//   '@type': 'Article',
//   headline: post.title,
//   datePublished: post.date,
//   author: {
//     '@type': 'Person',
//     name: 'Your Name or Company',
//   },
//   url: `${siteUrl}/${locale}/blog/${slug}`,
//   inLanguage: locale,
// };

//   return (
//     <>
//     <head>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//     </head>
    

//       <main className={styles.postContainer}>
//         <article>
//           <h1 className={styles.postTitle}>{post.title}</h1>
//           <time dateTime={post.date} className={styles.postDate}>
//             {new Date(post.date).toLocaleDateString()}
//           </time>
//           {/* Promotional banner; consider extracting into a component */}
//           <div className="bg-blue-200 text-black py-8 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
//               <h2 className="text-xl sm:text-l font-bold mb-4">
//                 اضغط لانشاء عروض بوربوينت احترافية بالذكاء الاصطناعي
//               </h2>
//               <a
//                 href="https://sharayeh.com"
//                 className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow hover:bg-blue-50 transition"
//               >
//                 Sharayeh.com
//               </a>
//             </div>
//           </div>
//           <div
//             className={styles.postContent}
//             // eslint-disable-next-line react/no-danger -- content is sanitized via marked
//             dangerouslySetInnerHTML={{ __html: htmlContent }}
//           ></div>
//         </article>
//       </main>
//       {/* <Footer /> */}
//     </>
//   );
// }


// // src/app/(pages)/blog/[slug]/page.tsx
// import { notFound } from 'next/navigation';
// import { getAllPosts } from '@/utils/posts';
// import { marked } from 'marked';
// import styles from './post.module.css';
// // import { Footer } from "@/components/gadawel/footer";

// interface BlogPostProps {
//   params: {
//     slug: string;
//   };
// }

// export function generateStaticParams() {
//   const posts = getAllPosts();
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// export default function BlogPostPage({ params }: BlogPostProps) {
//   const posts = getAllPosts();
//   const post = posts.find((post) => post.slug === params.slug);

//   if (!post) {
//     notFound();
//   }

//   const htmlContent = marked(post.content);

//   return (
//     <>
//     <main className={styles.postContainer}>
//       <article>
//         <h1 className={styles.postTitle}>{post.title}</h1>
//         <time dateTime={post.date} className={styles.postDate}>
//           {new Date(post.date).toLocaleDateString()}
//         </time>
//         <div className="bg-blue-200 text-black py-8 px-4 sm:px-6 lg:px-8">
//               <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
//                 <h2 className="text-xl sm:text-l font-bold mb-4">
//                   اضغط لانشاء عروض بوربوينت احترافية بالذكاء الاصطناعي
//                 </h2>
//                 <a
//                   href="https://sharayeh.com"
//                   className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow hover:bg-blue-50 transition"
//                 >
//                    Sharayeh.com 
//                 </a>
//               </div>
//             </div>
//         <div
//           className={styles.postContent}
//           dangerouslySetInnerHTML={{ __html: htmlContent }}
//         ></div>
//       </article>

//     </main>
//           {/* <Footer /> */}
//           </>
//   );
// }
