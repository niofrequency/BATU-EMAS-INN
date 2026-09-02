import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, Sparkles, ArrowRight, CheckCircle2, Crown, Shield, MapPin, ExternalLink } from 'lucide-react';
import { ROOMS } from '../data/rooms';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onQuickBook: (searchParams: {
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    roomType: string;
  }) => void;
}
 
export const HeroSection: React.FC<HeroSectionProps> = ({ onQuickBook }) => {
  const { lang } = useLanguage();

  // Tomorrow & 1 day later default (1-night stay so 120.000 x 1 = 120.000)
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 2);

  const [checkInDate, setCheckInDate] = useState(defaultCheckIn.toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(defaultCheckOut.toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('deluxe');

  // Localized text dictionary for Hero Section
  const text = {
    en: {
      badge: "Your Comfort is Our Priority",
      welcomeTo: "Welcome to",
      description: "A comfortable, budget-friendly hotel in Timika, Papua, conveniently close to the airport. Air-conditioned rooms, an in-house restaurant, a meeting room, and 24-hour guest service — a real Home Away from Home.",
      instantConf: "Instant Confirmation",
      bestRate: "Best Rate Guarantee",
      securePortal: "Secure Guest & Admin Portal",
      reserveStay: "Reserve Your Stay",
      guaranteedRates: "Guaranteed Best Direct Booking Rates",
      checkIn: "Check-in Date",
      checkOut: "Check-out Date",
      numGuests: "Number of Guests",
      roomSuite: "Room Type",
      bookNowBtn: "Book Now",
      singleGuest: "1 Guest",
      coupleGuest: "2 Guests",
      familyGuest: "3 Guests",
      suiteGuest: "4 Guests",
      villaGuest: "6 Guests",
      mapTitle: "Batu Emas Inn",
      mapSubtitle: "Timika, Papua",
      mapAction: "View on Google Maps"
    },
    id: {
      badge: "Kenyamanan Anda Prioritas Kami",
      welcomeTo: "Selamat Datang di",
      description: "Hotel nyaman dengan harga terjangkau di Timika, Papua, lokasi dekat dengan bandara. Kamar ber-AC, restoran, ruang meeting, dan layanan tamu 24 jam — Home Away From Home yang sesungguhnya.",
      instantConf: "Konfirmasi Instan",
      bestRate: "Garansi Harga Terbaik",
      securePortal: "Portal Tamu & Admin Aman",
      reserveStay: "Pesan Penginapan Anda",
      guaranteedRates: "Jaminan Tarif Pemesanan Langsung Terbaik",
      checkIn: "Tanggal Check-in",
      checkOut: "Tanggal Check-out",
      numGuests: "Jumlah Tamu",
      roomSuite: "Tipe Kamar",
      bookNowBtn: "Pesan Sekarang",
      singleGuest: "1 Tamu",
      coupleGuest: "2 Tamu",
      familyGuest: "3 Tamu",
      suiteGuest: "4 Tamu",
      villaGuest: "6 Tamu",
      mapTitle: "Batu Emas Inn",
      mapSubtitle: "Timika, Papua",
      mapAction: "Lihat di Google Maps"
    }
  }[lang];

  const formatIDR = (priceInUSD: number) => {
    const idrAmount = priceInUSD * 1000;
    const formatted = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(idrAmount);
    return `Rp ${formatted}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook({
      checkInDate,
      checkOutDate,
      guests,
      roomType
    });
  };

  // Google Maps Search URL for the Hotel Location
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Batu+Emas+Inn+Jl+Ahmad+Yani+No+82+Kwamki+Timika+Papua";

  return (
    <div className="relative bg-stone-900 text-white overflow-hidden w-full">
      
      {/* Background Image Overlay with Golden Sheen */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="/img/frontdoor.webp"
          alt="Batu Emas Inn Entrance"
          className="w-full h-full object-cover scale-105 transform transition-transform duration-10000 hover:scale-100"
        />
      </div>

      {/* Glossy Yellow Floor Tile Gradient Ambience */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-stone-950 via-stone-900/80 to-amber-950/40 pointer-events-none" />
      
      {/* Floating Google Maps Location Square (Pops out slightly at the top right) */}
      <div className="absolute z-20 top-4 right-4 sm:top-6 sm:right-8 md:top-8 md:right-16 xl:right-24 -translate-y-2 md:-translate-y-3">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-stone-950/85 hover:bg-stone-900/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border-2 border-amber-400/60 hover:border-amber-400 shadow-2xl shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1 w-40 sm:w-44 text-left"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-stone-950 transition-all">
              <MapPin className="w-4 h-4" />
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="font-serif font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors truncate">
            {text.mapTitle}
          </div>
          <div className="text-[11px] text-stone-400 truncate mb-2">
            {text.mapSubtitle}
          </div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1">
            <span>{text.mapAction}</span>
          </div>
        </a>
      </div>

      {/* Fluid container removing excessive side margins on wide screens */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 xl:px-24 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-4xl space-y-6">
          
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide uppercase backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 fill-amber-400" />
            <span>{text.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            {text.welcomeTo} <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              BATU EMAS INN
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg lg:text-xl max-w-3xl font-light leading-relaxed">
            {text.description}
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-medium text-stone-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{text.instantConf}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{text.bestRate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{text.securePortal}</span>
            </div>
          </div>

        </div>

        {/* Streamlined & Responsive Booking Widget */}
        <div className="mt-10 md:mt-12 bg-white/95 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-amber-400/30 text-stone-900 w-full">
          <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              {text.reserveStay}
            </h2>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              {text.guaranteedRates}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Check In Date */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5 text-amber-600" />
                {text.checkIn}
              </label>
              <input
                type="date"
                required
                value={checkInDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-sm bg-stone-50"
              />
            </div>

            {/* Check Out Date */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5 text-amber-600" />
                {text.checkOut}
              </label>
              <input
                type="date"
                required
                value={checkOutDate}
                min={checkInDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-sm bg-stone-50"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                {text.numGuests}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-sm bg-stone-50"
              >
                <option value={1}>{text.singleGuest}</option>
                <option value={2}>{text.coupleGuest}</option>
                <option value={3}>{text.familyGuest}</option>
                <option value={4}>{text.suiteGuest}</option>
                <option value={6}>{text.villaGuest}</option>
              </select>
            </div>

            {/* Room Type (Rp 200.000 Style Pricing) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {text.roomSuite}
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-sm bg-stone-50"
              >
                {ROOMS.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} ({formatIDR(room.pricePerNight)}/nt)
                  </option>
                ))}
              </select>
            </div>

            {/* Book Now Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-extrabold py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-200 flex items-center justify-center gap-2 group text-sm"
              >
                <span>{text.bookNowBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Decorative Golden Floor Tile Strip */}
      <div className="h-2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 shadow-sm" />
    </div>
  );
};
