import { Quote } from "lucide-react";
import { useState, useEffect } from "react";
import React from 'react';

interface Testimonial {
  initial: string;
  name: string;
  position: string;
  company: string;
  fullTestimonial: string;
  videoUrl: string;
  image: string;
  icon: React.ReactNode;
  challenge: string;
  impact: string;
}

// Datos hardcodeados temporalmente - TODO: traer del backend
const testimonials: Testimonial[] = [
  {
    initial: "A",
    name: "Adrian Díaz",
    position: "CEO",
    company: "Fashion Button",
    fullTestimonial: "La colaboración con Outliers Academy ha transformado completamente nuestro negocio. Su enfoque en inteligencia artificial y automatización nos ha permitido escalar de manera exponencial, aumentando nuestras ventas en un 300% en solo 6 meses.",
    videoUrl: "/videos/adriandiaz-demo.mp4",
    image: "/images/adriandiazmarro-ia.webp",
    icon: (
      <svg className="w-8 h-8 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    challenge: "Ventas limitadas y procesos manuales",
    impact: "+300% en ventas en 6 meses"
  },
  {
    initial: "C",
    name: "Carolina Oleas",
    position: "Directora",
    company: "CPA Services",
    fullTestimonial: "Outliers Academy revolucionó nuestros procesos contables. La implementación de sus sistemas de automatización redujo nuestros tiempos de procesamiento en un 70% y eliminó errores manuales.",
    videoUrl: "/videos/carolinaoleas-demo.mp4",
    image: "/images/carolinaoleascpa-ia.webp",
    icon: (
      <svg className="w-8 h-8 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    challenge: "Procesos contables manuales y errores",
    impact: "-70% tiempo de procesamiento"
  },
  {
    initial: "M",
    name: "Marcelo Gallardo",
    position: "Fundador",
    company: "Digital Agency",
    fullTestimonial: "El trabajo de Outliers Academy en nuestro ecosistema digital ha sido excepcional. Su capacidad para integrar soluciones de inteligencia artificial en nuestros procesos de marketing digital nos ha dado una ventaja competitiva significativa.",
    videoUrl: "/videos/marcelogallardo-demo.mp4",
    image: "/images/marcelogallardoburga-ia.webp",
    icon: (
      <svg className="w-8 h-8 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    challenge: "Falta de ventaja competitiva digital",
    impact: "Liderazgo en marketing con IA"
  }
];

const brandColors = {
  primary: "bg-coral-500",
  textPrimary: "text-coral-500",
  softGray: "text-gray-500 dark:text-gray-400",
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = testimonial.fullTestimonial.split(" ");
  const shortQuote = words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");

  return (
    <article
      key={index}
      className="relative bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center animate-scale-in hover:shadow-2xl transition-shadow"
    >
      <span className="absolute -top-6 bg-white dark:bg-gray-800 rounded-full p-2 shadow">
        <Quote className={`${brandColors.textPrimary} w-6 h-6`} />
      </span>
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white font-bold text-xl mb-4">
        {testimonial.initial}
      </div>
      <div className="text-center mb-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
          {testimonial.name}
        </h3>
        <p className={`text-sm ${brandColors.softGray} mb-2`}>
          {testimonial.position}
        </p>
        <p className={`text-xs ${brandColors.textPrimary} font-medium`}>
          {testimonial.company}
        </p>
      </div>
      <blockquote className="text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-6 text-sm">
        {isExpanded ? testimonial.fullTestimonial : shortQuote}
      </blockquote>
      {words.length > 30 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-sm ${brandColors.textPrimary} hover:underline font-medium transition-colors`}
        >
          {isExpanded ? "Leer menos" : "Leer más"}
        </button>
      )}
      <div className="mt-4 text-center">
        <div className="flex justify-center items-center text-2xl mb-2">
          {testimonial.icon}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <div className="font-semibold">Desafío:</div>
          <div className="mb-2">{testimonial.challenge}</div>
          <div className="font-semibold">Impacto:</div>
          <div className="text-green-600 dark:text-green-400">{testimonial.impact}</div>
        </div>
      </div>
    </article>
  );
};

export const TestimonialSection = () => {
  return (
    <section className="py-32 sm:py-32 md:py-32 lg:py-40 xl:py-40 w-full overflow-hidden text-gray-600 dark:text-gray-300 leading-relaxed">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-heading font-extrabold tracking-tight text-gray-900 dark:text-white">
            Lo que dicen nuestros <span className="text-coral-500">clientes</span>
          </h1>
          <p className={`text-lg ${brandColors.softGray} mb-4 mt-2`}>
            Testimonios reales de empresas que han transformado su negocio con nosotros
          </p>
          <div className="flex justify-center">
            <span className={`block h-1 w-24 rounded-full ${brandColors.primary}`} />
          </div>
        </div>

        {/* Testimonios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
