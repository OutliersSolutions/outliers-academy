import { TypeAnimation } from "react-type-animation";
import { MouseParallax } from "@/components";
import { SquareArrowOutUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

export const HeroOutlierSection = () => {

    const { t, i18n } = useTranslation();

    // Get month and year from current date
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    

    // Format month and year
    const formattedMonth = month.toString().padStart(2, '0');

    return (
        <section className="pt-20 sm:pt-40 md:pt-48 lg:pt-56 flex items-center relative overflow-x-hidden">
            <ParticlesBackground className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
            <div className="container mx-auto p-10 rounded-md relative z-10">

                <div className="absolute bottom-0 right-0 sm:right-0 md:-right-14 lg:-right-14 xl:right-0 left-16 sm:left-auto md:left-auto lg:left-auto xl:left-auto overflow-hidden z-10 opacity-20 sm:opacity-100 md:opacity-100 lg:opacity-100">
                    <MouseParallax className="w-[400px]">
                        <img
                            src="/images/vectors/empire-state-building.webp"
                            alt="Empire State"
                            className="-mb-2"
                            draggable="false"
                        />
                    </MouseParallax>
                </div>

                {/* Contenido sin parallax */}
                <div className="relative z-20 w-full flex flex-col justify-center text-left text-gray-600 dark:text-gray-300 leading-relaxed">

                    {/* Subtítulo */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
                        {t('home.hero_outlier_section.subtitle')}
                    </h2>

                    {/* Título principal con logo */}
                    <div className="flex items-center mt-4">
                        <img
                            src="./icons/logo.png"
                            alt="Outliers Solutions Logo"
                            className="w-16 md:w-24 mr-4"
                        />
                        <h1
                            className="font-heading font-extrabold 
                            text-3xl md:text-5xl lg:text-6xl 
                            text-black dark:text-white 
                            leading-relaxed
                            filter drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                        >
                            {t('home.hero_outlier_section.title')}
                        </h1>
                    </div>

                    {/* Subtítulo animado */}
                    <div className="mt-4 mb-5 sm:mb-10 md:mb-10 lg:mb-10">
                        <h3 className="font-inter font-bold text-xl md:text-3xl lg:text-4xl text-coral">
                            <TypeAnimation
                                key={i18n.language}
                                sequence={(t('home.hero_outlier_section.animated_services', { returnObjects: true }) as string[]).flatMap(service => [service, 2000])}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </h3>
                    </div>

                    {/* Descripción */}
                    <p className="text-base md:text-lg lg:text-xl w-full md:w-[80%] lg:w-[60%]">
                        {t('home.hero_outlier_section.description')}
                    </p>

                    {/* Botón */}
                    <div className="flex flex-wrap gap-4 pt-6">
                        {/* Botón principal */}
                        <NavLink
                            target="_blank"
                            rel="noopener noreferrer"
                            to={`https://calendly.com/outliers-solutions/meeting?month=${year}-${formattedMonth}`}
                            className="inline-flex items-center justify-center bg-coral hover:bg-coral text-white px-2 sm:px-2 md:px-4 lg:px-4 xl:px-6 py-1.5 sm:py-1.5 md:py-1.5 lg:py-1.5 xl:py-3 rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-all no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral"
                        >
                            {t('home.hero_outlier_section.button')}
                            <SquareArrowOutUpRight className="ml-2 h-5" />
                        </NavLink>

                    </div>
                </div>
            </div>
        </section>
    );
};
