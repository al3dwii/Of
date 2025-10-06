// -----------------------------------------------------------------------------
//  FeatureSectionEn
//  • Three quick‑hit selling points that appear under the converter
//  • Uses tool-specific content from tool-content.json when available
//  • Falls back to generic features if tool-specific content not found
// -----------------------------------------------------------------------------

import type { Converter as ConverterRow } from "@/lib/server/converters";
import type { Feature } from "@/lib/server/tool-content";

type Props = { 
  row: ConverterRow;
  customFeatures?: Feature[];
};

// Default generic features as fallback
const defaultFeatures: Feature[] = [
  {
    title: "Drag & Drop",
    description: "Simply drop your file and conversion starts instantly—no sign‑up required."
  },
  {
    title: "Keeps Your Formatting",
    description: "Fonts, images, charts and layouts stay exactly the way you designed them—zero re‑work needed."
  },
  {
    title: "Handles Large Files",
    description: "Convert files up to 500 MB in a single upload—or batch multiple files with our Pro plan."
  }
];

export default function FeatureSectionEn({ row, customFeatures }: Props) {
  const features = customFeatures || defaultFeatures;

  return (
    <section className="grid md:grid-cols-3 gap-4 text-left">
      {features.map((feature, idx) => (
        <div 
          key={idx}
          className={`p-4 border rounded ${idx % 2 === 0 ? 'bg-muted/20' : ''}`}
        >
          <h3 className="font-bold mb-1">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
