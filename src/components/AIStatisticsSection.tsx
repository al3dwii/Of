// src/components/AIStatisticsSection.tsx
import { AI_PRESENTATION_STATISTICS, type AIStatistic } from '@/data/ai-statistics';

interface Props {
  locale: 'en' | 'ar';
  category?: AIStatistic['category'];
  limit?: number;
  showSources?: boolean;
}

/**
 * AI Statistics Section Component
 * 
 * Displays citable statistics in a format optimized for AI engines:
 * - Clear, factual statements
 * - Quantifiable data points
 * - Structured markup
 * - Source citations
 * 
 * AI engines like ChatGPT, Claude, and Perplexity prefer this format
 */
export default function AIStatisticsSection({
  locale,
  category,
  limit = 3,
  showSources = true,
}: Props) {
  const isAr = locale === 'ar';

  // Filter and limit statistics
  const statistics = (
    category
      ? AI_PRESENTATION_STATISTICS.filter((stat) => stat.category === category)
      : AI_PRESENTATION_STATISTICS
  ).slice(0, limit);

  const title = isAr ? 'إحصائيات رئيسية' : 'Key Statistics';
  const sourceLabel = isAr ? 'المصدر' : 'Source';

  return (
    <section
      className="my-12 max-w-4xl mx-auto"
      itemScope
      itemType="https://schema.org/Dataset"
    >
      <h2
        className="text-3xl font-bold text-center mb-8"
        itemProp="name"
      >
        {title}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            itemScope
            itemType="https://schema.org/Claim"
          >
            {/* Large statistic value */}
            <div
              className="text-5xl font-bold text-blue-600 mb-3"
              itemProp="value"
            >
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </div>

            {/* Claim text */}
            <p
              className="text-sm font-medium text-gray-800 mb-2"
              itemProp="text"
            >
              {stat.claim.replace(/^\d+%\s*/, '').replace(/^[^a-zA-Z]+/, '')}
            </p>

            {/* Context/description */}
            <p
              className="text-xs text-gray-600 leading-relaxed"
              itemProp="description"
            >
              {stat.context}
            </p>

            {/* Source and date */}
            {showSources && (stat.source || stat.date) && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500" itemProp="citation">
                  {stat.source && (
                    <span>
                      {sourceLabel}: {stat.source}
                    </span>
                  )}
                  {stat.source && stat.date && ' • '}
                  {stat.date && (
                    <time dateTime={stat.date} itemProp="datePublished">
                      {stat.date}
                    </time>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hidden structured data for AI engines */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <div itemProp="about">
          {statistics.map((stat, index) => (
            <p key={index} data-stat-value={stat.value} data-stat-category={stat.category}>
              {stat.claim}. {stat.context}. {stat.source && `Source: ${stat.source}.`}{' '}
              {stat.date && `Year: ${stat.date}.`}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Inline Statistic Component
 * For embedding statistics within content paragraphs
 */
export function InlineStat({ value, label }: { value: string | number; label: string }) {
  return (
    <span
      className="inline-flex items-baseline gap-1 font-semibold text-blue-600"
      itemScope
      itemType="https://schema.org/QuantitativeValue"
    >
      <span itemProp="value" className="text-lg">
        {value}
      </span>
      <span itemProp="name" className="text-sm">
        {label}
      </span>
    </span>
  );
}
