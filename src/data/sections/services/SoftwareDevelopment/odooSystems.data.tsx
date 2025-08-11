
import {
    Zap,
    Layers,
    Users,
    LinkIcon,
} from "lucide-react";


export const benefitSystems = [
    {
        icon: <Zap className="h-5 w-5 text-coral-500" />,
        title: "Implementación rápida y eficiente",
        description:
            "Reducimos el tiempo de implementación hasta un 40% con nuestra metodología probada.",
    },
    {
        icon: <Layers className="h-5 w-5 text-coral-500" />,
        title: "Modular y adaptable a tu negocio",
        description:
            "Personaliza solo los módulos que necesitas, escalando según tus necesidades.",
    },
    {
        icon: <Users className="h-5 w-5 text-coral-500" />,
        title: "Interfaces intuitivas para todos los usuarios",
        description:
            "Diseñamos experiencias que facilitan la adopción por parte de tus equipos.",
    },
    {
        icon: <LinkIcon className="h-5 w-5 text-coral-500" />,
        title: "Integración perfecta con tus sistemas actuales",
        description:
            "Conectamos Odoo con tus herramientas existentes sin interrumpir tus operaciones.",
    },
];

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const chartData = [
    { name: "Ene", ventas: 4000, costos: 2400 },
    { name: "Feb", ventas: 3000, costos: 1398 },
    { name: "Mar", ventas: 2000, costos: 9800 },
    { name: "Abr", ventas: 2780, costos: 3908 },
    { name: "May", ventas: 1890, costos: 4800 },
    { name: "Jun", ventas: 2390, costos: 3800 },
    { name: "Jul", ventas: 3490, costos: 4300 },
    { name: "Ago", ventas: 3000, costos: 2400 },
    { name: "Sep", ventas: 3200, costos: 2000 },
    { name: "Oct", ventas: 2800, costos: 1500 },
    { name: "Nov", ventas: 4000, costos: 2100 },
    { name: "Dic", ventas: 4200, costos: 3000 },
];