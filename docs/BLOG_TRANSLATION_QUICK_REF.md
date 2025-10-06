# Blog Translation Quick Reference

## 🚀 Quick Start: Translate a Post

### 1. Create Translation File
```bash
# For English
cp content/posts/original.md content/posts/original.en.md

# For Spanish  
cp content/posts/original.md content/posts/original.es.md
```

### 2. Update Frontmatter (CRITICAL!)
```yaml
---
title: "[Translated Title]"
slug: "[new-slug]"  # Can be different per language
language: "en"  # CHANGE THIS: en, ar, or es
translationKey: "original-2025"  # KEEP SAME AS ORIGINAL
---
```

### 3. Translate Content
- ✅ All headings
- ✅ All paragraphs
- ✅ Lists and tables
- ✅ FAQ section
- ✅ Schema markup (change `inLanguage`)

---

## 📋 Essential Functions

```typescript
// Get posts by language
import { getPostsByLanguage } from '@/utils/posts';
const englishPosts = getPostsByLanguage('en');

// Get specific post
import { getPostBySlugAndLanguage } from '@/utils/posts';
const post = getPostBySlugAndLanguage('slug', 'en');

// Get all translations
import { getPostTranslations } from '@/utils/posts';
const translations = getPostTranslations(post);
```

---

## ✅ Pre-Publish Checklist

- [ ] `language` field set correctly (en/ar/es)
- [ ] `translationKey` matches original (case-sensitive!)
- [ ] Slug is unique (no duplicates)
- [ ] All content translated (no mixed languages)
- [ ] Schema `inLanguage` updated (en-US/ar-SA/es-ES)
- [ ] Internal links point to correct language
- [ ] Reading time updated
- [ ] Test URL loads: `/[locale]/blog/[slug]`

---

## 🐛 Common Issues

**Language switcher not showing?**
→ Check `translationKey` is identical across all posts

**Wrong language in blog list?**
→ Verify `language` field in frontmatter

**404 on language switch?**
→ Restart dev server to rebuild static params

---

## 📊 Status Dashboard

| Post | AR | EN | ES |
|------|----|----|-----|
| Word to PPT Guide | ✅ | ✅ | ⏳ |
| PDF to PPT Guide | ✅ | ⏳ | ⏳ |
| ... | ... | ... | ... |

**Legend:** ✅ Complete | ⏳ Pending | ❌ Not Started

---

## 🎯 Translation Priority

1. **High Traffic Posts** (word-to-ppt, pdf-to-ppt)
2. **Evergreen Content** (how-to guides, comparisons)
3. **Recent Posts** (less than 3 months old)
4. **Seasonal Content** (as needed)

---

**Quick Links:**
- Full Documentation: `BLOG_TRANSLATION_SYSTEM.md`
- Translation Template: `content/posts/best-ai-word-to-ppt-converter.en.md`
