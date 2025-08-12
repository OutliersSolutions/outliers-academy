import { useEffect, useRef } from "react"

export const AISpectrumCircular = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    let centerX = canvas.width / 2
    let centerY = canvas.height / 2

    const waveCount = 3
    const waves: CircularWave[] = []

    class CircularWave {
      points: CircularPoint[]
      color: string
      baseRadius: number
      amplitude: number
      frequency: number
      speed: number
      phase: number

      constructor(color: string, baseRadius: number, amplitude: number, frequency: number, speed: number) {
        this.points = []
        this.color = color
        this.baseRadius = baseRadius
        this.amplitude = amplitude
        this.frequency = frequency
        this.speed = speed
        this.phase = 0

        const pointCount = 60
        for (let i = 0; i < pointCount; i++) {
          const angle = ((Math.PI * 2) / pointCount) * i
          const x = centerX + Math.cos(angle) * baseRadius
          const y = centerY + Math.sin(angle) * baseRadius
          this.points.push(new CircularPoint(x, y, angle, baseRadius))
        }
      }

      update() {
        this.phase += this.speed
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i]
          const angle = point.angle
          const radiusOffset = Math.sin(angle * this.frequency + this.phase) * this.amplitude
          const radius = this.baseRadius + radiusOffset
          point.targetX = centerX + Math.cos(angle) * radius
          point.targetY = centerY + Math.sin(angle) * radius
          point.update()
        }
      }

      draw() {
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)
        for (let i = 0; i < this.points.length; i++) {
          const nextIndex = (i + 1) % this.points.length
          const xc = (this.points[i].x + this.points[nextIndex].x) / 2
          const yc = (this.points[i].y + this.points[nextIndex].y) / 2
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc)
        }
        ctx.closePath()

        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.shadowColor = this.color
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.shadowBlur = 0

        for (let i = 0; i < this.points.length; i += 4) {
          const point = this.points[i]
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 5)
          gradient.addColorStop(0, this.color)
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    class CircularPoint {
      x: number
      y: number
      targetX: number
      targetY: number
      angle: number
      baseRadius: number
      speed: number

      constructor(x: number, y: number, angle: number, baseRadius: number) {
        this.x = x
        this.y = y
        this.targetX = x
        this.targetY = y
        this.angle = angle
        this.baseRadius = baseRadius
        this.speed = 0.1
      }

      update() {
        this.x += (this.targetX - this.x) * this.speed
        this.y += (this.targetY - this.y) * this.speed
      }
    }

    const particles: Particle[] = []
    const numberOfParticles = 100

    class Particle {
      x: number
      y: number
      size: number
      angle: number
      radius: number
      speed: number
      color: string
      alpha: number

      constructor() {
        this.angle = Math.random() * Math.PI * 2
        this.radius = Math.random() * 80 + 50
        this.x = centerX + Math.cos(this.angle) * this.radius
        this.y = centerY + Math.sin(this.angle) * this.radius
        this.size = Math.random() * 2 + 0.5
        this.speed = (Math.random() - 0.5) * 0.01

        const palette = [
          "rgba(255, 82, 82, 0.4)",
          "rgba(255, 134, 134, 0.3)",
          "rgba(255, 164, 164, 0.2)",
          "rgba(255, 193, 189, 0.2)",
        ]
        this.color = palette[Math.floor(Math.random() * palette.length)]
        this.alpha = Math.random() * 0.5 + 0.1
      }

      update() {
        this.angle += this.speed
        this.x = centerX + Math.cos(this.angle) * this.radius
        this.y = centerY + Math.sin(this.angle) * this.radius
      }

      draw() {
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const init = () => {
      waves.length = 0
      waves.push(
        new CircularWave("rgba(255, 82, 82, 0.6)", 100, 20, 5, 0.02),
        new CircularWave("rgba(255, 134, 134, 0.5)", 80, 15, 3, 0.015),
        new CircularWave("rgba(255, 180, 180, 0.4)", 60, 10, 4, 0.025)
      )

      particles.length = 0
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      for (const wave of waves) {
        wave.update()
        wave.draw()
      }

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50)
      gradient.addColorStop(0, "rgba(255, 82, 82, 0.3)")
      gradient.addColorStop(1, "rgba(255, 82, 82, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener("resize", () => {
      setCanvasDimensions()
      centerX = canvas.width / 2
      centerY = canvas.height / 2
      init()
    })

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "300px" }} className="w-full h-full" aria-label="Visualización circular de espectro de voz de IA" />
  )
}
