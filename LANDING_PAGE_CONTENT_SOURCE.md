# 📊 Landing Page Content Flow

## URL: `http://localhost:3000/en/tools/word-to-powerpoint`

---

## 🔄 Content Sources & Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    LANDING PAGE CONTENT FLOW                    │
└─────────────────────────────────────────────────────────────────┘

1️⃣ URL ROUTE
   /en/tools/[slug]
   └─> /src/app/[locale]/tools/[slug]/page.tsx

2️⃣ DATA SOURCE - CSV FILE
   /content/conversions.csv
   ├─ slug_en: "word-to-powerpoint"
   ├─ slug_ar: "تحويل-ملف-وورد-بوربوينت"
   ├─ dir: "DOCX→PPT"
   ├─ label_en: "Convert Word to PowerPoint"
   ├─ label_ar: "تحويل ملف وورد إلى بوربوينت"
   ├─ icon: "word-ppt.svg"
   ├─ avg_time_iso: "PT30S"
   ├─ steps_id: "word_to_ppt"
   └─ intro_ar: "" (empty)

3️⃣ DATA SOURCE - JSON FILE
   /content/conversion-extra.json
   └─> "word_to_ppt": {
         "ar": [
           "اضغط «اختر ملفك» وارفع مستند DOCX",
           "اضغط «حوِّل» وانتظر أقل من ٣٠ ثانية",
           "نزّل ملف PPTX أو شاركه"
         ],
         "en": [
           "Click "Choose File" and upload your DOCX",
           "Hit "Convert" — takes <30 s",
           "Download the PPTX or share a link"
         ]
       }

4️⃣ DATA LOADER
   /src/lib/server/converters.ts
   ├─ loadCsv() → reads conversions.csv
   ├─ loadExtra() → reads conversion-extra.json
   ├─ getConverters() → merges CSV + JSON
   ├─ getConverter(slug) → finds specific tool
   └─ getRelatedConverters(slug) → finds similar tools

5️⃣ PAGE COMPONENT
   /src/app/[locale]/tools/[slug]/page.tsx
   ├─ Calls: getConverter("word-to-powerpoint")
   ├─ Generates: SEO metadata (title, description, OG images)
   ├─ Creates: JSON-LD schemas (Software, Breadcrumb)
   └─ Renders: <LandingTemplate />

6️⃣ TEMPLATE COMPONENT
   /src/components/landing/LandingTemplate.tsx
   ├─ AI Prompt Section (with examples)
   ├─ Converter Widget
   ├─ Feature Section (AR or EN)
   ├─ Landing Copy (AR or EN)
   ├─ FAQ Section (AR or EN)
   └─ Related Tools Links

7️⃣ FEATURE/COPY COMPONENTS (Language-Specific)
   
   For ENGLISH:
   ├─ /src/components/landing/FeatureSectionEn.tsx
   └─ /src/components/landing/LandingCopyEn.tsx
   
   For ARABIC:
   ├─ /src/components/landing/FeatureSectionAr.tsx
   └─ /src/components/landing/LandingCopyAr.tsx

8️⃣ FAQ COMPONENTS
   ├─ /src/components/FaqEn.tsx (English FAQ)
   └─ /src/components/landing/FaqAr.tsx (Arabic FAQ)

```

---

## 📝 Content Structure for "word-to-powerpoint"

### From CSV (`conversions.csv`):
```csv
slug_en: word-to-powerpoint
slug_ar: تحويل-ملف-وورد-بوربوينت
dir: DOCX→PPT
label_en: Convert Word to PowerPoint
label_ar: تحويل ملف وورد إلى بوربوينت
icon: word-ppt.svg
avg_time_iso: PT30S (30 seconds)
steps_id: word_to_ppt
intro_ar: (empty)
```

### From JSON (`conversion-extra.json`):
```json
"word_to_ppt": {
  "ar": [
    "اضغط «اختر ملفك» وارفع مستند DOCX",
    "اضغط «حوِّل» وانتظر أقل من ٣٠ ثانية",
    "نزّل ملف PPTX أو شاركه"
  ],
  "en": [
    "Click "Choose File" and upload your DOCX",
    "Hit "Convert" — takes <30 s",
    "Download the PPTX or share a link"
  ]
}
```

---

## 🎨 Page Sections (Rendered Order)

```
┌──────────────────────────────────────────────┐
│ 1. HEADER                                    │
│    - H1: "Convert Word to PowerPoint"       │
│    - Icon: word-ppt.svg                     │
├──────────────────────────────────────────────┤
│ 2. AI PROMPT SECTION (NEW!)                 │
│    - Title: "Use AI to Convert..."          │
│    - Prompt Form                            │
│    - Quick Examples (4 buttons)             │
│    - Features: Fast, Professional, Multi-Lang│
├──────────────────────────────────────────────┤
│ 3. CONVERTER WIDGET                          │
│    - Upload area                            │
│    - Convert button                         │
│    - Download/Share options                 │
├──────────────────────────────────────────────┤
│ 4. FEATURES SECTION                          │
│    - FeatureSectionEn/Ar component          │
│    - 3-6 feature cards                      │
├──────────────────────────────────────────────┤
│ 5. LANDING COPY SECTION                      │
│    - LandingCopyEn/Ar component             │
│    - Long-form content                      │
│    - Step-by-step guide                     │
├──────────────────────────────────────────────┤
│ 6. FAQ SECTION                               │
│    - FaqEn/FaqAr component                  │
│    - Common questions                       │
├──────────────────────────────────────────────┤
│ 7. RELATED TOOLS (Arabic only)              │
│    - "People also search for"               │
│    - Links to similar converters            │
└──────────────────────────────────────────────┘
```

---

## 🔧 How to Update Content

### 1. Update Tool Title/Description (CSV)
**File**: `/content/conversions.csv`

```csv
# Edit this line:
word-to-powerpoint,تحويل-ملف-وورد-بوربوينت,DOCX→PPT,Convert Word to PowerPoint,تحويل ملف وورد إلى بوربوينت,word-ppt.svg,PT30S,word_to_ppt,

