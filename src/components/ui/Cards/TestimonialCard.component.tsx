interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
    profileImage: string;
    companyLogo: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
    quote,
    name,
    title,
    profileImage,
}) => {
    return (
        <div className="bg-testimonial-background rounded-2xl bg-white shadow-testimonial p-16 max-w-2xl w-full relative">
            <div className="flex justify-between items-start mb-8">
                {/* Quote Mark */}
                <div className="mb-5">
                    <svg width="100" height="100" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                        <path d="M12 0L20 0L12 40H0L12 0Z" fill="#FF6B6B" fillOpacity="0.2" />
                        <path d="M40 0L48 0L40 40H28L40 0Z" fill="#FF6B6B" fillOpacity="0.2" />
                    </svg>
                </div>

                {/* Profile Image */}
                <div className="w-40 h-40 overflow-hidden rounded-bl-full border-white">
                    <img
                        src={profileImage}
                        alt={`${name}'s profile`}
                        className="w-full h-full object-cover"
                        draggable="false"
                    />
                </div>
            </div>


            {/* Testimonial Text */}
            <div className="mb-8">
                <p className="text-testimonial-text text-2xl md:text-3xl font-medium leading-tight md:leading-tight">
                    {quote}
                </p>
            </div>

            {/* Person Info */}
            <div>
                <p className="text-testimonial-text font-semibold">{name}</p>
                <p className="text-testimonial-text text-sm opacity-80">{title}</p>
            </div>
        </div>
    );
};
