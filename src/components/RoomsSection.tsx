import React from 'react';
import { getRooms } from '../data/rooms';
import { RoomInfo } from '../types';
import { Users, Maximize2, Star, Check, ArrowRight, Images } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RoomsSectionProps {
  onSelectRoom: (room: RoomInfo) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
  const { lang } = useLanguage();
  const room = getRooms(lang)[0];

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
      galleryLabel: "Room Gallery"
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
      galleryLabel: "Galeri Kamar"
    }
  }[lang];

  const formatIDR = (priceInBase: number) => {
    const idrAmount = priceInBase * 1000;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(idrAmount);
  };

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

          {/* Room Photo Gallery — all room images shown together */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
              <Images className="w-4 h-4 text-amber-600" />
              {text.galleryLabel}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={room.images[0]}
                alt={room.name}
                className="col-span-2 w-full h-64 sm:h-80 object-cover rounded-2xl border border-stone-200 shadow-xs"
              />
              {room.images.slice(1).map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${room.name} ${idx + 2}`}
                  className="w-full h-32 sm:h-40 object-cover rounded-xl border border-stone-200 shadow-xs"
                />
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
    </section>
  );
};
