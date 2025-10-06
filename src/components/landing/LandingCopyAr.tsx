// components/landing/LandingCopyAr.tsx
import type { Converter as ConverterRow } from '@/lib/server/converters';
import type { Copy } from '@/lib/server/tool-content';
import { getArVariations } from '@/utils/variations';
import { dirReadable } from '@/utils/dirReadable';

type Props = { 
  row: ConverterRow;
  customCopy?: Copy;
};

export default function LandingCopyAr({ row, customCopy }: Props) {
  const variations = getArVariations(row.label_ar, row.dir);
  const dirText = dirReadable(row.dir, 'ar');
  const extraIntro = row.intro_ar?.trim();

  // If custom copy exists, use the custom layout
  if (customCopy) {
    return (
      <section dir="rtl" className="prose rtl:max-w-none mx-auto space-y-6 text-right">
        <p className="text-lg leading-relaxed">{customCopy.intro}</p>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">المزايا الرئيسية</h2>
          <ul className="space-y-2">
            {customCopy.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">حالات الاستخدام الشائعة</h2>
          <ul className="space-y-2">
            {customCopy.use_cases.map((useCase, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">←</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // Generic fallback layout
  return (
    <section dir="rtl" className="prose rtl:max-w-none mx-auto space-y-4">
      <p className="leading-relaxed">
        <strong>{row.label_ar}</strong> هي خدمة سحابية مدعومة بالذكاء الاصطناعي لتحويل&nbsp;
        {dirText} في ثوانٍ، مع الحفاظ التامّ على الخطوط، الصور، الجداول، والروابط
        كما هي في المستند الأصلي.
      </p>

      {extraIntro && (
        <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: extraIntro }} />
      )}

      <h2>خطوات الاستخدام</h2>
      <table>
        <thead>
          <tr>
            <th>الخطوة</th>
            <th>الوصف</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>التسجيل/تسجيل الدخول إلى حسابك.</td></tr>
          <tr><td>2</td><td>رفع الملف عبر السحب-والإفلات أو زر «اختر ملف».</td></tr>
          <tr><td>3</td><td>اختيار قالب جاهز أو تفعيل الاقتراح الذكي للتصميم.</td></tr>
          <tr><td>4</td><td>تخصيص الشرائح (ألوان، خطوط، شعارات، رسوم بيانية).</td></tr>
          <tr><td>5</td><td>تنزيل ملف PPTX أو مشاركته عبر رابط مباشر.</td></tr>
        </tbody>
      </table>

      <h2>لماذا تختار {row.label_ar}؟</h2>
      <ul>
        <li>يعمل بدون تسجيل للاستخدام العابر (ذو قيود بسيطة).</li>
        <li>يدعم العربية بالكامل مع تنسيق من اليمين لليسار.</li>
        <li>لا يحتاج لتثبيت Microsoft Office أو برامج إضافية.</li>
        <li>أداء عالي بفضل البنية السحابية الموزّعة.</li>
      </ul>
    </section>
  );
}
