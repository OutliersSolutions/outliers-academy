'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { GlitchText } from '@/components/ui/GlitchText';
import { CanvasDots } from '@/components/ui/CanvasDots';
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
          {/* Empire State Building Background */}
          <div className="absolute inset-0">
            {/* Simulated building silhouette */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full">
              <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-t from-white/30 via-white/15 to-transparent"></div>
              
              {/* Building structure - multiple towers */}
              <div className="absolute right-8 bottom-0 w-12 h-full bg-gradient-to-t from-white/25 via-white/10 to-transparent"></div>
              <div className="absolute right-24 bottom-0 w-8 h-4/5 bg-gradient-to-t from-white/20 via-white/8 to-transparent"></div>
              <div className="absolute right-36 bottom-0 w-6 h-3/4 bg-gradient-to-t from-white/15 via-white/6 to-transparent"></div>
              <div className="absolute right-48 bottom-0 w-4 h-2/3 bg-gradient-to-t from-white/10 via-white/4 to-transparent"></div>
              
              {/* Windows - vertical lines */}
              <div className="absolute right-10 bottom-20 w-1 h-32 bg-gradient-to-t from-white/40 to-transparent"></div>
              <div className="absolute right-14 bottom-20 w-1 h-32 bg-gradient-to-t from-white/35 to-transparent"></div>
              <div className="absolute right-18 bottom-20 w-1 h-32 bg-gradient-to-t from-white/30 to-transparent"></div>
              
              <div className="absolute right-26 bottom-32 w-1 h-24 bg-gradient-to-t from-white/35 to-transparent"></div>
              <div className="absolute right-30 bottom-32 w-1 h-24 bg-gradient-to-t from-white/30 to-transparent"></div>
              <div className="absolute right-34 bottom-32 w-1 h-24 bg-gradient-to-t from-white/25 to-transparent"></div>
              
              <div className="absolute right-38 bottom-40 w-1 h-16 bg-gradient-to-t from-white/30 to-transparent"></div>
              <div className="absolute right-42 bottom-40 w-1 h-16 bg-gradient-to-t from-white/25 to-transparent"></div>
            </div>
            
            {/* City lights at base */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/20 via-white/10 to-transparent"></div>
            
            {/* Skyline effect */}
            <div className="absolute bottom-0 left-0 w-full h-8">
              <div className="absolute bottom-0 left-0 w-20 h-6 bg-gradient-to-t from-white/15 to-transparent"></div>
              <div className="absolute bottom-0 left-32 w-16 h-4 bg-gradient-to-t from-white/12 to-transparent"></div>
              <div className="absolute bottom-0 left-56 w-24 h-5 bg-gradient-to-t from-white/10 to-transparent"></div>
              <div className="absolute bottom-0 left-88 w-12 h-3 bg-gradient-to-t from-white/8 to-transparent"></div>
            </div>
          </div>
          
          {/* Fallback Background Pattern */}
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