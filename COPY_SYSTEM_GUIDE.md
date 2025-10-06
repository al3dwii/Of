# 📝 Website Copy System - Implementation Guide

## Overview

All copywriting for the 10 most important pages is now centralized in **`/src/data/pages-copy.ts`** with full Arabic and English translations.

---

## 📦 Files Created

1. **`/src/data/pages-copy.ts`** - Main copy content (Arabic & English)
2. **`/src/utils/copy.ts`** - Utility functions to access copy
3. **`COPY_SYSTEM_GUIDE.md`** - This documentation

---

## 🎯 10 Pages with Complete Copy

### 1. **Home Page** (`home`)
- Hero section with H1, subhead, CTAs
- Features list (5 items)
- How it works (4 steps)
- Social proof (3 stats)
- FAQ (5 questions)
- Footer CTA

### 2. **AI Presentation Generator** (`aiPresentationGenerator`)
- Product features (6 items)
- Workflow steps
- Target audiences (4 types)
- FAQ (4 questions)

### 3. **Doc to Slides** (`docToSlides`)
- Conversion highlights (5 items)
- Use cases (5 types)
- Simple workflow (3 steps)
- FAQ (4 questions)

### 4. **Templates & Themes** (`templatesThemes`)
- 8 template categories
- Theme customization features (4 items)
- FAQ (4 questions)

### 5. **Pricing** (`pricing`)
- 4 plan tiers (Free, Pro, Team, Enterprise)
- Feature comparison
- FAQ (5 questions)

### 6. **Enterprise & Teams** (`enterprise`)
- Team features (6 items)
- Enterprise add-ons (6 items)
- FAQ (4 questions)

### 7. **Security & Compliance** (`security`)
- Security practices (6 items)
- Compliance certifications (6 items)
- FAQ (4 questions)

### 8. **Integrations** (`integrations`)
- Featured integrations (8 items)
- Developer tools (6 items)
- FAQ (4 questions)

### 9. **Use Cases Hub** (`useCases`)
- 8 role-specific use cases
- What's included (6 items)
- FAQ (4 questions)

### 10. **Resources & Academy** (`resources`)
- Available resources (8 items)
- Popular resources (6 stats)
- FAQ (4 questions)

---

## 🔧 How to Use

### Basic Usage

```typescript
import { getPageCopy } from '@/utils/copy';

// In your component or page
export default function HomePage({ params }: { params: { locale: 'en' | 'ar' } }) {
  const copy = getPageCopy('home', params.locale);

  return (
    <div>
      <h1>{copy.h1}</h1>
      <p>{copy.subhead}</p>
      <button>{copy.primaryCTA}</button>
      {copy.secondaryCTA && <button>{copy.secondaryCTA}</button>}
    </div>
  );
}
```

### Using Features List

```typescript
const copy = getPageCopy('home', locale);

return (
  <section>
    <h2>{copy.features?.title}</h2>
    <ul>
      {copy.features?.items.map((feature, idx) => (
        <li key={idx}>{feature}</li>
      ))}
    </ul>
  </section>
);
```

### Using FAQ Section

```typescript
const copy = getPageCopy('home', locale);

return (
  <section>
    <h2>{copy.faq?.title}</h2>
    {copy.faq?.items.map((item, idx) => (
      <details key={idx}>
        <summary>{item.q}</summary>
        <p>{item.a}</p>
      </details>
    ))}
  </section>
);
```

### Using How It Works

```typescript
const copy = getPageCopy('home', locale);

return (
  <section>
    <h2>{copy.howItWorks?.title}</h2>
    <ol>
      {copy.howItWorks?.steps.map((step, idx) => (
        <li key={idx}>{step}</li>
      ))}
    </ol>
  </section>
);
```

---

## 📄 Page Identifiers

Use these constants for type-safe page access:

```typescript
import { PAGE_IDS } from '@/utils/copy';

// All available page IDs:
PAGE_IDS.HOME                 // 'home'
PAGE_IDS.AI_PRESENTATION      // 'aiPresentationGenerator'
PAGE_IDS.DOC_TO_SLIDES        // 'docToSlides'
PAGE_IDS.TEMPLATES            // 'templatesThemes'
PAGE_IDS.PRICING              // 'pricing'
PAGE_IDS.ENTERPRISE           // 'enterprise'
PAGE_IDS.SECURITY             // 'security'
PAGE_IDS.INTEGRATIONS         // 'integrations'
PAGE_IDS.USE_CASES            // 'useCases'
PAGE_IDS.RESOURCES            // 'resources'
```

