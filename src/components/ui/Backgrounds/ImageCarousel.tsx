'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface ImageCarouselProps {
  images?: string[];
  imagesByTheme?: {
    light: string[];
    dark: string[];
  };
  interval?: number;
  className?: string;
}

export default function ImageCarousel({ 
  images, 
  imagesByTheme,
  interval = 6000, 
  className = '' 
}: ImageCarouselProps) {
  const { theme, systemTheme } = useTheme();
  
  // Smart theme-based image selection
  const getThemeBasedImages = useCallback(() => {
    if (imagesByTheme && imagesByTheme.dark && imagesByTheme.light) {
      const currentTheme = theme === 'system' ? systemTheme : theme;
      const isDark = currentTheme === 'dark';
      return isDark ? imagesByTheme.dark : imagesByTheme.light;
    }
    return images || [];
  }, [theme, systemTheme, imagesByTheme, images]);

  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  // Smart random index selection
  const getRandomIndex = useCallback((arrayLength: number, excludeIndex?: number) => {
    if (arrayLength <= 1) return 0;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * arrayLength);
    } while (randomIndex === excludeIndex && arrayLength > 1);
    return randomIndex;
  }, []);

  // Preload images around current index for smooth transitions
  const preloadImages = useCallback((centerIndex: number, imagesArray: string[]) => {
    const toLoad = new Set<number>();
    
    // Load current, next 2, and previous 2 images
    for (let i = -2; i <= 2; i++) {
      const index = (centerIndex + i + imagesArray.length) % imagesArray.length;
      toLoad.add(index);
    }
    
    setLoadedImages(prev => new Set([...prev, ...toLoad]));
  }, []);

  // Update image pool when theme changes (but keep current image)
  useEffect(() => {
    const newImages = getThemeBasedImages();
    if (newImages.length > 0 && JSON.stringify(newImages) !== JSON.stringify(currentImages)) {
      // Just update the pool, don't change current image
      setCurrentImages(newImages);
      // Keep current index if possible, otherwise reset
      if (currentImageIndex >= newImages.length) {
        setCurrentImageIndex(0);
      }
      // Preload around current position with new image set
      if (currentImageIndex < newImages.length) {
        preloadImages(currentImageIndex, newImages);
      }
    }
  }, [getThemeBasedImages, currentImages, currentImageIndex, preloadImages]);

  // Initial load when component mounts
  useEffect(() => {
    if (currentImages.length === 0) {
      const initialImages = getThemeBasedImages();
      if (initialImages.length > 0) {
        setCurrentImages(initialImages);
      }
    }
  }, [getThemeBasedImages, currentImages.length]);

  // Preload initial images
  useEffect(() => {
    if (currentImages.length > 0) {
      preloadImages(currentImageIndex, currentImages);
    }
  }, [currentImageIndex, preloadImages, currentImages]);

  useEffect(() => {
    if (currentImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Random selection instead of sequential
        const nextIndex = getRandomIndex(currentImages.length, prevIndex);
        // Preload images around next position
        preloadImages(nextIndex, currentImages);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentImages.length, interval, preloadImages, currentImages, getRandomIndex]);

  if (currentImages.length === 0) return null;

  return (
    <div 
      className={`relative overflow-hidden animate-fade-in ${className}`}
      style={{
        animation: 'fadeInCarousel 1.5s ease-out forwards',
        opacity: 0
      }}
    >
      {currentImages.map((image, index) => {
        // Only render images that should be loaded
        const shouldLoad = loadedImages.has(index);
        
        return (
          <div
            key={image}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
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