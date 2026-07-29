import React from 'react';
import { Crown, Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-stone-200 border-t border-emerald-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
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
              Experience handcrafted luxury, famous yellow floor tile suites, exquisite ocean breeze dining, and personalized concierge care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Explore</h4>
            <ul className="space-y-2 text-xs font-medium text-stone-300">
              <li><a href="#rooms" className="hover:text-amber-300 transition-colors">Luxury Suites</a></li>
              <li><a href="#amenities" className="hover:text-amber-300 transition-colors">Resort Amenities</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">Inquiries & Contact</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">Fine Dining Menu</a></li>
            </ul>
          </div>

          {/* Hotel Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Resort Direct</h4>
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
              <span>Direct Booking Advantage</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Book directly on our official Batu Emas Inn portal for guaranteed lowest rates, priority room upgrades, and late check-out privileges.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            © {new Date().getFullYear()} Batu Emas Inn. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Guest Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
