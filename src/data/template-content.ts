// src/data/template-content.ts
import type { Template } from './templates'

export interface TemplateContent {
  templateId: string
  
  // SEO Content
  seoTitle: {
    en: string
    ar: string
    es: string
    fr: string
  }
  
  seoDescription: {
    en: string
    ar: string
    es: string
    fr: string
  }
  
  // Main Content
  introduction: {
    en: string
    ar: string
    es: string
    fr: string
  }
  
  // Features/Highlights
  features: {
    title: {
      en: string
      ar: string
      es: string
      fr: string
    }
    items: Array<{
      en: string
      ar: string
      es: string
      fr: string
    }>
  }
  
  // How to use
  howToUse: {
    title: {
      en: string
      ar: string
      es: string
      fr: string
    }
    steps: Array<{
      en: string
      ar: string
      es: string
      fr: string
    }>
  }
  
  // Use cases
  useCases: {
    title: {
      en: string
      ar: string
      es: string
      fr: string
    }
    items: Array<{
      en: string
      ar: string
      es: string
      fr: string
    }>
  }
  
  // Why choose this template
  whyChoose: {
    title: {
      en: string
      ar: string
      es: string
      fr: string
    }
    content: {
      en: string
      ar: string
      es: string
      fr: string
    }
  }
  
  // Related keywords for SEO
  keywords: {
    en: string[]
    ar: string[]
    es: string[]
    fr: string[]
  }
}

