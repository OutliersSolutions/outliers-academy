'use client';

import { AnimatedText } from './AnimatedText';
import { useState } from 'react';

interface AnimatedTextShowcaseProps {
  baseText: string;
  words: string[];
}

export function AnimatedTextShowcase({ baseText, words }: AnimatedTextShowcaseProps) {
  const [currentEffect, setCurrentEffect] = useState<'typing' | 'glitch' | 'fade' | 'slide'>('typing');

  const effects = [
    { name: 'Typing', value: 'typing' as const },
    { name: 'Glitch', value: 'glitch' as const },
    { name: 'Fade', value: 'fade' as const },
    { name: 'Slide', value: 'slide' as const }
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <AnimatedText 
          baseText={baseText}
          words={words}
          effect={currentEffect}
          typingSpeed={120}
          deletingSpeed={80}
          pauseDuration={2500}
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
        />
      </div>
      
      {/* Effect Selector - Hidden by default, can be shown for demo */}
      <div className="hidden group-hover:flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {effects.map((effect) => (
          <button
            key={effect.value}
            onClick={() => setCurrentEffect(effect.value)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              currentEffect === effect.value
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-primary/30 hover:border-primary'
            }`}
          >
            {effect.name}
          </button>
        ))}
      </div>
    </div>
  );
}