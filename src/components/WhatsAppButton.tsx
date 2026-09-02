import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const WhatsAppButton: React.FC = () => {
  const { lang } = useLanguage();

  // Cleaned WhatsApp phone number format (without '+' or spaces/dashes)
  const phoneNumber = "6282226644055";

  // Pre-filled greeting message when users click the button
  const defaultMessage = {
    en: "Hello Batu Emas Inn, I would like to inquire about room availability and reservations.",
    id: "Halo Batu Emas Inn, saya ingin bertanya tentang ketersediaan kamar dan reservasi."
  }[lang];

  // WhatsApp click-to-chat URL with URL-encoded text
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    // Hidden below md: the mobile booking bar (MobileBookingBar) carries its
    // own WhatsApp action, so we don't stack two fixed floating elements.
    <div className="hidden md:block fixed bottom-6 right-6 z-40">
      {/* Main WhatsApp Circular Button with Pulse Effect */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-2xl shadow-[#25D366]/40 border-2 border-[#69e897] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Subtle glowing animated background pulse */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        {/* Crisp White WhatsApp SVG Logo */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="#FFFFFF"
          className="group-hover:scale-110 transition-transform drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.289.072.39-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.131.564 4.136 1.559 5.885l-1.559 5.696 5.833-1.53c1.706.92 3.682 1.449 5.767 1.449 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      </a>
    </div>
  );
};
