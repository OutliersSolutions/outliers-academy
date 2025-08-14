import { Card, CardContent } from "@/components/ui/Cards/Card.component";
import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react";

interface SocialLink {
    platform: "facebook" | "instagram" | "linkedin" | "twitter" | "github";
    url: string;
}

interface TeamMemberProps {
    id: number;
    name: string;
    role: string;
    department: string;
    description: string;
    imageUrl: string;
    socialLinks?: SocialLink[];
    index: number;
}

export const TeamMemberCard = ({
    name,
    role,
    department,
    description,
    imageUrl,
    socialLinks = [],
    index,
}: TeamMemberProps) => {
    const animationDelay = `${index * 0.1}s`;

    return (
        <Card
            className="overflow-hidden border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-coral-300 dark:hover:border-coral-400 group transition-all duration-300 hover:shadow-md hover:scale-105 animate-fade-in"
            style={{
                animationDelay,
                animationFillMode: "forwards",
            }}
        >
            <CardContent className="p-6">
                <div className="flex flex-col items-center font-sans">
                    {/* Foto */}
                    <div className="mb-4 mt-5 rounded-full overflow-hidden border-4 border-transparent group-hover:border-coral-100 dark:group-hover:border-coral-300 transition-all duration-300">
                        <img
                            src={imageUrl}
                            alt={`Foto de ${name}`}
                            className="w-32 h-32 object-cover"
                        />
                    </div>

                    {/* Nombre */}
                    <h3 className="text-xl font-heading font-extrabold mb-1 text-center text-gray-900 dark:text-white">
                        {name}
                    </h3>

                    {/* Rol */}
                    <span className="text-coral-600 font-medium text-sm mb-1 tracking-wide">
                        {role}
                    </span>

                    {/* Departamento */}
                    <span className="bg-coral-50 text-coral-700 text-xs px-2 py-1 rounded-full mb-3 dark:bg-coral-200/20 dark:text-coral-300">
                        {department}
                    </span>

                    {/* Descripción */}
                    <p className="text-gray-600 dark:text-gray-400 text-center text-sm font-light leading-relaxed mb-4 line-clamp-2">
                        {description}
                    </p>

                    {/* Redes sociales */}
                    {socialLinks.length > 0 && (
                        <div className="flex gap-3 mt-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 dark:text-gray-400 hover:text-coral-500 transition-colors"
                                >
                                    {link.platform === "facebook" && <Facebook size={18} />}
                                    {link.platform === "instagram" && <Instagram size={18} />}
                                    {link.platform === "linkedin" && <Linkedin size={18} />}
                                    {link.platform === "twitter" && <Twitter size={18} />}
                                    {link.platform === "github" && <Github size={18} />}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
