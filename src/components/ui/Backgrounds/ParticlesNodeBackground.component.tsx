import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const ParticlesNodeBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
    };

    const options: ISourceOptions = useMemo(() => ({
        autoPlay: true,
        fullScreen: { enable: true, zIndex: -1 },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: { enable: false, mode: [] },
                onHover: {
                    enable: true,
                    mode: "bubble",
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10
                    }
                },
                resize: { enable: true, delay: 0.5 }
            },
            modes: {
                bubble: {
                    distance: 150,
                    duration: 1,
                    opacity: 1,
                    size: 10
                }
            }
        },
        particles: {
            number: {
                value: 100,
                density: { enable: true, area: 600 }
            },
            color: {
                value: [
                    "#FF6F6F",
                    "#FF8787",
                    "#FF9F9F",
                    "#FFB6B6",
                    "#FFD3D3"
                ]
            },
            links: {
                enable: true,
                distance: 100,
                color: "#FF9F9F",
                opacity: 0.3,
                width: 2
            },
            move: {
                enable: true,
                speed: 0.6,
                direction: "none",
                outModes: { default: "out" }
            },
            opacity: {
                value: 0.2
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 3, max: 5 },
                animation: {
                    enable: false
                }
            }
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        zLayers: 1
    }), []);

    if (!init) return null;

    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 -z-10">
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        </div>
    );
};
