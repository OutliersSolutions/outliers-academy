'use client';

import { useEffect, useRef, useState } from 'react';

interface ChatbotViewerProps {
  className?: string;
}

export function ChatbotViewerSafe({ className = "w-full h-[400px]" }: ChatbotViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  return (
    <div className={className}>
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg relative overflow-hidden"
      >
        {/* Loading/Fallback State */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-32 h-32 relative">
            <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-16 h-16 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}