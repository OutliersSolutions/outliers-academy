import { Bolt, ChartNoAxesCombined, Code, Database, GitCompare, Layers, LayoutPanelLeft, SquareArrowOutUpRight, Zap } from 'lucide-react';
import { FeaturedCard, BenefitChip } from '@/components';
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

export const HeroSystemSection = () => {
    const { t } = useTranslation();

    const benefitsRef = useRef(null);
    const isBenefitsInView = useInView(benefitsRef, { once: true });

    const features = t('systems.hero_system_section.features', { returnObjects: true }) as {
        title: string;
        description: string;
    }[];

    const benefits = t('systems.hero_system_section.benefits', { returnObjects: true }) as string[];

    const featureIcons = [GitCompare, Database, ChartNoAxesCombined, LayoutPanelLeft];
    const benefitIcons = [Bolt, Database, Layers, ChartNoAxesCombined, LayoutPanelLeft];

    return (
        <section className="pt-8 sm:pt-8 md:pt-20 lg:pt-28 xl:pt-32 w-full overflow-hidden flex items-center text-gray-600 dark:text-gray-300 leading-relaxed">
            <div className="container mx-auto relative z-10 p-10">

                <div className="grid gap-4 sm:gap-4 md:gap-8 lg:gap-16 xl:gap-20 grid-cols-1 lg:grid-cols-2">

                    {/* Lado izquierdo - Texto */}
                    <div className="w-full space-y-6">
                        <h1
                            className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white filter drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                        >
                            {t('systems.hero_system_section.title')}
                        </h1>

                        <p className="text-base md:text-lg max-w-lg">
                            {t('systems.hero_system_section.description')}
                        </p>

                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://calendly.com/outlierssolutions108/discovery-meeting"
                            className="inline-flex items-center justify-center bg-coral hover:bg-coral text-white px-2 sm:px-2 md:px-4 lg:px-4 xl:px-6 py-1.5 sm:py-1.5 md:py-1.5 lg:py-1.5 xl:py-3 rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-all mt-4 no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral"
                        >
                            {t('systems.hero_system_section.button')} <SquareArrowOutUpRight className="ml-2 h-5" />
                        </a>

                        {/* Chips de beneficios */}
                        <motion.div
                            ref={benefitsRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                            className="flex flex-wrap gap-2"
                        >
                            {benefits.map((text, index) => {
                                const Icon = benefitIcons[index] || Zap; // fallback Zap si faltara algún ícono
                                return (
                                    <BenefitChip
                                        key={index}
                                        icon={<Icon size={16} />}
                                        text={text}
                                        delay={index * 0.1}
                                    />
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Lado derecho - Cards */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                        {features.map((feature, idx) => {
                            const Icon = featureIcons[idx] || Code; // fallback
                            return (
                                <FeaturedCard
                                    key={idx}
                                    icon={<Icon size={32} />}
                                    title={feature.title}
                                    description={feature.description}
                                    className={idx === 0 ? "md:mt-10" : ""}
                                    delay={100 + idx * 100}
                                />
                            );
                        })}

                        {/* Barras de progreso decorativas */}
                        <div className="md:col-span-2 flex space-x-2 mt-4">
                            <div className="h-2 flex-1 bg-coral rounded-full"></div>
                            <div className="h-2 flex-1 bg-coral rounded-full"></div>
                            <div className="h-2 flex-1 bg-coral rounded-full"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
