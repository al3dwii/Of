# Landing Pages Testing Guide

## ✅ Implementation Complete

All 30 landing page topics (60 entries with EN/AR) have been successfully added to the codebase.

---

## Quick Test Commands

### Start Development Server
```bash
cd /Users/omair/Oold/Of
npm run dev
```

### Open Test URLs

#### Test New English Landing Pages
```bash
# AI Presentation Pages
open http://localhost:3000/en/slides/ai-presentation-maker
open http://localhost:3000/en/slides/ai-presentation-generator

# Conversion Pages
open http://localhost:3000/en/slides/google-docs-to-presentation
open http://localhost:3000/en/slides/notion-to-slides

# Business Pages
open http://localhost:3000/en/slides/pitch-deck-generator
open http://localhost:3000/en/slides/sales-proposal-presentation
open http://localhost:3000/en/slides/marketing-plan-presentation
open http://localhost:3000/en/slides/business-report-to-ppt

# Academic Pages
open http://localhost:3000/en/slides/research-paper-to-presentation
open http://localhost:3000/en/slides/academic-presentation-thesis
open http://localhost:3000/en/slides/lesson-plan-presentation

# Specialized Pages
open http://localhost:3000/en/slides/training-workshop-slides
open http://localhost:3000/en/slides/meeting-notes-to-slides
open http://localhost:3000/en/slides/sop-to-slides

# Tools & Features
open http://localhost:3000/en/slides/slide-translator
open http://localhost:3000/en/slides/bilingual-arabic-english-presentation
open http://localhost:3000/en/slides/powerpoint-alternative
open http://localhost:3000/en/slides/ai-presentation-templates
open http://localhost:3000/en/slides/ai-speaker-notes
```

#### Test Arabic Landing Pages (RTL Layout)
```bash
# Test RTL Layout
open http://localhost:3000/ar/slides/ai-presentation-maker
open http://localhost:3000/ar/slides/pitch-deck-generator
open http://localhost:3000/ar/slides/research-paper-to-presentation
open http://localhost:3000/ar/slides/bilingual-arabic-english-presentation

# Test Arabic Text Rendering
open http://localhost:3000/ar/slides/slide-translator
open http://localhost:3000/ar/slides/lesson-plan-presentation
```

---

## Testing Checklist

### ✅ Functionality Tests

#### For Each Landing Page:
1. **Page Loads Successfully**
   - [ ] No 404 errors
   - [ ] Page renders without errors
   - [ ] All sections visible

2. **Content Display**
   - [ ] H1 headline displays correctly
   - [ ] Description/pitch visible
   - [ ] Features section (4 features)
   - [ ] How it works section (3-4 steps)
   - [ ] FAQ section (4 Q&As)
   - [ ] Suggested prompts (3 examples)
   - [ ] Related links section

3. **SEO Elements**
   - [ ] Page title in browser tab
   - [ ] Meta description (view page source)
   - [ ] Breadcrumbs navigation
   - [ ] Internal links work

4. **Bilingual Features**
   - [ ] English page links to Arabic version
   - [ ] Arabic page links to English version
   - [ ] Language switcher works
   - [ ] RTL layout on Arabic pages

5. **Interactive Elements**
   - [ ] CTA buttons clickable
   - [ ] Workbench integration works
   - [ ] Related links navigate correctly
   - [ ] Suggested prompts clickable

---

## Validation Tools

### 1. Google Rich Results Test
Test Schema.org markup:
```
https://search.google.com/test/rich-results

Test URLs:
- http://localhost:3000/en/slides/ai-presentation-maker
- http://localhost:3000/ar/slides/pitch-deck-generator
```

Expected schemas:
- ✅ WebPage
- ✅ BreadcrumbList
- ✅ SoftwareApplication
- ✅ HowTo
- ✅ FAQPage

### 2. Hreflang Validation
Check `<link rel="alternate" hreflang="...">` tags in page source:
```html
<link rel="alternate" hreflang="en" href="http://localhost:3000/en/slides/..." />
<link rel="alternate" hreflang="ar" href="http://localhost:3000/ar/slides/..." />
<link rel="canonical" href="http://localhost:3000/en/slides/..." />
```

