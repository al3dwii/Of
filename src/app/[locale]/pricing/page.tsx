// Lightweight pricing page – good trust signal for SEO
import type { Metadata } from "next";
import type { Locale } from "@/data/locales";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "الأسعار" : "Pricing",
    description: isAr
      ? "خطط مرنة لإنشاء العروض والفيديو—ابدأ مجانًا ثم قم بالترقية عند الحاجة."
      : "Flexible plans for slides & video—start free, upgrade when you need.",
    alternates: {
      canonical: `/${params.locale}/pricing`,
    },
  };
}

export default function PricingPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";

  const tiers = isAr
    ? [
        { name: "مجاني", price: "0$", features: ["علامة مائية", "حتى 10 شرائح", "دعم العربية"] },
        { name: "احترافي", price: "15$/شهر", features: ["بدون علامة", "حتى 40 شريحة", "تصدير PPTX/PDF"] },
        { name: "شركة", price: "مخصص", features: ["حدود أعلى", "قوالب مخصصة", "دعم أولوية"] },
      ]
    : [
        { name: "Free", price: "$0", features: ["Watermark", "Up to 10 slides", "Arabic + English"] },
        { name: "Pro", price: "$15/mo", features: ["No watermark", "Up to 40 slides", "Export PPTX/PDF"] },
        { name: "Business", price: "Custom", features: ["Higher limits", "Custom themes", "Priority support"] },
      ];

  return (
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6">{isAr ? "الأسعار" : "Pricing"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-lg border border-white/10 p-5">
            <div className="text-lg font-semibold">{t.name}</div>
            <div className="text-3xl font-extrabold mt-2">{t.price}</div>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              {t.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <button className="mt-5 w-full rounded-md bg-white text-black py-2 font-medium">
              {isAr ? "ابدأ الآن" : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
