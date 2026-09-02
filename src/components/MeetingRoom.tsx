import React from 'react';
import { Users, Coffee, CalendarClock, Sunrise, SunMedium } from 'lucide-react';
import { getMeetingRoomRates } from '../data/menu';
import { useLanguage } from '../context/LanguageContext';

const addOnIcons = [Coffee, Users, Sunrise, SunMedium];

export const MeetingRoom: React.FC = () => {
  const { lang } = useLanguage();
  const rates = getMeetingRoomRates(lang);

  // Localized text dictionary for Meeting Room Section
  const text = {
    en: {
      badge: "Events & Meetings",
      heading: "Meeting Room Rates",
      subheading: "Host your training, seminar, or small gathering in our meeting room, available for 10 or 25 guests.",
      capacityLabel: "Room Rate",
      addOnsLabel: "Add-On Packages",
      contactCta: "Ask about meeting room availability on WhatsApp"
    },
    id: {
      badge: "Acara & Rapat",
      heading: "Tarif Ruang Meeting",
      subheading: "Selenggarakan pelatihan, seminar, atau pertemuan kecil di ruang meeting kami, tersedia untuk 10 atau 25 orang.",
      capacityLabel: "Tarif Ruangan",
      addOnsLabel: "Paket Tambahan",
      contactCta: "Tanyakan ketersediaan ruang meeting via WhatsApp"
    }
  }[lang];

  const formatIDR = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

  const phoneNumber = "6282226644055";
  const waMessage = {
    en: "Hello Batu Emas Inn, I would like to ask about meeting room availability and rates.",
    id: "Halo Batu Emas Inn, saya ingin bertanya tentang ketersediaan dan tarif ruang meeting."
  }[lang];
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section id="meetings" className="py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
              {text.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3 flex items-center gap-3">
              <CalendarClock className="w-7 h-7 text-amber-600" />
              {text.heading}
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md">
            {text.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Room Capacity Rates */}
          <div>
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">{text.capacityLabel}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rates.capacity.map((pkg, idx) => (
                <div
                  key={idx}
                  className="bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 shadow-md flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif text-xl font-bold">{pkg.label}</div>
                    <div className="text-xs text-stone-400">{pkg.remarks}</div>
                  </div>
                  <div className="text-2xl font-extrabold text-amber-400">{formatIDR(pkg.price)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Add-On Packages */}
          <div>
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">{text.addOnsLabel}</h3>
            <div className="bg-stone-50 rounded-2xl border border-stone-200 divide-y divide-stone-200 overflow-hidden">
              {rates.addOns.map((pkg, idx) => {
                const Icon = addOnIcons[idx % addOnIcons.length];
                return (
                  <div key={idx} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-stone-900">{pkg.label}</div>
                        <div className="text-xs text-stone-500">{pkg.remarks}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-amber-700 whitespace-nowrap">{formatIDR(pkg.price)}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-4 transition-colors"
          >
            {text.contactCta}
          </a>
        </div>

      </div>
    </section>
  );
};
