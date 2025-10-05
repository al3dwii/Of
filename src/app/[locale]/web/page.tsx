import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import WebWorkbench from "@/app/web/page";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  const isEs = params.locale === "es";
  
  const title = isAr ? "أداة تحويل الويب" : isEs ? "Herramienta de Conversión Web" : "Web Conversion Tool";
  const description = isAr 
    ? "تحويل HTML و URL إلى عروض تقديمية باستخدام الذكاء الاصطناعي"
    : isEs
    ? "Convierte HTML y URL a presentaciones usando IA"
    : "Convert HTML and URLs to presentations using AI";
  
  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/web`,
      languages: {
        "en-US": "/en/web",
        "ar-KW": "/ar/web",
        "es-ES": "/es/web",
      },
    },
  };
}

export default function Page() {
  return <WebWorkbench />;
}