### 3. RTL Layout Test
Arabic pages should have:
```html
<html dir="rtl" lang="ar">
```

Elements should flow right-to-left:
- Text alignment
- Breadcrumbs (arrow direction)
- Button positions
- Related links layout

### 4. Page Speed Check
```bash
# Lighthouse CI (if installed)
lighthouse http://localhost:3000/en/slides/ai-presentation-maker --view

# Or use Chrome DevTools > Lighthouse
```

### 5. Accessibility Check
- [ ] All images have alt text
- [ ] Headings hierarchy (H1 → H2 → H3)
- [ ] Links have descriptive text
- [ ] Color contrast (WCAG AA)
- [ ] Keyboard navigation works

---

## Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Firefox Mobile

### Responsive Breakpoints
- [ ] Desktop (1920px)
- [ ] Laptop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## SEO Testing

### 1. Check Sitemap Generation
```bash
open http://localhost:3000/sitemap.xml
```

Should include all landing pages:
```xml
<url>
  <loc>https://yourdomain.com/en/slides/ai-presentation-maker</loc>
  <lastmod>...</lastmod>
</url>
<url>
  <loc>https://yourdomain.com/ar/slides/ai-presentation-maker</loc>
  <lastmod>...</lastmod>
</url>
```

### 2. Check robots.txt
```bash
open http://localhost:3000/robots.txt
```

Should allow indexing:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### 3. Meta Tags Validation
View page source for each landing page and verify:

```html
<!-- Title -->
<title>AI Presentation Maker — Create Slides from a Prompt (PPTX & PDF)</title>

<!-- Description -->
<meta name="description" content="Turn any idea into a polished presentation..." />

<!-- Keywords -->
<meta name="keywords" content="ai presentation maker, ai slide generator, ..." />

<!-- Open Graph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:image" content="..." />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />

<!-- Hreflang -->
<link rel="alternate" hreflang="en" href="..." />
<link rel="alternate" hreflang="ar" href="..." />
<link rel="canonical" href="..." />
```

---

## Internal Linking Test

### Verify Related Links Work
Each landing page should link to 2-3 related pages.

Example for AI Presentation Maker:
- Should link to: `ai-presentation-generator`, `convert-word-to-ppt`
- Links should be clickable and navigate correctly

### Check Breadcrumbs
```
Home > Slides > AI Presentation Maker
```

All breadcrumb links should work.

---

## Performance Testing

### Build Time Test
```bash
npm run build
```

Should complete without errors and generate static pages:
```
Route (app)                                        Size     First Load JS
┌ ○ /[locale]/slides/[slug]                       X kB     Y kB
│ ├ /en/slides/ai-presentation-maker
│ ├ /en/slides/ai-presentation-generator
│ ├ /ar/slides/ai-presentation-maker
│ └ ...
```

### Page Load Speed
Target metrics:
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

---

## Content Quality Check

### For Each Landing Page:

1. **Unique Content**
   - [ ] H1 is unique (not duplicated)
   - [ ] Description is specific to topic
   - [ ] Features are relevant
   - [ ] FAQs answer real questions

2. **Keyword Optimization**
   - [ ] Target keyword in H1
   - [ ] Target keyword in title
   - [ ] Target keyword in description
   - [ ] Related keywords in content

3. **CTA Effectiveness**
   - [ ] Clear value proposition
   - [ ] Action-oriented button text
   - [ ] Multiple CTA opportunities
   - [ ] Workbench pre-filled prompts

4. **Arabic Translation Quality**
   - [ ] Natural Arabic language
   - [ ] Cultural appropriateness
   - [ ] Technical terms accurate
   - [ ] RTL formatting correct

---

## Integration Testing

### 1. Workbench Integration
Click "Generate Slides" button should:
- [ ] Pre-fill prompt in workbench
- [ ] Set correct language
- [ ] Set appropriate slide count
- [ ] Navigate to workbench page

### 2. Suggested Prompts
Click suggested prompt should:
- [ ] Load workbench with prompt
- [ ] Maintain landing page context
- [ ] Start generation process

