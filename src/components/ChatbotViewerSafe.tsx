'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ChatbotViewerProps {
  className?: string;
}

export function ChatbotViewerSafe({ className = "w-full h-[400px]" }: ChatbotViewerProps) {
  const t = useTranslations('robot');
  const tChatbot = useTranslations('chatbot');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');

  const placeholderTexts = useMemo(() => [
    tChatbot('placeholderTexts.ai'),
    tChatbot('placeholderTexts.webDev'),
    tChatbot('placeholderTexts.dataScience'),
    tChatbot('placeholderTexts.machineLearning')
  ], [tChatbot]);

  // Animate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderTexts.length]);

  useEffect(() => {
    const currentText = placeholderTexts[currentPlaceholderIndex];
    let currentChar = 0;

    const typeInterval = setInterval(() => {
      if (currentChar <= currentText.length) {
        setDisplayedPlaceholder(currentText.slice(0, currentChar));
        currentChar++;
      } else {
        clearInterval(typeInterval);
        
        // Wait before starting to delete
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (currentChar > 0) {
              setDisplayedPlaceholder(currentText.slice(0, currentChar - 1));
              currentChar--;
            } else {
              clearInterval(deleteInterval);
            }
          }, 50);
        }, 1000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentPlaceholderIndex, placeholderTexts]);

  const mountedRef = useRef(true);

  const loadModelViewer = useCallback(async () => {
    try {
      // Intentar cargar model-viewer si está disponible
      if (typeof window !== 'undefined' && !window.customElements.get('model-viewer')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@google/model-viewer@^3.4.0/dist/model-viewer.min.js';
        script.type = 'module';
        script.onload = () => {
          if (mountedRef.current) {
            createModelViewer();
          }
        };
        script.onerror = () => {
          if (mountedRef.current) {
            setIsLoaded(true); // Mostrar fallback
          }
        };
        document.head.appendChild(script);
      } else {
        createModelViewer();
      }
    } catch (error) {
      console.warn('Model viewer failed to load:', error);
      if (mountedRef.current) {
        setIsLoaded(true);
      }
    }
  }, [createModelViewer]);

  const createModelViewer = useCallback(() => {
    try {
      if (!containerRef.current) return;

      const modelViewer = document.createElement('model-viewer');
      modelViewer.setAttribute('src', '/3d/chatbot.glb');
      modelViewer.setAttribute('alt', tChatbot('modelAlt'));
      modelViewer.setAttribute('auto-rotate', '');
      modelViewer.setAttribute('camera-controls', '');
      modelViewer.setAttribute('shadow-intensity', '1');
      modelViewer.setAttribute('environment-image', 'neutral');
      modelViewer.setAttribute('exposure', '1');
      modelViewer.setAttribute('animation-name', 'Idle');
      modelViewer.setAttribute('style', 'width: 100%; height: 100%; border-radius: 12px;');

      // Agregar evento para cuando el modelo esté listo
      modelViewer.addEventListener('load', () => {
        if (mountedRef.current) {
          setIsLoaded(true);
        }
      });

      containerRef.current.appendChild(modelViewer);
    } catch (error) {
      console.warn('Failed to create model viewer:', error);
      if (mountedRef.current) {
        setIsLoaded(true);
      }
    }
  }, [tChatbot]);

  useEffect(() => {
    loadModelViewer();
    return () => {
      mountedRef.current = false;
    };
  }, [loadModelViewer]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Aquí puedes implementar la lógica de búsqueda
    console.log('Searching for:', searchQuery);
    // Por ahora, redirigir al catálogo con la búsqueda
    window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className={className}>
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Apple-style Window Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* AI Assistant Badge - Centered */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-gray-200">
            <Sparkles className="w-3 h-3 text-primary" />
            {t('aiAssistant')}
          </div>

          <div className="w-16"></div> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* 3D Robot Model - Left Side */}
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0">
              <div
                ref={containerRef}
                className="w-full h-full flex items-center justify-center"
              >
                {/* Loading/Fallback State */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="w-24 h-24 lg:w-32 lg:h-32 relative">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('question')}
              </h3>
              
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={displayedPlaceholder}
                    className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </form>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                {t('startFree')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}