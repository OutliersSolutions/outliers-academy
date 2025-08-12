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

    // Draw dot grid
    const drawDotGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dotSize = 2;
      const spacing = 32;
      const dotColor = '#ff5a1f'; // Orange color
      
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
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 text-orange-400 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="font-mono">TECH STACK</span>
          </div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-orange-400 to-red-500 bg-clip-text text-transparent">
              {t('technologies.title')}
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('technologies.subhead')}
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
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-orange-500/20">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/5 to-red-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-10 h-10 object-contain filter group-hover:brightness-110 group-hover:contrast-125 transition-all duration-500"
                    />
                  </div>
                  
                  {/* Technology Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                      {tech.name}
                    </h3>
                    
                    {/* Level Badge */}
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono border ${getLevelColor(tech.level)}`}>
                      {getLevelText(tech.level)}
                    </div>
                    
                    {/* Animated Underline */}
                    <div className="w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-2 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
                
                {/* Hover Particles */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-orange-500 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-400 mb-6 text-lg font-mono">
            {locale === 'es' ? '¿Buscas algo más específico?' : 'Looking for something specific?'}
          </p>
          <Link 
            href={`/${locale}/catalog` as Route} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
          >
            {locale === 'es' ? 'Explorar catálogo completo' : 'Explore full catalog'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
    </section>
  );
}