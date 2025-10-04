// Locale home (/en, /ar) – lists featured landings for that locale
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/data/locales";
import { slidesLandings } from "@/data/landings.slides";



export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "الصفحة الرئيسية" : "Home",
    description: isAr
      ? "حوّل المستندات إلى عروض تقديمية وفيديو باستخدام الذكاء الاصطناعي."
      : "Turn documents into slides and video with AI.",
    alternates: {
      canonical: `/${params.locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l === "ar" ? "ar-KW" : "en-US", `/${l}`])
      ),
    },
  };
}

export default function LocaleHome({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isAr = locale === "ar";
  const featured = slidesLandings.filter((x) => x.locale === locale).slice(0, 6);

  const ar = slidesLandings.find((x) => x.locale === "ar");
  const en = slidesLandings.find((x) => x.locale === "en");

  return (
    
    
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      {/* <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          {isAr ? "حوِّل المستندات إلى عروض وفيديو" : "Create Slides & Video from Docs"}
        </h1>
        <p className="mt-2 opacity-80">
          {isAr
            ? "ارفع ملفًا أو اكتب موضوعًا وسيُنشئ النظام عرضًا جاهزًا خلال لحظات."
            : "Upload a file or write a topic; get a clean deck in seconds."}
        </p>
      </header> */}

      {/* <section className="mb-10 flex flex-wrap gap-3">
        <Link className="rounded-md bg-white text-black px-4 py-2 font-medium" href="/slides">
          {isAr ? "فتح واجهة الشرائح" : "Open Slides Workbench"}
        </Link>
        <Link className="rounded-md border border-white/20 px-4 py-2 font-medium" href="/video">
          {isAr ? "فتح واجهة الفيديو" : "Open Video Workbench"}
        </Link>
      </section> */}

      

       <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Create slides & videos with AI
        </h1>
        <p className="mt-4 text-lg opacity-80">
          Upload a document or paste a topic. We turn it into clean, branded content—fast.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            className="rounded-md bg-white text-black px-5 py-3 font-medium"
            href="/slides"
          >
            Open Slides Workbench
          </Link>
          <Link
            className="rounded-md border border-white/20 px-5 py-3 font-medium"
            href="/video"
          >
            Open Video Workbench
          </Link>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Popular landings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ar && (
            <Link
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
              href={`/${ar.locale}/slides/${encodeURIComponent(ar.slug)}`}
            >
              <div className="text-sm opacity-70 mb-1">Arabic</div>
              <div className="font-semibold">{ar.h1}</div>
              <div className="text-sm opacity-70 mt-1">{ar.description}</div>
            </Link>
          )}
          {en && (
            <Link
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
              href={`/${en.locale}/slides/${encodeURIComponent(en.slug)}`}
            >
              <div className="text-sm opacity-70 mb-1">English</div>
              <div className="font-semibold">{en.h1}</div>
              <div className="text-sm opacity-70 mt-1">{en.description}</div>
            </Link>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          {isAr ? "صفحات شائعة" : "Popular Landings"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.map((n) => (
            <Link
              key={n.slug}
              href={`/${n.locale}/slides/${encodeURIComponent(n.slug)}`}
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
            >
              <div className="font-semibold">{n.h1}</div>
              <div className="text-sm opacity-70 mt-1">{n.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Site-level JSON-LD (WebSite + SearchAction) */}
      <Script
        id={`ld-website-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://yoursite.com",
            name: isAr
              ? "O"
              : "O",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://yoursite.com/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>

  );
}
