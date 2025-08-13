"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface GlobalLoaderProps {
  children: React.ReactNode;
  minimumLoadTime?: number; // Tiempo mínimo de carga en ms
}

export function GlobalLoader({ children, minimumLoadTime = 2500 }: GlobalLoaderProps) {
  const t = useTranslations('loader.global');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const loadingMessages = useMemo(() => [
    t('starting'),
    t('loadingAssets'),
    t('preparingExperience'),
    t('optimizing'),
    t('almostReady')
  ], [t]);

  const [loadingText, setLoadingText] = useState(loadingMessages[0]);

  const checkAssetsLoaded = useCallback(() => {
    return new Promise<void>((resolve) => {
      let loadedCount = 0;
      let totalAssets = 0;

      // Detectar imágenes
      const images = document.querySelectorAll('img');
      totalAssets += images.length;

      // Detectar si las fuentes están cargadas
      if (document.fonts) {
        totalAssets += 1; // Contamos las fuentes como 1 asset
      }

      // Función para actualizar progreso
      const updateProgress = () => {
        loadedCount++;
        const progress = Math.min((loadedCount / Math.max(totalAssets, 1)) * 100, 95);
        setLoadingProgress(progress);

        if (loadedCount >= totalAssets) {
          resolve();
        }
      };

      // Si no hay assets, resolver inmediatamente
      if (totalAssets === 0) {
        setLoadingProgress(95);
        resolve();
        return;
      }

      // Verificar imágenes
      images.forEach((img) => {
        if (img.complete) {
          updateProgress();
        } else {
          img.addEventListener('load', updateProgress);
          img.addEventListener('error', updateProgress); // Contar errores como "cargado"
        }
      });

      // Verificar fuentes
      if (document.fonts) {
        document.fonts.ready.then(updateProgress);
      }

      // Timeout de seguridad
      setTimeout(() => {
        setLoadingProgress(95);
        resolve();
      }, 5000);
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    const startTime = Date.now();

    const loadAssets = async () => {
      try {
        // Simular progreso inicial
        setLoadingProgress(10);
        setLoadingText(loadingMessages[0]);

        // Progreso gradual con mensajes
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            const newProgress = Math.min(prev + Math.random() * 15, 85);
            
            // Cambiar mensaje según progreso
            if (newProgress > 20 && newProgress <= 40) {
              setLoadingText(loadingMessages[1]);
            } else if (newProgress > 40 && newProgress <= 60) {
              setLoadingText(loadingMessages[2]);
            } else if (newProgress > 60 && newProgress <= 80) {
              setLoadingText(loadingMessages[3]);
            } else if (newProgress > 80) {
              setLoadingText(loadingMessages[4]);
            }
            
            return newProgress;
          });
        }, 200);

        // Esperar a que los assets se carguen
        await checkAssetsLoaded();
        clearInterval(progressInterval);

        // Asegurar tiempo mínimo de carga
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        // Completar carga
        if (mounted) {
          setLoadingProgress(100);
          setLoadingText(t('ready'));
          
          // Pequeña pausa antes de ocultar
          setTimeout(() => {
            if (mounted) {
              setIsLoading(false);
            }
          }, 500);
        }
      } catch (error) {
        console.warn('Error during loading:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadAssets();

    return () => {
      mounted = false;
    };
  }, [checkAssetsLoaded, minimumLoadTime, loadingMessages, t]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 50%, var(--color-muted) 100%)'
            }}
          >
            {/* Particles Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              
              {/* Animated particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-md mx-auto px-6">
              {/* Logo Animation */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-24 h-24 mx-auto"
                  >
                    <div className="w-full h-full border-4 border-dashed border-primary/20 rounded-full" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(47, 39, 206, 0.3)',
                        '0 0 40px rgba(47, 39, 206, 0.6)',
                        '0 0 20px rgba(47, 39, 206, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative w-24 h-24 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <img 
                      src="/icons/logo.png" 
                      alt="Outliers Academy" 
                      className="w-12 h-12 object-contain"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Brand Name */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                <span className="text-primary">Outliers</span> Academy
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-600 dark:text-gray-400 mb-8 text-sm"
              >
                {t('tagline')}
              </motion.p>

              {/* Progress Bar */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>

              {/* Progress Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex justify-between items-center text-sm"
              >
                <motion.span
                  key={loadingText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-600 dark:text-gray-400 font-medium"
                >
                  {loadingText}
                </motion.span>
                <span className="text-primary font-mono font-bold">
                  {Math.round(loadingProgress)}%
                </span>
              </motion.div>

              {/* Loading Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex justify-center space-x-2 mt-6"
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}