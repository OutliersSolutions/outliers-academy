'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ChatbotViewerProps {
  className?: string;
}

export function ChatbotViewerSafe({ className = "w-full h-[400px]" }: ChatbotViewerProps) {
  const t = useTranslations('robot');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  const placeholderTexts = useMemo(() => [
    'Inteligencia Artificial...',
    'Desarrollo Web...',
    'Ciberseguridad...',
    'Data Science...',
    'Machine Learning...',
    'React.js...',
    'Python...',
    'JavaScript...'
  ], []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animate placeholder text
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isClient, placeholderTexts.length]);

  useEffect(() => {
    if (!isClient) return;

    const currentText = placeholderTexts[currentPlaceholderIndex];
    let currentChar = 0;

    const typeInterval = setInterval(() => {
      if (currentChar <= currentText.length) {
        setAnimatedPlaceholder(currentText.slice(0, currentChar));
        currentChar++;
      } else {
        clearInterval(typeInterval);
        // Wait before starting to delete
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (currentChar > 0) {
              setAnimatedPlaceholder(currentText.slice(0, currentChar - 1));
              currentChar--;
            } else {
              clearInterval(deleteInterval);
            }
          }, 100);
        }, 1000);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, [currentPlaceholderIndex, isClient, placeholderTexts]);

  useEffect(() => {
    let mounted = true;

    const loadModelViewer = async () => {
      if (!containerRef.current || !mounted) return;

      try {
        // Intentar cargar model-viewer si está disponible
        if (!customElements.get('model-viewer')) {
          const script = document.createElement('script');
          script.type = 'module';
          script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
          
          script.onload = () => {
            if (mounted && containerRef.current) {
              createModelViewer();
            }
          };

          script.onerror = () => {
            if (mounted) {
              setIsLoaded(true); // Mostrar fallback
            }
          };

          document.head.appendChild(script);
        } else {
          createModelViewer();
        }
      } catch (error) {
        console.warn('Model viewer failed to load:', error);
        if (mounted) {
          setIsLoaded(true);
        }
      }
    };

    const createModelViewer = () => {
      if (!containerRef.current || !mounted) return;

      try {
        const modelViewer = document.createElement('model-viewer');
        modelViewer.setAttribute('src', '/3d/chatbot.glb');
        modelViewer.setAttribute('alt', 'AI Chatbot 3D Model');
        modelViewer.setAttribute('auto-rotate', '');
        modelViewer.setAttribute('camera-controls', '');
        modelViewer.setAttribute('loading', 'eager');
        modelViewer.setAttribute('style', 'width: 100%; height: 100%; background: transparent;');

        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(modelViewer);
        
        // Agregar evento para cuando el modelo esté listo
        modelViewer.addEventListener('load', () => {
          if (mounted) {
            setIsLoaded(true);
          }
        });

      } catch (error) {
        console.warn('Failed to create model viewer:', error);
        if (mounted) {
          setIsLoaded(true);
        }
      }
    };

    if (isClient) {
      loadModelViewer();
    }

    return () => {
      mounted = false;
    };
  }, [isClient]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Aquí puedes implementar la lógica de búsqueda
      console.log('Searching for:', searchQuery);
      // Por ahora, redirigir al catálogo con la búsqueda
      window.location.href = `/es/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
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
                      <svg className="w-12 h-12 lg:w-16 lg:h-16 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-6 lg:h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Section - Right Side */}
            <div className="flex-1 w-full space-y-4">
              {/* Question */}
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                {t('question')}
              </h3>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={animatedPlaceholder}
                    className="w-full pl-12 pr-4 py-4 text-base bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white shadow-sm"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}