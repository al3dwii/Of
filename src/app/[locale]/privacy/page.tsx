// Localized Privacy page
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";

export async function generateMetadata({
  params,
}: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "الخصوصية" : "Privacy",
    description: isAr
      ? "نحترم خصوصيتك. تعرّف على كيفية جمعنا للبيانات واستخدامها وحمايتها."
      : "We respect your privacy. Learn how we collect, use, and protect data.",
    alternates: { canonical: `/${params.locale}/privacy` },
  };
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";
  return (
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-4">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
      <div className="space-y-4 opacity-90">
        <p>
          {isAr
            ? "نستخدم بياناتك لتقديم الخدمة وتحسينها فقط. لا نبيع بياناتك ولا نشاركها إلا عند الضرورة التشغيلية."
            : "We use your data only to provide and improve the service. We never sell your data and only share when operationally necessary."}
        </p>
        <p>
          {isAr
            ? "يتم حذف الملفات المرفوعة والنتائج تلقائياً وفق سياسات الاحتفاظ لدينا أو عند طلبك."
            : "Uploaded files and generated outputs are automatically deleted per our retention policies or upon your request."}
        </p>
        <p>
          {isAr
            ? "للاستفسارات المتعلقة بالخصوصية، راسلنا عبر البريد الموضح في تذييل الموقع."
            : "For privacy inquiries, contact us via the email listed in the site footer."}
        </p>
      </div>
    </main>
  );
}
