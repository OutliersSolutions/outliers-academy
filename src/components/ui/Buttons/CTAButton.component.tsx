

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const CTAButton = ({ children, className, onClick }: CTAButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${className} cta-button bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg`}
        >
            {children}
            <ArrowRight className="w-5 h-5 animate-pulse-gentle" />
        </button>
    );
};

