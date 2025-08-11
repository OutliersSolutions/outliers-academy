

import {
    Clock,
    Users,
    CheckCircle,
    TrendingUp,
    ShieldCheck,
    Star
} from "lucide-react";


export const metricsData = [
    {
        icon: <Clock className="h-10 w-10 text-coral-500" />,
        value: "+200%",
        label: "Velocidad de carga",
        description: "Optimizamos tus aplicaciones para que sean ultrarrápidas"
    },
    {
        icon: <Users className="h-10 w-10 text-coral-500" />,
        value: "100+",
        label: "Clientes satisfechos",
        description: "Empresas que confían en nuestras soluciones"
    },
    {
        icon: <CheckCircle className="h-10 w-10 text-coral-500" />,
        value: "99.9%",
        label: "Uptime garantizado",
        description: "Disponibilidad constante de tus aplicaciones"
    },
    {
        icon: <TrendingUp className="h-10 w-10 text-coral-500" />,
        value: "+150%",
        label: "ROI promedio",
        description: "Retorno de inversión para nuestros clientes"
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-coral-500" />,
        value: "0",
        label: "Brechas de seguridad",
        description: "Protección robusta para tus datos críticos"
    },
    {
        icon: <Star className="h-10 w-10 text-coral-500" />,
        value: "4.9/5",
        label: "Calificación promedio",
        description: "Basada en reviews verificadas"
    }
];