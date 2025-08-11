// src/components/RobotHandModel.tsx

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Euler } from 'three'

interface ChatbotModelProps {
    url: string
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
}

export const ChatbotRobotModel = ({
    url,
    scale = 15,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}: ChatbotModelProps) => {
    const ref = useRef<Group>(null)
    const { scene } = useGLTF(url)
    const { gl } = useThree()

    // 1) Detectar móvil 🔍
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 640)  // breakpoint sm
        onResize()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    // 2) Rotación original
    const initialRotation = useMemo(() => new Euler(...rotation), [rotation])
    const mouseNDC = useRef({ x: 0, y: 0 })

    // 3) Sólo añadimos listener si NO es móvil
    useEffect(() => {
        if (isMobile) return
        const handleMouseMove = (e: MouseEvent) => {
            const rect = gl.domElement.getBoundingClientRect()
            mouseNDC.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            mouseNDC.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [gl.domElement, isMobile])

    // 4) Actualizar rotación cada frame, ignorando en móvil
    useFrame(() => {
        if (isMobile || !ref.current) return

        const { x, y } = mouseNDC.current
        const maxAngle = Math.PI / 8  // ±22.5°

        const rotX = initialRotation.x - y * maxAngle
        const rotY = initialRotation.y + x * maxAngle
        ref.current.rotation.set(rotX, rotY, initialRotation.z)
    })

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={scale}
            position={position}
            rotation={rotation}
        />
    )
}

useGLTF.preload('/3d/chatbot.glb')
