'use client';

import { useState, useEffect, useMemo } from 'react';

interface AnimatedTextProps {
  words: string[];
  baseText: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  effect?: 'typing' | 'glitch' | 'fade' | 'slide';
}

export function AnimatedText({ 
  words, 
  baseText, 
  className = '', 
  typingSpeed = 120,
  deletingSpeed = 80,
  pauseDuration = 2500,
  effect = 'typing'
}: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Memoize words array to prevent recreation on every render  
  const stableWords = useMemo(() => words, [words]);

  // Initialize with first word once mounted
  useEffect(() => {
    setMounted(true);
    if (stableWords.length > 0) {
      setCurrentText(stableWords[0]);
    }
    // Note: Currently only 'typing' effect is implemented
    console.debug('AnimatedText effect:', effect);
  }, [stableWords, effect]);

  useEffect(() => {
    if (!mounted || stableWords.length === 0) return;
    
    const currentWord = stableWords[currentWordIndex];
    if (!currentWord) return;
    
    let timeout: NodeJS.Timeout;
    
    if (isTyping && !isDeleting) {
      // Typing forward
      if (currentText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed + Math.random() * 50);
      } else {
        // Finished typing, pause then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setIsTyping(false);
        }, pauseDuration);
      }
    } else if (isDeleting && !isTyping) {
      // Deleting backward
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentWordIndex((prev) => (prev + 1) % stableWords.length);
        }, 100);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [mounted, currentText, currentWordIndex, isDeleting, isTyping, stableWords, typingSpeed, deletingSpeed, pauseDuration]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Safe guard against empty words array
  if (!stableWords || stableWords.length === 0) {
    return (
      <span className={`inline-block ${className}`}>
        {baseText}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold">
          skills
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-block ${className}`}>
      {baseText}
      <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold">
        {currentText || stableWords[0] || 'skills'}
      </span>
      {mounted && (
        <span 
          className={`inline-block w-0.5 sm:w-1 h-[1em] ml-0.5 sm:ml-1 bg-indigo-600 transition-opacity duration-100 align-middle ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </span>
  );
}