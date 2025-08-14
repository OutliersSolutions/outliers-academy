import React from 'react';

export interface Testimonial {
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

export const testimonials: Testimonial[] = [
  {
    initial: "A",
    name: "Adrian Díaz",
    position: "CEO",
    company: "Fashion Button",
    fullTestimonial: "La colaboración con Outliers Academy ha transformado completamente nuestro negocio. Su enfoque en inteligencia artificial y automatización nos ha permitido escalar de manera exponencial, aumentando nuestras ventas en un 300% en solo 6 meses. El equipo demostró un nivel de expertise excepcional.",
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
    fullTestimonial: "Outliers Academy revolucionó nuestros procesos contables. La implementación de sus sistemas de automatización redujo nuestros tiempos de procesamiento en un 70% y eliminó errores manuales. Ahora podemos atender más clientes con mayor precisión y eficiencia.",
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
    fullTestimonial: "El trabajo de Outliers Academy en nuestro ecosistema digital ha sido excepcional. Su capacidad para integrar soluciones de inteligencia artificial en nuestros procesos de marketing digital nos ha dado una ventaja competitiva significativa en el mercado.",
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