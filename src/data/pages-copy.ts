// src/data/pages-copy.ts
// Main copy content for the 10 most important pages (Arabic & English)

export interface PageCopy {
  h1: string;
  subhead: string;
  primaryCTA: string;
  secondaryCTA?: string;
  features?: {
    title: string;
    items: string[];
  };
  howItWorks?: {
    title: string;
    steps: string[];
  };
  socialProof?: {
    title: string;
    stats: string[];
  };
  faq?: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  footerCTA?: string;
}

export interface PageContent {
  en: PageCopy;
  ar: PageCopy;
}

// ============================================================================
// 1. HOME PAGE
// ============================================================================
export const homePage: PageContent = {
  en: {
    h1: "Turn ideas and documents into beautiful presentations—instantly",
    subhead: "Paste a prompt or upload a Word/PDF. Our AI plans, designs, and builds slide decks you can export to PPTX, PDF, or HTML.",
    primaryCTA: "Get started free",
    secondaryCTA: "Watch 60-sec demo",
    features: {
      title: "Why teams choose us",
      items: [
        "From raw docs to ready slides in minutes",
        "On-brand themes & layouts—no design skills needed",
        "Works in English & Arabic (RTL-aware)",
        "Secure by design: your data stays private",
        "Exports that look perfect in PowerPoint"
      ]
    },
    howItWorks: {
      title: "How it works",
      steps: [
        "Start with a prompt—or upload Word/PDF",
        "AI outlines, scripts, and designs slides",
        "Edit, swap themes, insert images/icons",
        "Export to PPTX/PDF or share a link"
      ]
    },
    socialProof: {
      title: "Trusted by professionals worldwide",
      stats: [
        "10,000+ decks generated",
        "4.9/5 average rating",
        "Loved by educators, marketers, and founders"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Can I use my own brand?",
          a: "Yes—upload your colors, fonts, and logo to create on-brand presentations automatically."
        },
        {
          q: "Will it keep my formatting?",
          a: "Yes; headings, tables, and lists map cleanly from your documents to slides."
        },
        {
          q: "Do you support Arabic?",
          a: "Yes, full RTL (right-to-left) support for Arabic content."
        },
        {
          q: "Can I export to PowerPoint?",
          a: "Yes, export to PPTX, PDF, or HTML formats."
        },
        {
          q: "Is my data private?",
          a: "Absolutely. See our Security & Compliance page for full details."
        }
      ]
    },
    footerCTA: "Try it free →"
  },
  ar: {
    h1: "حوّل أفكارك ومستنداتك إلى عروض تقديمية رائعة—فورياً",
    subhead: "الصق نصاً أو ارفع ملف Word/PDF. سيخطط الذكاء الاصطناعي، يصمم، وينشئ عروضاً تقديمية يمكنك تصديرها إلى PPTX أو PDF أو HTML.",
    primaryCTA: "ابدأ مجاناً",
    secondaryCTA: "شاهد العرض التوضيحي",
    features: {
      title: "لماذا تختارنا الفرق",
      items: [
        "من المستندات الخام إلى الشرائح الجاهزة في دقائق",
        "تصاميم وقوالب متوافقة مع علامتك التجارية—لا حاجة لمهارات التصميم",
        "يعمل بالإنجليزية والعربية (مع دعم RTL)",
        "آمن بالتصميم: بياناتك تبقى خاصة",
        "تصدير يبدو مثالياً في PowerPoint"
      ]
    },
    howItWorks: {
      title: "كيف يعمل",
      steps: [
        "ابدأ بنص تعليمي—أو ارفع ملف Word/PDF",
        "يخطط الذكاء الاصطناعي، يكتب، ويصمم الشرائح",
        "عدّل، بدّل القوالب، أضف صوراً وأيقونات",
        "صدّر إلى PPTX/PDF أو شارك رابطاً"
      ]
    },
    socialProof: {
      title: "موثوق به من قبل محترفين حول العالم",
      stats: [
        "أكثر من 10,000 عرض تقديمي تم إنشاؤه",
        "تقييم 4.9/5 في المتوسط",
        "محبوب من المعلمين، المسوقين، والمؤسسين"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل يمكنني استخدام علامتي التجارية؟",
          a: "نعم—ارفع ألوانك، خطوطك، وشعارك لإنشاء عروض تقديمية متوافقة مع علامتك التجارية تلقائياً."
        },
        {
          q: "هل سيحافظ على التنسيق؟",
          a: "نعم؛ العناوين، الجداول، والقوائم تُنقل بشكل نظيف من مستنداتك إلى الشرائح."
        },
        {
          q: "هل تدعمون اللغة العربية؟",
          a: "نعم، دعم كامل لـ RTL (من اليمين لليسار) للمحتوى العربي."
        },
        {
          q: "هل يمكنني التصدير إلى PowerPoint؟",
          a: "نعم، التصدير إلى صيغ PPTX أو PDF أو HTML."
        },
        {
          q: "هل بياناتي خاصة؟",
          a: "بالتأكيد. راجع صفحة الأمان والامتثال للتفاصيل الكاملة."
        }
      ]
    },
    footerCTA: "جربه مجاناً ←"
  }
};

