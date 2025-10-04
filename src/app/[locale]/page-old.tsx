import Link from 'next/link'
// Locale home (/en, /ar) – lists featured landings for that locale
import Script from "next/script";
import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/data/locales";
import { slidesLandings } from "@/data/landings.slides";

import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Presentation, Video, Zap, Shield, Globe, Users } from 'lucide-react'


export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr ? "الصفحة الرئيسية" : "Home",
    description: isAr
      ? "حوّل المستندات إلى عروض تقديمية وفيديو باستخدام الذكاء الاصطناعي."
      : "Turn documents into slides and video with AI.",
    alternates: {
      canonical: `/${params.locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l === "ar" ? "ar-KW" : "en-US", `/${l}`])
      ),
    },
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isAr = locale === "ar";
  const featured = slidesLandings.filter((x) => x.locale === locale).slice(0, 6);

  const ar = slidesLandings.find((x) => x.locale === "ar");
  const en = slidesLandings.find((x) => x.locale === "en");

  return (
    
    
    <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
       <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Agentic</span>
          </div>
          <div className="flex items-center space-x-4">
            <SignInButton mode="modal">
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Get Started</Button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI-Powered Content Creation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create professional presentations and dub videos with artificial intelligence. 
            Transform your ideas into engaging content in minutes.
          </p>
          <div className="flex items-center justify-center gap-4">
            <SignUpButton mode="modal">
              <Button size="lg">
                Start Creating
              </Button>
            </SignUpButton>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Presentation className="h-6 w-6" />
                  <CardTitle>AI Presentations</CardTitle>
                </div>
                <CardDescription>
                  Generate professional slide decks from simple prompts. 
                  Edit, customize, and export in multiple formats.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Intelligent content generation</li>
                  <li>• Multiple language support</li>
                  <li>• Export to PPTX, PDF, ZIP</li>
                  <li>• Real-time collaboration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Video className="h-6 w-6" />
                  <CardTitle>Video Dubbing</CardTitle>
                </div>
                <CardDescription>
                  Automatically translate and dub your videos with AI-generated voices 
                  that maintain the original tone and emotion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Automatic speech recognition</li>
                  <li>• Neural machine translation</li>
                  <li>• High-quality voice synthesis</li>
                  <li>• Subtitle generation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Agentic?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Bank-grade security with SOC 2 compliance and end-to-end encryption.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Scale</h3>
              <p className="text-muted-foreground">
                Support for 10+ languages with cloud infrastructure that scales globally.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Built for teams with organization management and role-based access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Agentic. All rights reserved.</p>
        </div>
      </footer>
    </div>
      
       <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Create slides & videos with AI
        </h1>
        <p className="mt-4 text-lg opacity-80">
          Upload a document or paste a topic. We turn it into clean, branded content—fast.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            className="rounded-md bg-white text-black px-5 py-3 font-medium"
            href="/slides"
          >
            Open Slides Workbench
          </Link>
          <Link
            className="rounded-md border border-white/20 px-5 py-3 font-medium"
            href="/video"
          >
            Open Video Workbench
          </Link>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Popular landings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ar && (
            <Link
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
              href={`/${ar.locale}/slides/${encodeURIComponent(ar.slug)}`}
            >
              <div className="text-sm opacity-70 mb-1">Arabic</div>
              <div className="font-semibold">{ar.h1}</div>
              <div className="text-sm opacity-70 mt-1">{ar.description}</div>
            </Link>
          )}
          {en && (
            <Link
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
              href={`/${en.locale}/slides/${encodeURIComponent(en.slug)}`}
            >
              <div className="text-sm opacity-70 mb-1">English</div>
              <div className="font-semibold">{en.h1}</div>
              <div className="text-sm opacity-70 mt-1">{en.description}</div>
            </Link>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          {isAr ? "صفحات شائعة" : "Popular Landings"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.map((n) => (
            <Link
              key={n.slug}
              href={`/${n.locale}/slides/${encodeURIComponent(n.slug)}`}
              className="rounded-lg border border-white/10 p-4 hover:border-white/30"
            >
              <div className="font-semibold">{n.h1}</div>
              <div className="text-sm opacity-70 mt-1">{n.description}</div>
            </Link>
          ))}
        </div>
           <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Amazing Content with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate professional presentations and dub videos in multiple languages 
              using cutting-edge artificial intelligence technology.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/dashboard/presentations/new"
                className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to create stunning content
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powered by the Agentic Kernel, our platform offers professional-grade 
              AI tools for content creation and localization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Presentations</h3>
              <p className="text-gray-600">
                Generate professional slide decks from simple prompts. 
                Complete with citations, charts, and export options.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Dubbing</h3>
              <p className="text-gray-600">
                Translate and dub videos with AI voices in 12+ languages. 
                Automatic speech recognition and voice synthesis.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Real-time processing with the Agentic Kernel backend. 
                Generate content in minutes, not hours.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Language</h3>
              <p className="text-gray-600">
                Support for 12+ languages including English, Spanish, French, 
                German, and more. Global reach made easy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">API Access</h3>
              <p className="text-gray-600">
                Full REST API access for integration with your existing 
                workflow. SDKs available for Python and Node.js.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">
                Track performance, usage statistics, and content insights 
                with detailed analytics and reporting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your content workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators using AI to produce amazing content faster than ever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Creating Now
            </Link>
            <Link
              href="/dashboard/help"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
      </section>

      {/* Site-level JSON-LD (WebSite + SearchAction) */}
      <Script
        id={`ld-website-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://yoursite.com",
            name: isAr
              ? "O"
              : "O",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://yoursite.com/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>

  );
}



