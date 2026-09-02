import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

  // Localized text dictionary for Footer Section
  const text = {
    en: {
      footerDesc: "A comfortable, budget-friendly hotel in Timika, Papua, close to the airport — Your Comfort is Our Priority, a real Home Away From Home.",
      explore: "Explore",
      rooms: "Rooms",
      amenities: "Amenities",
      restaurant: "Restaurant",
      meetings: "Meetings",
      contact: "Contact",
      resortDirect: "Hotel Direct",
      directBookingAdvantage: "Direct Booking Advantage",
      directBookingDesc: "Book directly with Batu Emas Inn by phone or WhatsApp for the best available rate and a smooth, hassle-free check-in.",
      allRightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      guestGuidelines: "Guest Guidelines"
    },
    id: {
      footerDesc: "Hotel nyaman dengan harga terjangkau di Timika, Papua, dekat dengan bandara — Kenyamanan Anda Prioritas Kami, Home Away From Home yang sesungguhnya.",
      explore: "Jelajahi",
      rooms: "Kamar",
      amenities: "Fasilitas",
      restaurant: "Restoran",
      meetings: "Meeting",
      contact: "Kontak",
      resortDirect: "Langsung Hotel",
      directBookingAdvantage: "Keuntungan Pemesanan Langsung",
      directBookingDesc: "Pesan langsung ke Batu Emas Inn melalui telepon atau WhatsApp untuk tarif terbaik dan proses check-in yang lebih mudah.",
      allRightsReserved: "Hak cipta dilindungi undang-undang.",
      privacyPolicy: "Kebijakan Privasi",
      termsOfService: "Ketentuan Layanan",
      guestGuidelines: "Panduan Tamu"
    }
  }[lang];

  return (
    <footer className="bg-emerald-950 text-stone-200 border-t border-emerald-900/60 pt-16 pb-24 md:pb-12 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/img/logo.png" alt="Batu Emas Inn" className="h-14 w-auto" />
              <div>
                <div className="font-serif text-lg font-bold text-white tracking-wide">
                  Batu Emas <span className="text-amber-400">Inn</span>
                </div>
                <p className="text-[10px] text-amber-300 tracking-widest uppercase font-semibold max-w-[130px] leading-tight">
                  {lang === 'en' ? 'Your Comfort is Our Priority' : 'Kenyamanan Anda Prioritas Kami'}
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
              <li><a href="#restaurant" className="hover:text-amber-300 transition-colors">{text.restaurant}</a></li>
              <li><a href="#meetings" className="hover:text-amber-300 transition-colors">{text.meetings}</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">{text.contact}</a></li>
            </ul>
          </div>

          {/* Hotel Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">{text.resortDirect}</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Jl. Ahmad Yani No. 82, Kwamki, Timika</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+62 822-2664-4055</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>batuemasinn@gmail.com</span>
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
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>{text.privacyPolicy}</span>
            <span>{text.termsOfService}</span>
            <span>{text.guestGuidelines}</span>
          </div>
        </div>

        <div className="text-center text-[11px] text-stone-500">
          <a
            href="https://industrial-infrastructure-integration.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Designed by III
          </a>
        </div>

      </div>
    </footer>
  );
};
