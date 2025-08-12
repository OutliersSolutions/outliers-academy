import Link from 'next/link';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {CourseGrid} from '@/components/CourseGrid';
import {ChatbotViewerSafe} from '@/components/ChatbotViewerSafe';
import dynamic from 'next/dynamic';

const ParticlesBackground = dynamic(() => import('@/components/ui/ParticlesBackground').then(mod => ({ default: mod.ParticlesBackground })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full z-0" />
});
import {AcademyStats} from '@/components/AcademyStats';
import {ArrowIcon} from '@/components/ui/ArrowIcon';
import {AnimatedTextWrapper} from '@/components/ui/AnimatedTextWrapper';
import {technologies} from '@/data/technologies';
import type {Route} from 'next';


export function generateStaticParams() {
  return [{locale: 'es'}, {locale: 'en'}];
}

export default async function HomePage({
  params
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('home');

  return (
    <div>
      <section className="hero-gradient relative overflow-hidden">
        <ParticlesBackground particleColor="#ff5a1f" opacity={0.7} particleSize={3.5} drawLines={false} density={6000} className="absolute inset-0 w-full h-full z-0" />
        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-text mb-6">
                <span className="h-2 w-2 rounded-full animate-pulse" style={{background: 'var(--color-yellow)'}} /> 
                {t('badge')}
              </span>
              
              <h1 className="h1-hero mb-6">
                <span className="inline-block mr-2">{t('headline.animated.baseText')}</span>
                <AnimatedTextWrapper 
                  baseText=""
                  words={t.raw('headline.animated.words')}
                  effect="typing"
                  typingSpeed={150}
                  deletingSpeed={100}
                  pauseDuration={3000}
                  className="h1-hero"
                />
              </h1>
              
              <p className="p-lead mb-8 max-w-xl">{t('subhead')}</p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link href={`/${params.locale}/catalog` as Route} className="btn-primary btn-lg group">
                  {t('cta.primary')}
                  <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href={`/${params.locale}/about` as Route} className="btn-secondary group">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14  .828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6" />
                  </svg>
                  {t('cta.secondary')}
                </Link>
              </div>

              <AcademyStats locale={params.locale} />
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="h-80 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg mb-4 relative overflow-hidden">
                    <ChatbotViewerSafe className="w-full h-full" />
                    
                    <div className="absolute top-4 right-4 text-xs text-neutral-500 bg-white px-2 py-1 rounded-full">
                      {t('aiAssistant')}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded"></div>
                    <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-accent text-white rounded-lg px-3 py-2 text-sm font-semibold shadow-lg">
                {t('interactiveAI')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full translate-y-20 -translate-x-20"></div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">{t('topCourses')}</h2>
            <p className="p-lead max-w-2xl mx-auto">{t('topCoursesDesc')}</p>
          </div>
          <CourseGrid />
          
          <div className="text-center mt-12">
            <Link href={`/${params.locale}/catalog` as Route} className="btn-outline">
              {t('viewAllCourses')}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-surface to-secondary/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">{t('platform.title')}</h2>
            <p className="p-lead max-w-2xl mx-auto">{t('platform.subhead')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{t('platform.guidance.title')}</h3>
                <p className="p-lead text-neutral-600">{t('platform.guidance.desc')}</p>
              </div>
            </div>
            
            <div className="group">
              <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{t('platform.editor.title')}</h3>
                <p className="p-lead text-neutral-600">{t('platform.editor.desc')}</p>
              </div>
            </div>
            
            <div className="group">
              <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{t('platform.live.title')}</h3>
                <p className="p-lead text-neutral-600">{t('platform.live.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{t('technologies.title')}</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">{t('technologies.subhead')}</p>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity duration-500">
            {technologies.map((tech, index) => (
              <div key={tech.name} className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-8 h-8 object-contain"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                </div>
                <span className="text-xs font-medium text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('ctaSection.title')}</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{t('ctaSection.desc')}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/${params.locale}/catalog` as Route} className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  {t('ctaSection.primary')}
                </Link>
                <Link href={`/${params.locale}/pricing` as Route} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
                  {t('ctaSection.secondary')}
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