// ============================================================================
// 2. AI PRESENTATION GENERATOR (Product)
// ============================================================================
export const aiPresentationGenerator: PageContent = {
  en: {
    h1: "The fastest way to build a slide deck with AI",
    subhead: "Strategy, outline, visuals, and speaker notes—auto-generated from your prompt.",
    primaryCTA: "Generate your first deck",
    secondaryCTA: "See template examples",
    features: {
      title: "Key features",
      items: [
        "Smart planning: goal, audience, time, and tone awareness",
        "Slide architecture: titles, bullets, diagrams, talking points",
        "Auto-visuals: stock images & icons (with citations option)",
        "On-brand themes: corporate, modern, creative, academic",
        "Live editor: tweak text, reorder, merge/split slides",
        "Perfect exports: PPTX, PDF, HTML"
      ]
    },
    howItWorks: {
      title: "Workflow",
      steps: [
        "Prompt → Plan → Slides → Review → Export"
      ]
    },
    socialProof: {
      title: "Who it's for",
      stats: [
        "Sales teams (pitches, proposals)",
        "Educators & trainers (lessons, workshops)",
        "Marketing (campaign briefs, content plans)",
        "Founders (demo days, investor updates)"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Can the AI follow a strict outline?",
          a: "Yes—lock your structure before generating to maintain your preferred outline."
        },
        {
          q: "Can I regenerate a single slide?",
          a: "Absolutely—per-slide regeneration lets you refine specific slides without affecting others."
        },
        {
          q: "Does it add citations?",
          a: "Optional citations & image credits can be automatically added to your slides."
        },
        {
          q: "Multi-language support?",
          a: "Yes, including Arabic with full RTL support."
        }
      ]
    }
  },
  ar: {
    h1: "أسرع طريقة لبناء عرض تقديمي بالذكاء الاصطناعي",
    subhead: "استراتيجية، مخطط، صور، وملاحظات المتحدث—تُولّد تلقائياً من نصك التعليمي.",
    primaryCTA: "أنشئ أول عرض تقديمي",
    secondaryCTA: "شاهد أمثلة القوالب",
    features: {
      title: "الميزات الرئيسية",
      items: [
        "تخطيط ذكي: وعي بالهدف، الجمهور، الوقت، والنبرة",
        "بنية الشرائح: عناوين، نقاط، مخططات، نقاط حوار",
        "صور تلقائية: صور وأيقونات (مع خيار الاستشهادات)",
        "قوالب متوافقة مع العلامة التجارية: شركات، حديثة، إبداعية، أكاديمية",
        "محرر مباشر: عدّل النص، أعد الترتيب، ادمج/قسّم الشرائح",
        "تصدير مثالي: PPTX، PDF، HTML"
      ]
    },
    howItWorks: {
      title: "سير العمل",
      steps: [
        "نص تعليمي ← خطة ← شرائح ← مراجعة ← تصدير"
      ]
    },
    socialProof: {
      title: "لمن هو مخصص",
      stats: [
        "فرق المبيعات (العروض، المقترحات)",
        "المعلمون والمدربون (الدروس، ورش العمل)",
        "التسويق (ملخصات الحملات، خطط المحتوى)",
        "المؤسسون (أيام العرض، تحديثات المستثمرين)"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل يمكن للذكاء الاصطناعي اتباع مخطط صارم؟",
          a: "نعم—قفل الهيكل قبل التوليد للحفاظ على المخطط المفضل لديك."
        },
        {
          q: "هل يمكنني إعادة توليد شريحة واحدة؟",
          a: "بالتأكيد—إعادة التوليد لكل شريحة تتيح لك تحسين شرائح محددة دون التأثير على الأخرى."
        },
        {
          q: "هل يضيف استشهادات؟",
          a: "الاستشهادات الاختيارية واعتمادات الصور يمكن إضافتها تلقائياً إلى شرائحك."
        },
        {
          q: "دعم متعدد اللغات؟",
          a: "نعم، بما في ذلك العربية مع دعم كامل لـ RTL."
        }
      ]
    }
  }
};

