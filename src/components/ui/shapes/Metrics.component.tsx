import { metricsData } from "@/data/ui/metrics.data";

export const Metrics = () => {
    return (
        <section className="section-padding bg-white">
            <div className="container">
                {/* Título */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 font-heading mb-4">
                        Métricas de <span className="text-coral-500">éxito</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Cuantificamos nuestro impacto con mediciones precisas. Estos son algunos de los resultados que hemos logrado para nuestros clientes.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {metricsData.map((metric, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl hover:border-coral-200 transition-all duration-300 animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                        >
                            <div className="flex justify-between items-start">
                                <div>{metric.icon}</div>
                                <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-coral-500 to-coral-600">
                                    {metric.value}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">{metric.label}</h3>
                            <p className="text-gray-600 text-sm">{metric.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
