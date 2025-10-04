import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import SlidesWorkbench from "@/app/slides/page"; // reuse your existing workbench

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "واجهة الشرائح" : "Slides Workbench",
    alternates: {
      canonical: `/${params.locale}/slides`,
      languages: {
        "en-US": "/en/slides",
        "ar-KW": "/ar/slides",
      },
    },
  };
}

export default function Page() {
  // Reuse your current /slides UI as-is
  return <SlidesWorkbench />;
}
