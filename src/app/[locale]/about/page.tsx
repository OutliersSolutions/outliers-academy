import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import { GlitchText } from '@/components/ui/GlitchText';
import { CanvasDots } from '@/components/ui/CanvasDots';

const teamMembers = [
  {
    id: 1,
    name: "Brik Meza",
    role: "CEO & Founder",
    department: "Dirección",
    description: "Líder visionario con amplia experiencia en estrategia empresarial y transformación digital. Especializado en impulsar el crecimiento de empresas tecnológicas.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
  {
    id: 2,
    name: "Alvaro Mendoza",
    role: "CEO & Founder",
    department: "Dirección",
    description: "Emprendedor serial con más de 15 años de experiencia en el sector tecnológico. Experto en desarrollo de estrategias de negocio y gestión de equipos.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
  {
    id: 3,
    name: "Gonzalo Galvez",
    role: "CTO",
    department: "Tecnología",
    description: "Arquitecto de software senior especializado en soluciones cloud y aplicaciones distribuidas. Experto en tecnologías emergentes y optimización de sistemas.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  },
  {
    id: 4,
    name: "Elvis Presley",
    role: "Full Stack Developer",
    department: "Desarrollo",
    description: "Desarrollador full stack con experiencia en múltiples tecnologías. Especializado en React, Node.js y arquitecturas escalables.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    linkedIn: "https://linkedin.com/"
  }
];

export default async function AboutPage({
  params
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('about');

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30 relative">
      <ParticlesBackground particleColor="#6366f1" opacity={0.05} />
      
      {/* Hero Section with Empire State Building */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Empire State Building Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/90 to-bg/80"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-1/3 opacity-20">
            <div className="relative h-full w-full">
              {/* Empire State Building Silhouette */}
              <div className="absolute bottom-0 right-0 w-full h-full">
                {/* Main Building */}
                <div className="absolute bottom-0 right-0 w-32 h-96 bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-lg"></div>
                {/* Spire */}
                <div className="absolute bottom-96 right-14 w-4 h-32 bg-gradient-to-t from-gray-800 to-gray-600"></div>
                {/* Antenna */}
                <div className="absolute bottom-96 right-15 w-2 h-16 bg-gradient-to-t from-gray-800 to-gray-600"></div>
                {/* Windows */}
                <div className="absolute bottom-8 right-2 w-28 h-80 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-t-lg"></div>
                {/* Base */}
                <div className="absolute bottom-0 right-0 w-40 h-8 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="h1-hero mb-6">
                {t('title')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  <GlitchText className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Outliers Academy
                  </GlitchText>
                </span>
              </h1>
              <p className="p-lead max-w-xl">
                {t('description')}
              </p>
            </div>
            
            <div className="hidden lg:block">
              {/* Placeholder for future content */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-16 md:py-20">
        <CanvasDots id="missionVisionCanvas" margin={40} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text dark:text-text">{t('mission.title')}</h3>
              <p className="text-solarized-base01 dark:text-white/90 leading-relaxed">
                {t('mission.description')}
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text dark:text-text">{t('vision.title')}</h3>
              <p className="text-solarized-base01 dark:text-white/90 leading-relaxed">
                {t('vision.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 md:py-20">
        <CanvasDots id="teamCanvas" margin={40} />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <GlitchText className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {t('team.title')}
                </GlitchText>
              </span>
            </h2>
            <p className="p-lead max-w-2xl mx-auto">
              {t('team.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-white/20">
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
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors text-text dark:text-text">{member.name}</h3>
                    <p className="text-accent font-semibold mb-3">{member.role}</p>
                    <p className="text-solarized-base01 dark:text-white/80 text-sm leading-relaxed mb-4">{member.description}</p>
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
    </div>
  );
} 