'use client';

import { useState, useEffect } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
}

export const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay the glitch effect to after initial render for better LCP
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text - always visible for LCP */}
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold">
        {children}
      </span>
      
      {/* Glitch layers - only render after mount */}
      {mounted && (
        <>
          <span 
            className="absolute inset-0 text-accent dark:text-accent animate-glitch-1 opacity-70"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translate(-1px, -1px)'
            }}
          >
            {children}
          </span>
          
          <span 
            className="absolute inset-0 text-gold dark:text-gold animate-glitch-2 opacity-70"
            style={{ 
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translate(1px, 1px)'
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}; 