# Change any column:
slug_en,slug_ar,dir,label_en,label_ar,icon,avg_time_iso,steps_id,intro_ar
```

### 2. Update Step-by-Step Instructions (JSON)
**File**: `/content/conversion-extra.json`

```json
{
  "word_to_ppt": {
    "ar": [
      "خطوة 1 بالعربي",
      "خطوة 2 بالعربي",
      "خطوة 3 بالعربي"
    ],
    "en": [
      "Step 1 in English",
      "Step 2 in English",
      "Step 3 in English"
    ]
  }
}
```

### 3. Update Feature Section
**Files**:
- `/src/components/landing/FeatureSectionEn.tsx` (English)
- `/src/components/landing/FeatureSectionAr.tsx` (Arabic)

Edit the component directly - it contains hardcoded features.

### 4. Update Landing Copy (Long-form content)
**Files**:
- `/src/components/landing/LandingCopyEn.tsx` (English)
- `/src/components/landing/LandingCopyAr.tsx` (Arabic)

Edit the component directly - contains main page content.

### 5. Update FAQ
**Files**:
- `/src/components/FaqEn.tsx` (English FAQ)
- `/src/components/landing/FaqAr.tsx` (Arabic FAQ)

Edit the component directly - contains FAQ questions/answers.

---

## 🎯 Quick Examples per Tool Category

The landing page generates AI prompt examples based on the tool slug:

### Video Tools (includes "video"):
```typescript
Examples:
- "Dub educational video to Arabic"
- "Translate marketing video with AI"
- "Convert presentation to video"
- "Add voiceover to video"
```

### PowerPoint Tools (includes "powerpoint", "ppt", "slides"):
```typescript
Examples:
- "Presentation about AI in healthcare"
- "Business plan for a tech startup"
- "Training guide for new employees"
- "Digital marketing strategy for 2025"
```

### Translation Tools (includes "translate", "subtitle"):
```typescript
Examples:
- "Translate presentation to English"
- "Add Arabic subtitles to slides"
- "Translate business document to Arabic"
- "Convert text to RTL format"
```

### Generic Tools (others):
```typescript
Examples:
- "{Tool Name} for marketing document"
- "{Tool Name} for business report"
- "{Tool Name} for legal contract"
- "{Tool Name} for educational guide"
```

---

## 🔗 URL Redirects

When user submits AI prompt, they're redirected to the actual tool page:

```typescript
// From: /en/tools/word-to-powerpoint
// To:   /en/slides?prompt={prompt}&autoStart=true&tool=word-to-powerpoint

Mapping Logic:
- video tools       → /video
- powerpoint tools  → /slides
- pdf tools         → /pdf
- document tools    → /documents
- translate tools   → /translate
- html/web tools    → /web
- default           → /slides
```

---

## 📊 SEO Metadata Generation

The page automatically generates:

1. **Title**: `{label_en} | Sharayeh`
2. **Description**: Dynamic based on tool direction (DOCX→PPT)
3. **Keywords**: Auto-generated from tool type
4. **OG Image**: `/api/og/tool/{slug}`
5. **Canonical URL**: `{siteUrl}/{locale}/tools/{slug}`
6. **Hreflang**: Alternate language versions
7. **Schema.org**:
   - SoftwareApplication schema
   - BreadcrumbList schema
   - HowTo schema (from steps)

---

## 🚀 Related Tools Logic

Related tools are found based on shared extensions:

```typescript
// For "word-to-powerpoint" (DOCX→PPT)
// Finds tools containing either:
// - DOCX (source format)
// - PPT (target format)

Related examples:
- pdf-to-powerpoint (shares PPT)
- powerpoint-to-pdf (shares PPT)
- excel-to-powerpoint (shares PPT)
- word-to-pdf (shares DOCX)
```

Sorted by search volume (descending), limited to 4 tools.

---

## 💡 Summary

**Primary Content Sources:**
1. ✅ `/content/conversions.csv` - Tool metadata
2. ✅ `/content/conversion-extra.json` - Step-by-step instructions
3. ✅ `/src/components/landing/LandingCopyEn.tsx` - English long-form content
4. ✅ `/src/components/landing/LandingCopyAr.tsx` - Arabic long-form content
5. ✅ `/src/components/landing/FeatureSectionEn.tsx` - English features
6. ✅ `/src/components/landing/FeatureSectionAr.tsx` - Arabic features
7. ✅ `/src/components/FaqEn.tsx` - English FAQ
8. ✅ `/src/components/landing/FaqAr.tsx` - Arabic FAQ

**Processing:**
- `/src/lib/server/converters.ts` - Data loading and merging
- `/src/app/[locale]/tools/[slug]/page.tsx` - Page generation and SEO
- `/src/components/landing/LandingTemplate.tsx` - Layout orchestration

**To edit content for a specific tool:**
1. Update CSV for titles/labels
2. Update JSON for step-by-step guide
3. Edit component files for features/copy/FAQ

---

**Date**: October 5, 2025  
**Tool Example**: word-to-powerpoint  
**URL**: http://localhost:3000/en/tools/word-to-powerpoint
