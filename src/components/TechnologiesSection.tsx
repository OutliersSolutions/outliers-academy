'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Route } from 'next';

interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud';
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface TechnologiesSectionProps {
  locale: string;
}

const technologies: Technology[] = [
  // Frontend
  { name: 'React', icon: '/icons/technologies/systems/reactjs.svg', category: 'frontend', level: 'intermediate' },
  { name: 'Vue.js', icon: '/icons/technologies/systems/vue.svg', category: 'frontend', level: 'intermediate' },
  { name: 'Angular', icon: '/icons/technologies/systems/angular.svg', category: 'frontend', level: 'advanced' },
  { name: 'JavaScript', icon: '/icons/technologies/systems/js.svg', category: 'frontend', level: 'beginner' },
  { name: 'HTML5', icon: '/icons/technologies/systems/html.svg', category: 'frontend', level: 'beginner' },
  { name: 'CSS3', icon: '/icons/technologies/systems/css.svg', category: 'frontend', level: 'beginner' },
  { name: 'Tailwind', icon: '/icons/technologies/systems/tailwind.svg', category: 'frontend', level: 'intermediate' },
  
  // Backend
  { name: 'Node.js', icon: '/icons/technologies/systems/nodejs.svg', category: 'backend', level: 'intermediate' },
  { name: 'Python', icon: '/icons/technologies/systems/python.svg', category: 'backend', level: 'beginner' },
  { name: 'Java', icon: '/icons/technologies/systems/java.svg', category: 'backend', level: 'intermediate' },
  { name: 'PHP', icon: '/icons/technologies/systems/php.svg', category: 'backend', level: 'intermediate' },
  { name: 'Laravel', icon: '/icons/technologies/systems/laravel.svg', category: 'backend', level: 'advanced' },
  
  // Database
  { name: 'MongoDB', icon: '/icons/technologies/systems/mongodb.svg', category: 'database', level: 'intermediate' },
  { name: 'PostgreSQL', icon: '/icons/technologies/systems/postgresql.svg', category: 'database', level: 'intermediate' },
  
  // Tools
  { name: 'Git', icon: '/icons/technologies/systems/git.svg', category: 'tools', level: 'beginner' },
  { name: 'Vercel', icon: '/icons/technologies/systems/vercel.svg', category: 'tools', level: 'intermediate' },
];

// Glitch Text Component
const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10 text-primary dark:text-primary">
        {children}
      </span>
      
      {/* Glitch layers */}
      <span 
        className="absolute inset-0 text-accent dark:text-accent animate-glitch-1"
        style={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          transform: 'translate(-2px, -2px)'
        }}
      >
        {children}
      </span>
      
      <span 
        className="absolute inset-0 text-gold dark:text-gold animate-glitch-2"
        style={{ 
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          transform: 'translate(2px, 2px)'
        }}
      >
        {children}
      </span>
      
      <span 
        className="absolute inset-0 text-secondary dark:text-secondary animate-glitch-3"
        style={{ 
          clipPath: 'polygon(0 30%, 100% 30%, 100% 70%, 0 70%)',
          transform: 'translate(-1px, 1px)'
        }}
      >
        {children}
      </span>
    </div>
  );
};

export function TechnologiesSection({ locale }: TechnologiesSectionProps) {
  const t = useTranslations('home');
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

  const getLevelColor = (level: Technology['level']) => {
    switch (level) {
      case 'beginner':
        return 'bg-primary/20 text-primary border-primary/30 dark:bg-primary/20 dark:text-primary dark:border-primary/30';
      case 'intermediate':
        return 'bg-accent/20 text-accent border-accent/30 dark:bg-accent/20 dark:text-accent dark:border-accent/30';
      case 'advanced':
        return 'bg-gold/20 text-gold border-gold/30 dark:bg-gold/20 dark:text-gold dark:border-gold/30';
      default:
        return 'bg-muted/20 text-muted border-muted/30 dark:bg-muted/20 dark:text-muted dark:border-muted/30';
    }
  };

  const getLevelText = (level: Technology['level']) => {
    switch (level) {
      case 'beginner':
        return locale === 'es' ? 'Básico' : 'Beginner';
      case 'intermediate':
        return locale === 'es' ? 'Intermedio' : 'Intermediate';
      case 'advanced':
        return locale === 'es' ? 'Avanzado' : 'Advanced';
      default:
        return level;
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-surface via-bg to-surface dark:from-surface dark:via-bg dark:to-surface overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Content Container */}
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 text-primary dark:text-primary px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-pulse"></div>
            <span className="font-mono">TECH STACK</span>
          </div>
          
          {/* Title with Glitch Effect */}
          <h2 className="text-4xl md:text-6xl font-bold text-text dark:text-text mb-6 leading-tight">
            <span className="bg-gradient-to-r from-text via-primary to-accent bg-clip-text text-transparent">
              {t('technologies.title').split('aprenderás').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <GlitchText className="text-primary dark:text-primary">
                      aprenderás
                    </GlitchText>
                  )}
                </span>
              ))}
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-white/90 dark:text-white/90 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
            Domina las tecnologías más demandadas del mercado con nuestro enfoque práctico y proyectos reales
          </p>
        </div>
        
        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto mb-16">
          {technologies.map((tech, index) => (
            <div 
              key={tech.name} 
              className="group relative"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="relative bg-gradient-to-br from-surface/80 to-bg/80 backdrop-blur-sm border border-muted/50 rounded-2xl p-6 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20 dark:group-hover:shadow-primary/20">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-gradient-to-br from-muted to-surface rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 dark:group-hover:from-primary/20 dark:group-hover:to-accent/20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-10 h-10 object-contain filter group-hover:brightness-110 group-hover:contrast-125 transition-all duration-500"
                    />
                  </div>
                  
                  {/* Technology Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-sm font-semibold text-text dark:text-text group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                      {tech.name}
                    </h3>
                    
                    {/* Level Badge */}
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono border ${getLevelColor(tech.level)}`}>
                      {getLevelText(tech.level)}
                    </div>
                    
                    {/* Animated Underline */}
                    <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
                
                {/* Hover Particles */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-primary dark:bg-primary rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-accent dark:bg-accent rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted dark:text-muted mb-6 text-lg font-mono">
            {locale === 'es' ? '¿Buscas algo más específico?' : 'Looking for something specific?'}
          </p>
          <Link 
            href={`/${locale}/catalog` as Route} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white dark:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/25"
          >
            {locale === 'es' ? 'Explorar catálogo completo' : 'Explore full catalog'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 dark:bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 dark:bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold/10 dark:bg-gold/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
    </section>
  );
}