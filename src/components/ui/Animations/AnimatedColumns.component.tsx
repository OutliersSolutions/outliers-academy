import { useEffect, useRef, useState } from "react"
import { IconCard } from "../Cards/IconCard.component";

interface AnimatedColumnProps {
    icons: { name: string; label: string }[]
    direction?: "up" | "down"
    duration?: string // opcional
}

export const AnimatedColumn = ({
    icons,
    direction = "down",
    duration = "30s",
}: AnimatedColumnProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollerRef = useRef<HTMLDivElement>(null)
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (scrollerRef.current) {
            const children = Array.from(scrollerRef.current.children)
            children.forEach((child) => {
                scrollerRef.current!.appendChild(child.cloneNode(true))
            })
            setStart(true)
        }

        if (containerRef.current) {
            containerRef.current.style.setProperty("--animation-direction", direction === "down" ? "normal" : "reverse")
            containerRef.current.style.setProperty("--animation-duration", duration)
        }
    }, [direction, duration])

    return (
        <div ref={containerRef} className="overflow-hidden h-full w-full">
            <div
                ref={scrollerRef}
                className={`flex flex-col ${start ? `animate-scroll-${direction}` : ""
                    }`}
            >
                {icons.map((icon, i) => (
                    <IconCard
                        key={`${icon.name}-${i}`}
                        image={`icons/technologies/agents-ai/${icon.name}.svg`}
                        label={icon.label}
                    />
                ))}
            </div>
        </div>
    )
}
