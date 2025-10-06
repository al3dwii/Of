// src/components/landing/FeatureSectionAr.tsx
import type { Converter as ConverterRow } from "@/lib/server/converters";
import type { Feature } from "@/lib/server/tool-content";

/* Default generic features */
const defaultFeatures: Feature[] = [
  {
    title: "الذكاء الاصطناعي",
    description: "الذكاء الاصطناعي يحول النص إلى شرائح مرتبة وجاهزة للعرض."
  },
  {
    title: "تحويل بدون برامج",
    description: "يعمل مباشرة داخل المتصفح دون أي تنصيب."
  },
  {
    title: "يحافظ على التنسيق",
    description: "يحفظ الخطوط والألوان والجداول دون تغيير."
  }
];

type Props = { 
  row: ConverterRow;
  customFeatures?: Feature[];
};

export default function FeatureSectionAr({ row, customFeatures }: Props) {
  const features = customFeatures || defaultFeatures;

  return (
    <section dir="rtl" className="grid md:grid-cols-3 gap-4 text-right">
      {features.map((feature, idx) => (
        <div key={idx} className="p-4 border rounded">
          <h3 className="font-bold mb-1">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
