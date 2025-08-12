'use client';

import dynamic from 'next/dynamic';

interface AnimatedTextWrapperProps {
  words: string[];
  baseText: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  effect?: 'typing' | 'glitch' | 'fade' | 'slide';
}

const AnimatedText = dynamic(() => import('./AnimatedText').then(mod => ({ default: mod.AnimatedText })), {
  ssr: false,
  loading: () => (
    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent opacity-50">
      Desarrolla tu potencial
    </span>
  )
});

export function AnimatedTextWrapper(props: AnimatedTextWrapperProps) {
  return (
    <span className="inline-block">
      <AnimatedText {...props} />
    </span>
  );
}