import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { siteConfig } from "@/lib/seo";

const siteUrl = siteConfig.url;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";

  const title = isAr ? "سياسة الخصوصية | Sharayeh" : "Privacy Policy | Sharayeh";
  const description = isAr
    ? "نحترم خصوصيتك. تعرّف على كيفية جمعنا للبيانات واستخدامها وحمايتها في Sharayeh."
    : "We respect your privacy. Learn how we collect, use, and protect your data at Sharayeh.";

  return {
    title,
    description,
    authors: [{ name: "Sharayeh Team" }],
    creator: "Sharayeh Team",
    publisher: "Sharayeh",
    keywords: isAr
      ? ["سياسة الخصوصية", "حماية البيانات", "GDPR", "أمن المعلومات"]
      : ["privacy policy", "data protection", "GDPR", "information security"],
    alternates: {
      canonical: `${siteUrl}/${params.locale}/privacy`,
      languages: {
        en: `${siteUrl}/en/privacy`,
        ar: `${siteUrl}/ar/privacy`,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${params.locale}/privacy`,
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";
  const lastUpdated = isAr ? "آخر تحديث: 12 أكتوبر 2025" : "Last Updated: October 12, 2025";

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl" dir={isAr ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>
          <p className="text-muted-foreground">{lastUpdated}</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "مقدمة" : "Introduction"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isAr
                ? "في Sharayeh، خصوصيتك هي أولويتنا القصوى. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها ومشاركتها عند استخدام منصتنا. من خلال الوصول إلى خدماتنا أو استخدامها، فإنك توافق على ممارسات جمع البيانات واستخدامها الموضحة في هذه السياسة."
                : "At Sharayeh, your privacy is our top priority. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our platform. By accessing or using our services, you agree to the data collection and usage practices described in this policy."}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">
              {isAr ? "1.1 المعلومات التي تقدمها" : "1.1 Information You Provide"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                {isAr
                  ? "معلومات الحساب: الاسم، عنوان البريد الإلكتروني، كلمة المرور (مشفرة)"
                  : "Account Information: Name, email address, password (encrypted)"}
              </li>
              <li>
                {isAr
                  ? "المحتوى المرفوع: المستندات والملفات والعروض التقديمية التي تقوم برفعها للمعالجة"
                  : "Uploaded Content: Documents, files, and presentations you upload for processing"}
              </li>
              <li>
                {isAr
                  ? "معلومات الدفع: تُعالج بشكل آمن من خلال معالجات دفع خارجية (لا نخزن تفاصيل بطاقة الائتمان الكاملة)"
                  : "Payment Information: Processed securely through third-party payment processors (we don't store full credit card details)"}
              </li>
              <li>
                {isAr
                  ? "معلومات الاتصال: الرسائل والتعليقات التي ترسلها إلينا"
                  : "Communication Information: Messages and feedback you send to us"}
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              {isAr ? "1.2 المعلومات المجمعة تلقائياً" : "1.2 Automatically Collected Information"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                {isAr
                  ? "بيانات الاستخدام: كيفية تفاعلك مع منصتنا، الأدوات المستخدمة، أوقات الوصول"
                  : "Usage Data: How you interact with our platform, tools used, access times"}
              </li>
              <li>
                {isAr
                  ? "معلومات الجهاز: نوع المتصفح، نظام التشغيل، عنوان IP، معرفات الجهاز"
                  : "Device Information: Browser type, operating system, IP address, device identifiers"}
              </li>
              <li>
                {isAr
                  ? "ملفات تعريف الارتباط وتقنيات التتبع: لتحسين تجربتك وتحليل أنماط الاستخدام"
                  : "Cookies and Tracking Technologies: To improve your experience and analyze usage patterns"}
              </li>
              <li>
                {isAr
                  ? "بيانات الأداء: مقاييس سرعة التحويل، معدلات النجاح، سجلات الأخطاء"
                  : "Performance Data: Conversion speed metrics, success rates, error logs"}
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "2. كيف نستخدم معلوماتك" : "2. How We Use Your Information"}
            </h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                {isAr
                  ? "لتوفير ومعالجة خدمات التحويل والذكاء الاصطناعي"
                  : "To provide and process conversion and AI services"}
              </li>
              <li>
                {isAr
                  ? "لإنشاء حسابك وإدارته والحفاظ عليه"
                  : "To create, manage, and maintain your account"}
              </li>
              <li>
                {isAr
                  ? "لمعالجة المعاملات والفواتير"
                  : "To process transactions and billing"}
              </li>
              <li>
                {isAr
                  ? "لتحسين وتخصيص تجربتك مع المنصة"
                  : "To improve and personalize your platform experience"}
              </li>
              <li>
                {isAr
                  ? "لإرسال إشعارات خدمة مهمة وتحديثات"
                  : "To send important service notifications and updates"}
              </li>
              <li>
                {isAr
                  ? "للامتثال للالتزامات القانونية والتنظيمية"
                  : "To comply with legal and regulatory obligations"}
              </li>
              <li>
                {isAr
                  ? "لاكتشاف ومنع الاحتيال وإساءة الاستخدام وقضايا الأمان"
                  : "To detect and prevent fraud, abuse, and security issues"}
              </li>
              <li>
                {isAr
                  ? "لتحليل الاتجاهات وتحسين خدماتنا"
                  : "To analyze trends and improve our services"}
              </li>
            </ul>
          </section>

          {/* Data Processing and Storage */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "3. معالجة البيانات وتخزينها" : "3. Data Processing and Storage"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "3.1 الملفات المرفوعة" : "3.1 Uploaded Files"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "يتم معالجة ملفاتك المرفوعة بشكل آمن في بنيتنا التحتية السحابية. نحن نطبق:"
                : "Your uploaded files are processed securely in our cloud infrastructure. We implement:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                {isAr
                  ? "الحذف التلقائي للملفات المرفوعة خلال 24 ساعة من المعالجة"
                  : "Automatic deletion of uploaded files within 24 hours of processing"}
              </li>
              <li>
                {isAr
                  ? "التشفير الشامل أثناء النقل (TLS/SSL) والتخزين"
                  : "End-to-end encryption during transit (TLS/SSL) and at rest"}
              </li>
              <li>
                {isAr
                  ? "مراكز بيانات آمنة ومتوافقة مع معايير الصناعة"
                  : "Secure, industry-compliant data centers"}
              </li>
              <li>
                {isAr
                  ? "ضوابط وصول صارمة - فقط الأنظمة المعتمدة يمكنها الوصول إلى ملفاتك"
                  : "Strict access controls - only authorized systems can access your files"}
              </li>
              <li>
                {isAr
                  ? "عزل البيانات بين حسابات المستخدمين"
                  : "Data isolation between user accounts"}
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              {isAr ? "3.2 بيانات الحساب" : "3.2 Account Data"}
            </h3>
            <p className="text-muted-foreground">
              {isAr
                ? "نحتفظ ببيانات حسابك طالما أن حسابك نشط أو حسب الحاجة لتوفير الخدمات. يمكنك طلب حذف حسابك في أي وقت من خلال إعدادات الحساب أو الاتصال بنا مباشرة."
                : "We retain your account data for as long as your account is active or as needed to provide services. You can request account deletion at any time through account settings or by contacting us directly."}
            </p>
          </section>

          {/* Data Sharing */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "4. مشاركة البيانات والإفصاح عنها" : "4. Data Sharing and Disclosure"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نحن لا نبيع معلوماتك الشخصية أبداً. قد نشارك البيانات في الحالات المحدودة التالية:"
                : "We never sell your personal information. We may share data only in these limited circumstances:"}
            </p>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "4.1 مزودو الخدمة" : "4.1 Service Providers"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نستخدم موردين خارجيين موثوقين لـ:"
                : "We use trusted third-party vendors for:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "معالجة البنية التحتية السحابية (AWS, Google Cloud)" : "Cloud infrastructure processing (AWS, Google Cloud)"}</li>
              <li>{isAr ? "معالجة الدفع (Stripe, PayPal)" : "Payment processing (Stripe, PayPal)"}</li>
              <li>{isAr ? "خدمات المصادقة (Clerk)" : "Authentication services (Clerk)"}</li>
              <li>{isAr ? "التحليلات وتحسين الأداء" : "Analytics and performance optimization"}</li>
              <li>{isAr ? "البريد الإلكتروني ودعم الاتصالات" : "Email and communication support"}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              {isAr ? "4.2 المتطلبات القانونية" : "4.2 Legal Requirements"}
            </h3>
            <p className="text-muted-foreground">
              {isAr
                ? "قد نفصح عن معلوماتك إذا طلب القانون ذلك، مثل الامتثال لمذكرة استدعاء أو عملية قانونية مماثلة، أو عندما نعتقد بحسن نية أن الإفصاح ضروري لحماية حقوقنا أو حمايتك أو حماية الآخرين، أو التحقيق في الاحتيال، أو الاستجابة لطلب حكومي."
                : "We may disclose your information if required by law, such as to comply with a subpoena or similar legal process, or when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request."}
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "5. حقوقك" : "5. Your Rights"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "لديك حقوق معينة فيما يتعلق ببياناتك الشخصية:"
                : "You have certain rights regarding your personal data:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong>{isAr ? "الوصول:" : "Access:"}</strong>{" "}
                {isAr
                  ? "طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك"
                  : "Request a copy of the personal data we hold about you"}
              </li>
              <li>
                <strong>{isAr ? "التصحيح:" : "Rectification:"}</strong>{" "}
                {isAr
                  ? "تحديث أو تصحيح البيانات غير الدقيقة أو غير الكاملة"
                  : "Update or correct inaccurate or incomplete data"}
              </li>
              <li>
                <strong>{isAr ? "الحذف:" : "Deletion:"}</strong>{" "}
                {isAr
                  ? "طلب حذف بياناتك الشخصية (الحق في النسيان)"
                  : "Request deletion of your personal data (right to be forgotten)"}
              </li>
              <li>
                <strong>{isAr ? "النقل:" : "Portability:"}</strong>{" "}
                {isAr
                  ? "الحصول على بياناتك في تنسيق منظم وقابل للقراءة آلياً"
                  : "Receive your data in a structured, machine-readable format"}
              </li>
              <li>
                <strong>{isAr ? "الاعتراض:" : "Objection:"}</strong>{" "}
                {isAr
                  ? "الاعتراض على معالجة بياناتك في ظروف معينة"
                  : "Object to processing of your data in certain circumstances"}
              </li>
              <li>
                <strong>{isAr ? "التقييد:" : "Restriction:"}</strong>{" "}
                {isAr
                  ? "طلب تقييد معالجة بياناتك الشخصية"
                  : "Request restriction of processing your personal data"}
              </li>
              <li>
                <strong>{isAr ? "السحب:" : "Withdrawal:"}</strong>{" "}
                {isAr
                  ? "سحب موافقتك في أي وقت (حيث تكون المعالجة على أساس الموافقة)"
                  : "Withdraw your consent at any time (where processing is based on consent)"}
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {isAr
                ? "لممارسة هذه الحقوق، يرجى الاتصال بنا من خلال إعدادات الحساب أو عبر البريد الإلكتروني."
                : "To exercise these rights, please contact us through your account settings or via email."}
            </p>
          </section>

          {/* Security */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "6. الأمان" : "6. Security"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نطبق تدابير أمنية تقنية وتنظيمية للحماية من الوصول غير المصرح به أو التغيير أو الإفصاح أو التدمير لبياناتك الشخصية:"
                : "We implement technical and organizational security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "تشفير SSL/TLS لجميع عمليات نقل البيانات" : "SSL/TLS encryption for all data transmissions"}</li>
              <li>{isAr ? "تشفير البيانات في حالة السكون" : "Data encryption at rest"}</li>
              <li>{isAr ? "مراقبة أمنية منتظمة وفحص ثغرات" : "Regular security monitoring and vulnerability scanning"}</li>
              <li>{isAr ? "ضوابط وصول وتصاريح على أساس الأدوار" : "Access controls and role-based permissions"}</li>
              <li>{isAr ? "تسجيل ومراجعة جميع الوصول إلى النظام" : "Logging and auditing of all system access"}</li>
              <li>{isAr ? "تدريب منتظم على الأمان للموظفين" : "Regular security training for employees"}</li>
              <li>{isAr ? "خطط الاستجابة للحوادث والنسخ الاحتياطي" : "Incident response and backup plans"}</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "7. ملفات تعريف الارتباط وتقنيات التتبع" : "7. Cookies and Tracking Technologies"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نستخدم ملفات تعريف الارتباط وتقنيات مشابهة لـ:"
                : "We use cookies and similar technologies to:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "الحفاظ على جلسة تسجيل الدخول الخاصة بك" : "Maintain your login session"}</li>
              <li>{isAr ? "تذكر تفضيلاتك وإعداداتك" : "Remember your preferences and settings"}</li>
              <li>{isAr ? "تحليل استخدام الموقع وتحسين الأداء" : "Analyze site usage and improve performance"}</li>
              <li>{isAr ? "توفير ميزات شخصية" : "Provide personalized features"}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {isAr
                ? "يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك. لاحظ أن تعطيل ملفات تعريف الارتباط قد يحد من وظائف معينة."
                : "You can control cookies through your browser settings. Note that disabling cookies may limit certain functionality."}
            </p>
          </section>

          {/* International Transfers */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "8. النقل الدولي للبيانات" : "8. International Data Transfers"}
            </h2>
            <p className="text-muted-foreground">
              {isAr
                ? "قد تتم معالجة بياناتك وتخزينها في بلدان خارج بلد إقامتك. نضمن أن جميع عمليات النقل تتم وفقاً لقوانين حماية البيانات المعمول بها وأن بياناتك تحافظ على مستوى مناسب من الحماية."
                : "Your data may be processed and stored in countries outside your country of residence. We ensure that all transfers are made in accordance with applicable data protection laws and that your data maintains an appropriate level of protection."}
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "9. خصوصية الأطفال" : "9. Children's Privacy"}
            </h2>
            <p className="text-muted-foreground">
              {isAr
                ? "خدماتنا غير موجهة للأطفال دون سن 13 عاماً. نحن لا نجمع معلومات شخصية عن قصد من الأطفال دون سن 13 عاماً. إذا علمنا أننا جمعنا معلومات من طفل دون سن 13 عاماً، سنحذف هذه المعلومات على الفور."
                : "Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected information from a child under 13, we will delete that information promptly."}
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "10. التغييرات على هذه السياسة" : "10. Changes to This Policy"}
            </h2>
            <p className="text-muted-foreground">
              {isAr
                ? "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات من خلال نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث' في الأعلى. نوصي بمراجعة هذه السياسة بشكل دوري للحصول على أي تحديثات."
                : "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date at the top. We recommend reviewing this policy periodically for any updates."}
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {isAr ? "11. اتصل بنا" : "11. Contact Us"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "إذا كانت لديك أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى الاتصال بنا على:"
                : "If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:"}
            </p>
            <div className="text-muted-foreground space-y-2">
              <p>
                <strong>{isAr ? "البريد الإلكتروني:" : "Email:"}</strong> privacy@sharayeh.com
              </p>
              <p>
                <strong>{isAr ? "الموقع الإلكتروني:" : "Website:"}</strong> {siteUrl}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
