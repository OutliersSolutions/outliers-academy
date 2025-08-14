import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import { ChatbotViewerSafe } from '@/components/ChatbotViewerSafe';
import Link from 'next/link';

const aiFeatures = [
  'Chatbots de IA para sitios web',
  'Agentes de WhatsApp inteligentes',
  'Automatización de procesos con IA',
  'Análisis inteligente de datos',
  'Procesamiento de lenguaje natural',
  'Integración con sistemas existentes',
  'Aprendizaje continuo',
  'Soporte 24/7 automatizado'
];

const aiServices = [
  {
    title: 'Chatbots Inteligentes',
    description: 'Chatbots conversacionales para tu sitio web que entienden el contexto y brindan respuestas precisas a tus clientes.',
    features: ['Respuestas contextuales', 'Integración web', 'Análisis de conversaciones', 'Mejora continua'],
    icon: '🤖'
  },
  {
    title: 'Agentes WhatsApp IA',
    description: 'Automatiza la atención al cliente en WhatsApp con agentes de IA que manejan consultas complejas.',
    features: ['Atención 24/7', 'Múltiples idiomas', 'Integración CRM', 'Escalamiento humano'],
    icon: '💬'
  },
  {
    title: 'Automatización Inteligente',
    description: 'Automatización de procesos empresariales utilizando IA para tomar decisiones y optimizar flujos de trabajo.',
    features: ['Procesamiento de documentos', 'Clasificación automática', 'Flujos inteligentes', 'ROI medible'],
    icon: '⚡'
  },
  {
    title: 'Análisis de Datos IA',
    description: 'Análisis predictivo y machine learning para obtener insights valiosos de tus datos empresariales.',
    features: ['Análisis predictivo', 'Detección de patrones', 'Visualizaciones', 'Recomendaciones automáticas'],
    icon: '📊'
  }
];

const aiTechnologies = [
  { name: 'OpenAI', icon: '/icons/technologies/agents-ai/openia.svg' },
  { name: 'Python', icon: '/icons/technologies/agents-ai/python.svg' },
  { name: 'Node.js', icon: '/icons/technologies/agents-ai/nodejs.svg' },
  { name: 'MongoDB', icon: '/icons/technologies/agents-ai/mongodb.svg' },
  { name: 'AWS', icon: '/icons/technologies/agents-ai/aws.svg' },
  { name: 'React', icon: '/icons/technologies/agents-ai/react.svg' },
];

export default function AIAgentsPage({
  params
}: {
  params: { locale: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30 relative">
      <ParticlesBackground particleColor="#433BFF" opacity={0.5} particleSize={1.5} drawLines={true} density={8000} className="absolute inset-0 w-full h-full z-0" />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-text mb-6 leading-tight">
                Automatización con <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Inteligencia Artificial</span>
              </h1>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                Aumenta la productividad y mejora la experiencia del cliente con agentes de IA inteligentes 
                y automatizaciones que funcionan 24/7 para hacer crecer tu negocio.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 bg-accent rounded-full flex-shrink-0"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://wa.me/+51999999999?text=Hola! Me interesa implementar IA en mi negocio, quisiera conocer más"
                  target="_blank"
                  className="btn-primary btn-lg justify-center group"
                >
                  Probar IA Gratis
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href={`/${params.locale}/contact`} className="btn-outline justify-center">
                  Ver Demo IA
                </Link>
              </div>
            </div>

            {/* AI Chatbot Demo */}
            <div className="flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white dark:bg-surface rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold">AI Assistant Online</span>
                    </div>
                    
                    {/* 3D Chatbot */}
                    <div className="h-48 mb-4">
                      <ChatbotViewerSafe className="w-full h-full" />
                    </div>
                    
                    {/* Chat Preview */}
                    <div className="space-y-3 text-sm">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="text-primary font-medium">¡Hola! ¿En qué puedo ayudarte hoy?</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-right">
                        <p>¿Qué servicios de IA ofrecen?</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="text-primary font-medium">Ofrecemos chatbots, automatización y análisis con IA. ¿Te interesa algún servicio específico?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technologies Section */}
      <section className="py-16 bg-white/50 dark:bg-surface/30 backdrop-blur-sm relative z-10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">Tecnologías de IA que Dominamos</h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Utilizamos las tecnologías más avanzadas de inteligencia artificial para crear soluciones innovadoras
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {aiTechnologies.map((tech, index) => (
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
            <h2 className="h2-section mb-4">Nuestros <span className="text-primary">Servicios</span> de IA</h2>
            <p className="p-lead max-w-2xl mx-auto">
              Implementamos soluciones de inteligencia artificial que transforman la manera en que tu empresa opera
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiServices.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 h-full hover:shadow-xl hover:border-accent/20 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl">{service.icon}</div>
                    <h3 className="text-xl font-heading font-bold group-hover:text-accent transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
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

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-surface/50 relative z-10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="h2-section mb-4">Resultados que Hablan por Sí Solos</h2>
            <p className="p-lead max-w-2xl mx-auto">
              Nuestras soluciones de IA han transformado la operación de decenas de empresas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { stat: '75%', label: 'Reducción en tiempo de respuesta' },
              { stat: '24/7', label: 'Disponibilidad de atención' },
              { stat: '90%', label: 'Satisfacción del cliente' },
              { stat: '300%', label: 'Aumento en eficiencia' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{item.stat}</div>
                <div className="text-neutral-600 dark:text-neutral-300">{item.label}</div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para automatizar con IA?</h2>
              <p className="text-xl font-sans mb-8 opacity-90 max-w-2xl mx-auto">
                Programa una demostración gratuita y descubre cómo la IA puede revolucionar tu negocio
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="https://wa.me/+51999999999?text=Hola! Quiero ver una demo de sus soluciones de IA"
                  target="_blank"
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-2xl mr-2">🤖</span>
                  Demo de IA Gratis
                </Link>
                <Link 
                  href={`/${params.locale}/contact`} 
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
                >
                  Hablar con Experto
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