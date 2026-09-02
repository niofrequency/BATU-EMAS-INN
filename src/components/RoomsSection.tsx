import React, { useEffect, useState } from 'react';
import { getRooms } from '../data/rooms';
import { RoomInfo } from '../types';
import { Users, Maximize2, Star, Check, ArrowRight, Images, X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RoomsSectionProps {
  onSelectRoom: (room: RoomInfo) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
  const { lang } = useLanguage();
  const room = getRooms(lang)[0];

  // Lightbox state: index into room.images, or null when closed
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Localized text dictionary for Rooms Section
  const text = {
    en: {
      badge: "Accommodations",
      heading: "Our Room",
      subheading: "Every stay includes air conditioning, free Wi-Fi, TV, and a private hot & cold shower — with daily housekeeping throughout your stay.",
      perNight: " / night",
      upToGuests: "Up to",
      guestsLabel: "Guests",
      keyHighlights: "Room Highlights:",
      reserveBtn: "Reserve This Room",
      galleryLabel: "Room Gallery",
      galleryHint: "Click any photo to view full size",
      closeLabel: "Close",
      prevLabel: "Previous photo",
      nextLabel: "Next photo"
    },
    id: {
      badge: "Akomodasi",
      heading: "Kamar Kami",
      subheading: "Setiap kamar dilengkapi AC, Wi-Fi gratis, TV, dan kamar mandi dengan air panas & dingin — dengan housekeeping setiap hari selama Anda menginap.",
      perNight: " / malam",
      upToGuests: "Hingga",
      guestsLabel: "Tamu",
      keyHighlights: "Sorotan Kamar:",
      reserveBtn: "Pesan Kamar Ini",
      galleryLabel: "Galeri Kamar",
      galleryHint: "Klik foto untuk melihat ukuran penuh",
      closeLabel: "Tutup",
      prevLabel: "Foto sebelumnya",
      nextLabel: "Foto berikutnya"
    }
  }[lang];

  const formatIDR = (priceInBase: number) => {
    const idrAmount = priceInBase * 1000;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(idrAmount);
  };

  const images = room.images;
  const showPrev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));

  // Keyboard navigation while the lightbox is open (Escape / Arrow keys)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <section id="rooms" className="py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
              {text.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
              {text.heading}
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md">
            {text.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Room Photo Gallery — all room images shown together, click to enlarge */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <Images className="w-4 h-4 text-amber-600" />
                {text.galleryLabel}
              </div>
              <span className="text-[11px] text-stone-400 hidden sm:inline">{text.galleryHint}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="group relative col-span-2 rounded-2xl overflow-hidden border border-stone-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <img
                  src={images[0]}
                  alt={room.name}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors flex items-center justify-center">
                  <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                </div>
              </button>
              {images.slice(1).map((src, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setLightboxIndex(idx + 1)}
                  className="group relative rounded-xl overflow-hidden border border-stone-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <img
                    src={src}
                    alt={`${room.name} ${idx + 2}`}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors flex items-center justify-center">
                    <Expand className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 flex flex-col space-y-5">

            <div className="flex items-center justify-between">
              <div className="bg-stone-950/90 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-amber-400/30">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{room.rating}</span>
              </div>
              <div className="bg-white px-3.5 py-1.5 rounded-xl border border-amber-300 shadow-xs">
                <span className="font-serif text-lg font-bold text-stone-900">{formatIDR(room.pricePerNight)}</span>
                <span className="text-xs text-stone-600 font-medium">{text.perNight}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-600" /> {text.upToGuests} {room.capacity} {text.guestsLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-600" /> {room.size}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {room.name}
              </h3>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                {room.subtitle}
              </p>

              <p className="text-stone-600 text-sm leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities List */}
            <div className="pt-3 border-t border-stone-200">
              <div className="text-xs font-bold text-stone-700 mb-2">{text.keyHighlights}</div>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-white text-stone-700 border border-stone-200 flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Reserve CTA */}
            <button
              onClick={() => onSelectRoom(room)}
              className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>{text.reserveBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

      {/* Fullscreen Image Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label={text.closeLabel}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label={text.prevLabel}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`${room.name} ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label={text.nextLabel}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs font-semibold bg-white/10 px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}

    </section>
  );
};
