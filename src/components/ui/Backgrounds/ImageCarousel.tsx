'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  const themeRef = useRef(theme);
  const systemThemeRef = useRef(systemTheme);
  const imagesByThemeRef = useRef(imagesByTheme);
  const imagesRef = useRef(images);
  
  useEffect(() => {
    themeRef.current = theme;
    systemThemeRef.current = systemTheme;
    imagesByThemeRef.current = imagesByTheme;
    imagesRef.current = images;
  }, [theme, systemTheme, imagesByTheme, images]);

  useEffect(() => {
    if (currentImages.length === 0) {
      const initialImages = getThemeBasedImages();
      if (initialImages.length > 0) {
        setCurrentImages(initialImages);
      }
    }
  }, [getThemeBasedImages, currentImages.length]);

  useEffect(() => {
    if (currentImages.length > 0) {
      const toLoad = new Set<number>();
      for (let i = -2; i <= 2; i++) {
        const index = (currentImageIndex + i + currentImages.length) % currentImages.length;
        toLoad.add(index);
      }
      setLoadedImages(prev => new Set([...prev, ...toLoad]));
    }
  }, [currentImageIndex, currentImages]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTheme = themeRef.current === 'system' ? systemThemeRef.current : themeRef.current;
      const isDark = currentTheme === 'dark';
      let availableImages: string[] = [];
      
      if (imagesByThemeRef.current && imagesByThemeRef.current.dark && imagesByThemeRef.current.light) {
        availableImages = isDark ? imagesByThemeRef.current.dark : imagesByThemeRef.current.light;
      } else if (imagesRef.current) {
        availableImages = imagesRef.current;
      }
      
      if (availableImages.length <= 1) return;

      setCurrentImageIndex((prevIndex) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * availableImages.length);
        } while (nextIndex === prevIndex && availableImages.length > 1);
        
        setCurrentImages(currentImgs => {
          if (JSON.stringify(currentImgs) !== JSON.stringify(availableImages)) {
            return availableImages;
          }
          return currentImgs;
        });
        
        return nextIndex;
      });
      
      const toLoad = new Set<number>();
      const newIndex = Math.floor(Math.random() * availableImages.length);
      for (let i = -2; i <= 2; i++) {
        const index = (newIndex + i + availableImages.length) % availableImages.length;
        toLoad.add(index);
      }
      setLoadedImages(prev => new Set([...prev, ...toLoad]));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

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