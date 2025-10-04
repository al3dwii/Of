// src/data/landings.slides.ts
import type { Locale } from "./locales";

/** Must match SlideCard's control keys */
export type HideKey = "backend" | "language" | "slidesCount" | "prompt" | "upload";




export type SlidesLanding = {
  locale: Locale;
  slug: string;                 // URL slug (encoded if Arabic)
  h1: string;                   // visible H1
  title: string;                // <title>
  description: string;          // meta description (<= 160 chars)
  heroPitch?: string;           // short teaser line
  keywords?: string[];          // SEO assist (synonyms / long-tail variants)

  /** Cross-locale mapping for alternates (optional) */
  alt?: { en?: string; ar?: string };

  /** Defaults for the slides workbench presets */
  defaults?: {
    backendBaseUrl?: string;
    language?: "en" | "ar";
    slidesCount?: number;
    prompt?: string;
  };

  /** Hide advanced controls on landings to keep UX focused */
  hideControls?: HideKey[];

  /** Optional content blocks used on the landing / JSON-LD */
  faq?: { q: string; a: string }[];
  howto?: { step: string; tip?: string }[];

  /** Optional: on-page highlights; if absent the page shows sensible defaults */
  features?: { title: string; desc: string }[];

  /** Optional: deep links that prefill /slides?prompt=... etc. */
  suggestedPrompts?: string[];

  /** Optional related slugs (same locale) for internal linking */
  related?: string[];
};

