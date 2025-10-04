// Localized Terms page
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";

export async function generateMetadata({
  params,
}: { params: { locale: Locale } }): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "الشروط والأحكام" : "Terms",
    description: isAr
      ? "الشروط التي تنظّم استخدامك للخدمة، بما في ذلك الحدود والالتزامات."
      : "The terms governing your use of the service, including limits and obligations.",
    alternates: { canonical: `/${params.locale}/terms` },
  };
}

export default function TermsPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";
  return (
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-4">{isAr ? "الشروط والأحكام" : "Terms & Conditions"}</h1>
      <div className="space-y-4 opacity-90">
        <p>
          {isAr
            ? "باستخدامك للخدمة، فإنك توافق على عدم إساءة الاستخدام أو انتهاك حقوق الملكية الفكرية."
            : "By using the service, you agree not to misuse it or infringe intellectual property rights."}
        </p>
        <p>
          {isAr
            ? "الخدمة مقدمة كما هي، وقد تتغير أو تتوقف مؤقتاً للتحديثات أو الصيانة."
            : "The service is provided as-is and may change or be temporarily unavailable for updates or maintenance."}
        </p>
        <p>
          {isAr
            ? "قد نحدّ من الاستخدام الزائد أو الآلي للحفاظ على استقرار النظام لجميع المستخدمين."
            : "We may limit excessive or automated use to keep the system stable for all users."}
        </p>
      </div>
    </main>
  );
}
