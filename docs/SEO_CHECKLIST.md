# SEO Quick Start Checklist

## 🚀 Immediate Actions (Do Now)

### 1. Environment Setup
```bash
# Add to .env.local
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=
NEXT_PUBLIC_YANDEX_VERIFICATION=
NEXT_PUBLIC_GA_ID=
```

### 2. Update Configuration
- [ ] Edit `/src/lib/seo.ts`:
  - Update `siteConfig.url`
  - Update `siteConfig.twitterHandle`
  - Update contact email in `generateOrganizationSchema()`
  - Add social media URLs

### 3. Create Required Images
```
public/
├── og-image.png (1200x630px)
├── logo.png
├── icon.png (32x32px)
├── icon-192.png (192x192px)
├── icon-512.png (512x512px)
├── apple-icon.png (180x180px)
└── favicon.ico
```

### 4. Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property: `https://yourdomain.com`
- [ ] Verify ownership
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 5. Test Everything
```bash
# Build and test
npm run build
npm start

# Open in browser
open http://localhost:3000

# Test with Lighthouse (Chrome DevTools)
# Performance, Accessibility, Best Practices, SEO
```

---

## 📋 Page-by-Page SEO

### For Each Landing Page (`/slides/[slug]`)
```typescript
// Add to page.tsx
import { generatePageMetadata, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo'
import Script from 'next/script'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Your Page Title',
    description: 'Your meta description (150-160 chars)',
    locale: params.locale,
    path: '/your-path',
    keywords: ['keyword1', 'keyword2'],
  })
}

// Add schemas before </main> closing tag
<Script id="schema" type="application/ld+json">
  {JSON.stringify(generateBreadcrumbSchema(...))}
</Script>
```

### For Images
```typescript
import Image from 'next/image'

// Always use:
<Image
  src="/image.png"
  alt="Descriptive alt text with keywords"
  width={800}
  height={600}
  loading="lazy" // or priority for above-fold
/>
```

---

## 🎯 Priority Pages to Optimize

1. **Homepage** (`/[locale]/page.tsx`)
   - ✅ Already has metadata
   - [ ] Add Organization schema
   - [ ] Add SoftwareApplication schema
   - [ ] Optimize hero image

2. **Tool Pages** (`/slides`, `/video`, `/pdf`, etc.)
   - [ ] Add unique metadata per tool
   - [ ] Add HowTo schema
   - [ ] Add demo videos with VideoObject schema

3. **Landing Pages** (`/slides/[slug]`)
   - [ ] Add metadata from slug data
   - [ ] Add breadcrumbs
   - [ ] Add HowTo schema
   - [ ] Internal linking to related pages

4. **Trust Pages** (`/faq`, `/pricing`, `/privacy`, `/terms`)
   - [ ] FAQ schema for FAQ page
   - [ ] Product schema for pricing
   - [ ] Last updated dates

5. **Dashboard** (`/dashboard`)
   - [ ] Add noindex if user-specific
   - [ ] Or add metadata if public

---

## 🔍 Testing Tools

### Online Tools
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **Google Rich Results Test**: https://search.google.com/test/rich-results
3. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
4. **Schema Markup Validator**: https://validator.schema.org/
5. **SEO Site Checkup**: https://seositecheckup.com/

### Chrome DevTools
- Lighthouse tab (Performance, SEO, Accessibility)
- Network tab (check load times)
- Coverage tab (unused CSS/JS)

### Command Line
```bash
# Check build
npm run build

# Analyze bundle size
npm run build -- --profile

# Check for broken links
npx broken-link-checker http://localhost:3000
```

---

## 📊 Analytics Setup

### Google Analytics 4
```typescript
// Add to app/layout.tsx (already shown in examples)
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### Track Events
```typescript
// Track button clicks
onClick={() => {
  gtag('event', 'click', {
    event_category: 'CTA',
    event_label: 'Create Presentation'
  })
}}
```

---

## 🎨 Content Optimization

### Title Tags (50-60 chars)
```
Good: "AI Presentation Generator | Create Slides in Seconds"
Bad: "Home Page"
```

### Meta Descriptions (150-160 chars)
```
Good: "Create professional presentations with AI. Generate stunning slides from text in seconds. Free trial available. Try now!"
Bad: "This is our website where you can make presentations."
```

### URL Structure
```
Good: /en/slides/convert-word-to-powerpoint
Bad: /page?id=123&action=convert
```

### Headings
```html
<h1>Main Topic (once per page)</h1>
<h2>Major Sections</h2>
<h3>Subsections</h3>
```

---

## 🔗 Link Building Strategy

### Internal Links
- Link from homepage to main tools
- Link from tools to related tools
- Add "Related Articles" section
- Breadcrumb navigation

### External Links (Backlinks)
- Guest blog posts
- Partner websites
- Directory submissions
- Social media profiles
- GitHub/open source
- Forum participation (Reddit, HackerNews)

---

## 📱 Mobile Optimization

Already done via Tailwind CSS, but verify:
- [ ] Touch targets ≥44x44px
- [ ] Text readable without zoom
- [ ] No horizontal scroll
- [ ] Fast mobile load (<3s)
- [ ] Viewport meta tag (already in layout)

---

## 🌐 International SEO

Already implemented:
- ✅ Hreflang tags
- ✅ Locale-specific URLs
- ✅ RTL support (Arabic)
- ✅ Multi-language sitemap

Additional:
- [ ] Translate all content (not just UI)
- [ ] Local hosting/CDN per region
- [ ] Country-specific domains (.ae, .es)
- [ ] Local currency/date formats

---

## 📈 30-Day Action Plan

### Week 1: Foundation
- Day 1-2: Set up environment variables, create images
- Day 3-4: Submit to Google Search Console
- Day 5-7: Add metadata to all main pages

### Week 2: Content
- Day 8-10: Add schemas to all pages
- Day 11-12: Optimize all images
- Day 13-14: Add internal linking

### Week 3: Technical
- Day 15-17: Optimize page speed
- Day 18-19: Fix any Lighthouse issues
- Day 20-21: Test on mobile devices

### Week 4: Promotion
- Day 22-24: Create blog content
- Day 25-27: Build backlinks
- Day 28-30: Monitor analytics, iterate

---

## 🆘 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Pages not indexed | Submit sitemap, check robots.txt |
| Slow load time | Optimize images, enable caching |
| Low CTR | Improve title/description |
| High bounce rate | Improve content, faster load |
| Mobile issues | Test with real devices |
| Duplicate content | Add canonical tags |

---

## ✅ Weekly SEO Maintenance

### Every Monday
- [ ] Check Google Search Console for errors
- [ ] Review analytics traffic
- [ ] Check Core Web Vitals

### Every Month
- [ ] Update sitemap if new pages added
- [ ] Check and fix broken links
- [ ] Review and update old content
- [ ] Monitor keyword rankings
- [ ] Analyze competitor changes

---

## 🎓 Learning Resources

- **Google SEO Guide**: https://developers.google.com/search/docs
- **Next.js SEO**: https://nextjs.org/learn/seo
- **Schema.org**: https://schema.org/
- **Web.dev**: https://web.dev/
- **Moz SEO Guide**: https://moz.com/beginners-guide-to-seo

---

## 📞 Support

Need help? Check:
1. `/SEO_GUIDE.md` - Complete documentation
2. `/SEO_EXAMPLES.md` - Code examples
3. `/src/lib/seo.ts` - SEO utilities
4. Google Search Central Community

---

**Last Updated**: $(date)
**Status**: Ready to implement ✅