// ============================================================================
// 3. CREATE FROM WORD & PDF (Doc-to-Slides)
// ============================================================================
export const docToSlides: PageContent = {
  en: {
    h1: "Upload Word or PDF—get a clean, on-brand deck",
    subhead: "Our parser extracts structure, tables, and key points, then designs slides you can present today.",
    primaryCTA: "Convert a document",
    secondaryCTA: "See examples",
    features: {
      title: "Highlights",
      items: [
        "Keeps headings, lists, and hierarchy",
        "Converts tables to slide-friendly layouts",
        "Summarizes long sections into crisp bullets",
        "Extracts figures and generates captions",
        "Chooses layouts that fit your content density"
      ]
    },
    socialProof: {
      title: "Perfect for",
      stats: [
        "Course notes & educational materials",
        "Policy documents & procedures",
        "Research briefs & whitepapers",
        "SOPs & training manuals",
        "Business proposals & reports"
      ]
    },
    howItWorks: {
      title: "Simple workflow",
      steps: [
        "Upload .docx or .pdf",
        "Choose theme & audience",
        "Generate → Review → Export"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do you handle scanned documents?",
          a: "Light OCR is supported; works best with digital PDFs and Word documents."
        },
        {
          q: "What about footnotes and references?",
          a: "Added as final slide or included in speaker notes, based on your preference."
        },
        {
          q: "File size limits?",
          a: "Up to 25 MB on free plan, 500 MB on Pro. Enterprise supports larger files."
        },
        {
          q: "Does it work with Arabic documents?",
          a: "Yes! Full support for Arabic Word and PDF files with RTL formatting."
        }
      ]
    },
    footerCTA: "Built for Arabic & English content"
  },
  ar: {
    h1: "ارفع ملف Word أو PDF—احصل على عرض تقديمي نظيف ومتوافق مع علامتك التجارية",
    subhead: "محللنا يستخرج الهيكل، الجداول، والنقاط الرئيسية، ثم يصمم شرائح يمكنك تقديمها اليوم.",
    primaryCTA: "حوّل مستنداً",
    secondaryCTA: "شاهد الأمثلة",
    features: {
      title: "المزايا البارزة",
      items: [
        "يحافظ على العناوين، القوائم، والتسلسل الهرمي",
        "يحوّل الجداول إلى تخطيطات مناسبة للشرائح",
        "يلخص الأقسام الطويلة إلى نقاط واضحة",
        "يستخرج الأشكال وينشئ التسميات التوضيحية",
        "يختار تخطيطات تناسب كثافة محتواك"
      ]
    },
    socialProof: {
      title: "مثالي لـ",
      stats: [
        "ملاحظات الدورات والمواد التعليمية",
        "وثائق السياسات والإجراءات",
        "ملخصات الأبحاث والأوراق البيضاء",
        "إجراءات التشغيل القياسية وأدلة التدريب",
        "المقترحات التجارية والتقارير"
      ]
    },
    howItWorks: {
      title: "سير عمل بسيط",
      steps: [
        "ارفع .docx أو .pdf",
        "اختر القالب والجمهور",
        "ولّد ← راجع ← صدّر"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل تتعاملون مع المستندات الممسوحة ضوئياً؟",
          a: "يُدعم OCR الخفيف؛ يعمل بشكل أفضل مع ملفات PDF الرقمية ومستندات Word."
        },
        {
          q: "ماذا عن الحواشي والمراجع؟",
          a: "تُضاف كشريحة نهائية أو تُدرج في ملاحظات المتحدث، بناءً على تفضيلك."
        },
        {
          q: "حدود حجم الملف؟",
          a: "حتى 25 ميغابايت في الخطة المجانية، 500 ميغابايت في Pro. المؤسسات تدعم ملفات أكبر."
        },
        {
          q: "هل يعمل مع المستندات العربية؟",
          a: "نعم! دعم كامل لملفات Word و PDF العربية مع تنسيق RTL."
        }
      ]
    },
    footerCTA: "مبني للمحتوى العربي والإنجليزي"
  }
};

// ============================================================================
// 4. TEMPLATES & THEMES (Gallery)
// ============================================================================
export const templatesThemes: PageContent = {
  en: {
    h1: "Start with a template—finish in record time",
    subhead: "Professionally designed templates for pitches, lessons, roadmaps, reports, and more.",
    primaryCTA: "Browse templates",
    secondaryCTA: "Save as my brand theme",
    features: {
      title: "Template categories",
      items: [
        "Pitch Decks & Investor Presentations",
        "Sales Proposals & Business Plans",
        "Marketing Campaigns & Content Calendars",
        "Training Materials & Workshops",
        "Education & Academic Presentations",
        "Research Reports & Findings",
        "Project Updates & Roadmaps",
        "Corporate Reports & Analytics"
      ]
    },
    socialProof: {
      title: "Theme controls",
      stats: [
        "Customize colors, fonts, and logos",
        "Slide master edits for consistency",
        "RTL & bilingual variants (Arabic/English)",
        "Save custom themes for future use"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Can I create my own template?",
          a: "Yes—save any deck as a template for your team or personal use."
        },
        {
          q: "Will brand colors auto-apply?",
          a: "Yes—AI automatically remaps accent colors and chart styles to match your brand."
        },
        {
          q: "Can I share templates with my team?",
          a: "Team and Enterprise plans include shared template libraries."
        },
        {
          q: "Are templates available in Arabic?",
          a: "Yes, many templates have RTL-optimized Arabic variants."
        }
      ]
    }
  },
  ar: {
    h1: "ابدأ بقالب—أنهِ في وقت قياسي",
    subhead: "قوالب مصممة احترافياً للعروض التقديمية، الدروس، خرائط الطريق، التقارير، والمزيد.",
    primaryCTA: "تصفح القوالب",
    secondaryCTA: "احفظ كقالب علامتي التجارية",
    features: {
      title: "فئات القوالب",
      items: [
        "عروض الاستثمار والشركات الناشئة",
        "مقترحات المبيعات وخطط الأعمال",
        "الحملات التسويقية وتقاويم المحتوى",
        "مواد التدريب وورش العمل",
        "العروض التعليمية والأكاديمية",
        "تقارير الأبحاث والنتائج",
        "تحديثات المشاريع وخرائط الطريق",
        "التقارير المؤسسية والتحليلات"
      ]
    },
    socialProof: {
      title: "ضوابط القوالب",
      stats: [
        "تخصيص الألوان، الخطوط، والشعارات",
        "تعديلات الشريحة الرئيسية للاتساق",
        "متغيرات RTL وثنائية اللغة (عربي/إنجليزي)",
        "احفظ القوالب المخصصة للاستخدام المستقبلي"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل يمكنني إنشاء قالبي الخاص؟",
          a: "نعم—احفظ أي عرض تقديمي كقالب لفريقك أو استخدامك الشخصي."
        },
        {
          q: "هل ستُطبّق ألوان العلامة التجارية تلقائياً؟",
          a: "نعم—يعيد الذكاء الاصطناعي تخطيط ألوان التمييز وأنماط المخططات لتتناسب مع علامتك التجارية."
        },
        {
          q: "هل يمكنني مشاركة القوالب مع فريقي؟",
          a: "خطط الفريق والمؤسسات تتضمن مكتبات قوالب مشتركة."
        },
        {
          q: "هل القوالب متوفرة بالعربية؟",
          a: "نعم، العديد من القوالب لديها متغيرات عربية محسّنة لـ RTL."
        }
      ]
    }
  }
};

