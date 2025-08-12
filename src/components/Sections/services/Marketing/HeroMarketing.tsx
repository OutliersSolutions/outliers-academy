import { SquareArrowOutUpRight } from "lucide-react";
import { Button, EcommerceIllustration } from "@/components";
import { useTranslation } from "react-i18next";

export const HeroMarketingSection = () => {
  const { t } = useTranslation();

  const features = [] as string[];

  return (
    <section className="pt-8 md:pt-20 lg:pt-28 pb-20 flex items-center relative z-10 text-gray-600 dark:text-gray-300 leading-relaxed">
      <div className="absolute dot-pattern" aria-hidden="true"></div>
      <div className="container mx-auto relative z-10 p-10">
        <div className="grid gap-16 grid-cols-1 lg:grid-cols-2">
          {/* Texto resumido */}
          <div className="flex flex-col animate-fade-in">
            <h1
              className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
              dangerouslySetInnerHTML={{
                __html: t("marketing.hero_marketing_section.title"),
              }}
            />
            <p className="text-base md:text-lg mb-6">
              {t("marketing.hero_marketing_section.description")}
            </p>

            {/* Lista reducida */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-coral" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://api.whatsapp.com/send/?phone=19298226066&text=Hola%2C+me+gustar%C3%ADa+agendar+un+demo.&type=phone_number&app_absent=0"
              className="inline-flex items-center w-52 mb-10 justify-center bg-coral text-white px-4 py-3 rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-all no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral"
            >
              {t("marketing.hero_marketing_section.button")}
              <SquareArrowOutUpRight className="ml-2 h-5" />
            </a>
          </div>

          {/* Ilustración */}
          <div className="flex justify-center lg:justify-end items-center animate-slide-in-right">
            <EcommerceIllustration className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
};
