import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

interface FooterProps {
    locale: string;
}

export const Footer = async ({ locale }: FooterProps) => {
    const t = await getTranslations('footer');
    const tCommon = await getTranslations('common');

    return (
        <footer className="w-full z-50 relative overflow-hidden footer-gradient">
            {/* Particles background */}
            <div className="absolute inset-0">
                <ParticlesBackground 
                    particleColor="#ff5a1f" 
                    opacity={0.7} 
                    particleSize={3.5} 
                    drawLines={false} 
                    density={6000} 
                    className="absolute inset-0 w-full h-full z-0" 
                />
            </div>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 pt-12 pb-4 md:pt-16 md:pb-8">
                <div className="grid grid-cols-1 sm:md:grid-cols-6 md:grid-cols-6 lg:md:grid-cols-6 xl:md:grid-cols-12 gap-12">

                    {/* Logo y descripción */}
                    <div className="md:col-span-4">
                        <div className="flex items-center mb-4">
                            <Link href={`/${locale}`} className="flex items-center">
                                <img src="/icons/logo.png" alt="Logo" className="h-8 w-auto mr-2" />
                                <span className="text-xl font-extrabold font-heading dark:text-white">
                                    {tCommon('outliersAcademy')}
                                </span>
                            </Link>
                        </div>
                        <p className="text-base font-normal font-sans text-gray-600 dark:text-gray-300">
                            {t('description')}
                            <br />
                            <span className="font-semibold">{t('tagline')}</span>
                        </p>
                    </div>

                    {/* Navegación */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">{t('navigation')}</h3>
                        <ul className="space-y-3 font-inter text-sm font-normal text-gray-600 dark:text-gray-300">
                            <li><Link href={`/${locale}`} className="hover:text-primary transition-colors">{t('home')}</Link></li>
                            <li><Link href={`/${locale}/about`} className="hover:text-primary transition-colors">{t('about')}</Link></li>
                            <li><Link href={`/${locale}/catalog`} className="hover:text-primary transition-colors">{t('catalog')}</Link></li>
                            <li><a href="https://calendly.com/outlierssolutions108/discovery-meeting" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('schedule')}</a></li>
                            <li><Link href={`/${locale}/faq`} className="hover:text-primary transition-colors">{t('faq')}</Link></li>
                        </ul>
                    </div>

                    {/* Servicios */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">{t('services')}</h3>
                        <ul className="space-y-3 font-inter text-sm font-normal text-gray-600 dark:text-gray-300">
                            <li><Link href={`/${locale}/services`} className="hover:text-primary transition-colors">{t('otherServices')}</Link></li>
                            <li><Link href={`/${locale}/services/marketing`} className="hover:text-primary transition-colors">{t('digitalMarketing')}</Link></li>
                            <li><Link href={`/${locale}/services/systems`} className="hover:text-primary transition-colors">{t('systemDevelopment')}</Link></li>
                            <li><Link href={`/${locale}/services/ai-agents`} className="hover:text-primary transition-colors">{t('aiAgents')}</Link></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">{t('contact')}</h3>
                        <ul className="space-y-3 text-sm font-inter font-normal text-gray-600 dark:text-gray-300">
                            <li>
                                <a href="mailto:contact@outlierssolutions.com" className="hover:text-primary transition-colors">
                                    {tCommon('contactEmail')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/19298226066?text=Hi!%20I'm%20interested%20on%20your%20services"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    {tCommon('contactPhone')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Redes sociales */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">{t('followUs')}</h3>
                        <div className="flex sm:flex md:flex lg:flex space-x-4 sm:space-x-4 md:space-x-4 lg:space-x-2 xl:space-x-4">
                            <a target="_blank" href="https://www.linkedin.com/company/outliers-digital-solutions-inc/?viewAsMember=true" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300"><Linkedin size={18} /></a>
                            <a target="_blank" href="https://www.instagram.com/outliers.solutions/" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300"><Instagram size={18} /></a>
                            <a target="_blank" href="https://www.facebook.com/people/Outliers-Digital-Solutions/61575568054767/" className="hover:text-primary transition-colors text-gray-600 dark:text-gray-300"><Facebook size={18} /></a>
                        </div>
                    </div>
                </div>

                {/* Línea final */}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-4 md:pt-8 text-xs text-center font-inter text-gray-600 dark:text-gray-300">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <span>© {new Date().getFullYear()} {tCommon('outliersAcademy')}. {t('allRightsReserved')}.</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="text-primary font-medium">{t('madeWithLove')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
