// Programmatic SEO landing for Video
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import type { Locale } from "@/data/locales";
import { videoLandings } from "@/data/landings.video";

// NOTE: This landing focuses on SEO + CTA → /video workbench.
// If you later have a <VideoCard/> component, render it here similar to SlideCard.

type Params = { locale: Locale; slug: string };

export const dynamicParams = false;

export async function generateStaticParams() {
  return videoLandings.map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const node = videoLandings.find((x) => x.locale === params.locale && x.slug === params.slug);
  if (!node) return {};
  const languages: Record<string, string> = {
    [node.locale === "ar" ? "ar-KW" : "en-US"]: `/${node.locale}/video/${node.slug}`,
  };
  if ((node as any).alt?.en) languages["en-US"] = `/en/video/${(node as any).alt.en}`;
  if ((node as any).alt?.ar) languages["ar-KW"] = `/ar/video/${(node as any).alt.ar}`;

  return {
    title: node.title,
    description: node.description,
    alternates: {
      canonical: `/${node.locale}/video/${node.slug}`,
      languages,
    },
    openGraph: {
      title: node.title,
      description: node.description,
      url: `/${node.locale}/video/${node.slug}`,
      type: "website",
      images: [
        {
          url: `/api/og?type=video&slug=${encodeURIComponent(node.slug)}&locale=${node.locale}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: node.title,
      description: node.description,
      images: [`/api/og?type=video&slug=${encodeURIComponent(node.slug)}&locale=${node.locale}`],
    },
  };
}

export default function VideoLanding({ params }: { params: Params }) {
  const node = videoLandings.find((x) => x.locale === params.locale && x.slug === params.slug);
  if (!node) return notFound();
  const isAr = params.locale === "ar";

  return (
    <main className="container mx-auto px-4 py-8" dir={isAr ? "rtl" : "ltr"}>
      <header className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{node.h1}</h1>
        {node.description && <p className="mt-2 opacity-80">{node.description}</p>}
      </header>

      {/* CTA: route to your /video workbench with optional query presets */}
      <div className="rounded-lg border border-white/10 p-5 bg-black/30">
        <p className="opacity-80 mb-3">
          {isAr
            ? "اضغط للانتقال إلى واجهة الفيديو مع ضبط الإعدادات المقترحة."
            : "Jump into the video workbench with suggested presets."}
        </p>
        <a
          className="inline-block rounded-md bg-white text-black px-4 py-2 font-medium"
          href={`/video?locale=${params.locale}${node.defaults?.prompt ? `&prompt=${encodeURIComponent(node.defaults.prompt)}` : ""}`}
        >
          {isAr ? "فتح واجهة الفيديو" : "Open Video Workbench"}
        </a>
      </div>

      {/* JSON-LD bundle */}
      <Script
        id={`ld-json-video-${params.locale}-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: node.h1,
                applicationCategory: "MultimediaApplication",
                operatesOn: "Web",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                description: node.description,
                url: `/${node.locale}/video/${node.slug}`,
              },
              node.howto && {
                "@type": "HowTo",
                name: node.h1,
                step: node.howto.map((s) => ({
                  "@type": "HowToStep",
                  name: s.step,
                  text: s.tip ?? s.step,
                })),
              },
              node.faq && {
                "@type": "FAQPage",
                mainEntity: node.faq.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              },
            ].filter(Boolean),
          }),
        }}
      />
    </main>
  );
}
