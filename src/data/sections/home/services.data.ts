import { Cpu, BrainCircuit, Megaphone } from "lucide-react";
import { useTranslation } from "react-i18next";

// Importar useTranslation correctamente dentro del componente
export const useServices = () => {
    const { t } = useTranslation();

    const serviceTags = {
        marketing: (t('home.service_section.services.marketing.tags', { returnObjects: true }) as string[]).map((text, index) => ({
            id: index + 1,
            text,
        })),
        sistemas: (t('home.service_section.services.sistemas.tags', { returnObjects: true }) as string[]).map((text, index) => ({
            id: index + 1,
            text,
        })),
        ia: (t('home.service_section.services.ia.tags', { returnObjects: true }) as string[]).map((text, index) => ({
            id: index + 1,
            text,
        })),
    };

    const services = [
        {
            id: "marketing-node",
            icon: Megaphone,
            title: t('home.service_section.services.marketing.title'),
            description: t('home.service_section.services.marketing.description'),
            tags: serviceTags.marketing,
            delay: 0.1,
            link: "/marketing",
        },
        {
            id: "sistemas-node",
            icon: Cpu,
            title: t('home.service_section.services.sistemas.title'),
            description: t('home.service_section.services.sistemas.description'),
            tags: serviceTags.sistemas,
            delay: 0.3,
            link: "/systems",
        },
        {
            id: "ia-node",
            icon: BrainCircuit,
            title: t('home.service_section.services.ia.title'),
            description: t('home.service_section.services.ia.description'),
            tags: serviceTags.ia,
            delay: 0.5,
            link: "/ai-agents",
        },
    ];

    return { services };
};
