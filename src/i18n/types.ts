// Translation type definitions
export interface Translation {
  // Navigation
  nav: {
    home: string
    slides: string
    tools: string
    dashboard: string
    presentations: string
    analytics: string
    search: string
    notifications: string
    openMenu: string
    closeMenu: string
    changeLanguage: string
    chooseLanguage: string
  }

  // Brand
  brand: {
    name: string
    tagline: string
  }

  // Homepage
  home: {
    hero: {
      title: string
      subtitle: string
      ctaSlides: string
      ctaConvert: string
    }
    features: {
      title: string
      slides: {
        title: string
        description: string
      }
      conversion: {
        title: string
        description: string
      }
      analytics: {
        title: string
        description: string
      }
    }
    popularLandings: {
      title: string
      arabic: string
      english: string
    }
    cta: {
      title: string
      subtitle: string
      getStarted: string
    }
  }

  // Dashboard
  dashboard: {
    overview: string
    stats: string
    recentProjects: string
    quickActions: string
    createPresentation: string
    convertDocument: string
    viewAnalytics: string
    settings: string
  }

  // Common
  common: {
    loading: string
    error: string
    success: string
    save: string
    cancel: string
    delete: string
    edit: string
    create: string
    back: string
    next: string
    previous: string
    close: string
    confirm: string
    learnMore: string
    getStarted: string
    readMore: string
  }

  // Footer
  footer: {
    platform: {
      title: string
      dashboard: string
      presentations: string
      analytics: string
    }
    tools: {
      title: string
      createPresentation: string
      apiDocs: string
      settings: string
    }
    support: {
      title: string
      helpCenter: string
      contactSupport: string
      systemStatus: string
      whatsNew: string
    }
    company: {
      title: string
      about: string
      privacy: string
      terms: string
      security: string
    }
    social: {
      twitter: string
      discord: string
      github: string
      linkedin: string
    }
    brand: {
      tagline: string
      description: string
    }
    readyToStart: {
      title: string
      subtitle: string
      createButton: string
      uploadButton: string
    }
    bottom: {
      allRightsReserved: string
      allSystemsOperational: string
      needHelp: string
      version: string
    }
  }

  // Descriptions
  descriptions: {
    aiGeneratedSlides: string
    documentConversion: string
    overviewAndStats: string
    managePresentations: string
    performanceInsights: string
  }
}
