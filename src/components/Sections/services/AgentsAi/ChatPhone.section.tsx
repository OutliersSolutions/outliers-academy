import { AISpectrumCircular, Button, PhoneChat } from "@/components";
import { Bot } from "lucide-react";
import { useRef } from "react";


export const ChatPhoneSection = () => {

    // 1. Crear un ref para el input
    const inputFocusRef = useRef<HTMLInputElement>(null);

    // 2. Crear un ref para el contenedor del teléfono (opcional, si quieres hacer scroll)
    const phoneContainerRef = useRef<HTMLDivElement>(null);

    // 3. Función para enfocar el input (y opcionalmente hacer scroll)
    const handleFocus = () => {
        inputFocusRef.current?.focus();

        // Si quieres hacer scroll suave hacia el teléfono:
        phoneContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };


    return (
        <section className="flex pt-24 sm:pt-24 md:pt-24 lg:pt-32 xl:pt-32 items-center relative z-10 text-gray-600 dark:text-gray-300 leading-relaxed">
            <div className="container mx-auto overflow-hidden sm:overflow-hidden md:overflow-hidden lg:overflow-visible xl:overflow-visible">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Columna Derecha (imagen y teléfono) */}
                    <div className="w-full lg:w-1/2 flex justify-center z-10">
                        <div className="relative w-full max-w-md">

                            {/* Espectro circular de voz IA */}
                            <div className="absolute -right-60 top-1/2 transform -translate-y-1/2 scale-125 w-65 h-65 z-0">
                                <AISpectrumCircular />
                            </div>

                            {/* Imagen decorativa */}
                            <img
                                src="/images/vectors/mujer-con-telefono-en-mano.webp"
                                alt="Chica con IA"
                                className="absolute top-0 right-0 translate-x-[-180px] z-10 w-[110%] max-w-none pointer-events-none"
                            />

                            {/* Teléfono con chat */}
                            <div className="relative z-20">
                                <PhoneChat inputRefExternal={inputFocusRef} />
                            </div>
                        </div>
                    </div>

                    {/* Columna Izquierda (texto) */}
                    <div className="w-full lg:w-1/2 space-y-8 z-10">
                        <h1
                            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white"
                            dangerouslySetInnerHTML={{ __html: /* t( */'ai_agents.chat_phone_section.title') }}
                        />
                        <p className="text-base md:text-lg">
                            {/* t( */'ai_agents.chat_phone_section.description')}
                        </p>
                        <Button
                            onClick={handleFocus}
                            className="bg-coral hover:bg-coral text-white px-4 sm:px-6 md:px-6 lg:px-6 py-1 sm:py-3 md:py-3 lg:py-3 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-all mt-4"
                        >
                            <Bot className="mr-2" />
                            {/* t( */'ai_agents.chat_phone_section.button')}
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
};