---

## 🌐 Language Support

### Current Languages:
- ✅ **English** (`en`) - Complete
- ✅ **Arabic** (`ar`) - Complete with RTL support
- ⏳ **Spanish** (`es`) - Structure ready, needs translation

### Fallback Behavior:
If a translation is missing, the system automatically falls back to English.

```typescript
// Always safe - will never throw an error
const copy = getPageCopy('home', 'es'); // Falls back to English if Spanish not available
```

---

## 📊 Copy Structure

Each page follows this consistent structure:

```typescript
interface PageCopy {
  h1: string;                    // Main heading
  subhead: string;               // Subtitle/description
  primaryCTA: string;            // Main call-to-action button
  secondaryCTA?: string;         // Optional secondary CTA
  features?: {                   // Features/highlights list
    title: string;
    items: string[];
  };
  howItWorks?: {                 // Process steps
    title: string;
    steps: string[];
  };
  socialProof?: {                // Stats/testimonials
    title: string;
    stats: string[];
  };
  faq?: {                        // FAQ section
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  footerCTA?: string;            // Bottom CTA
}
```

---

## 🎨 Example: Complete Home Page

```tsx
// app/[locale]/page.tsx
import { getPageCopy } from '@/utils/copy';
import type { Locale } from '@/data/locales';

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const copy = getPageCopy('home', params.locale);

  return (
    <main className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">{copy.h1}</h1>
        <p className="text-xl text-gray-600 mb-8">{copy.subhead}</p>
        <div className="flex gap-4 justify-center">
          <button className="btn-primary">{copy.primaryCTA}</button>
          {copy.secondaryCTA && (
            <button className="btn-secondary">{copy.secondaryCTA}</button>
          )}
        </div>
      </section>

      {/* Features Section */}
      {copy.features && (
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {copy.features.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copy.features.items.map((feature, idx) => (
              <div key={idx} className="p-6 border rounded-lg">
                <p className="text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {copy.howItWorks && (
        <section className="py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-12">
            {copy.howItWorks.title}
          </h2>
          <div className="max-w-3xl mx-auto">
            {copy.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 mb-6">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg flex-1">{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      {copy.socialProof && (
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {copy.socialProof.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {copy.socialProof.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xl font-semibold">{stat}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {copy.faq && (
        <section className="py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-12">
            {copy.faq.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {copy.faq.items.map((item, idx) => (
              <details key={idx} className="p-6 bg-white border rounded-lg">
                <summary className="font-semibold cursor-pointer text-lg">
                  {item.q}
                </summary>
                <p className="mt-3 text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      {copy.footerCTA && (
        <section className="py-16 text-center">
          <button className="btn-primary text-lg px-8 py-4">
            {copy.footerCTA}
          </button>
        </section>
      )}
    </main>
  );
}
```

---

## 🔄 Adding New Languages

To add Spanish or other languages:

1. **Update the PageContent interface** (if needed):
```typescript
// In pages-copy.ts
export interface PageContent {
  en: PageCopy;
  ar: PageCopy;
  es?: PageCopy; // Add new language
}
```

2. **Add translations** for each page:
```typescript
export const homePage: PageContent = {
  en: { /* existing */ },
  ar: { /* existing */ },
  es: {
    h1: "Convierte ideas y documentos en presentaciones hermosas—al instante",
    subhead: "Pega un texto o sube un Word/PDF...",
    // ... rest of Spanish copy
  }
};
```

3. **Update the copy utility** (if fallback logic needed):
```typescript
// In copy.ts
export function getPageCopy<T extends keyof typeof pagesCopy>(
  page: T,
  locale: Locale
) {
  const pageCopy = pagesCopy[page] as PageContent;
  
  if (locale === 'es' && pageCopy.es) {
    return pageCopy.es;
  }
  if (locale === 'ar' && pageCopy.ar) {
    return pageCopy.ar;
  }
  return pageCopy.en;
}
```

---

## 🎯 Best Practices

### 1. **Always Use Type-Safe Access**
```typescript
// ✅ Good - Type-safe
const copy = getPageCopy('home', locale);

// ❌ Bad - Prone to errors
const copy = pagesCopy['home'][locale];
```

### 2. **Handle Optional Fields**
```typescript
// ✅ Good - Safe access
{copy.features?.items.map(...)}

// ❌ Bad - Can throw error
{copy.features.items.map(...)}
```

### 3. **Use Consistent Structure**
Keep the same structure across all languages for easier maintenance.

### 4. **RTL Support for Arabic**
Use `dir={locale === 'ar' ? 'rtl' : 'ltr'}` on sections with Arabic content.

