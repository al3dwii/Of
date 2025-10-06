# Blog Translation System

## Overview

Complete multilingual blog system supporting Arabic (ar), English (en), and Spanish (es) with easy extensibility for additional languages.

**Implementation Date:** October 6, 2025

---

## 🌍 System Architecture

### Translation Linking

Blog posts are linked together using the `translationKey` field in frontmatter. Posts with the same `translationKey` are considered translations of each other.

```yaml
---
title: "Best AI Word to PowerPoint Conversion Tool"
slug: "best-ai-word-to-ppt-conversion-tool"
language: "en"
translationKey: "word-to-ppt-guide-2025"  # Links translations together
---
```

### Directory Structure

```
content/
└── posts/
    ├── best-ai-word-to-ppt-conversion-tool.md      # Arabic (original)
    ├── best-ai-word-to-ppt-conversion-tool.en.md   # English translation
    ├── best-ai-word-to-ppt-conversion-tool.es.md   # Spanish translation
    └── ... (other posts)
```

**Naming Convention:**
- Original: `{slug}.md` (language specified in frontmatter)
- Translations: `{slug}.{language}.md` OR unique slug with same `translationKey`

---

## 📋 Frontmatter Schema

### Required Fields
```yaml
title: "Post title"
slug: "url-slug"
date: "2025-07-28"
published: true
excerpt: "Short description"
language: "en"  # ISO 639-1 code: en, ar, es
translationKey: "unique-key-2025"  # IMPORTANT: Same across all translations
```

### Optional Fields
```yaml
updated: "2025-10-06"
description: "SEO meta description"
image: "/og/image.png"
author: "Author Name"
category: "Category"
readingTime: "10 minutes"
tags:
  - tag1
  - tag2
keywords:
  - keyword1
  - keyword2
canonical: "https://domain.com/blog/slug"
availableLanguages:  # Auto-detected, but can be manually specified
  - en
  - ar
  - es
```

---

## 🔧 API Functions

### Core Functions

#### `getAllPosts(): Post[]`
Returns all published posts across all languages.

```typescript
import { getAllPosts } from '@/utils/posts';

const posts = getAllPosts();
// Returns: All posts with language field
```

#### `getPostsByLanguage(language: string): Post[]`
Returns posts filtered by specific language.

```typescript
import { getPostsByLanguage } from '@/utils/posts';

const englishPosts = getPostsByLanguage('en');
const arabicPosts = getPostsByLanguage('ar');
const spanishPosts = getPostsByLanguage('es');
```

#### `getPostBySlugAndLanguage(slug: string, language: string): Post | undefined`
Get a specific post by slug and language.

```typescript
import { getPostBySlugAndLanguage } from '@/utils/posts';

const post = getPostBySlugAndLanguage('best-ai-word-to-ppt-conversion-tool', 'en');
```

#### `getPostTranslations(post: Post): Post[]`
Get all translations of a post.

```typescript
import { getPostTranslations } from '@/utils/posts';

const translations = getPostTranslations(post);
// Returns: [arabicVersion, englishVersion, spanishVersion]
```

#### `hasTranslation(post: Post, language: string): boolean`
Check if post has a translation in specific language.

```typescript
import { hasTranslation } from '@/utils/posts';

if (hasTranslation(post, 'es')) {
  console.log('Spanish translation available');
}
```

---

## 📝 Creating Translations

### Step 1: Create Translation File

**Option A: Separate file with language suffix**
```bash
cp content/posts/original-post.md content/posts/original-post.en.md
```

**Option B: Unique slug (recommended for different URL structures)**
```bash
# Create new file with different slug
touch content/posts/best-ai-word-to-ppt-converter.md
```

### Step 2: Update Frontmatter

