import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import TranslateWorkbench from "@/app/[locale]/oldpage/translate/page";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  const isEs = params.locale === "es";
  
  const title = isAr ? "أداة الترجمة" : isEs ? "Herramienta de Traducción" : "Translation Tool";
  const description = isAr 
    ? "ترجمة العروض التقديمية والمستندات باستخدام الذكاء الاصطناعي"
    : isEs
    ? "Traduce presentaciones y documentos usando IA"
    : "Translate presentations and documents using AI";
  
  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/translate`,
      languages: {
        "en-US": "/en/translate",
        "ar-KW": "/ar/translate",
        "es-ES": "/es/translate",
      },
    },
  };
}

export default function Page() {
  return <TranslateWorkbench />;
}