// ============================================================================
// 5. PRICING
// ============================================================================
export const pricing: PageContent = {
  en: {
    h1: "Simple pricing that scales with you",
    subhead: "Start free. Upgrade when you need more projects, brand control, and collaboration.",
    primaryCTA: "Start free",
    secondaryCTA: "Talk to sales (Enterprise)",
    features: {
      title: "Plans",
      items: [
        "Free: 3 decks/month, basic templates, PDF export",
        "Pro: Unlimited decks, PPTX export, brand kit, priority AI",
        "Team: Shared workspace, roles/permissions, collaboration, SSO",
        "Enterprise: Security review, private deployments, SLAs, dedicated support"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do you offer education/nonprofit discounts?",
          a: "Yes! We offer special pricing for educational institutions and nonprofits. Contact sales for details."
        },
        {
          q: "Monthly vs annual billing?",
          a: "Both available. Annual plans save approximately 20% compared to monthly."
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes, you can cancel your subscription at any time with no penalties."
        },
        {
          q: "What payment methods do you accept?",
          a: "Credit cards, PayPal, and bank transfers for Enterprise accounts."
        },
        {
          q: "Is there a free trial for paid plans?",
          a: "Pro plans include a 14-day free trial. No credit card required to start."
        }
      ]
    }
  },
  ar: {
    h1: "تسعير بسيط ينمو معك",
    subhead: "ابدأ مجاناً. ترقّى عندما تحتاج المزيد من المشاريع، التحكم بالعلامة التجارية، والتعاون.",
    primaryCTA: "ابدأ مجاناً",
    secondaryCTA: "تحدث إلى المبيعات (المؤسسات)",
    features: {
      title: "الخطط",
      items: [
        "مجاني: 3 عروض/شهر، قوالب أساسية، تصدير PDF",
        "Pro: عروض غير محدودة، تصدير PPTX، مجموعة العلامة التجارية، أولوية الذكاء الاصطناعي",
        "الفريق: مساحة عمل مشتركة، الأدوار/الصلاحيات، التعاون، تسجيل الدخول الموحد",
        "المؤسسات: مراجعة أمنية، نشر خاص، اتفاقيات مستوى الخدمة، دعم مخصص"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل تقدمون خصومات تعليمية/غير ربحية؟",
          a: "نعم! نقدم تسعيراً خاصاً للمؤسسات التعليمية والمنظمات غير الربحية. اتصل بالمبيعات للتفاصيل."
        },
        {
          q: "الفوترة الشهرية مقابل السنوية؟",
          a: "كلاهما متاح. الخطط السنوية توفر حوالي 20٪ مقارنة بالشهرية."
        },
        {
          q: "هل يمكنني الإلغاء في أي وقت؟",
          a: "نعم، يمكنك إلغاء اشتراكك في أي وقت دون عقوبات."
        },
        {
          q: "ما طرق الدفع التي تقبلونها؟",
          a: "بطاقات الائتمان، PayPal، والتحويلات البنكية لحسابات المؤسسات."
        },
        {
          q: "هل هناك تجربة مجانية للخطط المدفوعة؟",
          a: "خطط Pro تتضمن تجربة مجانية لمدة 14 يوماً. لا حاجة لبطاقة ائتمان للبدء."
        }
      ]
    }
  }
};

