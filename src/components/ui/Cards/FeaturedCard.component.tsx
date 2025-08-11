import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
    delay?: number;
}

export const FeaturedCard = ({
    icon,
    title,
    description,
    className,
    delay = 0,
}: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: delay / 1000, duration: 0.6, ease: 'easeOut' }}
            className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:translate-y-[-5px] hover:border-coral-200 text-gray-600 dark:text-gray-300 leading-relaxed ${className || ""}`}
        >
            <div className="flex flex-col space-y-3">
                <div className="text-coral-500 mb-2">
                    {icon}
                </div>
                <h3 className="font-bold text-lg md:text-xl dark:text-white">
                    {title}
                </h3>
                <p className="text-sm md:text-base font-normal">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};
