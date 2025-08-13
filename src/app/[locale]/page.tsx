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
import {TechnologiesSection} from '@/components/TechnologiesSection';
import {CTASection} from '@/components/Sections/home/CTASection';
import type {Route} from 'next';
import {GlitchText} from '@/components/ui/GlitchText';

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6" />
                  </svg>
                  {t('cta.secondary')}
                </Link>
              </div>
              
              <AcademyStats locale={params.locale} />
            </div>
            
            <div className="relative">
              <ChatbotViewerSafe className="w-full h-80" />
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full translate-y-20 -translate-x-20"></div>
      </section>

      <section className="relative py-20 md:py-28 bg-gradient-to-br from-surface via-bg to-surface dark:from-surface dark:via-bg dark:to-surface overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 text-primary dark:text-primary px-6 py-3 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-pulse"></div>
              <span className="font-mono">FEATURED</span>
            </div>
            
            {/* Title with Glitch Effect */}
            <h2 className="text-4xl md:text-6xl font-bold text-text dark:text-text mb-6 leading-tight">
              <span className="bg-gradient-to-r from-text via-primary to-accent bg-clip-text text-transparent">
                {t('topCourses').split('destacados').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <GlitchText className="text-primary dark:text-primary">
                        destacados
                      </GlitchText>
                    )}
                  </span>
                ))}
              </span>
            </h2>
            
            <p className="text-xl text-muted dark:text-muted max-w-3xl mx-auto leading-relaxed">{t('topCoursesDesc')}</p>
          </div>
          
          <CourseGrid />
          
          <div className="text-center mt-12">
            <Link href={`/${params.locale}/catalog` as Route} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white dark:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/25">
              {t('viewAllCourses')}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-gradient-to-br from-surface via-bg to-surface dark:from-surface dark:via-bg dark:to-surface overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gold rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-primary rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-gold/20 backdrop-blur-sm border border-accent/30 text-accent dark:text-accent px-6 py-3 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-accent dark:bg-accent rounded-full animate-pulse"></div>
              <span className="font-mono">LEARNING</span>
            </div>
            
            {/* Title with Glitch Effect */}
            <h2 className="text-4xl md:text-6xl font-bold text-text dark:text-text mb-6 leading-tight">
              <span className="bg-gradient-to-r from-text via-accent to-gold bg-clip-text text-transparent">
                {t('platform.title').split('haciendo').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <GlitchText className="text-accent dark:text-accent">
                        haciendo
                      </GlitchText>
                    )}
                  </span>
                ))}
              </span>
            </h2>
            
            <p className="text-xl text-muted dark:text-muted max-w-3xl mx-auto leading-relaxed">{t('platform.subhead')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative bg-gradient-to-br from-surface/80 to-bg/80 backdrop-blur-sm border border-muted/50 rounded-2xl p-8 h-full hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20 dark:group-hover:shadow-primary/20">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-text dark:text-text group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">{t('platform.guidance.title')}</h3>
                  <p className="text-muted dark:text-muted">{t('platform.guidance.desc')}</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative bg-gradient-to-br from-surface/80 to-bg/80 backdrop-blur-sm border border-muted/50 rounded-2xl p-8 h-full hover:border-accent/50 dark:hover:border-accent/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-accent/20 dark:group-hover:shadow-accent/20">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-gold/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-text dark:text-text group-hover:text-accent dark:group-hover:text-accent transition-colors duration-300">{t('platform.editor.title')}</h3>
                  <p className="text-muted dark:text-muted">{t('platform.editor.desc')}</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative bg-gradient-to-br from-surface/80 to-bg/80 backdrop-blur-sm border border-muted/50 rounded-2xl p-8 h-full hover:border-gold/50 dark:hover:border-gold/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-gold/20 dark:group-hover:shadow-gold/20">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/5 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-text dark:text-text group-hover:text-gold dark:group-hover:text-gold transition-colors duration-300">{t('platform.live.title')}</h3>
                  <p className="text-muted dark:text-muted">{t('platform.live.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Technologies Section */}
      <TechnologiesSection locale={params.locale} />

      {/* CTA Section */}
      <CTASection 
        locale={params.locale}
        title={t('ctaSection.title')}
        description={t('ctaSection.desc')}
        primaryButton={t('ctaSection.primary')}
        secondaryButton={t('ctaSection.secondary')}
        primaryLink={`/${params.locale}/catalog`}
        secondaryLink={`/${params.locale}/pricing`}
      />
    </div>
  );
} 