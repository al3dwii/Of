'use client'

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/data/locales";
import { templates, templateCategories, getTemplatesByCategory, type TemplateCategory } from "@/data/templates";

export default function TemplatesPage({ params }: { params: { locale: Locale } }) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const isAr = params.locale === "ar";
  
  const filteredTemplates = getTemplatesByCategory(selectedCategory);
  
  // Get localized category name
  const getCategoryName = (category: typeof templateCategories[0]) => {
    switch (params.locale) {
      case 'ar': return category.nameAr;
      case 'es': return category.nameEs;
      case 'fr': return category.nameFr;
      default: return category.name;
    }
  };
  
  const getCategoryDescription = (category: typeof templateCategories[0]) => {
    switch (params.locale) {
      case 'ar': return category.descriptionAr;
      case 'es': return category.descriptionEs;
      case 'fr': return category.descriptionFr;
      default: return category.description;
    }
  };
  
  const getTemplateTitle = (template: typeof templates[0]) => {
    switch (params.locale) {
      case 'ar': return template.titleAr;
      case 'es': return template.titleEs;
      case 'fr': return template.titleFr;
      default: return template.title;
    }
  };
  
  const getTemplateDescription = (template: typeof templates[0]) => {
    switch (params.locale) {
      case 'ar': return template.descriptionAr;
      case 'es': return template.descriptionEs;
      case 'fr': return template.descriptionFr;
      default: return template.description;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isAr ? 'قوالب العروض التقديمية' : params.locale === 'es' ? 'Plantillas de Presentación' : params.locale === 'fr' ? 'Modèles de Présentation' : 'Presentation Templates'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {isAr ? 'اختر من مجموعة متنوعة من القوالب الاحترافية' : params.locale === 'es' ? 'Elige entre una variedad de plantillas profesionales' : params.locale === 'fr' ? 'Choisissez parmi une variété de modèles professionnels' : 'Choose from a variety of professional templates'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-3 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {isAr ? 'الفئات' : params.locale === 'es' ? 'Categorías' : params.locale === 'fr' ? 'Catégories' : 'Categories'}
              </h2>
              
              <nav className="space-y-1">
                {/* All Templates */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">🎯</span>
                  <span>{isAr ? 'جميع القوالب' : params.locale === 'es' ? 'Todas las Plantillas' : params.locale === 'fr' ? 'Tous les Modèles' : 'All Templates'}</span>
                  <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded-full">{templates.length}</span>
                </button>
                
                {/* Category Buttons */}
                {templateCategories.map((category) => {
                  const categoryTemplates = templates.filter(t => t.category === category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="flex-1 text-left">{getCategoryName(category)}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{categoryTemplates.length}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Template Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'all' 
                  ? (isAr ? 'جميع القوالب' : params.locale === 'es' ? 'Todas las Plantillas' : params.locale === 'fr' ? 'Tous les Modèles' : 'All Templates')
                  : getCategoryName(templateCategories.find(c => c.id === selectedCategory)!)
                }
              </h2>
              <p className="text-gray-600">
                {filteredTemplates.length} {isAr ? 'قالب' : params.locale === 'es' ? 'plantillas' : params.locale === 'fr' ? 'modèles' : 'templates'}
              </p>
            </div>

            {/* Template Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group transform hover:scale-105"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-5xl mb-3">{templateCategories.find(c => c.id === template.category)?.icon}</div>
                        <div className="text-base font-medium text-gray-700">{template.slides} slides</div>
                      </div>
                    </div>
                    {template.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                        {isAr ? 'مميز' : params.locale === 'es' ? 'Premium' : params.locale === 'fr' ? 'Premium' : 'Premium'}
                      </div>
                    )}
                    {/* Color Palette */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {template.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {getTemplateTitle(template)}
                    </h3>
                    <p className="text-base text-gray-600 mb-5">
                      {getTemplateDescription(template)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/${params.locale}/dashboard/presentations/new?template=${template.id}`}
                        className="flex-1 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-indigo-700 transition-colors text-center"
                      >
                        {isAr ? 'استخدم القالب' : params.locale === 'es' ? 'Usar Plantilla' : params.locale === 'fr' ? 'Utiliser' : 'Use Template'}
                      </Link>
                      <Link
                        href={`/${params.locale}/templates/preview/${template.id}`}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {isAr ? 'معاينة' : params.locale === 'es' ? 'Vista Previa' : params.locale === 'fr' ? 'Aperçu' : 'Preview'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {isAr ? 'لا توجد قوالب' : params.locale === 'es' ? 'No hay plantillas' : params.locale === 'fr' ? 'Aucun modèle' : 'No templates found'}
                </h3>
                <p className="text-gray-600">
                  {isAr ? 'جرب فئة أخرى' : params.locale === 'es' ? 'Prueba otra categoría' : params.locale === 'fr' ? 'Essayez une autre catégorie' : 'Try another category'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
