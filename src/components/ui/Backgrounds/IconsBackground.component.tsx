import { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useThemeState } from "@/hooks/useTheme";
export const IconsBackground = () => {
    const [init, setInit] = useState(false);
    const { theme } = useThemeState();
    const containerRef = useRef<Container | null>(null);
    const [options, setOptions] = useState<ISourceOptions>({
        autoPlay: true,
        background: {
            opacity: 1,
        },
        fullScreen: { enable: true, zIndex: -1 },
        detectRetina: true,
        fpsLimit: 120,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: false,
                    mode: []
                },
                onHover: {
                    enable: true,
                    mode: "bubble",
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10
                    }
                },
                resize: {
                    delay: 0.5,
                    enable: true
                }
            },
            modes: {
                bubble: {
                    distance: 200,
                    duration: 1.5,
                    opacity: 0.2,
                    size: 15
                }
            }
        },
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                }
            },
            color: {
                value: "#FF6E6E"
            },
            shape: {
                type: "image",
                options: {
                    image: [
                        { src: "/icons/technologies/systems/bootstrap.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/less.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/sass.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/php.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/vue.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/angular.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/spring.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/java.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/tailwind.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/vercel.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/github.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/git.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/js.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/css.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/html.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/postgresql.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/mongodb.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/mysql.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/woo.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/laravel.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/wordpress.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/reactjs.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/nodejs.svg", width: 15, height: 15 },
                        { src: "/icons/technologies/systems/python.svg", width: 15, height: 15 }
                    ]
                }
            },
            size: {
                value: 10,
                animation: {
                    enable: false
                }
            },
            opacity: {
                value: 0.1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                outModes: {
                    default: "out"
                }
            }
        },
        preload: [
            { src: "/icons/technologies/systems/bootstrap.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/less.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/sass.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/php.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/vue.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/angular.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/spring.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/java.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/tailwind.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/vercel.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/github.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/git.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/js.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/css.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/html.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/postgresql.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/mongodb.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/mysql.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/woo.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/laravel.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/wordpress.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/reactjs.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/nodejs.svg", width: 15, height: 15 },
            { src: "/icons/technologies/systems/python.svg", width: 15, height: 15 }
        ]
    });
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    // Actualiza la configuración del fondo según el tema
    useEffect(() => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            background: {
                opacity: 1,
            }
        }));
        // Llama a refresh si el contenedor ya está disponible
        if (containerRef.current) {
            containerRef.current.refresh();
        }
    }, [theme]);
    const particlesLoaded = async (container?: Container): Promise<void> => {
        containerRef.current = container || null;
    };
    if (!init) return null;
    return (
        <div className="bg-gray-100 dark:bg-gray-900 fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden">
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        </div>
    );
};
