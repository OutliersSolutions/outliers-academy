export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "twitter" | "github";
  url: string;
  icon: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  description: string;
  imageUrl: string;
  socialLinks?: SocialLink[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Juan Pérez",
    role: "CEO & Founder",
    department: "Leadership",
    description: "Líder visionario con más de 10 años de experiencia en transformación digital y estrategias de crecimiento empresarial.",
    imageUrl: "/images/team/juan-perez.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/juanperez",
        icon: "linkedin"
      },
      {
        platform: "twitter",
        url: "https://twitter.com/juanperez",
        icon: "twitter"
      }
    ]
  },
  {
    id: 2,
    name: "María García",
    role: "CTO",
    department: "Technology",
    description: "Experta en tecnología con pasión por la innovación. Especializada en IA, machine learning y arquitecturas escalables.",
    imageUrl: "/images/team/maria-garcia.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/mariagarcia",
        icon: "linkedin"
      },
      {
        platform: "github",
        url: "https://github.com/mariagarcia",
        icon: "github"
      }
    ]
  },
  {
    id: 3,
    name: "Carlos López",
    role: "Lead Developer",
    department: "Engineering",
    description: "Desarrollador full-stack con expertise en React, Node.js y tecnologías cloud. Comprometido con la excelencia técnica.",
    imageUrl: "/images/team/carlos-lopez.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/carloslopez",
        icon: "linkedin"
      },
      {
        platform: "github",
        url: "https://github.com/carloslopez",
        icon: "github"
      }
    ]
  }
]; 