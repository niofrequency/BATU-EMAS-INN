import React from 'react';
import { HOTEL_AMENITIES } from '../data/rooms';
import { useLanguage } from '../context/LanguageContext';
import { Wifi, Wind, UtensilsCrossed, Clock, Tv, Car, ShieldCheck, Award, Sparkles, Droplet } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-amber-600" />,
  Wind: <Wind className="w-6 h-6 text-amber-600" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-amber-600" />,
  Clock: <Clock className="w-6 h-6 text-amber-600" />,
  Tv: <Tv className="w-6 h-6 text-amber-600" />,
  Car: <Car className="w-6 h-6 text-amber-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />,
  Droplet: <Droplet className="w-6 h-6 text-amber-600" />
};

export const AboutAmenities: React.FC = () => {
  const { lang } = useLanguage();

  const text = {
    en: {
      badge: "Home Away From Home",
      title: "A Comfortable Stay Built on Trust & Warm Hospitality",
      desc1: "BATU EMAS INN has been welcoming guests in Timika for more than 6 years. In late 2023 the hotel underwent an expansion of its facilities, room styles, and management, reflecting our commitment to uplifting service to guests, partners, and our internal team alike.",
      desc2: "Whether you're relaxing in our room, enjoying a meal at Batu Emas Resto, or hosting a small gathering in our meeting room, our team is here to make every stay feel like a real home away from home.",
      suitesLabel: "Years Established",
      ratingLabel: "Guest Rating",
      conciergeLabel: "Front Desk",
      signatureExp: "Our Promise",
      signatureDesc: "\"Home Away From Home\" — your comfort is our priority.",
      facilityBadge: "Hotel Facilities",
      facilityTitle: "Everything You Need for a Pleasant Stay",
      facilityDesc: "From air-conditioned rooms to our in-house restaurant and meeting room, Batu Emas Inn brings together every essential for a comfortable stay in Timika."
    },
    id: {
      badge: "Home Away From Home",
      title: "Penginapan Nyaman yang Dibangun atas Kepercayaan & Keramahan",
      desc1: "BATU EMAS INN telah menyambut tamu di Timika selama lebih dari 6 tahun. Pada akhir 2023, hotel ini mengalami ekspansi fasilitas, gaya kamar, dan manajemen, mencerminkan komitmen kami untuk meningkatkan pelayanan kepada tamu, mitra, dan tim internal kami.",
      desc2: "Baik Anda menginap di kamar kami, menikmati hidangan di Batu Emas Resto, atau mengadakan pertemuan kecil di ruang meeting kami, tim kami siap memastikan setiap masa inap terasa seperti rumah sendiri.",
      suitesLabel: "Tahun Berdiri",
      ratingLabel: "Peringkat Tamu",
      conciergeLabel: "Resepsionis",
      signatureExp: "Komitmen Kami",
      signatureDesc: "\"Home Away From Home\" — kenyamanan Anda adalah prioritas kami.",
      facilityBadge: "Fasilitas Hotel",
      facilityTitle: "Semua yang Anda Butuhkan untuk Menginap Nyaman",
      facilityDesc: "Dari kamar ber-AC hingga restoran dan ruang meeting kami, Batu Emas Inn menghadirkan semua kebutuhan penting untuk masa inap yang nyaman di Timika."
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
                <div className="font-serif text-2xl font-bold text-amber-600">6+</div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">{text.suitesLabel}</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-emerald-900">4.7★</div>
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
                alt="Batu Emas Inn Front Desk"
                className="rounded-2xl object-cover h-64 w-full shadow-md border-2 border-amber-300/40"
              />
              <img
                src="/img/frontdoor.webp"
                alt="Batu Emas Inn Entrance"
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
