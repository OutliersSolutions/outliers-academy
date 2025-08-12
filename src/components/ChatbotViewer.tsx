'use client';

import { useEffect, useRef } from 'react';

export function ChatbotViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect() => {
    let mounted = true;

    const loadModel = async () => {
      if (!containerRef.current || !mounted) return;

      try {
        // Create model-viewer element
        const modelViewer = document.createElemen/* t( */'model-viewer');
        modelViewer.setAttribute('src', '/3d/chatbot.glb');
        modelViewer.setAttribute('alt', 'AI Chatbot 3D Model');
        modelViewer.setAttribute('auto-rotate', '');
        modelViewer.setAttribute('camera-controls', '');
        modelViewer.setAttribute('style', 'width: 100%; height: 300px; background-color: transparent;');
        modelViewer.setAttribute('loading', 'eager');

        // Clear container and add model
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(modelViewer);
      } catch (error) {
        console.warn('3D model loading failed, using fallback:', error);
        // Fallback to animated SVG
        if (containerRef.current && mounted) {
          containerRef.current.innerHTML = `
            <div class="w-full h-[300px] flex items-center justify-center">
              <div class="w-32 h-32 relative">
                <div class="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                  <svg class="w-16 h-16 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
                </div>
              </div>
            </div>
          `;
        }
      }
    };

    // Load model-viewer script if not already loaded
    if (!window.customElements.ge/* t( */'model-viewer')) {
      const script = document.createElemen/* t( */'script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.onload = () => loadModel();
      script.onerror = () => loadModel(); // Still try to load fallback
      document.head.appendChild(script);
    } else {
      loadModel();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[300px] flex items-center justify-center"
      style={{ minHeight: '300px' }}
    >
      {/* Loading state */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}