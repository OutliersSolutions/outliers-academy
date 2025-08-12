


interface WhatsAppButtonProps {
    phoneNumber: string;
    message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message }) => {
    const encodedMessage = encodeURIComponent(message || "");
    const whatsappURL = `https://wa.me/${phoneNumber}${message ? `?text=${encodedMessage}` : ""}`;

    return (
        <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-50"
        >
            <div className="w-10 sm:w-10 md:w-10 lg:w-12 xl:w-14 h-10 sm:h-10 md:h-10 lg:h-12 xl:h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                <img src="/icons/whatsapp-icon.svg" alt="whatsapp icon" />
            </div>
        </a>
    );
};

