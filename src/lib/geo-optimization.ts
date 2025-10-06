// src/lib/geo-optimization.ts
/**
 * Generative Engine Optimization (GEO) / Answer Engine Optimization (AEO) utilities
 * 
 * Optimizes content for AI engines like ChatGPT, Claude, Perplexity, Google AI Overviews
 * 
 * Key principles:
 * 1. Clear, factual statements
 * 2. Structured data (Schema.org)
 * 3. Q&A format (FAQs)
 * 4. Statistics and citations
 * 5. Author authority signals
 * 6. Comparison tables
 * 7. Step-by-step guides
 */

export interface AuthorInfo {
  name: string;
  title: string;
  organization?: string;
  expertise?: string[];
  url?: string;
}

export interface CitableStatistic {
  claim: string;
  value: string | number;
  source?: string;
  date?: string;
  url?: string;
}

export interface ComparisonRow {
  feature: string;
  ourProduct: string | boolean;
  alternatives: Record<string, string | boolean>;
}

/**
 * Generate Schema.org Article markup optimized for AI engines
 */
export function generateArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  url,
  imageUrl,
  keywords,
  statistics,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: AuthorInfo;
  url: string;
  imageUrl?: string;
  keywords?: string[];
  statistics?: CitableStatistic[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      ...(author.organization && {
        worksFor: {
          "@type": "Organization",
          name: author.organization,
        },
      }),
      ...(author.url && { url: author.url }),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
    ...(keywords && { keywords: keywords.join(", ") }),
    // Add statistics as claims
    ...(statistics &&
      statistics.length > 0 && {
        about: statistics.map((stat) => ({
          "@type": "Claim",
          text: stat.claim,
          ...(stat.source && {
            claimReviewed: stat.claim,
            itemReviewed: {
              "@type": "CreativeWork",
              name: stat.source,
              ...(stat.url && { url: stat.url }),
            },
          }),
        })),
      }),
  };
}

/**
 * Generate Schema.org HowTo markup optimized for step-by-step citations
 */
export function generateEnhancedHowToSchema({
  name,
  description,
  totalTime,
  estimatedCost,
  steps,
  tools,
  supplies,
}: {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: string;
  steps: Array<{
    name: string;
    text: string;
    tip?: string;
    image?: string;
    url?: string;
  }>;
  tools?: string[];
  supplies?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: estimatedCost,
      },
    }),
    ...(tools && {
      tool: tools.map((tool) => ({
        "@type": "HowToTool",
        name: tool,
      })),
    }),
    ...(supplies && {
      supply: supplies.map((supply) => ({
        "@type": "HowToSupply",
        name: supply,
      })),
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.tip && { tip: step.tip }),
      ...(step.image && {
        image: {
          "@type": "ImageObject",
          url: step.image,
        },
      }),
      ...(step.url && { url: step.url }),
    })),
  };
}

/**
 * Generate comparison table schema for AI engines
 */
export function generateComparisonSchema({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  items: Array<{
    name: string;
    description: string;
    features: Record<string, string | boolean | number>;
    rating?: number;
    price?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        description: item.description,
        ...(item.rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: item.rating,
            bestRating: 5,
          },
        }),
        ...(item.price && {
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "USD",
          },
        }),
        // Add features as properties
        additionalProperty: Object.entries(item.features).map(
          ([key, value]) => ({
            "@type": "PropertyValue",
            name: key,
            value: String(value),
          })
        ),
      },
    })),
  };
}

/**
 * Generate statistics/claims schema that AI can cite
 */
export function generateStatisticsSchema(statistics: CitableStatistic[]) {
  return statistics.map((stat) => ({
    "@context": "https://schema.org",
    "@type": "Claim",
    text: stat.claim,
    ...(stat.date && { datePublished: stat.date }),
    ...(stat.source && {
      claimReviewed: stat.claim,
      itemReviewed: {
        "@type": "CreativeWork",
        name: stat.source,
        ...(stat.url && { url: stat.url }),
      },
    }),
    // Add the actual value as a property
    about: {
      "@type": "QuantitativeValue",
      value: stat.value,
      description: stat.claim,
    },
  }));
}

/**
 * Format content for optimal AI extraction
 * AI engines prefer clear, declarative statements
 */