// Example: Corporate Business Plan Template Content
export const templateContents: Record<string, TemplateContent> = {
  'business-1': {
    templateId: 'business-1',
    
    seoTitle: {
      en: 'Corporate Business Plan PowerPoint Template - Professional & Ready to Use',
      ar: 'قالب بوربوينت خطة عمل مؤسسية - احترافي وجاهز للاستخدام',
      es: 'Plantilla PowerPoint Plan de Negocios Corporativo - Profesional y Lista',
      fr: 'Modèle PowerPoint Plan d\'Affaires d\'Entreprise - Professionnel et Prêt'
    },
    
    seoDescription: {
      en: 'Download our professional corporate business plan PowerPoint template. 20 slides, fully editable, perfect for startups, investors presentations, and business proposals.',
      ar: 'حمّل قالب بوربوينت خطة العمل المؤسسية الاحترافي. 20 شريحة، قابل للتعديل بالكامل، مثالي للشركات الناشئة وعروض المستثمرين.',
      es: 'Descarga nuestra plantilla PowerPoint profesional de plan de negocios corporativo. 20 diapositivas, totalmente editable, perfecta para startups y presentaciones.',
      fr: 'Téléchargez notre modèle PowerPoint professionnel de plan d\'affaires. 20 diapositives, entièrement modifiable, parfait pour startups et présentations.'
    },
    
    introduction: {
      en: `A business plan is the foundation of any successful venture. Our Corporate Business Plan PowerPoint template provides you with a professional, comprehensive structure to present your business idea, strategy, and financial projections to investors, partners, or stakeholders.

This template is designed by business consultants and presentation designers to ensure your business plan looks professional and communicates your vision effectively. Whether you're a startup seeking funding or an established company planning expansion, this template adapts to your needs.`,
      
      ar: `خطة العمل هي الأساس لأي مشروع ناجح. يوفر لك قالب بوربوينت خطة العمل المؤسسية هيكلًا احترافيًا وشاملاً لعرض فكرة عملك واستراتيجيتك وتوقعاتك المالية للمستثمرين أو الشركاء أو أصحاب المصلحة.

تم تصميم هذا القالب من قبل مستشاري الأعمال ومصممي العروض التقديمية لضمان أن تبدو خطة عملك احترافية وتوصل رؤيتك بفعالية. سواء كنت شركة ناشئة تسعى للحصول على تمويل أو شركة راسخة تخطط للتوسع، فإن هذا القالب يتكيف مع احتياجاتك.`,
      
      es: `Un plan de negocios es la base de cualquier empresa exitosa. Nuestra plantilla PowerPoint de Plan de Negocios Corporativo le proporciona una estructura profesional y completa para presentar su idea de negocio, estrategia y proyecciones financieras a inversores, socios o partes interesadas.

Esta plantilla está diseñada por consultores de negocios y diseñadores de presentaciones para garantizar que su plan de negocios se vea profesional y comunique su visión de manera efectiva. Ya sea una startup que busca financiación o una empresa establecida que planea expandirse, esta plantilla se adapta a sus necesidades.`,
      
      fr: `Un plan d'affaires est la base de toute entreprise réussie. Notre modèle PowerPoint de Plan d'Affaires d'Entreprise vous fournit une structure professionnelle et complète pour présenter votre idée d'entreprise, votre stratégie et vos projections financières aux investisseurs, partenaires ou parties prenantes.

Ce modèle est conçu par des consultants en affaires et des designers de présentations pour garantir que votre plan d'affaires soit professionnel et communique efficacement votre vision. Que vous soyez une startup cherchant du financement ou une entreprise établie planifiant son expansion, ce modèle s'adapte à vos besoins.`
    },
    
    features: {
      title: {
        en: 'Template Features',
        ar: 'مميزات القالب',
        es: 'Características de la Plantilla',
        fr: 'Caractéristiques du Modèle'
      },
      items: [
        {
          en: '20 professionally designed slides',
          ar: '20 شريحة مصممة بشكل احترافي',
          es: '20 diapositivas diseñadas profesionalmente',
          fr: '20 diapositives conçues professionnellement'
        },
        {
          en: 'Fully editable content and colors',
          ar: 'محتوى وألوان قابلة للتعديل بالكامل',
          es: 'Contenido y colores totalmente editables',
          fr: 'Contenu et couleurs entièrement modifiables'
        },
        {
          en: 'Modern blue and white color scheme',
          ar: 'نظام ألوان أزرق وأبيض عصري',
          es: 'Esquema de colores azul y blanco moderno',
          fr: 'Palette de couleurs bleu et blanc moderne'
        },
        {
          en: 'Includes executive summary, market analysis, financial projections',
          ar: 'يتضمن ملخص تنفيذي، تحليل السوق، التوقعات المالية',
          es: 'Incluye resumen ejecutivo, análisis de mercado, proyecciones financieras',
          fr: 'Comprend résumé exécutif, analyse de marché, projections financières'
        },
        {
          en: 'Charts and graphs for data visualization',
          ar: 'رسوم بيانية ورسومات لتصور البيانات',
          es: 'Gráficos y tablas para visualización de datos',
          fr: 'Graphiques et tableaux pour visualisation des données'
        },
        {
          en: 'Professional icons and infographics',
          ar: 'أيقونات رسومية بيانية احترافية',
          es: 'Iconos e infografías profesionales',
          fr: 'Icônes et infographies professionnelles'
        },
        {
          en: 'Easy to customize for any industry',
          ar: 'سهل التخصيص لأي صناعة',
          es: 'Fácil de personalizar para cualquier industria',
          fr: 'Facile à personnaliser pour tout secteur'
        },
        {
          en: 'Compatible with PowerPoint, Google Slides, Keynote',
          ar: 'متوافق مع PowerPoint و Google Slides و Keynote',
          es: 'Compatible con PowerPoint, Google Slides, Keynote',
          fr: 'Compatible avec PowerPoint, Google Slides, Keynote'
        }
      ]
    },
    
    howToUse: {
      title: {
        en: 'How to Use This Template',
        ar: 'كيفية استخدام هذا القالب',
        es: 'Cómo Usar Esta Plantilla',
        fr: 'Comment Utiliser Ce Modèle'
      },
      steps: [
        {
          en: 'Download the template and open it in PowerPoint or Google Slides',
          ar: 'قم بتحميل القالب وافتحه في PowerPoint أو Google Slides',
          es: 'Descarga la plantilla y ábrela en PowerPoint o Google Slides',
          fr: 'Téléchargez le modèle et ouvrez-le dans PowerPoint ou Google Slides'
        },
        {
          en: 'Replace the placeholder text with your business information',
          ar: 'استبدل النص التجريبي بمعلومات عملك',
          es: 'Reemplaza el texto de marcador de posición con tu información comercial',
          fr: 'Remplacez le texte d\'espace réservé par vos informations commerciales'
        },
        {
          en: 'Customize colors to match your brand identity',
          ar: 'خصص الألوان لتتناسب مع هوية علامتك التجارية',
          es: 'Personaliza los colores para que coincidan con tu identidad de marca',
          fr: 'Personnalisez les couleurs pour correspondre à votre identité de marque'
        },
        {
          en: 'Update charts and graphs with your financial data',
          ar: 'قم بتحديث الرسوم البيانية ببياناتك المالية',
          es: 'Actualiza gráficos y tablas con tus datos financieros',
          fr: 'Mettez à jour les graphiques avec vos données financières'
        },
        {
          en: 'Add your logo and company images',
          ar: 'أضف شعارك وصور شركتك',
          es: 'Agrega tu logo e imágenes de la empresa',
          fr: 'Ajoutez votre logo et images d\'entreprise'
        },
        {
          en: 'Present to investors or export as PDF',
          ar: 'قدم للمستثمرين أو قم بالتصدير كملف PDF',
          es: 'Presenta a inversores o exporta como PDF',
          fr: 'Présentez aux investisseurs ou exportez en PDF'
        }
      ]
    },
    
    useCases: {
      title: {
        en: 'Perfect For',
        ar: 'مثالي لـ',
        es: 'Perfecto Para',
        fr: 'Parfait Pour'
      },
      items: [
        {
          en: 'Startup founders seeking investment',
          ar: 'مؤسسو الشركات الناشئة الذين يسعون للحصول على استثمار',
          es: 'Fundadores de startups que buscan inversión',
          fr: 'Fondateurs de startups cherchant des investissements'
        },
        {
          en: 'Business consultants and advisors',
          ar: 'مستشارو ومستشارو الأعمال',
          es: 'Consultores y asesores empresariales',
          fr: 'Consultants et conseillers en affaires'
        },
        {
          en: 'MBA students and business school projects',
          ar: 'طلاب ماجستير إدارة الأعمال ومشاريع كلية الأعمال',
          es: 'Estudiantes de MBA y proyectos de escuela de negocios',
          fr: 'Étudiants MBA et projets d\'école de commerce'
        },
        {
          en: 'Entrepreneurs launching new ventures',
          ar: 'رواد الأعمال الذين يطلقون مشاريع جديدة',
          es: 'Emprendedores lanzando nuevas empresas',
          fr: 'Entrepreneurs lançant de nouvelles entreprises'
        },
        {
          en: 'Corporate strategic planning teams',
          ar: 'فرق التخطيط الاستراتيجي للشركات',
          es: 'Equipos de planificación estratégica corporativa',
          fr: 'Équipes de planification stratégique d\'entreprise'
        }
      ]
    },
    
    whyChoose: {
      title: {
        en: 'Why Choose This Template?',
        ar: 'لماذا تختار هذا القالب؟',
        es: '¿Por Qué Elegir Esta Plantilla?',
        fr: 'Pourquoi Choisir Ce Modèle?'
      },
      content: {
        en: 'Our Corporate Business Plan template stands out because it combines professional design with practical functionality. Created by business experts, it follows the standard business plan structure that investors expect. The clean, modern design ensures your content is the focus, while the comprehensive slides cover every aspect of a complete business plan. Save hours of design work and focus on what matters - your business strategy.',
        ar: 'يتميز قالب خطة العمل المؤسسية الخاص بنا لأنه يجمع بين التصميم الاحترافي والوظائف العملية. تم إنشاؤه من قبل خبراء الأعمال، ويتبع هيكل خطة العمل القياسي الذي يتوقعه المستثمرون. يضمن التصميم النظيف والعصري أن يكون المحتوى الخاص بك هو التركيز، بينما تغطي الشرائح الشاملة كل جانب من جوانب خطة العمل الكاملة. وفر ساعات من عمل التصميم وركز على ما يهم - استراتيجية عملك.',
        es: 'Nuestra plantilla de Plan de Negocios Corporativo se destaca porque combina diseño profesional con funcionalidad práctica. Creada por expertos en negocios, sigue la estructura estándar de plan de negocios que esperan los inversores. El diseño limpio y moderno garantiza que tu contenido sea el foco, mientras que las diapositivas completas cubren cada aspecto de un plan de negocios completo. Ahorra horas de trabajo de diseño y concéntrate en lo que importa: tu estrategia comercial.',
        fr: 'Notre modèle de Plan d\'Affaires d\'Entreprise se distingue car il combine design professionnel et fonctionnalité pratique. Créé par des experts en affaires, il suit la structure standard de plan d\'affaires attendue par les investisseurs. Le design épuré et moderne garantit que votre contenu est au centre, tandis que les diapositives complètes couvrent chaque aspect d\'un plan d\'affaires complet. Économisez des heures de travail de conception et concentrez-vous sur ce qui compte - votre stratégie commerciale.'
      }
    },
    
    keywords: {
      en: ['business plan template', 'corporate presentation', 'investor pitch', 'startup template', 'PowerPoint business plan', 'professional presentation', 'business strategy', 'executive summary template'],
      ar: ['قالب خطة عمل', 'عرض تقديمي للشركات', 'عرض للمستثمرين', 'قالب شركة ناشئة', 'خطة عمل PowerPoint', 'عرض تقديمي احترافي', 'استراتيجية العمل', 'قالب ملخص تنفيذي'],
      es: ['plantilla plan de negocios', 'presentación corporativa', 'pitch inversores', 'plantilla startup', 'plan de negocios PowerPoint', 'presentación profesional', 'estrategia empresarial', 'plantilla resumen ejecutivo'],
      fr: ['modèle plan d\'affaires', 'présentation d\'entreprise', 'pitch investisseurs', 'modèle startup', 'plan d\'affaires PowerPoint', 'présentation professionnelle', 'stratégie commerciale', 'modèle résumé exécutif']
    }
  }
}

export function getTemplateContent(templateId: string): TemplateContent | undefined {
  return templateContents[templateId]
}
