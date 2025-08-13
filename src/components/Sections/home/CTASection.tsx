'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { GlitchText } from '@/components/ui/GlitchText';
import type { Route } from 'next';

interface CTASectionProps {
  locale: string;
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
  primaryLink: string;
  secondaryLink: string;
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
      const dotColor = '#CE965E'; // Gold brand color
      
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

export function CTASection({ 
  locale, 
  title, 
  description, 
  primaryButton, 
  secondaryButton, 
  primaryLink, 
  secondaryLink 
}: CTASectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-surface via-bg to-surface dark:from-surface dark:via-bg dark:to-surface overflow-hidden">
      {/* Canvas Background with Dots */}
      <CanvasDots id="ctaCanvas" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="bg-gradient-to-r from-primary via-accent to-gold rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          {/* Clean Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full"></div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-accent/70 to-gold/70"></div>
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-mono">TRANSFORM</span>
            </div>
            
            {/* Title with Glitch Effect */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                ¿Listo para{' '}
                <GlitchText className="text-white">
                  transformar
                </GlitchText>
                {' '}
                <span className="text-white drop-shadow-lg">tu carrera?</span>
              </span>
            </h2>
            
            <p className="text-xl mb-8 text-white font-medium max-w-2xl mx-auto">{description}</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href={primaryLink as Route} 
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/25"
              >
                {primaryButton}
              </Link>
              <Link 
                href={secondaryLink as Route} 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105"
              >
                {secondaryButton}
              </Link>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
        </div>
      </div>
    </section>
  );
} 