```yaml
---
# Original (Arabic)
title: "أفضل أداة لتحويل ملف وورد إلى بوربوينت"
slug: "best-ai-word-to-ppt-conversion-tool"
language: "ar"
translationKey: "word-to-ppt-guide-2025"
---

# English Translation
---
title: "Best AI Tool to Convert Word to PowerPoint"
slug: "best-ai-word-to-ppt-converter"  # Can be different
language: "en"
translationKey: "word-to-ppt-guide-2025"  # MUST be same
---

# Spanish Translation
---
title: "Mejor Herramienta de IA para Convertir Word a PowerPoint"
slug: "mejor-herramienta-convertir-word-powerpoint"
language: "es"
translationKey: "word-to-ppt-guide-2025"  # MUST be same
---
```

### Step 3: Translate Content

Translate all content sections:
- ✅ Title and metadata
- ✅ Headings (H2, H3)
- ✅ Body paragraphs
- ✅ Lists and tables
- ✅ FAQ sections
- ✅ Image alt text
- ✅ Links (update to language-specific URLs where applicable)

### Step 4: Update Schema Markup

Update JSON-LD structured data for the new language:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Best AI Tool to Convert Word to PowerPoint",
      "inLanguage": "en-US",  <!-- Update locale -->
      ...
    }
  ]
}
</script>
```

---

## 🎨 UI Components

### Language Switcher

Automatically displays available translations at the top of blog posts:

```tsx
{/* Language Switcher - Auto-rendered */}
<div className="mb-4 flex flex-wrap items-center gap-2">
  <span>Available in:</span>
  <Link href="/ar/blog/slug">العربية</Link>
  <Link href="/en/blog/slug">English</Link>
  <Link href="/es/blog/slug">Español</Link>
</div>
```

**Features:**
- Only shown if 2+ translations exist
- Current language highlighted
- Smooth transitions between languages
- RTL support for Arabic

### Blog List Filtering

Blog list pages automatically filter by current locale:

```typescript
// /en/blog → Shows only English posts
// /ar/blog → Shows only Arabic posts
// /es/blog → Shows only Spanish posts
```

---

## 🔍 SEO Features

### Hreflang Tags

Automatically generated for all translations:

```html
<link rel="alternate" hreflang="en" href="https://domain.com/en/blog/slug" />
<link rel="alternate" hreflang="ar" href="https://domain.com/ar/blog/slug" />
<link rel="alternate" hreflang="es" href="https://domain.com/es/blog/slug" />
```

### Canonical URLs

Each translation has its own canonical URL:

```html
<link rel="canonical" href="https://domain.com/en/blog/english-slug" />
```

### Open Graph Locale

Language-specific Open Graph tags:

```html
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="ar_SA" />
<meta property="og:locale:alternate" content="es_ES" />
```

---

## 📊 Translation Template

Use this template to create new translations:

```markdown
---
title: "[TRANSLATED TITLE]"
slug: "[translated-slug]"
date: "2025-07-28"
updated: "2025-10-06"
published: true
excerpt: "[Translated excerpt - 160 chars max]"
description: "[Translated SEO description - 160 chars max]"
image: "/og/image.png"  # Same image or localized version
author: "Sharayeh Team"
category: "[Translated Category]"
readingTime: "[X minutes / X دقائق / X minutos]"
tags:
  - [Translated Tag 1]
  - [Translated Tag 2]
keywords:
  - [Translated Keyword 1]
  - [Translated Keyword 2]
canonical: "https://sharayeh.com/[locale]/blog/[slug]"
language: "[en/ar/es]"
translationKey: "[SAME AS ORIGINAL]"
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://sharayeh.com/[locale]/blog/[slug]#article",
      "headline": "[TRANSLATED TITLE]",
      "description": "[Translated description]",
      "image": {...},
      "datePublished": "2025-07-28T10:00:00+03:00",
      "dateModified": "2025-10-06T14:30:00+03:00",
      "inLanguage": "[en-US/ar-SA/es-ES]",
      ...
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "[Home/الرئيسية/Inicio]",
          "item": "https://sharayeh.com/[locale]"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "[Blog/المدونة/Blog]",
          "item": "https://sharayeh.com/[locale]/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[TRANSLATED TITLE]",
          "item": "https://sharayeh.com/[locale]/blog/[slug]"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[Translated Question 1]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Translated Answer 1]"
          }
        }
      ]
    }
  ]
}
</script>

