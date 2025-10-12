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
  
  const title = isAr ? "من نحن | Sharayeh" : "About Us | Sharayeh";
  const description = isAr
    ? "تعرف على Sharayeh - منصة الذكاء الاصطناعي الرائدة لتحويل المستندات وإنشاء العروض التقديمية. فريق من الخبراء ملتزمون بتبسيط سير عملك."
    : "Learn about Sharayeh - the leading AI platform for document conversion and presentation generation. A team of experts committed to simplifying your workflow.";

  return {
    title,
    description,
    authors: [{ name: "Sharayeh Team" }],
    creator: "Sharayeh Team",
    publisher: "Sharayeh",
    keywords: isAr
      ? ["من نحن", "Sharayeh", "فريق", "مهمة", "رؤية", "أدوات الذكاء الاصطناعي"]
      : ["about us", "Sharayeh", "team", "mission", "vision", "AI tools"],
    alternates: {
      canonical: `${siteUrl}/${params.locale}/about`,
      languages: {
        en: `${siteUrl}/en/about`,
        ar: `${siteUrl}/ar/about`,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${params.locale}/about`,
      title,
      description,
      siteName: "Sharayeh",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const isAr = params.locale === "ar";

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-5xl" dir={isAr ? "rtl" : "ltr"}>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {isAr ? "من نحن" : "About Sharayeh"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isAr
              ? "نحوّل الطريقة التي تعمل بها الفرق مع المستندات والعروض التقديمية من خلال قوة الذكاء الاصطناعي"
              : "Transforming how teams work with documents and presentations through the power of AI"}
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 bg-card rounded-xl p-8 shadow-sm border">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            {isAr ? "🎯 مهمتنا" : "🎯 Our Mission"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isAr
              ? "مهمتنا هي تمكين الأفراد والفرق في جميع أنحاء العالم من خلال توفير أدوات ذكاء اصطناعي سهلة الاستخدام وقوية تبسط تحويل المستندات وإنشاء العروض التقديمية. نؤمن بأن التكنولوجيا يجب أن تكون في متناول الجميع، بغض النظر عن خلفيتهم التقنية أو لغتهم."
              : "Our mission is to empower individuals and teams worldwide by providing powerful, easy-to-use AI tools that simplify document conversion and presentation creation. We believe technology should be accessible to everyone, regardless of their technical background or language."}
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-16 bg-card rounded-xl p-8 shadow-sm border">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            {isAr ? "🚀 رؤيتنا" : "🚀 Our Vision"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isAr
              ? "نسعى لأن نصبح المنصة الرائدة عالمياً لتحويل المحتوى بالذكاء الاصطناعي، حيث يمكن لأي شخص تحويل أفكاره إلى عروض تقديمية احترافية في دقائق. نتصور عالماً حيث تختفي حواجز اللغة، ويتم أتمتة المهام المتكررة، وتصبح الإبداعية هي التركيز الوحيد."
              : "We envision becoming the world's leading platform for AI-powered content transformation, where anyone can turn their ideas into professional presentations in minutes. We see a world where language barriers disappear, repetitive tasks are automated, and creativity becomes the only focus."}
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isAr ? "💎 قيمنا الأساسية" : "💎 Our Core Values"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Value 1 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                {isAr ? "عالمية وشاملة" : "Global & Inclusive"}
              </h3>
              <p className="text-muted-foreground">
                {isAr
                  ? "ندعم اللغات المتعددة والاتجاهات النصية المختلفة، مما يجعل أدواتنا متاحة للجميع في كل مكان."
                  : "We support multiple languages and text directions, making our tools accessible to everyone, everywhere."}
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                {isAr ? "الخصوصية أولاً" : "Privacy First"}
              </h3>
              <p className="text-muted-foreground">
                {isAr
                  ? "بياناتك ملكك. نحن لا نبيع أو نشارك معلوماتك مع أطراف ثالثة، ونحذف ملفاتك تلقائياً بعد المعالجة."
                  : "Your data is yours. We never sell or share your information with third parties, and we automatically delete your files after processing."}
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                {isAr ? "سرعة وكفاءة" : "Speed & Efficiency"}
              </h3>
              <p className="text-muted-foreground">
                {isAr
                  ? "وقتك ثمين. تعالج أدواتنا المستندات في ثوانٍ، مما يتيح لك التركيز على ما يهم حقاً."
                  : "Your time is valuable. Our tools process documents in seconds, allowing you to focus on what truly matters."}
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                {isAr ? "الجودة والتميز" : "Quality & Excellence"}
              </h3>
              <p className="text-muted-foreground">
                {isAr
                  ? "نسعى للتميز في كل تفاصيل. من دقة التحويل إلى تصميم الواجهة، نضع معايير عالية."
                  : "We strive for excellence in every detail. From conversion accuracy to interface design, we set high standards."}
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🤝</span>
                {isAr ? "دعم مستمر" : "Continuous Support"}
              </h3>
              <p className="text-muted-foreground">
                {isAr
                  ? "نحن هنا لمساعدتك. فريقنا متاح للإجابة على أسئلتك وحل أي مشكلات قد تواجهها."
                  : "We're here to help. Our team is available to answer your questions and resolve any issues you may encounter."}
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                {isAr ? "ابتكار مستمر" : "Continuous Innovation"}
              </h3>
              <p className="text-muted-foreground">
                {isAr
                  ? "نحدّث أدواتنا باستمرار بأحدث تقنيات الذكاء الاصطناعي لتقديم أفضل تجربة ممكنة."
                  : "We continuously update our tools with the latest AI technologies to provide the best possible experience."}
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">
            {isAr ? "👥 فريق Sharayeh" : "👥 The Sharayeh Team"}
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-6">
            {isAr
              ? "فريقنا المتنوع من المهندسين والمصممين والخبراء في الذكاء الاصطناعي متحمسون لبناء أدوات تحدث فرقاً حقيقياً. نحن نجمع بين الخبرة التقنية العميقة والتركيز على تجربة المستخدم لإنشاء منتجات تعمل بشكل جيد وتبدو رائعة."
              : "Our diverse team of engineers, designers, and AI experts is passionate about building tools that make a real difference. We combine deep technical expertise with a focus on user experience to create products that work beautifully and look great."}
          </p>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isAr
                ? "🌟 فريق متعدد الثقافات | 🧠 خبراء في الذكاء الاصطناعي | 🎨 مصممون موهوبون"
                : "🌟 Multicultural Team | 🧠 AI Experts | 🎨 Talented Designers"}
            </p>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16 bg-card rounded-xl p-8 shadow-sm border">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            {isAr ? "🔬 تقنياتنا" : "🔬 Our Technology"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {isAr
              ? "نستخدم أحدث نماذج الذكاء الاصطناعي والتعلم الآلي لتقديم تحويلات دقيقة وسريعة. منصتنا مبنية على:"
              : "We leverage cutting-edge AI and machine learning models to deliver accurate, fast conversions. Our platform is built on:"}
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                {isAr
                  ? "نماذج معالجة اللغات الطبيعية المتقدمة (NLP) لفهم المحتوى"
                  : "Advanced Natural Language Processing (NLP) models for content understanding"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                {isAr
                  ? "رؤية حاسوبية قوية لاستخراج العناصر المرئية والحفاظ عليها"
                  : "Powerful computer vision for extracting and preserving visual elements"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                {isAr
                  ? "بنية تحتية سحابية قابلة للتطوير لمعالجة سريعة وموثوقة"
                  : "Scalable cloud infrastructure for fast, reliable processing"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                {isAr
                  ? "تشفير شامل لحماية بياناتك أثناء النقل والتخزين"
                  : "End-to-end encryption to protect your data in transit and at rest"}
              </span>
            </li>
          </ul>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-card rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary mb-2">113+</div>
              <div className="text-sm text-muted-foreground">
                {isAr ? "أدوات تحويل" : "Conversion Tools"}
              </div>
            </div>
            <div className="text-center bg-card rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">
                {isAr ? "لغات مدعومة" : "Languages Supported"}
              </div>
            </div>
            <div className="text-center bg-card rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">
                {isAr ? "متاح دائماً" : "Always Available"}
              </div>
            </div>
            <div className="text-center bg-card rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground">
                {isAr ? "إمكانيات" : "Possibilities"}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-10">
          <h2 className="text-2xl font-bold mb-4">
            {isAr ? "لنبقى على تواصل" : "Let's Stay Connected"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {isAr
              ? "لديك أسئلة أو اقتراحات؟ نحن نحب سماع آرائكم. تواصل معنا وسيكون فريقنا سعيداً بمساعدتك."
              : "Have questions or suggestions? We love hearing from you. Reach out and our team will be happy to help."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${params.locale}/tools`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isAr ? "استكشف الأدوات" : "Explore Tools"}
            </Link>
            <Link
              href={`/${params.locale}/pricing`}
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {isAr ? "عرض الأسعار" : "View Pricing"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