// // Locale home (/en, /ar) – lists featured landings for that locale
// import Link from "next/link";
// import Script from "next/script";
// import type { Metadata } from "next";
// import { LOCALES, type Locale } from "@/data/locales";
// import { slidesLandings } from "@/data/landings.slides";



// export const dynamicParams = false;

// export async function generateStaticParams() {
//   return LOCALES.map((locale) => ({ locale }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { locale: Locale };
// }): Promise<Metadata> {
//   const isAr = params.locale === "ar";
//   return {
//     title: isAr ? "الصفحة الرئيسية" : "Home",
//     description: isAr
//       ? "حوّل المستندات إلى عروض تقديمية وفيديو باستخدام الذكاء الاصطناعي."
//       : "Turn documents into slides and video with AI.",
//     alternates: {
//       canonical: `/${params.locale}`,
//       languages: Object.fromEntries(
//         LOCALES.map((l) => [l === "ar" ? "ar-KW" : "en-US", `/${l}`])
//       ),
//     },
//   };
// }

// export default function LocaleHome({ params }: { params: { locale: Locale } }) {
//   const { locale } = params;
//   const isAr = locale === "ar";
//   const featured = slidesLandings.filter((x) => x.locale === locale).slice(0, 6);

//   const ar = slidesLandings.find((x) => x.locale === "ar");
//   const en = slidesLandings.find((x) => x.locale === "en");

//   return (
    
    
//     <main className="container mx-auto px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
//       {/* <header className="mb-8">
//         <h1 className="text-3xl md:text-5xl font-extrabold">
//           {isAr ? "حوِّل المستندات إلى عروض وفيديو" : "Create Slides & Video from Docs"}
//         </h1>
//         <p className="mt-2 opacity-80">
//           {isAr
//             ? "ارفع ملفًا أو اكتب موضوعًا وسيُنشئ النظام عرضًا جاهزًا خلال لحظات."
//             : "Upload a file or write a topic; get a clean deck in seconds."}
//         </p>
//       </header> */}

//       {/* <section className="mb-10 flex flex-wrap gap-3">
//         <Link className="rounded-md bg-white text-black px-4 py-2 font-medium" href="/slides">
//           {isAr ? "فتح واجهة الشرائح" : "Open Slides Workbench"}
//         </Link>
//         <Link className="rounded-md border border-white/20 px-4 py-2 font-medium" href="/video">
//           {isAr ? "فتح واجهة الفيديو" : "Open Video Workbench"}
//         </Link>
//       </section> */}

      

//        <section className="text-center max-w-3xl mx-auto">
//         <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
//           Create slides & videos with AI
//         </h1>
//         <p className="mt-4 text-lg opacity-80">
//           Upload a document or paste a topic. We turn it into clean, branded content—fast.
//         </p>

//         <div className="mt-8 flex flex-wrap gap-3 justify-center">
//           <Link
//             className="rounded-md bg-white text-black px-5 py-3 font-medium"
//             href="/slides"
//           >
//             Open Slides Workbench
//           </Link>
//           <Link
//             className="rounded-md border border-white/20 px-5 py-3 font-medium"
//             href="/video"
//           >
//             Open Video Workbench
//           </Link>
//         </div>
//       </section>

//       <section className="mt-16 max-w-4xl mx-auto">
//         <h2 className="text-xl font-semibold mb-4">Popular landings</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {ar && (
//             <Link
//               className="rounded-lg border border-white/10 p-4 hover:border-white/30"
//               href={`/${ar.locale}/slides/${encodeURIComponent(ar.slug)}`}
//             >
//               <div className="text-sm opacity-70 mb-1">Arabic</div>
//               <div className="font-semibold">{ar.h1}</div>
//               <div className="text-sm opacity-70 mt-1">{ar.description}</div>
//             </Link>
//           )}
//           {en && (
//             <Link
//               className="rounded-lg border border-white/10 p-4 hover:border-white/30"
//               href={`/${en.locale}/slides/${encodeURIComponent(en.slug)}`}
//             >
//               <div className="text-sm opacity-70 mb-1">English</div>
//               <div className="font-semibold">{en.h1}</div>
//               <div className="text-sm opacity-70 mt-1">{en.description}</div>
//             </Link>
//           )}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-4">
//           {isAr ? "صفحات شائعة" : "Popular Landings"}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//           {featured.map((n) => (
//             <Link
//               key={n.slug}
//               href={`/${n.locale}/slides/${encodeURIComponent(n.slug)}`}
//               className="rounded-lg border border-white/10 p-4 hover:border-white/30"
//             >
//               <div className="font-semibold">{n.h1}</div>
//               <div className="text-sm opacity-70 mt-1">{n.description}</div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Site-level JSON-LD (WebSite + SearchAction) */}
//       <Script
//         id={`ld-website-${locale}`}
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebSite",
//             url: "https://yoursite.com",
//             name: isAr
//               ? "O"
//               : "O",
//             potentialAction: {
//               "@type": "SearchAction",
//               target: "https://yoursite.com/{search_term_string}",
//               "query-input": "required name=search_term_string",
//             },
//           }),
//         }}
//       />
//     </main>

//   );
// }
