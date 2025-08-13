'use client';

import { GlitchText } from '@/components/ui/GlitchText';
import { CanvasDots } from '@/components/ui/CanvasDots';

interface LearningSectionProps {
  badge: string;
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    hoverColor: string;
  }>;
}

export function LearningSection({ 
  badge, 
  title, 
  description, 
  features 
}: LearningSectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-surface via-bg to-surface dark:from-surface dark:via-bg dark:to-surface overflow-hidden">
      {/* Canvas Background with Dots */}
      <CanvasDots id="learningCanvas" margin={40} />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gold rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-primary rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-gold/20 backdrop-blur-sm border border-accent/30 text-accent dark:text-accent px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-accent dark:bg-accent rounded-full animate-pulse"></div>
            <span className="font-mono">{badge}</span>
          </div>
          
          {/* Title with Glitch Effect */}
          <h2 className="text-4xl md:text-6xl font-bold text-text dark:text-text mb-6 leading-tight">
            <span className="bg-gradient-to-r from-text via-accent to-gold bg-clip-text text-transparent">
              {title.split('haciendo').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <GlitchText className="text-accent dark:text-accent">
                      haciendo
                    </GlitchText>
                  )}
                </span>
              ))}
            </span>
          </h2>
          
          <p className="text-lg text-solarized-base01 dark:text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className={`relative bg-gradient-to-br from-surface/80 to-bg/80 backdrop-blur-sm border border-muted/50 rounded-2xl p-8 h-full hover:border-${feature.hoverColor}/50 dark:hover:border-${feature.hoverColor}/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-${feature.hoverColor}/20 dark:group-hover:shadow-${feature.hoverColor}/20`}>
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.hoverColor}/0 via-${feature.hoverColor}/5 to-${feature.hoverColor === 'primary' ? 'accent' : feature.hoverColor === 'accent' ? 'gold' : 'primary'}/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-4 text-text dark:text-text group-hover:text-${feature.hoverColor} dark:group-hover:text-${feature.hoverColor} transition-colors duration-300`}>{feature.title}</h3>
                  <p className="text-solarized-base01 dark:text-white/80 font-medium">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 