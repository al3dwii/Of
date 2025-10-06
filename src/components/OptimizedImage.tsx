// src/components/OptimizedImage.tsx
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
}

/**
 * OptimizedImage Component
 * 
 * Wrapper around next/image with optimized defaults for performance.
 * Automatically handles lazy loading, WebP conversion, and responsive sizing.
 * 
 * @param src - Image source (local or remote)
 * @param alt - Alt text for accessibility (required)
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @param className - Additional CSS classes
 * @param priority - Load image with priority (for above-the-fold images)
 * @param quality - Image quality (1-100, default 85)
 * @param sizes - Responsive sizes for different viewports
 * @param fill - Use fill mode (object-fit)
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  fill = false,
}: OptimizedImageProps) {
  // Default sizes for responsive images
  const defaultSizes = sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        quality={quality}
        sizes={defaultSizes}
        style={{ objectFit: 'cover' }}
      />
    );
  }

  if (!width || !height) {
    console.warn(`OptimizedImage: width and height are required for ${src}. Using fill mode instead.`);
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={defaultSizes}
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes={defaultSizes}
      loading={priority ? undefined : 'lazy'}
    />
  );
}

/**
 * Usage Examples:
 * 
 * 1. Basic usage with fixed dimensions:
 *    <OptimizedImage src="/logo.png" alt="Logo" width={200} height={100} />
 * 
 * 2. Hero image with priority loading:
 *    <OptimizedImage 
 *      src="/hero.jpg" 
 *      alt="Hero" 
 *      width={1200} 
 *      height={600} 
 *      priority 
 *    />
 * 
 * 3. Responsive image with custom sizes:
 *    <OptimizedImage 
 *      src="/banner.jpg" 
 *      alt="Banner" 
 *      width={1200} 
 *      height={400}
 *      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
 *    />
 * 
 * 4. Fill mode (responsive container):
 *    <div className="relative w-full h-[400px]">
 *      <OptimizedImage src="/cover.jpg" alt="Cover" fill />
 *    </div>
 * 
 * 5. Lower quality for thumbnails:
 *    <OptimizedImage 
 *      src="/thumb.jpg" 
 *      alt="Thumbnail" 
 *      width={150} 
 *      height={150} 
 *      quality={75}
 *    />
 */
