'use client';

import { useState, useEffect } from 'react';

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
  const [currentText, setCurrentText] = useState(words[0] || ''); // Start with first word for SSR
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Only animate after mounted to prevent hydration issues
    
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isTyping && !isDeleting) {
        // Typing forward
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            setIsDeleting(true);
            setIsTyping(false);
          }, pauseDuration);
        }
      } else if (isDeleting && !isTyping) {
        // Deleting backward
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isTyping ? typingSpeed + Math.random() * 50 : deletingSpeed);

    return () => clearTimeout(timeout);
  }, [mounted, currentText, currentWordIndex, isDeleting, isTyping, words, typingSpeed, deletingSpeed, pauseDuration]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Simplified render without inline styles
  const renderText = () => {
    const cursorElement = mounted ? (
      <span 
        className={`inline-block w-0.5 sm:w-1 h-[1em] ml-0.5 sm:ml-1 bg-indigo-600 transition-opacity duration-100 align-middle ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    ) : null;

    // Simplified version without complex animations for better LCP
    return (
      <span className={`inline-block ${className}`}>
        {baseText}
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold">
          {currentText}
        </span>
        {cursorElement}
      </span>
    );
  };

  return renderText();
}