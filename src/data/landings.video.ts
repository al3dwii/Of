import type { Locale } from "./locales";

export type VideoLanding = {
  locale: Locale;
  slug: string;
  h1: string;
  title: string;
  description: string;
  alt?: { en?: string; ar?: string };
  defaults?: {
    prompt?: string;
    language?: "en" | "ar";
  };
  howto?: { step: string; tip?: string }[];
  faq?: { q: string; a: string }[];
  related?: string[];
};

export const videoLandings: VideoLanding[] = [
  // 1) Text → Video (AR)
  {
    locale: "ar",
    slug: "تحويل-نص-الى-فيديو",
    alt: { en: "text-to-video" },
    h1: "تحويل النص إلى فيديو بالذكاء الاصطناعي",
    title: "تحويل نص إلى فيديو — تعليق صوتي وعناوين تلقائية",
    description:
      "اكتب نصًا قصيرًا وسيتم إنشاء فيديو مع لقطات مناسبة وعناوين وترجمة.",
    defaults: { language: "ar", prompt: "نص قصير عن التعلم الإلكتروني" },
    howto: [
      { step: "اكتب النص أو الصقه" },
      { step: "اختر المدة والنبرة" },
      { step: "أنشئ الفيديو وحمّله" },
    ],
    faq: [
      { q: "هل يدعم لهجات عربية؟", a: "ندعم العربية الفصحى حاليًا." },
    ],
    related: ["text-to-video"],
  },

  // 2) Text → Video (EN)
  {
    locale: "en",
    slug: "text-to-video",
    alt: { ar: "تحويل-نص-الى-فيديو" },
    h1: "Text to Video (AI)",
    title: "Text to Video — Auto voiceover & captions",
    description:
      "Paste a short script and get an auto-edited video with captions and music.",
    defaults: { language: "en", prompt: "Short script about e-learning" },
    howto: [
      { step: "Paste your script" },
      { step: "Choose duration and tone" },
      { step: "Generate and download" },
    ],
    faq: [
      { q: "Do you add music?", a: "Yes, with volume ducking under the voiceover." },
    ],
    related: ["تحويل-نص-الى-فيديو"],
  },

  // 3) PPT → Video (EN)
  {
    locale: "en",
    slug: "powerpoint-to-video",
    alt: { ar: "تحويل-بوربوينت-الى-فيديو" },
    h1: "PowerPoint to Video",
    title: "Turn a PowerPoint deck into a narrated video",
    description:
      "Upload PPTX and we produce a paced video with slides, captions, and optional narration.",
    defaults: { language: "en" },
    howto: [
      { step: "Upload PPTX" },
      { step: "Pick narration & music" },
      { step: "Render and download" },
    ],
  },

  // 4) PPT → Video (AR)
  {
    locale: "ar",
    slug: "تحويل-بوربوينت-الى-فيديو",
    alt: { en: "powerpoint-to-video" },
    h1: "تحويل بوربوينت إلى فيديو",
    title: "حوّل الشرائح إلى فيديو مع تعليق صوتي",
    description:
      "ارفع ملف PPTX وسيتم إنشاء فيديو متدرج بعناوين وتعليق صوتي اختياري.",
    defaults: { language: "ar" },
  },
];
