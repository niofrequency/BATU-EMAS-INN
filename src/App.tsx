import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutAmenities } from './components/AboutAmenities';
import { RoomsSection } from './components/RoomsSection';
import { ContactSection } from './components/ContactSection';
import { GuestDashboard } from './components/GuestDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { RoomInfo, UserRole } from './types';
import { ShieldCheck, Calendar, Crown, AlertCircle } from 'lucide-react';

function AppContent() {
  const { user, isAdmin, isGuest } = useAuth();
  
  const [currentView, setCurrentView] = useState<'landing' | 'guest' | 'admin'>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomInfo | null>(null);
  const [heroSearchParams, setHeroSearchParams] = useState<{
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    roomType: string;
  } | null>(null);

  const handleQuickBook = (params: {
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    roomType: string;
  }) => {
    setHeroSearchParams(params);
    setSelectedRoomForBooking(null);
    setBookingModalOpen(true);
  };

  const handleSelectRoom = (room: RoomInfo) => {
    setSelectedRoomForBooking(room);
    setHeroSearchParams(null);
    setBookingModalOpen(true);
  };

  const handleSelectRoleFromAuth = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('guest');
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col justify-between selection:bg-amber-300 selection:text-stone-950">
      
      <div>
        {/* Navigation bar */}
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* View Router */}
        {currentView === 'landing' && (
          <main>
            <HeroSection onQuickBook={handleQuickBook} />
            <AboutAmenities />
            <RoomsSection onSelectRoom={handleSelectRoom} />
            <ContactSection />
          </main>
        )}

        {currentView === 'guest' && (
          <main>
            {user ? (
              <GuestDashboard onOpenNewBooking={() => setBookingModalOpen(true)} />
            ) : (
              <div className="py-20 max-w-lg mx-auto text-center px-4 space-y-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto font-bold">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">Guest Portal Access</h2>
                <p className="text-stone-600 text-sm">
                  Please sign in to view your personal hotel reservation records and manage upcoming bookings.
                </p>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-2.5 rounded-xl shadow-md text-sm"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </main>
        )}

        {currentView === 'admin' && (
          <main>
            {isAdmin ? (
              <AdminDashboard />
            ) : (
              <div className="py-20 max-w-lg mx-auto text-center px-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">Admin Portal Access Restricted</h2>
                <p className="text-stone-600 text-sm">
                  You are currently logged in as a Guest. Click below to switch to the Admin role or sign in with admin credentials.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold px-6 py-2.5 rounded-xl text-sm border border-emerald-800"
                  >
                    Switch to Admin Role
                  </button>
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedRoom={selectedRoomForBooking}
        initialSearchParams={heroSearchParams}
        onSuccessNavigate={() => setCurrentView('guest')}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSelectRoleView={handleSelectRoleFromAuth}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
