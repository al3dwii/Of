// components/landing/LandingCopyEn.tsx
import type { Converter as ConverterRow } from '@/lib/server/converters';
import type { Copy } from '@/lib/server/tool-content';
import { getEnVariations } from '@/utils/variations';

type Props = { 
  row: ConverterRow;
  customCopy?: Copy;
};

export default function LandingCopyEn({ row, customCopy }: Props) {
  const variations = getEnVariations(row.label_en, row.dir);
  const dirReadable = row.dir.replace('→', ' to ');

  // Use custom copy if available, otherwise use generic
  if (customCopy) {
    return (
      <section className="prose mx-auto space-y-6 max-w-4xl">
        <p className="text-lg">
          <strong>{customCopy.intro}</strong>
        </p>

        <div>
          <h2 className="text-2xl font-bold mb-3">Key Benefits</h2>
          <ul className="space-y-2">
            {customCopy.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">Common Use Cases</h2>
          <ul className="space-y-2">
            {customCopy.use_cases.map((useCase, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-purple-600 mr-2">→</span>
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        <p className="sr-only">{variations.join(', ')}</p>
      </section>
    );
  }

  // Generic fallback content
  return (
    <section className="prose mx-auto space-y-4">
      <p>
        <strong>{row.label_en}</strong> is a fast online service to convert {dirReadable}.
        Keep your original fonts, images and layout—no desktop software required.
      </p>

      <h2>How it works</h2>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Upload your file via drag-and-drop or "Choose file".</td></tr>
          <tr><td>2</td><td>AI processes your content automatically.</td></tr>
          <tr><td>3</td><td>Customize the output (colors, fonts, layout).</td></tr>
          <tr><td>4</td><td>Download the converted file or share via link.</td></tr>
        </tbody>
      </table>

      <h2>Why choose this tool?</h2>
      <ul>
        <li>⏱️ Super-fast processing in seconds.</li>
        <li>🛡️ Secure uploads over HTTPS; files auto-delete.</li>
        <li>🤖 AI organizes content intelligently.</li>
        <li>🌐 Full RTL/Arabic and multilingual support.</li>
      </ul>

      <p className="sr-only">{variations.join(', ')}</p>
    </section>
  );
}
