import Link from 'next/link';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';

const teamMembers = [
  {
    id: 1,
    name: "Ana Rodríguez",
    role: "CEO & Fundadora",
    department: "Dirección",
    description: "Especialista en estrategia digital con más de 10 años de experiencia en el sector tecnológico.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
  {
    id: 2,
    name: "Carlos Martínez",
    role: "CTO",
    department: "Tecnología",
    description: "Arquitecto de software especializado en soluciones cloud y aplicaciones distribuidas.",
    imageUrl: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
  {
    id: 3,
    name: "Elena López",
    role: "Lead Designer",
    department: "UX/UI",
    description: "Creadora de experiencias digitales centradas en el usuario con enfoque en accesibilidad.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
  {
    id: 4,
    name: "Javier Sánchez",
    role: "Full Stack Developer",
    department: "Desarrollo",
    description: "Experto en React y Node.js con pasión por crear código limpio y eficiente.",
    imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
  {
    id: 5,
    name: "Lucía Fernández",
    role: "Marketing Manager",
    department: "Marketing",
    description: "Estratega de marketing digital con enfoque en crecimiento y análisis de datos.",
    imageUrl: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
];

const services = [
  {
    title: "Desarrollo web y marketing digital",
    description: "Potencia tu presencia online y convierte visitas en ventas con soluciones web y estrategias de marketing integradas.",
    tags: ["Identidad de marca", "Página corporativa", "Ecommerce", "SEO", "Publicidad", "Redes sociales"],
    icon: "📢"
  },
  {
    title: "Sistemas a medida",
    description: "Transforma tu empresa aumentando la eficiencia y control de tus procesos con sistemas personalizados.",
    tags: ["CRM personalizado", "ERP", "Automatización", "Dashboards", "APIs", "Integración"],
    icon: "🖥️"
  },
  {
    title: "Automatización con inteligencia artificial",
    description: "Aumenta la productividad y mejora la experiencia del cliente con agentes de IA y automatizaciones inteligentes.",
    tags: ["Chatbots de IA", "Agentes WhatsApp", "Automatización de procesos", "Análisis de datos", "ML", "NLP"],
    icon: "🤖"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30 relative">
      <ParticlesBackground particleColor="#6366f1" opacity={0.05} />
      
      {/* Hero Section */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="h1-hero mb-6">Sobre <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Outliers Academy</span></h1>
            <p className="p-lead max-w-3xl mx-auto">
              Somos una empresa especializada en diseño, desarrollo de software e inteligencia artificial. 
              Diseñamos tu marca, hacemos crecer tu presencia online, aumentamos tus ventas y optimizamos 
              tus procesos con software e inteligencia artificial.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
              <p className="text-neutral-700 leading-relaxed">
                Transformar negocios a través de la innovación tecnológica, combinando diseño excepcional 
                con desarrollo de software de vanguardia e inteligencia artificial para crear soluciones 
                que generen impacto real y duradero.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
              <p className="text-neutral-700 leading-relaxed">
                Ser la empresa líder en soluciones tecnológicas integrales, reconocida por nuestra capacidad 
                de innovar y por ayudar a las empresas a alcanzar su máximo potencial a través de la 
                transformación digital y la inteligencia artificial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-white relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">Nuestros <span className="text-primary">Servicios</span></h2>
            <p className="p-lead max-w-2xl mx-auto">
              Diseñamos soluciones inteligentes que combinan diseño, automatización e inteligencia artificial 
              para ayudarte a transformar tu negocio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-neutral-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">Nuestro <span className="text-primary">Equipo</span></h2>
            <p className="p-lead max-w-2xl mx-auto">
              Conoce a los profesionales que hacen posible la transformación digital de tu negocio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {member.department}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-accent font-semibold mb-3">{member.role}</p>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">{member.description}</p>
                    <Link 
                      href={member.linkedIn} 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para transformar tu negocio?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Contáctanos y descubre cómo podemos ayudarte a alcanzar tus objetivos con nuestras soluciones 
                de diseño, desarrollo y automatización con IA.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="https://wa.me/+51999999999" 
                  target="_blank"
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085"/>
                  </svg>
                  Contactar por WhatsApp
                </Link>
                <Link 
                  href="mailto:info@outliers.academy" 
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enviar Email
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