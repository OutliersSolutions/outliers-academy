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
    <span className="inline-block min-w-[200px] min-h-[2.5em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-heading font-bold">
       
    </span>
  )
});

export function AnimatedTextWrapper(props: AnimatedTextWrapperProps) {
  return (
    <span className="inline-block min-w-[200px] min-h-[1.5em] align-baseline">
      <AnimatedText {...props} />
    </span>
  );
}