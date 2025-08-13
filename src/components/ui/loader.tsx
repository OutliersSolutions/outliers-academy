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
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, ANIMATION_CONFIG.messageInterval);

    return () => clearInterval(interval);
  }, [messages.length, icons.length]);

  // Static version for SSR
  if (!isMounted) {
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 text-center"
      >
        <div className="flex-shrink-0">
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
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
      <div className="h-2 w-2 bg-primary rounded-full opacity-70" />
      <div className="h-2 w-2 bg-primary rounded-full opacity-70" />
      <div className="h-2 w-2 bg-primary rounded-full opacity-70" />
    </div>
  ), []);

  const animatedDots = useMemo(() => (
    <div className={`flex items-center justify-center ${CONTAINER_STYLES.spacing.dots}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="h-2 w-2 bg-primary rounded-full"
          animate={{
            scale: ANIMATION_CONFIG.dots.scale,
            opacity: ANIMATION_CONFIG.dots.opacity
          }}
          transition={{
            duration: ANIMATION_CONFIG.dots.duration,
            repeat: Infinity,
            delay: index * 0.2
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
  showMotivationalMessages = false
}: LoaderProps) => {
  const t = useTranslations('loader');
  const sizeConfig = useMemo(() => LOADER_SIZES[size], [size]);

  const containerClass = fullScreen ? CONTAINER_STYLES.fullScreen : CONTAINER_STYLES.inline;

  const content = useMemo(() => (
    <div className={`flex flex-col items-center justify-center ${CONTAINER_STYLES.spacing.main}`}>
      <LoaderIcon size={size} />

      {showMotivationalMessages ? (
        <MotivationalMessage />
      ) : (
        <div className={`text-center ${CONTAINER_STYLES.spacing.text}`}>
          <p className={`font-medium text-gray-900 dark:text-white ${sizeConfig.text}`}>
            {message || t('defaultMessage')}
          </p>
          <AnimatedDots />
        </div>
      )}
    </div>
  ), [message, size, showMotivationalMessages, sizeConfig.text, t]);

  return (
    <div className={containerClass}>
      {content}
    </div>
  );
});

Loader.displayName = 'Loader';

// Compact loader for inline use
export const LoaderInline = memo(({ size = 'sm' }: { size?: 'sm' | 'md' }) => {
  return (
    <LoaderIcon size={size} />
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