> **[Call to Action in Target Language]:**  
> **[[Link Text] ↗](/[locale]/tools/tool-name)**

---

## [Translated Heading 1]

[Translated content paragraph...]

### [Translated Subheading]

[More translated content...]

---

## [FAQ Section Title]

### [Translated Question 1]

[Translated Answer 1]

---

## [Conclusion Title]

[Translated conclusion paragraph...]
```

---

## 🚀 Quick Start Guide

### Translate Existing Post to English

1. **Copy the Arabic post:**
   ```bash
   cp content/posts/best-ai-word-to-ppt-conversion-tool.md \
      content/posts/best-ai-word-to-ppt-converter.en.md
   ```

2. **Update frontmatter:**
   ```yaml
   title: "Best AI Tool to Convert Word to PowerPoint (2025 Update)"
   slug: "best-ai-word-to-ppt-converter"
   language: "en"
   translationKey: "word-to-ppt-guide-2025"  # Keep same
   readingTime: "10 minutes"
   category: "AI Tools"
   ```

3. **Translate content:**
   - Translate all headings
   - Translate all paragraphs
   - Translate lists and tables
   - Update internal links to English versions
   - Translate FAQ section
   - Update schema markup language codes

4. **Test:**
   ```bash
   # Visit English version
   http://localhost:3000/en/blog/best-ai-word-to-ppt-converter
   
   # Check language switcher appears
   # Check Arabic version links back to original
   ```

### Translate to Spanish

Follow same process but use:
- `language: "es"`
- Spanish slug: `mejor-herramienta-convertir-word-powerpoint`
- Reading time: `"10 minutos"`
- Category translations

---

## 🎯 Translation Best Practices

### Content Localization

**Don't Just Translate - Localize:**
- ✅ Adapt examples to local context
- ✅ Use culturally appropriate references
- ✅ Adjust tone for target audience
- ✅ Update currency/units (USD → EUR → local currency)
- ✅ Localize date formats
- ✅ Use native idioms and expressions

### SEO Keywords

**Research Keywords Per Language:**
- English: "word to powerpoint converter", "docx to pptx"
- Arabic: "تحويل وورد إلى بوربوينت", "محول مستندات"
- Spanish: "convertidor word a powerpoint", "docx a pptx"

**Don't Directly Translate Keywords:**
- Research what people actually search in each language
- Use Google Keyword Planner for each locale
- Check search volumes per country

### Technical Terms

**Maintain Consistency:**
- Create glossary of technical terms
- Use same translation throughout
- Examples:
  - PowerPoint → بوربوينت (Arabic) / PowerPoint (Spanish)
  - AI → الذكاء الاصطناعي (Arabic) / IA (Spanish)
  - Conversion → تحويل (Arabic) / Conversión (Spanish)

---

## 🔄 Adding New Languages

### Step 1: Update Locale Configuration

```typescript
// src/data/locales.ts
export const LOCALES = ["en", "ar", "es", "fr", "de"] as const; // Add new language
export type Locale = typeof LOCALES[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  es: "Español",
  fr: "Français",  // Add new language
  de: "Deutsch",   // Add new language
};
```

### Step 2: Create Translation

Create post with new language code:

```yaml
---
title: "Meilleur Outil IA pour Convertir Word en PowerPoint"
slug: "meilleur-outil-convertir-word-powerpoint"
language: "fr"
translationKey: "word-to-ppt-guide-2025"  # Same as others
---
```

### Step 3: Test

System automatically:
- ✅ Detects new language
- ✅ Adds to language switcher
- ✅ Generates hreflang tags
- ✅ Filters blog list by language
- ✅ Routes correctly

---

## 📈 Analytics & Tracking

### Track Translation Performance

```javascript
// Google Analytics Events
gtag('event', 'language_switch', {
  'from_language': 'ar',
  'to_language': 'en',
  'post_slug': 'best-ai-word-to-ppt-conversion-tool'
});

