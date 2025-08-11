

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface BenefitChipProps {
    icon: ReactNode
    text: string
    delay?: number
}

export const BenefitChip = ({ icon, text, delay = 0 }: BenefitChipProps) => {
    return (
        <motion.div
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm transition-all duration-300 hover:border-[#FF6B6B]/30 hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + delay }}
            whileHover={{ scale: 1.05 }}
        >
            <span className="flex h-5 w-5 items-center justify-center text-[#FF6B6B]">{icon}</span>
            <span className="text-xs font-medium text-gray-700">{text}</span>
        </motion.div>
    )
}
