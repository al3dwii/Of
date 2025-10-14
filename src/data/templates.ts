// src/data/templates.ts

export interface Template {
  id: string
  title: string
  titleAr: string
  titleEs: string
  titleFr: string
  description: string
  descriptionAr: string
  descriptionEs: string
  descriptionFr: string
  category: TemplateCategory
  thumbnail: string
  isPremium: boolean
  slides: number
  colors: string[]
}

export type TemplateCategory = 
  | 'business'
  | 'education'
  | 'marketing'
  | 'technology'
  | 'healthcare'
  | 'children'
  | 'finance'
  | 'creative'

export interface CategoryInfo {
  id: TemplateCategory
  name: string
  nameAr: string
  nameEs: string
  nameFr: string
  icon: string
  description: string
  descriptionAr: string
  descriptionEs: string
  descriptionFr: string
}

export const templateCategories: CategoryInfo[] = [
  {
    id: 'business',
    name: 'Business',
    nameAr: 'الأعمال',
    nameEs: 'Negocios',
    nameFr: 'Affaires',
    icon: '💼',
    description: 'Professional business presentations',
    descriptionAr: 'عروض تقديمية احترافية للأعمال',
    descriptionEs: 'Presentaciones empresariales profesionales',
    descriptionFr: 'Présentations professionnelles'
  },
  {
    id: 'education',
    name: 'Education',
    nameAr: 'التعليم',
    nameEs: 'Educación',
    nameFr: 'Éducation',
    icon: '🎓',
    description: 'Templates for teachers and students',
    descriptionAr: 'قوالب للمعلمين والطلاب',
    descriptionEs: 'Plantillas para profesores y estudiantes',
    descriptionFr: 'Modèles pour enseignants et étudiants'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    nameAr: 'التسويق',
    nameEs: 'Marketing',
    nameFr: 'Marketing',
    icon: '📊',
    description: 'Marketing and sales presentations',
    descriptionAr: 'عروض التسويق والمبيعات',
    descriptionEs: 'Presentaciones de marketing y ventas',
    descriptionFr: 'Présentations marketing et ventes'
  },
  {
    id: 'technology',
    name: 'Technology',
    nameAr: 'التكنولوجيا',
    nameEs: 'Tecnología',
    nameFr: 'Technologie',
    icon: '💻',
    description: 'Tech and software presentations',
    descriptionAr: 'عروض التقنية والبرمجيات',
    descriptionEs: 'Presentaciones de tecnología y software',
    descriptionFr: 'Présentations tech et logiciels'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    nameAr: 'الرعاية الصحية',
    nameEs: 'Salud',
    nameFr: 'Santé',
    icon: '🏥',
    description: 'Medical and healthcare templates',
    descriptionAr: 'قوالب طبية وصحية',
    descriptionEs: 'Plantillas médicas y de salud',
    descriptionFr: 'Modèles médicaux et santé'
  },
  {
    id: 'children',
    name: 'Children',
    nameAr: 'الأطفال',
    nameEs: 'Niños',
    nameFr: 'Enfants',
    icon: '🧒',
    description: 'Fun templates for kids',
    descriptionAr: 'قوالب ممتعة للأطفال',
    descriptionEs: 'Plantillas divertidas para niños',
    descriptionFr: 'Modèles amusants pour enfants'
  },
  {
    id: 'finance',
    name: 'Finance',
    nameAr: 'المالية',
    nameEs: 'Finanzas',
    nameFr: 'Finance',
    icon: '💰',
    description: 'Financial reports and analysis',
    descriptionAr: 'التقارير والتحليلات المالية',
    descriptionEs: 'Informes y análisis financieros',
    descriptionFr: 'Rapports et analyses financières'
  },
  {
    id: 'creative',
    name: 'Creative',
    nameAr: 'إبداعي',
    nameEs: 'Creativo',
    nameFr: 'Créatif',
    icon: '🎨',
    description: 'Artistic and creative designs',
    descriptionAr: 'تصاميم فنية وإبداعية',
    descriptionEs: 'Diseños artísticos y creativos',
    descriptionFr: 'Designs artistiques et créatifs'
  }
]

