import Image, { ImageProps } from 'next/image';

/**
 * Optimized Image Component with SEO best practices
 * - Enforces alt text (required for accessibility and SEO)
 * - Automatic lazy loading
 * - Blur placeholder for better perceived performance
 * - Responsive by default
 * 
 * @example
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="AI-powered document conversion"
 *   width={800}
 *   height={600}
 *   priority={false} // true for above-the-fold images
 * />
 */

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Make alt required (cannot be omitted)
  priority?: boolean;
}

export default function OptimizedImage({
  alt,
  priority = false,
  quality = 85,
  loading,
  placeholder = 'blur',
  blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  ...props
}: OptimizedImageProps) {
  // Validate alt text
  if (!alt || alt.trim() === '') {
    console.warn('OptimizedImage: Empty alt text detected. This is bad for SEO and accessibility.');
  }

  return (
    <Image
      {...props}
      alt={alt}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : (loading || 'lazy')}
      placeholder={typeof props.src === 'string' && props.src.startsWith('http') ? undefined : placeholder}
      blurDataURL={typeof props.src === 'string' && props.src.startsWith('http') ? undefined : blurDataURL}
    />
  );
}
