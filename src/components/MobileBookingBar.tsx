import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ROOMS } from '../data/rooms';
import { useLanguage } from '../context/LanguageContext';

interface MobileBookingBarProps {
  onOpenBooking: () => void;
}

// A persistent bottom bar shown only on mobile/tablet so booking is always
// one tap away, instead of requiring guests to open the hamburger menu first.
// Also carries the WhatsApp quick-contact action so there's a single fixed
// element pinned to the bottom of the screen rather than two competing ones.
export const MobileBookingBar: React.FC<MobileBookingBarProps> = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const room = ROOMS[0];

  const text = {
    en: { from: 'From', perNight: '/ night', bookNow: 'Book Now' },
    id: { from: 'Mulai dari', perNight: '/ malam', bookNow: 'Pesan Sekarang' }
  }[lang];

  const formatIDR = (priceInBase: number) => {
    const idrAmount = priceInBase * 1000;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(idrAmount);
  };

  const phoneNumber = "6282226644055";
  const waMessage = {
    en: "Hello Batu Emas Inn, I would like to inquire about room availability and reservations.",
    id: "Halo Batu Emas Inn, saya ingin bertanya tentang ketersediaan kamar dan reservasi."
  }[lang];
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">

      <div className="flex-shrink-0">
        <div className="text-[10px] text-stone-500 font-medium uppercase tracking-wide">{text.from}</div>
        <div className="text-sm font-bold text-stone-900 font-serif leading-tight">
          {formatIDR(room.pricePerNight)} <span className="text-[10px] text-stone-500 font-sans font-normal">{text.perNight}</span>
        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center shadow-md transition-colors"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.289.072.39-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.131.564 4.136 1.559 5.885l-1.559 5.696 5.833-1.53c1.706.92 3.682 1.449 5.767 1.449 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-extrabold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 text-sm"
      >
        <span>{text.bookNow}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
};