```tsx
<section dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  {/* Content */}
</section>
```

---

## 📚 Utility Functions

### Available Functions:

```typescript
// Get page copy
const copy = getPageCopy('home', 'en');

// Get all available pages
const pages = getAvailablePages();
// Returns: ['home', 'aiPresentationGenerator', ...]

// Check if locale is available
const hasArabic = hasLocale('home', 'ar');
// Returns: true
```

---

## 🔧 Integration Examples

### Example 1: Pricing Page

```tsx
// app/[locale]/pricing/page.tsx
import { getPageCopy } from '@/utils/copy';

export default function PricingPage({ params }: { params: { locale: 'en' | 'ar' } }) {
  const copy = getPageCopy('pricing', params.locale);

  return (
    <div>
      <h1>{copy.h1}</h1>
      <p>{copy.subhead}</p>
      
      {/* Plans */}
      {copy.features && (
        <div className="grid md:grid-cols-4 gap-6">
          {copy.features.items.map((plan, idx) => (
            <div key={idx} className="border rounded-lg p-6">
              <p>{plan}</p>
            </div>
          ))}
        </div>
      )}

      {/* FAQ */}
      {copy.faq && (
        <div className="mt-16">
          <h2>{copy.faq.title}</h2>
          {copy.faq.items.map((item, idx) => (
            <div key={idx}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Example 2: Integrations Page

```tsx
// app/[locale]/integrations/page.tsx
import { getPageCopy } from '@/utils/copy';

export default function IntegrationsPage({ params }: { params: { locale: 'en' | 'ar' } }) {
  const copy = getPageCopy('integrations', params.locale);

  return (
    <div>
      <h1>{copy.h1}</h1>
      <p>{copy.subhead}</p>

      {/* Featured Integrations */}
      {copy.features && (
        <div className="grid md:grid-cols-3 gap-6">
          {copy.features.items.map((integration, idx) => (
            <div key={idx} className="p-6 border rounded-lg">
              <p>{integration}</p>
            </div>
          ))}
        </div>
      )}

      {/* Developer Tools */}
      {copy.socialProof && (
        <div className="mt-16">
          <h2>{copy.socialProof.title}</h2>
          <ul>
            {copy.socialProof.stats.map((tool, idx) => (
              <li key={idx}>{tool}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Styling Tips

### Arabic RTL Support

```tsx
<div 
  dir={locale === 'ar' ? 'rtl' : 'ltr'}
  className={locale === 'ar' ? 'text-right' : 'text-left'}
>
  {copy.h1}
</div>
```

### Responsive Lists

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {copy.features?.items.map((item, idx) => (
    <div key={idx}>{item}</div>
  ))}
</div>
```

---

## ✅ Checklist: Implementing a New Page

- [ ] Add page copy to `/src/data/pages-copy.ts`
- [ ] Include both English and Arabic translations
- [ ] Export the page in `pagesCopy` object
- [ ] Add page ID to `PAGE_IDS` in `/src/utils/copy.ts`
- [ ] Create page component using `getPageCopy()`
- [ ] Test with both `en` and `ar` locales
- [ ] Verify RTL layout for Arabic
- [ ] Check FAQ section works
- [ ] Test all CTAs and links
- [ ] Verify mobile responsiveness

---

## 🔍 Testing

```bash
# Start dev server
npm run dev

# Test each page in both languages:
http://localhost:3000/en
http://localhost:3000/ar
http://localhost:3000/en/pricing
http://localhost:3000/ar/pricing
# ... etc
```

---

## 📊 Content Statistics

**Total Content:**
- 10 pages × 2 languages = 20 complete page versions
- ~350 translated strings
- ~15,000+ words of professional copy
- 40+ FAQ items
- 60+ feature descriptions

---

## 🚀 Next Steps

1. **Implement pages** using the copy system
2. **Add Spanish translations** (structure ready)
3. **Create reusable components** for common sections (FAQ, Features, etc.)
4. **Add SEO metadata** using the H1 and subhead text
5. **Test accessibility** for RTL and LTR layouts

---

## 📝 Contributing

### Adding New Copy:
1. Edit `/src/data/pages-copy.ts`
2. Follow existing structure
3. Add both English and Arabic
4. Test with `getPageCopy()`

### Updating Existing Copy:
1. Find page in `/src/data/pages-copy.ts`
2. Update desired language
3. Save and test

---

**Documentation Complete! 🎉**

All copy for the 10 most important pages is ready to use in both Arabic and English.
