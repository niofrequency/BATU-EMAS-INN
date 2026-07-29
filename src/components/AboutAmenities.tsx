import React from 'react';
import { HOTEL_AMENITIES } from '../data/rooms';
import { useLanguage } from '../context/LanguageContext';
import { Wifi, Waves, UtensilsCrossed, Clock, Sparkles, Car, ShieldCheck, Award } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-amber-600" />,
  Waves: <Waves className="w-6 h-6 text-amber-600" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-amber-600" />,
  Clock: <Clock className="w-6 h-6 text-amber-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />,
  Car: <Car className="w-6 h-6 text-amber-600" />
};

export const AboutAmenities: React.FC = () => {
  const { lang } = useLanguage();

  // Bilingual text dictionary for About & Amenities
  content: {
    // handled inline below
  }

  const text = {
    en: {
      badge: "Sanctuary of Refined Luxury",
      title: "A Golden Haven Built on Tradition & Modern Comfort",
      desc1: "Named after our iconic handcrafted glossy yellow floor tiles that gleam like polished amber in the morning sun, BATU EMAS INN offers guests an unforgettable blend of tropical tranquility and premier five-star hospitality.",
      desc2: "Whether you are relaxing in our Royal Emas Suite, dining at our waterfront restaurant, or unwinding in our infinity gold pool, our attentive staff ensures every moment of your stay exceeds expectations.",
      suitesLabel: "Luxury Suites",
      ratingLabel: "Guest Rating",
      conciergeLabel: "Concierge",
      signatureExp: "Signature Experience",
      signatureDesc: "Personalized butler service & complimentary gourmet breakfast daily.",
      facilityBadge: "World-Class Facilities",
      facilityTitle: "Designed for Your Absolute Ease",
      facilityDesc: "From high-speed fiber connectivity to relaxing spa remedies, Batu Emas Inn brings you every comfort under one golden roof."
    },
    id: {
      badge: "Suaka Kemewahan Berkelas",
      title: "Surga Emas yang Dibangun atas Tradisi & Kenyamanan Modern",
      desc1: "Dinamai dari ubin lantai kuning mengkilap buatan tangan ikonik kami yang berkilau seperti amber dipoles di pagi hari, BATU EMAS INN menawarkan tamu perpaduan tak terlupakan antara ketenangan tropis dan keramahtamahan bintang lima utama.",
      desc2: "Baik Anda bersantai di Royal Emas Suite kami, menikmati hidangan di restoran tepi air, atau bersantai di kolam renang emas infinity kami, staf penuh perhatian kami memastikan setiap momen masa inap Anda melampaui harapan.",
      suitesLabel: "Suite Mewah",
      ratingLabel: "Peringkat Tamu",
      conciergeLabel: "Pramutamu",
      signatureExp: "Pengalaman Unggulan",
      signatureDesc: "Layanan pelayan pribadi & sarapan gourmet gratis setiap hari.",
      facilityBadge: "Fasilitas Kelas Dunia",
      facilityTitle: "Dirancang untuk Kenyamanan Mutlak Anda",
      facilityDesc: "Dari konektivitas serat optik berkecepatan tinggi hingga perawatan spa yang menenangkan, Batu Emas Inn menghadirkan kenyamanan di bawah satu atap emas."
    }
  }[lang];

  return (
    <section id="amenities" className="py-20 bg-stone-50 border-y border-stone-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 text-emerald-900 border border-emerald-800/20 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-emerald-800" />
              <span>{text.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {text.title}
            </h2>

            <p className="text-stone-600 leading-relaxed text-base">
              {text.desc1.split("BATU EMAS INN").map((part, i) => 
                i === 0 ? (
                  <React.Fragment key={i}>
                    {part}<strong className="text-stone-900">BATU EMAS INN</strong>
                  </React.Fragment>
                ) : part
              )}
            </p>

            <p className="text-stone-600 leading-relaxed text-sm">
              {text.desc2}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
              <div>
                <div className="font-serif text-2xl font-bold text-amber-600">48+</div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">{text.suitesLabel}</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-emerald-900">4.9★</div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">{text.ratingLabel}</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-600">24/7</div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">{text.conciergeLabel}</div>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/img/admindesk.webp"
                alt="Hotel Interior Yellow Tiles"
                className="rounded-2xl object-cover h-64 w-full shadow-md border-2 border-amber-300/40"
              />
              <img
                src="/img/frontview.webp"
                alt="Resort Infinity Pool"
                className="rounded-2xl object-cover h-64 w-full shadow-md mt-6"
              />
            </div>
            
            {/* Floating Golden Accent Card */}
            <div className="absolute -bottom-6 left-6 right-6 bg-emerald-950 text-white p-5 rounded-xl shadow-xl flex items-center gap-4 border border-emerald-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">{text.signatureExp}</div>
                <div className="text-sm font-medium text-stone-200">{text.signatureDesc}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Amenities Section */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-100 rounded-full border border-amber-200">
              {text.facilityBadge}
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              {text.facilityTitle}
            </h3>
            <p className="text-stone-600 text-sm">
              {text.facilityDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOTEL_AMENITIES.map((amenity, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-200 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {iconMap[amenity.icon] || <Sparkles className="w-6 h-6 text-amber-600" />}
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {amenity.title}
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
