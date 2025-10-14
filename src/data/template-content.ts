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
  },

  // Arabic Template: University Thesis
  'education-3': {
    templateId: 'education-3',
    
    seoTitle: {
      en: 'University Thesis PowerPoint Template - Academic Research Presentation',
      ar: 'قالب بوربوينت أطروحة جامعية - عرض البحث الأكاديمي',
      es: 'Plantilla PowerPoint Tesis Universitaria - Presentación de Investigación',
      fr: 'Modèle PowerPoint Thèse Universitaire - Présentation Recherche'
    },
    
    seoDescription: {
      en: 'Professional university thesis PowerPoint template with 30 slides. Perfect for PhD defense, master thesis, and academic research presentations.',
      ar: 'قالب بوربوينت احترافي للأطروحة الجامعية مع 30 شريحة. مثالي لمناقشة الدكتوراه، رسالة الماجستير، وعروض البحث الأكاديمي.',
      es: 'Plantilla PowerPoint profesional para tesis universitaria con 30 diapositivas. Perfecta para defensa de doctorado, tesis de maestría.',
      fr: 'Modèle PowerPoint professionnel de thèse universitaire avec 30 diapositives. Parfait pour soutenance de doctorat et recherche académique.'
    },
    
    introduction: {
      en: `Presenting your years of research in a clear, professional manner is crucial for academic success. Our University Thesis PowerPoint template is specifically designed for graduate students, PhD candidates, and researchers who need to present their academic work with confidence and clarity.

This premium template includes all the essential sections for a comprehensive thesis defense: introduction, literature review, methodology, results, discussion, and conclusion. The clean cyan and white design keeps the focus on your research while maintaining a professional academic appearance.`,
      
      ar: `تقديم سنوات من البحث بطريقة واضحة واحترافية أمر بالغ الأهمية للنجاح الأكاديمي. تم تصميم قالب بوربوينت الأطروحة الجامعية خصيصًا لطلاب الدراسات العليا ومرشحي الدكتوراه والباحثين الذين يحتاجون إلى تقديم أعمالهم الأكاديمية بثقة ووضوح.

يتضمن هذا القالب المميز جميع الأقسام الأساسية لمناقشة أطروحة شاملة: المقدمة، مراجعة الأدبيات، المنهجية، النتائج، المناقشة، والخاتمة. يحافظ التصميم السماوي والأبيض النظيف على التركيز على بحثك مع الحفاظ على مظهر أكاديمي احترافي.`,
      
      es: `Presentar años de investigación de manera clara y profesional es crucial para el éxito académico. Nuestra plantilla PowerPoint de Tesis Universitaria está diseñada específicamente para estudiantes de posgrado, candidatos a doctorado e investigadores que necesitan presentar su trabajo académico con confianza y claridad.

Esta plantilla premium incluye todas las secciones esenciales para una defensa de tesis completa: introducción, revisión de literatura, metodología, resultados, discusión y conclusión. El diseño limpio en cian y blanco mantiene el enfoque en su investigación mientras mantiene una apariencia académica profesional.`,
      
      fr: `Présenter des années de recherche de manière claire et professionnelle est crucial pour le succès académique. Notre modèle PowerPoint de Thèse Universitaire est spécialement conçu pour les étudiants diplômés, les doctorants et les chercheurs qui doivent présenter leur travail académique avec confiance et clarté.

Ce modèle premium comprend toutes les sections essentielles pour une soutenance de thèse complète : introduction, revue de littérature, méthodologie, résultats, discussion et conclusion. Le design épuré en cyan et blanc garde l'accent sur votre recherche tout en maintenant une apparence académique professionnelle.`
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
          en: '30 comprehensive slides for complete thesis presentation',
          ar: '30 شريحة شاملة لعرض الأطروحة الكامل',
          es: '30 diapositivas completas para presentación de tesis',
          fr: '30 diapositives complètes pour présentation de thèse'
        },
        {
          en: 'Academic cyan and white professional color scheme',
          ar: 'نظام ألوان سماوي وأبيض أكاديمي احترافي',
          es: 'Esquema de colores cian y blanco académico profesional',
          fr: 'Palette de couleurs cyan et blanc académique'
        },
        {
          en: 'Pre-designed slides for methodology and results',
          ar: 'شرائح مصممة مسبقًا للمنهجية والنتائج',
          es: 'Diapositivas prediseñadas para metodología y resultados',
          fr: 'Diapositives pré-conçues pour méthodologie et résultats'
        },
        {
          en: 'Bibliography and references section',
          ar: 'قسم المراجع والمصادر',
          es: 'Sección de bibliografía y referencias',
          fr: 'Section bibliographie et références'
        },
        {
          en: 'Charts and graphs for data presentation',
          ar: 'رسوم بيانية ورسومات لعرض البيانات',
          es: 'Gráficos y tablas para presentación de datos',
          fr: 'Graphiques et tableaux pour présentation de données'
        },
        {
          en: 'Research timeline and workflow diagrams',
          ar: 'مخططات الجدول الزمني وسير العمل البحثي',
          es: 'Cronogramas de investigación y diagramas de flujo',
          fr: 'Chronologie de recherche et diagrammes de flux'
        },
        {
          en: 'Appendix and supplementary material slides',
          ar: 'شرائح الملحق والمواد التكميلية',
          es: 'Diapositivas de apéndice y material suplementario',
          fr: 'Diapositives d\'annexe et matériel supplémentaire'
        },
        {
          en: 'Premium template with advanced layouts',
          ar: 'قالب مميز مع تخطيطات متقدمة',
          es: 'Plantilla premium con diseños avanzados',
          fr: 'Modèle premium avec mises en page avancées'
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
          en: 'Download and open in PowerPoint or Google Slides',
          ar: 'قم بالتحميل والفتح في PowerPoint أو Google Slides',
          es: 'Descarga y abre en PowerPoint o Google Slides',
          fr: 'Téléchargez et ouvrez dans PowerPoint ou Google Slides'
        },
        {
          en: 'Add your thesis title and research abstract',
          ar: 'أضف عنوان أطروحتك والملخص البحثي',
          es: 'Agrega el título de tu tesis y resumen de investigación',
          fr: 'Ajoutez le titre de votre thèse et résumé de recherche'
        },
        {
          en: 'Fill in methodology and research design sections',
          ar: 'املأ أقسام المنهجية وتصميم البحث',
          es: 'Completa las secciones de metodología y diseño de investigación',
          fr: 'Remplissez les sections méthodologie et conception de recherche'
        },
        {
          en: 'Insert your research data, charts, and findings',
          ar: 'أدخل بيانات البحث والرسوم البيانية والنتائج',
          es: 'Inserta tus datos de investigación, gráficos y hallazgos',
          fr: 'Insérez vos données de recherche, graphiques et résultats'
        },
        {
          en: 'Add academic references and citations',
          ar: 'أضف المراجع الأكاديمية والاقتباسات',
          es: 'Agrega referencias académicas y citas',
          fr: 'Ajoutez références académiques et citations'
        },
        {
          en: 'Practice your defense presentation',
          ar: 'تدرب على عرض مناقشة الأطروحة',
          es: 'Practica tu presentación de defensa',
          fr: 'Pratiquez votre présentation de soutenance'
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
          en: 'PhD thesis defense presentations',
          ar: 'عروض مناقشة أطروحة الدكتوراه',
          es: 'Presentaciones de defensa de tesis doctoral',
          fr: 'Présentations de soutenance de thèse de doctorat'
        },
        {
          en: 'Master\'s thesis presentations',
          ar: 'عروض رسالة الماجستير',
          es: 'Presentaciones de tesis de maestría',
          fr: 'Présentations de thèse de master'
        },
        {
          en: 'Academic research conferences',
          ar: 'المؤتمرات البحثية الأكاديمية',
          es: 'Conferencias de investigación académica',
          fr: 'Conférences de recherche académique'
        },
        {
          en: 'Research proposal presentations',
          ar: 'عروض مقترحات البحث',
          es: 'Presentaciones de propuestas de investigación',
          fr: 'Présentations de propositions de recherche'
        },
        {
          en: 'Graduate school seminars',
          ar: 'ندوات الدراسات العليا',
          es: 'Seminarios de posgrado',
          fr: 'Séminaires d\'études supérieures'
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
        en: 'This thesis template is designed specifically for academic rigor and clarity. With 30 comprehensive slides, it provides ample space to present complex research without feeling rushed. The professional color scheme maintains credibility while the structured layout ensures your committee can follow your arguments clearly. This is a premium template that reflects the importance of your academic achievement.',
        ar: 'تم تصميم قالب الأطروحة هذا خصيصًا للدقة والوضوح الأكاديمي. مع 30 شريحة شاملة، يوفر مساحة كافية لتقديم بحث معقد دون الشعور بالاستعجال. يحافظ نظام الألوان الاحترافي على المصداقية بينما يضمن التخطيط المنظم أن لجنتك يمكنها متابعة حججك بوضوح. هذا قالب مميز يعكس أهمية إنجازك الأكاديمي.',
        es: 'Esta plantilla de tesis está diseñada específicamente para el rigor y claridad académicos. Con 30 diapositivas completas, proporciona amplio espacio para presentar investigación compleja sin sentirse apresurado. El esquema de colores profesional mantiene la credibilidad mientras que el diseño estructurado asegura que su comité pueda seguir sus argumentos claramente. Esta es una plantilla premium que refleja la importancia de su logro académico.',
        fr: 'Ce modèle de thèse est conçu spécifiquement pour la rigueur et la clarté académiques. Avec 30 diapositives complètes, il fournit un espace suffisant pour présenter une recherche complexe sans se sentir pressé. La palette de couleurs professionnelle maintient la crédibilité tandis que la mise en page structurée garantit que votre comité peut suivre vos arguments clairement. C\'est un modèle premium qui reflète l\'importance de votre réussite académique.'
      }
    },
    
    keywords: {
      en: ['thesis template', 'PhD defense', 'academic presentation', 'university thesis', 'research presentation', 'graduate school', 'dissertation template', 'master thesis'],
      ar: ['قالب أطروحة', 'مناقشة الدكتوراه', 'عرض أكاديمي', 'أطروحة جامعية', 'عرض بحثي', 'الدراسات العليا', 'قالب رسالة', 'رسالة ماجستير'],
      es: ['plantilla tesis', 'defensa doctorado', 'presentación académica', 'tesis universitaria', 'presentación investigación', 'posgrado', 'plantilla disertación', 'tesis maestría'],
      fr: ['modèle thèse', 'soutenance doctorat', 'présentation académique', 'thèse universitaire', 'présentation recherche', 'études supérieures', 'modèle dissertation', 'thèse master']
    }
  },

  // Spanish Template: Social Media Strategy
  'marketing-1': {
    templateId: 'marketing-1',
    
    seoTitle: {
      en: 'Social Media Strategy PowerPoint Template - Marketing Campaign Presentation',
      ar: 'قالب بوربوينت استراتيجية وسائل التواصل الاجتماعي - عرض حملة تسويقية',
      es: 'Plantilla PowerPoint Estrategia Redes Sociales - Campaña de Marketing',
      fr: 'Modèle PowerPoint Stratégie Réseaux Sociaux - Campagne Marketing'
    },
    
    seoDescription: {
      en: 'Professional social media strategy PowerPoint template with 22 slides. Perfect for marketing campaigns, digital strategy, and social media presentations.',
      ar: 'قالب بوربوينت احترافي لاستراتيجية وسائل التواصل الاجتماعي مع 22 شريحة. مثالي للحملات التسويقية والاستراتيجية الرقمية.',
      es: 'Plantilla PowerPoint profesional de estrategia de redes sociales con 22 diapositivas. Perfecta para campañas de marketing y estrategia digital.',
      fr: 'Modèle PowerPoint professionnel de stratégie réseaux sociaux avec 22 diapositives. Parfait pour campagnes marketing et stratégie digitale.'
    },
    
    introduction: {
      en: `In today's digital age, a strong social media presence is essential for business success. Our Social Media Strategy PowerPoint template provides a comprehensive framework to plan, present, and execute your social media marketing campaigns across all major platforms.

This vibrant pink and white template is designed for marketing professionals, social media managers, and digital strategists who need to showcase their campaigns to clients, stakeholders, or their team. From content calendars to analytics dashboards, this template covers every aspect of modern social media marketing.`,
      
      ar: `في العصر الرقمي اليوم، يعد التواجد القوي على وسائل التواصل الاجتماعي أمرًا ضروريًا لنجاح الأعمال. يوفر قالب بوربوينت استراتيجية وسائل التواصل الاجتماعي إطار عمل شامل لتخطيط وتقديم وتنفيذ حملات التسويق عبر جميع المنصات الرئيسية.

تم تصميم هذا القالب الوردي والأبيض النابض بالحياة لمحترفي التسويق ومديري وسائل التواصل الاجتماعي واستراتيجيي التسويق الرقمي الذين يحتاجون إلى عرض حملاتهم على العملاء أو أصحاب المصلحة أو فريقهم.`,
      
      es: `En la era digital actual, una fuerte presencia en redes sociales es esencial para el éxito empresarial. Nuestra plantilla PowerPoint de Estrategia de Redes Sociales proporciona un marco integral para planificar, presentar y ejecutar sus campañas de marketing en redes sociales en todas las plataformas principales.

Esta vibrante plantilla rosa y blanca está diseñada para profesionales de marketing, gestores de redes sociales y estrategas digitales que necesitan mostrar sus campañas a clientes, partes interesadas o su equipo. Desde calendarios de contenido hasta paneles de análisis, esta plantilla cubre cada aspecto del marketing moderno en redes sociales.`,
      
      fr: `À l'ère numérique d'aujourd'hui, une forte présence sur les réseaux sociaux est essentielle au succès commercial. Notre modèle PowerPoint de Stratégie Réseaux Sociaux fournit un cadre complet pour planifier, présenter et exécuter vos campagnes marketing sur tous les principaux réseaux sociaux.

Ce modèle rose et blanc vibrant est conçu pour les professionnels du marketing, les gestionnaires de réseaux sociaux et les stratèges numériques qui doivent présenter leurs campagnes aux clients, parties prenantes ou leur équipe. Des calendriers de contenu aux tableaux d'analyse, ce modèle couvre chaque aspect du marketing moderne sur les réseaux sociaux.`
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
          en: '22 slides designed for social media marketing',
          ar: '22 شريحة مصممة للتسويق عبر وسائل التواصل الاجتماعي',
          es: '22 diapositivas diseñadas para marketing en redes sociales',
          fr: '22 diapositives conçues pour marketing sur réseaux sociaux'
        },
        {
          en: 'Vibrant pink and white modern color scheme',
          ar: 'نظام ألوان وردي وأبيض عصري نابض بالحياة',
          es: 'Esquema de colores rosa y blanco vibrante y moderno',
          fr: 'Palette de couleurs rose et blanc vibrante et moderne'
        },
        {
          en: 'Content calendar and posting schedule templates',
          ar: 'تقويم المحتوى وقوالب جدول النشر',
          es: 'Calendario de contenido y plantillas de programación',
          fr: 'Calendrier de contenu et modèles de planification'
        },
        {
          en: 'Social media analytics and KPI dashboards',
          ar: 'تحليلات وسائل التواصل الاجتماعي ولوحات معلومات KPI',
          es: 'Análisis de redes sociales y paneles de KPI',
          fr: 'Analyses réseaux sociaux et tableaux de bord KPI'
        },
        {
          en: 'Platform-specific strategy slides (Instagram, Facebook, TikTok, LinkedIn)',
          ar: 'شرائح استراتيجية خاصة بالمنصات (إنستجرام، فيسبوك، تيك توك، لينكد إن)',
          es: 'Diapositivas de estrategia específicas de plataforma (Instagram, Facebook, TikTok, LinkedIn)',
          fr: 'Diapositives de stratégie spécifiques aux plateformes (Instagram, Facebook, TikTok, LinkedIn)'
        },
        {
          en: 'Influencer collaboration and partnership slides',
          ar: 'شرائح التعاون مع المؤثرين والشراكات',
          es: 'Diapositivas de colaboración con influencers y asociaciones',
          fr: 'Diapositives de collaboration avec influenceurs et partenariats'
        },
        {
          en: 'Campaign timeline and milestone tracking',
          ar: 'جدول زمني للحملة وتتبع المعالم',
          es: 'Cronograma de campaña y seguimiento de hitos',
          fr: 'Chronologie de campagne et suivi des jalons'
        },
        {
          en: 'Budget allocation and ROI calculation slides',
          ar: 'شرائح تخصيص الميزانية وحساب عائد الاستثمار',
          es: 'Diapositivas de asignación de presupuesto y cálculo de ROI',
          fr: 'Diapositives d\'allocation budgétaire et calcul du ROI'
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
          en: 'Download template and open in PowerPoint or Google Slides',
          ar: 'قم بتحميل القالب وافتحه في PowerPoint أو Google Slides',
          es: 'Descarga la plantilla y ábrela en PowerPoint o Google Slides',
          fr: 'Téléchargez le modèle et ouvrez-le dans PowerPoint ou Google Slides'
        },
        {
          en: 'Define your target audience and social media goals',
          ar: 'حدد جمهورك المستهدف وأهداف وسائل التواصل الاجتماعي',
          es: 'Define tu audiencia objetivo y objetivos de redes sociales',
          fr: 'Définissez votre audience cible et objectifs réseaux sociaux'
        },
        {
          en: 'Fill in platform-specific strategies for each channel',
          ar: 'املأ الاستراتيجيات الخاصة بكل منصة',
          es: 'Completa estrategias específicas de plataforma para cada canal',
          fr: 'Remplissez les stratégies spécifiques pour chaque plateforme'
        },
        {
          en: 'Create content calendar with posting schedule',
          ar: 'أنشئ تقويم المحتوى مع جدول النشر',
          es: 'Crea calendario de contenido con programación de publicaciones',
          fr: 'Créez un calendrier de contenu avec planning de publication'
        },
        {
          en: 'Add your metrics, KPIs, and success criteria',
          ar: 'أضف مقاييسك ومؤشرات الأداء ومعايير النجاح',
          es: 'Agrega tus métricas, KPI y criterios de éxito',
          fr: 'Ajoutez vos métriques, KPI et critères de succès'
        },
        {
          en: 'Present to clients or team and get approval',
          ar: 'قدم للعملاء أو الفريق واحصل على الموافقة',
          es: 'Presenta a clientes o equipo y obtén aprobación',
          fr: 'Présentez aux clients ou équipe et obtenez l\'approbation'
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
          en: 'Social media managers and digital marketers',
          ar: 'مديري وسائل التواصل الاجتماعي والمسوقين الرقميين',
          es: 'Gestores de redes sociales y marketers digitales',
          fr: 'Gestionnaires de réseaux sociaux et marketeurs numériques'
        },
        {
          en: 'Marketing agencies pitching campaigns',
          ar: 'وكالات التسويق التي تقدم الحملات',
          es: 'Agencias de marketing presentando campañas',
          fr: 'Agences marketing présentant des campagnes'
        },
        {
          en: 'Brand managers planning social strategy',
          ar: 'مديري العلامات التجارية الذين يخططون للاستراتيجية الاجتماعية',
          es: 'Gestores de marca planificando estrategia social',
          fr: 'Gestionnaires de marque planifiant stratégie sociale'
        },
        {
          en: 'E-commerce businesses launching products',
          ar: 'شركات التجارة الإلكترونية التي تطلق المنتجات',
          es: 'Negocios de comercio electrónico lanzando productos',
          fr: 'Entreprises e-commerce lançant des produits'
        },
        {
          en: 'Influencers and content creators',
          ar: 'المؤثرون ومنشئو المحتوى',
          es: 'Influencers y creadores de contenido',
          fr: 'Influenceurs et créateurs de contenu'
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
        en: 'This social media strategy template combines eye-catching design with practical marketing frameworks. The vibrant pink color scheme reflects the dynamic nature of social media while maintaining professionalism. With dedicated slides for each major platform and comprehensive analytics sections, you can create a complete social media strategy that wins client approval and drives results.',
        ar: 'يجمع قالب استراتيجية وسائل التواصل الاجتماعي هذا بين التصميم الجذاب وأطر التسويق العملية. يعكس نظام الألوان الوردية النابضة بالحياة الطبيعة الديناميكية لوسائل التواصل الاجتماعي مع الحفاظ على الاحترافية. مع شرائح مخصصة لكل منصة رئيسية وأقسام تحليلات شاملة، يمكنك إنشاء استراتيجية كاملة لوسائل التواصل الاجتماعي.',
        es: 'Esta plantilla de estrategia de redes sociales combina diseño llamativo con marcos de marketing prácticos. El vibrante esquema de colores rosa refleja la naturaleza dinámica de las redes sociales mientras mantiene el profesionalismo. Con diapositivas dedicadas para cada plataforma principal y secciones completas de análisis, puede crear una estrategia completa de redes sociales que gana aprobación de clientes y genera resultados.',
        fr: 'Ce modèle de stratégie réseaux sociaux combine design accrocheur et cadres marketing pratiques. La palette de couleurs rose vibrante reflète la nature dynamique des réseaux sociaux tout en maintenant le professionnalisme. Avec des diapositives dédiées pour chaque plateforme principale et des sections d\'analyse complètes, vous pouvez créer une stratégie complète de réseaux sociaux qui obtient l\'approbation des clients et génère des résultats.'
      }
    },
    
    keywords: {
      en: ['social media strategy', 'marketing presentation', 'digital marketing', 'social media template', 'content calendar', 'Instagram marketing', 'social media analytics', 'campaign planning'],
      ar: ['استراتيجية وسائل التواصل', 'عرض تسويقي', 'التسويق الرقمي', 'قالب وسائل التواصل', 'تقويم المحتوى', 'تسويق إنستجرام', 'تحليلات وسائل التواصل', 'تخطيط الحملات'],
      es: ['estrategia redes sociales', 'presentación marketing', 'marketing digital', 'plantilla redes sociales', 'calendario contenido', 'marketing Instagram', 'análisis redes sociales', 'planificación campañas'],
      fr: ['stratégie réseaux sociaux', 'présentation marketing', 'marketing numérique', 'modèle réseaux sociaux', 'calendrier contenu', 'marketing Instagram', 'analyses réseaux sociaux', 'planification campagnes']
    }
  },

  // French Template: Medical Research
  'healthcare-1': {
    templateId: 'healthcare-1',
    
    seoTitle: {
      en: 'Medical Research PowerPoint Template - Healthcare Presentation',
      ar: 'قالب بوربوينت البحث الطبي - عرض الرعاية الصحية',
      es: 'Plantilla PowerPoint Investigación Médica - Presentación Salud',
      fr: 'Modèle PowerPoint Recherche Médicale - Présentation Santé'
    },
    
    seoDescription: {
      en: 'Professional medical research PowerPoint template with 26 slides. Perfect for clinical studies, healthcare presentations, and medical conferences.',
      ar: 'قالب بوربوينت احترافي للبحث الطبي مع 26 شريحة. مثالي للدراسات السريرية وعروض الرعاية الصحية والمؤتمرات الطبية.',
      es: 'Plantilla PowerPoint profesional de investigación médica con 26 diapositivas. Perfecta para estudios clínicos y conferencias médicas.',
      fr: 'Modèle PowerPoint professionnel de recherche médicale avec 26 diapositives. Parfait pour études cliniques, présentations santé et conférences médicales.'
    },
    
    introduction: {
      en: `Medical research requires precision, clarity, and professionalism in presentation. Our Medical Research PowerPoint template is specifically designed for healthcare professionals, researchers, and clinicians who need to present complex medical data in a clear and compelling manner.

This template features a clean teal and white color scheme that conveys trust and professionalism while remaining visually appealing. With 26 comprehensive slides, you can present everything from study methodology to clinical results with confidence.`,
      
      ar: `يتطلب البحث الطبي الدقة والوضوح والاحترافية في العرض. تم تصميم قالب بوربوينت البحث الطبي خصيصًا لمتخصصي الرعاية الصحية والباحثين والأطباء السريريين الذين يحتاجون إلى تقديم بيانات طبية معقدة بطريقة واضحة ومقنعة.

يتميز هذا القالب بنظام ألوان سماوي وأبيض نظيف ينقل الثقة والاحترافية مع الحفاظ على جاذبية بصرية. مع 26 شريحة شاملة، يمكنك تقديم كل شيء من منهجية الدراسة إلى النتائج السريرية بثقة.`,
      
      es: `La investigación médica requiere precisión, claridad y profesionalismo en la presentación. Nuestra plantilla PowerPoint de Investigación Médica está diseñada específicamente para profesionales de la salud, investigadores y clínicos que necesitan presentar datos médicos complejos de manera clara y convincente.

Esta plantilla presenta un esquema de colores limpio en verde azulado y blanco que transmite confianza y profesionalismo mientras permanece visualmente atractivo. Con 26 diapositivas completas, puede presentar todo, desde la metodología del estudio hasta los resultados clínicos con confianza.`,
      
      fr: `La recherche médicale exige précision, clarté et professionnalisme dans la présentation. Notre modèle PowerPoint de Recherche Médicale est spécialement conçu pour les professionnels de santé, chercheurs et cliniciens qui doivent présenter des données médicales complexes de manière claire et convaincante.

Ce modèle présente une palette de couleurs propre en sarcelle et blanc qui transmet confiance et professionnalisme tout en restant visuellement attrayant. Avec 26 diapositives complètes, vous pouvez présenter tout, de la méthodologie d'étude aux résultats cliniques avec confiance.`
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
          en: '26 slides designed for medical presentations',
          ar: '26 شريحة مصممة للعروض الطبية',
          es: '26 diapositivas diseñadas para presentaciones médicas',
          fr: '26 diapositives conçues pour présentations médicales'
        },
        {
          en: 'Professional teal and white healthcare color scheme',
          ar: 'نظام ألوان سماوي وأبيض احترافي للرعاية الصحية',
          es: 'Esquema de colores verde azulado y blanco profesional de salud',
          fr: 'Palette de couleurs sarcelle et blanc professionnelle santé'
        },
        {
          en: 'Clinical study methodology and protocol slides',
          ar: 'شرائح منهجية وبروتوكول الدراسة السريرية',
          es: 'Diapositivas de metodología y protocolo de estudio clínico',
          fr: 'Diapositives de méthodologie et protocole d\'étude clinique'
        },
        {
          en: 'Patient demographics and sample size visualization',
          ar: 'تصور التركيبة السكانية للمرضى وحجم العينة',
          es: 'Visualización de demografía de pacientes y tamaño de muestra',
          fr: 'Visualisation démographie patients et taille d\'échantillon'
        },
        {
          en: 'Data analysis and statistical results charts',
          ar: 'رسوم بيانية لتحليل البيانات والنتائج الإحصائية',
          es: 'Gráficos de análisis de datos y resultados estadísticos',
          fr: 'Graphiques d\'analyse de données et résultats statistiques'
        },
        {
          en: 'Medical imaging and diagnostic slides',
          ar: 'شرائح التصوير الطبي والتشخيص',
          es: 'Diapositivas de imágenes médicas y diagnóstico',
          fr: 'Diapositives d\'imagerie médicale et diagnostic'
        },
        {
          en: 'Treatment outcomes and efficacy comparison',
          ar: 'نتائج العلاج ومقارنة الفعالية',
          es: 'Resultados de tratamiento y comparación de eficacia',
          fr: 'Résultats de traitement et comparaison d\'efficacité'
        },
        {
          en: 'References and ethical approval documentation',
          ar: 'المراجع وتوثيق الموافقة الأخلاقية',
          es: 'Referencias y documentación de aprobación ética',
          fr: 'Références et documentation d\'approbation éthique'
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
          en: 'Download and open in PowerPoint or Google Slides',
          ar: 'قم بالتحميل والفتح في PowerPoint أو Google Slides',
          es: 'Descarga y abre en PowerPoint o Google Slides',
          fr: 'Téléchargez et ouvrez dans PowerPoint ou Google Slides'
        },
        {
          en: 'Add your research title and background information',
          ar: 'أضف عنوان البحث والمعلومات الأساسية',
          es: 'Agrega el título de tu investigación e información de antecedentes',
          fr: 'Ajoutez votre titre de recherche et informations contextuelles'
        },
        {
          en: 'Detail your study methodology and patient selection',
          ar: 'قم بتفصيل منهجية الدراسة واختيار المرضى',
          es: 'Detalla tu metodología de estudio y selección de pacientes',
          fr: 'Détaillez votre méthodologie d\'étude et sélection de patients'
        },
        {
          en: 'Insert clinical data, statistics, and analysis results',
          ar: 'أدخل البيانات السريرية والإحصائيات ونتائج التحليل',
          es: 'Inserta datos clínicos, estadísticas y resultados de análisis',
          fr: 'Insérez données cliniques, statistiques et résultats d\'analyse'
        },
        {
          en: 'Add medical images, scans, or diagnostic charts',
          ar: 'أضف الصور الطبية أو الفحوصات أو الرسوم التشخيصية',
          es: 'Agrega imágenes médicas, escáneres o gráficos de diagnóstico',
          fr: 'Ajoutez images médicales, scans ou graphiques diagnostiques'
        },
        {
          en: 'Present at medical conferences or submit to journals',
          ar: 'قدم في المؤتمرات الطبية أو قدم للمجلات',
          es: 'Presenta en conferencias médicas o envía a revistas',
          fr: 'Présentez lors de conférences médicales ou soumettez aux revues'
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
          en: 'Medical researchers and clinical scientists',
          ar: 'الباحثون الطبيون والعلماء السريريون',
          es: 'Investigadores médicos y científicos clínicos',
          fr: 'Chercheurs médicaux et scientifiques cliniques'
        },
        {
          en: 'Healthcare professionals at medical conferences',
          ar: 'متخصصو الرعاية الصحية في المؤتمرات الطبية',
          es: 'Profesionales de salud en conferencias médicas',
          fr: 'Professionnels de santé lors de conférences médicales'
        },
        {
          en: 'Pharmaceutical companies presenting drug trials',
          ar: 'شركات الأدوية التي تقدم تجارب الأدوية',
          es: 'Compañías farmacéuticas presentando ensayos clínicos',
          fr: 'Entreprises pharmaceutiques présentant essais cliniques'
        },
        {
          en: 'Hospital departments sharing clinical outcomes',
          ar: 'أقسام المستشفيات التي تشارك النتائج السريرية',
          es: 'Departamentos hospitalarios compartiendo resultados clínicos',
          fr: 'Départements hospitaliers partageant résultats cliniques'
        },
        {
          en: 'Medical students presenting case studies',
          ar: 'طلاب الطب الذين يقدمون دراسات الحالة',
          es: 'Estudiantes de medicina presentando estudios de casos',
          fr: 'Étudiants en médecine présentant études de cas'
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
        en: 'This medical research template is designed with healthcare professionals in mind. The teal color scheme is associated with healthcare and healing, while the clean layout ensures complex medical data is presented clearly. With dedicated slides for methodology, results, and statistical analysis, you can create a comprehensive research presentation that meets the rigorous standards of medical conferences and peer-reviewed publications.',
        ar: 'تم تصميم قالب البحث الطبي هذا مع وضع متخصصي الرعاية الصحية في الاعتبار. يرتبط نظام الألوان السماوي بالرعاية الصحية والشفاء، بينما يضمن التخطيط النظيف تقديم البيانات الطبية المعقدة بوضوح. مع شرائح مخصصة للمنهجية والنتائج والتحليل الإحصائي، يمكنك إنشاء عرض بحثي شامل يلبي المعايير الصارمة للمؤتمرات الطبية والمنشورات.',
        es: 'Esta plantilla de investigación médica está diseñada pensando en profesionales de la salud. El esquema de colores verde azulado está asociado con la atención médica y la curación, mientras que el diseño limpio garantiza que los datos médicos complejos se presenten claramente. Con diapositivas dedicadas para metodología, resultados y análisis estadístico, puede crear una presentación de investigación completa que cumple con los rigurosos estándares de conferencias médicas y publicaciones revisadas por pares.',
        fr: 'Ce modèle de recherche médicale est conçu en pensant aux professionnels de santé. La palette de couleurs sarcelle est associée aux soins de santé et à la guérison, tandis que la mise en page épurée garantit que les données médicales complexes sont présentées clairement. Avec des diapositives dédiées à la méthodologie, aux résultats et à l\'analyse statistique, vous pouvez créer une présentation de recherche complète qui répond aux normes rigoureuses des conférences médicales et publications évaluées par les pairs.'
      }
    },
    
    keywords: {
      en: ['medical research', 'healthcare presentation', 'clinical study', 'medical conference', 'research template', 'medical data', 'clinical results', 'healthcare template'],
      ar: ['البحث الطبي', 'عرض الرعاية الصحية', 'الدراسة السريرية', 'المؤتمر الطبي', 'قالب البحث', 'البيانات الطبية', 'النتائج السريرية', 'قالب الرعاية الصحية'],
      es: ['investigación médica', 'presentación salud', 'estudio clínico', 'conferencia médica', 'plantilla investigación', 'datos médicos', 'resultados clínicos', 'plantilla salud'],
      fr: ['recherche médicale', 'présentation santé', 'étude clinique', 'conférence médicale', 'modèle recherche', 'données médicales', 'résultats cliniques', 'modèle santé']
    }
  }
}

export function getTemplateContent(templateId: string): TemplateContent | undefined {
  return templateContents[templateId]
}
