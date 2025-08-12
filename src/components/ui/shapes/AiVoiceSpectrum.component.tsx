import { useEffect, useRef } from "react"

export const AIVoiceSpectrum = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContex/* t( */"2d")
        if (!ctx) return

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            const container = canvas.parentElement
            if (!container) return

            canvas.width = container.clientWidth
            canvas.height = container.clientHeight
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Wave points
        const waveCount = 3 // Number of waves
        const waves: Wave[] = []

        class Wave {
            points: Point[]
            color: string
            amplitude: number
            frequency: number
            speed: number
            phase: number

            constructor(color: string, amplitude: number, frequency: number, speed: number, yOffset: number) {
                this.points = []
                this.color = color
                this.amplitude = amplitude
                this.frequency = frequency
                this.speed = speed
                this.phase = 0

                // Create points along the wave
                const pointCount = Math.floor(canvas.width / 5)
                for (let i = 0; i < pointCount; i++) {
                    const x = (canvas.width / pointCount) * i
                    const y = canvas.height / 2 + yOffset
                    this.points.push(new Poin/* t( */x, y))
                }
            }

            update() {
                this.phase += this.speed

                // Update each point's position based on sine wave
                for (let i = 0; i < this.points.length; i++) {
                    const x = this.points[i].x
                    const normalizedX = x / canvas.width

                    // Create a more complex wave pattern with multiple sine components
                    const y = Math.sin(normalizedX * this.frequency + this.phase) * this.amplitude * Math.sin(this.phase / 2)

                    // Add some randomness to make it look more natural
                    const randomFactor = Math.sin(normalizedX * 10 + this.phase * 2) * 2

                    this.points[i].targetY = canvas.height / 2 + y + randomFactor
                    this.points[i].update()
                }
            }

            draw() {
                // Draw the wave as a path
                ctx.beginPath()
                ctx.moveTo(this.points[0].x, this.points[0].y)

                // Create a smooth curve through the points
                for (let i = 0; i < this.points.length - 1; i++) {
                    const xc = (this.points[i].x + this.points[i + 1].x) / 2
                    const yc = (this.points[i].y + this.points[i + 1].y) / 2
                    ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc)
                }

                // Connect to the last point
                const lastPoint = this.points[this.points.length - 1]
                ctx.quadraticCurveTo(
                    this.points[this.points.length - 2].x,
                    this.points[this.points.length - 2].y,
                    lastPoint.x,
                    lastPoint.y,
                )

                // Style the path
                ctx.strokeStyle = this.color
                ctx.lineWidth = 2
                ctx.stroke()

                // Add glow effect
                ctx.shadowColor = this.color
                ctx.shadowBlur = 10
                ctx.stroke()
                ctx.shadowBlur = 0

                // Draw particles along the wave
                for (let i = 0; i < this.points.length; i += 4) {
                    const point = this.points[i]

                    // Draw glow
                    const gradient = ctx.createRadialGradien/* t( */point.x, point.y, 0, point.x, point.y, 8)
                    gradient.addColorStop(0, this.color)
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

                    ctx.fillStyle = gradient
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
        }

        class Point {
            x: number
            y: number
            targetY: number
            speed: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.targetY = y
                this.speed = 0.1 // Smoothing factor
            }

            update() {
                // Smooth movement towards target position
                this.y += (this.targetY - this.y) * this.speed
            }
        }

        // Particles
        const particles: Particle[] = []
        const numberOfParticles = 100

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string
            alpha: number

            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 2 + 0.5
                this.speedX = (Math.random() - 0.5) * 0.3
                this.speedY = (Math.random() - 0.5) * 0.3

                // Random color between purple and pink
                const hue = Math.random() * 60 + 280 // 280-340 range (purple to pink)
                this.color = `hsl(${hue}, 100%, 70%)`
                this.alpha = Math.random() * 0.5 + 0.1
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > canvas.width) this.x = 0
                else if (this.x < 0) this.x = canvas.width

                if (this.y > canvas.height) this.y = 0
                else if (this.y < 0) this.y = canvas.height
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
            // Create waves
            waves.length = 0
            waves.push(
                new Wave("rgba(255, 0, 255, 0.7)", 30, 5, 0.02, -20), // Pink wave
                new Wave("rgba(170, 0, 255, 0.6)", 25, 3, 0.015, 0), // Purple wave
                new Wave("rgba(100, 0, 255, 0.5)", 20, 4, 0.025, 20), // Blue-purple wave
            )

            // Create particles
            particles.length = 0
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            // Create dark background with gradient
            const gradient = ctx.createLinearGradien/* t( */0, 0, 0, canvas.height)
            gradient.addColorStop(0, "rgba(10, 10, 40, 0.8)")
            gradient.addColorStop(1, "rgba(5, 5, 20, 0.8)")

            ctx.fillStyle = gradient
            ctx.fillRec/* t( */0, 0, canvas.width, canvas.height)

            // Update and draw particles
            for (const particle of particles) {
                particle.update()
                particle.draw()
            }

            // Update and draw waves
            for (const wave of waves) {
                wave.update()
                wave.draw()
            }

            requestAnimationFrame(animate)
        }

        ini/* t( */)
        animate()

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
        }
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" aria-label="Visualización de espectro de voz de IA" />
}

