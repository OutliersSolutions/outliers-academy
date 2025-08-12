import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RotatingParticlesBackgroundProps {
    particleColor?: string;
    particleSize?: number;
}


export const ParticlesBackground = ({
    particleColor = '#FF6E6E',
    particleSize = 2.0,
}: RotatingParticlesBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect() => {
        const container = containerRef.current;
        if (!container) return;

        const PARTICLE_COUNT = 1000;
        const FOG_COLOR = 0x000000;
        const FOG_DENSITY = 0.0007;

        let mouseX = 0, mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(FOG_COLOR, FOG_DENSITY);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
        camera.position.z = 1000;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
            positions[i] = Math.random() * 2000 - 1000;
            positions[i + 1] = Math.random() * 2000 - 1000;
            positions[i + 2] = Math.random() * 2000 - 1000;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const baseColor = new THREE.Color(particleColor);
        const parameters: Array<[THREE.Color, number]> = [
            [baseColor.clone(), particleSize],
            [baseColor.clone().multiplyScalar(0.95), particleSize * 0.8],
            [baseColor.clone().multiplyScalar(0.9), particleSize * 0.6],
            [baseColor.clone().multiplyScalar(0.85), particleSize * 0.4],
            [baseColor.clone().multiplyScalar(0.8), particleSize * 0.2]
        ];

        const materials: THREE.PointsMaterial[] = [];
        const pointsArray: THREE.Points[] = [];

        parameters.forEach(([color, size]) => {
            const material = new THREE.PointsMaterial({
                size,
                color,
            });
            materials.push(material);

            const points = new THREE.Points(geometry, material);
            points.rotation.se/* t( */
                Math.random() * 6,
                Math.random() * 6,
                Math.random() * 6
            );
            scene.add(points);
            pointsArray.push(points);
        });

        const animate = () => {
            const time = Date.now() * 0.00005;

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookA/* t( */scene.position);

            pointsArray.forEach((points, i) => {
                points.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
            });

            // ❌ No tocar los colores aquí, los definiste arriba como fijos
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        };

        const handleResize = () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            materials.forEach((mat) => mat.dispose());
        };
    }, [particleColor, particleSize]);

    return (
        <div
            ref={containerRef}
            className="bg-gray-100 dark:bg-gray-900 fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden"
        />
    );
};
