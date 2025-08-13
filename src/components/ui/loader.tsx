"use client";

import { useEffect, useState, memo, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Lightbulb, Target, Zap, Rocket } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showMotivationalMessages?: boolean;
}

// Standardized size configurations
const LOADER_SIZES = {
  sm: {
    icon: 'h-8 w-8',
    dot: 'h-2 w-2',
    text: 'text-sm'
  },
  md: {
    icon: 'h-12 w-12', 
    dot: 'h-3 w-3',
    text: 'text-lg'
  },
  lg: {
    icon: 'h-16 w-16',
    dot: 'h-4 w-4', 
    text: 'text-xl'
  }
} as const;

// Animation constants
const ANIMATION_CONFIG = {
  rotation: { duration: 1, ease: "linear" as const },
  pulse: { duration: 1, scale: [0.8, 1.2] as number[], opacity: [0.8, 0.4] as number[] },
  dots: { duration: 1, scale: [1, 1.5, 1] as number[], opacity: [0.7, 1, 0.7] as number[] },
  message: { duration: 0.5, y: [-10, 0, 10] as number[] },
  messageInterval: 2000
} as const;

// Standardized container styles
const CONTAINER_STYLES = {
  fullScreen: "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm",
  inline: "flex items-center justify-center p-8",
  spacing: {
    main: "space-y-6",
    content: "space-y-4", 
    text: "space-y-2",
    dots: "space-x-1"
  }
} as const;

