import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { getPageCopy } from "@/utils/copy";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "الأسئلة الشائعة" : "FAQ",
    description: isAr
      ? "إجابات عن أكثر الأسئلة شيوعًا حول إنشاء العروض والفيديو بالذكاء الاصطناعي."
      : "Answers to common questions about AI slide & video generation.",
    alternates: {
      canonical: `/${params.locale}/faq`,
    },
  };
}

export default function FAQPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";
  const items = isAr
    ? [
        { q: "هل الأداة مجانية؟", a: "يوجد مستوى مجاني مع علامة مائية، والباقات المدفوعة تزيل العلامة." },
        { q: "هل أحافظ على تنسيق المستند؟", a: "نعم، العناوين والقوائم تتحول تلقائيًا إلى شرائح منظمة." },
        { q: "هل تدعم العربية والإنجليزية؟", a: "نعم، ندعم اللغتين مع تخطيط RTL للعربية." },
      ]
    : [
        { q: "Is it free?", a: "There’s a free tier with a watermark; paid tiers remove it and add features." },
        { q: "Do you preserve formatting?", a: "Yes—headings become titles and lists become bullets automatically." },
        { q: "Do you support Arabic & English?", a: "Yes, with RTL layout for Arabic." },
      ];

  return (
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-4">{isAr ? "الأسئلة الشائعة" : "FAQ"}</h1>
      <dl className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="rounded-lg border border-white/10 p-4">
            <dt className="font-semibold">{it.q}</dt>
            <dd className="opacity-80 mt-2">{it.a}</dd>
          </div>
        ))}
      </dl>

      <Script
        id={`ld-faq-${params.locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((x) => ({
              "@type": "Question",
              name: x.q,
              acceptedAnswer: { "@type": "Answer", text: x.a },
            })),
          }),
        }}
      />
    </main>
  );
}
