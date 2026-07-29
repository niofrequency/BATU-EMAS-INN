import React from 'react';
import { Crown, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

  // Localized text dictionary for Footer Section
  const text = {
    en: {
      footerDesc: "Experience handcrafted luxury, famous yellow floor tile suites, exquisite ocean breeze dining, and personalized concierge care.",
      explore: "Explore",
      rooms: "Rooms & Suites",
      amenities: "Amenities",
      contact: "Contact",
      resortDirect: "Resort Direct",
      directBookingAdvantage: "Direct Booking Advantage",
      directBookingDesc: "Book directly on our official Batu Emas Inn portal for guaranteed lowest rates, priority room upgrades, and late check-out privileges.",
      allRightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      guestGuidelines: "Guest Guidelines"
    },
    id: {
      footerDesc: "Nikmati kemewahan buatan tangan, suite ubin lantai kuning yang terkenal, santapan angin laut yang luar biasa, dan layanan pramutamu pribadi.",
      explore: "Jelajahi",
      rooms: "Kamar & Suite",
      amenities: "Fasilitas",
      contact: "Kontak",
      resortDirect: "Langsung Resor",
      directBookingAdvantage: "Keuntungan Pemesanan Langsung",
      directBookingDesc: "Pesan langsung di portal resmi Batu Emas Inn kami untuk tarif terendah yang dijamin, peningkatan kamar prioritas, dan hak istimewa check-out terlambat.",
      allRightsReserved: "Hak cipta dilindungi undang-undang.",
      privacyPolicy: "Kebijakan Privasi",
      termsOfService: "Ketentuan Layanan",
      guestGuidelines: "Panduan Tamu"
    }
  }[lang];

  return (
    <footer className="bg-emerald-950 text-stone-200 border-t border-emerald-900/60 pt-16 pb-12 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-stone-950 font-bold shadow-md">
                <Crown className="w-5 h-5 fill-stone-950" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-white tracking-wide">
                  BATU EMAS <span className="text-amber-400">INN</span>
                </div>
                <p className="text-[10px] text-amber-300 tracking-widest uppercase font-semibold">
                  Luxury & Comfort
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-light">
              {text.footerDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">{text.explore}</h4>
            <ul className="space-y-2 text-xs font-medium text-stone-300">
              <li><a href="#rooms" className="hover:text-amber-300 transition-colors">{text.rooms}</a></li>
              <li><a href="#amenities" className="hover:text-amber-300 transition-colors">{text.amenities}</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">{text.contact}</a></li>
            </ul>
          </div>

          {/* Hotel Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">{text.resortDirect}</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Batu Emas Blvd No. 88</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+1 (800) 888-GOLD</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>reservations@batuemasinn.com</span>
              </li>
            </ul>
          </div>

          {/* Guarantee Badges */}
          <div className="space-y-3 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/60">
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{text.directBookingAdvantage}</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              {text.directBookingDesc}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            © {new Date().getFullYear()} Batu Emas Inn. {text.allRightsReserved}
          </div>
          <div className="flex items-center gap-6">
            <span>{text.privacyPolicy}</span>
            <span>{text.termsOfService}</span>
            <span>{text.guestGuidelines}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
