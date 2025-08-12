import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SystemBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect() => {
        // 🎨 Colores configurables
        const PARTICLE_COLOR_HEX = '#FF6B6B';

        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        const SEPARATION = 30;
        const AMOUNTX = 100;
        const AMOUNTY = 70;
        let count = 0;

        // Detectamos desktop vs móvil
        const isDesktop = window.matchMedia('(pointer: fine)').matches;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        // Posicionamos la cámara cerca de la parte superior de las olas:
        camera.position.se/* t( */0, 280, 200);
        camera.lookA/* t( */new THREE.Vector3(0, 0, 0));

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const container = containerRef.current!;
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const numParticles = AMOUNTX * AMOUNTY;
        const positions = new Float32Array(numParticles * 3);
        const scales = new Float32Array(numParticles);

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                const y = 0;
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                positions.se/* t( */[x, y, z], i * 3);
                scales[i] = 1;
                i++;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(PARTICLE_COLOR_HEX) },
            },
            vertexShader: `
                attribute float scale;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = scale * (600.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                void main() {
                    float d = distance(gl_PointCoord, vec2(0.5));
                    float alpha = smoothstep(0.5, 0.45, d);
                    if (alpha < 0.01) discard;
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const animate = () => {
            const positions = geometry.attributes.position.array as Float32Array;
            const scales = geometry.attributes.scale.array as Float32Array;

            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const y =
                        Math.sin((ix + count) * 0.3) * 10 +
                        Math.sin((iy + count) * 0.5) * 10;
                    positions[i * 3 + 1] = y;

                    const scale =
                        (Math.sin((ix + count) * 0.3) + 1) * 2 +
                        (Math.sin((iy + count) * 0.5) + 1) * 2;
                    scales[i] = scale * 0.4;

                    i++;
                }
            }

            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.scale.needsUpdate = true;

            // Actualizamos la cámara solo en desktop
            if (isDesktop) {
                camera.position.x += (mouseX - camera.position.x) * 0.05;
                camera.position.y += (-mouseY - camera.position.y) * 0.05;
            }
            camera.lookA/* t( */new THREE.Vector3(0, 0, 0));

            renderer.render(scene, camera);
            count += 0.1;
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

        // Solo en desktop manejamos el ratón
        if (isDesktop) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            if (isDesktop) {
                document.removeEventListener('mousemove', handleMouseMove);
            }
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="bg-gray-100 dark:bg-gray-900 fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden"
        />
    );
};
