import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import VideoWorkbench from "@/app/[locale]/oldpage/video/page"; // reuse your existing workbench

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "واجهة الفيديو" : "Video Workbench",
    alternates: {
      canonical: `/${params.locale}/video`,
      languages: {
        "en-US": "/en/video",
        "ar-KW": "/ar/video",
      },
    },
  };
}

export default function Page() {
  return <VideoWorkbench />;
}
