# Example: Implementing SEO on a Landing Page

## File: `/src/app/[locale]/(landings)/slides/[slug]/page.tsx`

```typescript
import { Metadata } from 'next'
import Script from 'next/script'
import { generatePageMetadata, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo'

interface PageProps {
  params: { locale: Locale; slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params
  
  // Decode slug and get landing page data
  const decodedSlug = decodeURIComponent(slug)
  const landing = slidesLandings.find(
    l => l.locale === locale && l.slug === decodedSlug
  )
  
  if (!landing) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page was not found',
      locale,
      noindex: true
    })
  }

  return generatePageMetadata({
    title: landing.h1,
    description: landing.description,
    locale,
    path: `/slides/${slug}`,
    keywords: [
      ...landing.keywords,
      'AI presentation',
      'PowerPoint generator',
      'slides maker'
    ],
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: new Date().toISOString()
  })
}

export default function LandingPage({ params }: PageProps) {
  const { locale, slug } = params
  const landing = getLandingData(locale, slug)
  
  return (
    <main>
      {/* Your page content */}
      
      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'AI Slides', url: '/slides' },
              { name: landing.h1, url: `/slides/${slug}` }
            ], locale)
          )
        }}
      />
      
      {/* How-To Schema */}
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateHowToSchema({
              name: `How to ${landing.h1}`,
              description: landing.description,
              totalTime: 'PT5M',
              steps: [
                {
                  name: 'Enter your prompt',
                  text: 'Type what you want to create',
                  image: '/steps/step1.png'
                },
                {
                  name: 'AI generates slides',
                  text: 'Our AI creates professional slides',
                  image: '/steps/step2.png'
                },
                {
                  name: 'Download presentation',
                  text: 'Get your PowerPoint file',
                  image: '/steps/step3.png'
                }
              ]
            })
          )
        }}
      />
    </main>
  )
}
```

---

## File: `/src/app/[locale]/faq/page.tsx`

```typescript
import { Metadata } from 'next'
import Script from 'next/script'
import { generatePageMetadata, generateFAQSchema } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our AI content creation platform',
    locale: params.locale,
    path: '/faq',
    keywords: ['FAQ', 'help', 'support', 'questions']
  })
}

export default function FAQPage({ params }: PageProps) {
  const faqs = [
    {
      question: 'How does AI presentation generation work?',
      answer: 'Our AI analyzes your input and creates professional slides...'
    },
    // More FAQs...
  ]
  
  return (
    <main>
      {/* FAQ content */}
      
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs))
        }}
      />
    </main>
  )
}
```

---

## File: `/src/app/[locale]/blog/[slug]/page.tsx`

```typescript
import { Metadata } from 'next'
import Script from 'next/script'
import { generatePageMetadata, generateArticleSchema } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    locale: params.locale,
    path: `/blog/${params.slug}`,
    image: post.coverImage,
    keywords: post.tags,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt
  })
}

export default function BlogPost({ params }: PageProps) {
  const post = getPost(params.slug)
  
  return (
    <article>
      {/* Blog post content */}
      
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: post.title,
              description: post.excerpt,
              url: `${siteConfig.url}/${params.locale}/blog/${params.slug}`,
              image: post.coverImage,
              publishedTime: post.publishedAt,
              modifiedTime: post.updatedAt,
              author: post.author
            })
          )
        }}
      />
    </article>
  )
}
```

---

## Best Practices for Images

```typescript
import Image from 'next/image'

// Hero image - use priority for above-the-fold
<Image
  src="/hero.png"
  alt="AI Content Creation Platform - Generate presentations, dub videos"
  width={1200}
  height={600}
  priority
  placeholder="blur"
  blurDataURL="/hero-blur.png"
/>

// Regular images - use lazy loading
<Image
  src="/feature-1.png"
  alt="AI Presentation Generator - Create slides from text"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>

// Logo with proper sizing
<Image
  src="/logo.png"
  alt="Agentic Logo"
  width={150}
  height={40}
  priority
/>
```

---

## Internal Linking Strategy

```typescript
// Related content component
export function RelatedContent({ locale, currentSlug }: Props) {
  const related = getRelatedLandings(currentSlug)
  
  return (
    <section>
      <h2>Related Tools</h2>
      <div className="grid grid-cols-3 gap-4">
        {related.map(item => (
          <Link
            key={item.slug}
            href={`/${locale}/slides/${item.slug}`}
            className="p-4 border rounded hover:shadow-lg"
          >
            <h3>{item.h1}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

---

## Analytics Integration

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Performance Optimization

```typescript
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Client-side only if needed
})

// Prefetch important pages
import Link from 'next/link'

<Link href="/slides" prefetch={true}>
  Create Slides
</Link>

// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Complex rendering logic
})
```

---

## Testing SEO

```bash
# Test with Lighthouse
npm run build
npm start
# Then run Lighthouse in Chrome DevTools

# Check structured data
# Visit: https://search.google.com/test/rich-results
# Enter your URL

# Test mobile friendliness
# Visit: https://search.google.com/test/mobile-friendly

# Check page speed
# Visit: https://pagespeed.web.dev/
```

---

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_verification_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_verification_code
```
