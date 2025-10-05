import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import AdminDashboard from "./AdminDashboard";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  const isEs = params.locale === "es";
  
  const title = isAr ? "لوحة تحكم المسؤول" : isEs ? "Panel de Administración" : "Admin Dashboard";
  const description = isAr 
    ? "إدارة المستخدمين والمحتوى والإحصائيات"
    : isEs
    ? "Gestionar usuarios, contenido y estadísticas"
    : "Manage users, content, and analytics";
  
  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/admin`,
      languages: {
        "en-US": "/en/admin",
        "ar-KW": "/ar/admin",
        "es-ES": "/es/admin",
      },
    },
  };
}

export default function Page() {
  // TODO: Add authentication protection
  // Use Clerk's auth() with proper middleware configuration
  // or implement your own authentication check
  
  return <AdminDashboard />;
}