// ============================================================================
// 6. ENTERPRISE & TEAMS
// ============================================================================
export const enterprise: PageContent = {
  en: {
    h1: "Built for teams—ready for enterprise",
    subhead: "Permissions, SSO, audit logs, and private deployment options for organizations that need enterprise-grade security.",
    primaryCTA: "Contact sales",
    secondaryCTA: "Download security brief",
    features: {
      title: "Team features",
      items: [
        "Workspaces with role-based permissions",
        "Shared templates & brand kits",
        "Review & approval workflows",
        "Version history & audit trails",
        "Team analytics & usage reports",
        "Centralized billing & management"
      ]
    },
    socialProof: {
      title: "Enterprise add-ons",
      stats: [
        "SSO (SAML/OIDC) & SCIM provisioning",
        "Data residency & compliance options",
        "Private model routing / VPC deployment",
        "Dedicated account manager",
        "SLAs & priority support",
        "Custom integrations & API access"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "On-premise or VPC deployment?",
          a: "Available on Enterprise plans. Contact sales for deployment options."
        },
        {
          q: "Can we have custom templates per department?",
          a: "Yes—create department-specific template libraries with role-based access."
        },
        {
          q: "Do you support procurement & legal review?",
          a: "Yes, our sales team can work with your procurement and legal departments."
        },
        {
          q: "What about data sovereignty?",
          a: "We offer data residency options in multiple regions for Enterprise customers."
        }
      ]
    }
  },
  ar: {
    h1: "مبني للفرق—جاهز للمؤسسات",
    subhead: "الصلاحيات، تسجيل الدخول الموحد، سجلات المراجعة، وخيارات النشر الخاص للمؤسسات التي تحتاج أمان على مستوى المؤسسات.",
    primaryCTA: "اتصل بالمبيعات",
    secondaryCTA: "حمّل الموجز الأمني",
    features: {
      title: "ميزات الفريق",
      items: [
        "مساحات عمل مع صلاحيات قائمة على الأدوار",
        "قوالب مشتركة ومجموعات علامات تجارية",
        "سير عمل المراجعة والموافقة",
        "تاريخ الإصدارات وسجلات المراجعة",
        "تحليلات الفريق وتقارير الاستخدام",
        "الفوترة والإدارة المركزية"
      ]
    },
    socialProof: {
      title: "إضافات المؤسسات",
      stats: [
        "تسجيل الدخول الموحد (SAML/OIDC) وتوفير SCIM",
        "إقامة البيانات وخيارات الامتثال",
        "توجيه النموذج الخاص / نشر VPC",
        "مدير حساب مخصص",
        "اتفاقيات مستوى الخدمة ودعم الأولوية",
        "التكاملات المخصصة والوصول إلى API"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "النشر المحلي أو VPC؟",
          a: "متاح في خطط المؤسسات. اتصل بالمبيعات لخيارات النشر."
        },
        {
          q: "هل يمكن أن يكون لدينا قوالب مخصصة لكل قسم؟",
          a: "نعم—أنشئ مكتبات قوالب خاصة بالقسم مع وصول قائم على الأدوار."
        },
        {
          q: "هل تدعمون المشتريات والمراجعة القانونية؟",
          a: "نعم، يمكن لفريق المبيعات لدينا العمل مع أقسام المشتريات والقانون لديك."
        },
        {
          q: "ماذا عن سيادة البيانات؟",
          a: "نقدم خيارات إقامة البيانات في مناطق متعددة لعملاء المؤسسات."
        }
      ]
    }
  }
};

