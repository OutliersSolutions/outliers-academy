import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedColumn, BenefitChip } from "@/components";
import { useThemeState } from "@/hooks/useTheme";
import { SquareArrowOutUpRight, Bot, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// Datos hardcodeados temporalmente - TODO: traer del backend
const benefits = [
  { icon: Bot, text: "Automatización inteligente" },
  { icon: MessageSquare, text: "Respuestas instantáneas" },
  { icon: Zap, text: "Disponibilidad 24/7" }
];

const column1Icons = [
  { name: "Bot", label: "Chatbot AI" },
  { name: "MessageSquare", label: "Mensajes" }
];
const column2Icons = [
  { name: "Zap", label: "Velocidad" },
  { name: "Bot", label: "Automatización" }
];
const column3Icons = [
  { name: "MessageSquare", label: "Comunicación" },
  { name: "Zap", label: "Eficiencia" }
];

export const HeroAgentsAiSection = () => {
  const { theme } = useThemeState();
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState<string | null>(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const benefitsRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true });
  const isSubtitleInView = useInView(subtitleRef, { once: true });
  const isButtonsInView = useInView(buttonsRef, { once: true });
  const isBenefitsInView = useInView(benefitsRef, { once: true });

  const benefitsList = benefits.map(b => b.text);

  return (
    <section className="pt-8 sm:pt-8 md:pt-10 lg:pt-15 xl:pt-16 w-full overflow-hidden flex items-center text-gray-600 dark:text-gray-300 leading-relaxed">
      {/* Floating elements */}
      <motion.div
        className="absolute left-[5%] top-[15%] h-32 w-32 rounded-full bg-[#FF6B6B]/5"
        animate={{
          y: [0, -10, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] h-24 w-24 rounded-full bg-[#FF6B6B]/10"
        animate={{
          y: [0, 15, 0],
          transition: {
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />
      <motion.div
        className="absolute left-[15%] top-[60%] h-16 w-16 rounded-full bg-[#FF6B6B]/5"
        animate={{
          y: [0, -15, 0],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />

      {/* Dots */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-coral"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid gap-4 md:gap-8 lg:gap-16 xl:gap-20 grid-cols-1 lg:grid-cols-2 items-center relative">
          {/* Left content */}
          <div className="relative z-20 space-y-8">
            {/* Título */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-1 w-10 rounded-full bg-coral" />
                <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                  {t("ai_agents.hero_section.section_label")}
                </p>
              </div>
              <h1
                className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-heading font-extrabold tracking-tight text-gray-900 dark:text-white filter drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                dangerouslySetInnerHTML={{
                  __html: t("ai_agents.hero_section.title"),
                }}
              />
            </motion.div>

            {/* Subtítulo */}
            <motion.p
              ref={subtitleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isSubtitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg"
            >
              {t("ai_agents.hero_section.description")}
            </motion.p>

            {/* Botones */}
            <motion.div
              ref={buttonsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isButtonsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4"
            >
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://calendly.com/outlierssolutions108/discovery-meeting"
                className="inline-flex items-center justify-center bg-coral hover:bg-coral text-white px-4 py-3 rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-all no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral"
              >
                {t("ai_agents.hero_section.buttons.schedule_demo")}
                <SquareArrowOutUpRight className="ml-2 h-5" />
              </Link>

              <Link
                rel="noopener noreferrer"
                href="/"
                className="inline-flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:border-[#FF6B6B] hover:text-[#FF6B6B] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:text-[#FF6B6B] px-4 py-3 rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-all no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral"
              >
                {t("ai_agents.hero_section.buttons.explore_solutions")}
              </Link>
            </motion.div>

            {/* Chips de beneficios */}
            <motion.div
              ref={benefitsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-2"
            >
              {benefitsList.map((benefit, index) => {
                const IconComponent = benefits[index]?.icon;
                return (
                  <BenefitChip
                    key={index}
                    icon={IconComponent ? <IconComponent size={16} /> : null}
                    text={benefit}
                    delay={index * 0.1}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Right content */}
          <div className="w-full h-800px sm:h-800px md:h-[85vh] lg:h-800px xl:h-800px overflow-hidden absolute inset-0 opacity-30 z-0 lg:relative lg:inset-auto lg:opacity-100 lg:z-auto">
            {theme === "light" ? (
              <>
                <img
                  src="/images/vectors/light-top-gradiant.webp"
                  alt="Degradado arriba"
                  className="pointer-events-none absolute top-0 left-0 z-10 w-full h-1/3 object-cover"
                />
                <img
                  src="/images/vectors/light-bottom-gradiant.webp"
                  alt="Degradado abajo"
                  className="pointer-events-none absolute bottom-0 left-0 z-10 w-full h-1/3 object-cover"
                />
              </>
            ) : (
              <>
                <img
                  src="/images/vectors/dark-shadow-top.webp"
                  alt="Degradado arriba"
                  className="pointer-events-none absolute top-0 left-0 z-10 w-full h-1/3 object-cover"
                />
                <img
                  src="/images/vectors/dark-shadow-bottom.webp"
                  alt="Degradado abajo"
                  className="pointer-events-none absolute bottom-0 left-0 z-10 w-full h-1/3 object-cover"
                />
              </>
            )}

            <motion.div
              className="grid h-full w-full grid-cols-3 gap-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <AnimatedColumn icons={column1Icons} direction="down" />
              <AnimatedColumn icons={column2Icons} direction="up" />
              <AnimatedColumn icons={column3Icons} direction="down" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
