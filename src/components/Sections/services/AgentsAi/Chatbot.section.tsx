import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ChatbotRobotModel, ChatBubble, Button } from "@/components";
import { ArrowBigDown, ExternalLink, Headset } from "lucide-react";
import { useTranslation } from "react-i18next";


export const ChatbotSection = () => {
  const { t } = useTranslation();

    const bubbles = ['¿Cómo puedo automatizar mi negocio?', '¿Qué servicios de IA ofrecen?', '¿Cuánto cuesta un chatbot?', '¿Pueden integrar con mi CRM?'];

    return (
        <section className="flex pt-20 sm:pt-20 md:pt-20 lg:pt-32 xl:pt-32 items-center relative pb-32 z-10 text-gray-600 dark:text-gray-300 leading-relaxed">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Lado izquierdo - Introducción al chatbot */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1
                                className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('ai_agents.chatbot_section.title') }}
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base md:text-lg"
                        >
                            {t('ai_agents.chatbot_section.description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://api.whatsapp.com/send/?phone=19298226066&text=Hola%2C+me+gustar%C3%ADa+agendar+un+demo.&type=phone_number&app_absent=0"
                                className="inline-flex items-center mb-10 justify-center bg-coral text-white px-4 py-3 rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-all no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral"
                            >
                                {t('marketing.hero_marketing_section.button')}
                                <ExternalLink className="ml-2 h-5" />
                            </a>

                        </motion.div>
                    </div>

                    {/* Lado derecho - Modelo 3D y burbujas de chat */}
                    <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[400px] md:h-[500px] lg:h-[500px] xl:h-[500px]">

                        {/* Burbujas de chat dinámicas */}
                        {bubbles.map((bubble, index) => (
                            <ChatBubble
                                key={index}
                                message={bubble}
                                position={index < 3 ? 'left' : 'right'}
                                delay={index}
                                className={`absolute ${index === 0 ? 'top-10 left-0' :
                                    index === 1 ? 'top-48 left-0' :
                                        index === 2 ? 'top-[345px] left-0' :
                                            index === 3 ? 'bottom-80 right-0' :
                                                index === 4 ? 'bottom-44 right-0' : 'bottom-10 right-0'
                                    }`}
                            />
                        ))}

                        {/* Modelo 3D */}
                        <Canvas
                            camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ambientLight intensity={3} />
                            <directionalLight position={[5, 5, 5]} />
                            <ChatbotRobotModel
                                url="/3d/chatbot.glb"
                                scale={3.9}
                                position={[0, 0, 0]}
                                rotation={[0, 4.7, 12.5]}
                            />
                            <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} />
                        </Canvas>
                    </div>

                </div>
            </div>
        </section>
    );
};