### 3. Related Pages Navigation
Click related page link should:
- [ ] Navigate to correct landing page
- [ ] Maintain locale (EN stays EN, AR stays AR)
- [ ] Update breadcrumbs
- [ ] Load new page content

---

## Error Handling

### Test Error Cases:
1. **Invalid Slug**
   ```
   http://localhost:3000/en/slides/non-existent-page
   ```
   - [ ] Shows 404 page
   - [ ] Proper error message
   - [ ] Navigation still works

2. **Invalid Locale**
   ```
   http://localhost:3000/fr/slides/ai-presentation-maker
   ```
   - [ ] Redirects to default locale
   - [ ] Or shows appropriate error

---

## Production Deployment Checklist

Before deploying to production:

### 1. Environment Variables
- [ ] `NEXT_PUBLIC_SITE_URL` set correctly
- [ ] Analytics tracking IDs configured
- [ ] API endpoints updated

### 2. SEO Configuration
- [ ] Domain in `next.config.mjs`
- [ ] Sitemap generation enabled
- [ ] Robots.txt configured
- [ ] Google Search Console setup

### 3. Performance Optimization
- [ ] Images optimized
- [ ] Static pages pre-rendered
- [ ] CDN configured
- [ ] Cache headers set

### 4. Analytics Setup
- [ ] Google Analytics 4
- [ ] Event tracking for CTAs
- [ ] Conversion tracking
- [ ] Search Console integration

### 5. Monitoring
- [ ] Error tracking (Sentry/similar)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] SEO monitoring

---

## Maintenance Tasks

### Regular Checks
- [ ] Weekly: Check for 404 errors in logs
- [ ] Monthly: Review landing page performance in GA4
- [ ] Monthly: Update landing pages based on user feedback
- [ ] Quarterly: Refresh content for SEO

### Content Updates
When updating landing pages:
1. Edit content in `/src/data/landings.slides.ts`
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Deploy updated pages

---

## Common Issues & Solutions

### Issue: Page Not Found (404)
**Solution**: Check that slug matches exactly in `landings.slides.ts`

### Issue: Arabic Text Not RTL
**Solution**: Verify `dir="rtl"` in HTML and locale is "ar"

### Issue: Schema Errors in Rich Results Test
**Solution**: Validate JSON-LD structure in page source

### Issue: Broken Internal Links
**Solution**: Check related slugs match existing landing pages

### Issue: Duplicate Meta Tags
**Solution**: Ensure `generateMetadata()` is not overridden elsewhere

---

## Success Metrics

### Track These KPIs:

1. **Traffic Metrics**
   - Organic search traffic per landing page
   - Bounce rate
   - Time on page
   - Pages per session

2. **Conversion Metrics**
   - CTA click-through rate
   - Workbench activation rate
   - Sign-up conversion rate
   - Trial-to-paid conversion

3. **SEO Metrics**
   - Keyword rankings
   - Click-through rate in SERPs
   - Impressions
   - Average position

4. **Technical Metrics**
   - Page load time
   - Core Web Vitals
   - Error rate
   - Uptime

---

## Support & Documentation

### Key Files
- **Data**: `/src/data/landings.slides.ts`
- **Template**: `/src/app/[locale]/(landings)/slides/[slug]/page.tsx`
- **Summary**: `/LANDING_PAGES_SUMMARY.md`
- **Strategy**: `/newlanding.md`

### Need Help?
- Check TypeScript errors: `npm run type-check`
- View build output: `npm run build`
- Test locally: `npm run dev`

---

## Next Steps After Testing

1. ✅ Complete all checklist items above
2. ✅ Fix any issues found during testing
3. ✅ Get stakeholder approval on content
4. ✅ Deploy to staging environment
5. ✅ Final QA on staging
6. ✅ Deploy to production
7. ✅ Submit sitemap to Google Search Console
8. ✅ Monitor performance for first week
9. ✅ Iterate based on user feedback

---

**Status**: Ready for testing ✅  
**Last Updated**: Now  
**Version**: 1.0 - All 30 landing pages implemented