export function formatForAICitation(content: {
  topic: string;
  keyFacts: string[];
  context?: string;
}): string {
  const { topic, keyFacts, context } = content;

  let formatted = `${topic}\n\n`;

  if (context) {
    formatted += `${context}\n\n`;
  }

  formatted += "Key Facts:\n";
  keyFacts.forEach((fact, index) => {
    formatted += `${index + 1}. ${fact}\n`;
  });

  return formatted;
}

/**
 * Generate meta tags specifically for AI crawlers
 */
export function generateAIOptimizedMetaTags({
  title,
  description,
  keywords,
  author,
  category,
  datePublished,
  statistics,
}: {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  category: string;
  datePublished: string;
  statistics?: CitableStatistic[];
}) {
  return {
    // Standard SEO
    title,
    description,
    keywords: keywords.join(", "),

    // Author authority signals
    author,
    "article:author": author,
    "article:published_time": datePublished,
    "article:section": category,
    "article:tag": keywords.join(","),

    // OpenGraph for AI crawlers
    "og:title": title,
    "og:description": description,
    "og:type": "article",

    // Twitter cards (used by some AI engines)
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description,

    // Additional AI-friendly tags
    "citation_title": title,
    "citation_author": author,
    "citation_publication_date": datePublished,

    // Dublin Core (used by academic AI models)
    "DC.title": title,
    "DC.creator": author,
    "DC.date": datePublished,
    "DC.description": description,
    "DC.subject": keywords.join("; "),

    // Statistics as meta (if provided)
    ...(statistics &&
      statistics.length > 0 && {
        "article:opinion": "false", // Mark as factual
        "article:content_tier": "free", // Accessibility signal
      }),
  };
}

/**
 * Generate E-E-A-T signals for Google AI Overviews
 * Experience, Expertise, Authoritativeness, Trustworthiness
 */
export function generateEEATSignals({
  experience,
  expertise,
  authoritativeness,
  trustworthiness,
}: {
  experience?: string[];
  expertise?: string[];
  authoritativeness?: {
    awards?: string[];
    certifications?: string[];
    publications?: string[];
  };
  trustworthiness?: {
    privacyPolicy?: string;
    termsOfService?: string;
    contactInfo?: string;
    reviews?: { rating: number; count: number };
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...(experience && {
      description: experience.join(" "),
    }),
    ...(expertise && {
      knowsAbout: expertise,
    }),
    ...(authoritativeness && {
      ...(authoritativeness.awards && {
        award: authoritativeness.awards,
      }),
      ...(authoritativeness.certifications && {
        hasCredential: authoritativeness.certifications.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert,
        })),
      }),
      ...(authoritativeness.publications && {
        subjectOf: authoritativeness.publications.map((pub) => ({
          "@type": "CreativeWork",
          name: pub,
        })),
      }),
    }),
    ...(trustworthiness && {
      ...(trustworthiness.reviews && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: trustworthiness.reviews.rating,
          reviewCount: trustworthiness.reviews.count,
        },
      }),
    }),
  };
}

/**
 * Best practices for AI-friendly content structure
 */
export const AI_CONTENT_BEST_PRACTICES = {
  // Use these patterns in your content
  patterns: {
    definition: "Clear one-sentence definition at the start",
    statistics: "Include specific numbers and dates",
    comparisons: "Use 'vs', 'compared to', 'better than' patterns",
    steps: "Number your steps clearly (1, 2, 3...)",
    timeframes: "Specify durations ('in 5 minutes', 'within 2 hours')",
    results: "State outcomes clearly ('resulting in', 'achieves', 'delivers')",
  },

  // Phrases AI engines look for
  citablePatterns: [
    "According to [source]",
    "Research shows that",
    "Studies indicate",
    "Data reveals",
    "[Number]% of [audience]",
    "The best way to",
    "How to [action]",
    "[Year] statistics",
    "Compared to [alternative]",
    "Step-by-step guide",
  ],

  // Structure your content
  contentStructure: {
    introduction: "1-2 sentences with clear definition",
    keyBenefits: "3-5 bullet points with specific outcomes",
    howItWorks: "Numbered steps (3-7 steps ideal)",
    statistics: "2-3 data points with sources",
    comparison: "Table comparing to 2-3 alternatives",
    faq: "5-10 common questions with clear answers",
    callToAction: "Single clear action statement",
  },

  // Keywords to include
  semanticKeywords: {
    includeVariations: true,
    synonyms: true,
    relatedTerms: true,
    industryJargon: true,
    commonMisspellings: false, // Don't include these
  },
};
