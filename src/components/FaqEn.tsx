// src/components/FaqEn.tsx
import type { Converter as ConverterRow } from "@/lib/server/converters";
import type { FAQ } from "@/lib/server/tool-content";

/* Generic FAQ data as fallback */
const getGenericFAQ = (row: ConverterRow): FAQ[] => [
  {
    q: `Is there a file‑size limit for ${row.label_en}?`,
    a: "Yes. Free users can convert files up to 25 MB. Pro subscribers get 500 MB."
  },
  {
    q: "Will my formatting be preserved?",
    a: "Yes. We preserve fonts, images, charts and layouts as accurately as possible."
  },
  {
    q: "Are my uploads private?",
    a: "Absolutely. Files are encrypted in transit, stored securely and auto‑deleted within 2 hours."
  },
  {
    q: "Do you have an API?",
    a: "Yes. Check our Developer & Enterprise section for full API documentation."
  }
];

type Props = { 
  row: ConverterRow;
  customFAQ?: FAQ[];
};

export function FaqEn({ row, customFAQ }: Props) {
  const faqs = customFAQ || getGenericFAQ(row);

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
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
export const FAQ_EN = getGenericFAQ;
