// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { LOCALES } from "@/data/locales";
import { slidesLandings } from "@/data/landings.slides";
import { getConverters } from "@/lib/server/converters";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://sharayeh.com";
  const now = new Date();
  const items: MetadataRoute.Sitemap = [];

  // Locale roots + trust pages
  for (const l of LOCALES) {
    // Home pages - highest priority
    items.push({ 
      url: `${base}/${l}`, 
      lastModified: now,
      changeFrequency: "daily", 
      priority: 1.0 
    });
    
    // Main tool pages - very high priority
    items.push({ 
      url: `${base}/${l}/slides`, 
      lastModified: now,
      changeFrequency: "daily", 
      priority: 0.9 
    });
    items.push({ 
      url: `${base}/${l}/pdf`, 
      lastModified: now,
      changeFrequency: "weekly", 
      priority: 0.8 
    });
    items.push({ 
      url: `${base}/${l}/documents`, 
      lastModified: now,
      changeFrequency: "weekly", 
      priority: 0.8 
    });
    items.push({ 
      url: `${base}/${l}/translate`, 
      lastModified: now,
      changeFrequency: "weekly", 
      priority: 0.8 
    });
    items.push({ 
      url: `${base}/${l}/web`, 
      lastModified: now,
      changeFrequency: "weekly", 
      priority: 0.8 
    });
    
    // Trust & legal pages
    items.push({ 
      url: `${base}/${l}/faq`, 
      lastModified: now,
      changeFrequency: "monthly", 
      priority: 0.7 
    });
    items.push({ 
      url: `${base}/${l}/pricing`, 
      lastModified: now,
      changeFrequency: "weekly", 
      priority: 0.7 
    });
    items.push({ 
      url: `${base}/${l}/privacy`, 
      lastModified: now,
      changeFrequency: "yearly", 
      priority: 0.4 
    });
    items.push({ 
      url: `${base}/${l}/terms`, 
      lastModified: now,
      changeFrequency: "yearly", 
      priority: 0.4 
    });
    
    // Dashboard (noindex in robots, but include for authenticated users)
    items.push({ 
      url: `${base}/${l}/dashboard`, 
      lastModified: now,
      changeFrequency: "weekly", 
      priority: 0.5 
    });
  }

  // Slides landing pages - high priority
  for (const n of slidesLandings) {
    items.push({
      url: `${base}/${n.locale}/slides/${encodeURIComponent(n.slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // Tool/Converter pages - VERY high priority for SEO
  const converters = getConverters();
  for (const converter of converters) {
    // Add English version
    items.push({
      url: `${base}/en/tools/${converter.slug_en}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9, // Very high - these are key SEO pages
    });
    
    // Add Arabic version
    items.push({
      url: `${base}/ar/tools/${converter.slug_ar}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Tools index pages
  items.push({
    url: `${base}/en/tools`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  });
  items.push({
    url: `${base}/ar/tools`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  });

  // Dedupe
  const seen = new Set<string>();
  return items.filter((it) => (seen.has(it.url) ? false : (seen.add(it.url), true)));
}
