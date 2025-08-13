'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({ 
  phoneNumber = "19298226066",
  message,
  className = "" 
}: WhatsAppButtonProps) {
  const tCommon = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Show button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    
    // Open WhatsApp in a new tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || tCommon('whatsappMessage'))}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Notification badge */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-white text-xs font-bold">1</span>
      </div>
      
      {/* WhatsApp button */}
      <button
        onClick={handleClick}
        className={`
          w-14 h-14 bg-green-500 hover:bg-green-600 
          rounded-full shadow-lg flex items-center justify-center 
          transition-all duration-300 transform hover:scale-110
          ${isAnimating ? 'animate-bounce' : ''}
        `}
        aria-label="Contact us on WhatsApp"
      >
        <Phone className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}