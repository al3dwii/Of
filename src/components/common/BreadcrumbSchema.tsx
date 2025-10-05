import Script from 'next/script';

/**
 * Breadcrumb Schema Component
 * Generates structured data for breadcrumb navigation
 * Improves search result appearance with breadcrumb trail
 * 
 * @example
 * <BreadcrumbSchema
 *   items={[
 *     { name: 'Home', url: 'https://yourdomain.com' },
 *     { name: 'Tools', url: 'https://yourdomain.com/tools' },
 *     { name: 'Word to PDF', url: 'https://yourdomain.com/tools/word-to-pdf' }
 *   ]}
 * />
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
