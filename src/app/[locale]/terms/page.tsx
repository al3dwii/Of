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

  const title = isAr ? "شروط الخدمة | Sharayeh" : "Terms of Service | Sharayeh";
  const description = isAr
    ? "الشروط والأحكام التي تنظم استخدامك لمنصة Sharayeh، بما في ذلك الحقوق والمسؤوليات."
    : "The terms and conditions governing your use of the Sharayeh platform, including rights and responsibilities.";

  return {
    title,
    description,
    authors: [{ name: "Sharayeh Team" }],
    creator: "Sharayeh Team",
    publisher: "Sharayeh",
    keywords: isAr
      ? ["شروط الخدمة", "الشروط والأحكام", "اتفاقية المستخدم", "قواعد الاستخدام"]
      : ["terms of service", "terms and conditions", "user agreement", "usage terms"],
    alternates: {
      canonical: `${siteUrl}/${params.locale}/terms`,
      languages: {
        en: `${siteUrl}/en/terms`,
        ar: `${siteUrl}/ar/terms`,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${params.locale}/terms`,
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TermsPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";
  const lastUpdated = isAr ? "آخر تحديث: 12 أكتوبر 2025" : "Last Updated: October 12, 2025";

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl" dir={isAr ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {isAr ? "شروط الخدمة" : "Terms of Service"}
          </h1>
          <p className="text-muted-foreground">{lastUpdated}</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "1. قبول الشروط" : "1. Acceptance of Terms"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isAr
                ? "مرحباً بك في Sharayeh! من خلال الوصول إلى منصتنا أو استخدامها، فإنك توافق على الالتزام بشروط الخدمة هذه والامتثال لها. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك الوصول إلى الخدمة أو استخدامها. تشكل هذه الشروط، جنباً إلى جنب مع سياسة الخصوصية الخاصة بنا، اتفاقية ملزمة قانوناً بينك وبين Sharayeh."
                : "Welcome to Sharayeh! By accessing or using our platform, you agree to be bound by and comply with these Terms of Service. If you disagree with any part of these terms, you may not access or use the service. These terms, together with our Privacy Policy, constitute a legally binding agreement between you and Sharayeh."}
            </p>
          </section>

          {/* Service Description */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "2. وصف الخدمة" : "2. Service Description"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "تقدم Sharayeh منصة مدعومة بالذكاء الاصطناعي لـ:"
                : "Sharayeh provides an AI-powered platform for:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "تحويل المستندات بين تنسيقات مختلفة" : "Converting documents between various formats"}</li>
              <li>{isAr ? "إنشاء عروض تقديمية من المحتوى" : "Generating presentations from content"}</li>
              <li>{isAr ? "أدوات تحويل مدعومة بالذكاء الاصطناعي" : "AI-powered conversion tools"}</li>
              <li>{isAr ? "دعم متعدد اللغات (الإنجليزية والعربية والإسبانية)" : "Multi-language support (English, Arabic, Spanish)"}</li>
              <li>{isAr ? "معالجة وتحسين المستندات" : "Document processing and enhancement"}</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {isAr
                ? "نحتفظ بالحق في تعديل أو إيقاف أو إضافة ميزات إلى الخدمة في أي وقت دون إشعار مسبق."
                : "We reserve the right to modify, discontinue, or add features to the service at any time without prior notice."}
            </p>
          </section>

          {/* User Accounts */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "3. حسابات المستخدمين" : "3. User Accounts"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "3.1 إنشاء الحساب" : "3.1 Account Creation"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
              <li>{isAr ? "يجب أن يكون عمرك 13 عاماً أو أكثر لإنشاء حساب" : "You must be at least 13 years old to create an account"}</li>
              <li>{isAr ? "يجب تقديم معلومات دقيقة وكاملة وحديثة" : "You must provide accurate, complete, and current information"}</li>
              <li>{isAr ? "أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك" : "You are responsible for maintaining the confidentiality of your account credentials"}</li>
              <li>{isAr ? "أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك" : "You are responsible for all activities that occur under your account"}</li>
              <li>{isAr ? "حساب واحد لكل مستخدم - لا يُسمح بالحسابات المتعددة دون موافقة" : "One account per user - multiple accounts are not permitted without approval"}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "3.2 أمان الحساب" : "3.2 Account Security"}
            </h3>
            <p className="text-muted-foreground">
              {isAr
                ? "يجب عليك إخطارنا فوراً بأي استخدام غير مصرح به لحسابك أو أي خرق أمني آخر. لن نكون مسؤولين عن أي خسارة أو ضرر ناتج عن فشلك في الامتثال لمتطلبات أمان الحساب."
                : "You must notify us immediately of any unauthorized use of your account or any other security breach. We will not be liable for any loss or damage arising from your failure to comply with account security requirements."}
            </p>
          </section>

          {/* Acceptable Use */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "4. الاستخدام المقبول" : "4. Acceptable Use"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "4.1 يُسمح بالاستخدام" : "4.1 Permitted Use"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "يمكنك استخدام خدماتنا لـ:"
                : "You may use our services for:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>{isAr ? "الأغراض التجارية والشخصية المشروعة" : "Legitimate business and personal purposes"}</li>
              <li>{isAr ? "تحويل مستنداتك الخاصة أو المحتوى المصرح به" : "Converting your own documents or authorized content"}</li>
              <li>{isAr ? "إنشاء عروض تقديمية لعملك أو تعليمك" : "Creating presentations for your work or education"}</li>
              <li>{isAr ? "معالجة المحتوى الذي لديك حقوق في استخدامه" : "Processing content you have the rights to use"}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "4.2 الاستخدام المحظور" : "4.2 Prohibited Use"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "يُحظر عليك:"
                : "You are prohibited from:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>{isAr ? "انتهاك أي قوانين أو لوائح محلية أو وطنية أو دولية" : "Violating any local, national, or international laws or regulations"}</li>
              <li>{isAr ? "انتهاك حقوق الملكية الفكرية لأطراف ثالثة" : "Infringing on third-party intellectual property rights"}</li>
              <li>{isAr ? "رفع محتوى ضار أو غير قانوني أو مسيء أو مهدد" : "Uploading harmful, illegal, abusive, or threatening content"}</li>
              <li>{isAr ? "محاولة الوصول غير المصرح به إلى أنظمتنا أو بيانات المستخدمين الآخرين" : "Attempting unauthorized access to our systems or other users' data"}</li>
              <li>{isAr ? "استخدام الخدمة لأي أغراض احتيالية أو خادعة" : "Using the service for any fraudulent or deceptive purposes"}</li>
              <li>{isAr ? "نشر البرامج الضارة أو الفيروسات أو التعليمات البرمجية الضارة" : "Distributing malware, viruses, or malicious code"}</li>
              <li>{isAr ? "الكشط أو استخراج البيانات أو استخدام الروبوتات الآلية دون إذن" : "Scraping, data mining, or using automated bots without permission"}</li>
              <li>{isAr ? "تجاوز أي إجراءات أمنية أو ضوابط وصول" : "Bypassing any security measures or access controls"}</li>
              <li>{isAr ? "إساءة استخدام الخدمة من خلال الاستخدام المفرط أو غير المعقول" : "Abusing the service through excessive or unreasonable use"}</li>
              <li>{isAr ? "إعادة بيع أو إعادة توزيع الخدمة دون موافقة كتابية" : "Reselling or redistributing the service without written consent"}</li>
              <li>{isAr ? "انتحال شخصية أي شخص أو كيان آخر" : "Impersonating any other person or entity"}</li>
              <li>{isAr ? "التدخل في العمليات العادية للخدمة" : "Interfering with the normal operations of the service"}</li>
            </ul>
          </section>

          {/* Content and IP */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "5. المحتوى والملكية الفكرية" : "5. Content and Intellectual Property"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "5.1 المحتوى الخاص بك" : "5.1 Your Content"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "أنت تحتفظ بجميع حقوق الملكية في المحتوى الذي ترفعه. من خلال رفع المحتوى، فإنك تمنحنا ترخيصاً محدوداً وغير حصري لـ:"
                : "You retain all ownership rights in the content you upload. By uploading content, you grant us a limited, non-exclusive license to:"}
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>{isAr ? "معالجة وتحويل محتواك لتقديم الخدمات" : "Process and convert your content to provide the services"}</li>
              <li>{isAr ? "تخزين المحتوى مؤقتاً حسب الضرورة للعمليات" : "Store content temporarily as necessary for operations"}</li>
              <li>{isAr ? "استخدام البيانات المجمعة المجهولة الهوية لتحسين خدماتنا" : "Use anonymized aggregate data to improve our services"}</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "أنت تضمن أن لديك جميع الحقوق اللازمة لرفع ومعالجة محتواك من خلال خدماتنا."
                : "You warrant that you have all necessary rights to upload and process your content through our services."}
            </p>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "5.2 ملكيتنا الفكرية" : "5.2 Our Intellectual Property"}
            </h3>
            <p className="text-muted-foreground">
              {isAr
                ? "تُعد الخدمة والمحتوى ذي الصلة والتكنولوجيا والبرامج ملكاً لـ Sharayeh ومحمية بموجب قوانين حقوق النشر والعلامات التجارية والملكية الفكرية الأخرى. لا يُسمح لك بنسخ أو تعديل أو توزيع أو بيع أو تأجير أي جزء من خدماتنا دون إذن كتابي صريح."
                : "The service, related content, technology, and software are owned by Sharayeh and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without express written permission."}
            </p>
          </section>

          {/* Payment and Subscriptions */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "6. الدفع والاشتراكات" : "6. Payment and Subscriptions"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "6.1 التسعير" : "6.1 Pricing"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "نقدم خططاً مجانية ومدفوعة. الأسعار متاحة على صفحة التسعير الخاصة بنا ويمكن تغييرها في أي وقت. سنخطرك بأي تغييرات في الأسعار قبل 30 يوماً على الأقل."
                : "We offer both free and paid plans. Pricing is available on our pricing page and may change at any time. We will notify you of any price changes at least 30 days in advance."}
            </p>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "6.2 الفوترة" : "6.2 Billing"}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-6">
              <li>{isAr ? "يتم إصدار فواتير الاشتراكات المدفوعة على أساس شهري أو سنوي" : "Paid subscriptions are billed on a monthly or annual basis"}</li>
              <li>{isAr ? "يتم تطبيق التجديدات التلقائية ما لم يتم الإلغاء قبل فترة الفوترة التالية" : "Automatic renewals apply unless canceled before the next billing period"}</li>
              <li>{isAr ? "جميع الرسوم غير قابلة للاسترداد ما لم ينص القانون على خلاف ذلك" : "All fees are non-refundable unless required by law"}</li>
              <li>{isAr ? "أنت مسؤول عن جميع الضرائب المطبقة" : "You are responsible for all applicable taxes"}</li>
              <li>{isAr ? "قد يؤدي الفشل في الدفع إلى تعليق أو إنهاء الحساب" : "Failure to pay may result in account suspension or termination"}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "6.3 الإلغاء والاستردادات" : "6.3 Cancellations and Refunds"}
            </h3>
            <p className="text-muted-foreground">
              {isAr
                ? "يمكنك إلغاء اشتراكك في أي وقت من خلال إعدادات الحساب. سيظل الاشتراك نشطاً حتى نهاية فترة الفوترة المدفوعة. نحن نقدم استردادات فقط في حالات استثنائية وفقاً لتقديرنا."
                : "You can cancel your subscription at any time through account settings. The subscription will remain active until the end of the paid billing period. We offer refunds only in exceptional cases at our discretion."}
            </p>
          </section>

          {/* Service Availability */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "7. توفر الخدمة" : "7. Service Availability"}
            </h2>
            <p className="text-muted-foreground">
              {isAr
                ? "نبذل جهوداً معقولة لضمان توفر الخدمة على مدار الساعة طوال أيام الأسبوع، ولكننا لا نضمن عمليات غير منقطعة أو خالية من الأخطاء. قد نقوم بتعليق الخدمة مؤقتاً للصيانة أو التحديثات أو الطوارئ. لن نكون مسؤولين عن أي توقف أو انقطاع في الخدمة."
                : "We make reasonable efforts to ensure the service is available 24/7, but we do not guarantee uninterrupted or error-free operations. We may temporarily suspend the service for maintenance, updates, or emergencies. We will not be liable for any downtime or service interruptions."}
            </p>
          </section>

          {/* Termination */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "8. الإنهاء" : "8. Termination"}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "8.1 من قِبلك" : "8.1 By You"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "يمكنك إنهاء حسابك في أي وقت من خلال إعدادات الحساب أو الاتصال بنا. عند الإنهاء، سيتم حذف بيانات حسابك وفقاً لسياسة الخصوصية الخاصة بنا."
                : "You may terminate your account at any time through account settings or by contacting us. Upon termination, your account data will be deleted in accordance with our Privacy Policy."}
            </p>

            <h3 className="text-xl font-semibold mb-3">
              {isAr ? "8.2 من قِبلنا" : "8.2 By Us"}
            </h3>
            <p className="text-muted-foreground">
              {isAr
                ? "نحتفظ بالحق في تعليق أو إنهاء حسابك أو وصولك إلى الخدمة في أي وقت، مع أو بدون سبب، مع أو بدون إشعار، بما في ذلك انتهاك هذه الشروط أو السلوك الضار أو الإساءة أو سوء الاستخدام."
                : "We reserve the right to suspend or terminate your account or access to the service at any time, with or without cause, with or without notice, including for violation of these terms, harmful conduct, abuse, or misuse."}
            </p>
          </section>

          {/* Disclaimers */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "9. إخلاء المسؤولية" : "9. Disclaimers"}
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4 mb-4">
              <p className="text-muted-foreground font-semibold mb-2">
                {isAr
                  ? "يتم توفير الخدمة 'كما هي' و 'حسب التوفر' دون ضمانات من أي نوع، صريحة أو ضمنية."
                  : "THE SERVICE IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED."}
              </p>
            </div>
            <p className="text-muted-foreground">
              {isAr
                ? "نحن نخلي مسؤوليتنا صراحةً عن جميع الضمانات، بما في ذلك على سبيل المثال لا الحصر، الضمانات الضمنية لقابلية التسويق والملاءمة لغرض معين وعدم الانتهاك. لا نضمن أن الخدمة ستلبي متطلباتك، أو أن العملية ستكون غير منقطعة أو آمنة أو خالية من الأخطاء، أو أن أي عيوب سيتم تصحيحها."
                : "We expressly disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will meet your requirements, or that the operation will be uninterrupted, secure, or error-free, or that any defects will be corrected."}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "10. تحديد المسؤولية" : "10. Limitation of Liability"}
            </h2>
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-4 mb-4">
              <p className="text-muted-foreground">
                {isAr
                  ? "إلى أقصى حد يسمح به القانون، لن تكون Sharayeh مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية، بما في ذلك فقدان الأرباح أو البيانات أو استخدام أو حسن النية أو خسائر أخرى غير ملموسة، الناتجة عن استخدامك أو عدم قدرتك على استخدام الخدمة."
                  : "TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHARAYEH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OR INABILITY TO USE THE SERVICE."}
              </p>
            </div>
            <p className="text-muted-foreground">
              {isAr
                ? "تقتصر مسؤوليتنا الإجمالية تجاهك عن أي مطالبات ناشئة عن أو تتعلق بهذه الشروط أو الخدمة على المبلغ الذي دفعته لنا في الاثني عشر (12) شهراً السابقة لحدث المطالبة، أو 100 دولار أمريكي، أيهما أكبر."
                : "Our total liability to you for any claims arising out of or relating to these terms or the service is limited to the amount you paid us in the twelve (12) months preceding the claim event, or $100 USD, whichever is greater."}
            </p>
          </section>

          {/* Indemnification */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "11. التعويض" : "11. Indemnification"}
            </h2>
            <p className="text-muted-foreground">
              {isAr
                ? "أنت توافق على تعويض والدفاع عن وحماية Sharayeh ومديريها وموظفيها ووكلائها من وضد أي وجميع المطالبات والأضرار والالتزامات والتكاليف والنفقات (بما في ذلك أتعاب المحاماة المعقولة) الناشئة عن: (أ) استخدامك للخدمة؛ (ب) انتهاكك لهذه الشروط؛ (ج) انتهاكك لأي حقوق لطرف ثالث؛ أو (د) محتواك."
                : "You agree to indemnify, defend, and hold harmless Sharayeh, its directors, officers, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising from: (a) your use of the service; (b) your violation of these terms; (c) your violation of any third-party rights; or (d) your content."}
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "12. حل النزاعات" : "12. Dispute Resolution"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "في حالة وجود أي نزاع، فإنك توافق أولاً على الاتصال بنا لمحاولة حل النزاع بشكل غير رسمي. إذا لم نتمكن من حل النزاع خلال 30 يوماً، فقد يخضع النزاع للتحكيم الملزم."
                : "In the event of any dispute, you agree to first contact us to attempt to resolve the dispute informally. If we cannot resolve the dispute within 30 days, the dispute may be subject to binding arbitration."}
            </p>
            <p className="text-muted-foreground">
              {isAr
                ? "تخضع هذه الشروط لقوانين [اختصاصك القضائي]، باستثناء أحكام تعارض القوانين."
                : "These terms are governed by the laws of [Your Jurisdiction], excluding its conflicts of law provisions."}
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {isAr ? "13. التغييرات على الشروط" : "13. Changes to Terms"}
            </h2>
            <p className="text-muted-foreground">
              {isAr
                ? "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنخطرك بأي تغييرات جوهرية عن طريق نشر الشروط الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث'. يشكل استمرارك في استخدام الخدمة بعد هذه التغييرات قبولك للشروط المعدلة."
                : "We reserve the right to modify these terms at any time. We will notify you of any material changes by posting the new terms on this page and updating the 'Last Updated' date. Your continued use of the service after such changes constitutes acceptance of the modified terms."}
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {isAr ? "14. اتصل بنا" : "14. Contact Us"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {isAr
                ? "إذا كانت لديك أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا:"
                : "If you have questions about these Terms of Service, please contact us:"}
            </p>
            <div className="text-muted-foreground space-y-2">
              <p>
                <strong>{isAr ? "البريد الإلكتروني:" : "Email:"}</strong> legal@sharayeh.com
              </p>
              <p>
                <strong>{isAr ? "الموقع الإلكتروني:" : "Website:"}</strong> {siteUrl}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? "راجع أيضاً:"
                  : "See also:"}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link
                  href={`/${params.locale}/privacy`}
                  className="text-primary hover:underline"
                >
                  {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                <Link
                  href={`/${params.locale}/security`}
                  className="text-primary hover:underline"
                >
                  {isAr ? "الأمان" : "Security"}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
