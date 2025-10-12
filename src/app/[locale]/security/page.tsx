import type { Metadata } from "next";
import type { Locale } from "@/data/locales";
import { siteConfig } from "@/lib/seo";
import Link from "next/link";

const siteUrl = siteConfig.url;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";

  const title = isAr ? "الأمان | Sharayeh" : "Security | Sharayeh";
  const description = isAr
    ? "تعرف على كيفية حماية Sharayeh لبياناتك من خلال تشفير من الدرجة المصرفية وضوابط وصول صارمة وممارسات أمان رائدة في الصناعة."
    : "Learn how Sharayeh protects your data with bank-grade encryption, strict access controls, and industry-leading security practices.";

  return {
    title,
    description,
    authors: [{ name: "Sharayeh Team" }],
    creator: "Sharayeh Team",
    publisher: "Sharayeh",
    keywords: isAr
      ? ["الأمان", "تشفير البيانات", "حماية البيانات", "أمن المعلومات", "ISO 27001"]
      : ["security", "data encryption", "data protection", "information security", "ISO 27001"],
    alternates: {
      canonical: `${siteUrl}/${params.locale}/security`,
      languages: {
        en: `${siteUrl}/en/security`,
        ar: `${siteUrl}/ar/security`,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${params.locale}/security`,
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function SecurityPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";
  const lastUpdated = isAr ? "آخر تحديث: 12 أكتوبر 2025" : "Last Updated: October 12, 2025";

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl" dir={isAr ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {isAr ? "أمان وحماية البيانات" : "Security & Data Protection"}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {isAr
              ? "التزامنا بحماية بياناتك وخصوصيتك"
              : "Our Commitment to Protecting Your Data and Privacy"}
          </p>
          <p className="text-sm text-muted-foreground">{lastUpdated}</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Overview */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isAr ? "نظرة عامة" : "Overview"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {isAr
                ? "في Sharayeh، الأمان ليس فكرة متأخرة - إنه جزء أساسي من كل ما نقوم به. نحن نفهم أنك تثق بنا ببياناتك الحساسة، ونأخذ هذه المسؤولية على محمل الجد. تم تصميم بنيتنا التحتية الأمنية من الألف إلى الياء مع وضع حماية البيانات في الاعتبار."
                : "At Sharayeh, security isn't an afterthought—it's a fundamental part of everything we do. We understand that you're trusting us with your sensitive data, and we take that responsibility seriously. Our security infrastructure is designed from the ground up with data protection in mind."}
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-background rounded-lg p-4 text-center border">
                <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
                <div className="text-sm text-muted-foreground">
                  {isAr ? "تشفير AES" : "AES Encryption"}
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 text-center border">
                <div className="text-3xl font-bold text-primary mb-2">24h</div>
                <div className="text-sm text-muted-foreground">
                  {isAr ? "حذف تلقائي للملفات" : "Auto File Deletion"}
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 text-center border">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">
                  {isAr ? "مراقبة أمنية" : "Security Monitoring"}
                </div>
              </div>
            </div>
          </section>

          {/* Data Encryption */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">🔐</span>
              {isAr ? "1. تشفير البيانات" : "1. Data Encryption"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "1.1 التشفير أثناء النقل" : "1.1 Encryption in Transit"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "يتم تشفير جميع البيانات المنقولة بين جهازك وخوادمنا باستخدام:"
                : "All data transmitted between your device and our servers is encrypted using:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>
                <strong>TLS 1.3</strong>{" "}
                {isAr
                  ? "- أحدث معيار لأمان طبقة النقل"
                  : "- The latest Transport Layer Security standard"}
              </li>
              <li>
                <strong>HTTPS</strong>{" "}
                {isAr
                  ? "- إلزامي لجميع الاتصالات"
                  : "- Mandatory for all communications"}
              </li>
              <li>
                <strong>Perfect Forward Secrecy</strong>{" "}
                {isAr
                  ? "- تضمن عدم إمكانية فك تشفير البيانات السابقة حتى في حالة اختراق المفاتيح"
                  : "- Ensures past data cannot be decrypted even if keys are compromised"}
              </li>
              <li>
                {isAr
                  ? "شهادات SSL من مراجع موثوقة مع تحديث تلقائي"
                  : "SSL certificates from trusted authorities with automatic renewal"}
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "1.2 التشفير في حالة السكون" : "1.2 Encryption at Rest"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "يتم تشفير بياناتك عند تخزينها باستخدام:"
                : "Your data is encrypted when stored using:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong>AES-256</strong>{" "}
                {isAr
                  ? "- تشفير من الدرجة العسكرية"
                  : "- Military-grade encryption"}
              </li>
              <li>
                {isAr
                  ? "مفاتيح تشفير منفصلة لكل مستخدم"
                  : "Separate encryption keys for each user"}
              </li>
              <li>
                {isAr
                  ? "إدارة مفاتيح آمنة مع تدوير منتظم"
                  : "Secure key management with regular rotation"}
              </li>
              <li>
                {isAr
                  ? "تخزين متوافق مع معايير الصناعة (AWS KMS, Google Cloud KMS)"
                  : "Industry-standard compliant storage (AWS KMS, Google Cloud KMS)"}
              </li>
            </ul>
          </section>

          {/* Infrastructure Security */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">🏗️</span>
              {isAr ? "2. أمن البنية التحتية" : "2. Infrastructure Security"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "2.1 مراكز البيانات" : "2.1 Data Centers"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نستخدم مزودي خدمات سحابية من الطبقة الأولى مع:"
                : "We use tier-1 cloud service providers with:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>{isAr ? "شهادات SOC 2 Type II" : "SOC 2 Type II certification"}</li>
              <li>{isAr ? "امتثال ISO 27001" : "ISO 27001 compliance"}</li>
              <li>{isAr ? "أمان مادي 24/7 وضوابط وصول" : "24/7 physical security and access controls"}</li>
              <li>{isAr ? "مرافق زائدة عن الحاجة ومواقع جغرافية متعددة" : "Redundant facilities and multiple geographic locations"}</li>
              <li>{isAr ? "أنظمة إطفاء الحرائق ومراقبة بيئية" : "Fire suppression and environmental monitoring systems"}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "2.2 أمان الشبكة" : "2.2 Network Security"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "عزل الشبكة والتجزئة" : "Network isolation and segmentation"}</li>
              <li>{isAr ? "جدران حماية وأنظمة كشف التسلل (IDS/IPS)" : "Firewalls and intrusion detection systems (IDS/IPS)"}</li>
              <li>{isAr ? "حماية DDoS على مستوى المؤسسات" : "Enterprise-grade DDoS protection"}</li>
              <li>{isAr ? "شبكات خاصة افتراضية (VPN) للوصول الإداري" : "Virtual Private Networks (VPNs) for administrative access"}</li>
              <li>{isAr ? "فحص ومراجعة أمن الشبكة بانتظام" : "Regular network security scanning and auditing"}</li>
            </ul>
          </section>

          {/* Access Controls */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">🔑</span>
              {isAr ? "3. ضوابط الوصول" : "3. Access Controls"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "3.1 المصادقة" : "3.1 Authentication"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>
                {isAr
                  ? "دعم المصادقة متعددة العوامل (MFA) لجميع الحسابات"
                  : "Multi-Factor Authentication (MFA) support for all accounts"}
              </li>
              <li>
                {isAr
                  ? "متطلبات كلمة مرور قوية (الحد الأدنى 8 أحرف، أحرف كبيرة/صغيرة، أرقام، رموز)"
                  : "Strong password requirements (minimum 8 characters, upper/lower case, numbers, symbols)"}
              </li>
              <li>{isAr ? "تشفير كلمة المرور باستخدام bcrypt/Argon2" : "Password hashing using bcrypt/Argon2"}</li>
              <li>{isAr ? "إدارة الجلسة الآمنة مع انتهاء الصلاحية التلقائية" : "Secure session management with automatic expiration"}</li>
              <li>{isAr ? "مصادقة OAuth 2.0 لعمليات تسجيل الدخول الاجتماعية" : "OAuth 2.0 authentication for social logins"}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "3.2 التصريح" : "3.2 Authorization"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "التحكم في الوصول على أساس الأدوار (RBAC)" : "Role-Based Access Control (RBAC)"}</li>
              <li>{isAr ? "مبدأ الامتياز الأقل - يحصل المستخدمون على الحد الأدنى من الوصول المطلوب" : "Principle of least privilege - users get minimum required access"}</li>
              <li>{isAr ? "عزل البيانات بين حسابات المستخدمين" : "Data isolation between user accounts"}</li>
              <li>{isAr ? "مراجعة منتظمة وإلغاء أذونات الوصول غير المستخدمة" : "Regular review and revocation of unused access permissions"}</li>
              <li>{isAr ? "تسجيل جميع محاولات الوصول والتغييرات" : "Logging of all access attempts and changes"}</li>
            </ul>
          </section>

          {/* Data Handling */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">📁</span>
              {isAr ? "4. معالجة البيانات وحذفها" : "4. Data Handling & Deletion"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "4.1 دورة حياة الملف" : "4.1 File Lifecycle"}
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4 mb-4">
              <p className="text-muted-foreground">
                {isAr
                  ? "⏱️ يتم حذف الملفات المرفوعة تلقائياً خلال 24 ساعة من المعالجة"
                  : "⏱️ Uploaded files are automatically deleted within 24 hours of processing"}
              </p>
            </div>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>{isAr ? "الحذف الآمن مع الكتابة فوق البيانات" : "Secure deletion with data overwriting"}</li>
              <li>{isAr ? "لا يتم تخزين الملفات المعالجة بعد التسليم" : "No storage of processed files after delivery"}</li>
              <li>{isAr ? "المحتوى المؤقت محدود الوقت في ذاكرة التخزين المؤقت" : "Temporary content time-limited in cache"}</li>
              <li>{isAr ? "الحذف الفوري عند طلب المستخدم" : "Immediate deletion upon user request"}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "4.2 النسخ الاحتياطي والاستعادة" : "4.2 Backup & Recovery"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "نسخ احتياطية مشفرة يومية لبيانات الحساب" : "Encrypted daily backups of account data"}</li>
              <li>{isAr ? "تخزين زائد عن الحاجة جغرافياً" : "Geo-redundant storage"}</li>
              <li>{isAr ? "اختبار استعادة منتظم" : "Regular recovery testing"}</li>
              <li>{isAr ? "الاحتفاظ بالنسخ الاحتياطية لمدة 30 يوماً (بيانات الحساب فقط، وليس الملفات المرفوعة)" : "30-day backup retention (account data only, not uploaded files)"}</li>
            </ul>
          </section>

          {/* Monitoring */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">👁️</span>
              {isAr ? "5. المراقبة والكشف" : "5. Monitoring & Detection"}
            </h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "مراقبة أمنية 24/7 لجميع الأنظمة" : "24/7 security monitoring of all systems"}</li>
              <li>{isAr ? "كشف الحالات الشاذة في الوقت الفعلي" : "Real-time anomaly detection"}</li>
              <li>{isAr ? "تنبيهات تلقائية للنشاط المشبوه" : "Automated alerts for suspicious activity"}</li>
              <li>{isAr ? "تسجيل شامل لجميع أحداث النظام" : "Comprehensive logging of all system events"}</li>
              <li>{isAr ? "مراجعة منتظمة لسجلات الأمان" : "Regular security log review"}</li>
              <li>{isAr ? "فحص الثغرات الآلي" : "Automated vulnerability scanning"}</li>
              <li>{isAr ? "اختبار اختراق ربع سنوي من قبل خبراء خارجيين" : "Quarterly penetration testing by external experts"}</li>
            </ul>
          </section>

          {/* Incident Response */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">🚨</span>
              {isAr ? "6. الاستجابة للحوادث" : "6. Incident Response"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "لدينا خطة شاملة للاستجابة للحوادث تشمل:"
                : "We have a comprehensive incident response plan that includes:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>{isAr ? "فريق استجابة مخصص متاح 24/7" : "Dedicated response team available 24/7"}</li>
              <li>{isAr ? "إجراءات توثيق الحوادث" : "Incident documentation procedures"}</li>
              <li>{isAr ? "بروتوكولات الاحتواء والتخفيف" : "Containment and mitigation protocols"}</li>
              <li>{isAr ? "تحليل السبب الجذري" : "Root cause analysis"}</li>
              <li>{isAr ? "إشعار المستخدمين في حالة حدوث خرق للبيانات (وفقاً للقوانين)" : "User notification in case of data breach (as required by law)"}</li>
              <li>{isAr ? "تحسينات ما بعد الحادث" : "Post-incident improvements"}</li>
            </ul>

            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
              <p className="text-muted-foreground">
                <strong>{isAr ? "⚠️ الإبلاغ عن الثغرات الأمنية:" : "⚠️ Report Security Vulnerabilities:"}</strong>
                {" "}
                {isAr
                  ? "إذا اكتشفت ثغرة أمنية، يرجى الإبلاغ عنها على الفور إلى security@sharayeh.com. نحن نقدر الإفصاح المسؤول ونعمل بسرعة لمعالجة جميع المشكلات المبلغ عنها."
                  : "If you discover a security vulnerability, please report it immediately to security@sharayeh.com. We appreciate responsible disclosure and work quickly to address all reported issues."}
              </p>
            </div>
          </section>

          {/* Employee Security */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">👨‍💼</span>
              {isAr ? "7. أمان الموظفين" : "7. Employee Security"}
            </h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "فحص خلفية شامل لجميع الموظفين" : "Comprehensive background checks for all employees"}</li>
              <li>{isAr ? "اتفاقيات عدم الإفصاح (NDA) وسرية" : "Non-Disclosure Agreements (NDAs) and confidentiality"}</li>
              <li>{isAr ? "تدريب أمني إلزامي عند التوظيف وبشكل سنوي" : "Mandatory security training at hiring and annually"}</li>
              <li>{isAr ? "الوصول على أساس الحاجة إلى المعرفة فقط" : "Need-to-know basis access only"}</li>
              <li>{isAr ? "إلغاء فوري للوصول عند إنهاء الخدمة" : "Immediate access revocation upon termination"}</li>
              <li>{isAr ? "مراجعة أذونات الوصول ربع سنوية" : "Quarterly access permission reviews"}</li>
            </ul>
          </section>

          {/* Compliance */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">✅</span>
              {isAr ? "8. الامتثال والشهادات" : "8. Compliance & Certifications"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نلتزم بمعايير الصناعة واللوائح:"
                : "We comply with industry standards and regulations:"}
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-background border rounded-lg p-4">
                <div className="font-semibold mb-2">GDPR</div>
                <div className="text-sm text-muted-foreground">
                  {isAr
                    ? "اللائحة العامة لحماية البيانات (الاتحاد الأوروبي)"
                    : "General Data Protection Regulation (EU)"}
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4">
                <div className="font-semibold mb-2">CCPA</div>
                <div className="text-sm text-muted-foreground">
                  {isAr
                    ? "قانون خصوصية المستهلك في كاليفورنيا"
                    : "California Consumer Privacy Act"}
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4">
                <div className="font-semibold mb-2">SOC 2</div>
                <div className="text-sm text-muted-foreground">
                  {isAr
                    ? "شهادة Type II (في التقدم)"
                    : "Type II Certification (In Progress)"}
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4">
                <div className="font-semibold mb-2">ISO 27001</div>
                <div className="text-sm text-muted-foreground">
                  {isAr
                    ? "إدارة أمن المعلومات (في التقدم)"
                    : "Information Security Management (In Progress)"}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              {isAr
                ? "نجري عمليات تدقيق منتظمة لضمان الامتثال المستمر لجميع المعايير واللوائح المطبقة."
                : "We conduct regular audits to ensure ongoing compliance with all applicable standards and regulations."}
            </p>
          </section>

          {/* Third-Party Security */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">🤝</span>
              {isAr ? "9. أمان الطرف الثالث" : "9. Third-Party Security"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نختار بعناية ونراقب جميع موردي الطرف الثالث:"
                : "We carefully select and monitor all third-party vendors:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "تقييم أمني شامل قبل التكامل" : "Comprehensive security assessment before integration"}</li>
              <li>{isAr ? "مراجعة منتظمة لممارسات أمان الموردين" : "Regular review of vendor security practices"}</li>
              <li>{isAr ? "اتفاقيات معالجة البيانات (DPA)" : "Data Processing Agreements (DPAs)"}</li>
              <li>{isAr ? "الحد الأدنى من الوصول إلى البيانات الضرورية" : "Minimum necessary data access"}</li>
              <li>{isAr ? "خوادم معتمدة ومتوافقة فقط (AWS، Google Cloud، Stripe، Clerk)" : "Only certified and compliant providers (AWS, Google Cloud, Stripe, Clerk)"}</li>
            </ul>
          </section>

          {/* Best Practices */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-3xl">💡</span>
              {isAr ? "10. أفضل الممارسات للمستخدمين" : "10. Best Practices for Users"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "بينما نتولى الجانب التقني، يمكنك مساعدتنا في الحفاظ على أمان حسابك من خلال:"
                : "While we handle the technical side, you can help keep your account secure by:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "استخدام كلمة مرور قوية وفريدة" : "Using a strong, unique password"}</li>
              <li>{isAr ? "تمكين المصادقة متعددة العوامل (MFA)" : "Enabling Multi-Factor Authentication (MFA)"}</li>
              <li>{isAr ? "عدم مشاركة بيانات اعتماد حسابك مع أي شخص" : "Never sharing your account credentials with anyone"}</li>
              <li>{isAr ? "تسجيل الخروج من الأجهزة المشتركة أو العامة" : "Logging out from shared or public devices"}</li>
              <li>{isAr ? "مراجعة نشاط حسابك بانتظام" : "Reviewing your account activity regularly"}</li>
              <li>{isAr ? "الإبلاغ عن أي نشاط مشبوه فوراً" : "Reporting any suspicious activity immediately"}</li>
              <li>{isAr ? "الحفاظ على تحديث البرامج والمتصفحات" : "Keeping your software and browsers updated"}</li>
              <li>{isAr ? "الحذر من محاولات التصيد الاحتيالي" : "Being cautious of phishing attempts"}</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {isAr ? "اتصل بفريق الأمان" : "Contact Security Team"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "لديك أسئلة أو مخاوف أمنية؟ نحن هنا للمساعدة:"
                : "Have security questions or concerns? We're here to help:"}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-primary">📧</div>
                <div>
                  <div className="font-semibold">
                    {isAr ? "الاستفسارات الأمنية العامة:" : "General Security Inquiries:"}
                  </div>
                  <a href="mailto:security@sharayeh.com" className="text-primary hover:underline">
                    security@sharayeh.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-primary">🐛</div>
                <div>
                  <div className="font-semibold">
                    {isAr ? "الإبلاغ عن الثغرات:" : "Vulnerability Reports:"}
                  </div>
                  <a href="mailto:security@sharayeh.com" className="text-primary hover:underline">
                    security@sharayeh.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-primary">⚠️</div>
                <div>
                  <div className="font-semibold">
                    {isAr ? "حوادث الأمان العاجلة:" : "Urgent Security Incidents:"}
                  </div>
                  <a href="mailto:security@sharayeh.com" className="text-primary hover:underline">
                    security@sharayeh.com
                  </a>
                  <div className="text-sm text-muted-foreground mt-1">
                    {isAr
                      ? "(استجابة خلال 24 ساعة للقضايا الحرجة)"
                      : "(Response within 24 hours for critical issues)"}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                {isAr ? "صفحات ذات صلة:" : "Related Pages:"}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${params.locale}/privacy`}
                  className="text-primary hover:underline"
                >
                  {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                <Link
                  href={`/${params.locale}/terms`}
                  className="text-primary hover:underline"
                >
                  {isAr ? "شروط الخدمة" : "Terms of Service"}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
