// src/components/landing/FaqAr.tsx
import type { Converter as ConverterRow } from "@/lib/server/converters";
import type { FAQ } from "@/lib/server/tool-content";

/* Generic FAQ data as fallback */
const getGenericFAQ = (row: ConverterRow): FAQ[] => [
  {
    q: 'هل يدعم الموقع اللغة العربية؟',
    a: 'نعم، الواجهة تدعم العربية مع تنسيق شرائح من اليمين إلى اليسار.'
  },
  {
    q: 'هل أحتاج لتنصيب برامج؟',
    a: 'كلا، يتم التحويل بالكامل داخل المتصفح دون أي برامج إضافية.'
  },
  {
    q: `ما هو الحد الأقصى لحجم الملف في ${row.label_ar}؟`,
    a: 'المستخدمون المجانيون حتى \u00A025\u00A0ميجابايت، و\u00A0500\u00A0ميجابايت لمشتركي برو.'
  },
  {
    q: 'هل يتغيّر تنسيق الشرائح؟',
    a: 'لا، نحافظ على الخطوط والصور والتخطيطات كما هي.'
  }
];

type Props = { 
  row: ConverterRow;
  customFAQ?: FAQ[];
};

export default function FaqAr({ row, customFAQ }: Props) {
  const faqs = customFAQ || getGenericFAQ(row);

  return (
    <section dir="rtl" className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">الأسئلة الشائعة</h2>
      {faqs.map(({ q, a }, idx) => (
        <details key={idx} className="p-5 border rounded-lg hover:border-blue-300 transition-colors">
          <summary className="font-semibold cursor-pointer text-lg">{q}</summary>
          <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
        </details>
      ))}
    </section>
  );
}

// Export the generic FAQ generator for other uses (e.g., schema generation)
export const FAQ_AR = getGenericFAQ;
