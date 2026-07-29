import React from 'react';
import { ROOMS } from '../data/rooms';
import { RoomInfo } from '../types';
import { Users, Maximize2, Star, Check, Sparkles, ArrowRight } from 'lucide-react';

interface RoomsSectionProps {
  onSelectRoom: (room: RoomInfo) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
              Explore Rooms & Luxury Suites
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md">
            Each space features custom golden yellow floor tile accents, plush bedding, premium room amenities, and direct room service access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS.map((room) => (
            <div
              key={room.id}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col group"
            >
              
              {/* Room Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Featured Badge */}
                {room.featured && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Popular Choice</span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{room.rating}</span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-300 shadow-md">
                  <span className="font-serif text-xl font-bold text-stone-900">${room.pricePerNight}</span>
                  <span className="text-xs text-stone-600 font-medium"> / night</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-600" /> Up to {room.capacity} Guests
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-600" /> {room.size}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                    {room.subtitle}
                  </p>

                  <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Amenities List */}
                <div className="pt-3 border-t border-stone-200">
                  <div className="text-xs font-bold text-stone-700 mb-2">Key Highlights:</div>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
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
                  className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Reserve This Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
