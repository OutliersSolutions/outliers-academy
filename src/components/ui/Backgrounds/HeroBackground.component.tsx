import { useThemeState } from "@/hooks/useTheme"
import { useEffect, useRef } from "react"

export const HeroBackground = () => {

  const { theme } = useThemeState();

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const ColorStroke = theme === 'light' ? '#E7E7E7' : '#1F2937'
  const ColorPoints = theme === 'light' ? '#303030' : '#FF5252'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gridSize = 150

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      // Set canvas size for high-DPI screens
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // Scale for retina displays

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Grid lines
      ctx.strokeStyle = ColorStroke
      ctx.lineWidth = 1

      for (let x = 0.5; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0.5; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Dibuja los puntos en los vértices
      ctx.fillStyle = ColorPoints
      const pointRadius = 1

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, pointRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }


    }

    draw()
    window.addEventListener("resize", draw)

    return () => window.removeEventListener("resize", draw)
  }, [])

  return <canvas ref={canvasRef} className="bg-gray-100 dark:bg-gray-900 fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden" aria-hidden="true" />
}
