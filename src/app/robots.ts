import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";
  
  return {
    rules: [
      // Allow all crawlers by default
      { 
        userAgent: "*", 
        allow: "/",
        // Allow unlimited snippet length for AI engines
        crawlDelay: 0,
      },
      // Specific rules for AI engine crawlers
      {
        userAgent: "GPTBot", // OpenAI/ChatGPT
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User", // ChatGPT user-facing
        allow: "/",
      },
      {
        userAgent: "Google-Extended", // Google Bard/Gemini
        allow: "/",
      },
      {
        userAgent: "anthropic-ai", // Claude
        allow: "/",
      },
      {
        userAgent: "ClaudeBot", // Claude web crawler
        allow: "/",
      },
      {
        userAgent: "PerplexityBot", // Perplexity AI
        allow: "/",
      },
      {
        userAgent: "YouBot", // You.com
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended", // Apple Intelligence
        allow: "/",
      },
      {
        userAgent: "CCBot", // Common Crawl (used by many AI)
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot", // OpenAI Search
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
