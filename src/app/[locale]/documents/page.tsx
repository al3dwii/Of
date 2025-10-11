import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import DocumentsWorkbench from "@/app/[locale]/oldpage/documents/page";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  const isEs = params.locale === "es";
  
  const title = isAr ? "أداة معالجة المستندات" : isEs ? "Herramienta de Procesamiento de Documentos" : "Document Processing Tool";
  const description = isAr 
    ? "معالجة وتحويل مستندات Word و Excel باستخدام الذكاء الاصطناعي"
    : isEs
    ? "Procesa y convierte documentos de Word y Excel usando IA"
    : "Process and convert Word and Excel documents using AI";
  
  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/documents`,
      languages: {
        "en-US": "/en/documents",
        "ar-KW": "/ar/documents",
        "es-ES": "/es/documents",
      },
    },
  };
}

export default function Page() {
  return <DocumentsWorkbench />;
}
