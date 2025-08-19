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
        // Progreso gradual
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => Math.min(prev + Math.random() * 15, 85));
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
          // Pequeña pausa antes de ocultar
          setTimeout(() => {
            if (mounted) {
              setIsLoading(false);
            }
          }, 500);
        }
      } catch (error) {
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
            {/* Subtle Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
            </div>
            {/* Main Content */}
            <div className="relative z-10 text-center mx-auto px-6">
              {/* Brand Name with Icon */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <img 
                  src="/icons/logo.png" 
                  alt="Outliers Academy" 
                  className="w-8 h-8 object-contain"
                />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <span className="text-primary">Outliers</span> Academy
                </h1>
              </motion.div>
              {/* Animated Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-center gap-2"
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-3 h-3 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
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
