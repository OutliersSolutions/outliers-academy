


import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const CardValue = ({ icon: Icon, title, description }: ValueCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm"
        >
            <Icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    );
};

