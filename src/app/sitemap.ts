// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { LOCALES } from "@/data/locales";
import { slidesLandings } from "@/data/landings.slides";
import { videoLandings } from "@/data/landings.video";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";
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
      url: `${base}/${l}/video`, 
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

  // Video landing pages - high priority
  for (const n of videoLandings) {
    items.push({
      url: `${base}/${n.locale}/video/${encodeURIComponent(n.slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // Dedupe
  const seen = new Set<string>();
  return items.filter((it) => (seen.has(it.url) ? false : (seen.add(it.url), true)));
}
