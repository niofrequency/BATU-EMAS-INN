import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Crown, User, ShieldCheck, LogOut, Calendar, MessageSquare, Menu, X, Sparkles } from 'lucide-react';

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
  const { user, isAdmin, isGuest, logout, switchDemoRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Crown className="w-6 h-6 text-stone-950 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                  BATU EMAS
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  INN
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-emerald-800 font-medium uppercase">
                Golden Luxury & Comfort
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <button
              onClick={() => setCurrentView('landing')}
              className={`transition-colors hover:text-amber-600 ${currentView === 'landing' ? 'text-amber-700 font-semibold' : ''}`}
            >
              Overview
            </button>
            <a href="#rooms" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              Rooms & Suites
            </a>
            <a href="#amenities" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              Amenities
            </a>
            <a href="#contact" onClick={() => setCurrentView('landing')} className="hover:text-amber-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Action & Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            
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
                    Admin Portal
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
                    My Bookings
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentView('landing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentView === 'landing' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Landing
                </button>
              </div>
            ) : null}

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 font-bold px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/20 hover:from-amber-500 hover:to-yellow-600 hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 fill-stone-950" />
              Book Now
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
                  title="Log out"
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
                Sign In
              </button>
            )}

          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="bg-amber-500 text-stone-950 text-xs font-bold px-3 py-2 rounded-lg shadow-xs"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 rounded-lg hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-stone-800 hover:text-amber-600"
          >
            Overview
          </button>
          {user && (
            <>
              {isAdmin && (
                <button
                  onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 w-full text-left py-2 text-emerald-900 font-semibold"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </button>
              )}
              {isGuest && (
                <button
                  onClick={() => { setCurrentView('guest'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 w-full text-left py-2 text-amber-700 font-semibold"
                >
                  <Calendar className="w-4 h-4" />
                  My Bookings
                </button>
              )}
            </>
          )}

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600">Logged in as {user.displayName}</span>
                <button onClick={logout} className="text-xs text-red-600 font-semibold">Log Out</button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 rounded-xl border border-stone-300 font-semibold text-stone-800"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
