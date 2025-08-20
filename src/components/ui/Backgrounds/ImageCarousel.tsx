'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
}

export default function ImageCarousel({ 
  images, 
  interval = 6000, 
  className = '' 
}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])); // Load first image immediately

  // Preload images around current index for smooth transitions
  const preloadImages = useCallback((centerIndex: number) => {
    const toLoad = new Set<number>();
    
    // Load current, next 2, and previous 2 images
    for (let i = -2; i <= 2; i++) {
      const index = (centerIndex + i + images.length) % images.length;
      toLoad.add(index);
    }
    
    setLoadedImages(prev => new Set([...prev, ...toLoad]));
  }, [images.length]);

  // Preload initial images
  useEffect(() => {
    preloadImages(currentImageIndex);
  }, [currentImageIndex, preloadImages]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        // Preload images around next position
        preloadImages(nextIndex);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, preloadImages]);

  if (images.length === 0) return null;

  return (
    <div 
      className={`relative overflow-hidden animate-fade-in ${className}`}
      style={{
        animation: 'fadeInCarousel 1.5s ease-out forwards',
        opacity: 0
      }}
    >
      {images.map((image, index) => {
        // Only render images that should be loaded
        const shouldLoad = loadedImages.has(index);
        
        return (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,1) 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,1) 40%)'
            }}
          >
            {shouldLoad && (
              <Image
                src={image}
                alt=""
                fill
                className="object-cover object-center"
                priority={index === 0}
                quality={85}
                sizes="50vw"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            )}
          </div>
        );
      })}
      
      <style jsx global>{`
        @keyframes fadeInCarousel {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}