// ============================================================================
// 7. SECURITY & COMPLIANCE
// ============================================================================
export const security: PageContent = {
  en: {
    h1: "Your content, protected end-to-end",
    subhead: "We prioritize privacy, encryption, and enterprise-grade controls to keep your data secure.",
    primaryCTA: "View security overview",
    secondaryCTA: "Request DPA",
    features: {
      title: "Security practices",
      items: [
        "Encryption at rest & in transit (AES-256, TLS 1.3)",
        "Least-privilege access with role-based controls",
        "Comprehensive audit logging & monitoring",
        "Optional zero-retention for prompts & documents",
        "Data residency options for compliance",
        "Regular security audits & penetration testing"
      ]
    },
    socialProof: {
      title: "Compliance & certifications",
      stats: [
        "SOC 2 Type II (in progress/certified)",
        "GDPR compliant with DPA available",
        "DPIA support for data protection",
        "ISO 27001 aligned security controls",
        "HIPAA compliance (Enterprise add-on)",
        "Regular third-party security assessments"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do you train AI models on my data?",
          a: "No, we do not train on customer data without explicit opt-in consent."
        },
        {
          q: "Can you sign a Data Processing Agreement (DPA)?",
          a: "Yes, DPAs and Standard Contractual Clauses (SCCs) available on request."
        },
        {
          q: "How do you handle data deletions?",
          a: "Hard delete on request according to our data retention policy (typically 30 days for soft delete)."
        },
        {
          q: "What about data backups?",
          a: "Encrypted backups with 30-day retention. Can be adjusted for Enterprise customers."
        }
      ]
    }
  },
  ar: {
    h1: "محتواك، محمي من البداية للنهاية",
    subhead: "نعطي الأولوية للخصوصية، التشفير، والضوابط على مستوى المؤسسات للحفاظ على أمان بياناتك.",
    primaryCTA: "عرض نظرة عامة على الأمان",
    secondaryCTA: "اطلب اتفاقية معالجة البيانات",
    features: {
      title: "ممارسات الأمان",
      items: [
        "التشفير أثناء الراحة والنقل (AES-256، TLS 1.3)",
        "وصول بأقل الامتيازات مع ضوابط قائمة على الأدوار",
        "تسجيل ومراقبة شاملة للمراجعة",
        "احتفاظ صفري اختياري للنصوص والمستندات",
        "خيارات إقامة البيانات للامتثال",
        "عمليات تدقيق أمنية منتظمة واختبار الاختراق"
      ]
    },
    socialProof: {
      title: "الامتثال والشهادات",
      stats: [
        "SOC 2 النوع الثاني (قيد التنفيذ/معتمد)",
        "متوافق مع GDPR مع توفر اتفاقية معالجة البيانات",
        "دعم تقييم تأثير حماية البيانات (DPIA)",
        "ضوابط أمنية متوافقة مع ISO 27001",
        "امتثال HIPAA (إضافة المؤسسات)",
        "تقييمات أمنية منتظمة من طرف ثالث"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل تدربون نماذج الذكاء الاصطناعي على بياناتي؟",
          a: "لا، نحن لا ندرب على بيانات العملاء دون موافقة صريحة على الاشتراك."
        },
        {
          q: "هل يمكنكم توقيع اتفاقية معالجة البيانات (DPA)؟",
          a: "نعم، اتفاقيات معالجة البيانات والشروط التعاقدية القياسية (SCCs) متاحة عند الطلب."
        },
        {
          q: "كيف تتعاملون مع حذف البيانات؟",
          a: "الحذف الكامل عند الطلب وفقاً لسياسة الاحتفاظ بالبيانات (عادةً 30 يوماً للحذف المؤقت)."
        },
        {
          q: "ماذا عن النسخ الاحتياطية للبيانات؟",
          a: "نسخ احتياطية مشفرة مع احتفاظ لمدة 30 يوماً. يمكن تعديلها لعملاء المؤسسات."
        }
      ]
    }
  }
};

// ============================================================================
// 8. INTEGRATIONS
// ============================================================================
export const integrations: PageContent = {
  en: {
    h1: "Works with the tools you already use",
    subhead: "Import content, export slides, and keep everything in sync with your favorite platforms.",
    primaryCTA: "Explore integrations",
    secondaryCTA: "View API docs",
    features: {
      title: "Featured integrations",
      items: [
        "Google Drive & Google Docs—direct import",
        "Microsoft OneDrive & Word—seamless sync",
        "Dropbox—cloud file access",
        "Notion & Confluence—knowledge base to slides",
        "PowerPoint & Keynote—perfect exports",
        "Slack & Microsoft Teams—share & collaborate",
        "Zapier & Make—automation workflows",
        "REST API & webhooks for custom integrations"
      ]
    },
    socialProof: {
      title: "Developer tools",
      stats: [
        "REST API with comprehensive documentation",
        "Webhooks for real-time notifications",
        "SDKs for popular languages (coming soon)",
        "OAuth 2.0 authentication",
        "Rate limits: 1000 requests/hour (Pro+)",
        "99.9% API uptime SLA (Enterprise)"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Single-click import from Google Docs or Drive?",
          a: "Yes—connect your Google account and import documents with one click."
        },
        {
          q: "Auto-export to PPTX after generation?",
          a: "Yes, you can set up automatic exports to cloud storage or email."
        },
        {
          q: "Can I build custom integrations?",
          a: "Absolutely—use our REST API to build custom workflows and integrations."
        },
        {
          q: "Do integrations work with Arabic content?",
          a: "Yes, all integrations support Arabic documents with RTL formatting."
        }
      ]
    }
  },
  ar: {
    h1: "يعمل مع الأدوات التي تستخدمها بالفعل",
    subhead: "استورد المحتوى، صدّر الشرائح، وحافظ على كل شيء متزامناً مع منصاتك المفضلة.",
    primaryCTA: "استكشف التكاملات",
    secondaryCTA: "عرض مستندات API",
    features: {
      title: "التكاملات المميزة",
      items: [
        "Google Drive و Google Docs—استيراد مباشر",
        "Microsoft OneDrive و Word—مزامنة سلسة",
        "Dropbox—الوصول إلى الملفات السحابية",
        "Notion و Confluence—قاعدة المعرفة إلى شرائح",
        "PowerPoint و Keynote—تصدير مثالي",
        "Slack و Microsoft Teams—المشاركة والتعاون",
        "Zapier و Make—سير عمل الأتمتة",
        "REST API وwebhooks للتكاملات المخصصة"
      ]
    },
    socialProof: {
      title: "أدوات المطورين",
      stats: [
        "REST API مع توثيق شامل",
        "Webhooks للإشعارات في الوقت الفعلي",
        "SDKs للغات الشائعة (قريباً)",
        "مصادقة OAuth 2.0",
        "حدود المعدل: 1000 طلب/ساعة (Pro+)",
        "اتفاقية مستوى خدمة API بنسبة 99.9٪ (المؤسسات)"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "استيراد بنقرة واحدة من Google Docs أو Drive؟",
          a: "نعم—اربط حساب Google الخاص بك واستورد المستندات بنقرة واحدة."
        },
        {
          q: "التصدير التلقائي إلى PPTX بعد التوليد؟",
          a: "نعم، يمكنك إعداد عمليات تصدير تلقائية إلى التخزين السحابي أو البريد الإلكتروني."
        },
        {
          q: "هل يمكنني بناء تكاملات مخصصة؟",
          a: "بالتأكيد—استخدم REST API الخاص بنا لبناء سير عمل وتكاملات مخصصة."
        },
        {
          q: "هل تعمل التكاملات مع المحتوى العربي؟",
          a: "نعم، جميع التكاملات تدعم المستندات العربية مع تنسيق RTL."
        }
      ]
    }
  }
};

