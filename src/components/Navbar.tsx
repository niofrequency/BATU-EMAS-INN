import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, ShieldCheck, LogOut, Calendar, Menu, X, Sparkles, Globe } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'guest' | 'admin';
  setCurrentView: (view: 'landing' | 'guest' | 'admin') => void;
  onOpenAuth: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenAuth,
  onOpenBooking
}) => {
  const { user, isAdmin, isGuest, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-xs w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <img
              src="/img/logo.png"
              alt="Batu Emas Inn"
              className="h-10 sm:h-14 w-auto group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-serif text-lg lg:text-xl xl:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors whitespace-nowrap">
              Batu Emas <span className="text-amber-600">Inn</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-stone-700">
            <button
              onClick={() => setCurrentView('landing')}
              className={`transition-colors hover:text-amber-600 ${currentView === 'landing' ? 'text-amber-700 font-semibold' : ''}`}
            >
              {t.overview}
            </button>
            <a href="#rooms" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              {t.rooms}
            </a>
            <a href="#amenities" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              {t.amenities}
            </a>
            <a href="#restaurant" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              {t.restaurant}
            </a>
            <a href="#meetings" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              {t.meetings}
            </a>
            <a href="#contact" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              {t.contact}
            </a>
          </div>

          {/* Desktop Action & Auth Controls */}
          <div className="hidden xl:flex items-center gap-3">
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-stone-800 font-bold text-xs transition-all"
              title="Switch Language / Ganti Bahasa"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'en' ? 'ID (Bahasa)' : 'EN (English)'}</span>
            </button>

            {/* Direct Dashboard Switch Buttons */}
            {user ? (
              <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
                {isAdmin ? (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentView === 'admin' 
                        ? 'bg-emerald-900 text-amber-300 shadow-sm' 
                        : 'text-emerald-900 hover:bg-stone-200'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.adminPortal}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentView('guest')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentView === 'guest' 
                        ? 'bg-amber-500 text-stone-950 shadow-sm font-bold' 
                        : 'text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {t.myBookings}
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentView('landing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentView === 'landing' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.landing}
                </button>
              </div>
            ) : null}

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 font-bold px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/20 hover:from-amber-500 hover:to-yellow-600 hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 fill-stone-950" />
              {t.bookNow}
            </button>

            {/* User Profile / Auth Toggle */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900 truncate max-w-[120px]">
                    {user.displayName}
                  </div>
                  <div className="text-[10px] font-medium text-emerald-800 capitalize flex items-center justify-end gap-1">
                    {isAdmin ? (
                      <span className="text-emerald-800 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5" /> Admin
                      </span>
                    ) : (
                      <span className="text-amber-800 font-semibold">Guest</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={logout}
                  title={t.logOut}
                  className="p-2 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 text-stone-700 hover:text-amber-700 font-semibold text-sm px-3 py-2 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all"
              >
                <User className="w-4 h-4 text-amber-600" />
                {t.signIn}
              </button>
            )}

          </div>

          {/* Mobile Menu Trigger (Simplified) */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-stone-800 transition-colors"
              title="Switch Language"
            >
              <Globe className="w-5 h-5 text-amber-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Expanded Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-6 pt-4 pb-6 space-y-4 shadow-xl w-full animate-fade-in">
          
          {/* Mobile Book Now CTA */}
          <button
            onClick={() => { onOpenBooking(); setMobileMenuOpen(false); }}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 font-bold px-4 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <Sparkles className="w-4 h-4 fill-stone-950" />
            {t.bookNow}
          </button>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 font-medium text-stone-800 text-sm border-b border-stone-100 pb-3">
            <button
              onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
              className="text-left py-1.5 hover:text-amber-600 transition-colors"
            >
              {t.overview}
            </button>
            <a 
              href="#rooms" 
              onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }} 
              className="py-1.5 hover:text-amber-600 transition-colors"
            >
              {t.rooms}
            </a>
            <a
              href="#amenities"
              onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
              className="py-1.5 hover:text-amber-600 transition-colors"
            >
              {t.amenities}
            </a>
            <a
              href="#restaurant"
              onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
              className="py-1.5 hover:text-amber-600 transition-colors"
            >
              {t.restaurant}
            </a>
            <a
              href="#meetings"
              onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
              className="py-1.5 hover:text-amber-600 transition-colors"
            >
              {t.meetings}
            </a>
            <a
              href="#contact"
              onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
              className="py-1.5 hover:text-amber-600 transition-colors"
            >
              {t.contact}
            </a>
          </div>

          {/* User Portals / Account Options in Mobile */}
          <div className="space-y-2 pt-1">
            {user ? (
              <div className="space-y-2">
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">{user.displayName}</div>
                    <div className="text-[10px] text-stone-500">{user.email}</div>
                  </div>
                  <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${isAdmin ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {isAdmin ? 'Admin' : 'Guest'}
                  </span>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-emerald-900 text-amber-300 font-bold text-xs shadow-xs"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.adminPortal}</span>
                  </button>
                )}

                {isGuest && (
                  <button
                    onClick={() => { setCurrentView('guest'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.myBookings}</span>
                  </button>
                )}

                {currentView !== 'landing' && (
                  <button
                    onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    ← Back to Home / Landing View
                  </button>
                )}

                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 font-bold text-xs transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.logOut}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 text-white font-bold text-xs shadow-md"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>{t.signIn} / Register</span>
              </button>
            )}
          </div>

        </div>
      )}
    </nav>
  );
};
