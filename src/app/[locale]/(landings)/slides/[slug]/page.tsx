// src/app/[locale]/(landings)/slides/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import RelatedLinks from "@/components/RelatedLinks";
import { slidesLandings } from "@/data/landings.slides";
import type { Locale } from "@/data/locales";

type Params = { locale: Locale; slug: string };





export const dynamicParams = false;

export async function generateStaticParams() {
  return slidesLandings.map(({ locale, slug }) => ({ locale, slug }));
}


// inside src/app/[locale]/(landings)/slides/[slug]/page.tsx

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const node = slidesLandings.find((x) => x.locale === params.locale && x.slug === params.slug);
  if (!node) return {};

  // Find counterpart with the same canonical slug
  const other = slidesLandings.find((n) => n.slug === node.slug && n.locale !== node.locale);

  const languages: Record<string, string> = {
    [node.locale === "ar" ? "ar-KW" : "en-US"]:
      `/${node.locale}/slides/${encodeURIComponent(node.slug)}`,
  };
  if (other) {
    languages[other.locale === "ar" ? "ar-KW" : "en-US"] =
      `/${other.locale}/slides/${encodeURIComponent(other.slug)}`;
  }

  return {
    title: node.title,
    description: node.description,
    keywords: node.keywords,
    alternates: {
      canonical: `/${node.locale}/slides/${encodeURIComponent(node.slug)}`,
      languages,
    },
    openGraph: {
      title: node.title,
      description: node.description,
      url: `/${node.locale}/slides/${encodeURIComponent(node.slug)}`,
      type: "website",
      images: [{ url: `/api/og?type=slides&slug=${encodeURIComponent(node.slug)}&locale=${node.locale}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: node.title,
      description: node.description,
      images: [`/api/og?type=slides&slug=${encodeURIComponent(node.slug)}&locale=${node.locale}`],
    },
  };
}

export default function SlidesLanding({ params }: { params: Params }) {
  const node = slidesLandings.find((x) => x.locale === params.locale && x.slug === params.slug);
  if (!node) return notFound();

  const isAr = params.locale === "ar";

  // Build CTA → workbench with presets
  const qs = new URLSearchParams();
  if (node.defaults?.language) qs.set("lang", node.defaults.language);
  if (node.defaults?.slidesCount) qs.set("count", String(node.defaults.slidesCount));
  qs.set("prompt", (node.defaults?.prompt ?? node.h1) || "");
  const workbenchHref = `/slides?${qs.toString()}`;

  // -------- NEW: prefer dataset features/prompts, fallback to defaults --------
  const defaultFeatures = isAr
    ? [
        { title: "يحافظ على العناوين والقوائم", desc: "تتحول العناوين إلى شرائح والقوائم إلى نقاط تلقائيًا." },
        { title: "دعم العربية والإنجليزية", desc: "تخطيط RTL للعربية و LTR للإنجليزية بدون تشوهات." },
        { title: "تصدير PPTX / PDF", desc: "حمّل العرض النهائي كـ PPTX أو PDF بسهولة." },
        { title: "جودة سريعة وموثوقة", desc: "تجربة خفيفة وسريعة مع ضوابط واضحة." },
      ]
    : [
        { title: "Preserves structure", desc: "Headings become titles and lists become bullets—automatically." },
        { title: "Arabic & English", desc: "Clean RTL (Arabic) and LTR (English) output without layout glitches." },
        { title: "Export PPTX / PDF", desc: "Download your deck in editable PPTX or shareable PDF." },
        { title: "Fast and reliable", desc: "Smooth generation with clear progress and results." },
      ];
  const features = node.features?.length ? node.features : defaultFeatures;

  const defaultHowTo = isAr
    ? [{ step: "ارفع ملف .docx" }, { step: "اختر القالب واللغة" }, { step: "اضغط توليد ثم حمّل PPTX" }]
    : [{ step: "Upload a .docx" }, { step: "Pick theme & language" }, { step: "Generate and download PPTX" }];
  const howto = (node.howto?.length ? node.howto : defaultHowTo) as { step: string; tip?: string }[];

  const defaultFaq = isAr
    ? [
        { q: "هل يحافظ على التنسيق؟", a: "نعم—العناوين تصبح عناوين الشرائح والقوائم تتحول إلى نقاط تلقائيًا." },
        { q: "هل الأداة مجانية؟", a: "يوجد مستوى مجاني بعلامة مائية؛ الخطط المدفوعة تزيلها وتضيف مزايا." },
      ]
    : [
        { q: "Is formatting preserved?", a: "Yes—headings map to titles and lists become bullets automatically." },
        { q: "Is it free?", a: "Free tier includes a watermark; paid tiers remove it and add features." },
      ];
  const faq = node.faq?.length ? node.faq : defaultFaq;

  const defaultSuggested = isAr
    ? ["خطة درس: مقدمة في الذكاء الاصطناعي", "سيرة ذاتية مهنية مختصرة إلى عرض شرائح", "خطة عمل لمتجر إلكتروني"]
    : ["Lesson plan: Intro to AI", "Short CV → slide deck", "Business plan for an online store"];
  const suggestedPrompts = node.suggestedPrompts?.length ? node.suggestedPrompts : defaultSuggested;

  const promptLinks = suggestedPrompts.slice(0, 6).map((p) => {
    const sp = new URLSearchParams(qs);
    sp.set("prompt", p);
    return { href: `/slides?${sp.toString()}`, text: p };
  });

  // Breadcrumbs (UI + JSON-LD)
  const crumbs = [
    { name: isAr ? "الرئيسية" : "Home", href: `/${params.locale}` },
    { name: isAr ? "الشرائح" : "Slides", href: "/slides" },
    { name: node.h1, href: `/${params.locale}/slides/${encodeURIComponent(node.slug)}` },
  ];

  return (
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumbs */}
      <nav aria-label={isAr ? "مسار التنقل" : "Breadcrumb"} className="mb-6 text-sm opacity-80">
        <ol className="flex flex-wrap gap-1">
          {crumbs.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              <Link href={c.href} className="hover:underline">{c.name}</Link>
              {i < crumbs.length - 1 && <span className="opacity-50">/</span>}
            </li>
          ))}
        </ol>
      </nav>

      {/* Hero */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{node.h1}</h1>
        {node.description && <p className="mt-3 text-lg opacity-80 max-w-3xl">{node.description}</p>}
      </header>

      {/* CTA */}
      <section className="rounded-xl border border-white/10 bg-black/25 p-5 md:p-6 mb-10">
        {node.heroPitch && <p className="opacity-80 mb-3">{node.heroPitch}</p>}
        <div className="flex flex-wrap gap-3 items-center">
          <Link href={workbenchHref} className="rounded-md bg-white text-black px-5 py-3 font-medium">
            {isAr ? "ابدأ الآن" : "Start now"}
          </Link>
          <Link href="/slides" className="rounded-md border border-white/20 px-5 py-3 font-medium">
            {isAr ? "فتح الواجهة" : "Open workbench"}
          </Link>
          <span className="text-xs opacity-60">
            {isAr ? "سيفتح الرابط الواجهة مع إعدادات مقترحة." : "Opens the workbench with suggested presets."}
          </span>
        </div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{isAr ? "المزايا" : "Why this tool"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-white/10 p-4 bg-black/20">
              <div className="font-semibold">{f.title}</div>
              <div className="opacity-80 text-sm mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{isAr ? "طريقة العمل" : "How it works"}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 list-decimal list-inside">
          {howto.map((s, i) => (
            <li key={i} className="rounded-lg border border-white/10 p-4 bg-black/20">
              <div className="font-medium">{s.step}</div>
              {s.tip && <div className="opacity-70 text-sm mt-1">{s.tip}</div>}
            </li>
          ))}
        </ol>
      </section>

      {/* Suggested prompts */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">{isAr ? "جرّب سريعًا" : "Try a quick start"}</h2>
        <ul className="flex flex-wrap gap-2">
          {promptLinks.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="inline-block rounded-full border border-white/15 px-3 py-1 text-sm hover:border-white/40"
              >
                {p.text}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Related */}
      {node.related?.length ? (
        <RelatedLinks
          locale={params.locale}
          slugs={node.related}
          dir={isAr ? "rtl" : "ltr"}
          title={isAr ? "روابط ذات صلة" : "Related"}
        />
      ) : null}

      {/* JSON-LD */}
      <StructuredData
        items={[
          {
            "@type": "WebPage",
            name: node.h1,
            description: node.description,
            keywords: node.keywords?.join(", "),
            url: `/${params.locale}/slides/${encodeURIComponent(node.slug)}`,
            inLanguage: isAr ? "ar" : "en",
            isPartOf: { "@type": "WebSite", name: "YourSite" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              item: c.href,
            })),
          },
          {
            "@type": "SoftwareApplication",
            name: node.h1,
            applicationCategory: "BusinessApplication",
            operatesOn: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: node.description,
            url: `/${params.locale}/slides/${encodeURIComponent(node.slug)}`,
          },
          howto.length && {
            "@type": "HowTo",
            name: node.h1,
            step: howto.map((s) => ({
              "@type": "HowToStep",
              name: s.step,
              text: s.tip ?? s.step,
            })),
          },
          faq.length && {
            "@type": "FAQPage",
            mainEntity: faq.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          },
        ].filter(Boolean)}
      />
    </main>
  );
}
