import { TeamMemberCard } from "@/components";
import { getTranslations } from "next-intl/server";

interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "twitter" | "github";
  url: string;
  icon: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  description: string;
  imageUrl: string;
  socialLinks?: SocialLink[];
}

// Datos hardcodeados temporalmente - TODO: traer del backend
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Juan Pérez",
    role: "CEO & Founder",
    department: "Leadership",
    description: "Líder visionario con más de 10 años de experiencia en transformación digital.",
    imageUrl: "/images/team/juan-perez.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/juanperez",
        icon: "linkedin"
      }
    ]
  },
  {
    id: 2,
    name: "María García",
    role: "CTO",
    department: "Technology",
    description: "Experta en tecnología con pasión por la innovación y IA.",
    imageUrl: "/images/team/maria-garcia.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/mariagarcia",
        icon: "linkedin"
      }
    ]
  }
];

interface TeamSectionProps {
  locale: string;
}

export const TeamSection = async ({ locale }: TeamSectionProps) => {
  const t = await getTranslations('team');

  return (
    <section className="z-10 mt-40 mb-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-3 animate-slide-up text-gray-900 dark:text-white"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Conoce al equipo <span className="text-coral-600">detrás de la innovación</span>
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            {t('description')}
          </p>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-24">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} {...member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
