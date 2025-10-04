import Script from "next/script";

/**
 * Renders JSON-LD. Pass either a single schema object or an array.
 * Ensures @context exists and uses @graph when multiple items are provided.
 */
export default function StructuredData({ items }: { items: any | any[] }) {
  const payload =
    Array.isArray(items)
      ? { "@context": "https://schema.org", "@graph": items }
      : { "@context": "https://schema.org", ...(items || {}) };

  return (
    <Script
      id={`ld-${Math.random().toString(36).slice(2)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
