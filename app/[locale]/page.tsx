import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {CourseGrid} from '@/components/CourseGrid';
import type {Route} from 'next';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div>
      <section className="hero-gradient">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-text">
              <span className="h-2 w-2 rounded-full" style={{background: 'var(--color-yellow)'}} /> {t('badge')}
            </span>
            <h1 className="h1-hero mt-6">
              {t('headline.part1')} <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'}}>{t('headline.highlight')}</span> {t('headline.part2')}
            </h1>
            <p className="p-lead mt-6 max-w-2xl">{t('subhead')}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={"/es/catalog" as Route} className="btn-primary">{t('cta.primary')}</Link>
              <Link href={"/es/about" as Route} className="btn-secondary">{t('cta.secondary')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="h2-section">{t('topCourses')}</h2>
          <p className="p-lead mt-2">{t('topCoursesDesc')}</p>
          <div className="mt-10">
            <CourseGrid />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <h2 className="h2-section">{t('platform.title')}</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-lg">{t('platform.guidance.title')}</h3>
              <p className="p-lead mt-2">{t('platform.guidance.desc')}</p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-lg">{t('platform.editor.title')}</h3>
              <p className="p-lead mt-2">{t('platform.editor.desc')}</p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-lg">{t('platform.live.title')}</h3>
              <p className="p-lead mt-2">{t('platform.live.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 