export const templates: Template[] = [
  // Business Templates
  {
    id: 'business-1',
    title: 'Corporate Business Plan',
    titleAr: 'خطة عمل مؤسسية',
    titleEs: 'Plan de Negocios Corporativo',
    titleFr: 'Plan d\'Affaires d\'Entreprise',
    description: 'Professional business plan template',
    descriptionAr: 'قالب خطة عمل احترافية',
    descriptionEs: 'Plantilla profesional de plan de negocios',
    descriptionFr: 'Modèle professionnel de plan d\'affaires',
    category: 'business',
    thumbnail: '/templates/business-1.jpg',
    isPremium: false,
    slides: 20,
    colors: ['#1E40AF', '#FFFFFF', '#F3F4F6']
  },
  {
    id: 'business-2',
    title: 'Executive Summary',
    titleAr: 'ملخص تنفيذي',
    titleEs: 'Resumen Ejecutivo',
    titleFr: 'Résumé Exécutif',
    description: 'Clean executive summary template',
    descriptionAr: 'قالب ملخص تنفيذي نظيف',
    descriptionEs: 'Plantilla limpia de resumen ejecutivo',
    descriptionFr: 'Modèle propre de résumé exécutif',
    category: 'business',
    thumbnail: '/templates/business-2.jpg',
    isPremium: true,
    slides: 15,
    colors: ['#059669', '#FFFFFF', '#ECFDF5']
  },
  {
    id: 'business-3',
    title: 'Startup Pitch Deck',
    titleAr: 'عرض تقديمي للشركات الناشئة',
    titleEs: 'Presentación para Startups',
    titleFr: 'Pitch Deck Startup',
    description: 'Modern startup pitch template',
    descriptionAr: 'قالب عرض حديث للشركات الناشئة',
    descriptionEs: 'Plantilla moderna para startups',
    descriptionFr: 'Modèle moderne pour startups',
    category: 'business',
    thumbnail: '/templates/business-3.jpg',
    isPremium: false,
    slides: 25,
    colors: ['#7C3AED', '#FFFFFF', '#F5F3FF']
  },

  // Education Templates
  {
    id: 'education-1',
    title: 'Classroom Lesson',
    titleAr: 'درس في الفصل',
    titleEs: 'Lección de Clase',
    titleFr: 'Leçon en Classe',
    description: 'Interactive lesson template',
    descriptionAr: 'قالب درس تفاعلي',
    descriptionEs: 'Plantilla de lección interactiva',
    descriptionFr: 'Modèle de leçon interactive',
    category: 'education',
    thumbnail: '/templates/education-1.jpg',
    isPremium: false,
    slides: 18,
    colors: ['#DC2626', '#FFFFFF', '#FEF2F2']
  },
  {
    id: 'education-2',
    title: 'Student Project',
    titleAr: 'مشروع طالب',
    titleEs: 'Proyecto Estudiantil',
    titleFr: 'Projet Étudiant',
    description: 'Student presentation template',
    descriptionAr: 'قالب عرض تقديمي للطلاب',
    descriptionEs: 'Plantilla de presentación estudiantil',
    descriptionFr: 'Modèle de présentation étudiante',
    category: 'education',
    thumbnail: '/templates/education-2.jpg',
    isPremium: false,
    slides: 12,
    colors: ['#2563EB', '#FFFFFF', '#EFF6FF']
  },
  {
    id: 'education-3',
    title: 'University Thesis',
    titleAr: 'أطروحة جامعية',
    titleEs: 'Tesis Universitaria',
    titleFr: 'Thèse Universitaire',
    description: 'Academic thesis presentation',
    descriptionAr: 'عرض تقديمي للأطروحة الأكاديمية',
    descriptionEs: 'Presentación de tesis académica',
    descriptionFr: 'Présentation de thèse académique',
    category: 'education',
    thumbnail: '/templates/education-3.jpg',
    isPremium: true,
    slides: 30,
    colors: ['#0891B2', '#FFFFFF', '#ECFEFF']
  },

  // Marketing Templates
  {
    id: 'marketing-1',
    title: 'Social Media Strategy',
    titleAr: 'استراتيجية وسائل التواصل',
    titleEs: 'Estrategia de Redes Sociales',
    titleFr: 'Stratégie Réseaux Sociaux',
    description: 'Social media marketing template',
    descriptionAr: 'قالب تسويق وسائل التواصل الاجتماعي',
    descriptionEs: 'Plantilla de marketing en redes sociales',
    descriptionFr: 'Modèle de marketing sur réseaux sociaux',
    category: 'marketing',
    thumbnail: '/templates/marketing-1.jpg',
    isPremium: false,
    slides: 22,
    colors: ['#EC4899', '#FFFFFF', '#FDF2F8']
  },
  {
    id: 'marketing-2',
    title: 'Product Launch',
    titleAr: 'إطلاق المنتج',
    titleEs: 'Lanzamiento de Producto',
    titleFr: 'Lancement de Produit',
    description: 'Product launch presentation',
    descriptionAr: 'عرض تقديمي لإطلاق المنتج',
    descriptionEs: 'Presentación de lanzamiento de producto',
    descriptionFr: 'Présentation de lancement de produit',
    category: 'marketing',
    thumbnail: '/templates/marketing-2.jpg',
    isPremium: true,
    slides: 28,
    colors: ['#F59E0B', '#FFFFFF', '#FFFBEB']
  },

  // Technology Templates
  {
    id: 'technology-1',
    title: 'Tech Product Demo',
    titleAr: 'عرض توضيحي للمنتج التقني',
    titleEs: 'Demo de Producto Tecnológico',
    titleFr: 'Démo Produit Tech',
    description: 'Technology product demonstration',
    descriptionAr: 'عرض توضيحي للمنتج التقني',
    descriptionEs: 'Demostración de producto tecnológico',
    descriptionFr: 'Démonstration de produit technologique',
    category: 'technology',
    thumbnail: '/templates/technology-1.jpg',
    isPremium: false,
    slides: 20,
    colors: ['#6366F1', '#FFFFFF', '#EEF2FF']
  },
  {
    id: 'technology-2',
    title: 'Software Architecture',
    titleAr: 'هندسة البرمجيات',
    titleEs: 'Arquitectura de Software',
    titleFr: 'Architecture Logicielle',
    description: 'Software architecture presentation',
    descriptionAr: 'عرض تقديمي لهندسة البرمجيات',
    descriptionEs: 'Presentación de arquitectura de software',
    descriptionFr: 'Présentation d\'architecture logicielle',
    category: 'technology',
    thumbnail: '/templates/technology-2.jpg',
    isPremium: true,
    slides: 24,
    colors: ['#10B981', '#FFFFFF', '#D1FAE5']
  },

  // Healthcare Templates
  {
    id: 'healthcare-1',
    title: 'Medical Research',
    titleAr: 'البحث الطبي',
    titleEs: 'Investigación Médica',
    titleFr: 'Recherche Médicale',
    description: 'Medical research presentation',
    descriptionAr: 'عرض تقديمي للبحث الطبي',
    descriptionEs: 'Presentación de investigación médica',
    descriptionFr: 'Présentation de recherche médicale',
    category: 'healthcare',
    thumbnail: '/templates/healthcare-1.jpg',
    isPremium: false,
    slides: 26,
    colors: ['#14B8A6', '#FFFFFF', '#CCFBF1']
  },

  // Children Templates
  {
    id: 'children-1',
    title: 'Kids Story Time',
    titleAr: 'وقت قصة الأطفال',
    titleEs: 'Hora del Cuento',
    titleFr: 'Heure du Conte',
    description: 'Colorful kids story template',
    descriptionAr: 'قالب قصة ملون للأطفال',
    descriptionEs: 'Plantilla colorida de cuentos para niños',
    descriptionFr: 'Modèle coloré d\'histoire pour enfants',
    category: 'children',
    thumbnail: '/templates/children-1.jpg',
    isPremium: false,
    slides: 15,
    colors: ['#F472B6', '#FCD34D', '#A78BFA']
  },
  {
    id: 'children-2',
    title: 'Fun Learning',
    titleAr: 'التعلم الممتع',
    titleEs: 'Aprendizaje Divertido',
    titleFr: 'Apprentissage Amusant',
    description: 'Fun educational template for kids',
    descriptionAr: 'قالب تعليمي ممتع للأطفال',
    descriptionEs: 'Plantilla educativa divertida para niños',
    descriptionFr: 'Modèle éducatif amusant pour enfants',
    category: 'children',
    thumbnail: '/templates/children-2.jpg',
    isPremium: false,
    slides: 18,
    colors: ['#60A5FA', '#FBBF24', '#F87171']
  },

  // Finance Templates
  {
    id: 'finance-1',
    title: 'Financial Report',
    titleAr: 'التقرير المالي',
    titleEs: 'Informe Financiero',
    titleFr: 'Rapport Financier',
    description: 'Professional financial report',
    descriptionAr: 'تقرير مالي احترافي',
    descriptionEs: 'Informe financiero profesional',
    descriptionFr: 'Rapport financier professionnel',
    category: 'finance',
    thumbnail: '/templates/finance-1.jpg',
    isPremium: true,
    slides: 32,
    colors: ['#1F2937', '#FFFFFF', '#F9FAFB']
  },

  // Creative Templates
  {
    id: 'creative-1',
    title: 'Portfolio Showcase',
    titleAr: 'عرض الأعمال',
    titleEs: 'Portafolio Creativo',
    titleFr: 'Portfolio Créatif',
    description: 'Creative portfolio template',
    descriptionAr: 'قالب محفظة أعمال إبداعية',
    descriptionEs: 'Plantilla de portafolio creativo',
    descriptionFr: 'Modèle de portfolio créatif',
    category: 'creative',
    thumbnail: '/templates/creative-1.jpg',
    isPremium: false,
    slides: 16,
    colors: ['#8B5CF6', '#EC4899', '#F59E0B']
  }
]

export function getTemplatesByCategory(category: TemplateCategory | 'all'): Template[] {
  if (category === 'all') {
    return templates
  }
  return templates.filter(t => t.category === category)
}

export function getCategoryInfo(id: TemplateCategory): CategoryInfo | undefined {
  return templateCategories.find(c => c.id === id)
}
