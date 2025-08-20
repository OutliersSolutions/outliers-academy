import Link from 'next/link';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {CourseGrid} from '@/components/CourseGrid';
import dynamic from 'next/dynamic';

const ParticlesBackground = dynamic(() => import('@/components/ui/ParticlesBackground').then(mod => ({ default: mod.ParticlesBackground })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full z-0 bg-transparent" />
});

const ImageCarousel = dynamic(() => import('@/components/ui/Backgrounds/ImageCarousel'), {
  ssr: false,
  loading: () => <div className="w-full h-80 bg-gradient-to-br from-indigo-50/20 to-purple-50/20 rounded-xl animate-pulse" />
});
import {AcademyStats} from '@/components/AcademyStats';
import {ArrowIcon} from '@/components/ui/ArrowIcon';
import {AnimatedTextWrapper} from '@/components/ui/AnimatedTextWrapper';
import {TechnologiesSection} from '@/components/TechnologiesSection';
import {CTASection} from '@/components/Sections/home/CTASection';
import {FeaturedCoursesSection} from '@/components/Sections/home/FeaturedCoursesSection';
import {LearningSection} from '@/components/Sections/home/LearningSection';
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

  // Images for the carousel - you can modify these paths
  const carouselImages = [
    '/images/adriandiazmarro-ia.webp',
    '/images/carolinaoleascpa-ia.webp',
    '/images/dcarlos-ia.webp',
    '/images/fashionbutton-ia.webp',
    '/images/marcelogallardoburga-ia.webp',
    '/images/ryomori-ia.webp',
    '/images/thegivecircle-ia.webp'
  ];

  return (
    <div>
      <section className="hero-gradient relative overflow-hidden">
        <ParticlesBackground particleColor="#ff5a1f" opacity={0.6} particleSize={3} drawLines={false} density={4500} className="absolute inset-0 w-full h-full z-0" />
        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
            <div className="flex-shrink-0 lg:w-1/2 lg:max-w-lg">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 text-primary dark:text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
                <span className="h-2 w-2 bg-primary dark:bg-primary rounded-full animate-pulse"></span> 
                <span className="font-mono">{t('badge')}</span>
              </span>
              
              <h1 className="h1-hero mb-6">
                <span className="block">{t('headline.animated.baseText')}</span>
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
            
            <div className="relative hidden lg:block flex-1 lg:min-w-0 lg:-mt-8">
              <ImageCarousel 
                images={carouselImages}
                interval={6000}
                className="w-full h-[650px] rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full translate-y-20 -translate-x-20"></div>
      </section>

      {/* Featured Courses Section */}
      <FeaturedCoursesSection 
        locale={params.locale}
        badge="FEATURED"
        title={t('topCourses')}
        description={t('topCoursesDesc')}
        viewAllText={t('viewAllCourses')}
        viewAllLink={`/${params.locale}/catalog`}
      />

      {/* Learning Section */}
      <LearningSection 
        badge="LEARNING"
        title={t('platform.title')}
        description={t('platform.subhead')}
        features={[
          {
            title: t('platform.guidance.title'),
            description: t('platform.guidance.desc'),
            icon: (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            gradient: "bg-gradient-to-br from-primary to-accent",
            hoverColor: "primary"
          },
          {
            title: t('platform.editor.title'),
            description: t('platform.editor.desc'),
            icon: (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            ),
            gradient: "bg-gradient-to-br from-accent to-gold",
            hoverColor: "accent"
          },
          {
            title: t('platform.live.title'),
            description: t('platform.live.desc'),
            icon: (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            gradient: "bg-gradient-to-br from-gold to-primary",
            hoverColor: "gold"
          }
        ]}
      />

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