// ============================================================================
// 9. USE CASES HUB
// ============================================================================
export const useCases: PageContent = {
  en: {
    h1: "AI slides for every team",
    subhead: "Start with a use-case playbook and ship a polished deck in minutes.",
    primaryCTA: "See use-case guides",
    secondaryCTA: "Browse templates",
    features: {
      title: "Use cases by role",
      items: [
        "Sales: Discovery → Proposal → QBR presentations",
        "Marketing: Campaign plans → Content calendars → Performance reports",
        "Education/Training: Lesson plans → Workshops → Course materials (Arabic/English)",
        "Founders: Pitch decks → Investor updates → Demo day slides",
        "Operations: SOPs → Policy decks → Process documentation",
        "Research: Literature review → Findings summary → Conference presentations",
        "HR/Training: Onboarding → Compliance training → Team workshops",
        "Product: Roadmaps → Feature specs → Sprint reviews"
      ]
    },
    socialProof: {
      title: "What's included",
      stats: [
        "Role-specific prompt templates",
        "Best-practice deck structures",
        "Before/after examples",
        "Industry-specific variations",
        "Bilingual playbooks (Arabic/English)",
        "Video tutorials for each use case"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do playbooks include ready-to-use prompts?",
          a: "Yes—each playbook includes copy/paste prompts optimized for that specific use case."
        },
        {
          q: "Can I create bilingual decks?",
          a: "Yes—duplicate any deck and use our translation feature to create Arabic or Spanish versions."
        },
        {
          q: "Are there industry-specific templates?",
          a: "Yes, we have specialized templates for healthcare, finance, education, government, and more."
        },
        {
          q: "Can I request new use cases?",
          a: "Absolutely! We're always adding new playbooks based on user feedback."
        }
      ]
    }
  },
  ar: {
    h1: "شرائح الذكاء الاصطناعي لكل فريق",
    subhead: "ابدأ بدليل حالة استخدام وأرسل عرضاً مصقولاً في دقائق.",
    primaryCTA: "شاهد أدلة حالات الاستخدام",
    secondaryCTA: "تصفح القوالب",
    features: {
      title: "حالات الاستخدام حسب الدور",
      items: [
        "المبيعات: الاكتشاف ← المقترح ← عروض المراجعة الفصلية",
        "التسويق: خطط الحملات ← تقاويم المحتوى ← تقارير الأداء",
        "التعليم/التدريب: خطط الدروس ← ورش العمل ← مواد الدورة (عربي/إنجليزي)",
        "المؤسسون: عروض الاستثمار ← تحديثات المستثمرين ← شرائح يوم العرض التوضيحي",
        "العمليات: إجراءات التشغيل القياسية ← عروض السياسات ← توثيق العمليات",
        "البحث: مراجعة الأدبيات ← ملخص النتائج ← عروض المؤتمرات",
        "الموارد البشرية/التدريب: التوجيه ← تدريب الامتثال ← ورش عمل الفريق",
        "المنتج: خرائط الطريق ← مواصفات الميزات ← مراجعات السباق السريع"
      ]
    },
    socialProof: {
      title: "ما المدرج",
      stats: [
        "قوالب نصوص تعليمية خاصة بالدور",
        "هياكل عروض أفضل الممارسات",
        "أمثلة قبل/بعد",
        "تنوعات خاصة بالصناعة",
        "أدلة ثنائية اللغة (عربي/إنجليزي)",
        "دروس فيديو لكل حالة استخدام"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل تتضمن الأدلة نصوصاً تعليمية جاهزة للاستخدام؟",
          a: "نعم—يتضمن كل دليل نصوصاً تعليمية للنسخ/اللصق محسّنة لحالة الاستخدام المحددة تلك."
        },
        {
          q: "هل يمكنني إنشاء عروض ثنائية اللغة؟",
          a: "نعم—كرر أي عرض تقديمي واستخدم ميزة الترجمة لدينا لإنشاء نسخ عربية أو إسبانية."
        },
        {
          q: "هل هناك قوالب خاصة بالصناعة؟",
          a: "نعم، لدينا قوالب متخصصة للرعاية الصحية، المالية، التعليم، الحكومة، والمزيد."
        },
        {
          q: "هل يمكنني طلب حالات استخدام جديدة؟",
          a: "بالتأكيد! نضيف دائماً أدلة جديدة بناءً على ملاحظات المستخدمين."
        }
      ]
    }
  }
};

