import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import Link from 'next/link';

const systemsFeatures = [
  'Sistemas CRM personalizados',
  'Plataformas ERP integradas',
  'Automatización de procesos',
  'Dashboards ejecutivos',
  'APIs y microservicios',
  'Bases de datos optimizadas',
  'Seguridad empresarial',
  'Escalabilidad garantizada'
];

const systemsServices = [
  {
    title: 'CRM Personalizado',
    description: 'Sistemas de gestión de clientes diseñados específicamente para tu modelo de negocio y procesos.',
    features: ['Gestión de leads', 'Seguimiento de ventas', 'Automatización de marketing', 'Reportes detallados'],
    icon: '👥'
  },
  {
    title: 'Plataformas ERP',
    description: 'Soluciones integrales para la gestión de recursos empresariales, inventarios y procesos operativos.',
    features: ['Gestión de inventario', 'Control financiero', 'Recursos humanos', 'Reportería avanzada'],
    icon: '📊'
  },
  {
    title: 'Sistemas Odoo',
    description: 'Implementación y personalización de Odoo ERP adaptado a las necesidades específicas de tu empresa.',
    features: ['Módulos personalizados', 'Integraciones', 'Migración de datos', 'Capacitación'],
    icon: '🏢'
  },
  {
    title: 'Automatización',
    description: 'Automatización inteligente de procesos empresariales para aumentar la eficiencia y reducir errores.',
    features: ['Flujos de trabajo', 'Integración de sistemas', 'Notificaciones automáticas', 'Workflows complejos'],
    icon: '⚙️'
  }
];

const technologies = [
  { name: 'Python', icon: '/icons/technologies/systems/python.svg' },
  { name: 'Node.js', icon: '/icons/technologies/systems/nodejs.svg' },
  { name: 'React', icon: '/icons/technologies/systems/reactjs.svg' },
  { name: 'Laravel', icon: '/icons/technologies/systems/laravel.svg' },
  { name: 'PostgreSQL', icon: '/icons/technologies/systems/postgresql.svg' },
  { name: 'MongoDB', icon: '/icons/technologies/systems/mongodb.svg' },
];

export default function SystemsPage({
  params
}: {
  params: { locale: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30 relative">
      <ParticlesBackground particleColor="#2F27CE" opacity={0.4} particleSize={1.2} drawLines={true} density={12000} className="absolute inset-0 w-full h-full z-0" />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-6 leading-tight">
                Sistemas a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Medida</span>
              </h1>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                Transforma tu empresa aumentando la eficiencia y control de tus procesos con sistemas 
                personalizados diseñados específicamente para tu modelo de negocio.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {systemsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://wa.me/+51999999999?text=Hola! Me interesa conocer más sobre sistemas personalizados para mi empresa"
                  target="_blank"
                  className="btn-primary btn-lg justify-center group"
                >
                  Solicitar Demo Gratuito
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href={`/${params.locale}/contact`} className="btn-outline justify-center">
                  Ver Proyectos
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white dark:bg-surface rounded-2xl shadow-2xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl"></div>
                  <div className="relative z-10">
                    {/* Dashboard mockup */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">Dashboard</h3>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Charts */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-neutral-600 mb-2">Ventas</div>
                          <div className="text-xl font-bold text-primary">$45,892</div>
                          <div className="text-xs text-green-600">+12%</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-neutral-600 mb-2">Clientes</div>
                          <div className="text-xl font-bold text-accent">1,249</div>
                          <div className="text-xs text-green-600">+5%</div>
                        </div>
                      </div>
                      
                      {/* Progress bars */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Eficiencia</span>
                            <span>87%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{width: '87%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Productividad</span>
                            <span>94%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-accent h-2 rounded-full" style={{width: '94%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-white/50 dark:bg-surface/30 backdrop-blur-sm relative z-10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">Tecnologías que Utilizamos</h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Trabajamos con las mejores tecnologías del mercado para garantizar sistemas robustos y escalables
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {technologies.map((tech, index) => (
              <div key={index} className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/80 dark:hover:bg-surface/80 transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">Nuestros <span className="text-primary">Servicios</span> de Sistemas</h2>
            <p className="p-lead max-w-2xl mx-auto">
              Desarrollamos sistemas personalizados que se adaptan perfectamente a tus procesos de negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {systemsServices.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 h-full hover:shadow-xl hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl">{service.icon}</div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Necesitas un sistema personalizado?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Agenda una consulta técnica gratuita y descubre cómo podemos optimizar tus procesos empresariales
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="https://wa.me/+51999999999?text=Hola! Quiero agendar una consulta técnica sobre sistemas personalizados"
                  target="_blank"
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085"/>
                  </svg>
                  Consulta Técnica
                </Link>
                <Link 
                  href={`/${params.locale}/contact`} 
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
                >
                  Ver Demo en Vivo
                </Link>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
        </div>
      </section>
    </div>
  );
}