'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
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
  locale: localeProps, 
  title, 
  description, 
  primaryButton, 
  secondaryButton, 
  primaryLink, 
  secondaryLink 
}: CTASectionProps) {
  const locale = useLocale();
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-surface via-bg to-surface dark:from-surface dark:via-bg dark:to-surface overflow-hidden">
      {/* Canvas Background with Dots */}
      <CanvasDots id="ctaCanvas" margin={40} />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 text-primary dark:text-primary px-4 py-2 rounded-full text-sm font-mono font-medium mb-8">
          <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-pulse"></div>
          TRANSFORM
        </div>
        
        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <img
            src="/icons/logo.png"
            alt="Outliers Academy"
            className="w-16 h-16 object-contain"
          />
          <span className="font-heading font-extrabold text-2xl sm:text-3xl">
            <span className="text-solarized-base01 dark:text-white">
              Outliers
            </span>{" "}
            <span style={{ color: "var(--color-primary)" }}>Academy</span>
          </span>
        </div>
        
        {/* Title with Glitch Effect */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
          <span className="text-solarized-base01 dark:text-white">
            {title.includes('transformar') ? (
              title.split('transformar').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <GlitchText className="text-primary dark:text-primary">
                      transformar
                    </GlitchText>
                  )}
                </span>
              ))
            ) : title.includes('transform') ? (
              title.split('transform').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <GlitchText className="text-primary dark:text-primary">
                      transform
                    </GlitchText>
                  )}
                </span>
              ))
            ) : (
              title
            )}
          </span>
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-solarized-base01 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans font-medium mb-10">
          {description}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={`/${locale}/signup`} 
            className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-heading font-semibold hover:brightness-110 hover:scale-105 transition-all duration-200 text-lg hover:shadow-lg"
          >
            {locale === 'es' ? 'Registrarse — es gratis' : 'Sign up — it\'s free'}
          </Link>
          <Link 
            href={`/${locale}/catalog`}
            className="text-primary dark:text-primary hover:text-accent dark:hover:text-accent transition-colors duration-200 font-sans font-medium underline underline-offset-4"
          >
            {locale === 'es' ? 'Explorar catálogo' : 'Explore catalog'}
          </Link>
        </div>
      </div>
    </section>
  );
} 