// ============================================================================
// 10. RESOURCES & ACADEMY
// ============================================================================
export const resources: PageContent = {
  en: {
    h1: "Learn faster: prompts, tutorials, and examples",
    subhead: "Best-practice prompts, sample decks, and before/after case studies to help you master AI presentations.",
    primaryCTA: "Browse tutorials",
    secondaryCTA: "Open prompt library",
    features: {
      title: "What you'll find",
      items: [
        "Quickstart videos (60–180 seconds)",
        "Comprehensive prompt library (sales, education, pitch, marketing)",
        "Example decks you can view & duplicate",
        "Blog with product news & AI presentation tips",
        "API documentation & advanced export guides",
        "Best practices for Arabic & bilingual content",
        "Community showcase & user success stories",
        "Weekly office hours & Q&A sessions"
      ]
    },
    socialProof: {
      title: "Popular resources",
      stats: [
        "50+ prompt templates across all industries",
        "100+ example presentations to inspire you",
        "Video tutorials in English & Arabic",
        "Monthly webinars with tips & tricks",
        "Active community forum",
        "Public product roadmap"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do you have a public roadmap?",
          a: "Yes—check our blog for the latest roadmap and upcoming features."
        },
        {
          q: "Can I submit my own template?",
          a: "Absolutely! We love community contributions. Submit through our template gallery."
        },
        {
          q: "Are tutorials available in Arabic?",
          a: "Yes, we're adding Arabic tutorials and localized content regularly."
        },
        {
          q: "How do I get help with the API?",
          a: "Check our comprehensive API docs, or contact developer support for assistance."
        }
      ]
    }
  },
  ar: {
    h1: "تعلم أسرع: نصوص تعليمية، دروس، وأمثلة",
    subhead: "نصوص تعليمية لأفضل الممارسات، عروض نموذجية، ودراسات حالة قبل/بعد لمساعدتك على إتقان العروض التقديمية بالذكاء الاصطناعي.",
    primaryCTA: "تصفح الدروس",
    secondaryCTA: "افتح مكتبة النصوص التعليمية",
    features: {
      title: "ما ستجده",
      items: [
        "مقاطع فيديو للبدء السريع (60-180 ثانية)",
        "مكتبة نصوص تعليمية شاملة (مبيعات، تعليم، استثمار، تسويق)",
        "عروض نموذجية يمكنك عرضها وتكرارها",
        "مدونة مع أخبار المنتج ونصائح العروض التقديمية بالذكاء الاصطناعي",
        "توثيق API وأدلة التصدير المتقدمة",
        "أفضل الممارسات للمحتوى العربي وثنائي اللغة",
        "عرض المجتمع وقصص نجاح المستخدمين",
        "ساعات عمل أسبوعية وجلسات أسئلة وأجوبة"
      ]
    },
    socialProof: {
      title: "الموارد الشائعة",
      stats: [
        "أكثر من 50 قالب نص تعليمي عبر جميع الصناعات",
        "أكثر من 100 عرض تقديمي نموذجي لإلهامك",
        "دروس فيديو بالإنجليزية والعربية",
        "ندوات شهرية عبر الإنترنت مع النصائح والحيل",
        "منتدى مجتمع نشط",
        "خارطة طريق المنتج العامة"
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "هل لديكم خارطة طريق عامة؟",
          a: "نعم—تحقق من مدونتنا لأحدث خارطة طريق والميزات القادمة."
        },
        {
          q: "هل يمكنني تقديم قالبي الخاص؟",
          a: "بالتأكيد! نحب مساهمات المجتمع. قدّم من خلال معرض القوالب لدينا."
        },
        {
          q: "هل الدروس متوفرة بالعربية؟",
          a: "نعم، نضيف دروساً عربية ومحتوى محلياً بانتظام."
        },
        {
          q: "كيف أحصل على مساعدة مع API؟",
          a: "تحقق من مستندات API الشاملة لدينا، أو اتصل بدعم المطورين للحصول على المساعدة."
        }
      ]
    }
  }
};

// Export all page content
export const pagesCopy = {
  home: homePage,
  aiPresentationGenerator,
  docToSlides,
  templatesThemes,
  pricing,
  enterprise,
  security,
  integrations,
  useCases,
  resources
};
