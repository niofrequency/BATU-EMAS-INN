import React from 'react';
import { UtensilsCrossed, Clock, Soup, CupSoda } from 'lucide-react';
import { getRestaurantMenu } from '../data/menu';
import { useLanguage } from '../context/LanguageContext';

export const RestaurantMenu: React.FC = () => {
  const { lang } = useLanguage();
  const menu = getRestaurantMenu(lang);

  // Localized text dictionary for Restaurant Menu Section
  const text = {
    en: {
      badge: "Dining",
      heading: "Batu Emas Resto",
      subheading: "Enjoy home-style Indonesian dishes at our in-house restaurant, or order straight to your room.",
      foodLabel: "Food",
      drinksLabel: "Drinks"
    },
    id: {
      badge: "Bersantap",
      heading: "Batu Emas Resto",
      subheading: "Nikmati hidangan khas Indonesia di restoran kami, atau pesan langsung ke kamar Anda.",
      foodLabel: "Makanan",
      drinksLabel: "Minuman"
    }
  }[lang];

  const formatIDR = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

  return (
    <section id="restaurant" className="py-20 bg-stone-50 border-y border-stone-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
              {text.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3 flex items-center gap-3">
              <UtensilsCrossed className="w-7 h-7 text-amber-600" />
              {text.heading}
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md">
            {text.subheading}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700">
            <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{menu.hoursNote}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700">
            <UtensilsCrossed className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{menu.roomServiceNote}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Food Menu */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="bg-stone-900 px-6 py-4 flex items-center gap-2">
              <Soup className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-white">{text.foodLabel}</h3>
            </div>
            <ul className="divide-y divide-stone-100">
              {menu.food.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between px-6 py-3 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-stone-900">{item.name}</div>
                    {item.note && <div className="text-xs text-stone-500">{item.note}</div>}
                  </div>
                  <div className="text-sm font-bold text-amber-700 whitespace-nowrap">{formatIDR(item.price)}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Drinks Menu */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden h-fit">
            <div className="bg-stone-900 px-6 py-4 flex items-center gap-2">
              <CupSoda className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-white">{text.drinksLabel}</h3>
            </div>
            <ul className="divide-y divide-stone-100">
              {menu.drinks.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between px-6 py-3 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-stone-900">{item.name}</div>
                    {item.note && <div className="text-xs text-stone-500">{item.note}</div>}
                  </div>
                  <div className="text-sm font-bold text-amber-700 whitespace-nowrap">{formatIDR(item.price)}</div>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
