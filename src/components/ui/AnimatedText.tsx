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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
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
  }, [currentText, currentWordIndex, isDeleting, isTyping, words, typingSpeed, deletingSpeed, pauseDuration]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const renderText = () => {
    const cursorElement = (
      <span 
        className={`inline-block w-0.5 sm:w-1 h-[1em] ml-0.5 sm:ml-1 bg-accent transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ verticalAlign: 'middle' }}
      />
    );

    switch (effect) {
      case 'glitch':
        return (
          <span className={`inline-block ${className}`}>
            <span className="relative">
              {baseText}
              <span 
                className={`relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary transition-all duration-200 ${
                  isTyping && !isDeleting ? 'animate-pulse' : ''
                }`}
                style={{
                  backgroundSize: '200% 100%',
                  animation: isTyping && !isDeleting ? 'glitch 0.6s infinite, gradientShift 3s infinite' : 'gradientShift 3s infinite'
                }}
              >
                {currentText}
              </span>
              {cursorElement}
            </span>
          </span>
        );
      
      case 'fade':
        return (
          <span className={`inline-block ${className}`}>
            {baseText}
            <span 
              className={`relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent transition-all duration-500 ${
                isTyping && !isDeleting ? 'scale-105' : 'scale-100'
              }`}
              style={{
                opacity: isDeleting ? 0.4 : 1,
                filter: isTyping && !isDeleting ? 'brightness(1.2)' : 'brightness(1)'
              }}
            >
              {currentText}
            </span>
            {cursorElement}
          </span>
        );

      case 'slide':
        return (
          <span className={`inline-block ${className} overflow-hidden`}>
            {baseText}
            <span 
              className={`relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent transition-transform duration-300 ${
                isDeleting ? 'translate-y-1' : 'translate-y-0'
              }`}
              style={{
                transform: isTyping && !isDeleting ? 'translateY(-1px)' : 'translateY(0)'
              }}
            >
              {currentText}
            </span>
            {cursorElement}
          </span>
        );
      
      default: // typing
        return (
          <span className={`inline-block ${className}`}>
            {baseText}
            <span 
              className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
              style={{
                backgroundSize: '200% 100%',
                animation: 'gradientShift 4s infinite'
              }}
            >
              {currentText}
            </span>
            {cursorElement}
          </span>
        );
    }
  };

  return (
    <>
      {renderText()}
      <style jsx>{`
        @keyframes glitch {
          0%, 90%, 100% {
            transform: translate3d(0, 0, 0);
            text-shadow: none;
          }
          10% {
            transform: translate3d(-2px, 0, 0);
            text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
          }
          20% {
            transform: translate3d(2px, 0, 0);
            text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
          }
          30% {
            transform: translate3d(-1px, 0, 0);
            text-shadow: 1px 0 #ff00ff, -1px 0 #00ffff;
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  );
}