'use client';

interface GlitchTextProps {
  children: string;
  className?: string;
}

export const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
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