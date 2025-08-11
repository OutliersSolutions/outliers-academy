import { ChevronRight, BarChart2 } from "lucide-react";
import { Button } from '@/components';

export const HeroResultSection = () => {
    return (
        <section className="pt-20 sm:pt-20 md:pt-20 lg:pt-28 xl:pt-32 w-full overflow-hidden flex items-center text-gray-600 dark:text-gray-300 leading-relaxed">

            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Lado izquierdo */}
                    <div className="space-y-6 animate-fade-in font-inter">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-relaxed">
                            Nuestros resultados <span className="text-coral-500">hablan por sí solos</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-xl">
                            Creamos soluciones digitales a medida que mejoran procesos, optimizan la experiencia de usuario y generan un impacto medible en el crecimiento de tu negocio.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-coral-500 hover:bg-coral-600 text-white rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all">
                                Agenda tu demo
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="border border-coral-300 text-coral hover:bg-coral-50 rounded-xl px-6 py-3 transition-all bg-transparent"
                            >
                                Conoce más
                            </Button>
                        </div>
                    </div>

                    {/* Lado derecho */}
                    <div className="flex justify-center lg:justify-end animate-scale-in">
                        <div className="relative p-1 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden w-full max-w-md">

                            <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-800 flex flex-col space-y-4">

                                {/* Encabezado */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                                            Dashboard de resultados
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Actualizado en tiempo real</p>
                                    </div>
                                    <BarChart2 className="h-8 w-8 text-coral-500" />
                                </div>

                                {/* Métricas */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Usuarios activos</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">12,568</p>
                                        <p className="text-xs text-green-600">+8.2% vs mes anterior</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tiempo de carga</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">0.8s</p>
                                        <p className="text-xs text-green-600">-30% vs mes anterior</p>
                                    </div>
                                </div>

                                {/* Gráfico de barras */}
                                <div className="w-full h-32 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center">
                                    <div className="w-full h-20 px-4 flex items-end gap-1">
                                        <div className="bg-coral-200 h-8 w-1/6 rounded-t-md"></div>
                                        <div className="bg-coral-300 h-12 w-1/6 rounded-t-md"></div>
                                        <div className="bg-coral-400 h-16 w-1/6 rounded-t-md"></div>
                                        <div className="bg-coral-500 h-20 w-1/6 rounded-t-md"></div>
                                        <div className="bg-coral-600 h-14 w-1/6 rounded-t-md"></div>
                                        <div className="bg-coral-700 h-10 w-1/6 rounded-t-md"></div>
                                    </div>
                                </div>

                                {/* Botón */}
                                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white rounded-xl mt-2">
                                    Ver reporte completo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
