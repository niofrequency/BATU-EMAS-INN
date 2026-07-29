import React from 'react';
import { MessageCircle } from 'lucide-react';
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

  const text = {
    en: {
      label: "Chat with us",
      subLabel: "24/7 Guest Service"
    },
    id: {
      label: "Chat via WhatsApp",
      subLabel: "Layanan Tamu 24/7"
    }
  }[lang];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Optional floating text prompt on larger screens */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex flex-col items-end bg-stone-950/85 hover:bg-stone-900 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-emerald-500/30 hover:border-emerald-500 shadow-xl text-right transition-all duration-300 group"
      >
        <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
          {text.label}
        </span>
        <span className="text-[10px] text-stone-400">
          {text.subLabel}
        </span>
      </a>

      {/* Main WhatsApp Circular Button with Pulse Effect */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-500/40 border-2 border-emerald-300 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Subtle glowing animated background pulse */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25 pointer-events-none" />

        {/* Message / Chat Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
