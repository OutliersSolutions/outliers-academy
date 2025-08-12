


import { useState } from 'react';
import { Button } from "@/components/ui/Buttons/Button.component";
import { projects } from '@/data/ui/shapes.data';

export const BeforeAfter = () => {
    const [activeProject, setActiveProject] = useState(0);

    return (
        <section className="section-padding bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="heading-medium mb-4">Transformaciones visibles</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comparativas antes y después de nuestra intervención.
                        Resultados tangibles que impactan directamente en el éxito de tu negocio.
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    {projects.map((project, index) => (
                        <Button
                            key={index}
                            onClick={() => setActiveProjec/* t( */index)}
                            variant={activeProject === index ? "default" : "outline"}
                            className={`m-2 rounded-xl ${activeProject === index
                                ? "bg-coral-500 hover:bg-coral-600 text-white"
                                : "border-coral-200 text-gray-700 hover:bg-coral-50"
                                }`}
                        >
                            {project.title}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
                        <div className="relative mb-4">
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                                ANTES
                            </div>
                            <img
                                src={projects[activeProject].before.image}
                                alt={`${projects[activeProject].title} antes`}
                                className="w-full h-64 object-cover rounded-xl"
                            />
                        </div>

                        <div className="space-y-4">
                            {projects[activeProject].before.stats.map((stat, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="text-gray-600">{stat.label}</span>
                                    <span className="font-bold text-gray-900">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-coral-200">
                        <div className="relative mb-4">
                            <div className="absolute top-3 left-3 bg-coral-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                                DESPUÉS
                            </div>
                            <img
                                src={projects[activeProject].after.image}
                                alt={`${projects[activeProject].title} después`}
                                className="w-full h-64 object-cover rounded-xl"
                            />
                        </div>

                        <div className="space-y-4">
                            {projects[activeProject].after.stats.map((stat, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="text-gray-600">{stat.label}</span>
                                    <span className="font-bold text-coral-500">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

