import React from 'react';
import { HOTEL_AMENITIES } from '../data/rooms';
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
  return (
    <section id="amenities" className="py-20 bg-stone-50 border-y border-stone-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 text-emerald-900 border border-emerald-800/20 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-emerald-800" />
              <span>Sanctuary of Refined Luxury</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              A Golden Haven Built on Tradition & Modern Comfort
            </h2>

            <p className="text-stone-600 leading-relaxed text-base">
              Named after our iconic handcrafted glossy yellow floor tiles that gleam like polished amber in the morning sun, <strong className="text-stone-900">BATU EMAS INN</strong> offers guests an unforgettable blend of tropical tranquility and premier five-star hospitality.
            </p>

            <p className="text-stone-600 leading-relaxed text-sm">
              Whether you are relaxing in our Royal Emas Suite, dining at our waterfront restaurant, or unwinding in our infinity gold pool, our attentive staff ensures every moment of your stay exceeds expectations.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
              <div>
                <div className="font-serif text-2xl font-bold text-amber-600">48+</div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Luxury Suites</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-emerald-900">4.9★</div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Guest Rating</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-600">24/7</div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Concierge</div>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                alt="Hotel Interior Yellow Tiles"
                className="rounded-2xl object-cover h-64 w-full shadow-md border-2 border-amber-300/40"
              />
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
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
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">Signature Experience</div>
                <div className="text-sm font-medium text-stone-200">Personalized butler service & complimentary gourmet breakfast daily.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Amenities Section */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-100 rounded-full border border-amber-200">
              World-Class Facilities
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Designed for Your Absolute Ease
            </h3>
            <p className="text-stone-600 text-sm">
              From high-speed fiber connectivity to relaxing spa remedies, Batu Emas Inn brings you every comfort under one golden roof.
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
