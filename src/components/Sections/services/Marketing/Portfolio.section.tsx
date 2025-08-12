import { ProjectCard } from "@/components";
import { projectMeta } from "@/data";


export const PortfolioSection = () => {

  const translatedProjects = [
    {
      title: 'E-commerce Platform',
      subtitle: 'Plataforma completa de comercio electrónico',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Marketing Automation',
      subtitle: 'Sistema de automatización de marketing digital',
      technologies: ['Python', 'Django', 'PostgreSQL']
    },
    {
      title: 'Analytics Dashboard',
      subtitle: 'Dashboard de análisis y métricas',
      technologies: ['Vue.js', 'Express', 'Redis']
    }
  ];

  return (
    <section
      id="portfolio"
      className="pt-0 mb-20 w-full overflow-hidden text-gray-600 dark:text-gray-300 leading-relaxed"
      aria-label="Portfolio Projects"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(() => {
            const total = projectMeta.length
            const lastCount = total % 3 === 0 ? 3 : total % 3
            return projectMeta.map((meta, idx) => {
              const isLastRow = idx >= total - lastCount
              const isFirstOfLast = isLastRow && (idx === total - lastCount)
              const offsetClass = isFirstOfLast && lastCount < 3
                ? 'lg:col-start-2'
                : ''
              return (
                <div key={meta.id} className={offsetClass}>
                  <ProjectCard
                    id={meta.id}
                    title={translatedProjects[idx]?.title || ''}
                    subtitle={translatedProjects[idx]?.subtitle || ''}
                    imageUrl={meta.imageUrl}
                    videoUrl={meta.videoUrl}
                    link={meta.link}
                    date={meta.date}
                    technologies={(translatedProjects[idx]?.technologies || []).map(name => ({ name }))}
                  />
                </div>
              )
            })
          })()}
        </div>
      </div>
    </section>
  );
};
