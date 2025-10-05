import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import PDFWorkbench from "@/app/pdf/page";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  const isEs = params.locale === "es";
  
  const title = isAr ? "أداة تحويل PDF" : isEs ? "Herramienta de Conversión PDF" : "PDF Conversion Tool";
  const description = isAr 
    ? "تحويل ملفات PDF من وإلى تنسيقات مختلفة باستخدام الذكاء الاصطناعي"
    : isEs
    ? "Convierte archivos PDF desde y hacia diferentes formatos usando IA"
    : "Convert PDF files to and from different formats using AI";
  
  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/pdf`,
      languages: {
        "en-US": "/en/pdf",
        "ar-KW": "/ar/pdf",
        "es-ES": "/es/pdf",
      },
    },
  };
}

export default function Page() {
  return <PDFWorkbench />;
}
