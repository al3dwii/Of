'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Locale } from '@/data/locales'
import { templates, templateCategories } from '@/data/templates'
import { getTemplateContent } from '@/data/template-content'

interface PageProps {
  params: {
    locale: Locale
    id: string
  }
}

export default function TemplatePreviewPage({ params }: PageProps) {
  const { locale, id } = params
  const isAr = locale === 'ar'
  
  // Find the template
  const template = templates.find(t => t.id === id)
  if (!template) {
    return notFound()
  }
  
  // Get content
  const content = getTemplateContent(id)
  if (!content) {
    return notFound()
  }
  
  // Get localized text
  const getText = (obj: any) => {
    return obj[locale] || obj.en
  }
  
  const category = templateCategories.find(c => c.id === template.category)

  return (
    <main className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-indigo-600">
              {isAr ? 'الرئيسية' : locale === 'es' ? 'Inicio' : locale === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/templates`} className="hover:text-indigo-600">
              {isAr ? 'القوالب' : locale === 'es' ? 'Plantillas' : locale === 'fr' ? 'Modèles' : 'Templates'}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {getText(content.seoTitle)}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-2xl">{category?.icon}</span>
              <span className="font-medium">
                {category && (locale === 'ar' ? category.nameAr : locale === 'es' ? category.nameEs : locale === 'fr' ? category.nameFr : category.name)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getText(content.seoTitle)}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              {getText(content.seoDescription)}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{template.slides}</div>
                <div className="text-sm opacity-90">
                  {isAr ? 'شريحة' : locale === 'es' ? 'Diapositivas' : locale === 'fr' ? 'Diapositives' : 'Slides'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{template.colors.length}</div>
                <div className="text-sm opacity-90">
                  {isAr ? 'ألوان' : locale === 'es' ? 'Colores' : locale === 'fr' ? 'Couleurs' : 'Colors'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {template.isPremium ? (isAr ? 'مميز' : locale === 'es' ? 'Premium' : locale === 'fr' ? 'Premium' : 'Premium') : (isAr ? 'مجاني' : locale === 'es' ? 'Gratis' : locale === 'fr' ? 'Gratuit' : 'Free')}
                </div>
                <div className="text-sm opacity-90">
                  {isAr ? 'النوع' : locale === 'es' ? 'Tipo' : locale === 'fr' ? 'Type' : 'Type'}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/dashboard/presentations/new?template=${template.id}`}
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
              >
                {isAr ? '🚀 استخدم القالب الآن' : locale === 'es' ? '🚀 Usar Plantilla Ahora' : locale === 'fr' ? '🚀 Utiliser Maintenant' : '🚀 Use This Template'}
              </Link>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/30 transition-colors border-2 border-white/30">
                {isAr ? '⬇️ تحميل PDF' : locale === 'es' ? '⬇️ Descargar PDF' : locale === 'fr' ? '⬇️ Télécharger PDF' : '⬇️ Download PDF'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {isAr ? 'معاينة القالب' : locale === 'es' ? 'Vista Previa' : locale === 'fr' ? 'Aperçu' : 'Template Preview'}
          </h2>
          
          {/* Mockup Preview */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 mb-8">
            <div className="bg-white rounded-lg shadow-2xl aspect-video flex items-center justify-center">
              <div className="text-center p-12">
                <div className="text-6xl mb-4">{category?.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {locale === 'ar' ? template.titleAr : locale === 'es' ? template.titleEs : locale === 'fr' ? template.titleFr : template.title}
                </div>
                <div className="text-lg text-gray-600">{template.slides} Slides</div>
                
                {/* Color Palette */}
                <div className="flex justify-center gap-2 mt-6">
                  {template.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {getText(content.introduction)}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {getText(content.features.title)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.features.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <p className="text-gray-700">{getText(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {getText(content.howToUse.title)}
          </h2>
          <div className="space-y-6">
            {content.howToUse.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-lg text-gray-700">{getText(step)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {getText(content.useCases.title)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.useCases.items.map((item, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="text-3xl mb-3">💼</div>
                <p className="text-gray-800 font-medium">{getText(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            {getText(content.whyChoose.title)}
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            {getText(content.whyChoose.content)}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isAr ? 'جاهز للبدء؟' : locale === 'es' ? '¿Listo para Comenzar?' : locale === 'fr' ? 'Prêt à Commencer?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {isAr ? 'ابدأ في إنشاء عرضك التقديمي الاحترافي الآن' : locale === 'es' ? 'Comienza a crear tu presentación profesional ahora' : locale === 'fr' ? 'Commencez à créer votre présentation professionnelle maintenant' : 'Start creating your professional presentation now'}
          </p>
          <Link
            href={`/${locale}/dashboard/presentations/new?template=${template.id}`}
            className="inline-block bg-indigo-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-colors shadow-xl"
          >
            {isAr ? '🚀 استخدم القالب' : locale === 'es' ? '🚀 Usar Plantilla' : locale === 'fr' ? '🚀 Utiliser Modèle' : '🚀 Use Template'}
          </Link>
        </div>
      </section>

      {/* Related Templates */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isAr ? 'قوالب ذات صلة' : locale === 'es' ? 'Plantillas Relacionadas' : locale === 'fr' ? 'Modèles Connexes' : 'Related Templates'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates
              .filter(t => t.category === template.category && t.id !== template.id)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/${locale}/templates/preview/${related.id}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl">{category?.icon}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {locale === 'ar' ? related.titleAr : locale === 'es' ? related.titleEs : locale === 'fr' ? related.titleFr : related.title}
                    </h3>
                    <p className="text-sm text-gray-600">{related.slides} slides</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
