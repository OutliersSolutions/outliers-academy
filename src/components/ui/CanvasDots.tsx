'use client';

import { useEffect, useRef } from 'react';

interface CanvasDotsProps {
  id: string;
  color?: string;
  size?: number;
  opacity?: number;
  spacing?: number;
  margin?: number;
}

export function CanvasDots({ 
  id, 
  color = '#cb4b16', // Solarized orange default
  size = 3,
  opacity = 0.25,
  spacing = 32,
  margin = 20
}: CanvasDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with safety margins
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw dot grid with fixed positioning
    const drawDotGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      
      // Start from margin and end before margin
      const startX = margin;
      const startY = margin;
      const endX = canvas.width - margin;
      const endY = canvas.height - margin;
      
      for (let x = startX; x < endX; x += spacing) {
        for (let y = startY; y < endY; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    };

    drawDotGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color, size, opacity, spacing, margin]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
} 