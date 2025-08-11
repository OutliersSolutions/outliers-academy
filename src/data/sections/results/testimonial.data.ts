export const testimonials = [
    {
        name: "Alejandra Martínez",
        initial: "A",
        position: "CMO",
        company: "TechVision",
        shortTestimonial:
            "Outliers transformó nuestra presencia digital con un enfoque que combina código visionario y estrategia de marketing.",
        fullTestimonial:
            "Cuando llegamos a Outliers Solutions, nuestra presencia digital era prácticamente inexistente. En solo 3 meses, no solo desarrollaron una plataforma que refleja perfectamente nuestra visión, sino que implementaron una estrategia de marketing digital que aumentó nuestro tráfico en un 215% y nuestras conversiones en un 87%. Su enfoque que combina código visionario con estrategia de marketing es exactamente lo que necesitábamos.",
        challenge: "Presencia digital inexistente y falta de estrategia de marketing cohesiva.",
        solution: "Desarrollo de plataforma digital integrada con estrategia de marketing omnicanal.",
        impact: "215% aumento en tráfico, 87% incremento en conversiones en 3 meses.",
        icon: "📈",
    },
    {
        name: "Carlos Rodríguez",
        initial: "C",
        position: "Fundador & CEO",
        company: "Innovatech",
        shortTestimonial:
            "Pasamos de startup desconocida a referente en nuestro sector gracias a la visión estratégica del equipo de Outliers.",
        fullTestimonial:
            "Como startup, teníamos grandes ideas pero nos faltaba la capacidad técnica y estratégica para ejecutarlas. El equipo de Outliers no solo entendió nuestra visión, sino que la elevó a un nivel que no creíamos posible. Desarrollaron una plataforma que ha revolucionado cómo nuestros clientes interactúan con nuestro servicio, y su estrategia de posicionamiento nos ha convertido en un referente en nuestro sector. La inversión ha tenido un ROI de 340% en el primer año.",
        challenge: "Startup con grandes ideas pero sin capacidad técnica para ejecutarlas.",
        solution: "Desarrollo de plataforma innovadora y estrategia de posicionamiento sectorial.",
        impact: "340% ROI en el primer año y posicionamiento como referente en el sector.",
        icon: "🚀",
    },
    {
        name: "Laura Sánchez",
        initial: "L",
        position: "Directora de Innovación",
        company: "Digital Growth",
        shortTestimonial:
            "La metodología de Outliers nos permitió escalar nuestras operaciones digitales de forma sostenible y con impacto real.",
        fullTestimonial:
            "Necesitábamos escalar nuestras operaciones digitales pero nos enfrentábamos a problemas de rendimiento y experiencia de usuario inconsistente. Outliers Solutions implementó una arquitectura escalable que no solo resolvió nuestros problemas técnicos, sino que mejoró drásticamente la experiencia de nuestros usuarios. Su enfoque en métricas clave y optimización continua ha resultado en un aumento del 67% en el tiempo de permanencia y una reducción del 43% en la tasa de rebote.",
        challenge: "Problemas de escalabilidad, rendimiento y experiencia de usuario inconsistente.",
        solution: "Implementación de arquitectura escalable con enfoque en UX y métricas clave.",
        impact: "67% aumento en tiempo de permanencia, 43% reducción en tasa de rebote.",
        icon: "⚡",
    },
    {
        name: "Miguel Torres",
        initial: "M",
        position: "Director de Transformación Digital",
        company: "Grupo Empresarial Nexus",
        shortTestimonial: "Outliers no solo ejecuta, sino que educa. Transformaron nuestra cultura digital desde dentro.",
        fullTestimonial:
            "Como empresa tradicional, nuestra transformación digital era un desafío no solo técnico sino cultural. El equipo de Outliers no solo implementó soluciones tecnológicas avanzadas, sino que trabajó codo a codo con nuestros equipos, capacitándolos y transformando nuestra cultura organizacional. El resultado ha sido una adopción tecnológica sin precedentes y un aumento del 78% en la eficiencia operativa. Han sido verdaderos partners estratégicos en nuestro viaje de transformación.",
        challenge: "Empresa tradicional con resistencia al cambio y baja adopción tecnológica.",
        solution: "Implementación tecnológica combinada con transformación cultural y capacitación.",
        impact: "78% aumento en eficiencia operativa y adopción tecnológica sin precedentes.",
        icon: "🔄",
    },
]

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
}

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
}

export const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
}