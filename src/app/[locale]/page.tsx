import Link from 'next/link';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
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
  //TODO MAKE THIS DYNAMIC, USE A SERVER COMPONENT TO FETCH DYNAMIC DATA
  // Images for the carousel - optimized WebP format (131 total images)
  const carouselImages = [
    // Groups & Professionals

    
    // Students
    '/images/carousel/peruvian-students-1.webp',
    '/images/carousel/students-2708.webp',
    '/images/carousel/students-2709.webp',
    '/images/carousel/students-2710.webp',
    '/images/carousel/students-2711.webp',
    '/images/carousel/students-2712.webp',
    '/images/carousel/students-2713.webp',
    '/images/carousel/students-2714.webp',
    '/images/carousel/students-2715.webp',
    '/images/carousel/students-2717.webp',
    '/images/carousel/students-2718.webp',
    
    // Programmers
    '/images/carousel/peruvian-programmers-1.webp',
    '/images/carousel/programmers-2720.webp',
    '/images/carousel/programmers-2721.webp',
    '/images/carousel/programmers-2722.webp',
    '/images/carousel/programmers-2723.webp',
    '/images/carousel/programmers-2724.webp',
    '/images/carousel/programmers-2725.webp',
    '/images/carousel/programmers-2726.webp',
    
    // 3D & Special Effects
    '/images/carousel/3d-2716.webp',
    
    // Retro/80s Style
    '/images/carousel/retro-2734.webp',
    '/images/carousel/retro-2735.webp',
    '/images/carousel/retro-2736.webp',
    '/images/carousel/retro-2737.webp',
    '/images/carousel/retro-2738.webp',
    '/images/carousel/retro-2739.webp',
    '/images/carousel/retro-2740.webp',
    '/images/carousel/retro-2741.webp',
    '/images/carousel/retro-2742.webp',
    '/images/carousel/retro-2743.webp',
    
    // Candid Photography
    '/images/carousel/candid-group-1.webp',
    '/images/carousel/candid-2612.webp',
    '/images/carousel/candid-2613.webp',
    '/images/carousel/candid-2614.webp',
    '/images/carousel/candid-2615.webp',
    '/images/carousel/candid-2616.webp',
    '/images/carousel/candid-2617.webp',
    '/images/carousel/candid-2618.webp',
    '/images/carousel/candid-2619.webp',
    '/images/carousel/candid-2620.webp',
    '/images/carousel/candid-2621.webp',
    '/images/carousel/candid-2622.webp',
    '/images/carousel/candid-2623.webp',
    '/images/carousel/candid-2624.webp',
    '/images/carousel/candid-group-2.webp',
    '/images/carousel/candid-2626.webp',
    '/images/carousel/candid-2627.webp',
    '/images/carousel/candid-2628.webp',
    '/images/carousel/candid-2629.webp',
    '/images/carousel/candid-2630.webp',
    '/images/carousel/candid-2631.webp',
    '/images/carousel/candid-2632.webp',
    '/images/carousel/candid-2633.webp',
    '/images/carousel/candid-2634.webp',
    '/images/carousel/candid-2635.webp',
    '/images/carousel/candid-2636.webp',
    '/images/carousel/candid-2637.webp',
    '/images/carousel/candid-2638.webp',
    '/images/carousel/candid-2639.webp',
    '/images/carousel/candid-2640.webp',
    '/images/carousel/candid-2641.webp',
    '/images/carousel/candid-2642.webp',
    '/images/carousel/candid-2643.webp',
    '/images/carousel/candid-2644.webp',
    '/images/carousel/candid-2645.webp',
    '/images/carousel/candid-2646.webp',
    '/images/carousel/candid-2647.webp',
    '/images/carousel/candid-2648.webp',
    '/images/carousel/candid-2649.webp',
    '/images/carousel/candid-group-3.webp',
    '/images/carousel/candid-2651.webp',
    '/images/carousel/candid-2652.webp',
    '/images/carousel/candid-2653.webp',
    '/images/carousel/candid-2654.webp',
    '/images/carousel/candid-2655.webp',
    '/images/carousel/candid-2656.webp',
    '/images/carousel/candid-2657.webp',
    '/images/carousel/candid-2658.webp',
    '/images/carousel/candid-2659.webp',
    '/images/carousel/candid-2660.webp',
    '/images/carousel/candid-2661.webp',
    '/images/carousel/candid-2662.webp',
    '/images/carousel/candid-2663.webp',
    '/images/carousel/candid-2664.webp',
    '/images/carousel/candid-2665.webp',
    '/images/carousel/candid-2666.webp',
    '/images/carousel/candid-2667.webp',
    '/images/carousel/candid-2668.webp',
    '/images/carousel/candid-2669.webp',
    '/images/carousel/candid-group-4.webp',
    '/images/carousel/candid-2671.webp',
    '/images/carousel/candid-2672.webp',
    '/images/carousel/candid-2673.webp',
    '/images/carousel/candid-2674.webp',
    '/images/carousel/candid-2675.webp',
    '/images/carousel/candid-2676.webp',
    '/images/carousel/candid-2677.webp',
    '/images/carousel/candid-2678.webp',
    '/images/carousel/candid-2679.webp',
    '/images/carousel/candid-2680.webp',
    '/images/carousel/candid-2681.webp',
    '/images/carousel/candid-2682.webp',
    '/images/carousel/candid-2683.webp',
    '/images/carousel/candid-2684.webp',
    '/images/carousel/candid-2685.webp',
    '/images/carousel/candid-2686.webp',
    '/images/carousel/candid-2687.webp',
    '/images/carousel/candid-2688.webp',
    '/images/carousel/candid-2689.webp',
    '/images/carousel/candid-2690.webp',
    '/images/carousel/candid-2691.webp',
    '/images/carousel/candid-2692.webp',
    '/images/carousel/candid-2693.webp',
    '/images/carousel/candid-2694.webp',
    '/images/carousel/candid-2699.webp',
    '/images/carousel/candid-2700.webp',
    '/images/carousel/candid-2701.webp',
    '/images/carousel/candid-2702.webp',
    '/images/carousel/candid-2703.webp',
    '/images/carousel/candid-2704.webp',
    '/images/carousel/candid-2705.webp',
    '/images/carousel/candid-2706.webp',
    '/images/carousel/candid-2727.webp',
    '/images/carousel/candid-2728.webp',
    '/images/carousel/candid-2729.webp',
    '/images/carousel/candid-2730.webp',
    '/images/carousel/candid-2731.webp'
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
                className="w-full h-[650px] rounded-2xl"
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