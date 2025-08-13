"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Lightbulb, Target, Zap, Rocket } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showMotivationalMessages?: boolean;
}

const LoaderIcon = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="relative">
      {/* Outer rotating ring */}
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-4 border-primary/20 border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner pulsing dot */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 1.2, opacity: 0.4 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className={`bg-primary rounded-full ${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'}`} />
      </motion.div>
    </div>
  );
};

const MotivationalMessage = () => {
  const t = useTranslations('loader');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [BookOpen, Code, Lightbulb, Target, Zap, Rocket];
  const IconComponent = icons[currentIcon];

  // Get motivational messages from translations
  const messages = [
    t('messages.learning'),
    t('messages.building'),
    t('messages.growing'),
    t('messages.creating'),
    t('messages.innovating'),
    t('messages.transforming')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <IconComponent className="h-5 w-5 text-primary" />
        </motion.div>
        <span className="text-muted-foreground font-medium">
          {messages[currentMessageIndex]}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export function Loader({ 
  message, 
  fullScreen = false, 
  size = 'md', 
  showMotivationalMessages = true 
}: LoaderProps) {
  const t = useTranslations('loader');

  const content = (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Main loader */}
      <div className="flex flex-col items-center space-y-4">
        <LoaderIcon size={size} />
        
        {/* Loading text */}
        <div className="text-center space-y-2">
          {message ? (
            <p className="text-lg font-medium text-foreground">{message}</p>
          ) : (
            <p className="text-lg font-medium text-foreground">{t('defaultMessage')}</p>
          )}
          
          {/* Animated dots */}
          <div className="flex items-center justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Motivational messages */}
      {showMotivationalMessages && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-sm"
        >
          <MotivationalMessage />
        </motion.div>
      )}

      {/* Academy branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 text-xs text-muted-foreground"
      >
        <img src="/icons/logo.png" alt="Outliers Academy" className="w-4 h-4" />
        <span>Outliers Academy</span>
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    </div>
  );
}

// Compact loader for inline use
export function LoaderInline({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <div className="flex items-center gap-2">
      <LoaderIcon size={size} />
    </div>
  );
}

// Page loader wrapper
export function PageLoader({ children, isLoading, message }: { 
  children: React.ReactNode; 
  isLoading: boolean; 
  message?: string; 
}) {
  if (isLoading) {
    return <Loader message={message} fullScreen />;
  }

  return <>{children}</>;
}