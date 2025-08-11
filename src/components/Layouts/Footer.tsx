import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {

    return (
        <footer className="w-full z-50 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 leading-relaxed">
            <div className="container mx-auto px-4 pt-12 pb-4 md:pt-16 md:pb-8">
                <div className="grid grid-cols-1 sm:md:grid-cols-6 md:grid-cols-6 lg:md:grid-cols-6 xl:md:grid-cols-12 gap-12">

                    {/* Logo y descripción */}
                    <div className="md:col-span-4">
                        <div className="flex items-center mb-4">
                            <a href="/" className="flex items-center">
                                <img src="/icons/logo.png" alt="Logo" className="h-8 w-auto mr-2" />
                                <span className="text-xl font-extrabold font-inter dark:text-white">
                                    Outliers Academy
                                </span>
                            </a>
                        </div>
                        <p className="text-base font-normal font-inter">
                            Transformamos ideas en realidades digitales a través de código visionario y estrategias de marketing innovadoras.
                            <br />
                            <span className="font-semibold">Donde la visión se encuentra con la ejecución.</span>
                        </p>
                    </div>

                    {/* Navegación */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">Navegación</h3>
                        <ul className="space-y-3 font-inter text-sm font-normal">
                            <li><Link href="/" className="hover:text-coral-500">Inicio</Link></li>
                            <li><Link href="/about" className="hover:text-coral-500">Nosotros</Link></li>
                            <li><Link href="/catalog" className="hover:text-coral-500">Catálogo</Link></li>
                            <li><a href="https://calendly.com/outlierssolutions108/discovery-meeting" target="_blank" rel="noopener noreferrer" className="hover:text-coral-500">Agendar</a></li>
                        </ul>
                    </div>

                    {/* Servicios */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">Servicios</h3>
                        <ul className="space-y-3 font-inter text-sm font-normal">
                            <li><Link href="/services/marketing" className="hover:text-coral-500">Marketing Digital</Link></li>
                            <li><Link href="/services/systems" className="hover:text-coral-500">Desarrollo de Sistemas</Link></li>
                            <li><Link href="/services/ai-agents" className="hover:text-coral-500">Agentes IA</Link></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">Contacto</h3>
                        <ul className="space-y-3 text-sm font-inter font-normal">
                            <li>
                                <a href="mailto:contact@outlierssolutions.com" className="hover:text-coral-500">
                                    contact@outlierssolutions.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/19298226066?text=Hi!%20I'm%20interested%20on%20your%20services"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-coral-500"
                                >
                                    +1 (929) 822-6066
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Redes sociales */}
                    <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-4 font-inter dark:text-white">Síguenos</h3>
                        <div className="flex sm:flex md:flex lg:flex space-x-4 sm:space-x-4 md:space-x-4 lg:space-x-2 xl:space-x-4">
                            <a target="_blank" href="https://www.linkedin.com/company/outliers-digital-solutions-inc/?viewAsMember=true" className="hover:text-coral-500"><Linkedin size={18} /></a>
                            <a target="_blank" href="https://www.instagram.com/outliers.solutions/" className="hover:text-coral-500"><Instagram size={18} /></a>
                            <a target="_blank" href="https://www.facebook.com/people/Outliers-Digital-Solutions/61575568054767/" className="hover:text-coral-500"><Facebook size={18} /></a>
                        </div>
                    </div>
                </div>

                {/* Línea final */}
                <div className="border-t border-gray-100 dark:border-gray-700 mt-12 pt-4 md:pt-8 text-xs text-center font-inter">
                    © {new Date().getFullYear()} Outliers Academy. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};
