// Translation type definitions
export interface Translation {
  // Navigation
  nav: {
    home: string
    slides: string
    video: string
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
      ctaVideo: string
    }
    features: {
      title: string
      slides: {
        title: string
        description: string
      }
      video: {
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
    uploadVideo: string
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
    platform: string
    tools: string
    support: string
    company: string
    helpCenter: string
    contactSupport: string
    systemStatus: string
    whatsNew: string
    about: string
    privacy: string
    terms: string
    security: string
    allRightsReserved: string
    allSystemsOperational: string
    needHelp: string
    apiDocs: string
    readyToStart: {
      title: string
      subtitle: string
    }
  }

  // Descriptions
  descriptions: {
    aiGeneratedSlides: string
    multilingualDubbing: string
    overviewAndStats: string
    managePresentations: string
    performanceInsights: string
  }
}
