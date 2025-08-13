'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { GlitchText } from '@/components/ui/GlitchText';
import { CourseGridClient } from '@/components/CourseGridClient';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import type { Route } from 'next';

interface FeaturedCoursesSectionProps {
  locale: string;
  badge: string;
  title: string;
  description: string;
  viewAllText: string;
  viewAllLink: string;
}

// Canvas Dots Component
const CanvasDots = ({ id }: { id: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw dot grid with brand colors
    const drawDotGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dotSize = 2;
      const spacing = 32;
      const dotColor = '#2F27CE'; // Primary brand color
      
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.15; // Subtle opacity
      
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    };

    drawDotGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export function FeaturedCoursesSection({ 
  locale, 
  badge, 
  title, 
  description, 
  viewAllText, 
  viewAllLink 
}: FeaturedCoursesSectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-surface via-bg to-surface dark:from-surface dark:via-bg dark:to-surface overflow-hidden">
      {/* Canvas Background with Dots */}
      <CanvasDots id="featuredCoursesCanvas" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 text-primary dark:text-primary px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-pulse"></div>
            <span className="font-mono">{badge}</span>
          </div>
          
          {/* Title with Glitch Effect */}
          <h2 className="text-4xl md:text-6xl font-bold text-text dark:text-text mb-6 leading-tight">
            <span className="bg-gradient-to-r from-text via-primary to-accent bg-clip-text text-transparent">
              {title.split('destacados').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <GlitchText className="text-primary dark:text-primary">
                      destacados
                    </GlitchText>
                  )}
                </span>
              ))}
            </span>
          </h2>
          
          <p className="text-lg text-white/90 dark:text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">{description}</p>
        </div>
        
        <CourseGridClient />
        
        <div className="text-center mt-12">
          <Link href={viewAllLink as Route} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white dark:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/25">
            {viewAllText}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
} 