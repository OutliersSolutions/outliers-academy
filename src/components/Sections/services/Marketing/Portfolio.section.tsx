import { ProjectCard } from "@/components";

interface ProjectInterface {
  id: number;
  imageUrl: string;
  videoUrl?: string;
  link: string;
  date: string;
}

// Datos hardcodeados temporalmente - TODO: traer del backend
const projectMeta: ProjectInterface[] = [
  {
    id: 1,
    imageUrl: "/images/fashionbutton-ia.webp",
    videoUrl: "/videos/fashionbutton-demo.mp4",
    link: "https://fashionbutton.pe/",
    date: "2024-07-15",
  },
  {
    id: 2,
    imageUrl: "/images/carolinaoleascpa-ia.webp",
    videoUrl: "/videos/carolinaoleas-demo.mp4",
    link: "https://carolinaoleascpa.com/en/",
    date: "2025-01-03",
  },
  {
    id: 3,
    imageUrl: "/images/marcelogallardoburga-ia.webp",
    videoUrl: "/videos/marcelogallardo-demo.mp4",
    link: "https://marcelogallardob.github.io/",
    date: "2025-03-09",
  },
  {
    id: 4,
    imageUrl: "/images/thegivecircle-ia.webp",
    videoUrl: "/videos/TheGiveCircle-demo.mp4",
    link: "https://thegivecircle.org/",
    date: "2025-01-21",
  },
  {
    id: 5,
    imageUrl: "/images/dcarlos-ia.webp",
    videoUrl: "/videos/dcarlosshoereapair-demo.mp4",
    link: "https://dcarlosshoerepair.com/",
    date: "2025-02-12",
  },
  {
    id: 6,
    imageUrl: "/images/ryomori-ia.webp",
    link: "https://ryomori.com/",
    date: "2025-05-05",
  },
];


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
