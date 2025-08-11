import { Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/sections/results/testimonial.data";

const brandColors = {
  primary: "bg-coral-500",
  textPrimary: "text-coral-500",
  softGray: "text-gray-500 dark:text-gray-400",
};

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
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
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
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
