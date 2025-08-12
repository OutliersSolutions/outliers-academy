import { useEffect, useRef } from "react"

export const AINetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvasEl = canvasRef.current
        if (!canvasEl) return

        const ctxEl = canvasEl.getContext("2d")
        if (!ctxEl) return

        // Use non-null aliases for inner scopes
        const canvas = canvasEl as HTMLCanvasElement
        const ctx = ctxEl as CanvasRenderingContext2D

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            const container = canvas.parentElement
            if (!container) return

            canvas.width = container.clientWidth
            canvas.height = container.clientHeight
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Particles
        const particles: Particle[] = []
        const numberOfParticles = 40

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string

            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 1.5 + 0.5
                this.speedX = (Math.random() - 0.5) * 0.3
                this.speedY = (Math.random() - 0.5) * 0.3
                this.color = "#FF5252"
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
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        const init = () => {
            particles.length = 0
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        const connectParticles = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        const opacity = 1 - distance / 100
                        ctx.strokeStyle = `rgba(255, 82, 82, ${opacity * 0.5})`
                        ctx.lineWidth = 0.3
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()
            }

            connectParticles()

            requestAnimationFrame(animate)
        }

        init()
        animate()

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
        }
    }, [])

    return <canvas ref={canvasRef} className="bg-gray-100 dark:bg-gray-900 fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden" aria-label="Fondo abstracto de red neuronal" />
}