const LoaderIcon = memo(({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const [isMounted, setIsMounted] = useState(false);
  const sizeConfig = useMemo(() => LOADER_SIZES[size], [size]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const staticLoader = useMemo(() => (
    <div className="relative">
      <div className={`${sizeConfig.icon} rounded-full border-4 border-primary/20 border-t-primary`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`bg-primary rounded-full ${sizeConfig.dot}`} />
      </div>
    </div>
  ), [sizeConfig]);

  const animatedLoader = useMemo(() => (
    <div className="relative">
      {/* Outer rotating ring */}
      <motion.div
        className={`${sizeConfig.icon} rounded-full border-4 border-primary/20 border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: ANIMATION_CONFIG.rotation.duration, 
          repeat: Infinity, 
          ease: ANIMATION_CONFIG.rotation.ease 
        }}
      />
      
      {/* Inner pulsing dot */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ 
          scale: ANIMATION_CONFIG.pulse.scale[0], 
          opacity: ANIMATION_CONFIG.pulse.opacity[0] 
        }}
        animate={{ 
          scale: ANIMATION_CONFIG.pulse.scale[1], 
          opacity: ANIMATION_CONFIG.pulse.opacity[1] 
        }}
        transition={{ 
          duration: ANIMATION_CONFIG.pulse.duration, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      >
        <div className={`bg-primary rounded-full ${sizeConfig.dot}`} />
      </motion.div>
    </div>
  ), [sizeConfig]);

  return isMounted ? animatedLoader : staticLoader;
});

LoaderIcon.displayName = 'LoaderIcon';

const MotivationalMessage = memo(() => {
  const t = useTranslations('loader');
  const [isMounted, setIsMounted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = useMemo(() => [BookOpen, Code, Lightbulb, Target, Zap, Rocket], []);
  const IconComponent = useMemo(() => icons[currentIcon], [icons, currentIcon]);

  // Get motivational messages from translations with fallback
  const messages = useMemo(() => {
    try {
      return [
        t('messages.learning'),
        t('messages.building'),
        t('messages.growing'),
        t('messages.creating'),
        t('messages.innovating'),
        t('messages.transforming')
      ];
    } catch (error) {
      // Fallback messages if translations fail
      return [
        'Aprendiendo nuevas habilidades...',
        'Construyendo tu futuro...',
        'Creciendo profesionalmente...',
        'Creando oportunidades...',
        'Innovando contigo...',
        'Transformando vidas...'
      ];
    }
  }, [t]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, ANIMATION_CONFIG.messageInterval);

    return () => clearInterval(interval);
  }, [messages.length, icons.length, isMounted]);

  if (!isMounted) {
    // Static version for SSR
    return (
      <div className="flex items-center gap-3 text-center">
        <div className="flex-shrink-0">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <span className="text-muted-foreground font-medium">
          {messages[0]}
        </span>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: ANIMATION_CONFIG.message.y[0] }}
        animate={{ opacity: 1, y: ANIMATION_CONFIG.message.y[1] }}
        exit={{ opacity: 0, y: ANIMATION_CONFIG.message.y[2] }}
        transition={{ duration: ANIMATION_CONFIG.message.duration }}
        className="flex items-center gap-3 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: ANIMATION_CONFIG.message.duration * 0.6 }}
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
});

MotivationalMessage.displayName = 'MotivationalMessage';

const AnimatedDots = memo(() => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const staticDots = useMemo(() => (
    <div className={`flex items-center justify-center ${CONTAINER_STYLES.spacing.dots}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 bg-primary rounded-full opacity-70"
        />
      ))}
    </div>
  ), []);

  const animatedDots = useMemo(() => (
    <div className={`flex items-center justify-center ${CONTAINER_STYLES.spacing.dots}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 bg-primary rounded-full"
          animate={{
            scale: ANIMATION_CONFIG.dots.scale,
            opacity: ANIMATION_CONFIG.dots.opacity,
          }}
          transition={{
            duration: ANIMATION_CONFIG.dots.duration,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  ), []);

  return isMounted ? animatedDots : staticDots;
});

AnimatedDots.displayName = 'AnimatedDots';

export const Loader = memo(({ 
  message, 
  fullScreen = false, 
  size = 'md', 
  showMotivationalMessages = true 
}: LoaderProps) => {
  const t = useTranslations('loader');
  const [isMounted, setIsMounted] = useState(false);
  const sizeConfig = useMemo(() => LOADER_SIZES[size], [size]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const content = useMemo(() => (
    <div className={`flex flex-col items-center justify-center ${CONTAINER_STYLES.spacing.main}`}>
      {/* Main loader */}
      <div className={`flex flex-col items-center ${CONTAINER_STYLES.spacing.content}`}>
        <LoaderIcon size={size} />
        
        {/* Loading text */}
        <div className={`text-center ${CONTAINER_STYLES.spacing.text}`}>
          {message ? (
            <p className={`${sizeConfig.text} font-medium text-foreground`}>{message}</p>
          ) : (
            <p className={`${sizeConfig.text} font-medium text-foreground`}>{t('defaultMessage')}</p>
          )}
          
          {/* Animated dots */}
          <AnimatedDots />
        </div>
      </div>

      {/* Motivational messages */}
      {showMotivationalMessages && (
        <div className="max-w-sm">
          <MotivationalMessage />
        </div>
      )}

      {/* Academy branding */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <img src="/icons/logo.png" alt="Outliers Academy" className="w-4 h-4" />
        <span>Outliers Academy</span>
      </div>
    </div>
  ), [size, sizeConfig, message, t, showMotivationalMessages]);

  if (fullScreen) {
    if (!isMounted) {
      // Static version for SSR
      return (
        <div className={CONTAINER_STYLES.fullScreen}>
          <div>{content}</div>
        </div>
      );
    }

    return (
      <div className={CONTAINER_STYLES.fullScreen}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: ANIMATION_CONFIG.message.duration * 0.6 }}
        >
          {content}
        </motion.div>
      </div>
    );
  }

  if (!isMounted) {
    // Static version for SSR
    return (
      <div className={CONTAINER_STYLES.inline}>
        <div>{content}</div>
      </div>
    );
  }

  return (
    <div className={CONTAINER_STYLES.inline}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ANIMATION_CONFIG.message.duration * 0.6 }}
      >
        {content}
      </motion.div>
    </div>
  );
});

Loader.displayName = 'Loader';

// Compact loader for inline use
export const LoaderInline = memo(({ size = 'sm' }: { size?: 'sm' | 'md' }) => {
  return (
    <div className="flex items-center gap-2">
      <LoaderIcon size={size} />
    </div>
  );
});

LoaderInline.displayName = 'LoaderInline';

// Page loader wrapper with error boundary
export const PageLoader = memo(({ children, isLoading, message }: { 
  children: React.ReactNode; 
  isLoading: boolean; 
  message?: string; 
}) => {
  if (isLoading) {
    return <Loader message={message} fullScreen />;
  }

  return <>{children}</>;
});

PageLoader.displayName = 'PageLoader';