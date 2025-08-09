'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Group, Euler } from 'three';

interface ChatbotModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function ChatbotModel({
  url,
  scale = 2,
  position = [0, -1, 0],
  rotation = [0, 0, 0],
}: ChatbotModelProps) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(url);
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Animación de rotación suave
  useFrame((state) => {
    if (ref.current && !isMobile) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.1;
      ref.current.position.y = position[1] + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
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
  );
}

interface ChatbotViewer3DProps {
  className?: string;
}

export function ChatbotViewer3D({ className = "w-full h-[400px]" }: ChatbotViewer3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <ChatbotModel 
            url="/3d/chatbot.glb" 
            scale={2}
            position={[0, -1, 0]}
          />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

// Preload del modelo
useGLTF.preload('/3d/chatbot.glb');