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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black relative">
      <ParticlesBackground particleColor="#6366f1" opacity={0.05} />
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-50/30 to-pink-50/20 dark:from-blue-600/30 dark:via-purple-600/20 dark:to-pink-600/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-transparent dark:from-blue-400/40 dark:via-purple-500/30 dark:to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-200/50 via-purple-200/30 to-transparent dark:from-pink-400/30 dark:via-purple-400/20 dark:to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Hero Section with Empire State Building */}
      <section className="relative py-20 md:py-28 overflow-hidden z-10">
        {/* Empire State Building Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/95 via-gray-50/90 to-gray-50/80 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/80"></div>
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
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-200 bg-clip-text text-transparent">
                  {t('title')}
                </span>{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  <GlitchText className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Outliers Academy
                  </GlitchText>
                </span>
              </h1>
              <p className="text-xl font-sans text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed font-medium">
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
      <section className="relative py-16 md:py-20 z-10">
        <CanvasDots id="missionVisionCanvas" margin={40} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Misión */}
            <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-10 border border-gray-200/50 dark:border-white/20 hover:border-gray-300/70 dark:hover:border-white/30 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t('mission.title') || 'Nuestra Misión'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t('mission.description') || 'Transformar la educación tecnológica proporcionando cursos prácticos y actualizados que preparen a los estudiantes para los desafíos del mundo digital moderno.'}
              </p>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            </div>
            
            {/* Visión */}
            <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-10 border border-gray-200/50 dark:border-white/20 hover:border-gray-300/70 dark:hover:border-white/30 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {t('vision.title') || 'Nuestra Visión'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t('vision.description') || 'Ser la plataforma de educación tecnológica líder en América Latina, reconocida por la excelencia académica y la formación de profesionales que impulsan la innovación digital.'}
              </p>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 via-pink-400/0 to-blue-400/0 group-hover:from-purple-400/10 group-hover:via-pink-400/5 group-hover:to-blue-400/10 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 md:py-20 z-10">
        <CanvasDots id="teamCanvas" margin={40} />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <GlitchText className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {t('team.title') || 'Nuestro Equipo'}
                </GlitchText>
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
              {t('team.description') || 'Un grupo de profesionales apasionados por crear soluciones tecnológicas que transforman negocios y mejoran experiencias.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-200/50 dark:border-white/20 hover:border-gray-300/70 dark:hover:border-white/30">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <div className="mb-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold">
                        {member.department}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors text-gray-900 dark:text-gray-100">{member.name}</h3>
                    <p className="text-accent font-bold mb-4 text-lg">{member.role}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">{member.description}</p>
                    <Link 
                      href={member.linkedIn} 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
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