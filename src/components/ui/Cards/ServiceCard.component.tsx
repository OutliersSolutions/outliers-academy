import { useRef, useState } from "react"
import { LucideProps } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

export interface ServiceTag {
    id: number
    text: string
  }
  
interface TagsPanelProps {
tags: ServiceTag[]
isVisible: boolean
}

const TagsPanel: React.FC<TagsPanelProps> = ({ tags, isVisible }) => {



    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scaleY: 0 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -10, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full bg-white dark:bg-gray-800 mt-5 rounded-xl shadow-none sm:shadow-none md:shadow-none lg:shadow-none xl:shadow-md p-1 sm:p-5 md:p-5 lg:p-5 z-20 border-none sm:border md:border lg:border xl:border border-gray-100 dark:border-gray-700 origin-top"
                >
                    <div className="mb-2">
                        <h4 className="text-coral font-bold text-base uppercase tracking-wider text-start">{t('home.service_section.tags_title')}</h4>
                        <div className="w-12 h-1 bg-coral rounded-full mt-1"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-0 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-3 mt-3">
                        {tags.map((tag, index) => (
                            <motion.div
                                key={tag.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="flex items-center"
                            >
                                <div className="w-4 h-4 rounded-full bg-[#FF6B6B] bg-opacity-20 flex items-center justify-center mr-2">
                                    <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"></div>
                                </div>
                                <span className="leading-relaxed text-gray-700 dark:text-gray-300 text-base text-start">{tag.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export const ServiceCard = ({
    icon: Icon,
    title,
    description,
    tags,
    delay,
    link,
}: {
    icon: React.ComponentType<LucideProps>
    title: string
    description: string
    tags: ServiceTag[]
    delay: number,
    link: string,
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)


    const handleMouseEnter = () => {
        setIsHovered(true)

        setTimeout(() => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect()
                const scrollOffset = window.scrollY + rect.top - 100
                window.scrollTo({
                    top: scrollOffset,
                    behavior: "smooth",
                })
            }
        }, 100)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <div
            ref={cardRef}
            className="flex flex-col items-center group relative mb-10 sm:mb-0 md:mb-0 lg:mb-24"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
                className="relative bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out z-10 h-full w-full"
                style={{
                    boxShadow: isHovered
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
            >
                <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${isHovered ? "bg-[#FF6B6B]" : "bg-[#F9F9FB] dark:bg-gray-700"
                        }`}
                >
                    <Icon size={36} className={`transition-colors duration-300 ${isHovered ? "text-white" : "text-coral"}`} />
                </div>

                <h3 className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-900 dark:text-white">{title}</h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">{description}</p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">

                    <NavLink
                        to={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 sm:px-6 md:px-6 lg:px-6 py-2 sm:py-2 md:py-2 lg:py-2 bg-coral text-white rounded-md duration-300 ease-in-out"
                    >
                        <span className="font-medium">{t('home.service_section.button')}</span>
                        <ExternalLink size={18} />
                    </NavLink>
                </motion.div>

                {/* TagsPanel interno - visible solo en móvil y laptops */}
                <div className="w-full mt-4 xl:hidden">
                    <TagsPanel tags={tags} isVisible={true} />
                </div>

            </motion.div>

            {/* TagsPanel flotante - visible solo en desktop */}
            <div className="absolute w-full top-full mt-2 z-10 hidden sm:hidden md:hidden lg:hidden xl:flex">
                <TagsPanel tags={tags} isVisible={isHovered} />
            </div>
        </div>
    )
}
