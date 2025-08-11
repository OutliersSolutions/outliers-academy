// En src/components/ExternalRedirect.tsx
import { useEffect } from "react";

interface ExternalRedirectProps {
    to: string;
}

export const ExternalRedirect = ({ to }: ExternalRedirectProps) => {
    useEffect(() => {
        // Cambia la URL de la ventana actual:
        window.location.href = to;

        // Si prefieres abrir en una pestaña nueva, usa:
        // window.open(to, "_blank");
    }, [to]);

    return null; // no renderiza nada
};
