import React, { useRef } from 'react';
import Link from 'next/link';
import { Badge } from '../Badge.component';


export interface Technology {
  name: string;
  color?: string;
}

export interface ProjectInterface {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string;
  technologies: Technology[];
  date: string;
  link: string;
}

export const ProjectCard: React.FC<ProjectInterface> = ({
  id,
  title,
  subtitle,
  technologies,
  imageUrl,
  videoUrl,
  date,
  link
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <Link
      key={id}
      href={link}
      target='_blank'
      className="relative h-[800px] overflow-visible group flex flex-col bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-2xl"
      onMouseEnter={handleMouseEnter}
    >
      {/* Imagen + video */}
      <div className="relative h-[85%] w-full overflow-hidden rounded-tl-xl rounded-tr-xl">
        {/* Imagen */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Video al hacer hover */}
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Fecha */}
        <div className="absolute right-0 z-10">
          <div className="bg-white/20 text-white backdrop-blur-md text-xs m-4 py-1 px-3 font-semibold transform rounded-full opacity-0 group-hover:opacity-100 shadow-sm dark:bg-gray-700/40 dark:text-gray-100 dark:backdrop-blur">
            {date}
          </div>
        </div>

        {/* Tags visibles siempre */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <Badge
              key={idx+1}
              className="text-xs font-medium py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-md border shadow-sm dark:bg-gray-700/40 dark:border-gray-500 dark:text-gray-100"
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Texto debajo de la imagen */}
      <div className="p-5 flex flex-col h-fit justify-start">
        <h3 className="font-bold text-md text-neutral-900 mb-1 uppercase tracking-wide dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 leading-snug dark:text-gray-400">
          {subtitle}
        </p>
      </div>
    </Link>
  );
};
