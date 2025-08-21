'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface ProfileCarouselProps {
  className?: string
}

export const ProfileCarousel = ({ className = '' }: ProfileCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations('courses.ui')

  const profiles = [
    {
      id: 'adriandiazmarro',
      image: '/images/adriandiazmarro-ia.webp',
      name: 'Adrian Díaz',
      role: 'Marketing Specialist',
      description: {
        es: 'Transformó su negocio con estrategias de IA',
        en: 'Transformed his business with AI strategies'
      }
    },
    {
      id: 'carolinaoleas',
      image: '/images/carolinaoleascpa-ia.webp',
      name: 'Carolina Oleas',
      role: 'CPA & Financial Advisor',
      description: {
        es: 'Automatizó sus procesos contables',
        en: 'Automated her accounting processes'
      }
    },
    {
      id: 'dcarlos',
      image: '/images/dcarlos-ia.webp',
      name: 'Carlos D.',
      role: 'Shoe Repair Expert',
      description: {
        es: 'Modernizó su taller con tecnología',
        en: 'Modernized his workshop with technology'
      }
    },
    {
      id: 'fashionbutton',
      image: '/images/fashionbutton-ia.webp',
      name: 'Fashion Button',
      role: 'Fashion Brand',
      description: {
        es: 'Revolucionó su e-commerce',
        en: 'Revolutionized their e-commerce'
      }
    },
    {
      id: 'marcelogallardo',
      image: '/images/marcelogallardoburga-ia.webp',
      name: 'Marcelo Gallardo',
      role: 'Business Consultant',
      description: {
        es: 'Optimizó su consultoría',
        en: 'Optimized his consultancy'
      }
    },
    {
      id: 'ryomori',
      image: '/images/ryomori-ia.webp',
      name: 'Ryo Mori',
      role: 'Tech Entrepreneur',
      description: {
        es: 'Escaló su startup',
        en: 'Scaled his startup'
      }
    },
    {
      id: 'thegivecircle',
      image: '/images/thegivecircle-ia.webp',
      name: 'The Give Circle',
      role: 'Non-Profit Organization',
      description: {
        es: 'Amplificó su impacto social',
        en: 'Amplified their social impact'
      }
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [profiles.length])

  const currentProfile = profiles[currentIndex]
  const locale = typeof window !== 'undefined' ? (window.location.pathname.includes('/en') ? 'en' : 'es') : 'es'

  return (
    <div className={`relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 rounded-2xl"></div>
      
      {/* Profile container */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-6"
          >
            {/* Profile image */}
            <div className="relative mx-auto w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1">
                <div className="w-full h-full bg-background rounded-full p-2">
                  <Image
                    src={currentProfile.image}
                    alt={currentProfile.name}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover rounded-full"
                    priority={currentIndex === 0}
                  />
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                IA
              </div>
            </div>

            {/* Profile info */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                {currentProfile.name}
              </h3>
              <p className="text-sm md:text-base text-primary font-medium">
                {currentProfile.role}
              </p>
              <p className="text-sm md:text-base text-muted-foreground max-w-xs mx-auto">
                {currentProfile.description[locale as 'es' | 'en']}
              </p>
            </div>

            {/* Success indicator */}
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {t('successfulTransformation')}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {profiles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Ver perfil ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-tl from-primary/20 to-accent/20 rounded-full blur-xl"></div>
    </div>
  )
}
