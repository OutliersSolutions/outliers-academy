import { motion } from "framer-motion";
import { ServiceCard } from "@/components";
import { useServices } from "@/data";


export const ServiceSection = () => {


    const { services } = useServices();

    return (


        <section className="relative pt-0 sm:pt-16 md:pt-16 lg:pt-16 pb-0 sm:pb-0 md:pb-0 lg:pb-0 xl:pb-40 overflow-hidden">
            <div className="container mx-auto p-10 relative z-10">

                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-left md:text-center mb-16 text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                    <h2
                        className="font-inter font-extrabold text-3xl md:text-5xl tracking-tight mb-4 dark:text-white"
                        dangerouslySetInnerHTML={{ __html: t('home.service_section.title') }}
                    />
                    <p className="w-full md:w-3/4 lg:w-2/3 mx-auto text-base md:text-lg lg:text-xl font-normal">
                        {t('home.service_section.description')}
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid gap-2 grid-cols-1 md:gap-6 md:grid-cols-2 lg:gap-12 lg:grid-cols-3 xl:grid-cols-3">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            tags={service.tags}
                            delay={service.delay}
                            link={service.link} />
                    ))}
                </div>
            </div>
        </section>

    )

}
