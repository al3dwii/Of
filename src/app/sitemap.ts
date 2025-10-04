// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { LOCALES } from "@/data/locales";
import { slidesLandings } from "@/data/landings.slides";
import { videoLandings } from "@/data/landings.video";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";
  const items: MetadataRoute.Sitemap = [];

  // Locale roots + trust pages
  for (const l of LOCALES) {
    items.push({ url: `${base}/${l}`, changeFrequency: "weekly", priority: 0.8 });
    items.push({ url: `${base}/${l}/faq`, changeFrequency: "monthly", priority: 0.5 });
    items.push({ url: `${base}/${l}/pricing`, changeFrequency: "monthly", priority: 0.5 });
    items.push({ url: `${base}/${l}/privacy`, changeFrequency: "yearly", priority: 0.3 });
    items.push({ url: `${base}/${l}/terms`, changeFrequency: "yearly", priority: 0.3 });
    // Locale workbenches
    items.push({ url: `${base}/${l}/slides`, changeFrequency: "weekly", priority: 0.6 });
    items.push({ url: `${base}/${l}/video`, changeFrequency: "weekly", priority: 0.6 });
  }

  for (const n of slidesLandings) {
    items.push({
      url: `${base}/${n.locale}/slides/${encodeURIComponent(n.slug)}`,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const n of videoLandings) {
    items.push({
      url: `${base}/${n.locale}/video/${encodeURIComponent(n.slug)}`,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  // Dedupe
  const seen = new Set<string>();
  return items.filter((it) => (seen.has(it.url) ? false : (seen.add(it.url), true)));
}