// Track which languages are most popular
gtag('event', 'page_view', {
  'language': 'en',
  'content_type': 'blog_post'
});
```

### Monitor Translation Coverage

```typescript
// Check translation coverage
const posts = getAllPosts();
const postsWithEnglish = posts.filter(p => hasTranslation(p, 'en'));
const coverage = (postsWithEnglish.length / posts.length) * 100;

console.log(`English coverage: ${coverage}%`);
```

---

## ✅ Testing Checklist

### Per Translation

- [ ] Frontmatter has correct `language` field
- [ ] `translationKey` matches original post
- [ ] Slug is unique (no conflicts)
- [ ] All content translated (no Arabic/English mix)
- [ ] Schema markup updated with correct locale
- [ ] Internal links point to correct language versions
- [ ] Reading time accurate for target language
- [ ] Category and tags translated
- [ ] Keywords researched for target language

### System Testing

- [ ] Language switcher appears when 2+ translations
- [ ] Current language highlighted in switcher
- [ ] All languages link correctly
- [ ] Blog list filters by language
- [ ] Hreflang tags generated correctly
- [ ] Canonical URLs unique per translation
- [ ] Open Graph locale correct
- [ ] RTL works for Arabic
- [ ] No 404 errors on language switch

---

## 🐛 Troubleshooting

### Language Switcher Not Showing

**Problem:** Only one language button appears  
**Solution:** Check `translationKey` is identical across all translations (case-sensitive)

### Wrong Language on Blog List

**Problem:** English posts show in Arabic list  
**Solution:** Verify `language` field in frontmatter is correct

### 404 on Language Switch

**Problem:** Clicking language switcher gives 404  
**Solution:** 
1. Check slug exists for that language
2. Verify file naming is correct
3. Restart dev server to rebuild static params

### Hreflang Tags Missing

**Problem:** Only one hreflang tag generated  
**Solution:** Ensure posts have same `translationKey` and `generateStaticParams` is working

---

## 📚 Resources

### Translation Services

- **Professional:** Gengo, OneSky, Smartling
- **Community:** Crowdin, Lokalise
- **AI-Assisted:** DeepL, ChatGPT (with human review)

### SEO Tools

- Google Search Console (per language)
- Ahrefs (keyword research per country)
- SEMrush (international SEO)

### Testing Tools

- Google Rich Results Test (per language)
- hreflang Tags Testing Tool
- Screaming Frog (crawl per language)

---

## 📊 Current Status

**Implemented:**
- ✅ Multi-language post system
- ✅ Translation linking via `translationKey`
- ✅ Language-aware post loading
- ✅ Automatic language switcher UI
- ✅ Blog list language filtering
- ✅ Hreflang tag generation
- ✅ SEO metadata per language
- ✅ RTL support for Arabic

**Posts with Translations:**
- 🇸🇦 Arabic: `best-ai-word-to-ppt-conversion-tool.md` (original, 1,550 words)
- 🇬🇧 English: Pending (use template above)
- 🇪🇸 Spanish: Pending (use template above)

**Next Steps:**
1. Create English translation of Word-to-PPT post
2. Create Spanish translation of Word-to-PPT post
3. Translate 3-5 more high-traffic posts
4. Add French and German support
5. Monitor translation performance

---

**Status:** ✅ **SYSTEM COMPLETE - READY FOR TRANSLATIONS**  
**Last Updated:** October 6, 2025  
**Maintained By:** Development Team
