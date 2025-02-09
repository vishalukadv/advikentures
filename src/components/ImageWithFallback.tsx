import React from 'react';
import { cn } from '../utils/cn';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className,
  width,
  height 
}) => {
  const optimizedSrc = `${src}?auto=format,compress&w=${width || 800}&q=75`;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn('w-full h-full object-cover')}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.src = '/fallback.jpg';
        }}
      />
    </div>
  );
};

export default ImageWithFallback;