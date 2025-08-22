'use client';

import { useState, useEffect } from 'react';
import { AnimatedText } from './AnimatedText';

interface AnimatedTextWrapperProps {
  words: string[];
  baseText: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  effect?: 'typing' | 'glitch' | 'fade' | 'slide';
}

export function AnimatedTextWrapper(props: AnimatedTextWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Provide fallback words if empty or undefined
  const words = props.words && props.words.length > 0 ? props.words : ['skills', 'potential', 'future', 'career'];
  
  // Always render the component, but with a fallback for SSR
  return (
    <span className="inline-block min-w-[200px] min-h-[1.5em] align-baseline">
      {isClient ? (
        <AnimatedText {...props} words={words} />
      ) : (
        // SSR fallback - show the first word statically
        <span className={`inline-block ${props.className}`}>
          {props.baseText}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold">
            {words[0]}
          </span>
          <span className="inline-block w-0.5 sm:w-1 h-[1em] ml-0.5 sm:ml-1 bg-indigo-600 align-middle opacity-100" />
        </span>
      )}
    </span>
  );
}