export const slidesLandings: SlidesLanding[] = [
  // 1) Word → PPT (AR)
  {
    locale: "ar",
    slug: "convert-word-to-ppt",
    alt: { en: "convert-word-to-ppt" },
    h1: "تحويل وورد إلى بوربوينت بالذكاء الاصطناعي",
    title: "محول وورد إلى بوربوينت (ذكاء اصطناعي) — سريع ودقيق",
    description:
      "حوّل ملفات .docx إلى عروض بوربوينت أنيقة تلقائيًا مع الحفاظ على العناوين والقوائم.",
    heroPitch: "ارفع ملف وورد واحصل على شرائح نظيفة خلال ثوانٍ.",
    keywords: [
      "تحويل وورد إلى بوربوينت",
      "docx إلى ppt",
      "وورد إلى PPTX",
      "تحويل ملفات وورد لبوربوينت",
      "تحويل Word الى PowerPoint"
    ],
    defaults: {
      backendBaseUrl: "http://localhost:8000",
      language: "ar",
      slidesCount: 12,
      prompt: "",
    },
    hideControls: ["backend", "language", "slidesCount"],
    features: [
      { title: "يحافظ على البنية", desc: "العناوين تتحول إلى شرائح والقوائم إلى نقاط تلقائيًا." },
      { title: "دعم العربية", desc: "محاذاة RTL صحيحة وخطوط واضحة للعناوين والنصوص." },
      { title: "تصدير فوري", desc: "حمّل النتيجة كـ PPTX أو PDF بضغطة واحدة." },
      { title: "سرعة وثبات", desc: "معالجة سريعة مع سجل تقدم واضح." },
    ],
    howto: [
      { step: "ارفع ملف .docx", tip: "كل صفحة أو عنوان رئيسي يتحول لشريحة مستقلة." },
      { step: "اختر القالب", tip: "اختر قالبًا بسيطًا لتحسين قابلية القراءة." },
      { step: "اضغط توليد ثم حمّل PPTX", tip: "يمكنك تعديل الشريحة الأولى ثم إعادة التوليد." },
    ],
    faq: [
      { q: "هل يحافظ على التنسيق؟", a: "نعم، يتم تحويل العناوين والقوائم والجداول قدر الإمكان مع الحفاظ على الترتيب." },
      { q: "هل الأداة مجانية؟", a: "يوجد مستوى مجاني بعلامة مائية؛ يمكن إزالتها في الخطط المدفوعة." },
      { q: "هل تدعم ملفات كبيرة؟", a: "ندعم ملفات حتى 10MB في الخطة المجانية، وحدود أعلى في الخطط المدفوعة." },
      { q: "هل يمكنني العمل بدون رفع الملف؟", a: "نعم، اكتب الملخص أو الصق المحتوى وسيُنشئ النظام الشرائح." },
    ],
    suggestedPrompts: [
      "خطة درس: مهارات التفكير الناقد",
      "عرض تقديمي: التحول الرقمي في التعليم",
      "ملخص تقرير سنوي لشركة ناشئة",
    ],
    related: ["تحويل-pdf-الى-بوربوينت", "انشاء-شرائح-من-ملخص"],
  },

  // 2) Word → PPT (EN)
  {
    locale: "en",
    slug: "convert-word-to-ppt",
    alt: { ar: "تحويل-وورد-الى-بوربوينت" },
    h1: "Convert Word to PowerPoint (AI)",
    title: "Word to PowerPoint Converter (AI) — Fast & Accurate",
    description:
      "Turn .docx into clean PowerPoint decks automatically while preserving headings and lists.",
    heroPitch: "Upload a .docx and get a clear, editable deck in seconds.",
    keywords: [
      "word to powerpoint",
      "docx to ppt",
      "word to pptx converter",
      "convert word file to slides",
      "create slides from word"
    ],
    defaults: {
      backendBaseUrl: "http://localhost:8000",
      language: "en",
      slidesCount: 10,
      prompt: "Business plan outline",
    },
    hideControls: ["backend", "language", "slidesCount"],
    features: [
      { title: "Structure preserved", desc: "Headings → titles; lists → bullets; tables handled when possible." },
      { title: "Bilingual output", desc: "Works great for Arabic (RTL) and English (LTR)." },
      { title: "Export PPTX/PDF", desc: "Download editable PPTX or share as PDF." },
      { title: "Fast & reliable", desc: "Optimized pipeline with clear progress feedback." },
    ],
    howto: [
      { step: "Upload your .docx", tip: "Use clear Heading 1/2 styles to control slide breaks." },
      { step: "Pick a theme", tip: "Minimal themes read better and export smaller files." },
      { step: "Generate and download PPTX", tip: "Edit in PowerPoint or Google Slides if needed." },
    ],
    faq: [
      { q: "Is formatting preserved?", a: "Yes—heading hierarchy and lists are mapped; complex layouts may be simplified." },
      { q: "Is it free?", a: "Free tier includes a watermark; paid tiers remove it and raise limits." },
      { q: "What file types are supported?", a: ".docx recommended; .doc is converted best-effort." },
      { q: "Can I generate slides without uploading?", a: "Yes—paste a brief outline and generate." },
    ],
    suggestedPrompts: [
      "Pitch deck: SaaS analytics startup",
      "Lesson plan: Introduction to AI",
      "Quarterly review: Marketing performance",
    ],
    related: ["pdf-to-powerpoint", "generate-slides-from-outline"],
  },

  // 3) PDF → PPT (AR)
  {
    locale: "ar",
    slug: "pdf-to-powerpoint",
    alt: { en: "pdf-to-powerpoint" },
    h1: "تحويل PDF إلى بوربوينت بالذكاء الاصطناعي",
    title: "محول PDF إلى بوربوينت (ذكاء اصطناعي) — دقة عالية",
    description:
      "حوّل ملفات PDF إلى شرائح بوربوينت قابلة للتعديل مع الحفاظ على العناوين والترتيب.",
    heroPitch: "استورد ملف PDF ثم حوله إلى شرائح منظمة.",
    keywords: [
      "تحويل PDF إلى بوربوينت",
      "pdf إلى ppt",
      "تحويل ملفات pdf",
      "تحويل pdf لشرائح",
      "pdf to pptx عربي"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12 },
    hideControls: ["backend", "language", "slidesCount"],
    features: [
      { title: "استخراج ذكي", desc: "محاولة التعرف على العناوين والنصوص والجداول قدر الإمكان." },
      { title: "محافظة على العربية", desc: "التفاف RTL صحيح وعدم تشوه الحروف." },
      { title: "شرائح قابلة للتعديل", desc: "كل عنصر يصبح نصًا قابلاً للتحرير حيثما أمكن." },
      { title: "تصدير سريع", desc: "PPTX و PDF للتنزيل بعد التوليد مباشرة." },
    ],
    howto: [
      { step: "ارفع ملف PDF", tip: "يفضل الملفات النصية وليست صورًا ممسوحة." },
      { step: "اختر الإعدادات", tip: "قلل عدد الشرائح للملفات الطويلة لتحسين التركيز." },
      { step: "اضغط توليد الشرائح", tip: "عدّل الشريحة الأولى ثم أعد التوليد إذا لزم." },
    ],
    faq: [
      { q: "هل تُستخرج النصوص؟", a: "نعم عند توفر نص حقيقي في PDF؛ أما الصور فبحاجة إلى OCR وقد تُبسّط." },
      { q: "هل أستطيع تعديل الشرائح؟", a: "نعم، النتيجة PPTX قابلة للتعديل بالكامل." },
      { q: "هل يحتفظ بالصور والجداول؟", a: "نحاول الحفاظ عليها؛ قد تُبسّط الجداول المعقدة." },
    ],
    suggestedPrompts: [
      "تحويل عرض PDF تدريبي إلى شرائح قابلة للتعديل",
      "ملخص تقرير PDF إلى 10 شرائح",
    ],
    related: ["تحويل-وورد-الى-بوربوينت", "انشاء-شرائح-من-ملخص"],
  },

  // 4) PDF → PPT (EN)
  {
    locale: "en",
    slug: "pdf-to-powerpoint",
    alt: { ar: "تحويل-pdf-الى-بوربوينت" },
    h1: "PDF to PowerPoint (AI)",
    title: "PDF to PowerPoint Converter (AI) — High Fidelity",
    description:
      "Convert PDFs into editable PowerPoint slides while keeping structure and headings.",
    heroPitch: "Import a PDF and get an editable deck.",
    keywords: [
      "pdf to ppt",
      "convert pdf to powerpoint",
      "pdf to pptx online",
      "turn pdf into slides",
      "editable slides from pdf"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12 },
    hideControls: ["backend", "language", "slidesCount"],
    features: [
      { title: "Smart extraction", desc: "Detects headings and text; simplifies complex layouts when needed." },
      { title: "Editable output", desc: "Download PPTX with real text boxes and bullet lists." },
      { title: "Image/table handling", desc: "Images preserved; tables simplified where necessary." },
      { title: "Fast export", desc: "PPTX and PDF available right after generation." },
    ],
    howto: [
      { step: "Upload a PDF", tip: "Text-based PDFs convert best; scanned images may need OCR." },
      { step: "Choose options", tip: "Limit slide count for very long PDFs to stay concise." },
      { step: "Generate slides & download", tip: "Tweak the first slide title for better readability." },
    ],
    faq: [
      { q: "Does it keep images?", a: "Yes; images are preserved and placed on relevant slides." },
      { q: "Can I edit text?", a: "Yes—output is PPTX with editable text where available." },
      { q: "Any file size limits?", a: "Free tier ~10MB; paid tiers increase limits." },
    ],
    suggestedPrompts: [
      "Summarize a 20-page PDF into a 10-slide deck",
      "Turn compliance PDF into a training presentation",
    ],
    related: ["convert-word-to-ppt", "generate-slides-from-outline"],
  },

  // 5) Outline → Slides (AR)
  {
    locale: "ar",
    slug: "generate-slides-from-outline",
    alt: { en: "generate-slides-from-outline" },
    h1: "إنشاء شرائح من مُلخّص",
    title: "تحويل الملخصات إلى شرائح بوربوينت — بسرعة وذكاء",
    description:
      "الصق ملخص الموضوع ليتم توليد شرائح متسقة مع عناوين ونقاط تلقائيًا.",
    heroPitch: "حوّل الخطوط العريضة إلى عرض تقديمي متكامل في دقائق.",
    keywords: [
      "إنشاء شرائح من ملخص",
      "تحويل ملخص إلى عرض",
      "توليد شرائح تلقائيًا",
      "slides from outline arabic"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "" },
    hideControls: ["backend", "language", "slidesCount"],
    features: [
      { title: "توزيع منطقي", desc: "تحويل العناوين إلى أقسام مرتبة ونقاط موجزة." },
      { title: "تحرير سهل", desc: "يمكنك تعديل الشريحة الأولى وإعادة التوليد لتحسين النتائج." },
      { title: "صور اختيارية", desc: "اقتراح صور ملائمة تلقائيًا عند الحاجة." },
      { title: "تصدير متعدد", desc: "PPTX للتعديل و PDF للمشاركة السريعة." },
    ],
    howto: [
      { step: "الصق الملخص", tip: "اجعل كل عنوان في سطر مستقل لنتيجة أوضح." },
      { step: "اختر عدد الشرائح", tip: "ابدأ بـ 10–12 شريحة ثم زد عند الحاجة." },
      { step: "اضغط توليد الشرائح", tip: "يمكنك تغيير القالب قبل التنزيل." },
    ],
    faq: [
      { q: "هل أحتاج إلى ملف؟", a: "ليس ضروريًا؛ يكفي ملخص منسق." },
      { q: "هل يمكن إضافة صور ورموز؟", a: "نعم، يمكن اقتراحها تلقائيًا أو إدراجها يدويًا لاحقًا." },
    ],
    suggestedPrompts: [
      "ملخص دورة: مهارات العرض الفعال",
      "ملخص بحث: التعلم الإلكتروني في العالم العربي",
      "عرض تسويقي مختصر لمنتج رقمي",
    ],
    related: ["تحويل-وورد-الى-بوربوينت", "تحويل-pdf-الى-بوربوينت"],
  },
];
