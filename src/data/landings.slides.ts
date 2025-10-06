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
    related: ["convert-word-to-ppt", "pdf-to-powerpoint"],
  },

  // 6) Outline → Slides (EN)
  {
    locale: "en",
    slug: "generate-slides-from-outline",
    alt: { ar: "generate-slides-from-outline" },
    h1: "Generate Slides from Outline",
    title: "Outline to Presentation — Turn Ideas into Slides Fast",
    description:
      "Paste an outline and get a consistent deck with titles and bullets automatically.",
    heroPitch: "Turn your outline into a complete presentation in minutes.",
    keywords: [
      "outline to presentation",
      "generate slides from outline",
      "create presentation from outline",
      "outline to ppt"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Business strategy outline" },
    hideControls: ["backend", "language", "slidesCount"],
    features: [
      { title: "Logical structure", desc: "Headings become sections with clear bullet points." },
      { title: "Easy editing", desc: "Edit first slide and regenerate for better results." },
      { title: "Optional images", desc: "AI suggests relevant images automatically." },
      { title: "Multiple exports", desc: "PPTX for editing and PDF for quick sharing." },
    ],
    howto: [
      { step: "Paste your outline", tip: "Put each heading on its own line for best results." },
      { step: "Choose slide count", tip: "Start with 10-12 slides and adjust as needed." },
      { step: "Generate slides", tip: "You can change the theme before downloading." },
    ],
    faq: [
      { q: "Do I need a file?", a: "No, just a structured outline is enough." },
      { q: "Can I add images and icons?", a: "Yes, they can be suggested automatically or added manually later." },
      { q: "What format should the outline be?", a: "Plain text with headings works best." },
    ],
    suggestedPrompts: [
      "Course outline: Effective presentation skills",
      "Research brief: E-learning in education",
      "Marketing deck for digital product",
    ],
    related: ["convert-word-to-ppt", "pdf-to-powerpoint"],
  },

  // 7) AI Presentation Maker (EN)
  {
    locale: "en",
    slug: "ai-presentation-maker",
    alt: { ar: "ai-presentation-maker" },
    h1: "AI Presentation Maker – Create Slides from a Prompt",
    title: "AI Presentation Maker — Create Slides from a Prompt (PPTX & PDF)",
    description:
      "Turn any idea into a polished presentation. Paste a prompt, pick a theme, and export to PowerPoint or PDF. Fast, on-brand, Arabic & English supported.",
    heroPitch: "Go from a blank page to a finished deck in minutes.",
    keywords: [
      "ai presentation maker",
      "ai slide generator",
      "create presentation with ai",
      "automated presentation maker",
      "ai powerpoint generator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Create a presentation about..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "From idea to deck in minutes", desc: "No design skills required." },
      { title: "On-brand themes", desc: "Consistent layouts and clean typography." },
      { title: "Arabic & English support", desc: "Full RTL support for Arabic." },
      { title: "Export to PPTX/PDF", desc: "Or share a live link." },
    ],
    howto: [
      { step: "Paste your prompt", tip: "Include topic, audience, and tone." },
      { step: "AI drafts an outline", tip: "Review and approve the structure." },
      { step: "Generate slides", tip: "Complete with visuals and speaker notes." },
      { step: "Edit and export", tip: "Reorder, change themes, then download." },
    ],
    faq: [
      { q: "Can I lock the structure?", a: "Yes—approve the outline before generating." },
      { q: "Do you support Arabic?", a: "Yes—full RTL and Arabic fonts." },
      { q: "Can I export to PowerPoint?", a: "Yes—PPTX and PDF formats available." },
      { q: "Do you store my data?", a: "Your data is private; see our Security page." },
    ],
    suggestedPrompts: [
      "Pitch deck for a SaaS analytics startup",
      "Training presentation on AI fundamentals",
      "Marketing strategy for Q4 campaign",
    ],
    related: ["ai-presentation-generator", "convert-word-to-ppt"],
  },

  // 8) AI Presentation Maker (AR)
  {
    locale: "ar",
    slug: "ai-presentation-maker",
    alt: { en: "ai-presentation-maker" },
    h1: "صانع العروض التقديمية بالذكاء الاصطناعي",
    title: "صانع عروض تقديمية بالذكاء الاصطناعي — من الفكرة إلى الشرائح",
    description:
      "حوّل أي فكرة إلى عرض تقديمي احترافي. الصق فكرتك، اختر القالب، وصدّر إلى بوربوينت أو PDF. سريع ومتوافق مع العربية والإنجليزية.",
    heroPitch: "من صفحة فارغة إلى عرض كامل في دقائق.",
    keywords: [
      "صانع عروض تقديمية بالذكاء الاصطناعي",
      "إنشاء عرض تقديمي بالذكاء الاصطناعي",
      "مولد شرائح تلقائي",
      "بوربوينت بالذكاء الاصطناعي"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "إنشاء عرض تقديمي عن..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "من الفكرة إلى العرض في دقائق", desc: "لا حاجة لمهارات تصميم." },
      { title: "قوالب احترافية", desc: "تخطيطات متسقة وخطوط واضحة." },
      { title: "دعم العربية والإنجليزية", desc: "دعم كامل لتخطيط RTL للعربية." },
      { title: "تصدير PPTX/PDF", desc: "أو مشاركة رابط مباشر." },
    ],
    howto: [
      { step: "الصق فكرتك", tip: "اذكر الموضوع، الجمهور، والأسلوب." },
      { step: "الذكاء الاصطناعي يُعد المخطط", tip: "راجع واعتمد الهيكل." },
      { step: "توليد الشرائح", tip: "مع الصور وملاحظات المتحدث." },
      { step: "تعديل وتصدير", tip: "أعد الترتيب، غيّر القوالب، ثم حمّل." },
    ],
    faq: [
      { q: "هل يمكنني تثبيت الهيكل؟", a: "نعم—اعتمد المخطط قبل التوليد." },
      { q: "هل تدعمون العربية؟", a: "نعم—دعم كامل لـ RTL والخطوط العربية." },
      { q: "هل يمكن التصدير لبوربوينت؟", a: "نعم—متوفر بصيغة PPTX و PDF." },
      { q: "هل تحتفظون ببياناتي؟", a: "بياناتك خاصة؛ راجع صفحة الأمان." },
    ],
    suggestedPrompts: [
      "عرض تقديمي لمنصة SaaS تحليلية",
      "عرض تدريبي عن أساسيات الذكاء الاصطناعي",
      "استراتيجية تسويقية للربع الرابع",
    ],
    related: ["ai-presentation-generator", "convert-word-to-ppt"],
  },

  // 9) AI Presentation Generator (EN)
  {
    locale: "en",
    slug: "ai-presentation-generator",
    alt: { ar: "ai-presentation-generator" },
    h1: "AI Presentation Generator – Turn Ideas into Slides",
    title: "AI Presentation Generator — Turn Ideas into Slides Instantly",
    description:
      "Generate complete presentations from a single prompt. On-brand themes, visuals, and speaker notes. Export to PPTX & PDF.",
    heroPitch: "Strategy, outline, copy, visuals, and notes—auto-generated in one flow.",
    keywords: [
      "ai presentation generator",
      "automated slide generator",
      "ai powerpoint creator",
      "presentation generator online"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Generate presentation about..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Reliable structure", desc: "Tailored to your audience and goals." },
      { title: "Design-clean layouts", desc: "Smart text density and visual hierarchy." },
      { title: "Per-slide controls", desc: "Expand, shorten, or re-tone any slide." },
      { title: "One-click exports", desc: "For meetings and classrooms." },
    ],
    howto: [
      { step: "Enter topic & goal", tip: "Be specific about your audience." },
      { step: "Approve outline", tip: "Review the AI's suggested structure." },
      { step: "Generate slides", tip: "Complete with content and visuals." },
      { step: "Edit & export", tip: "Fine-tune and download PPTX or PDF." },
    ],
    faq: [
      { q: "Can I cite sources?", a: "Yes, optional for research/education slides." },
      { q: "Per-slide edits?", a: "Yes—rewrite/regenerate any slide individually." },
      { q: "Branding support?", a: "Upload colors, fonts, and logo." },
      { q: "What languages are supported?", a: "English and Arabic with RTL support." },
    ],
    suggestedPrompts: [
      "Sales pitch for enterprise software",
      "Educational presentation on climate change",
      "Product launch deck for mobile app",
    ],
    related: ["ai-presentation-maker", "pitch-deck-generator"],
  },

  // 10) AI Presentation Generator (AR)  
  {
    locale: "ar",
    slug: "ai-presentation-generator",
    alt: { en: "ai-presentation-generator" },
    h1: "مولد العروض التقديمية بالذكاء الاصطناعي",
    title: "مولد عروض تقديمية بالذكاء الاصطناعي — حوّل الأفكار إلى شرائح",
    description:
      "ولّد عروضًا تقديمية كاملة من فكرة واحدة. قوالب احترافية، صور، وملاحظات. تصدير PPTX و PDF.",
    heroPitch: "استراتيجية، مخطط، محتوى، صور، وملاحظات—كلها تُولّد تلقائيًا.",
    keywords: [
      "مولد عروض تقديمية بالذكاء الاصطناعي",
      "إنشاء شرائح تلقائيًا",
      "مولد بوربوينت بالذكاء الاصطناعي",
      "صانع عروض أون لاين"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "ولّد عرضًا تقديميًا عن..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "بنية موثوقة", desc: "مخصصة لجمهورك وأهدافك." },
      { title: "تخطيطات نظيفة", desc: "كثافة نصية ذكية وتسلسل بصري واضح." },
      { title: "تحكم بكل شريحة", desc: "وسّع، اختصر، أو غيّر الأسلوب." },
      { title: "تصدير بنقرة واحدة", desc: "للاجتماعات والفصول الدراسية." },
    ],
    howto: [
      { step: "أدخل الموضوع والهدف", tip: "كن محددًا حول جمهورك." },
      { step: "اعتمد المخطط", tip: "راجع الهيكل المقترح من الذكاء الاصطناعي." },
      { step: "ولّد الشرائح", tip: "مع المحتوى والصور." },
      { step: "عدّل وصدّر", tip: "حسّن النتيجة وحمّل PPTX أو PDF." },
    ],
    faq: [
      { q: "هل يمكن إضافة مراجع؟", a: "نعم، اختياري للشرائح البحثية/التعليمية." },
      { q: "تعديل الشرائح فرديًا؟", a: "نعم—أعد كتابة/توليد أي شريحة بشكل منفصل." },
      { q: "دعم العلامة التجارية؟", a: "ارفع الألوان، الخطوط، والشعار." },
      { q: "ما اللغات المدعومة؟", a: "العربية والإنجليزية مع دعم RTL." },
    ],
    suggestedPrompts: [
      "عرض مبيعات لبرنامج مؤسسات",
      "عرض تعليمي عن التغير المناخي",
      "عرض إطلاق منتج لتطبيق جوال",
    ],
    related: ["ai-presentation-maker", "pitch-deck-generator"],
  },

  // 11) Pitch Deck Generator (EN)
  {
    locale: "en",
    slug: "pitch-deck-generator",
    alt: { ar: "pitch-deck-generator" },
    h1: "AI Pitch Deck Generator for Startups",
    title: "AI Pitch Deck Generator — Create Investor Decks Fast",
    description:
      "Build a VC-ready pitch deck: problem, solution, market, traction, GTM, business model, and financials.",
    heroPitch: "From prompt or docs to a crisp, investor-ready deck.",
    keywords: [
      "pitch deck generator",
      "startup pitch deck",
      "investor deck maker",
      "vc pitch deck",
      "pitch deck ai"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Startup pitch deck for..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Proven pitch structure", desc: "Customizable sections for your business." },
      { title: "Auto charts", desc: "TAM/SAM/SOM visualizations (editable)." },
      { title: "Visual storytelling", desc: "Clean themes that impress investors." },
      { title: "Export or share", desc: "PPTX download or private link." },
    ],
    howto: [
      { step: "Enter startup details", tip: "Problem, solution, market, traction." },
      { step: "Choose outline", tip: "Pick from standard VC formats." },
      { step: "Generate slides", tip: "AI creates your investor deck." },
      { step: "Refine & export", tip: "Edit charts and download." },
    ],
    faq: [
      { q: "Is my data secure?", a: "Yes, all data is encrypted and private." },
      { q: "Can I edit charts?", a: "Yes, all charts are editable after export." },
      { q: "Bilingual support?", a: "Yes, English and Arabic available." },
      { q: "Template variations?", a: "Multiple pitch deck templates to choose from." },
    ],
    suggestedPrompts: [
      "SaaS analytics platform for enterprises",
      "AI-powered healthcare diagnostics startup",
      "Sustainable fashion e-commerce platform",
    ],
    related: ["ai-presentation-generator", "sales-proposal-presentation"],
  },

  // 12) Pitch Deck Generator (AR)
  {
    locale: "ar",
    slug: "pitch-deck-generator",
    alt: { en: "pitch-deck-generator" },
    h1: "مولد عروض الاستثمار للشركات الناشئة",
    title: "مولد عروض الاستثمار بالذكاء الاصطناعي — للشركات الناشئة",
    description:
      "أنشئ عرض استثمار جاهز: المشكلة، الحل، السوق، الإنجازات، النموذج المالي.",
    heroPitch: "من الفكرة أو المستند إلى عرض استثماري واضح.",
    keywords: [
      "مولد عرض استثماري",
      "عرض استثماري للشركات الناشئة",
      "pitch deck عربي",
      "عرض للمستثمرين"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "عرض استثماري لشركة..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "بنية مجربة", desc: "أقسام قابلة للتخصيص حسب نشاطك." },
      { title: "رسوم بيانية تلقائية", desc: "تصورات TAM/SAM/SOM قابلة للتعديل." },
      { title: "سرد بصري", desc: "قوالب أنيقة تبهر المستثمرين." },
      { title: "تصدير أو مشاركة", desc: "تحميل PPTX أو رابط خاص." },
    ],
    howto: [
      { step: "أدخل بيانات الشركة", tip: "المشكلة، الحل، السوق، الإنجازات." },
      { step: "اختر المخطط", tip: "اختر من صيغ رأس المال الاستثماري القياسية." },
      { step: "ولّد الشرائح", tip: "الذكاء الاصطناعي ينشئ عرضك." },
      { step: "حسّن وصدّر", tip: "عدّل الرسوم البيانية وحمّل." },
    ],
    faq: [
      { q: "هل بياناتي آمنة؟", a: "نعم، جميع البيانات مشفرة وخاصة." },
      { q: "هل يمكن تعديل الرسوم؟", a: "نعم، جميع الرسوم قابلة للتعديل بعد التصدير." },
      { q: "دعم ثنائي اللغة؟", a: "نعم، متوفر بالعربية والإنجليزية." },
      { q: "قوالب متنوعة؟", a: "قوالب متعددة للعروض الاستثمارية." },
    ],
    suggestedPrompts: [
      "منصة SaaS للتحليلات المؤسسية",
      "شركة ناشئة للتشخيص الطبي بالذكاء الاصطناعي",
      "منصة تجارة إلكترونية للأزياء المستدامة",
    ],
    related: ["ai-presentation-generator", "sales-proposal-presentation"],
  },

  // 13) Research Paper to Presentation (EN)
  {
    locale: "en",
    slug: "research-paper-to-presentation",
    alt: { ar: "research-paper-to-presentation" },
    h1: "Research Paper to Presentation",
    title: "Research Paper to Presentation — Summarize Papers into Slides (AI)",
    description:
      "Turn academic papers into presentations with structured sections, figures, and citations.",
    heroPitch: "Abstract → methods → results → discussion, automatically organized into slides.",
    keywords: [
      "research paper to presentation",
      "paper to ppt",
      "academic presentation maker",
      "thesis to slides"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 15, prompt: "Research paper presentation" },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Key findings distilled", desc: "With optional graphs and visualizations." },
      { title: "Figure extraction", desc: "Captions preserved from the paper." },
      { title: "Citations included", desc: "BibTeX/URL citations on final slides." },
      { title: "Bilingual support", desc: "Arabic/English for academic use." },
    ],
    howto: [
      { step: "Upload PDF or paste link", tip: "Works best with text-based PDFs." },
      { step: "Select style", tip: "Academic, Conference, or Defense format." },
      { step: "Generate slides", tip: "AI extracts key sections automatically." },
      { step: "Review citations & export", tip: "Check references before presenting." },
    ],
    faq: [
      { q: "What citation style?", a: "Supports APA, MLA, IEEE, and custom." },
      { q: "Can I use figures?", a: "Yes, figures are extracted with captions." },
      { q: "Any length limits?", a: "Supports papers up to 50 pages." },
      { q: "Speaker notes included?", a: "Yes, with methodology and key points." },
    ],
    suggestedPrompts: [
      "Convert research paper on machine learning",
      "Thesis defense presentation",
      "Conference paper summary slides",
    ],
    related: ["pdf-to-powerpoint", "ai-presentation-generator"],
  },

  // 14) Research Paper to Presentation (AR)
  {
    locale: "ar",
    slug: "research-paper-to-presentation",
    alt: { en: "research-paper-to-presentation" },
    h1: "تحويل الورقة البحثية إلى عرض تقديمي",
    title: "ورقة بحثية إلى عرض تقديمي — تلخيص الأبحاث بالذكاء الاصطناعي",
    description:
      "حوّل الأوراق الأكاديمية إلى عروض تقديمية مع أقسام منظمة، أشكال، ومراجع.",
    heroPitch: "ملخص ← منهجية ← نتائج ← مناقشة، منظمة تلقائيًا في شرائح.",
    keywords: [
      "ورقة بحثية إلى عرض تقديمي",
      "بحث إلى ppt",
      "عرض أكاديمي",
      "رسالة إلى شرائح"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 15, prompt: "عرض تقديمي لورقة بحثية" },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "استخلاص النتائج الرئيسية", desc: "مع رسوم بيانية اختيارية." },
      { title: "استخراج الأشكال", desc: "مع الحفاظ على التسميات التوضيحية." },
      { title: "المراجع مضمنة", desc: "مراجع BibTeX/URL في الشرائح النهائية." },
      { title: "دعم ثنائي اللغة", desc: "العربية/الإنجليزية للاستخدام الأكاديمي." },
    ],
    howto: [
      { step: "ارفع PDF أو الصق رابط", tip: "يعمل بشكل أفضل مع PDFs نصية." },
      { step: "اختر الأسلوب", tip: "أكاديمي، مؤتمر، أو دفاع عن الرسالة." },
      { step: "ولّد الشرائح", tip: "الذكاء الاصطناعي يستخرج الأقسام الرئيسية." },
      { step: "راجع المراجع وصدّر", tip: "تحقق من المراجع قبل العرض." },
    ],
    faq: [
      { q: "ما أسلوب الاقتباس؟", a: "يدعم APA، MLA، IEEE، ومخصص." },
      { q: "هل يمكن استخدام الأشكال؟", a: "نعم، تُستخرج الأشكال مع التسميات." },
      { q: "أي حدود للطول؟", a: "يدعم أوراق حتى 50 صفحة." },
      { q: "هل تتضمن ملاحظات المتحدث؟", a: "نعم، مع المنهجية والنقاط الرئيسية." },
    ],
    suggestedPrompts: [
      "تحويل ورقة بحثية عن التعلم الآلي",
      "عرض دفاع عن الرسالة",
      "شرائح ملخص ورقة مؤتمر",
    ],
    related: ["pdf-to-powerpoint", "ai-presentation-generator"],
  },

  // 15) Sales Proposal Presentation (EN)
  {
    locale: "en",
    slug: "sales-proposal-presentation",
    alt: { ar: "sales-proposal-presentation" },
    h1: "Sales Proposal Presentation Generator",
    title: "Sales Proposal Presentation — Close Deals with AI Slides",
    description:
      "Create persuasive proposal decks with scope, pricing, and timeline—auto-formatted to win.",
    heroPitch: "From scope to pricing—clear slides that move deals forward.",
    keywords: [
      "sales proposal presentation",
      "proposal deck generator",
      "business proposal slides",
      "sales deck maker"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Sales proposal for..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Industry templates", desc: "Proposal boilerplates by vertical." },
      { title: "Pricing & timelines", desc: "Tables auto-formatted professionally." },
      { title: "Objection handling", desc: "Slide templates for common concerns." },
      { title: "Case studies", desc: "Team and success story slides." },
    ],
    howto: [
      { step: "Paste brief or scope", tip: "Include key deliverables and pricing." },
      { step: "Generate proposal", tip: "AI structures your deck professionally." },
      { step: "Customize details", tip: "Edit pricing, timelines, and terms." },
      { step: "Export & present", tip: "Download PPTX or share secure link." },
    ],
    faq: [
      { q: "Currency formats?", a: "Supports USD, EUR, GBP, SAR, AED, and custom." },
      { q: "Approval workflows?", a: "Export for internal review before client send." },
      { q: "Can I redline?", a: "Yes, track changes in exported PPTX." },
      { q: "Team collaboration?", a: "Shared workspace available in Team plan." },
    ],
    suggestedPrompts: [
      "Sales proposal for enterprise software",
      "Consulting services proposal deck",
      "Marketing agency proposal presentation",
    ],
    related: ["pitch-deck-generator", "ai-presentation-generator"],
  },

  // 16) Sales Proposal Presentation (AR)
  {
    locale: "ar",
    slug: "sales-proposal-presentation",
    alt: { en: "sales-proposal-presentation" },
    h1: "مولد عروض المبيعات التقديمية",
    title: "عرض مقترح المبيعات — أغلق الصفقات بشرائح احترافية",
    description:
      "أنشئ عروض مقترحات مقنعة مع النطاق، التسعير، والجدول الزمني—منسقة تلقائيًا.",
    heroPitch: "من النطاق إلى التسعير—شرائح واضحة تدفع الصفقات للأمام.",
    keywords: [
      "عرض مقترح مبيعات",
      "مولد عرض مقترح",
      "شرائح مقترح أعمال",
      "صانع عرض مبيعات"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "عرض مبيعات لـ..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "قوالب حسب الصناعة", desc: "نماذج مقترحات جاهزة." },
      { title: "تسعير وجداول زمنية", desc: "جداول منسقة احترافيًا." },
      { title: "معالجة الاعتراضات", desc: "قوالب شرائح للمخاوف الشائعة." },
      { title: "دراسات حالة", desc: "شرائح الفريق وقصص النجاح." },
    ],
    howto: [
      { step: "الصق الملخص أو النطاق", tip: "ضمّن المخرجات الرئيسية والتسعير." },
      { step: "ولّد المقترح", tip: "الذكاء الاصطناعي يبني عرضك احترافيًا." },
      { step: "خصص التفاصيل", tip: "عدّل التسعير، الجداول، والشروط." },
      { step: "صدّر وقدّم", tip: "حمّل PPTX أو شارك رابط آمن." },
    ],
    faq: [
      { q: "صيغ العملات؟", a: "يدعم USD، EUR، GBP، SAR، AED، ومخصص." },
      { q: "سير اعتماد؟", a: "صدّر للمراجعة الداخلية قبل إرسال العميل." },
      { q: "هل يمكن تتبع التغييرات؟", a: "نعم، تتبع التغييرات في PPTX المُصدَّر." },
      { q: "تعاون الفريق؟", a: "مساحة عمل مشتركة متوفرة في خطة الفريق." },
    ],
    suggestedPrompts: [
      "عرض مبيعات لبرنامج مؤسسات",
      "عرض خدمات استشارية",
      "عرض وكالة تسويق",
    ],
    related: ["pitch-deck-generator", "ai-presentation-generator"],
  },

  // 17) Lesson Plan Presentation (EN)
  {
    locale: "en",
    slug: "lesson-plan-presentation",
    alt: { ar: "lesson-plan-presentation" },
    h1: "Lesson Plan Presentation Generator",
    title: "Lesson Plan Presentation — AI Slides for Teachers",
    description:
      "Create engaging lesson slides from prompts or documents. Arabic & English, RTL aware.",
    heroPitch: "Objectives, activities, checks for understanding—auto-structured for class time.",
    keywords: [
      "lesson plan presentation",
      "teacher presentation maker",
      "classroom slides generator",
      "educational presentation ai"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Lesson plan for..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Standards mapping", desc: "Align with curriculum objectives." },
      { title: "Activity timings", desc: "Per-slide time allocations." },
      { title: "Printable handouts", desc: "PDF export for students." },
      { title: "Bilingual & RTL", desc: "Full Arabic support." },
    ],
    howto: [
      { step: "Enter topic & grade level", tip: "Specify learning objectives." },
      { step: "AI structures lesson", tip: "Introduction, activities, assessment." },
      { step: "Review & customize", tip: "Add specific examples or resources." },
      { step: "Export & present", tip: "Use in class or share with students." },
    ],
    faq: [
      { q: "Age-appropriate?", a: "Yes, content adapted to grade level." },
      { q: "Image filters?", a: "Safe, educational imagery only." },
      { q: "Offline export?", a: "Yes, download PPTX for offline use." },
      { q: "Multiple subjects?", a: "Works for all K-12 and higher ed subjects." },
    ],
    suggestedPrompts: [
      "Lesson plan: Introduction to photosynthesis (Grade 7)",
      "Math lesson: Solving linear equations",
      "History lesson: World War II overview",
    ],
    related: ["ai-presentation-generator", "training-workshop-slides"],
  },

  // 18) Lesson Plan Presentation (AR)
  {
    locale: "ar",
    slug: "lesson-plan-presentation",
    alt: { en: "lesson-plan-presentation" },
    h1: "مولد عروض خطط الدروس",
    title: "عرض خطة الدرس — شرائح بالذكاء الاصطناعي للمعلمين",
    description:
      "أنشئ شرائح دروس جذابة من الأفكار أو المستندات. عربي وإنجليزي مع دعم RTL.",
    heroPitch: "أهداف، أنشطة، تقييمات—منظمة تلقائيًا لوقت الحصة.",
    keywords: [
      "عرض خطة درس",
      "صانع عروض للمعلمين",
      "مولد شرائح الفصل",
      "عرض تعليمي بالذكاء الاصطناعي"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "خطة درس لـ..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "ربط المعايير", desc: "محاذاة مع أهداف المنهج." },
      { title: "توقيت الأنشطة", desc: "تخصيص وقت لكل شريحة." },
      { title: "نشرات قابلة للطباعة", desc: "تصدير PDF للطلاب." },
      { title: "ثنائي اللغة و RTL", desc: "دعم كامل للعربية." },
    ],
    howto: [
      { step: "أدخل الموضوع والمستوى", tip: "حدد أهداف التعلم." },
      { step: "الذكاء الاصطناعي يبني الدرس", tip: "مقدمة، أنشطة، تقييم." },
      { step: "راجع وخصص", tip: "أضف أمثلة أو موارد محددة." },
      { step: "صدّر وقدّم", tip: "استخدم في الفصل أو شارك مع الطلاب." },
    ],
    faq: [
      { q: "هل المحتوى مناسب للعمر؟", a: "نعم، يُكيَّف حسب المستوى الدراسي." },
      { q: "تصفية الصور؟", a: "صور تعليمية آمنة فقط." },
      { q: "تصدير غير متصل؟", a: "نعم، حمّل PPTX للاستخدام دون إنترنت." },
      { q: "مواد متعددة؟", a: "يعمل لجميع مواد K-12 والتعليم العالي." },
    ],
    suggestedPrompts: [
      "خطة درس: مقدمة في التمثيل الضوئي (الصف السابع)",
      "درس رياضيات: حل المعادلات الخطية",
      "درس تاريخ: نظرة عامة على الحرب العالمية الثانية",
    ],
    related: ["ai-presentation-generator", "training-workshop-slides"],
  },

  // 19) Training Workshop Slides (EN)
  {
    locale: "en",
    slug: "training-workshop-slides",
    alt: { ar: "training-workshop-slides" },
    h1: "Training & Workshop Slides",
    title: "Training & Workshop Slides — Create from PDFs & Docs",
    description:
      "Turn manuals and SOPs into facilitator-ready slides with activities and timings.",
    heroPitch: "Convert dense material into interactive, time-boxed sessions.",
    keywords: [
      "training presentation maker",
      "workshop slides generator",
      "facilitator slides",
      "training deck ai"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 15, prompt: "Training workshop on..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Activity modules", desc: "Interactive exercises and discussions." },
      { title: "Timing guides", desc: "Per-module time allocations." },
      { title: "Facilitator notes", desc: "Talking points and tips." },
      { title: "Printable materials", desc: "Participant handouts in PDF." },
    ],
    howto: [
      { step: "Upload manual or SOP", tip: "Or paste training outline." },
      { step: "Select format", tip: "Half-day, full-day, or multi-day workshop." },
      { step: "Generate modules", tip: "AI breaks content into sessions." },
      { step: "Customize & export", tip: "Add exercises and download." },
    ],
    faq: [
      { q: "How are activities chosen?", a: "Based on learning objectives and content type." },
      { q: "Can I add custom exercises?", a: "Yes, edit any slide to add activities." },
      { q: "Timing adjustable?", a: "Yes, all timings can be customized." },
      { q: "Group sizes?", a: "Works for 5-100 participants." },
    ],
    suggestedPrompts: [
      "Workshop: Leadership skills development",
      "Training: Software onboarding for teams",
      "Session: Compliance and safety procedures",
    ],
    related: ["lesson-plan-presentation", "ai-presentation-generator"],
  },

  // 20) Training Workshop Slides (AR)
  {
    locale: "ar",
    slug: "training-workshop-slides",
    alt: { en: "training-workshop-slides" },
    h1: "شرائح التدريب وورش العمل",
    title: "شرائح تدريب وورش عمل — من PDFs والمستندات",
    description:
      "حوّل الأدلة والإجراءات إلى شرائح جاهزة للمدرب مع أنشطة وأوقات.",
    heroPitch: "حوّل المواد الكثيفة إلى جلسات تفاعلية محددة بوقت.",
    keywords: [
      "مولد عروض تدريبية",
      "مولد شرائح ورش عمل",
      "شرائح المدرب",
      "عرض تدريب بالذكاء الاصطناعي"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 15, prompt: "ورشة تدريبية عن..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "وحدات الأنشطة", desc: "تمارين تفاعلية ومناقشات." },
      { title: "أدلة التوقيت", desc: "تخصيص وقت لكل وحدة." },
      { title: "ملاحظات الميسر", desc: "نقاط النقاش والنصائح." },
      { title: "مواد قابلة للطباعة", desc: "نشرات المشاركين بصيغة PDF." },
    ],
    howto: [
      { step: "ارفع الدليل أو SOP", tip: "أو الصق مخطط التدريب." },
      { step: "اختر الصيغة", tip: "نصف يوم، يوم كامل، أو عدة أيام." },
      { step: "ولّد الوحدات", tip: "الذكاء الاصطناعي يقسم المحتوى لجلسات." },
      { step: "خصص وصدّر", tip: "أضف التمارين وحمّل." },
    ],
    faq: [
      { q: "كيف تُختار الأنشطة؟", a: "بناءً على أهداف التعلم ونوع المحتوى." },
      { q: "هل يمكن إضافة تمارين مخصصة؟", a: "نعم، عدّل أي شريحة لإضافة أنشطة." },
      { q: "هل التوقيت قابل للتعديل؟", a: "نعم، جميع الأوقات قابلة للتخصيص." },
      { q: "أحجام المجموعات؟", a: "يعمل من 5-100 مشارك." },
    ],
    suggestedPrompts: [
      "ورشة: تطوير مهارات القيادة",
      "تدريب: تأهيل البرامج للفرق",
      "جلسة: إجراءات الامتثال والسلامة",
    ],
    related: ["lesson-plan-presentation", "ai-presentation-generator"],
  },

  // 21) Business Report to PPT (EN)
  {
    locale: "en",
    slug: "business-report-to-ppt",
    alt: { ar: "business-report-to-ppt" },
    h1: "Business Report to PPT",
    title: "Business Report to PPT — AI Converts Reports to Slides",
    description:
      "Turn written reports into executive-ready slide decks with key insights highlighted.",
    heroPitch: "From dense reports to scannable slides—perfect for board meetings.",
    keywords: [
      "report to ppt",
      "business report presentation",
      "report to slides converter",
      "executive deck from report"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Business report summary..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Executive summary", desc: "Key takeaways on opening slides." },
      { title: "Charts & data viz", desc: "Auto-extract tables and figures." },
      { title: "Risk & recommendations", desc: "Structured decision slides." },
      { title: "Appendix automation", desc: "Detailed tables moved to backup slides." },
    ],
    howto: [
      { step: "Upload report PDF/DOCX", tip: "Or paste text content." },
      { step: "Select style", tip: "Executive, detailed, or data-focused." },
      { step: "Generate deck", tip: "AI highlights key insights." },
      { step: "Review & share", tip: "Export to PPTX or share link." },
    ],
    faq: [
      { q: "Confidential data?", a: "All processing is secure and deleteable." },
      { q: "How many pages?", a: "Supports reports up to 100 pages." },
      { q: "Custom branding?", a: "Yes, upload your template." },
      { q: "Financial tables?", a: "Yes, preserved with formatting." },
    ],
    suggestedPrompts: [
      "Convert quarterly business report to slides",
      "Executive summary from annual report",
      "Market research report presentation",
    ],
    related: ["pdf-to-powerpoint", "ai-presentation-generator"],
  },

  // 22) Business Report to PPT (AR)
  {
    locale: "ar",
    slug: "business-report-to-ppt",
    alt: { en: "business-report-to-ppt" },
    h1: "تحويل تقرير الأعمال إلى PPT",
    title: "تقرير أعمال إلى PPT — الذكاء الاصطناعي يحول التقارير لشرائح",
    description:
      "حوّل التقارير المكتوبة إلى عروض جاهزة للتنفيذيين مع تسليط الضوء على الرؤى الرئيسية.",
    heroPitch: "من التقارير الكثيفة إلى شرائح سهلة المسح—مثالي لاجتماعات مجلس الإدارة.",
    keywords: [
      "تقرير إلى ppt",
      "عرض تقرير أعمال",
      "محول تقرير لشرائح",
      "عرض تنفيذي من تقرير"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "ملخص تقرير أعمال..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "ملخص تنفيذي", desc: "النقاط الرئيسية في الشرائح الافتتاحية." },
      { title: "رسوم بيانية ومرئيات", desc: "استخراج تلقائي للجداول والأشكال." },
      { title: "مخاطر وتوصيات", desc: "شرائح قرارات منظمة." },
      { title: "أتمتة الملحق", desc: "الجداول التفصيلية تُنقل لشرائح احتياطية." },
    ],
    howto: [
      { step: "ارفع تقرير PDF/DOCX", tip: "أو الصق محتوى نصي." },
      { step: "اختر الأسلوب", tip: "تنفيذي، تفصيلي، أو يركز على البيانات." },
      { step: "ولّد العرض", tip: "الذكاء الاصطناعي يبرز الرؤى الرئيسية." },
      { step: "راجع وشارك", tip: "صدّر إلى PPTX أو شارك رابط." },
    ],
    faq: [
      { q: "بيانات سرية؟", a: "جميع المعالجات آمنة وقابلة للحذف." },
      { q: "كم عدد الصفحات؟", a: "يدعم تقارير حتى 100 صفحة." },
      { q: "علامة تجارية مخصصة؟", a: "نعم، ارفع قالبك." },
      { q: "جداول مالية؟", a: "نعم، محفوظة مع التنسيق." },
    ],
    suggestedPrompts: [
      "تحويل تقرير الأعمال ربع السنوي لشرائح",
      "ملخص تنفيذي من تقرير سنوي",
      "عرض تقرير أبحاث السوق",
    ],
    related: ["pdf-to-powerpoint", "ai-presentation-generator"],
  },

  // 23) PowerPoint Alternative (EN)
  {
    locale: "en",
    slug: "powerpoint-alternative",
    alt: { ar: "powerpoint-alternative" },
    h1: "PowerPoint Alternative — AI Presentation Maker",
    title: "PowerPoint Alternative — Free AI Slide Generator (PPTX Export)",
    description:
      "Create presentations without PowerPoint. AI-powered, exports to PPTX, works in browser.",
    heroPitch: "No Office subscription needed—generate, edit, and export slides online.",
    keywords: [
      "powerpoint alternative",
      "free presentation software",
      "ai slide maker",
      "online presentation creator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Create presentation about..." },
    hideControls: ["backend"],
    features: [
      { title: "AI planning assistant", desc: "Outline and structure your deck." },
      { title: "PPTX export", desc: "Fully compatible with PowerPoint." },
      { title: "Cloud collaboration", desc: "Share and edit with your team." },
      { title: "No software install", desc: "Works 100% in browser." },
    ],
    howto: [
      { step: "Describe your topic", tip: "AI generates outline and slides." },
      { step: "Edit in browser", tip: "No PowerPoint license required." },
      { step: "Export to PPTX", tip: "Open in PowerPoint, Google Slides, or Keynote." },
    ],
    faq: [
      { q: "Is it really free?", a: "Yes, free tier includes 5 presentations/month." },
      { q: "Can I use offline?", a: "Export to PPTX and use offline in PowerPoint." },
      { q: "What about fonts?", a: "Standard fonts embedded for compatibility." },
      { q: "Team accounts?", a: "Yes, Team plan includes shared workspace." },
    ],
    suggestedPrompts: [
      "Business presentation for quarterly review",
      "Marketing pitch deck",
      "Educational slides for workshop",
    ],
    related: ["ai-presentation-generator", "convert-word-to-ppt"],
  },

  // 24) PowerPoint Alternative (AR)
  {
    locale: "ar",
    slug: "powerpoint-alternative",
    alt: { en: "powerpoint-alternative" },
    h1: "بديل باوربوينت — صانع عروض بالذكاء الاصطناعي",
    title: "بديل باوربوينت — مولد شرائح مجاني بالذكاء الاصطناعي (تصدير PPTX)",
    description:
      "أنشئ عروض تقديمية بدون باوربوينت. بالذكاء الاصطناعي، يصدّر إلى PPTX، يعمل في المتصفح.",
    heroPitch: "لا حاجة لاشتراك Office—ولّد، عدّل، وصدّر الشرائح أونلاين.",
    keywords: [
      "بديل باوربوينت",
      "برنامج عروض مجاني",
      "صانع شرائح بالذكاء الاصطناعي",
      "منشئ عروض أونلاين"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "أنشئ عرضًا عن..." },
    hideControls: ["backend"],
    features: [
      { title: "مساعد تخطيط بالذكاء الاصطناعي", desc: "حدد مخطط وبنية عرضك." },
      { title: "تصدير PPTX", desc: "متوافق تمامًا مع باوربوينت." },
      { title: "تعاون سحابي", desc: "شارك وعدّل مع فريقك." },
      { title: "بدون تثبيت برامج", desc: "يعمل 100% في المتصفح." },
    ],
    howto: [
      { step: "اوصف موضوعك", tip: "الذكاء الاصطناعي يولد المخطط والشرائح." },
      { step: "عدّل في المتصفح", tip: "لا حاجة لترخيص باوربوينت." },
      { step: "صدّر إلى PPTX", tip: "افتح في PowerPoint، Google Slides، أو Keynote." },
    ],
    faq: [
      { q: "هل هو مجاني حقًا؟", a: "نعم، الطبقة المجانية تشمل 5 عروض شهريًا." },
      { q: "هل يمكن استخدامه دون إنترنت؟", a: "صدّر إلى PPTX واستخدم دون اتصال في باوربوينت." },
      { q: "ماذا عن الخطوط؟", a: "الخطوط القياسية مضمّنة للتوافق." },
      { q: "حسابات الفريق؟", a: "نعم، خطة الفريق تشمل مساحة عمل مشتركة." },
    ],
    suggestedPrompts: [
      "عرض أعمال للمراجعة ربع السنوية",
      "عرض تسويقي للعميل",
      "شرائح تعليمية لورشة عمل",
    ],
    related: ["ai-presentation-generator", "convert-word-to-ppt"],
  },

  // 25) Slide Translator (EN)
  {
    locale: "en",
    slug: "slide-translator",
    alt: { ar: "slide-translator" },
    h1: "Slide Translator — Translate PowerPoint to Arabic",
    title: "Slide Translator — Translate PowerPoint (Arabic, English, Spanish)",
    description:
      "Auto-translate presentations with layout preservation. Arabic RTL support, glossary lock.",
    heroPitch: "Upload once, translate to multiple languages—layout stays intact.",
    keywords: [
      "translate powerpoint",
      "arabic powerpoint translation",
      "slide translator",
      "multilingual presentation"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Translate this deck to..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Layout-safe translation", desc: "Text boxes stay in place." },
      { title: "Glossary lock", desc: "Keep brand terms untranslated." },
      { title: "RTL support", desc: "Arabic text flows right-to-left." },
      { title: "Batch translate", desc: "Multiple decks at once." },
    ],
    howto: [
      { step: "Upload PPTX", tip: "Or connect Google Slides." },
      { step: "Select target languages", tip: "Choose Arabic, Spanish, etc." },
      { step: "Review & lock terms", tip: "Mark brand names to preserve." },
      { step: "Export translated decks", tip: "One PPTX per language." },
    ],
    faq: [
      { q: "Quality of translation?", a: "Professional-grade AI + human review option." },
      { q: "Does it break layout?", a: "No, text boxes resize smartly." },
      { q: "Font changes?", a: "Yes, Arabic fonts applied automatically." },
      { q: "How many languages?", a: "Supports 50+ languages including Arabic, Spanish, French." },
    ],
    suggestedPrompts: [
      "Translate marketing deck to Arabic",
      "Convert training slides to Spanish",
      "Multilingual product presentation",
    ],
    related: ["bilingual-arabic-english-presentation", "ai-presentation-generator"],
  },

  // 26) Slide Translator (AR)
  {
    locale: "ar",
    slug: "slide-translator",
    alt: { en: "slide-translator" },
    h1: "مترجم الشرائح — ترجمة باوربوينت للعربية",
    title: "مترجم الشرائح — ترجم باوربوينت (عربي، إنجليزي، إسباني)",
    description:
      "ترجمة تلقائية للعروض مع الحفاظ على التخطيط. دعم RTL العربي، قفل المصطلحات.",
    heroPitch: "ارفع مرة واحدة، ترجم لعدة لغات—التخطيط يبقى سليمًا.",
    keywords: [
      "ترجمة باوربوينت",
      "ترجمة باوربوينت للعربية",
      "مترجم شرائح",
      "عرض متعدد اللغات"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "ترجم هذا العرض إلى..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "ترجمة آمنة للتخطيط", desc: "صناديق النص تبقى في مكانها." },
      { title: "قفل المصطلحات", desc: "احتفظ بمصطلحات العلامة التجارية دون ترجمة." },
      { title: "دعم RTL", desc: "النص العربي يتدفق من اليمين لليسار." },
      { title: "ترجمة مجمعة", desc: "عدة عروض مرة واحدة." },
    ],
    howto: [
      { step: "ارفع PPTX", tip: "أو اتصل بـ Google Slides." },
      { step: "اختر اللغات المستهدفة", tip: "اختر العربية، الإسبانية، إلخ." },
      { step: "راجع واقفل المصطلحات", tip: "علّم أسماء العلامات للحفاظ عليها." },
      { step: "صدّر العروض المترجمة", tip: "PPTX واحد لكل لغة." },
    ],
    faq: [
      { q: "جودة الترجمة؟", a: "ذكاء اصطناعي احترافي + خيار مراجعة بشرية." },
      { q: "هل يكسر التخطيط؟", a: "لا، صناديق النص تتغير الحجم بذكاء." },
      { q: "تغيير الخطوط؟", a: "نعم، خطوط عربية تُطبق تلقائيًا." },
      { q: "كم لغة؟", a: "يدعم أكثر من 50 لغة بما فيها العربية، الإسبانية، الفرنسية." },
    ],
    suggestedPrompts: [
      "ترجم عرض تسويقي للعربية",
      "حوّل شرائح تدريب للإسبانية",
      "عرض منتج متعدد اللغات",
    ],
    related: ["bilingual-arabic-english-presentation", "ai-presentation-generator"],
  },

  // 27) Bilingual Arabic-English Presentation (EN)
  {
    locale: "en",
    slug: "bilingual-arabic-english-presentation",
    alt: { ar: "bilingual-arabic-english-presentation" },
    h1: "Bilingual Arabic-English Presentation Generator",
    title: "Bilingual Arabic-English Presentations — RTL & LTR Slides",
    description:
      "Create presentations with side-by-side Arabic and English. Perfect for MENA markets.",
    heroPitch: "One deck, two languages—RTL Arabic and LTR English on matching slides.",
    keywords: [
      "arabic presentation maker",
      "bilingual presentation",
      "arabic english slides",
      "rtl presentation generator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Bilingual presentation about..." },
    hideControls: ["backend"],
    features: [
      { title: "RTL + LTR support", desc: "Arabic flows right-to-left automatically." },
      { title: "Matching templates", desc: "Mirrored layouts for both languages." },
      { title: "Font fallback", desc: "Arabic + Latin fonts co-exist." },
      { title: "Glossary sync", desc: "Technical terms consistent across languages." },
    ],
    howto: [
      { step: "Enter content in one language", tip: "AI translates to the other." },
      { step: "Review both versions", tip: "Edit for cultural nuance." },
      { step: "Generate side-by-side slides", tip: "Or separate decks." },
      { step: "Export & present", tip: "PPTX with embedded fonts." },
    ],
    faq: [
      { q: "Which Arabic dialect?", a: "Modern Standard Arabic (MSA) by default." },
      { q: "Can I use Gulf dialect?", a: "Yes, specify dialect in prompt." },
      { q: "Font licensing?", a: "Uses open-source Arabic fonts." },
      { q: "Presentation direction?", a: "Choose Arabic-first or English-first order." },
    ],
    suggestedPrompts: [
      "Bilingual investor pitch (Arabic-English)",
      "Training materials for MENA region",
      "Government proposal presentation",
    ],
    related: ["slide-translator", "ai-presentation-generator"],
  },

  // 28) Bilingual Arabic-English Presentation (AR)
  {
    locale: "ar",
    slug: "bilingual-arabic-english-presentation",
    alt: { en: "bilingual-arabic-english-presentation" },
    h1: "مولد العروض ثنائية اللغة (عربي-إنجليزي)",
    title: "عروض تقديمية عربية-إنجليزية — شرائح RTL و LTR",
    description:
      "أنشئ عروضًا بالعربية والإنجليزية جنبًا إلى جنب. مثالي لأسواق الشرق الأوسط.",
    heroPitch: "عرض واحد، لغتان—عربي RTL وإنجليزي LTR في شرائح متطابقة.",
    keywords: [
      "صانع عروض عربية",
      "عرض ثنائي اللغة",
      "شرائح عربي إنجليزي",
      "مولد عرض rtl"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "عرض ثنائي اللغة عن..." },
    hideControls: ["backend"],
    features: [
      { title: "دعم RTL + LTR", desc: "العربية تتدفق من اليمين لليسار تلقائيًا." },
      { title: "قوالب متطابقة", desc: "تخطيطات معكوسة لكلتا اللغتين." },
      { title: "احتياطي الخطوط", desc: "الخطوط العربية واللاتينية تتعايش." },
      { title: "مزامنة المصطلحات", desc: "المصطلحات الفنية متسقة عبر اللغات." },
    ],
    howto: [
      { step: "أدخل المحتوى بلغة واحدة", tip: "الذكاء الاصطناعي يترجم للأخرى." },
      { step: "راجع كلتا النسختين", tip: "عدّل للفروق الثقافية." },
      { step: "ولّد شرائح جنبًا إلى جنب", tip: "أو عروض منفصلة." },
      { step: "صدّر وقدّم", tip: "PPTX مع خطوط مضمّنة." },
    ],
    faq: [
      { q: "أي لهجة عربية؟", a: "العربية الفصحى (MSA) افتراضيًا." },
      { q: "هل يمكن استخدام لهجة خليجية؟", a: "نعم، حدد اللهجة في الطلب." },
      { q: "ترخيص الخطوط؟", a: "يستخدم خطوط عربية مفتوحة المصدر." },
      { q: "اتجاه العرض؟", a: "اختر ترتيب عربي أولاً أو إنجليزي أولاً." },
    ],
    suggestedPrompts: [
      "عرض استثماري ثنائي اللغة (عربي-إنجليزي)",
      "مواد تدريب لمنطقة الشرق الأوسط",
      "عرض مقترح حكومي",
    ],
    related: ["slide-translator", "ai-presentation-generator"],
  },

  // 29) Marketing Plan Presentation (EN)
  {
    locale: "en",
    slug: "marketing-plan-presentation",
    alt: { ar: "marketing-plan-presentation" },
    h1: "Marketing Plan Presentation Maker",
    title: "Marketing Plan Presentation — Build Campaign Decks with AI",
    description:
      "Turn marketing strategies into visual presentations with goals, channels, timeline, and KPIs.",
    heroPitch: "From strategy doc to client-ready deck—complete with calendar and metrics.",
    keywords: [
      "marketing plan presentation",
      "campaign deck maker",
      "marketing strategy slides",
      "ai marketing presentation"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 14, prompt: "Marketing plan for..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Strategy frameworks", desc: "4P, STP, SWOT templates." },
      { title: "Channel breakdowns", desc: "Digital, social, content, paid." },
      { title: "Timeline & calendar", desc: "Campaign phases visualized." },
      { title: "KPI dashboards", desc: "Metrics and success criteria." },
    ],
    howto: [
      { step: "Upload strategy doc", tip: "Or describe campaign goals." },
      { step: "Select framework", tip: "Choose marketing model." },
      { step: "Generate deck", tip: "AI builds structured slides." },
      { step: "Customize & present", tip: "Edit metrics and timelines." },
    ],
    faq: [
      { q: "Which frameworks?", a: "4P, STP, SWOT, AIDA, and custom." },
      { q: "Can I add budget?", a: "Yes, budget tables auto-formatted." },
      { q: "Real campaign examples?", a: "Optional case study slides included." },
      { q: "Team collaboration?", a: "Yes, in Team plan." },
    ],
    suggestedPrompts: [
      "Marketing plan for product launch",
      "Social media campaign strategy deck",
      "Q4 marketing strategy presentation",
    ],
    related: ["sales-proposal-presentation", "business-report-to-ppt"],
  },

  // 30) Marketing Plan Presentation (AR)
  {
    locale: "ar",
    slug: "marketing-plan-presentation",
    alt: { en: "marketing-plan-presentation" },
    h1: "مولد عروض خطط التسويق",
    title: "عرض خطة تسويق — بناء عروض حملات بالذكاء الاصطناعي",
    description:
      "حوّل استراتيجيات التسويق إلى عروض مرئية مع أهداف، قنوات، جدول زمني، ومؤشرات.",
    heroPitch: "من وثيقة الاستراتيجية إلى عرض جاهز للعميل—مع تقويم ومقاييس.",
    keywords: [
      "عرض خطة تسويق",
      "صانع عرض حملة",
      "شرائح استراتيجية تسويقية",
      "عرض تسويقي بالذكاء الاصطناعي"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 14, prompt: "خطة تسويق لـ..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "أطر استراتيجية", desc: "قوالب 4P، STP، SWOT." },
      { title: "تقسيم القنوات", desc: "رقمي، اجتماعي، محتوى، مدفوع." },
      { title: "جدول زمني وتقويم", desc: "مراحل الحملة مرئية." },
      { title: "لوحات مؤشرات الأداء", desc: "مقاييس ومعايير النجاح." },
    ],
    howto: [
      { step: "ارفع وثيقة الاستراتيجية", tip: "أو اوصف أهداف الحملة." },
      { step: "اختر الإطار", tip: "اختر نموذج التسويق." },
      { step: "ولّد العرض", tip: "الذكاء الاصطناعي يبني شرائح منظمة." },
      { step: "خصص وقدّم", tip: "عدّل المقاييس والجداول الزمنية." },
    ],
    faq: [
      { q: "أي أطر؟", a: "4P، STP، SWOT، AIDA، ومخصص." },
      { q: "هل يمكن إضافة ميزانية؟", a: "نعم، جداول الميزانية منسقة تلقائيًا." },
      { q: "أمثلة حملات حقيقية؟", a: "شرائح دراسة حالة اختيارية مضمنة." },
      { q: "تعاون الفريق؟", a: "نعم، في خطة الفريق." },
    ],
    suggestedPrompts: [
      "خطة تسويق لإطلاق منتج",
      "عرض استراتيجية حملة وسائل التواصل",
      "عرض استراتيجية تسويق الربع الرابع",
    ],
    related: ["sales-proposal-presentation", "business-report-to-ppt"],
  },

  // 31) Google Docs to Presentation (EN)
  {
    locale: "en",
    slug: "google-docs-to-presentation",
    alt: { ar: "google-docs-to-presentation" },
    h1: "Google Docs to Presentation",
    title: "Google Docs to Presentation — Convert Docs to Slides with AI",
    description:
      "Turn Google Docs into slide decks automatically. Preserves formatting, images, and structure.",
    heroPitch: "Paste link or upload—AI structures your doc into presentation slides.",
    keywords: [
      "google docs to presentation",
      "docs to slides converter",
      "google docs to ppt",
      "document to presentation ai"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Convert Google Doc to slides..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "One-click import", desc: "Paste Google Docs link." },
      { title: "Smart chunking", desc: "Headings become slide titles." },
      { title: "Image preservation", desc: "Photos and diagrams included." },
      { title: "Export to PPTX", desc: "Works with PowerPoint and Slides." },
    ],
    howto: [
      { step: "Share Google Docs link", tip: "Or upload as DOCX." },
      { step: "AI structures slides", tip: "Based on headings and sections." },
      { step: "Review & refine", tip: "Edit slide content." },
      { step: "Export", tip: "Download PPTX or share link." },
    ],
    faq: [
      { q: "Sharing permissions?", a: "Doc must be accessible via link." },
      { q: "Formatting preserved?", a: "Yes, styles and lists maintained." },
      { q: "How long can docs be?", a: "Supports up to 50 pages." },
      { q: "Live sync?", a: "No, export is one-time conversion." },
    ],
    suggestedPrompts: [
      "Convert meeting notes doc to slides",
      "Turn project plan doc into presentation",
      "Google Doc report to slide deck",
    ],
    related: ["convert-word-to-ppt", "notion-to-slides"],
  },

  // 32) Google Docs to Presentation (AR)
  {
    locale: "ar",
    slug: "google-docs-to-presentation",
    alt: { en: "google-docs-to-presentation" },
    h1: "تحويل مستندات Google إلى عرض تقديمي",
    title: "Google Docs إلى عرض — حوّل المستندات لشرائح بالذكاء الاصطناعي",
    description:
      "حوّل مستندات Google إلى عروض شرائح تلقائيًا. يحافظ على التنسيق، الصور، والبنية.",
    heroPitch: "الصق الرابط أو ارفع—الذكاء الاصطناعي يبني مستندك في شرائح عرض.",
    keywords: [
      "google docs إلى عرض",
      "محول مستندات لشرائح",
      "google docs إلى ppt",
      "مستند إلى عرض بالذكاء الاصطناعي"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "حوّل Google Doc إلى شرائح..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "استيراد بنقرة واحدة", desc: "الصق رابط Google Docs." },
      { title: "تقسيم ذكي", desc: "العناوين تصبح عناوين شرائح." },
      { title: "حفظ الصور", desc: "الصور والرسوم مضمنة." },
      { title: "تصدير إلى PPTX", desc: "يعمل مع PowerPoint و Slides." },
    ],
    howto: [
      { step: "شارك رابط Google Docs", tip: "أو ارفع كـ DOCX." },
      { step: "الذكاء الاصطناعي يبني الشرائح", tip: "بناءً على العناوين والأقسام." },
      { step: "راجع وحسّن", tip: "عدّل محتوى الشرائح." },
      { step: "صدّر", tip: "حمّل PPTX أو شارك رابط." },
    ],
    faq: [
      { q: "أذونات المشاركة؟", a: "يجب أن يكون المستند متاحًا عبر رابط." },
      { q: "هل يُحفظ التنسيق؟", a: "نعم، الأنماط والقوائم محفوظة." },
      { q: "كم طول المستندات؟", a: "يدعم حتى 50 صفحة." },
      { q: "مزامنة حية؟", a: "لا، التصدير تحويل لمرة واحدة." },
    ],
    suggestedPrompts: [
      "حوّل ملاحظات اجتماع لشرائح",
      "حوّل خطة مشروع لعرض تقديمي",
      "تقرير Google Doc إلى عرض شرائح",
    ],
    related: ["convert-word-to-ppt", "notion-to-slides"],
  },

  // 33) Notion to Slides (EN)
  {
    locale: "en",
    slug: "notion-to-slides",
    alt: { ar: "notion-to-slides" },
    h1: "Notion to Slides",
    title: "Notion to Slides — Generate Presentations from Notion Pages",
    description:
      "Convert Notion pages into slide presentations. Toggle lists, tables, and embeds supported.",
    heroPitch: "Export Notion page → AI builds structured deck with your content.",
    keywords: [
      "notion to slides",
      "notion to presentation",
      "notion to ppt",
      "notion deck generator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Convert Notion page to slides..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Toggle preservation", desc: "Nested content becomes slides." },
      { title: "Table import", desc: "Databases and tables formatted." },
      { title: "Embed support", desc: "Links and media included." },
      { title: "Hierarchy mapping", desc: "H1/H2/H3 structure preserved." },
    ],
    howto: [
      { step: "Export Notion as Markdown", tip: "Or share page link." },
      { step: "Upload to converter", tip: "AI parses structure." },
      { step: "Generate slides", tip: "Toggles and tables become slides." },
      { step: "Export PPTX", tip: "Edit in PowerPoint or Slides." },
    ],
    faq: [
      { q: "Which Notion blocks?", a: "Text, headings, lists, tables, embeds." },
      { q: "Database views?", a: "Tables and boards supported." },
      { q: "Images from Notion?", a: "Yes, embedded images included." },
      { q: "Team workspaces?", a: "Yes, works with shared pages." },
    ],
    suggestedPrompts: [
      "Convert Notion project doc to slides",
      "Turn Notion meeting notes into deck",
      "Notion wiki to presentation",
    ],
    related: ["google-docs-to-presentation", "convert-word-to-ppt"],
  },

  // 34) Notion to Slides (AR)
  {
    locale: "ar",
    slug: "notion-to-slides",
    alt: { en: "notion-to-slides" },
    h1: "تحويل Notion إلى شرائح",
    title: "Notion إلى شرائح — ولّد عروضًا من صفحات Notion",
    description:
      "حوّل صفحات Notion إلى عروض شرائح. يدعم القوائم القابلة للطي، الجداول، والتضمينات.",
    heroPitch: "صدّر صفحة Notion ← الذكاء الاصطناعي يبني عرضًا منظمًا بمحتواك.",
    keywords: [
      "notion إلى شرائح",
      "notion إلى عرض",
      "notion إلى ppt",
      "مولد عرض notion"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "حوّل صفحة Notion إلى شرائح..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "حفظ القوائم القابلة للطي", desc: "المحتوى المتداخل يصبح شرائح." },
      { title: "استيراد الجداول", desc: "قواعد البيانات والجداول منسقة." },
      { title: "دعم التضمين", desc: "الروابط والوسائط مضمنة." },
      { title: "تخطيط التسلسل", desc: "بنية H1/H2/H3 محفوظة." },
    ],
    howto: [
      { step: "صدّر Notion كـ Markdown", tip: "أو شارك رابط الصفحة." },
      { step: "ارفع للمحول", tip: "الذكاء الاصطناعي يحلل البنية." },
      { step: "ولّد الشرائح", tip: "القوائم والجداول تصبح شرائح." },
      { step: "صدّر PPTX", tip: "عدّل في PowerPoint أو Slides." },
    ],
    faq: [
      { q: "أي كتل Notion؟", a: "نصوص، عناوين، قوائم، جداول، تضمينات." },
      { q: "عروض قواعد البيانات؟", a: "الجداول واللوحات مدعومة." },
      { q: "صور من Notion؟", a: "نعم، الصور المضمنة مشمولة." },
      { q: "مساحات عمل الفريق؟", a: "نعم، يعمل مع الصفحات المشتركة." },
    ],
    suggestedPrompts: [
      "حوّل مستند مشروع Notion لشرائح",
      "حوّل ملاحظات اجتماع Notion لعرض",
      "ويكي Notion إلى عرض تقديمي",
    ],
    related: ["google-docs-to-presentation", "convert-word-to-ppt"],
  },

  // 35) Meeting Notes to Slides (EN)
  {
    locale: "en",
    slug: "meeting-notes-to-slides",
    alt: { ar: "meeting-notes-to-slides" },
    h1: "Meeting Notes to Slides",
    title: "Meeting Notes to Slides — Auto-Generate Slide Summaries",
    description:
      "Turn meeting transcripts or notes into summary presentations with action items and decisions.",
    heroPitch: "Paste notes → AI extracts agenda, decisions, next steps.",
    keywords: [
      "meeting notes to slides",
      "meeting summary presentation",
      "notes to ppt",
      "meeting deck generator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 8, prompt: "Meeting summary from notes..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Key decisions highlighted", desc: "Decisions and outcomes extracted." },
      { title: "Action items list", desc: "Who, what, when formatted." },
      { title: "Attendees & date", desc: "Metadata auto-included." },
      { title: "Shareable summary", desc: "Email or PPTX export." },
    ],
    howto: [
      { step: "Upload transcript or notes", tip: "Text, DOCX, or paste." },
      { step: "AI extracts structure", tip: "Agenda, decisions, actions." },
      { step: "Generate slides", tip: "Summary deck created." },
      { step: "Share with team", tip: "Export or send link." },
    ],
    faq: [
      { q: "Works with video transcripts?", a: "Yes, Zoom, Teams, Meet transcripts supported." },
      { q: "Action item tracking?", a: "Export to project management tools." },
      { q: "Multiple meetings?", a: "Batch process meeting series." },
      { q: "Languages?", a: "English, Arabic, Spanish supported." },
    ],
    suggestedPrompts: [
      "Create slides from board meeting notes",
      "Turn team standup notes into deck",
      "Meeting summary presentation",
    ],
    related: ["business-report-to-ppt", "ai-presentation-generator"],
  },

  // 36) Meeting Notes to Slides (AR)
  {
    locale: "ar",
    slug: "meeting-notes-to-slides",
    alt: { en: "meeting-notes-to-slides" },
    h1: "تحويل ملاحظات الاجتماع إلى شرائح",
    title: "ملاحظات اجتماع إلى شرائح — توليد ملخصات تلقائية",
    description:
      "حوّل نصوص أو ملاحظات الاجتماعات إلى عروض ملخصة مع عناصر العمل والقرارات.",
    heroPitch: "الصق الملاحظات ← الذكاء الاصطناعي يستخرج جدول الأعمال، القرارات، الخطوات التالية.",
    keywords: [
      "ملاحظات اجتماع إلى شرائح",
      "عرض ملخص اجتماع",
      "ملاحظات إلى ppt",
      "مولد عرض اجتماع"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 8, prompt: "ملخص اجتماع من ملاحظات..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "قرارات رئيسية مميزة", desc: "القرارات والنتائج مستخرجة." },
      { title: "قائمة عناصر العمل", desc: "من، ماذا، متى منسقة." },
      { title: "الحضور والتاريخ", desc: "البيانات الوصفية مضمنة تلقائيًا." },
      { title: "ملخص قابل للمشاركة", desc: "تصدير بريد إلكتروني أو PPTX." },
    ],
    howto: [
      { step: "ارفع النص أو الملاحظات", tip: "نص، DOCX، أو لصق." },
      { step: "الذكاء الاصطناعي يستخرج البنية", tip: "جدول الأعمال، القرارات، الإجراءات." },
      { step: "ولّد الشرائح", tip: "عرض ملخص مُنشأ." },
      { step: "شارك مع الفريق", tip: "صدّر أو أرسل رابط." },
    ],
    faq: [
      { q: "يعمل مع نصوص الفيديو؟", a: "نعم، نصوص Zoom، Teams، Meet مدعومة." },
      { q: "تتبع عناصر العمل؟", a: "صدّر لأدوات إدارة المشاريع." },
      { q: "اجتماعات متعددة؟", a: "معالجة دفعات لسلسلة اجتماعات." },
      { q: "اللغات؟", a: "الإنجليزية، العربية، الإسبانية مدعومة." },
    ],
    suggestedPrompts: [
      "أنشئ شرائح من ملاحظات اجتماع مجلس الإدارة",
      "حوّل ملاحظات فريق standup لعرض",
      "عرض ملخص اجتماع",
    ],
    related: ["business-report-to-ppt", "ai-presentation-generator"],
  },

  // 37) SOP to Slides (EN)
  {
    locale: "en",
    slug: "sop-to-slides",
    alt: { ar: "sop-to-slides" },
    h1: "SOP to Slides",
    title: "SOP / Policy to Slides — Turn Procedures into Ready Decks",
    description:
      "Convert standard operating procedures and policies into training presentations.",
    heroPitch: "From dense SOPs to visual, step-by-step slide decks.",
    keywords: [
      "sop to slides",
      "policy to presentation",
      "procedure to ppt",
      "compliance deck generator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Convert SOP to slides..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Step-by-step structure", desc: "Procedures broken into slides." },
      { title: "Compliance formatting", desc: "Audit-ready layouts." },
      { title: "Visual aids", desc: "Flowcharts and decision trees." },
      { title: "Version tracking", desc: "Document revision history." },
    ],
    howto: [
      { step: "Upload SOP document", tip: "PDF, DOCX, or Markdown." },
      { step: "AI structures procedures", tip: "Steps become slides." },
      { step: "Add diagrams", tip: "Flowcharts auto-generated." },
      { step: "Export for training", tip: "PPTX or PDF handouts." },
    ],
    faq: [
      { q: "Industry-specific SOPs?", a: "Yes, healthcare, manufacturing, IT supported." },
      { q: "Compliance standards?", a: "ISO, FDA, OSHA templates available." },
      { q: "Update tracking?", a: "Version control for SOP changes." },
      { q: "Multilingual?", a: "Translate SOPs to multiple languages." },
    ],
    suggestedPrompts: [
      "Convert safety SOP to training slides",
      "Turn HR policy into presentation",
      "Manufacturing procedure to deck",
    ],
    related: ["training-workshop-slides", "business-report-to-ppt"],
  },

  // 38) SOP to Slides (AR)
  {
    locale: "ar",
    slug: "sop-to-slides",
    alt: { en: "sop-to-slides" },
    h1: "تحويل SOP إلى شرائح",
    title: "SOP / سياسة إلى شرائح — حوّل الإجراءات لعروض جاهزة",
    description:
      "حوّل إجراءات التشغيل القياسية والسياسات إلى عروض تدريبية.",
    heroPitch: "من SOPs الكثيفة إلى عروض شرائح مرئية خطوة بخطوة.",
    keywords: [
      "sop إلى شرائح",
      "سياسة إلى عرض",
      "إجراء إلى ppt",
      "مولد عرض امتثال"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "حوّل SOP إلى شرائح..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "بنية خطوة بخطوة", desc: "الإجراءات مقسمة لشرائح." },
      { title: "تنسيق امتثال", desc: "تخطيطات جاهزة للتدقيق." },
      { title: "وسائل مرئية", desc: "مخططات تدفق وأشجار قرارات." },
      { title: "تتبع الإصدارات", desc: "تاريخ مراجعات المستندات." },
    ],
    howto: [
      { step: "ارفع مستند SOP", tip: "PDF، DOCX، أو Markdown." },
      { step: "الذكاء الاصطناعي يبني الإجراءات", tip: "الخطوات تصبح شرائح." },
      { step: "أضف رسومًا", tip: "مخططات تدفق تُولد تلقائيًا." },
      { step: "صدّر للتدريب", tip: "PPTX أو نشرات PDF." },
    ],
    faq: [
      { q: "SOPs خاصة بالصناعة؟", a: "نعم، الرعاية الصحية، التصنيع، IT مدعومة." },
      { q: "معايير الامتثال؟", a: "قوالب ISO، FDA، OSHA متوفرة." },
      { q: "تتبع التحديثات؟", a: "تحكم بالإصدار لتغييرات SOP." },
      { q: "متعدد اللغات؟", a: "ترجم SOPs لعدة لغات." },
    ],
    suggestedPrompts: [
      "حوّل SOP السلامة لشرائح تدريبية",
      "حوّل سياسة الموارد البشرية لعرض",
      "إجراء التصنيع إلى عرض",
    ],
    related: ["training-workshop-slides", "business-report-to-ppt"],
  },

  // 39) Data to Slides (EN)
  {
    locale: "en",
    slug: "data-to-slides",
    alt: { ar: "data-to-slides" },
    h1: "Data to Slides",
    title: "Data to Slides — Convert Tables & Charts from Docs to PPT",
    description:
      "Transform spreadsheets and data tables into visual presentation charts automatically.",
    heroPitch: "Upload Excel or CSV → AI creates charts, graphs, and insights slides.",
    keywords: [
      "data to slides",
      "excel to powerpoint",
      "charts to ppt",
      "data visualization slides"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Create slides from data..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Auto chart selection", desc: "Bar, line, pie based on data type." },
      { title: "Insight generation", desc: "AI highlights trends and outliers." },
      { title: "Dashboard layouts", desc: "Multi-chart slides." },
      { title: "Data source linked", desc: "Update data, refresh slides." },
    ],
    howto: [
      { step: "Upload Excel/CSV", tip: "Or connect Google Sheets." },
      { step: "AI analyzes data", tip: "Selects chart types." },
      { step: "Generate slides", tip: "Visual charts created." },
      { step: "Export PPTX", tip: "Edit charts in PowerPoint." },
    ],
    faq: [
      { q: "Chart customization?", a: "Yes, edit colors, labels, and styles." },
      { q: "Live data?", a: "Connect to Google Sheets for updates." },
      { q: "How many data points?", a: "Supports up to 10,000 rows." },
      { q: "Financial data?", a: "Yes, P&L, balance sheets supported." },
    ],
    suggestedPrompts: [
      "Create charts from sales data",
      "Visualize survey results in slides",
      "Financial dashboard presentation",
    ],
    related: ["business-report-to-ppt", "ai-presentation-generator"],
  },

  // 40) Data to Slides (AR)
  {
    locale: "ar",
    slug: "data-to-slides",
    alt: { en: "data-to-slides" },
    h1: "تحويل البيانات إلى شرائح",
    title: "بيانات إلى شرائح — حوّل الجداول والرسوم من المستندات لـ PPT",
    description:
      "حوّل جداول البيانات وجداول البيانات إلى رسوم بيانية عرض مرئية تلقائيًا.",
    heroPitch: "ارفع Excel أو CSV ← الذكاء الاصطناعي ينشئ رسومًا، مخططات، وشرائح رؤى.",
    keywords: [
      "بيانات إلى شرائح",
      "excel إلى باوربوينت",
      "رسوم بيانية إلى ppt",
      "شرائح تصور البيانات"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "أنشئ شرائح من بيانات..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "اختيار تلقائي للرسوم", desc: "أعمدة، خطوط، دوائر بناءً على نوع البيانات." },
      { title: "توليد الرؤى", desc: "الذكاء الاصطناعي يبرز الاتجاهات والقيم المتطرفة." },
      { title: "تخطيطات لوحة المعلومات", desc: "شرائح متعددة الرسوم." },
      { title: "مصدر البيانات مرتبط", desc: "حدّث البيانات، حدّث الشرائح." },
    ],
    howto: [
      { step: "ارفع Excel/CSV", tip: "أو اتصل بـ Google Sheets." },
      { step: "الذكاء الاصطناعي يحلل البيانات", tip: "يختار أنواع الرسوم." },
      { step: "ولّد الشرائح", tip: "رسوم مرئية مُنشأة." },
      { step: "صدّر PPTX", tip: "عدّل الرسوم في PowerPoint." },
    ],
    faq: [
      { q: "تخصيص الرسوم؟", a: "نعم، عدّل الألوان، التسميات، والأنماط." },
      { q: "بيانات حية؟", a: "اتصل بـ Google Sheets للتحديثات." },
      { q: "كم نقطة بيانات؟", a: "يدعم حتى 10,000 صف." },
      { q: "بيانات مالية؟", a: "نعم، P&L، الميزانيات العمومية مدعومة." },
    ],
    suggestedPrompts: [
      "أنشئ رسومًا من بيانات المبيعات",
      "صوّر نتائج استطلاع في شرائح",
      "عرض لوحة معلومات مالية",
    ],
    related: ["business-report-to-ppt", "ai-presentation-generator"],
  },

  // 41) Academic Presentation Maker - Thesis (EN)
  {
    locale: "en",
    slug: "academic-presentation-thesis",
    alt: { ar: "academic-presentation-thesis" },
    h1: "Academic Presentation Maker — Thesis & Dissertation",
    title: "Academic Presentation Maker — Thesis & Dissertation to Slides",
    description:
      "Convert thesis or dissertation into defense presentation with proper academic structure.",
    heroPitch: "From 200-page thesis to 20-slide defense deck—AI extracts key contributions.",
    keywords: [
      "thesis presentation",
      "dissertation slides",
      "academic defense presentation",
      "thesis to ppt"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 20, prompt: "Thesis defense presentation..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Defense structure", desc: "Introduction, lit review, methods, results, discussion." },
      { title: "Figure extraction", desc: "Graphs and tables from thesis." },
      { title: "Citations formatted", desc: "Bibliography slides included." },
      { title: "Committee notes", desc: "Speaker notes for defense prep." },
    ],
    howto: [
      { step: "Upload thesis PDF", tip: "Or paste key chapters." },
      { step: "Select defense format", tip: "Master's, PhD, or proposal." },
      { step: "AI structures deck", tip: "Key contributions highlighted." },
      { step: "Practice & export", tip: "Rehearse with speaker notes." },
    ],
    faq: [
      { q: "Which fields?", a: "All disciplines—STEM, humanities, social sciences." },
      { q: "Time limits?", a: "Customize for 15, 30, or 60-minute defense." },
      { q: "Committee review?", a: "Export and share before defense." },
      { q: "Multiple versions?", a: "Yes, short and long versions." },
    ],
    suggestedPrompts: [
      "PhD thesis defense presentation",
      "Master's thesis slides",
      "Dissertation proposal deck",
    ],
    related: ["research-paper-to-presentation", "academic-presentation-maker"],
  },

  // 42) Academic Presentation Maker - Thesis (AR)
  {
    locale: "ar",
    slug: "academic-presentation-thesis",
    alt: { en: "academic-presentation-thesis" },
    h1: "صانع العروض الأكاديمية — رسالة وأطروحة",
    title: "صانع عروض أكاديمية — رسالة وأطروحة إلى شرائح",
    description:
      "حوّل رسالة أو أطروحة إلى عرض دفاع بهيكل أكاديمي صحيح.",
    heroPitch: "من رسالة 200 صفحة إلى عرض دفاع 20 شريحة—الذكاء الاصطناعي يستخرج المساهمات الرئيسية.",
    keywords: [
      "عرض رسالة",
      "شرائح أطروحة",
      "عرض دفاع أكاديمي",
      "رسالة إلى ppt"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 20, prompt: "عرض دفاع عن رسالة..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "بنية دفاع", desc: "مقدمة، مراجعة أدبيات، منهجية، نتائج، مناقشة." },
      { title: "استخراج الأشكال", desc: "رسوم وجداول من الرسالة." },
      { title: "اقتباسات منسقة", desc: "شرائح ببليوغرافيا مضمنة." },
      { title: "ملاحظات اللجنة", desc: "ملاحظات متحدث لتحضير الدفاع." },
    ],
    howto: [
      { step: "ارفع PDF الرسالة", tip: "أو الصق الفصول الرئيسية." },
      { step: "اختر صيغة الدفاع", tip: "ماجستير، دكتوراه، أو مقترح." },
      { step: "الذكاء الاصطناعي يبني العرض", tip: "المساهمات الرئيسية مميزة." },
      { step: "مارس وصدّر", tip: "تدرب مع ملاحظات المتحدث." },
    ],
    faq: [
      { q: "أي مجالات؟", a: "جميع التخصصات—STEM، إنسانيات، علوم اجتماعية." },
      { q: "حدود الوقت؟", a: "خصص لدفاع 15، 30، أو 60 دقيقة." },
      { q: "مراجعة اللجنة؟", a: "صدّر وشارك قبل الدفاع." },
      { q: "إصدارات متعددة؟", a: "نعم، نسخ قصيرة وطويلة." },
    ],
    suggestedPrompts: [
      "عرض دفاع دكتوراه",
      "شرائح رسالة ماجستير",
      "عرض مقترح أطروحة",
    ],
    related: ["research-paper-to-presentation", "ai-presentation-generator"],
  },

  // 43) Proposal Presentation Generator - RFP (EN)
  {
    locale: "en",
    slug: "proposal-presentation-rfp",
    alt: { ar: "proposal-presentation-rfp" },
    h1: "Proposal Presentation Generator — RFP / SOW to Deck",
    title: "Proposal Presentation Generator — RFP / SOW to Deck (AI)",
    description:
      "Convert RFP responses and SOW documents into winning proposal presentations.",
    heroPitch: "From RFP document to client-ready pitch deck—structured, professional, persuasive.",
    keywords: [
      "rfp presentation",
      "proposal deck generator",
      "sow to slides",
      "bid presentation maker"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 15, prompt: "RFP response presentation..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "RFP structure", desc: "Requirements, approach, team, pricing." },
      { title: "Compliance matrix", desc: "Show RFP requirement coverage." },
      { title: "Team credentials", desc: "Bios and past performance." },
      { title: "Win themes", desc: "Value proposition highlighted." },
    ],
    howto: [
      { step: "Upload RFP & response", tip: "Or paste SOW document." },
      { step: "AI extracts requirements", tip: "Builds proposal structure." },
      { step: "Add team & pricing", tip: "Customize proposal details." },
      { step: "Generate & present", tip: "Win with polished deck." },
    ],
    faq: [
      { q: "Government RFPs?", a: "Yes, includes compliance sections." },
      { q: "Pricing tables?", a: "Yes, formatted and editable." },
      { q: "Team collaboration?", a: "Yes, multi-user editing in Team plan." },
      { q: "Past performance?", a: "Add case studies and references." },
    ],
    suggestedPrompts: [
      "RFP response presentation for IT services",
      "Government contract proposal deck",
      "Consulting SOW presentation",
    ],
    related: ["sales-proposal-presentation", "business-report-to-ppt"],
  },

  // 44) Proposal Presentation Generator - RFP (AR)
  {
    locale: "ar",
    slug: "proposal-presentation-rfp",
    alt: { en: "proposal-presentation-rfp" },
    h1: "مولد عرض المقترح — RFP / SOW إلى عرض",
    title: "مولد عرض مقترح — RFP / SOW إلى عرض (ذكاء اصطناعي)",
    description:
      "حوّل ردود RFP ومستندات SOW إلى عروض مقترحات فائزة.",
    heroPitch: "من مستند RFP إلى عرض جاهز للعميل—منظم، احترافي، مقنع.",
    keywords: [
      "عرض rfp",
      "مولد عرض مقترح",
      "sow إلى شرائح",
      "صانع عرض عطاء"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 15, prompt: "عرض رد RFP..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "بنية RFP", desc: "المتطلبات، النهج، الفريق، التسعير." },
      { title: "مصفوفة امتثال", desc: "أظهر تغطية متطلبات RFP." },
      { title: "بيانات اعتماد الفريق", desc: "سير ذاتية وأداء سابق." },
      { title: "موضوعات الفوز", desc: "عرض القيمة مميز." },
    ],
    howto: [
      { step: "ارفع RFP والرد", tip: "أو الصق مستند SOW." },
      { step: "الذكاء الاصطناعي يستخرج المتطلبات", tip: "يبني بنية المقترح." },
      { step: "أضف الفريق والتسعير", tip: "خصص تفاصيل المقترح." },
      { step: "ولّد وقدّم", tip: "اربح بعرض مصقول." },
    ],
    faq: [
      { q: "RFPs حكومية؟", a: "نعم، يتضمن أقسام امتثال." },
      { q: "جداول تسعير؟", a: "نعم، منسقة وقابلة للتعديل." },
      { q: "تعاون الفريق؟", a: "نعم، تحرير متعدد المستخدمين في خطة الفريق." },
      { q: "أداء سابق؟", a: "أضف دراسات حالة ومراجع." },
    ],
    suggestedPrompts: [
      "عرض رد RFP لخدمات IT",
      "عرض عقد حكومي",
      "عرض SOW استشارات",
    ],
    related: ["sales-proposal-presentation", "business-report-to-ppt"],
  },

  // 45) Startup One-Pager (EN)
  {
    locale: "en",
    slug: "startup-one-pager",
    alt: { ar: "startup-one-pager" },
    h1: "Startup One-Pager & Pitch",
    title: "Startup One-Pager & Pitch — Generate from Prompt or Document",
    description:
      "Create investor one-pagers and pitch decks from your startup idea or business plan.",
    heroPitch: "From idea to investor-ready deck—problem, solution, traction, ask.",
    keywords: [
      "startup one pager",
      "startup pitch deck",
      "investor presentation",
      "startup deck generator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Startup pitch for..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "One-pager format", desc: "Single-page summary." },
      { title: "Full pitch deck", desc: "10-15 slides with story arc." },
      { title: "Traction metrics", desc: "Growth charts and KPIs." },
      { title: "Ask & use of funds", desc: "Clear investment ask." },
    ],
    howto: [
      { step: "Describe your startup", tip: "Problem, solution, market, team." },
      { step: "AI builds deck", tip: "Structured investor narrative." },
      { step: "Add traction data", tip: "Revenue, users, growth." },
      { step: "Export & pitch", tip: "PPTX or PDF one-pager." },
    ],
    faq: [
      { q: "Pre-seed vs Series A?", a: "Templates for every stage." },
      { q: "Financial projections?", a: "Yes, add revenue forecasts." },
      { q: "Team slides?", a: "Yes, with bios and photos." },
      { q: "Competitor analysis?", a: "Yes, comparison matrices." },
    ],
    suggestedPrompts: [
      "Startup pitch deck for SaaS company",
      "One-pager for seed round",
      "Pre-seed investor presentation",
    ],
    related: ["pitch-deck-generator", "sales-proposal-presentation"],
  },

  // 46) Startup One-Pager (AR)
  {
    locale: "ar",
    slug: "startup-one-pager",
    alt: { en: "startup-one-pager" },
    h1: "صفحة واحدة وعرض للشركات الناشئة",
    title: "صفحة واحدة وعرض للشركات الناشئة — من فكرة أو مستند",
    description:
      "أنشئ صفحات واحدة للمستثمرين وعروض من فكرة شركتك الناشئة أو خطة العمل.",
    heroPitch: "من فكرة إلى عرض جاهز للمستثمرين—مشكلة، حل، جذب، طلب.",
    keywords: [
      "صفحة واحدة لشركة ناشئة",
      "عرض شركة ناشئة",
      "عرض مستثمرين",
      "مولد عرض شركات ناشئة"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "عرض شركة ناشئة لـ..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "صيغة صفحة واحدة", desc: "ملخص صفحة واحدة." },
      { title: "عرض كامل", desc: "10-15 شريحة مع قوس قصة." },
      { title: "مقاييس جذب", desc: "رسوم نمو ومؤشرات." },
      { title: "الطلب واستخدام الأموال", desc: "طلب استثمار واضح." },
    ],
    howto: [
      { step: "اوصف شركتك الناشئة", tip: "مشكلة، حل، سوق، فريق." },
      { step: "الذكاء الاصطناعي يبني العرض", tip: "سرد مستثمرين منظم." },
      { step: "أضف بيانات جذب", tip: "إيرادات، مستخدمين، نمو." },
      { step: "صدّر وقدّم", tip: "PPTX أو PDF صفحة واحدة." },
    ],
    faq: [
      { q: "Pre-seed مقابل Series A؟", a: "قوالب لكل مرحلة." },
      { q: "توقعات مالية؟", a: "نعم، أضف توقعات إيرادات." },
      { q: "شرائح الفريق؟", a: "نعم، مع سير ذاتية وصور." },
      { q: "تحليل المنافسين؟", a: "نعم، مصفوفات مقارنة." },
    ],
    suggestedPrompts: [
      "عرض شركة ناشئة لشركة SaaS",
      "صفحة واحدة لجولة التمويل الأولي",
      "عرض مستثمرين ما قبل التمويل",
    ],
    related: ["pitch-deck-generator", "sales-proposal-presentation"],
  },

  // 47) AI Presentation Templates (EN)
  {
    locale: "en",
    slug: "ai-presentation-templates",
    alt: { ar: "ai-presentation-templates" },
    h1: "AI Presentation Templates",
    title: "AI Presentation Templates — Free Themes for PPT & Google Slides",
    description:
      "Browse and customize AI-generated presentation templates. Modern designs, free PPTX download.",
    heroPitch: "Start with a template, customize with AI—no design skills needed.",
    keywords: [
      "ai presentation templates",
      "free ppt templates",
      "presentation themes",
      "google slides templates"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Create presentation with template..." },
    hideControls: ["backend"],
    features: [
      { title: "Template library", desc: "100+ professional designs." },
      { title: "AI customization", desc: "Adapt colors, fonts, layouts." },
      { title: "Brand matching", desc: "Upload logo for auto-theming." },
      { title: "PPTX & Google Slides", desc: "Export to both formats." },
    ],
    howto: [
      { step: "Browse templates", tip: "Filter by industry or style." },
      { step: "Select & customize", tip: "AI adapts to your content." },
      { step: "Add content", tip: "Fill with your text and images." },
      { step: "Export", tip: "Download PPTX or use in Google Slides." },
    ],
    faq: [
      { q: "Are templates free?", a: "Yes, all templates free to use." },
      { q: "Commercial use?", a: "Yes, use for business presentations." },
      { q: "Custom templates?", a: "Yes, upload your brand template." },
      { q: "Mobile editing?", a: "Yes, works on tablets and phones." },
    ],
    suggestedPrompts: [
      "Business presentation template",
      "Pitch deck template",
      "Academic presentation theme",
    ],
    related: ["ai-presentation-generator", "powerpoint-alternative"],
  },

  // 48) AI Presentation Templates (AR)
  {
    locale: "ar",
    slug: "ai-presentation-templates",
    alt: { en: "ai-presentation-templates" },
    h1: "قوالب العروض بالذكاء الاصطناعي",
    title: "قوالب عروض بالذكاء الاصطناعي — ثيمات مجانية لـ PPT و Google Slides",
    description:
      "تصفح وخصص قوالب عروض مولدة بالذكاء الاصطناعي. تصاميم حديثة، تحميل PPTX مجاني.",
    heroPitch: "ابدأ بقالب، خصص بالذكاء الاصطناعي—لا حاجة لمهارات تصميم.",
    keywords: [
      "قوالب عروض بالذكاء الاصطناعي",
      "قوالب ppt مجانية",
      "ثيمات عروض",
      "قوالب google slides"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "أنشئ عرضًا بقالب..." },
    hideControls: ["backend"],
    features: [
      { title: "مكتبة قوالب", desc: "أكثر من 100 تصميم احترافي." },
      { title: "تخصيص بالذكاء الاصطناعي", desc: "تكييف الألوان، الخطوط، التخطيطات." },
      { title: "مطابقة العلامة التجارية", desc: "ارفع شعار لتطبيق الثيم تلقائيًا." },
      { title: "PPTX و Google Slides", desc: "صدّر لكلا الصيغتين." },
    ],
    howto: [
      { step: "تصفح القوالب", tip: "صفّي حسب الصناعة أو الأسلوب." },
      { step: "اختر وخصص", tip: "الذكاء الاصطناعي يكيف لمحتواك." },
      { step: "أضف المحتوى", tip: "املأ بنصك وصورك." },
      { step: "صدّر", tip: "حمّل PPTX أو استخدم في Google Slides." },
    ],
    faq: [
      { q: "هل القوالب مجانية؟", a: "نعم، جميع القوالب مجانية للاستخدام." },
      { q: "استخدام تجاري؟", a: "نعم، استخدم للعروض التجارية." },
      { q: "قوالب مخصصة؟", a: "نعم، ارفع قالب علامتك التجارية." },
      { q: "تحرير محمول؟", a: "نعم، يعمل على الأجهزة اللوحية والهواتف." },
    ],
    suggestedPrompts: [
      "قالب عرض أعمال",
      "قالب عرض استثماري",
      "ثيم عرض أكاديمي",
    ],
    related: ["ai-presentation-generator", "powerpoint-alternative"],
  },

  // 49) AI Speaker Notes Generator (EN)
  {
    locale: "en",
    slug: "ai-speaker-notes",
    alt: { ar: "ai-speaker-notes" },
    h1: "AI Speaker Notes Generator",
    title: "AI Speaker Notes Generator — Add Presenter Notes to Every Slide",
    description:
      "Automatically generate speaker notes for your presentations. Perfect for practice and delivery.",
    heroPitch: "Upload slides, AI writes presenter notes—talking points, timing, tips.",
    keywords: [
      "speaker notes generator",
      "presenter notes ai",
      "powerpoint notes",
      "presentation script generator"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Generate speaker notes for..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "Talking points", desc: "Key points to mention per slide." },
      { title: "Timing guidance", desc: "How long to spend on each slide." },
      { title: "Transition phrases", desc: "Smooth segues between topics." },
      { title: "Q&A prep", desc: "Anticipated questions and answers." },
    ],
    howto: [
      { step: "Upload presentation", tip: "PPTX or paste outline." },
      { step: "AI generates notes", tip: "Per-slide speaker guidance." },
      { step: "Review & customize", tip: "Edit notes to match your style." },
      { step: "Practice & present", tip: "Use notes during delivery." },
    ],
    faq: [
      { q: "Note length?", a: "Customizable—brief bullets or full script." },
      { q: "Multiple languages?", a: "Yes, English, Arabic, Spanish." },
      { q: "Print format?", a: "Yes, export as PDF with notes." },
      { q: "Teleprompter mode?", a: "Yes, display notes while presenting." },
    ],
    suggestedPrompts: [
      "Generate speaker notes for sales pitch",
      "Add presenter notes to training deck",
      "Create script for conference presentation",
    ],
    related: ["ai-presentation-generator", "training-workshop-slides"],
  },

  // 50) AI Speaker Notes Generator (AR)
  {
    locale: "ar",
    slug: "ai-speaker-notes",
    alt: { en: "ai-speaker-notes" },
    h1: "مولد ملاحظات المتحدث بالذكاء الاصطناعي",
    title: "مولد ملاحظات متحدث — أضف ملاحظات مقدم لكل شريحة",
    description:
      "ولّد ملاحظات متحدث تلقائيًا لعروضك التقديمية. مثالي للممارسة والتقديم.",
    heroPitch: "ارفع الشرائح، الذكاء الاصطناعي يكتب ملاحظات المقدم—نقاط نقاش، توقيت، نصائح.",
    keywords: [
      "مولد ملاحظات متحدث",
      "ملاحظات مقدم بالذكاء الاصطناعي",
      "ملاحظات باوربوينت",
      "مولد نص عرض"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "ولّد ملاحظات متحدث لـ..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "نقاط نقاش", desc: "نقاط رئيسية لذكرها لكل شريحة." },
      { title: "إرشاد التوقيت", desc: "كم وقت تقضي على كل شريحة." },
      { title: "عبارات انتقالية", desc: "انتقالات سلسة بين المواضيع." },
      { title: "تحضير أسئلة وأجوبة", desc: "أسئلة متوقعة وإجابات." },
    ],
    howto: [
      { step: "ارفع العرض", tip: "PPTX أو الصق المخطط." },
      { step: "الذكاء الاصطناعي يولد الملاحظات", tip: "إرشاد متحدث لكل شريحة." },
      { step: "راجع وخصص", tip: "عدّل الملاحظات لتطابق أسلوبك." },
      { step: "مارس وقدّم", tip: "استخدم الملاحظات أثناء التقديم." },
    ],
    faq: [
      { q: "طول الملاحظة؟", a: "قابل للتخصيص—نقاط موجزة أو نص كامل." },
      { q: "لغات متعددة؟", a: "نعم، الإنجليزية، العربية، الإسبانية." },
      { q: "صيغة طباعة؟", a: "نعم، صدّر كـ PDF مع ملاحظات." },
      { q: "وضع التلقين؟", a: "نعم، اعرض الملاحظات أثناء التقديم." },
    ],
    suggestedPrompts: [
      "ولّد ملاحظات متحدث لعرض مبيعات",
      "أضف ملاحظات مقدم لعرض تدريبي",
      "أنشئ نصًا لعرض مؤتمر",
    ],
    related: ["ai-presentation-generator", "training-workshop-slides"],
  },

  // 51) Scanned PDF to Slides (EN)
  {
    locale: "en",
    slug: "scanned-pdf-to-slides",
    alt: { ar: "scanned-pdf-to-slides" },
    h1: "Scanned PDF to Slides",
    title: "Scanned PDF to Slides — OCR to PowerPoint (AI)",
    description:
      "Convert scanned PDFs and images into editable presentation slides with OCR technology.",
    heroPitch: "Scan → OCR → Slides. Turn printed materials into digital presentations.",
    keywords: [
      "scanned pdf to ppt",
      "ocr to powerpoint",
      "image to slides",
      "scan to presentation"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 12, prompt: "Convert scanned document to slides..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "OCR accuracy", desc: "99%+ text recognition." },
      { title: "Multi-language", desc: "English, Arabic, Spanish OCR." },
      { title: "Layout preservation", desc: "Maintains original structure." },
      { title: "Image extraction", desc: "Photos and diagrams included." },
    ],
    howto: [
      { step: "Upload scanned PDF", tip: "Or photos of documents." },
      { step: "AI performs OCR", tip: "Extracts text and images." },
      { step: "Generate slides", tip: "Content structured automatically." },
      { step: "Edit & export", tip: "Refine text and download PPTX." },
    ],
    faq: [
      { q: "Image quality?", a: "Works with 150+ DPI scans." },
      { q: "Handwritten notes?", a: "Limited support, typed text best." },
      { q: "Table recognition?", a: "Yes, tables converted to structured format." },
      { q: "Batch processing?", a: "Yes, multiple PDFs at once." },
    ],
    suggestedPrompts: [
      "Convert scanned meeting notes to slides",
      "OCR handout to presentation",
      "Digitize printed report as PPT",
    ],
    related: ["pdf-to-powerpoint", "convert-word-to-ppt"],
  },

  // 52) Scanned PDF to Slides (AR)
  {
    locale: "ar",
    slug: "scanned-pdf-to-slides",
    alt: { en: "scanned-pdf-to-slides" },
    h1: "تحويل PDF الممسوح ضوئيًا إلى شرائح",
    title: "PDF ممسوح إلى شرائح — OCR إلى PowerPoint (ذكاء اصطناعي)",
    description:
      "حوّل PDFs الممسوحة والصور إلى شرائح عرض قابلة للتحرير بتقنية OCR.",
    heroPitch: "مسح ← OCR ← شرائح. حوّل المواد المطبوعة إلى عروض رقمية.",
    keywords: [
      "pdf ممسوح إلى ppt",
      "ocr إلى باوربوينت",
      "صورة إلى شرائح",
      "مسح إلى عرض"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 12, prompt: "حوّل مستند ممسوح إلى شرائح..." },
    hideControls: ["backend", "slidesCount"],
    features: [
      { title: "دقة OCR", desc: "تعرف نصي بدقة أكثر من 99%." },
      { title: "متعدد اللغات", desc: "OCR للإنجليزية، العربية، الإسبانية." },
      { title: "حفظ التخطيط", desc: "يحافظ على البنية الأصلية." },
      { title: "استخراج الصور", desc: "الصور والرسوم مضمنة." },
    ],
    howto: [
      { step: "ارفع PDF ممسوح", tip: "أو صور للمستندات." },
      { step: "الذكاء الاصطناعي يجري OCR", tip: "يستخرج النصوص والصور." },
      { step: "ولّد الشرائح", tip: "المحتوى منظم تلقائيًا." },
      { step: "عدّل وصدّر", tip: "حسّن النص وحمّل PPTX." },
    ],
    faq: [
      { q: "جودة الصورة؟", a: "يعمل مع مسح 150+ DPI." },
      { q: "ملاحظات يدوية؟", a: "دعم محدود، النص المطبوع الأفضل." },
      { q: "تعرف على الجداول؟", a: "نعم، الجداول تُحول لصيغة منظمة." },
      { q: "معالجة دفعات؟", a: "نعم، عدة PDFs دفعة واحدة." },
    ],
    suggestedPrompts: [
      "حوّل ملاحظات اجتماع ممسوحة لشرائح",
      "OCR نشرة لعرض تقديمي",
      "رقمن تقرير مطبوع كـ PPT",
    ],
    related: ["pdf-to-powerpoint", "convert-word-to-ppt"],
  },

  // 53) Team Collaboration on Decks (EN)
  {
    locale: "en",
    slug: "team-collaboration-decks",
    alt: { ar: "team-collaboration-decks" },
    h1: "Team Collaboration on Decks",
    title: "Team Collaboration on Decks — Create, Edit, Share (AI Presentation Maker)",
    description:
      "Collaborate with your team on presentations in real-time. AI-powered, cloud-based workspace.",
    heroPitch: "Build decks together—real-time editing, comments, version history.",
    keywords: [
      "team presentation collaboration",
      "shared deck workspace",
      "collaborative presentation tool",
      "team powerpoint"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "en", slidesCount: 10, prompt: "Team presentation about..." },
    hideControls: ["backend"],
    features: [
      { title: "Real-time editing", desc: "Multiple users edit simultaneously." },
      { title: "Comments & feedback", desc: "Inline comments on slides." },
      { title: "Version history", desc: "Track all changes and restore." },
      { title: "Role permissions", desc: "Editor, viewer, commenter roles." },
    ],
    howto: [
      { step: "Create workspace", tip: "Invite team members." },
      { step: "Build deck together", tip: "Real-time collaboration." },
      { step: "Review & approve", tip: "Comment and suggest edits." },
      { step: "Export final version", tip: "Download PPTX when ready." },
    ],
    faq: [
      { q: "How many team members?", a: "Team plan supports unlimited users." },
      { q: "Access control?", a: "Yes, set permissions per user." },
      { q: "Offline editing?", a: "No, requires internet connection." },
      { q: "Integration with tools?", a: "Yes, Slack, Teams, Google Workspace." },
    ],
    suggestedPrompts: [
      "Team sales proposal collaboration",
      "Shared pitch deck workspace",
      "Collaborative training deck",
    ],
    related: ["ai-presentation-generator", "sales-proposal-presentation"],
  },

  // 54) Team Collaboration on Decks (AR)
  {
    locale: "ar",
    slug: "team-collaboration-decks",
    alt: { en: "team-collaboration-decks" },
    h1: "تعاون الفريق على العروض",
    title: "تعاون الفريق على العروض — أنشئ، عدّل، شارك (صانع عروض بالذكاء الاصطناعي)",
    description:
      "تعاون مع فريقك على العروض التقديمية في الوقت الفعلي. مساحة عمل سحابية بالذكاء الاصطناعي.",
    heroPitch: "ابن العروض معًا—تحرير فوري، تعليقات، تاريخ الإصدارات.",
    keywords: [
      "تعاون فريق على عروض",
      "مساحة عمل عرض مشتركة",
      "أداة عرض تعاونية",
      "باوربوينت فريق"
    ],
    defaults: { backendBaseUrl: "http://localhost:8000", language: "ar", slidesCount: 10, prompt: "عرض فريق عن..." },
    hideControls: ["backend"],
    features: [
      { title: "تحرير فوري", desc: "عدة مستخدمين يحررون في نفس الوقت." },
      { title: "تعليقات وملاحظات", desc: "تعليقات مضمنة على الشرائح." },
      { title: "تاريخ الإصدارات", desc: "تتبع جميع التغييرات والاستعادة." },
      { title: "أذونات الأدوار", desc: "أدوار محرر، مشاهد، معلق." },
    ],
    howto: [
      { step: "أنشئ مساحة عمل", tip: "ادع أعضاء الفريق." },
      { step: "ابن العرض معًا", tip: "تعاون في الوقت الفعلي." },
      { step: "راجع واعتمد", tip: "علّق واقترح تعديلات." },
      { step: "صدّر النسخة النهائية", tip: "حمّل PPTX عند الجاهزية." },
    ],
    faq: [
      { q: "كم عدد أعضاء الفريق؟", a: "خطة الفريق تدعم مستخدمين غير محدودين." },
      { q: "التحكم بالوصول؟", a: "نعم، عيّن أذونات لكل مستخدم." },
      { q: "تحرير دون اتصال؟", a: "لا، يتطلب اتصال بالإنترنت." },
      { q: "التكامل مع الأدوات؟", a: "نعم، Slack، Teams، Google Workspace." },
    ],
    suggestedPrompts: [
      "تعاون فريق على عرض مبيعات",
      "مساحة عمل عرض استثماري مشتركة",
      "عرض تدريبي تعاوني",
    ],
    related: ["ai-presentation-generator", "sales-proposal-presentation"],
  },
];
