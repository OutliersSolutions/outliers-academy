import { teamMembers } from "@/data";
import { TeamMemberCard } from "@/components";

export const TeamSection = () => {
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
                        Un grupo de profesionales apasionados por crear soluciones tecnológicas que transforman negocios y mejoran experiencias.
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
